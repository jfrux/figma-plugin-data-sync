import React, { Component } from "react";
import classnames from 'classnames';
import PapaParse from 'papaparse'
import { Form, Input, Radio, TabContent,Label, Spinner, TabPane, Layout, FormGroup, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Container, Row, Col } from 'reactstrap';
// const TextArea = Input.TextArea;
// const { TabPane } = Tabs;
// const { Header, Footer, Sider, Content } = Layout;
class App extends Component {
  constructor() {
    super();

    this.state = {
      'mode': null,
      'json_url': '',
      'json_text': '',
      'csv_text': '',
      'csv_header': false,
      'processing': false,
      'lastUsedText': null,
      'lastUsedUrl': null,
      'loading': true,
      'activeTab': 'json',
      'error': null
    };
    window.onmessage = this.receiveMessage;
    this.getClientVariables();
  }
  log(msg,...props) {
    console.log("[feedle] ", msg, ...props);
  }

  receiveMessage = (event) => {
    this.log("onmessage");
    if (!event.data.pluginMessage) {
      return;
    }
    const messageType = event.data.pluginMessage.type;
    const messageData = event.data.pluginMessage.payload;
    this.log("Received message", messageType, messageData)
    if (messageType) {
      this.messageHandlers[messageType](messageData);
    }
  }

  sendMessage = (type,payload = null) => {
    this.log("Sending message", type, payload)
    parent.postMessage({ pluginMessage: { 
      type,
      payload
    }}, '*');
  }
  getClientVariables = () => {
    this.sendMessage('get-client-variables');
  }
  messageHandlers = {
    'sync-error': async (data)  => {
      this.setState({
        'error': data
      });
    },
    'receive-client-variables': async (data) => {
      this.log(`Received client variables`,data);

      this.setState({
        ...data,
        loading:false
      });
    },
    'fetch-image': async (data) => {
      await this.getImageAsArrayBuffer(data.value).then((arrbuffer) => {
        this.sendMessage('image-blob-response',{
          ...data,
          imageBuffer: arrbuffer
        });
      });
    }
  }
  
  startDownload = async (imageUrl) => {
    // this.log("Attempting to download image...", imageUrl);
    return new Promise((resolve,reject) => {
      let downloadedImg = new Image;
      downloadedImg.crossOrigin = "Anonymous";
      downloadedImg.addEventListener("load", () => {
        // this.log("Downloaded image:",downloadedImg);
        resolve(downloadedImg);
      }, false);
      downloadedImg.src = imageUrl;
      // this.log("Image:",downloadedImg);
    });
  }
  
  getImageAsArrayBuffer = async (url) => {
    const image = await this.startDownload(url);
    // this.log("image returned:",image);
    return await new Promise((resolve, reject) => {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image,0,0,image.width,image.height);
      // this.log("Image width:",image.width);
      // this.log("Image height:",image.height);
      
      canvas.toBlob(blob => {
        const reader = new FileReader()
        reader.onload = () => resolve(new Uint8Array(reader.result))
        reader.onerror = () => reject(new Error('Could not read from blob'))
        reader.readAsArrayBuffer(blob)
      });
    });
  }

  getJson = (url) => {
    // this.log("[feedle] Requesting JSON data from " + url);
    return fetch(url).then((resp) => {
      this.log("[feedle] Response",resp);
      if (resp.status !== 200) {
        this.setState({
          'error': 'Could not extract any data from the JSON response... ensure your server is returning a 200 status message, has CORS enabled, and doesn\'t require authentication.'
        });
        throw new Error("Could not get data from API...");
      }
      return resp.json();
    }).then((data) => {
      if (!data) {
        this.setState({'error': 'No data was found in the API response...'});
      };
      
      return data;
    })
  }
  sendData = (data) => {
    let keys, dataType;
    this.log("sendData",data);
    this.sendMessage('set-client-variables', this.state);
    if (Array.isArray(data)) {
      this.log("Data is array... grab first row for key map");
      keys = Object.keys(data[0]);
      // data = data;
      dataType = "array";
    } else {
      this.log("Data is object... converting to array");
      if( (typeof A === "object" || typeof A !== 'function') && (A !== null) ) {
        keys = Object.keys(data);
        data = [data];
        dataType = "object";
      }
    }
    this.log(keys);
    if (keys) {
      this.sendMessage('sync',{
        keys,
        dataType,
        rawData: data,
        data
      });
    } else {
      this.setState({
        'processing': false,
        'error': 'Could not find any keys to map within response...\n Ensure response is basic JSON Array containing records of JSON Objects with same key-value pairs or Single Object of Key/Values'
      });
    }
  }
  onSubmitCSV = (event) => {
    event.preventDefault();
    let csv_text = this.state.csv_text;
    this.log("Submitted CSV",csv_text);
    this.setState({
      'error': null,
      'processing': true
    });
    const parsedResult = PapaParse.parse(csv_text, {
      header: true
    });

    if (parsedResult.errors.length > 0) {
      this.setState({
        'error': 'Failed to parse CSV text...'
      });
      return;
    }
    this.log("parsedResult",parsedResult);

    this.sendData(parsedResult.data);
  }
  onSubmitText = (event) => {
    event.preventDefault();
    let json_text = this.state.json_text;
    this.setState({
      'error': null,
      'processing': true
    });
    try {
      let json = JSON.parse(json_text);
      console.log(this.state);
      this.sendData(json);
    } catch (e) {
      this.setState({
        'error': 'Failed to parse JSON text...'
      });
    }
  }
  onSubmitUrl = (event) => {
    event.preventDefault();
    const { activeTab, json_url } = this.state;
    
    let keys = {};
    let data;
    let dataType = "array";

    this.setState({
      'error': null,
      'processing': true
    });

    this.getJson(json_url).then((rawData) => {
      // this.log("getJson response:",rawData);
      this.sendData(rawData);
    }).catch((e) => {
      this.setState({
        'processing': false,
        'error': `${e.message}`
      });
    });
  }

  onCancel = () => {
    this.sendMessage('cancel');
  }

  onTabChange = activeTab => {
    this.log("Changing tab to ", activeTab);
    this.setState({ activeTab });
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }

  render() {
    const { activeTab, loading, lastUsedText, lastUsedUrl, processing, error, mode } = this.state;
    
    if (processing || loading) {
      return (<div className="loading"><Spinner color="primary" style={{ width: '3rem', height: '3rem' }} /></div>);
    }

    return (
      <Container>
        <Nav pills className={'no-select'}>
          <NavItem>
            <NavLink className={classnames({ active: activeTab === 'json' })}
              onClick={() => { this.onTabChange('json'); }}>From Text</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: activeTab === 'json_url' })}
              onClick={() => { this.onTabChange('json_url'); }}>From URL</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: activeTab === 'csv_text' })}
              onClick={() => { this.onTabChange('csv_text'); }}>From CSV</NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="json">
            <Form onSubmit={this.onSubmitText}>
              <FormGroup>
                <Input type="textarea" onChange={this.handleChange} value={this.state.json_text} placeholder="Paste your JSON structure" name="json_text" id="json_text" rows={6} />
              </FormGroup>

              <Button>Synchronize</Button>
            </Form>
          </TabPane>
          <TabPane tabId="json_url">
            {error && 
              <div className="error">{error}</div>
            }
            
            <Form onSubmit={this.onSubmitUrl}>
              <FormGroup>
                <Input type="text" name="json_url" id="json_url" onChange={this.handleChange} value={this.state.json_url} placeholder="https://api.example.com/data.json" />
              </FormGroup>
              <Button>Synchronize</Button>
            </Form>
          </TabPane>
          <TabPane tabId="csv_text">
            {error && 
              <div className="error">{error}</div>
            }
            
            <Form onSubmit={this.onSubmitCSV}>
              <FormGroup>
                <Input type="textarea" name="csv_text" id="csv_text" onChange={this.handleChange} value={this.state.csv_text} placeholder="Paste your CSV content" />
              </FormGroup>
              <div>Note: You must include a header row for it to properly map fields.</div>
              <Button>Synchronize</Button>
            </Form>
          </TabPane>
        </TabContent>
      </Container>
    );
  }
}
export default App;
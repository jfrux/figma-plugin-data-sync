import React, { Component } from "react";
import classnames from 'classnames';
import PapaParse from 'papaparse'
import { CSVReader } from 'react-papaparse';
import { JsonToTable } from "react-json-to-table";
import { parse } from 'json2csv';
import defaultState from '../constants/default-state.js';
import { Form, Input, Radio, TabContent,Label, Spinner, TabPane, Layout, FormGroup, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Container, Row, Col } from 'reactstrap';
// const TextArea = Input.TextArea;
// const { TabPane } = Tabs;
// const { Header, Footer, Sider, Content } = Layout;

const FormSubmission = (props) => {
  return (
    <div className="final-actions">
      <div className="data-preview"><JsonToTable json={props.finalArray} /></div>
      <div className="button-bar"><Button>Synchronize</Button></div>
    </div>
  );
}
class App extends Component {
  constructor() {
    super();

    this.state = defaultState;
    this.csvFileInput = React.createRef();
    this.xlsxFileInput = React.createRef();
    window.onmessage = this.receiveMessage;
    this.getPersistedState();
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
  getPersistedState = () => {
    this.sendMessage('get-persisted-state');
  }
  receivePersistedState = async (state) => {
    this.log(`Received Persisted State`,state);

    this.setState({
      ...state,
      processing:false,
      loading:false
    });
  }
  messageHandlers = {
    'sync-error': async (data)  => {
      this.setState({
        'error': data
      });
    },
    'receive-persisted-state': this.receivePersistedState,
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
    // this.log("Requesting JSON data from " + url);
    return fetch(url).then((resp) => {
      // this.log("Response",resp);
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

  onSubmit = (event) => {
    event.preventDefault();
    
    this.setState({
      'error': null,
      'processing': true
    });
    
    this.sendData(parsedResult.data);
  }

  onSubmitText = (event) => {
    event.preventDefault();
    let jsonText = this.state.jsonText;
    
  }

  onSubmitUrl = (event) => {
    event.preventDefault();
    const { activeTab, finalArray } = this.state;
    
    let keys = {};
    let data;
    let dataType = "array";

    this.setState({
      'error': null,
      'processing': true
    });

    this.sendData(rawData);
  }

  onCancel = () => {
    this.sendMessage('cancel');
  }

  onTabChange = activeTab => {
    this.log("Changing tab to ", activeTab);
    this.setState({ activeTab });
    this.syncState({ 
      ...this.state,
      activeTab
    });
  }

  handle_jsonUrl = async (jsonUrl) => {
    this.setState({
      'error': null,
      'processing': true
    });

    try {
      const rawData = await this.getJson(jsonUrl)
    } catch (e) {
      this.setState({
        'processing': false,
        'error': `We were unable to retrieve information from your JSON URL.<br />Verify your URL and internet connection and try again.`
      });
      return;
    }

    this.setupPreview({
      jsonUrl,
      json
    });
  }

  handle_jsonText = async (jsonText) => {
    this.setState({
      'error': null,
      'processing': true
    });
    try {
      let json = JSON.parse(jsonText);
    } catch (e) {
      this.setState({
        'error': 'Failed to parse JSON text...'
      });
      return;
    }

    this.setupPreview({
      jsonText,
      json
    });
  }
  handle_csvText = async (csvText) => {
    const parsedResult = PapaParse.parse(csvText, {
      header: this.state.csvIncludesHeader
    });

    this.log("parsedResult",parsedResult);
    await this.handle_csvFile(parsedResult);
  }
  handle_csvFile = async (parsedResult) => {
    this.setState({
      'error': null,
      'processing': true
    });
    let json;
    console.log("csvFileInput",this.csvFileInput);
    if (parsedResult.errors.length > 0) {
      const messages = parsedResult.errors.map((error) => { return '-' + error.message; }).join("<br />");
      this.setState({
        'error': `Failed to parse CSV text...<br />${messages}`
      });
      return;
    }

    this.log(`Parsed CSV:`,parsedResult);
    if (this.state.csvIncludesHeader) {
      json = parsedResult.data;
    } else {
      const data = parsedResult.data;
      json = data.map((row, index) => {
        const colLength = data[index].length;
        let result = {};
        for (let i=1; i <= colLength; i++) {
          let keyValue = row[i-1];
          // let keyType = typeof(keyValue);

          // if (keyType === 'string') {
          //   keyType = 'text';
          // }
          // if (keyValue.startsWith('http')) {
          //   keyType = 'url';
          // }

          let keyName = `column-${i}`;
          
          console.log(keyName);
          result[keyName] = keyValue;
        }
        return result;
      });
    }
    const csvText = parse(json);
    this.setupPreview({
      csvText,
      json
    });
    
    // const parsedResult = PapaParse.parse(csvText, {
    //   header: true
    // });
  }

  /**
   * FINAL STEP AFTER HANDLING THE VARIOUS DATA FORMATS.
   * SHOWS A PREVIEW OF THE DATA THAT WILL BE USED.
   */
  setupPreview = (props) => {
    let json = props.json;
    let keys = [];
    if (Array.isArray(json)) {
      this.log("Data is array... grab first row for key map");
      keys = Object.keys(json[0]);
      // json = json;
      // dataType = "array";
    } else {
      this.log("Data is object... converting to array");
      if( (typeof A === "object" || typeof A !== 'function') && (A !== null) ) {
        keys = Object.keys(json);
        json = [json];
        // dataType = "object";
      }
    }

    const newState = {
      ...props,
      json,
      processing:false,
      dataKeys: keys
    }

    this.setState(newState);

    this.syncState({
      ...this.state,
      ...newState
    });
  }

  /**
   * PERSIST STATE TO CLIENTSTORAGE
   */
  syncState = (state) => {
    console.log(state);
    this.sendMessage('set-client-variables', {
      ...state
    });
  }

  /**
   * FORM CHANGES
   */
  handleChange = (event) => {
    let parseMethod;
    let handler = this[`handle_${event.target.id}`];
    
    handler(event.target.value);
    
    this.sendMessage('set-client-variables', {
      ...this.state,
      [event.target.id]: event.target.value
    });
  }
  
  handleCsvIncludesHeaderChange = (event) => {
    const { value } = event.target;
    const newState = {
      csvIncludesHeader: !this.state.csvIncludesHeader
    };
    this.setState(newState);
    this.syncState({
      ...this.state,
      ...newState
    });
  }
  render() {
    const { activeTab, currentSelectionIndex, currentSelectionType, currentSelection, loading, finalArray, lastUsedText, lastUsedUrl, processing, error, mode, jsonText } = this.state;
    
    if (processing || loading) {
      return (<div className="loading"><Spinner color="primary" style={{ width: '3rem', height: '3rem' }} /></div>);
    }

    if (!currentSelectionIndex) {
      return (
        <div className="getting-started">
          <Container fluid={true}>
            <Row>
              <Col>
                <h1>Getting Started with DataSync</h1>
                
                <h2>Overview</h2>
                <p>DataSync does a "mail-merge" of your CSV or JSON data matching each field with a layer in your Figma page.</p>
                <p>If you have a CSV with columns</p>

                <h2>Syncing from CSV Data</h2>
                <p>To get started, you need to determine the text / image layers in your Figma document that will be merged with your data.</p>
                <p>For example, let's say you have a "News Article" component with a single image layer named "article_cover_image" and a single text box layer named "article_title".</p>
                <p>You've created many instances of this component in your Figma page and want to fill the "article_cover_image" and "article_title" with an image from CSV or JSON data.</p>
                <p>Now let's find some data...</p>
                <p>You have a CSV file on your desktop that contains Comma-separated list of titles and images.  The first column is called "title" and values below it are  the second column is called "image" and values below it are publicly downloadable image url's.</p>
                <p>This is perfect!</p>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }

    return (
      <div className="app-wrap">
        <Nav pills className={'no-select'}>
          <NavItem>
            <NavLink className={classnames({ active: activeTab === 'xlsx' })}
              onClick={() => { this.onTabChange('xlsx'); }}>From XLSX</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: activeTab === 'csvText' })}
              onClick={() => { this.onTabChange('csvText'); }}>From CSV</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: activeTab === 'json' })}
              onClick={() => { this.onTabChange('json'); }}>From Text</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={classnames({ active: activeTab === 'jsonUrl' })}
              onClick={() => { this.onTabChange('jsonUrl'); }}>From URL</NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="csvText">
            <Container fluid={true}>
              <Row>
                <Col>
                  <Form onSubmit={this.onSubmit}>
                    {error && 
                      <div className="error">{error}</div>
                    }

                    <FormGroup>
                      <Label>Import File (CSV)</Label>
                      <CSVReader
                        onFileLoaded={this.handle_csvFile}
                        inputRef={this.csvFileInput}
                        configOptions={{ header: this.state.csvIncludesHeader }}
                      />
                      <Input type="textarea" onChange={this.handle_csvText} />
                    </FormGroup>

                    <FormGroup check>
                      <Input type="checkbox" onChange={this.handleCsvIncludesHeaderChange} checked={this.state.csvIncludesHeader} name="csvIncludesHeader" id="csvIncludesHeader" value="1" />
                      <Label for="csvIncludesHeader" check>Includes Header Row</Label>
                    </FormGroup>
                    
                    <FormSubmission finalArray />
                  </Form>
                </Col>
              </Row>
            </Container>
          </TabPane>
          <TabPane tabId="json">
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input type="textarea" onChange={this.handleChange} value={this.state.jsonText} placeholder="Paste your JSON structure" name="jsonText" id="jsonText" rows={15} />
              </FormGroup>
              
              <FormSubmission finalArray />
            </Form>
          </TabPane>
          <TabPane tabId="jsonUrl">
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input type="text" name="jsonUrl" id="jsonUrl" onChange={this.handleChange} value={this.state.jsonUrl} placeholder="https://api.example.com/data.json" />
              </FormGroup>
              
              <FormSubmission finalArray />
            </Form>
          </TabPane>
          
        </TabContent>
      </div>
    );
  }
}
export default App;
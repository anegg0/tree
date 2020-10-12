import React, { Component } from 'react';
import Web3 from 'web3';
import { Grid, Segment, Header, Form, List, Message, Icon, Image, Tab } from 'semantic-ui-react';
import ReactDropzone from 'react-dropzone';
import './App.css';
import WebService from './WebService';
import Login  from './login.js';
import { ipfsFile } from './WebService';
import WebServiceErrorStatusesEnum from './WebServiceErrorStatusesEnum';

class App extends Component {
  state = {
    webServiceErrorStatus: null,
    isUploadLoading: false,
    isSearchLoading: false,
    isReaderError: false,
    isAfterUpload: false,
    isAfterSearch: false,
    fileHash: '',
    fileInfo: null,
      uploadedHashes: [],
      tags: [
          'tags',
          'Input'
      ]
  }

  async componentWillMount() {
    this.WebService = new WebService();
    this.setState({
      fileInfo: new ipfsFile()
    });
  }

    removeTag = (i) => {
        const newTags = [ ...this.state.tags ];
        newTags.splice(i, 1);
        this.setState({ tags: newTags });
    };

    inputKeyDown = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (this.state.tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            this.setState({ tags: [...this.state.tags, val]});
            this.tagInput.value = null;
        } else if (e.key === 'Backspace' && !val) {
            this.removeTag(this.state.tags.length - 1);
        }
    };

  fileHashChanged = event => {
    this.setState({
      webServiceErrorStatus: null,
      isAfterSearch: false,
      fileHash: event.target.value,
    });
  };

  searchFormSubmitted = async () => {
    this.setState({
      isSearchLoading: true
    });
    
    var response = await this.WebService.getFileAsync(this.state.fileHash);
    if(response instanceof WebServiceErrorStatusesEnum) {
      this.setState({
        webServiceErrorStatus: response
      });
    }
    else {
      this.setState({
        fileInfo: response,
        isAfterSearch: true
      });
    }

    this.setState({
      isSearchLoading: false
    });
  };

  fileDropped = async (acceptedFiles) => {
    acceptedFiles.forEach(file => {
      this.setState({
        isUploadLoading: true,
        webServiceErrorStatus: null,
        isReaderError : false
      });
  
      var uploadedHashes = [];

      const reader = new FileReader();

      reader.onerror = () => {
        console.log('file reading has failed');
        this.setState({
          isUploadLoading: false,
          isReaderError: true
        });
      }

      reader.onload = async () => {
        const fileAsArrayBuffer = reader.result;
        let tags = this.state.tags;
        var response = await this.WebService.addFileAsync(fileAsArrayBuffer);

        if(response instanceof WebServiceErrorStatusesEnum) {
          this.setState({
            webServiceErrorStatus: response,
            isUploadLoading: false
          });
        }
        else {
          uploadedHashes.push(response.fileHash)
          var tempUploadedHashes = this.state.uploadedHashes;
          tempUploadedHashes.push(...uploadedHashes);

          console.log(response);
      
          this.setState({
            isAfterUpload: true,
            uploadedHashes: tempUploadedHashes,
            isUploadLoading: false
          });
        }
      };

      reader.readAsArrayBuffer(file);
    });  
  };

  render() {
    const { tags } = this.state;
    return (
      <div>
        <div className="mainContent">
          <Segment basic>
            <Header inverted as='h1' content='Tri'></Header>
          </Segment>
          <Grid style={{ width: '100%' }} textAlign='center'>
            <Grid.Column style={{ maxWidth: 700, maxHeight: 800, overflowY: 'auto'}}>
              <Tab menu={{ secondary: true }} panes={[
                  { menuItem: {content: 'Upload', icon:'upload', key: 'Upload'}, render: () => 
                    <Tab.Pane className='tabPane'>
                      <Segment basic loading={this.state.isUploadLoading}>
                        <Form error={this.state.webServiceErrorStatus === WebServiceErrorStatusesEnum.DifferentAddError}>
                          <Header color='teal' as='h2'>Upload</Header>
                          <ReactDropzone multiple={false}
                            className='dropZoneDefaultState' 
                            acceptClassName='dropZoneAcceptState' 
                            rejectClassName='dropZoneRejectState' 
                                         onDrop={this.fileDropped}>
                            <Segment basic>
                              <Icon disabled name='file outline' size='massive' color='teal'/>
                              <Header as='h4'>Drop image here</Header>
                            </Segment>
                          </ReactDropzone>
                          <Message error header='Action Error' content='Something went wrong. Please contact with system administrator.' />
                        </Form>
                        <div className="input-tag">
                          <ul className="input-tag__tags">
                            { tags.map((tag, i) => (
                                <li key={tag}>
                                  {tag}
                                  <button type="button" onClick={() => { this.removeTag(i); }}>+</button>
                                </li>
                            ))}
                            <li className="input-tag__tags__input"><input type="text" onKeyDown={this.inputKeyDown} ref={c => { this.tagInput = c; }} /></li>
                          </ul>
                        </div>
                        {this.state.isAfterUpload && this.state.uploadedHashes.length > 0 &&
                          <Segment raised>
                            <Header color='green' as='h3'>Uploaded files hash list:</Header>
                            <List ordered relaxed style={{textAlign: 'left'}}>
                              {this.state.uploadedHashes.map((hash, index) => 
                                <List.Item key={index}>
                                  <List.Header>
                                    {hash}
                                  </List.Header>
                                </List.Item>)}
                            </List>    
                          </Segment>}
                        {this.state.webServiceErrorStatus === WebServiceErrorStatusesEnum.FileAlreadyExists &&
                          <Segment raised>
                            <Header color='red' as='h3'>File already exists!</Header>
                          </Segment>}
                        {this.state.isReaderError &&
                          <Segment raised>
                            <Header color='red' as='h3'>Problem with reading file!</Header>
                          </Segment>}
                      </Segment>
                      <Login />
                    </Tab.Pane> 
                  },
                  { menuItem: {content: 'Search', icon:'search', key: 'Search'}, render: () => 
                    <Tab.Pane className='tabPane'>
                      <Segment basic loading={this.state.isSearchLoading}>
                        <Header color='teal' as='h2'>Search</Header>
                        <Form onSubmit={this.searchFormSubmitted} error={this.state.webServiceErrorStatus === WebServiceErrorStatusesEnum.DifferentGetError}>
                          <Form.Input fluid 
                            action={{disabled: this.state.fileHash === '', icon: 'search'}}
                            placeholder='Provide file hash...' 
                            type='text' value={this.state.fileHash} 
                            onChange={this.fileHashChanged} />
                          <Message error header='Action Error' content='Something went wrong. Please contact with system administrator.' />
                        </Form>
                        {this.state.fileHash !== '' && this.state.isAfterSearch &&
                          <Segment raised>
                                <Header color='green' as='h3'>File info has been found in blockchain:</Header>
                                <List relaxed>
                                  <List.Item>
                                    <List.Header>Upload Time</List.Header>
                                    <List.Description>
                                      {this.state.fileInfo.time}
                                    </List.Description>
                                  </List.Item>
                                  <List.Item>
                                    <List.Header>Hash</List.Header>
                                    <List.Description>
                                      {this.state.fileInfo.hash}
                                    </List.Description>
                                  </List.Item>
                                  <List.Item>
                                    <List.Content>
                                      <List.Header>IPFS path (click link to check file)</List.Header>
                                      <List.Description>
                                        <a target="_blank" rel="noopener noreferrer" href={'http://' + this.state.fileInfo.url}>{this.state.fileInfo.url}</a>
                                      </List.Description>
                                    </List.Content>
                                  </List.Item>
                                </List>              
                          </Segment>} 
                          {this.state.webServiceErrorStatus === WebServiceErrorStatusesEnum.FileNotExist &&
                            <Segment>
                              <Header color='red' as='h3'>File info has not been found in blockchain.</Header>
                            </Segment>}
                      </Segment>
                    </Tab.Pane> 
                  }]
              }/>
            </Grid.Column>
          </Grid>
          <div className='footer'>
            <a target="_blank" rel="noopener noreferrer" href='https://www.future-processing.com/'>
              Powered by gr0wing
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

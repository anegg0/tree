
import FileUpLoader from './FileUpLoader';
import React from 'react';

import { Grid, Container, Segment, Header } from 'semantic-ui-react';
import { IpfsFile } from './IpfsFileType';
import { Login } from '../Login';
import { Profile } from '../Profile/Profile';
import { Auth } from '../types';
import logo from './logo.svg';

const ThemingLayout = () => (
  <Container style={{ marginTop: '3em' }}>
    <Header as='h1'>Theming Examples</Header>

    <Header as='h2' dividing>
      Site
    </Header>
    </Container>
)
    const LS_KEY = 'login-with-metamask:auth';
  interface State {
  webServiceErrorStatus: string; auth?: Auth;
  isUploadLoading: boolean;
  isSearchLoading: boolean;
  isReaderError: boolean;
  isAfterUpload: boolean;
  isAfterSearch: boolean;
  fileHash: string;
  fileInfo: IpfsFile;
  accessToken: string;
  uploadedHashes: string[];
}

// interface Props {
//   auth: Auth;
//   onLoggedOut: () => void;
// }
 export class App extends React.Component<{}, State> {
  state: State = {
    accessToken: '',
    webServiceErrorStatus: '',
    isUploadLoading: false,
    isSearchLoading: false,
    isReaderError: false,
    isAfterUpload: false,
    isAfterSearch: false,
    fileHash: '',
    fileInfo: {
      hash: '',
      time: '',
      exists: false,
      url: '',
    },
    uploadedHashes: [''],
    auth: this.state,
  };

  componentDidMount(): void {
    // Access token is stored in localstorage
    const ls = window.localStorage.getItem(LS_KEY);
    const auth = ls && JSON.parse(ls);
    const fileInfo = new IpfsFile(); // this.setState(fileInfo);
    this.setState({ auth, fileInfo });
  }

  handleLoggedIn = (auth: Auth): void => {
    localStorage.setItem(LS_KEY, JSON.stringify(auth));
    this.setState({ auth });
  };

  handleLoggedOut = (): void => {
    localStorage.removeItem(LS_KEY);
    this.setState({ auth: undefined });
  };

  render(): JSX.Element {
    const { auth } = this.state;
    return (
      <div>

     <Grid columns={3} stackable>
      <Grid.Column>
        <Header as='h1'>Heading 1</Header>
        <Header as='h2'>Heading 2</Header>
        <Header as='h3'>Heading 3</Header>
        <Header as='h4'>Heading 4</Header>
        <Header as='h5'>Heading 5</Header>

        <p>
          Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies
          vehicula.
        </p>
      </Grid.Column>
        <Grid.Row columns={3}>
          <Segment basic className="App">
            <h1 className="App-title">Welcome to Tree Proof of Plant</h1>
            <div className="App-intro"></div>
            {auth ? (
              <div>
                <Profile auth={auth} onLoggedOut={this.handleLoggedOut} />
                <div>
                  <FileUpLoader />
                </div>
             </div>
            ) : (
                <div>
                  <Login onLoggedIn={this.handleLoggedIn} />
                </div>
              )}
          </Segment>
        </Grid.Row>
        </Grid>
        </div>
    );
        {/* `{'}'}` */}

}}


import FileUpLoader from './FileUpLoader';
import React from 'react';
/* import MetaLogin  from '../Style/MetaLogin'; */
import {Label, Button, Divider, Grid, Container, Segment, Header } from 'semantic-ui-react';
import { IpfsFile } from '../File/IpfsFileType';
import { Login } from '../Login';
import { Profile } from '../Profile/Profile';
import { Auth } from '../types';
import logo from './logo.svg';


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
            <>

                    <div>
                    <Header as='h1' inverted textAlign='center'>
                        Welcome to Tree: A Proof of Plant      </Header>
                </div>
                {auth ? (
                    <div>
                        <Profile auth={auth} onLoggedOut={this.handleLoggedOut} />

                        <FileUpLoader />
                      <div>
                      </div>
                    </div>
                ) : (
                    <div>
                        <Segment>
                            <Segment basic textAlign={"center"}>
                                <Login  onLoggedIn={this.handleLoggedIn} />
                            </Segment>
                        </Segment>
                    </div>
                    )}

            </>
        )
    }
}

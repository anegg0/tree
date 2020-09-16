import './App.css';

import FileUpLoader from './FileUpLoader';
import React from 'react';

import { Grid, Segment, Input, Button, Header, Form, List, Message, Icon, Image, Tab } from 'semantic-ui-react';
import { IpfsFile } from './IpfsFileType';
import { Login } from '../Login';
import { Profile } from '../Profile/Profile';
import { Auth } from '../types';
import logo from './logo.svg';

const LS_KEY = 'login-with-metamask:auth';

interface State {
    webServiceErrorStatus: string;
    auth?: Auth;
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

interface Props {
    auth: Auth;
    onLoggedOut: () => void;
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
            <Segment basic className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Tree Proof of Plant</h1>
                </header>
                <div className="App-intro">
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
                </div>
            </Segment>
        );
    }
}

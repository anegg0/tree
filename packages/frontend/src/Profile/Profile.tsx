import './Profile.css';
import jwtDecode from 'jwt-decode';
import React from 'react';
import Blockies from 'react-blockies';

import { Message, Form, Card, Input, Segment, Button, Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import { Auth } from '../types';

interface Props {
    auth: Auth;
    onLoggedOut: () => void;
}

interface State {
    loading: boolean;
    user?: {
        id: number;
        username: string;
    };
    username: string;
}

export class Profile extends React.Component<Props, State> {
    state: State = {
        loading: false,
        user: undefined,
        username: '',
    };

    componentDidMount() {
        const {
            auth: { accessToken },
        } = this.props;
        const {
            payload: { id },
        } = jwtDecode(accessToken);

        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => response.json())
            .then((user) => this.setState({ user }))
            .catch(window.alert);
    }

    handleChange = ({
        target: { value },
    }: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ username: value });
    };

    handleSubmit = () => {
        const {
            auth: { accessToken },
        } = this.props;
        const { user, username } = this.state;

        this.setState({ loading: true });

        if (!user) {
            window.alert(
                'The user id has not been fetched yet. Please try again in 5 seconds.'
            );
            return;
        }

        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user.id}`, {
            body: JSON.stringify({ username }),
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
        })
            .then((response) => response.json())
            .then((user) => this.setState({ loading: false, user }))
            .catch((err) => {
                window.alert(err);
                this.setState({ loading: false });
            });
    };

    render() {
        const {
            auth: { accessToken },
            onLoggedOut,
        } = this.props;
        const {
            payload: { publicAddress },
        } = jwtDecode(accessToken);
        const { loading, user } = this.state;

        const username = user && user.username;

        return (
            <Grid divided='vertically'>
                <Grid.Row columns={3}>
                    <Grid.Column>
                        <Segment.Group>
                            <div >
                                <Segment>
                                    You are logged in as: <Blockies seed={publicAddress} />
                                </Segment>
                                <Segment>
                                    Your username is: {username ? <pre>{username}</pre> : 'not set.'}
                                </Segment>
                                <Segment>
                                    Your publicAddress is: <pre>{publicAddress}</pre>
                                </Segment>
                                <Segment>
                                    <Form>
                                        <label htmlFor="username">Change username: </label>
                                        <Input name="username" onChange={this.handleChange} />
                                        <Button disabled={loading} onClick={this.handleSubmit}>
                                            Submit
                              </Button>
                                    </Form>
                                </Segment>
                                <p>
                                    <Button onClick={onLoggedOut}>Logout</Button>
                                </p>
                            </div>
                            <Segment>
                                <Card.Description>
                                </Card.Description>
                                <Form.Field>
                                </Form.Field>
                                <Button>Submit</Button>
                            </Segment>
                            <Segment></Segment>
                            <Segment>
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>

                    <Grid.Column>
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                </Grid.Row>
            </Grid >
        );
    }
}

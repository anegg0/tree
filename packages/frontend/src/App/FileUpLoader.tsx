import React, { useState } from 'react';
import { Grid, Card, Segment, Form, Input, Button, Message } from 'semantic-ui-react';
import { getImageIpfsHash } from './getIpfsHash';
import 'semantic-ui-css/semantic.min.css'
const FileUpLoader = () => {
    const [buffer, setBuffer] = useState<ArrayBuffer>(new ArrayBuffer(0));
    const [resultHash, setResultHash] = useState('');
    const [load, setLoad] = useState<boolean>(true);
    const [end, setEnd] = useState(false);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files as FileList;
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(files[0]);
        reader.onloadend = () => {
            const res = reader.result as string;
            setBuffer(Buffer.from(res));
            console.log(reader.result);
        };
        console.log(buffer);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submitted...');
        setLoad(false);
        const hash: string = await getImageIpfsHash(buffer);
        setResultHash(hash);
        console.log(hash);
        setEnd(true);
    };

    return (
        <>
            <Grid divided='vertically'>
                <Grid.Row columns={3}>

                    <Grid.Column>
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment.Group>
                            <Segment>
                                <Card.Header> File Uploader</Card.Header>
                                <Card.Meta>Max size: 5m</Card.Meta>
                                <Form onSubmit={handleSubmit}>
                                    <Card.Description>
                                        Select file, then hit "Submit"
                      </Card.Description>
                                    <Form.Field>
                                        <Input name="username" type="file" onChange={handleChange}></Input>
                                    </Form.Field>
                                    <Button>Submit</Button>
                                </Form>
                            </Segment>
                            {load ? <></> : <Message as="h3">Uploading...</Message>}
                            {end ? <Message positive>Upload successful :\)</Message> : <></>}
                            <Segment>IPFS Hash : {resultHash}</Segment>
                            <Segment>
                                Check your IPFS Link {' '}
                                <a
                                    href={`https://ipfs.io/ipfs/${resultHash}`}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    here
          </a>
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </>
    );
};

export default FileUpLoader;

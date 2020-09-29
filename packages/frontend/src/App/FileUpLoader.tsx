import React, { useState } from 'react';
import { Container, Divider, Grid, Header, Card, Segment, Form, Input, Button, Message } from 'semantic-ui-react';
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

      <Container>
        {/* Heads up! We apply there some custom styling, you usually will not need it. */}
        <style>
          {`
      html, body {
        background-color: #252839 !important;
      }

      p {
        align-content: center;
        background-color: #495285;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 6em;
      }

      p > span {
        opacity: 0.4;
        text-align: center;
      }
    }
    `}
        </style>

        <Divider />


        <Header as='h2' inverted textAlign='center'>
          File Uploader
    </Header>
        <Header as='h4' inverted textAlign='center'>
          Max size: 5m
  </Header>
        <Grid>

          <Grid.Row>
            <Grid.Column width={4}>
            </Grid.Column>
            <Grid.Column width={8}>
              <p>
                <Form onSubmit={handleSubmit}>
                  <Card.Description>
                    Select the file you wish to store on IPFS:
  </Card.Description>
                  <Form.Field>
                    <div><Input name="username" type="file" onChange={handleChange}></Input>  </div>

                    <form>
                      <Card.Description>
                        Save a picture of your tree to IPFS:

  </Card.Description>
                      <Segment>
                        <Button>Send picture to IPFS</Button>
                      </Segment>
                    </form>
                  </Form.Field>
                </Form>
    {end ?  <Message positive>Your IPFS hash is  {resultHash} </Message>

     :<></> }
                <Segment>

                  <a
                    href={`https://ipfs.io/ipfs/${resultHash}`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
    Click here to view your file (once uploaded) {resultHash}
</a>
                </Segment>
              </p>
            </Grid.Column>
            <Grid.Column width={4}>
            </Grid.Column>
          </Grid.Row>
        </Grid>



        {/* Heads up! Override division color to make it visible on dark background. */}
        <style>
          {`
      .ui.grid.divided:not([class*="vertically divided"]) > .row > .column {
        box-shadow: -1px 0 0 0 #d4d4d4;
      }

      .ui[class*="vertically divided"].grid > .row:before {
        box-shadow: 0 -1px 0 0 rgba(212, 212, 212, 1.0);
      }
    `}
        </style>


        <style>
          {`
      #nested_1, #nested_2 {
        background-color: rgba(96, 112, 175, .2);
        border: 3px dashed #495285;
      }

      #nested_1 p, #nested_2 p {
        background-color: #f2b632;
      }

      #nested_3 {
        background-color: rgba(242, 182, 50, .3);
        border: 3px dashed #f2b632;
      }

      #nested_3 p {
        background-color: #fff;
      }
    `}
        </style>

        <style>
          {`
      #colors p {
        background-color: 000;
        opacity: 0.1;
      }
    `}
        </style>

      </Container>
    </>
  );
};

export default FileUpLoader;

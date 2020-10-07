import React from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'

const MainHeader = () => (
  <Segment placeholder>
      <Header icon name='Leaf'>
      No documents are listed for this customer.
    </Header>
    <Button primary>Add Document</Button>
  </Segment>
)

export default MainHeader

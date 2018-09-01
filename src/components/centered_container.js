import React from 'react'
import { Container, Header, Button} from 'semantic-ui-react'
import ButtonGroup from './button_group';

const CenteredContainer = () => (
  <Container textAlign='center' fluid>
    <b></b>
    <Header as='h2'> Bet 0.1 Ether and recieve 0.19 Ether if you win.</Header>
    <h3></h3>
    <b></b>
    <ButtonGroup/>
  </Container>
)

export default CenteredContainer;

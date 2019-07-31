import React, { Component } from 'react';
import { Container, Form }  from 'react-bootstrap';
import { PlayerService } from '../../services';
import { connect } from 'react-redux'
import { saveUser } from '../../actions/userActions'
import { savePlayer } from '../../actions/playerActions'
import './styles.scss';

class PlayerProfile extends Component {

  componentDidMount() {
    if (!this.props.player) {
      this.getPlayer()
    }
  }

  getPlayer() {

    PlayerService.getPlayer().then((response) => {
      this.setState({ accelerators: response.data.accelerators })
    })
    .catch((error) => {
      alert('ERROR', error);
    })
  }

  render() {
    return (
      <div className='profile'>
        <Container className='mt-5'>
          <Form className="form">
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control size="lg" name="email" type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control size="lg" name="firstName" placeholder="First Name" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control size="lg" name="lastName" placeholder="Last Name" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Experience</Form.Label>
              <Form.Control size="lg" name="experience" placeholder="Experience" />
            </Form.Group>
          </Form>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    player: state.playerReducer.player
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveUser: (user) => dispatch(saveUser(user)),
    savePlayer: (player) => dispatch(savePlayer(player))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerProfile)

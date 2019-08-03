import React, { Component } from 'react';
import { Container, Form, Button }  from 'react-bootstrap';
import CustomInput from '../shared/CustomInput';
import Rating from 'react-rating';
import { getGravatarImage } from '../../utils';
import { PlayerService, UserService } from '../../services';
import { connect } from 'react-redux'
import { updateUser } from '../../actions/userActions'
import { savePlayer } from '../../actions/playerActions'
import cogoToast from 'cogo-toast';
import './styles.scss';

class PlayerProfile extends Component {

  constructor(props) {
     super(props)
     this.state = {
       rating: 1
     }
   }

  componentDidMount() {
    if (!this.props.player) {
      this.getPlayer()
    }
  }

  getPlayer() {
    PlayerService.doGetPlayer().then((response) => {
      this.setState({ rating: response.data.rating })
      this.props.savePlayer(response.data);
    })
    .catch((error) => {
      alert('ERROR', error);
    })
  }

  ratingChange = (value) => {
    this.setState({rating: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      email,
      firstName,
      lastName
    } = event.target;
    const rating = this.state.rating;
    const error = !(email.value && firstName.value && lastName.value && rating)

    if (error) {
      cogoToast.error('Please fill all fields');
    }
    
    const payload = {
      user: {
        email: email.value,
        first_name: firstName.value,
        last_name: lastName.value,
      },
      player: {
        rating: rating
      }
    }
    PlayerService.doPlayerUpdate(payload).then((response) => {
      PlayerService.doGetPlayer().then((response) => {
        console.log('player', response);
        this.props.savePlayer(response.data);
      });
      UserService.doGetUser().then((response) => {
        let user = response.data
        user.photo = getGravatarImage(user.email)
        localStorage.setItem('user', JSON.stringify(user));
        this.props.updateUser(user);
      });
      cogoToast.success('Player Updated');
    })
    .catch((error) => {
      cogoToast.error('Request Error :(');
    })
  }

  render() {
    if (!this.props.user){
      return (<></>)
    }
    const {
      email,
      first_name,
      last_name,
      photo
    } = this.props.user;
    
    return (
      <div className='profile'>
        <Container className='mt-5'>
          <img src={photo} alt='User profile' className="image d-flex mb-5 border border-white rounded-circle" />
          <Form className="form" onSubmit={this.handleSubmit}>
            <CustomInput
              name="email"
              value={email}
              required={true}
              label="Email"
              type="email"
            />
            <CustomInput
              name="firstName"
              value={first_name}
              required={true}
              label="First Name"
            />
            <CustomInput
              name="lastName"
              value={last_name}
              required={false}
              label="Last Name"
            />
            <label>Rate your skill Level</label>
            <Rating
              initialRating={this.state.rating}
              className="mb-4"
              stop={10}
              onChange={(value) => this.ratingChange(value)}
            />
            <Button variant="secondary" type="submit">
              Submit
            </Button>
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
    updateUser: (user) => dispatch(updateUser(user)),
    savePlayer: (player) => dispatch(savePlayer(player))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerProfile)

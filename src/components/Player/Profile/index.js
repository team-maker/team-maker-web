import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Form, Button }  from 'react-bootstrap';
import CustomInput from '../../shared/CustomInput';
import Rating from 'react-rating';
import { getGravatarImage } from '../../../utils';
import { UserService } from '../../../services';
import { updateUser } from '../../../actions/userActions'
import { startFetch, endFetch } from '../../../actions/generalActions'
import cogoToast from 'cogo-toast';
import './styles.scss';

class Profile extends Component {

  constructor(props) {
     super(props)
     this.state = {
       rating: props.user.player.rating
     }
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
      email: email.value,
      first_name: firstName.value,
      last_name: lastName.value,
      player: {
        rating: rating
      }
    }
    const userId = this.props.user.id;
    this.props.startFetch();
    UserService.doUpdateUser(userId, payload)
      .then((response) => {
        UserService.doGetUser(userId)
          .then((response) => {
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
      .finally(() => {
        this.props.endFetch();
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
      photo,
    } = this.props.user;
    

    return (
      <div className='content profile'>
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
              empty="custom-empty" 
              full="custom-full"
              className="mb-4 rating"
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
    user: state.userReducer.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    startFetch: () => dispatch(startFetch()),
    endFetch: () => dispatch(endFetch())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

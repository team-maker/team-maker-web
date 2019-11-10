import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Form, Button }  from 'react-bootstrap';
import { TeamPlayerService } from '../../../../services';
import { startFetch, endFetch } from '../../../../actions/generalActions'
import Rating from 'react-rating';
import cogoToast from 'cogo-toast';
import './styles.scss';

class EvaluateForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: props.teamPlayer.evaluated_rating
    }
  }

  ratingChange = (value) => {
    this.setState({rating: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const rating = this.state.rating;

    if (!rating) {
      cogoToast.error('Please fill ranking evaluation');
    }
    
    const {
      team,
      teamPlayer
    } = this.props;
    const payload = {
      rating: rating
    }
    this.props.startFetch();

    TeamPlayerService.doEvaluateTeamPlayer(team.id, teamPlayer.id, payload)
      .then((response) => {
        cogoToast.success(`Thanks for evaluating ${teamPlayer.player.first_name}`);
        this.props.getGetTeamPlayerStats(teamPlayer.id);
      })
      .catch((error) => {
        cogoToast.error('ERROR');
      })
      .finally(() => {
        this.props.endFetch();
      })
  }


  render() {
    const {
      teamPlayer
    } = this.props;

    return (
      <div className='mt-2 content'>
        <Container>
          <Form className="evaluate-form" onSubmit={this.handleSubmit}>
            <label>{`Rate ${teamPlayer.player.first_name} skill Level`}</label>
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

function mapDispatchToProps(dispatch) {
  return {
    startFetch: () => dispatch(startFetch()),
    endFetch: () => dispatch(endFetch())
  }
}

export default connect(null, mapDispatchToProps)(EvaluateForm)


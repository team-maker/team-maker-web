import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Form, Button }  from 'react-bootstrap';
import CustomInput from '../../shared/CustomInput';
import ContentNavbar from '../../shared/ContentNavbar';
import { GameService } from '../../../services';
import { startFetch, endFetch } from '../../../actions/generalActions'
import cogoToast from 'cogo-toast';
import './styles.scss';

var moment = require('moment');

class GameNew extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      date,
    } = event.target;

    const error = !(date.value)

    if (error) {
      cogoToast.error('Please fill all fields');
    }
    const team = this.props.team;

    const payload = {
      date: date.value,
      team_id: team.id
    }
    

    this.props.startFetch();
    GameService.doCreateGame(team.id, payload)
      .then((response) => {
        cogoToast.success('Game Created');
        this.props.history.push(`/teams/${team.id}/games`);
      })
      .catch((error) => {
        cogoToast.error('Request Error :(');
      })
      .finally(() => {
        this.props.endFetch();
      })
    
  }


  render() {
    const {
      team
    } = this.props;

    return (
      <>
        <ContentNavbar
          title={`Create ${team.name} Game`}
          backLink={`/teams/${team.id}/games`}
        />
        <div className='content profile'>
          <Container className='mt-5'>
            <Form className="form" onSubmit={this.handleSubmit}>
              <CustomInput
                name="date"
                value={moment().format('YYYY-MM-DD')}
                required={true}
                label="Game Date"
                type="date"
              />
              <Button variant="secondary" type="submit">
                Create
              </Button>
            </Form>
          </Container>
        </div>
      </>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startFetch: () => dispatch(startFetch()),
    endFetch: () => dispatch(endFetch())
  }
}

export default connect(null, mapDispatchToProps)(GameNew)



import React, { Component } from 'react';
import { connect } from 'react-redux';
import RuleCard from './ruleCard'
import { RulesService } from '../../../services';
import { startFetch, endFetch } from '../../../actions/generalActions'
import cogoToast from 'cogo-toast';
import './styles.scss';

class Rules extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      rules: []
    }
   }

  componentDidMount() {
    const teamId = this.props.team.id;
    this.getGetTeamRules(teamId);
  }

  getGetTeamRules(teamPlayerId) {
    this.props.startFetch();
    RulesService.doGetTeamRules(teamPlayerId)
      .then((response) => {
        this.setState({rules: response.data});
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
      team
    } = this.props;

    const rules = this.state.rules;
    return (
      <div className="content rules">
        <h2 className="font-weight-bold mb-4">{`${team.name} Rules`}</h2>
        <div className="wrapper">
          {
            rules.map(teamRule => (
              <RuleCard teamRule={teamRule}/>
            ))
          }
        </div>
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

export default connect(null, mapDispatchToProps)(Rules)


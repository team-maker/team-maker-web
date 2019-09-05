import React, { Component } from 'react';
import { Card }  from 'react-bootstrap';
import './styles.scss';

class RuleCard extends Component {

  EditRuleSubmit = () => {

  }

  render() {
    const {
      teamRule
    } = this.props;

    const rule = teamRule.rule;
    return (
      <Card className="mb-3">
        <Card.Body>
          <h2 className="font-weight-bold mb-2">{rule.rule_type}<span className="points">{teamRule.points_amount}</span></h2>
          <p className="mb-2">{ rule.description }</p>
        </Card.Body>
      </Card>
    )
  }
}

export default (RuleCard)


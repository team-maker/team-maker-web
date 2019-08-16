import React, { Component } from 'react';
import { Button }  from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import './styles.scss';

class Invite extends Component {

  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    cogoToast.success('Copied to Clipboard')
  };

  joinLink(token) {
    return `${window.location.protocol}//${window.location.host}/teams/join?token=${token}`
  }

  render() {
    const {
      team
    } = this.props;


    return (
      <div className="invites">
        <h2 className="font-weight-bold mb-4">Invites</h2>
        <form className="copy-form">
          <input
            className="mr-1"
            ref={(textarea) => this.textArea = textarea}
            value={this.joinLink(team.token)}
          />
          {
             /* Logical shortcut for only displaying the 
                button if the copy command exists */
             document.queryCommandSupported('copy') &&
              <div>
                <Button variant="secondary" onClick={this.copyToClipboard}>
                  Copy Invite Link to Clipboard
                </Button> 
              </div>
          }
        </form>
      </div>
    )
  }
}

export default (Invite)


import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Connexion extends Component {
  state = {
    pseudo: "",
    goToChat: false
  };

  /**
   * Handle pseudo box change
   * @function handleChange
   * @param event Input text event
   */
  handleChange = event => {
    const pseudo = event.target.value;
    this.setState({ pseudo });
  };

  /**
   * Handle submit form action
   * @function handleSubmit
   * @param  event Form event
   */
  handleSubmit = event => {
    event.preventDefault(); // Use my handler instead of form default event (redirect with ?)
    this.setState({ goToChat: true })
  };

  render() {
    const { pseudo, goToChat } = this.state;

    // If form is submit (goToChat => true), redirect with Router with pseudo
    if (goToChat) {
      return <Redirect push to={`/pseudo/${pseudo}`} />;
    }

    return (
      <div className="connexionBox">
        <form className="connexion" onSubmit={this.handleSubmit}>
          <input
            value={pseudo}
            onChange={this.handleChange}
            placeholder="Pseudo"
            type="text"
            required
          />
          <button type="submit">Go</button>
        </form>
      </div>
    );
  }
}

export default Connexion;

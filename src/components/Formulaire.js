import React, { Component } from "react";

class Formulaire extends Component {
  state = {
    message: "",
    length: this.props.length
  };

  /**
   * Create,format and send message to App.js state
   * @function createMessage
   */
  createMessage = () => {
    const { addMessage, pseudo, length } = this.props;
    const message = {
      pseudo,
      message: this.state.message
    };
    addMessage(message);
    this.setState({ message: "", length }); // Reset message value after message is created
  };

  /**
   * Handle submit form action
   * @function handleSubmit
   * @param  event Form event
   */
  handlSubmit = event => {
    event.preventDefault();
    this.createMessage();
  };

  /**
   * Handle textarea change
   * @function handleChange
   * @param event Input textarea event
   */
  handleChange = event => {
    const message = event.target.value;
    const length = this.props.length - message.length;
    this.setState({ message, length });
  };

  /**
   * Handle textarea key up
   * @function handleKeyUp
   * @param  event Input textarea event
   */
  handleKeyUp = event => {
    if (event.key === 'Enter') {
      this.createMessage();
    }
  }

  render() {
    const { length } = this.state;

    return (
      <form className="form" onSubmit={this.handlSubmit}>
        <textarea
          onChange={this.handleChange}
          value={this.state.message}
          required
          maxLength={length}
          onKeyUp={this.handleKeyUp}
        />
        <div className="info">{length}</div>
        <button className="submit">Envoyer!</button>
      </form>
    );
  }
}

export default Formulaire;

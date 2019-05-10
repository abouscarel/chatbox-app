// Node modules
import React, { Component, createRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

// Styles
import "./App.css";
import "./animation.css";

// Components
import Formulaire from "./components/Formulaire";
import Message from "./components/Message";

// Firebase
import base from "./base";

class App extends Component {
  state = {
    messages: {},
    pseudo: this.props.match.params.pseudo // Get pseudo from URL
  };

  messagesRef = createRef();

  componentDidMount() {
    // Sync this.state.messages with firebase
    base.syncState("/", {
      context: this,
      state: "messages"
    });
  }

  componentDidUpdate() {
    // Get messages container ref
    const ref = this.messagesRef.current;
    // Scroll to bottom
    ref.scrollTop = ref.scrollHeight;
  }

  addMessage = message => {
    const messages = { ...this.state.messages };
    messages[`message-${Date.now()}`] = message;
    // Remove old messages to keep 10 lastest
    Object.keys(messages)
      .slice(0, -10)
      .forEach(key => (messages[key] = null));
    this.setState({ messages });
  };

  isUser = pseudo => pseudo === this.state.pseudo;

  render() {
    const { pseudo } = this.state;

    const messages = Object.keys(this.state.messages).map(key => (
      <CSSTransition 
        timeout={200} 
        key={key} 
        classNames='fade'>
        <Message
          isUser={this.isUser}
          message={this.state.messages[key].message}
          pseudo={this.state.messages[key].pseudo} />
      </CSSTransition>
    ));

    return (
      <div className="box">
        <div>
          <div className="messages" ref={this.messagesRef}>
            <TransitionGroup className="message">
              {messages}
            </TransitionGroup>
          </div>
        </div>
        <Formulaire length={140} pseudo={pseudo} addMessage={this.addMessage} />
      </div>
    );
  }
}

export default App;

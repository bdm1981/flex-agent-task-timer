import React from "react";
import { connect } from "react-redux";
import Countdown from "react-countdown-now";

// Set text color to white
const TaskSIDText = {
  color: "#FFF"
};

class CustomCRM extends React.Component {
  state = {
    counterAcitve: false
  };

  render() {
    // Retrieve Task details
    // (`task` will be undefined if there's no task selected in the UI)
    const { task, chat } = this.props;

    if (task && chat) {
      let channelSid = task.source.attributes.channelSid;

      let currentChat = chat[channelSid];
      console.log("***************", currentChat);
      let message = currentChat.messages[currentChat.messages.length - 1];
      console.log(message);
      //let lastStamp = message.source.state.dateUpdated;

      // if (!message.isFromMe) {
      //   this.setState({ counterAcitve: true });
      // }

      // console.log("task details: ", this.props.chat);
      // Render Task SID in component as a test
      return (
        <div>
          <p>First, make sure we can access the current Task data.</p>
          <p>
            Task Timer: {this.state.timer}
            Task SID:{" "}
            <span style={{ fontWeight: "bold" }}>
              {task ? task.sid : "No task selected"}
            </span>
          </p>
          {!message.isFromMe && (
            <h1>
              <Countdown
                date={Date.now() + 10000}
                onComplete={() => alert("You are fired")}
              />
            </h1>
          )}
        </div>
      );
    } else {
      return <div />;
    }
  }
}

// The withTaskContext() helper function creates a
// Higher-Order Component that uses the Context API
// to access Task data, then adds the Task data to
// the wrapped component.

const mapStateToProps = state => ({
  chat: state.flex.chat.channels
});

export default connect(mapStateToProps)(CustomCRM);

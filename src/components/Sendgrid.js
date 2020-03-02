import React, { Component } from 'react';
import axios from 'axios';

export default class Sendgrid extends Component {
    constructor(){
        super();
        this.state={
            email: {
                recipient: '',
                sender: '',
                subject: '',
                text: ''
              }
        }
    }
    sendEmail=()=>{
      const {email}= this.state;
        axios.post(`/send-email?recipient=${email.recipient}&sender=${email.sender}&topic=${email.subject}&text=${email.text}`).then((response)=>console.log(response)).catch((err)=>{console.log(err)})
        window.alert('We sent your request.')
    }
    render() {
        const {email}= this.state;
        return (
            <div >
              <div>
                <h2>Register Your Event </h2>
                <label> Recipient </label>
                <br />
                <input value={email.recipient}
                  onChange={e => this.setState({ email: { ...email, recipient: e.target.value } })} />
                <div  />
                <label> Sender </label>
                <br />
                <input value={email.sender}
                  onChange={e => this.setState({ email: { ...email, sender: e.target.value } })} />
                <div />
                <label> Subject </label>
                <br />
                <input value={email.subject}
                  onChange={e => this.setState({ email: { ...email, subject: e.target.value } })} />
                <div/>
                <label> Message </label>
                <br />
                <textarea rows={3} value={email.text} placeholder="Please give info about your event.
                -title, description
                -date/time,
                -address,
                -What volunteers will do?"
                  onChange={e => this.setState({ email: { ...email, text: e.target.value } })} />
                <div />
                <button onClick={this.sendEmail}> Send Email </button>
              </div>
            </div>
          );
    }
}

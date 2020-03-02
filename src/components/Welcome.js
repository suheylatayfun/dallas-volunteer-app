import React, {Component} from 'react';
import Header from './Header';
import '../styles/Welcome.scss';

class Welcome extends Component {


  render() {
    return (
      <div className="welcome">
        <Header/>
        <img src="https://images.unsplash.com/photo-1528459584353-5297db1a9c01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1075&q=80" alt="plain"/>
        {/* <button id="join-button">Join the Community</button> */}
        <h1 id="how">HOW IT WORKS ?</h1>
        <section>
          <h1>For Organizations</h1>
          <ol>
          <li>Register your organization</li>
            <li>Click Add Event button</li>
            <li>Approve Pending Volunteers</li>
            <li>You're done.</li>
          </ol>
        </section>
        <section>
          <h1>For Volunteers</h1>
          <ol>
            <li>Register</li>
            <li>Look at upcoming events</li>
            <li>Click Volunteer button</li>
            <li>Wait for being approved by the organization</li>
            
          </ol>
        </section>
      </div>
    );
  }
}

export default Welcome;

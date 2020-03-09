import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ContactUs.css";

export class ContactUs extends Component {
  render() {
    return (
      <div className="contact-clean card container-fluid">
        <form data-bss-recipient="551c7f5ddc31cc40b55611f2936a5296">
          <h2 className="header">Contact us</h2>

          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="name"
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              name="message"
              placeholder="Message"
              rows="14"
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn primaryButton" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    );
  }
}

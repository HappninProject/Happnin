import React, { Component } from "react";

export class ZipCode extends Component{
    constructor(props) {
        super(props);
        this.state={
            showZip: false,
            isValidZip: false
        }
    }

    //these show or hide dropdowns if input is clicked on
    showOrHideZip = () =>
        this.setState(currentState => ({ showZip: !currentState.showZip }));
    showOrHideUser = () =>
        this.setState(currentState => ({ showUser: !currentState.showUser }));
    showOrHidePassReq = () =>
        this.setState(currentState => ({ showPassReq: !currentState.showPassReq }));
    showOrHideConfirmPass = () =>
        this.setState(currentState => ({
        showConfirmReq: !currentState.showConfirmReq
    }));

    //this makes sure that the zip code is valid, then add the valid or invalid classes accordingly
    validateZip = event => {
    const target = event.target;
    const zipValue = target.value;
    zipValue.length === 5
        ? this.setState({ isValidZip: true })
        : this.setState({ isValidZip: false });
    };

    render(){
        return(

            <div className="form-group">
                <label>Zip code: </label>
                <input
                id="zip"
                className="form-control"
                name="zipcode"
                type="number"
                pattern="^\d{5}$"
                placeholder="99004"
                onFocus={this.showOrHideZip}
                onBlur={this.showOrHideZip}
                onKeyUp={this.validateZip}
                required
                />
                {this.state.showZip && (
                <p
                    id="zipDigits"
                    className={this.state.isValidZip ? "valid" : "invalid"}
                >
                    Zip code must be 5 digits
                </p>
                )}
            </div>
        );
    }
}
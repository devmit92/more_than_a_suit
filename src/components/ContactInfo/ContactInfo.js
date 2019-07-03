import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../redux/mapRedux/mapStateToProps';
import NumberFormat from 'react-number-format';
import { Textbox } from 'react-inputs-validation';

class ContactInfo extends Component {

    state = {
        userInfo: {
            first_name: '',
            last_name: '',
            zip: '',
            phone: '',
            email: '',
            first_name_err: '',
            last_name_err: '',
            zip_err: '',
            phone_err: ''
        }
    }

     validate = () => {
        let first_name_err = '';
        let last_name_err = '';
        let zip_err = '';
        let phone_err = '';
    }
    
     handleClick = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
        }
        this.props.dispatch({ type: 'POST_CONTACT_INFO', payload: this.state.userInfo })
        this.setState({
            userInfo: {
                first_name: '',
                last_name: '',
                zip: '',
                phone: '',
                email: ''
            }
        });
        this.props.history.push('/measurements');
    }

    onFormChange = (dataname) => event => {
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                [dataname]: event.target.value
            }
        });
    }

    render() {
        const infoInputs = (
            <form onSubmit={this.handleClick}>
                <span>Contact Info:</span><br />
                <input type="text"
                    value={this.state.userInfo.first_name}
                    onChange={this.onFormChange('first_name')}
                    required="required"
                    placeholder="First Name"
                /> <br />
                <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.userInfo.first_name_err}</div>
                <input type="text"
                    value={this.state.userInfo.last_name}
                    onChange={this.onFormChange('last_name')}
                    placeholder="Last Name"
                /> <br />
                <input type="text"
                    value={this.state.userInfo.zip}
                    onChange={this.onFormChange('zip')}
                    placeholder="Zip Code"
                /> <br />
                <NumberFormat
                    format="(###) ###-####"
                    value={this.state.userInfo.phone}
                    mask="_"
                    onChange={this.onFormChange('phone')}
                    placeholder="Cell Phone Number"
                /> <br />
                <input type="text"
                    value={this.state.userInfo.email}
                    onChange={this.onFormChange('email')}
                    placeholder="E-Mail"
                /><br />
                <button type="submit">Next</button>
            </form>
        )

        return (
            <div>{infoInputs}</div>
        )
    }
};

export default connect(mapStateToProps)(ContactInfo);
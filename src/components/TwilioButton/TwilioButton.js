import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStateToProps from '../../redux/mapRedux/mapStateToProps';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

class TwilioButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }

    testMethod = () => {
        this.props.history.push('/resources')
        .then(() => {
            MySwal.fire({
                title: <h1>Thank you!</h1>,
                html: <p>A text is on its way to you</p>,
                footer: 'Suits for Hire',
                onOpen: () => {
                    MySwal.clickConfirm()
                }
            })
        })
    }

    sendText = () => {
        this.props.dispatch({
            type: 'POST_TWILIO',
            payload: {
                phoneNumber: this.props.info.phone,
                appointmentDate: this.props.info.appointment_date,
                appointmentTime: this.props.info.appointment_time
            }
        });
        this.testMethod();
    }

    render() {
        return (
            <div>
                <button onClick={this.sendText}>Confirm</button>
            </div>
        )
    }
}

export default connect(mapStateToProps)(TwilioButton);

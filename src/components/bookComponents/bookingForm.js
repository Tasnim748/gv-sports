// all the imports
import React from "react";
import { Fragment } from "react";
import { useState, useReducer } from "react";
import { Form, Button } from 'react-bootstrap';
import { TimeSlots } from "../../data/bookingRecords";
import MsgModal from "../modals/msgModal";
import axios from "axios";
import Spinner from "../ui/spinner";
import './bookingForm.css';

// phone and slot reducers
const phoneReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return {value: action.val, isValid: /^01[3-9]\d{8}$/.test(action.val)};
    }
    if (action.type === 'AFTER_SUBMIT') {
        return {value: "", isValid: undefined};
    }
    return {value: '', isValid: undefined};
};

const slotReducer = (state, action) => {
    if (action.type === 'SLOT_INPUT') {
        return {value: action.slt, isValid: !action.slt.startsWith('S')};
    }
    if (action.type === 'INPUT_BLUR') {
        return {value: state.slt, isValid: !state.slt.startsWith('S')};
    }
    return {value: '', isValid: undefined};
}

// main components starts here

const BookingForm = props => {

    // state declarations
    const [selectedDates, setSelectedDates] = useState([]);
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [phoneState, dispatchPhone] = useReducer(phoneReducer, {value: '', isValid: undefined});
    const [slotState, dispatchSlot] = useReducer(slotReducer, {slt: 'Select Slot', isValid: undefined});
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // array declaration for bookedSlots and availableSlots
    const bookedTimeSlots = [];
    const availableTimeSlots = [];

    // changeHandler functions (4 functions are in this segment)
    const nameChangeHandler = e => {
        setName(e.target.value);
    }

    const phoneChangeHandler = e => {
        dispatchPhone({type: 'USER_INPUT', val: e.target.value});
    }

    const dateChangeHandler = e => {
        if (e.target.value !== '') {
            setDate(e.target.value);
            setLoading(true);
            axios.get("https://pure-peak-34973.herokuapp.com/booking", {
                params: {
                    date: e.target.value,
                }
            }).then(response => {
                setLoading(false);
                setSelectedDates(response.data);
                console.log(response.data);
                if (response.data.length === 11) {
                    setTitle("Slot Unavailable 😢");
                    setMessage("No slot is available for booking on this date, please try another date!");
                    setShowModal(!showModal);
                } else {
                    setTitle("Slots are Available!");
                    setMessage("Available slots on this date are loaded, please click close and select your slot to continue!");
                    setShowModal(!showModal);
                }

            }).catch(err => {
                setLoading(false);
                setTitle("Network Error");
                setMessage("Cannot load available slots due to network error !");
                setShowModal(!showModal);
            });
        } else {
            setDate('');
        }
    };

    const slotChangeHandler = e => {
        dispatchSlot({type: 'SLOT_INPUT', slt: e.target.value});
    };

    // submitHandler function
    const submitHandler = e => {
        e.preventDefault();
        setLoading(true);
        const payload = {
            name: name,
            phone: phoneState.value,
            date: date,
            slot: slotState.value,
            dateSlot: date + " " + slotState.value
        }
        let dateForm = new Date(payload.date);
        axios.post("https://pure-peak-34973.herokuapp.com/booking", payload)
            .then(response => {
                setLoading(false);
                setName("");
                setDate("");
                dispatchPhone({type: 'AFTER_SUBMIT'});
                dispatchSlot({type: 'SLOT_INPUT', slt: ""});
                setTitle("Booking Successful");
                setMessage(`You've successfully booked your slot at '${payload.slot}' on ${dateForm.toLocaleDateString('en-us', { month:"long", weekday:"long", day:"numeric", year:"numeric"})}`);
                setShowModal(!showModal);
            })
            .catch(err => {
                setLoading(false);
                if (err.code === 'ERR_BAD_REQUEST') {
                    setTitle("Try Another Slot");
                    setMessage("Someone already booked this slot in the meantime!");
                    setShowModal(!showModal);
                } else {
                    setTitle("Network Error");
                    setMessage("Cannot submit data due to network error!");
                    setShowModal(!showModal);
                }
                console.log(err)
            });
    }

    const toggleModal = () => {
        setShowModal(!showModal);
    }
    
    // preparing array of available slots
    if (date !== '') {
        for (let item of selectedDates) {
            bookedTimeSlots.push(item.slot);
        }
    
        for (let item of TimeSlots) {
            if (!bookedTimeSlots.includes(item)) {
                availableTimeSlots.push(item);
            }
        }
    }
    
    // html (jsx) code the form
    const form = (
        <div style={{ margin: '40px' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Submit your GreenVille Futsal booking here</h2>
            </div>
            <Form style={{ marginTop: '40px', padding: '40px', borderRadius: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)' }} onSubmit={submitHandler}>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Label><strong>Phone Number</strong></Form.Label>
                    <Form.Control type="text" placeholder="Enter phone number" className={phoneState.isValid === false ? 'invalid' : ''} required value={phoneState.value} onChange={phoneChangeHandler} />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label><strong>Name</strong></Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" required value={name} onChange={nameChangeHandler} />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label><strong>Select Date (Click on calendar icon on the right)</strong></Form.Label>
                    <Form.Control type="date" value={date} onChange={dateChangeHandler} required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label><strong>Available Slots</strong></Form.Label>
                    <Form.Select aria-label="Default select example" className={slotState.isValid === false ? 'invalid' : ''} value={slotState.value} onChange={slotChangeHandler}>
                        <option>Select Slot</option>
                        {availableTimeSlots.map((slot, id) => {
                            return (
                                <option key={id} value={slot}>{slot}</option>
                            );
                        })}
                    </Form.Select>
                </Form.Group>
                {/* <Form.Group className="mb-4">
                    <Form.Label><strong>Field Selection</strong></Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Open this select menu</option>
                        <option value="1">Natural Grass</option>
                        <option value="2">Turf</option>
                    </Form.Select>
                </Form.Group> */}
                <Button variant="primary" type="submit" disabled={!(phoneState.isValid && slotState.isValid && date !== '' && name !== '')}>
                    Submit
                </Button>
            </Form>
        </div>
    );
    
    // returning the whole component
    return (
        <Fragment>
            {!loading ? form : <Spinner />}
            <MsgModal title={title} message={message} modalShow={showModal} toggleModal={toggleModal} />
        </Fragment>
    );
};

export default BookingForm;
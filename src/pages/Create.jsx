import Header from "../components/Header"
import { states } from "../utils/states";
import { department } from "../utils/department";
import { useDispatch } from "react-redux";
import { Form } from "react-personalized-form";
import React, { useState } from "react";
import { Modal } from "react-personalized-modal";
import { saveEmployee } from "../store/actions";

export function Create() {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmitForm = (data) => {
        dispatch(saveEmployee(data));
        setIsOpen(true);
    }

    const handleCloseModal = () => {
        setIsOpen(false); 
    }

    const statesName = states.map(state => state.name);

    const message = "Employee successfully created"

    return (
        <div className="mainCreate">
            <Header />
            <Form 
                modalName={'Create Employee'} 
                input={{
                    'First Name': [true,'text'],
                    'Last Name': [true, 'text'],
                    'Date of Birth': [true, 'date'],
                    'Start Date': [true, 'date'],
                    'Street': [true, 'text'],
                    'City': [true, 'text'],
                    'State': [true, 'select', statesName],
                    'Zip Code': [true, 'number'],
                    'Department': [true, 'select', department],
                }}
                submitButton={'Save'}
                onSubmit={handleSubmitForm}
            />    
            <Modal
                open={isOpen}
                onCloseModal={handleCloseModal}
                message={message}
                containerStyle={{
                    backgroundColor: 'white',
                    color: 'black',
                    width: '500px'
                }}
                closeButtonStyle={{
                    backgroundColor: 'black',
                    color: 'white',
                    width: '30px',
                    height: '30px'
                }}
                messageStyle={{
                    fontSize: '20px',
                    textAlign: 'center'
                }}
            />
        </div>
    )
}

export default Create;

import Header from "../components/Header"
import Modal from "../components/Modal"
import { states } from "../utils/states";
import { department } from "../utils/department";
import { saveEmployee } from "../store/actions";
import { useDispatch } from "react-redux";
import { Form } from "react-personalized-form";
import React from "react";


export function Create() {
    const dispatch = useDispatch();

    const handleSubmitForm = (data) => {
        dispatch(saveEmployee(data));
    }
    
    const statesName = []
    
    states.forEach(e => {
      statesName.push(e.name)
    });

    return(
        <div className="mainCreate">
            <Header />
            <Modal 
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
                {/* <Form 
                modalName={'Create Employee'} 
                input={{
                    'First Name': ['text'],
                    'Last Name': ['text'],
                    'Date of Birth': ['date'],
                    'Start Date': ['date'],
                    'Street': ['text'],
                    'City': ['text'],
                    'State': ['select', statesName],
                    'Zip Code': ['number'],
                    'Department': ['select', department],
                }}
                submitButton={'Save'}
                onSubmit={handleSubmitForm}
                /> */}
                
        </div>
    )
}

export default Create
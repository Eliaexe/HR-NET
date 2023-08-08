import Header from "../components/Header"
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
        </div>
    )
}

export default Create
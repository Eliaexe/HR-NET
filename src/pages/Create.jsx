import Header from "../components/Header.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { states } from "../utils/formUtils/states.jsx";
import { departments } from "../utils/formUtils/departments.jsx";
import { saveEmployee } from "../store/actions.jsx";
import { Link } from "react-router-dom"
import { Modal } from "react-personalized-modal";
import { useState } from 'react';


export default function Create() {
  const dispatch = useDispatch();
  const statesName = states.map(state => state.name);

  const [isOpen, setIsOpen] = useState(false);

    const employees = useSelector((state) => state.employees.employees);
    let isPopulated = employees.length >= 1
    const location = window.location.href.includes('list')

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const inputElements = document.querySelectorAll('.theInputTeam'); // Seleziona gli elementi con la classe "input-element"
    const valuesObject = {};

    Array.from(inputElements).forEach(element => {
        const name = element.getAttribute('data-name');
        const value = element.value;
        
        valuesObject[name] = value;
    });
    document.querySelector('.form').reset()

    setIsOpen(true)
    dispatch(saveEmployee(valuesObject));
};

const handleCloseModal = () => {
  setIsOpen(false); 
}
const message = "Employee successfully created"
  return (
    <div>
   <Header/>
    <div className="mainCreate">
      <main className="main">
        <h1>Create Employee</h1>
        <form onSubmit={handleFormSubmit} className="form">
            <div
                className="input-wrapper"
                data-name='First Name'
                data-type='text'
            >
                <label htmlFor='first-name'>First Name</label>
                <input 
                    type='input'    
                    id='first-name' 
                    data-name='First Name' 
                    required='required' 
                    className="theInputTeam"
                />
            </div>
            <div
                className="input-wrapper"
                data-name='Last Name'
                data-type='text'
            >
                <label htmlFor='last-name'>Last Name</label>
                <input 
                    type='input'    
                    id='last-name' 
                    data-name='Last Name' 
                    required='required' 
                    className="theInputTeam"
                />
            </div>
            <div
                className="input-wrapper"
                data-name='Date of Birth'
                data-type='text'
            >
                <label htmlFor='date-of-birth'>Date of Birth</label>
                <input 
                    type='date'    
                    id='date-of-birth' 
                    data-name='Date of Birth' 
                    required='required' 
                    className="theInputTeam"
                />
            </div>
            <div
                className="input-wrapper"
                data-name='Start Date'
                data-type='text'
            >
                <label htmlFor='start-date'>Start Date</label>
                <input 
                    type='date'    
                    id='start-date' 
                    data-name='Start Date' 
                    required='required' 
                    className="theInputTeam"
                />
            </div>
            <div
                className="input-wrapper"
                data-name='Street'
                data-type='text'
            >
                <label htmlFor='street'>Street</label>
                <input 
                    type='input'    
                    id='street' 
                    data-name='Street' 
                    required='required' 
                    className="theInputTeam"
                />
            </div>
            <div
                className="input-wrapper"
                data-name='City'
                data-type='text'
            >
                <label htmlFor='city'>City</label>
                <input 
                    type='input'    
                    id='city' 
                    data-name='City' 
                    required='required' 
                    className="theInputTeam"
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor='state'>State</label>
                <select 
                    name='State' 
                    id='state' 
                    data-name='State' 
                    required='required' 
                    className="theInputTeam"
                >
                    {statesName.map((state, index) => (
                        <option key={index} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
            </div>
            <div
                className="input-wrapper"
                data-name='Zip Code'
                data-type='text'
            >
                <label htmlFor='zip-code'>Zip Code</label>
                <input 
                    type='input'    
                    id='zip-code' 
                    data-name='Zip Code' 
                    required='required' 
                    className="theInputTeam"
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor='department'>Department</label>
                <select 
                    name='Department' 
                    id='department' 
                    data-name='Department' 
                    required='required' 
                    className="theInputTeam"
                >
                    {departments.map((department, index) => (
                        <option key={index} value={department}>
                            {department}
                        </option>
                    ))}
                </select>
            </div>
            <button id="submit" className="save-button" type="submit">
                Save
            </button>
        </form>
      </main>
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
    </div>
  )
}

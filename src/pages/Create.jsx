import Header from "../components/Header"
import Modal from "../components/Modal"
import { states } from "../utils/states";
import { department } from "../utils/department";

export function Create() {

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
                    'First Name': ['text', 'required'],
                    'Last Name': ['text', 'required'],
                    'Date of Birth': ['date', 'required'],
                    'Start Date': ['date', 'required'],
                    'Street': ['text', 'required'],
                    'City': ['text', 'required'],
                    'State': ['select', 'required', statesName],
                    'Zip Code': ['number', 'required'],
                    'Department': ['select', 'required', department],
                }}
                submitButton={'Save'}
                
                />
                
        </div>
    )
}

export default Create
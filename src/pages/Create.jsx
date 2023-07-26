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
                />
                
        </div>
    )
}

export default Create
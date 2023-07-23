import Header from "../components/Header"
import Modal from "../components/Modal"

export function Create() {
    return(
        <div className="mainCreate">
            <Header />
            <h1>Create Employee</h1>
            <Modal input={{
                'First Name': 'text',
                'Last Name': 'text',
                'Date of Birth': 'date',
                'Start Date': 'date',
                'Street': 'text',
                'City': 'text',
                'State': 'select',
                'Zip Code': 'number',
                'Department': 'select',
                }}/>
        </div>
    )
}

export default Create
import { useDispatch, useSelector } from "react-redux";
import { saveEmployee } from "../store/actions";

export default function Modal() {
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll("input");
    const newEmployeeData = {};
    inputs.forEach((input) => {
      newEmployeeData[input.id] = input.value;
    });
    dispatch(saveEmployee(newEmployeeData));

  };

  console.log(employees); // Stampa la lista di employee nello stato

    return(
        <section className="modal">
                <form className="form" id="form" onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        <input type="date" id="dateOfBirth" />
                    </div>                
                    <div className="input-wrapper">
                        <label htmlFor="startDate">Start Date</label>
                        <input type="date" id="startDate" />
                    </div>
                    <div className="address">
                        <div className="input-wrapper">
                            <label htmlFor="street">Street</label>
                            <input type="text" id="street" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="state">State</label>
                            <input type="dropdown" id="state" />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="zipCode">Zip Code</label>
                            <input type="number" id="zipCode" />
                        </div>
                    </div>
                    <div className="input-wrapper">
                            <label htmlFor="department">Department</label>
                            <input type="dropdown" id="department" />
                        </div>
                    <button id="submit" className="save-button" type="submit">Save</button>
                </form>
            </section>
    )
}
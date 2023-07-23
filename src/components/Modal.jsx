import { useDispatch, useSelector } from "react-redux";
import { saveEmployee } from "../store/actions";

export default function Modal(props) {
  const modalStructure = props.input;
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll("input");
    const newEmployeeData = {};
    inputs.forEach((input) => {
      newEmployeeData[input.id] = input.value;
    });

    // Controllo campi obbligatori, ad esempio:
    if (!newEmployeeData.firstName || !newEmployeeData.lastName) {
      alert("Please fill in all required fields");
      return;
    }

    dispatch(saveEmployee(newEmployeeData));
  };

  const renderModal = () => {
    const inputElements = [];

    for (const input in modalStructure) {
      if (Object.hasOwnProperty.call(modalStructure, input)) {
        const type = modalStructure[input];
        const metadata = input.toLowerCase().split(" ").join("_");
        if (type !== 'select') {
            inputElements.push(
              <div className="input-wrapper" key={metadata}>
                <label htmlFor={metadata}>{input}</label>
                <input type={type} id={metadata} />
              </div>
            );
        } else if (type === 'select') {
            inputElements.push(renderSelectInput(input,['bella', 'fra'], metadata))
        }
      }
    }

    return inputElements;
  };
  
  const renderSelectInput = (name, selection, metadata) => {
    return (
      <div className="input-wrapper" key={metadata}>
        <label htmlFor={metadata}>{name}</label>
        <select name={name} id={metadata}>
          {selection.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  };
  

  return (
    <section className="modal">
      <form className="form" id="form" onSubmit={handleSubmit}>
        {renderModal()}
        {renderSelectInput('ciao',['come', 'stai'])}
        <button id="submit" className="save-button" type="submit">
          Save
        </button>
      </form>
    </section>
  );
}

import { useDispatch } from "react-redux";
import { saveEmployee } from "../store/actions";

export default function Modal(props) {
  const modalStructure = props.input;
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
        const isRequired = type[1] === 'required' ? true : false
        console.log(isRequired);
        if (type[0] !== 'select') {
          // console.log(type[1]);
            inputElements.push(
              <div className="input-wrapper" key={metadata}>
                <label htmlFor={metadata}>{input}</label>
                <input type={type} id={metadata} />
              </div>
            );
        } else if (type[0] === 'select') {
            inputElements.push(renderSelectInput(input, type[2], metadata))
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
      <h1>{props.modalName}</h1>
        {renderModal()}
        <button id="submit" className="save-button" type="submit">
          {props.submitButton}
        </button>
      </form>
    </section>
  );
}

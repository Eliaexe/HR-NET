import { useDispatch } from "react-redux";
import { useState } from "react";
import { saveEmployee } from "../store/actions";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Modal(props) {
  const modalStructure = props.input;
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputDate, setInputDate] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployeeData = {};
      
    const wrappers = document.querySelectorAll(".input-wrapper")
    wrappers.forEach(container => {
        let input = container.querySelector("input")
        let selectElement = container.querySelector('.css-1dimb5e-singleValue')
        let valueToGive

        if (container.dataset.type === 'select') {
          valueToGive = selectElement.innerHTML 
        } else {
          valueToGive = input.value
        }

        newEmployeeData[container.dataset.name] = valueToGive;
    });

    dispatch(saveEmployee(newEmployeeData));
  };

  const handleChangeDate = (name, date) => {
    const existingDataIndex = inputDate.findIndex((data) => data.name === name);

    if (existingDataIndex !== -1) {
      setInputDate((prevInputDate) =>
        prevInputDate.map((data, index) =>
          index === existingDataIndex ? { ...data, date } : data
        )
      );
    } else {
      setInputDate((prevInputDate) => [...prevInputDate, { name, date }]);
    }
  };

  const renderModal = () => {
    const inputElements = [];

    for (const input in modalStructure) {
      if (Object.hasOwnProperty.call(modalStructure, input)) {
        const type = modalStructure[input];
        const metadata = input.toLowerCase().split(" ").join("_");

        if (type[0] !== "select" && type[0] !== "date") {
          inputElements.push(
            <div className="input-wrapper" key={metadata} data-name={input} data-type={type[0]}>
              <label htmlFor={metadata}>{input}</label>
              <input type={type} id={metadata} />
            </div>
          );
        } else if (type[0] === "select") {
          inputElements.push(renderSelectInput(input, type[1], metadata));
        } else if (type[0] === "date") {
          inputElements.push(renderDateInput(input, metadata));
        }
      }
    }

    return inputElements;
  };

  const renderSelectInput = (name, selection, metadata) => {
    const options = [];
    selection.forEach((e) => {
      options.push({
        value: e.toLowerCase(),
        label: e,
      });
    });
    return (
      <div className="input-wrapper" key={metadata} data-name={name} data-type={'select'}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
      </div>
    );
  };

  const renderDateInput = (name, metadata) => {
    return (
      <div className="input-wrapper" key={metadata} data-name={name} data-type={'date'}>
        <label htmlFor={metadata}>{name}</label>
        <DatePicker
          selected={
            inputDate.find((data) => data.name === name)?.date || null
          }
          onChange={(date) => handleChangeDate(name, date)}
        />
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

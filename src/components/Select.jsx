export default function renderSelectInput (name, selection, metadata) {
    return (
      <div className="input-wrapper" key={metadata}>
        <label htmlFor={metadata}>{name}</label>
        <select name={name} id={metadata} data-name={name} className="theInputTeam">
          {selection.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  }
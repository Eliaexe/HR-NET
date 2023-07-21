import React, { useEffect, useState } from "react";

export default function Table(props) {
  const data = props.data;
  const [headerData, setHeaderData] = useState([]);

  useEffect(() => {
    // Genera l'array delle chiavi per l'intestazione
    const headerKeys = data.length > 0 ? Object.keys(data[0]) : [];
    setHeaderData(headerKeys);
  }, [data]);

  return (
    <table>
      <thead>
        <tr>
          {/* Genera dinamicamente le celle dell'intestazione */}
          {headerData.map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Genera dinamicamente le righe del corpo della tabella */}
        {data.map((rowData, index) => (
          <tr key={index}>
            {headerData.map((key) => (
              <td key={key}>{rowData[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

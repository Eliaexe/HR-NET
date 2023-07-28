import React, { useEffect, useState } from "react";
import { useTable } from "react-table";

export default function Table(props) {
    const data = props.data;

    const [headerData, setHeaderData] = useState([]);
    function format(str) {
      const words = str.split('_');    
      const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));    
      const formattedStr = formattedWords.join(' ');    
      return formattedStr;
    }
    useEffect(() => {
      const headerKeys = data.length > 0 ? Object.keys(data[0]) : [];
      const formattedKey = headerKeys.map((key) => format(key))
      const tableHeader = formattedKey.map((head) => ({ Header: head, accessor: head }));
      setHeaderData(tableHeader);
    }, [data]);

  const columns = headerData
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()}>
      <thead> 
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};


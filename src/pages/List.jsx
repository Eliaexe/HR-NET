import { useSelector } from "react-redux";
import Header from "../components/Header";
import Table from 'rc-table';
import React, { useState, useEffect } from "react";
import Select from "react-select"; 

export default function List() {
  const employees = useSelector((state) => state.employees.employees);
  const [employeesData, setEmployeesData] = useState(employees);
  const [sortOrders, setSortOrders] = useState({});
  const [selectedOption, setSelectedOption] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    setSelectedOption(options[0]);
    updateEmployeesData(startIndex, options[0].value);
  }, []);

  useEffect(() => {
    updateEmployeesData(startIndex, selectedOption.value);
  }, [startIndex, selectedOption, employees]);

  const updateEmployeesData = (start, count) => {
    const endIndex = Math.min(start + count, employees.length);
    setEmployeesData(employees.slice(start, endIndex));
  };

  const handleSorting = (colTitle) => {
    const currentSortOrder = sortOrders[colTitle] || 'asc';
    const newSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';

    const sortedEmployees = [...employeesData];
    sortedEmployees.sort((a, b) => {
      const valueA = a[colTitle];
      const valueB = b[colTitle];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB) * (newSortOrder === 'asc' ? 1 : -1);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return (valueA - valueB) * (newSortOrder === 'asc' ? 1 : -1);
      } else if (valueA instanceof Date && valueB instanceof Date) {
        return (valueA - valueB) * (newSortOrder === 'asc' ? 1 : -1);
      } else {
        return 0;
      }
    });

    setSortOrders(prevSortOrders => ({
      ...prevSortOrders,
      [colTitle]: newSortOrder,
    }));

    setEmployeesData(sortedEmployees);
  };

  const personaKey = Object.keys(employees[0]);
  if (personaKey.includes('key')) {
    personaKey.pop('key');
  }

  const columns = personaKey.map(key => ({
    title: key,
    dataIndex: key,
    key: key.toLowerCase() + '.key',
    width: 100,
    onHeaderCell: () => ({
      onClick: () => handleSorting(key),
    }),
  }));

  const options = [
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' }
  ];

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setStartIndex(0);
  };

  const handleButtons = (x) => {
    let startFrom = startIndex;
  
    if (x === 'prev') {
      startFrom = startIndex - selectedOption.value;
      if (startFrom < 0) {
        startFrom = 0;
      }
    } else if (x === 'next') {
      startFrom = startIndex + selectedOption.value;
      if (startFrom > employees.length) {
        startFrom = employees.length - employeesData.length
      }
    }
    setStartIndex(startFrom);
  };

  return (
    <div className="mainCreate">
      <Header />
      <main className="main">
        <h1>Employee List</h1>
        <div className="topTable">
          <label htmlFor="show">
            Show 
            <Select
              value={selectedOption}
              onChange={handleSelectChange}
              className='show'
              options={options}
              required={false}
            />
          </label>
          <label htmlFor="searchTable">
            Search 
            <input type="text" name="searchTable" id="searchTable" />
          </label>
        </div>
        {employees.length > 0 ? <Table columns={columns} data={employeesData} rowKey="key" /> : ''}
        <div className="bottomTable">
          <p>Showing {startIndex + 1} to {Math.min(startIndex + selectedOption.value, employees.length)} of {employees.length} entries</p>
          <div className="directionButtons">
            <button onClick={() => handleButtons('prev')}>Previus</button>
            <button onClick={() => handleButtons('next')}>Next</button>
          </div>
        </div>
      </main>
    </div>
  );
}

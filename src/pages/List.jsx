import { useSelector } from "react-redux";
import Table from 'rc-table';
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Header from "../components/Header.jsx";

export default function List() {
  const employees = useSelector((state) => state.employees.employees);
  const [employeesData, setEmployeesData] = useState(employees);
  const [sortOrders, setSortOrders] = useState({});
  const [selectedOption, setSelectedOption] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  const options = useMemo(() => [
    { value: 10, label: '10' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100' }
  ], []);

  const updateEmployeesData = useCallback((start, count) => {
    const endIndex = Math.min(start + count, employees.length);
    setEmployeesData(employees.slice(start, endIndex));
  }, [employees]);

  useEffect(() => {
    const employeesWithKeys = employees.map((employee, index) => ({
      ...employee,
      key: index, 
    }));

    setEmployeesData(employeesWithKeys);
  }, [employees]);

  useEffect(() => {
    setSelectedOption(options[0]);
    updateEmployeesData(startIndex, options[0].value);
    
  }, [updateEmployeesData, startIndex, options]);

  useEffect(() => {
    updateEmployeesData(startIndex, selectedOption.value);
    
  }, [startIndex, selectedOption, employees, updateEmployeesData]);

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

  const handleSearch = (searchValue) => {
    const searchResults = employees.filter(employee => {
      return Object.values(employee).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())
      );
    });

    searchResults.sort((a, b) => {
      const relevanceA = Object.values(a).filter(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())
      ).length;

      const relevanceB = Object.values(b).filter(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())
      ).length;

      return relevanceB - relevanceA;
    });

    setEmployeesData(searchResults);
  };

  return (
    <div className="mainCreate">
      <Header />
      <main className="main">
        <h1 className="listTitle">Employee List</h1>
        <section className="tableContainer">
        <div className="topTable">
        <label htmlFor="show">
          Show
          <select 
            name="show"
            id="show"
            className="theInputTeam"
            required
            value={selectedOption.value} // Utilizza il valore numerico dell'opzione selezionata
            onChange={(e) => handleSelectChange(options.find(option => option.value === parseInt(e.target.value)))} // Trova l'oggetto option corrispondente e passalo alla funzione
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

          <label htmlFor="searchTable">
            Search 
            <input 
              type="text"  
              name="searchTable" 
              id="searchTable"
              // value={selectedOption}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </label>
        </div>
        {employees.length > 0 ? <Table columns={columns} data={employeesData} rowKey="key" /> : ''}
        <div className="bottomTable">
          <p>Showing {startIndex + 1} to {Math.min(startIndex + selectedOption.value, employees.length)} of {employees.length} entries</p>
          <div className="directionButtons">
            <button onClick={() => handleButtons('prev')}>
              <img src="./arrow_forward.svg" className="reverse" alt="arrow" />
            </button>
            <button onClick={() => handleButtons('next')}>
              <img src="./arrow_forward.svg" alt="arrow" />
            </button>
          </div>
        </div>
        </section>
      </main>
    </div>
  );
}
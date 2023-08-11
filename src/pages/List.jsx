import { useSelector } from "react-redux";
import Header from "../components/Header";
import Table from 'rc-table';
import React, { useState } from "react";

export default function List() {
  const employees = useSelector((state) => state.employees.employees);
  const [employeesData, setEmployeesData] = useState(employees);
  const [sortOrders, setSortOrders] = useState({});

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

  return (
    <div className="mainCreate">
      <Header />
      <main className="main">
        <h1>List</h1>
        {employees.length > 0 ? <Table columns={columns} data={employeesData} rowKey="key" /> : ''}
      </main>
    </div>
  );
}

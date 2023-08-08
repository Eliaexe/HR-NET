import { useSelector } from "react-redux";
import Header from "../components/Header";
import Table from 'rc-table';

export default function List() {
  const employees = useSelector((state) => state.employees.employees);

  let personaKey = Object.keys(employees[0]);
  let columns = [];
  personaKey.forEach(key => {
    columns.push({
      title: key,
      dataIndex: key,
      key: key.toLowerCase() + '.key',
      width: 100,
    });
  });
  
  const employeeToDisplay = JSON.parse(JSON.stringify(employees));

  for (let i = 0; i < employeeToDisplay.length; i++) {
    employeeToDisplay[i].key = i;
  }

  const data = employeeToDisplay;

  return (
    <div className="mainCreate">
      <Header />
      <main className="main">
        <h1>List</h1>
        {employees.length > 0 ? <Table columns={columns} data={data} rowKey="key" /> : ''}
      </main>
    </div>
  );
}

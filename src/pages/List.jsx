import {  useSelector } from "react-redux";


import Header from "../components/Header"
import Table from "../components/Table"



export default function List() {
    const employees = useSelector((state) => state.employees);
    return(
        <div className="mainCreate">
            <Header />
            <h1>List</h1>
            <main className="main">
                <Table data={employees.employees}/>
            </main>
        </div>
    )
}



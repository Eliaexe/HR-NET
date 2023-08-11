import { Link } from "react-router-dom"
import { useSelector } from "react-redux";


export default function Header(){
    const employees = useSelector((state) => state.employees.employees);
    let isPopulated = employees.length >= 1
    const location = window.location.href.includes('list')
    return(
        <div className="header">
            <h1 className="logo">HRnet</h1>
            {isPopulated ? <Link to={location ? '/' : '/list'} className="link">{location ? 'Home' : 'Current Employees List'}</Link> : ''}
            
        </div>
    )
}
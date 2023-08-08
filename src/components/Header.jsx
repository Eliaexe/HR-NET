import { Link } from "react-router-dom"

export default function Header(){
    const location = window.location.href.includes('list')
    return(
        <div className="header">
            <h1 className="logo">HRnet</h1>
            <Link to={location ? '/' : '/list'} className="link">{location ? 'Home' : 'Current Employees List'}</Link>
        </div>
    )
}
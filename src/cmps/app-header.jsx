import { Link, NavLink } from 'react-router-dom'



export function AppHeader() {

    return (

        <header className="app-header">
            <h1>AutoFund</h1>
            <nav>
                <NavLink to={'/AutoFund'}>Cars</NavLink>
             
            </nav>
        </header>
    )
}
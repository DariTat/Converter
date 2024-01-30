import { useState } from "react"
import { useNavigate} from "react-router-dom"
import queryString from 'query-string';

export const Header = () => {
    
    const [active, setActive] = useState('home')
    const navigate = useNavigate()

    function handleClick(e) {
        e.preventDefault()
        setActive(e.target.id)
        if (e.target.id === 'valute') {
            navigate('valute/')
        } else if (e.target.id === 'home') {
            navigate('/Converter/')
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a 
                                    id='home'
                                    className={active === 'home' ? "nav-link active" : "nav-link"}
                                    aria-current="page"
                                    onClick={handleClick}
                                >
                                    Converter
                                </a>
                            </li>
                            <li className="nav-item">
                                <a 
                                    id='valute'
                                    className={active === 'valute' ? "nav-link active" : "nav-link"}
                                    onClick={handleClick}
                                >
                                    Valute
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
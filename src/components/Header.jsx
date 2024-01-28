import { useState } from "react"
import { useNavigate } from "react-router-dom"


export const Header = () => {
    const [active, setActive] = useState('')
    const navigate = useNavigate()

    function handleClick(e) {
        e.preventDefault()
        setActive(e.target.id)
        if (e.target.id === 'valute') {
            navigate('valute/')
        } else if (e.target.id === 'home') {
            navigate('converter/')
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/Converter">Converter</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a 
                                    id='home'
                                    className={active === 'home' ? "nav-link active" : "nav-link"}
                                    aria-current="page"
                                    href="converter/"
                                    onClick={handleClick}
                                >
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a 
                                    id='valute'
                                    className={active === 'valute' ? "nav-link active" : "nav-link"}
                                    href="valute/"
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
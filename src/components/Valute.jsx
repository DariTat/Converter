import { useEffect, useState, useMemo } from "react"
import {v4} from 'uuid'
import {Cashify} from "cashify";


export const Valute = () => {
    const baseValute = {
        code: 'RUB', 
        value: 1,
        name: 'Российский рубль',
        nominal: 1
    }
    const [constantValute, setConstantValute] = useState(baseValute)
    const [showList, setShowList] = useState(false)
    const [valute, setValute] = useState([])
    const [loading, setLoading] = useState(true)

    const rates = useMemo(() => {
        return valute.reduce((acc, v) => {
            acc[v.code] = v.value;
            return acc;
        }, {})
    }, [valute]);

    const cashify = new Cashify({base: baseValute.code, rates});
    
    const fetchValute = () => {
        fetch('https://www.cbr-xml-daily.ru/daily_json.js')
            .then(response => response.json())
            .then(data => {
                if (Object.keys(data.Valute).length > 0) {
                    for (let key in data.Valute) {
                        setValute(valute => [
                            ...valute,
                            {
                                name: data.Valute[key].Name,
                                code: data.Valute[key].CharCode,
                                value: data.Valute[key].Value,
                                nominal: data.Valute[key].Nominal
                            }
                        ])
                    }
                }     
            })
    }

    useEffect(() => {
        fetchValute()
        setLoading(false)
        setValute((prevValute) => 
        [...prevValute, 
            {   
                name: 'Российский рубль',
                code: 'RUB', 
                value: 1,
                nominal: 1
            }
        ])
    }, [])

    const changeValute = (event) => {
        event.preventDefault()
        const val = valute.filter(v => v.code === event.target.textContent)
        setConstantValute(val[0])
        setShowList(false)
    }

    const data = valute
        .filter(v => (v.code !== constantValute.code))
        .map(v => ({...v, value: cashify.convert(1, {from: constantValute.code, to: v.code}).toFixed(2)}))
     
    return (
        <>
            <section className="container">
                <div className="dropdown">
                    <button 
                        className="btn btn-primary dropdown-toggle"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        onClick={() => setShowList(!showList)}
                    >
                        {constantValute.code}
                    </button>
                    <ul className={showList ? "dropdown-menu show" : "dropdown-menu"} aria-labelledby="dropdownMenuButton">
                        {
                            valute.map(v => (
                                <li key={v4()}><a className={v.code === constantValute.code ? "dropdown-item hidden" : "dropdown-item"} href="#" onClick={changeValute}>{v.code}</a></li>
                            ))
                        }
                    </ul>
                </div>
                {loading ? 
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                  :
                    <table className="table table-bordered caption-top">
                        <caption>Valute today</caption>
                        <thead>
                            <tr>
                                <th scope="col">Код</th>
                                <th scope="col">Курс</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(v => (
                                <tr key={v4()}>
                                    <th scope="row">{v.nominal + ' ' + v.code} ({v.name})</th>
                                    <td>{v.value} {constantValute.code}</td>
                                </tr>
                            ))}            
                        </tbody>
                    </table>
                }
            </section>      
        </>
    )
}
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchValute } from "../redux/slice/valuteSlice"

export const Valute = () => {
    const {valute, loading} = useSelector((state) => state.valute)
    const [data, setData] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchValute())  
    }, [])

    useEffect(() => {
        if (Object.keys(valute).length > 0) {
            for (let key in valute) {
                setData(data => [
                    ...data,
                    valute[key]
                ])
            }
        }      
    }, [valute])
  
    return(
        <>
            <section className="container">
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
                                <tr>
                                    <th scope="row">{v.Nominal + ' ' + v.CharCode} ({v.Name})</th>
                                    <td>{v.Value} RUB</td>
                                </tr>
                            ))}          
                                
                        </tbody>
                    </table>
                }
            </section>
               
        </>
    )
}
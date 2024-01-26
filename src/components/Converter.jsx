import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchRates } from "../redux/slice/valuteSlice"


export const Converter = () => {
    const { rates } = useSelector((state) => state.valute)
    const [text, setText] = useState('')
    const [value, setValue] = useState(null)
    const [valuteFrom, setValuteFrom] = useState('')
    const [valuteTo, setValuteTo] = useState('')
    const [result, setResult] = useState('')
    const [disabled, setDisabled] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchRates())
    }, [])

    console.log(true)

    useEffect(() => {
        const array = text.split(' ')
        if (array.length === 4) {
            setValue(Number(array[0]))
            setValuteFrom(array[1].toUpperCase())
            setValuteTo(array[3].toUpperCase())
            setDisabled(false)
        } else {
            setResult('')
            setDisabled(true)
            return
        }
        
    }, [text])

    const handleChange = (e) => {
        setText(e.target.value)
    }

    function onConvert(e) {
        e.preventDefault()
        if (text.replaceAll(' ', '').length < 9 || valuteTo.length !== 3) {
            setResult('')
            setDisabled(true)
            return
        } 
        
        // 1000 KRW in USD
        if (valuteFrom === 'RUB') {
            setResult((value * rates[valuteTo] / 1).toFixed(2))
        } else if (valuteTo === 'RUB') {
            setResult((value * 1 / rates[valuteFrom]).toFixed(2))
        } else {
            setResult((value * rates[valuteTo] / rates[valuteFrom]).toFixed(2))
        }  
    }

    return (
        <>
            <section className="container mt-5">
                <form className="row g-3">       
                    <div className="col-auto">
                        <input type="text" className="form-control" value={text} onChange={handleChange} placeholder="1000 KRW in USD" />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary mb-3" disabled={disabled} onClick={onConvert}>Конвертировать</button>
                    </div>
                </form>
                {result ? 
                    (
                        <p>{value + ' ' + valuteFrom + ' равно ' + result + ' ' + valuteTo}</p>
                    ) : null
                }
            </section>
        </>
               
    )
}
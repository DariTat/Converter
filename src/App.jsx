import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import './App.css'
import { Header } from './components/Header'
import { Valute } from './components/Valute'
import { Converter } from './components/Converter'

function App() {


  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Converter/>}/>
          <Route path='/valute' element={<Valute/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App

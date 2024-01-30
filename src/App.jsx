import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import { Valute } from './components/Valute'
import { Converter } from './components/Converter'
import { Page } from './components/Page'

function App() {


  return (
    <>
      <Router>
        <Routes> 
          <Route path='/Converter/' element={<Page/>}>
            <Route index element={<Converter/>}/>
            <Route path='valute' element={<Valute/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

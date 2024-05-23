import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Show from './show/Show';
import Add from './add/Add';
import './App.scss'

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Show />} />
          <Route path="/add" element={<Add />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
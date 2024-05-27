import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Show from './show/Show';
import Start from './start/Start';
import './App.scss'

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/show" element={<Show />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
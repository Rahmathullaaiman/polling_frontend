import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth';
import Landing from './pages/Landing';
import Pollingpage from './pages/Pollingpage';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className='app'>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/Register" element={<Auth Register />} />
          <Route path="/polling" element={<Pollingpage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </div>
  );
}

export default App;

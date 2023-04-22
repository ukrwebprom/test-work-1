import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Home } from './routes/Home';
import { Tweets } from './routes/Tweets';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tweets" element={<Tweets />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;

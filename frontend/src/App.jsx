import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import QuestionDetail from './pages/QuestionDetail';

function App() {
  return (
    <div className="App">
      <nav style={{ padding: '10px', background: '#f8f9f9', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>
          StackUnderflow
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question/:id" element={<QuestionDetail />} />
      </Routes>
    </div>
  );
}

export default App;


import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from './Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/notes" />} />
        <Route path="/notes" element={<Layout />}>
        <Route path="/notes/*" element={<Layout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
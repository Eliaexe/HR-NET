import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.jsx';
import './App.css';
import Create from './pages/Create.jsx';
import List from './pages/List.jsx';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Create />} />
            <Route path="/list" element={<List />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;

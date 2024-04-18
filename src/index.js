import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import LoginPage from "./components/LoginPage";
import RegisterPage from './components/RegisterPage';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import { useState } from 'react';

function Index() {
 
  const [auth, setAuth] = useState({"logged": false, "details": null});

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App auth={auth}></App>}></Route>
          <Route path="/login" element={<LoginPage setAuth={setAuth}></LoginPage>}></Route>
          <Route path="/register" element={<RegisterPage setAuth={setAuth}></RegisterPage>}></Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index></Index>);

reportWebVitals();

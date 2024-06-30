import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "@/app/component/Login";
import Page from "@/app/page";


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Page />} />
            </Routes>
        </Router>
    );
};

export default App;

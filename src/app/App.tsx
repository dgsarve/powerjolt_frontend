import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page from "@/app/page";
import Login from "@/app/login/page";


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

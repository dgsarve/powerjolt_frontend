import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Page from "@/app/page";
import PrivacyPolicy from "@/app/privacy/page";
import About from "@/app/about/page";



const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Page/>}/>
                <Route path="/privacy" element={<PrivacyPolicy/>}/>
                <Route path="/about" element={<About/>}/>

            </Routes>
        </Router>
    );
};

export default App;

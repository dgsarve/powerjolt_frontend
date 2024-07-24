import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Page from "@/app/page";
import PrivacyPolicy from "@/app/privacy/page";
import About from "@/app/about/page";
import ContactUsPage from "@/app/contact/page";
import JoltDocumentationPage from "@/app/documentation/page";
import GettingStartedPage from "@/app/guide/page";



const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Page />} />
                <Route path="/documentation" element={<JoltDocumentationPage/>}/>
                <Route path="/guide" element={<GettingStartedPage/>}/>
                <Route path="/privacy" element={<PrivacyPolicy/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<ContactUsPage/>}/>
           </Routes>
        </Router>
    );
};

export default App;

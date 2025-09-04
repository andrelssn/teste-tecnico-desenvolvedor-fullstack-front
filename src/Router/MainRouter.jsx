import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components
import Home from "../Views/Home/Home";
import Header from "../Layout/Header";
import Books from "../Views/Books/Books";
import Authors from "../Views/Authors/Authors";

export default function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/books" element={<Books/>}/>
                    <Route path="/authors" element={<Authors/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components
import Home from "../Views/Home/Home";
import Header from "../Layout/Header";
import Products from "../Views/Products/Products";
import Clients from "../Views/Clients/Clients";

export default function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/clients" element={<Clients/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
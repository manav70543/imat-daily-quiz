import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function StudentLayout() {

    return (

        <div className="app-layout">

            <Navbar />

            <main className="main-content">

                <Outlet />

            </main>

            <Footer />

        </div>

    );

}
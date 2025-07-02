import type { FC } from "react";
import Header from "./Header/Header.component";
import Footer from "./Footer/Footer.component";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
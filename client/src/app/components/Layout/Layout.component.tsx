import type { FC, PropsWithChildren } from "react";
import Header from "./Header/Header.component";
import Footer from "./Footer/Footer.component";

const Layout: FC<PropsWithChildren> = (props) => {
    const { children } = props
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout
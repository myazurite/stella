import React, {PropsWithChildren} from 'react';
import Navbar from "@/components/Navbar/Navbar";

interface IChildren extends PropsWithChildren {}
const Layout:React.FC<IChildren> = ({children}) => {
    return(
        <>
            <Navbar/>
            <main>{children}</main>
        </>
    )
}

export default Layout;
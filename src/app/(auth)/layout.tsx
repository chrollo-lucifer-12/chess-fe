import {ReactNode} from "react";

const Layout = ({children} : {children : ReactNode}) => {
    return <main className={"bg-[#0A0A0A] h-screen"}>
        {children}
    </main>
}

export default Layout
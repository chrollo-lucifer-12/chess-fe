import {ReactNode} from "react";

const Layout = ({children} : {children : ReactNode}) => {
    return <main className={"min-h-screen bg-black overflow-x-hidden"}>
        {children}
    </main>
}

export default Layout
import {ReactNode} from "react";
import Sidebar from "@/components/sidebar";

const Layout = ({children} : {children : ReactNode}) => {
    return <main className={"flex h-screen"}>
        <div className={"w-[10%] bg-[#262522]"}>
            <Sidebar/>
        </div>
        <div className={"bg-[#302E2B] w-[90%]"}>
            {children}
        </div>
    </main>
}

export default Layout
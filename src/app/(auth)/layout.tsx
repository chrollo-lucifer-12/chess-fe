import {ReactNode} from "react";
import RainingBg from "@/app/(auth)/_components/raining-bg";

const Layout = ({children} : {children : ReactNode}) => {
    return <main className={"bg-[#0A0A0A] h-screen flex"}>
        <div className={"w-[50%]"}>
            <RainingBg/>
        </div>
       <div className={"w-[50%]"}>
           {children}
       </div>

    </main>
}

export default Layout
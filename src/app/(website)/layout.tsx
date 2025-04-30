import {ReactNode} from "react";
import Navbar from "../../components/navbar";
import {getCurrentSession} from "@/lib/cookie";

const Layout = async ({children} : {children : ReactNode}) => {

    const {user,session} = await getCurrentSession()

    return <main className={"h-screen bg-black"}>
        <Navbar user={user} />
    </main>
}

export default Layout
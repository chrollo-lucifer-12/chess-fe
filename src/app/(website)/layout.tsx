import {ReactNode} from "react";
import Navbar from "../../components/navbar";
import {getCurrentSession} from "@/lib/cookie";

const Layout = async ({children} : {children : ReactNode}) => {
    const {user, session} = await getCurrentSession();




    return (
        <main className="min-h-screen bg-black overflow-x-hidden">
            <Navbar user={user} />
            <div className="w-full">
                {children}
            </div>
        </main>
    );
}

export default Layout;
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export default function SideNav(
    {
        isSideNavOpen, setIsSideNavOpen }
        : {
            isSideNavOpen: boolean,
            setIsSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>
        }) {

    const { data: session } = useSession()
    const [content, setContent] = useState(<div></div>)

    useEffect(() => {
        setContent(
            <nav className={`inset-0 bg-blue-500 z-20 text-white text-2xl pl-6 pt-16 flex flex-col gap-10 transition-all duration-200 absolute ${isSideNavOpen ? "left-0" : "left-full"}`}>
                <Link className="hover:underline" href={"/"} onClick={() => closeNavShowContent()}><p>HOME</p></Link>
                <Link href={"/trackmyorder"} className="hover:underline" onClick={() => closeNavShowContent()}> <p>TRACK MY ORDER</p></Link>
                <div>
                    {
                        session?.user ? <h4>Signed in as {session.user.name![0].toUpperCase() + session.user.name?.substring(1)}</h4>
                            :
                            <>
                                <h5>You're not signed in</h5>
                                <button onClick={() => signIn('google')} className="text-white text-left mt-3">Sign in with Google</button>
                            </>
                    }
                </div>

                <button onClick={() => signOut()} className="text-white text-left absolute bottom-32">Sign out</button>

            </nav >
        )

    }, [isSideNavOpen])

    if (typeof window === "object") {
        return ReactDOM.createPortal(
            content
            ,
            document.getElementById('body') as HTMLElement
        )
    }

    return <div></div>

    function closeNavShowContent() {
        setIsSideNavOpen(false)
        document.body.classList.remove('sidenav-open');
    }
}
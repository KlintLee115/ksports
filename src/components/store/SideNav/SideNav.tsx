"use client"

import './SideNav.css'
import { useSearchParams, useRouter } from 'next/navigation'

export default function SideNav() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleAsideProductsMenuClick = (linkTo?: string) => {
        if (!linkTo) {
            throw "Must have either linkTo or a current directory layer index"
        }

        // must use !== undefined, the index can be 0, if(0) is equivalent to if(false)
        router.push(linkTo!!)
    }

    function AsideProductsNavLink({ displayText, linkTo }: {
        displayText: string, currDirLayerIdx?: number, linkTo?: string
    }) {
        return <h3 className='hover:cursor-pointer hover:after:w-full
        mb-[4vh] w-fit text-2xl' style={{ textDecoration: "none" }} onClick={() => handleAsideProductsMenuClick(linkTo)}
        > {displayText}</h3 >
    }

    return (
        <aside className={`fixed left-0 top-0 bottom-0 overflow-hidden transition-all duration-300
        py-[10vh] px-[0]
         ${searchParams.get('sideNav') === "true" ?
                'z-20 px-[4vw] border-0 bg-cyan-300 w-full sm:w-fit' : 'w-0'}`}>
            <AsideProductsNavLink key={"HOME"} linkTo="/" displayText='HOME' />
            <AsideProductsNavLink key={"tmo"} linkTo="/trackmyorder" displayText='TRACK MY ORDER' />
            <AsideProductsNavLink key={"ai"} linkTo='/products' displayText='ALL ITEMS' />
            <AsideProductsNavLink key={"signup"} linkTo="/SignUpLogin?action=SignUp" displayText='Sign Up' />
            <AsideProductsNavLink key={"login"} linkTo="/SignUpLogin?action=LogIn" displayText='Log In' />
        </aside >
    )
}
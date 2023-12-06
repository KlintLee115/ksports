"use client"

import { fetchData, useIsSideProductsMenuToggled } from '../../../global/general'
import './SideNav.css'
import { CSSProperties, FC, useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { memo } from 'react'

const styles: { [key: string]: CSSProperties } = {
    link: {
        textDecoration: 'none',
        fontWeight: 'normal',
        fontSize: "1.5rem",
        color: "black",
        display: 'block',
        marginBottom: "4vh",
        width: 'fit-content'
    }
}

function isChildWidthOverflowWindow(child: HTMLElement) {
    const asideContainerWidth = child.clientWidth
    const windowWidth = window.innerWidth

    return asideContainerWidth >= windowWidth
}

async function getColValsWhereUpperDirOverlap(subDirVals: string[]): Promise<
    string[] | object> {
    return fetchData('selectColWhereUpperDirOverlap', { subDirVals })
}

export default function SideNav() {

    const [displayedProductsMenu, setDisplayedProductsMenu] = useState<Map<number, JSX.Element>>(new Map())

    const { isSideNavProductsMenuToggled: isSideProductsMenuToggled,
        setIsSideNavProductsMenuToggled: setIsSideProductsMenuToggled } = useIsSideProductsMenuToggled()
    const asideContainer = useRef<HTMLElement>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    const AsideProductsMenu: FC<{
        dirVals: string[] | object,
        currDirLayerIdx: number
    }> = memo(({ dirVals, currDirLayerIdx }) => {

        const isSideProductsMenuToggled = useIsSideProductsMenuToggled().isSideNavProductsMenuToggled

        // if it is an object, it is an error / no data
        return (Array.isArray(dirVals)) ?

            <div className={isSideProductsMenuToggled ? "asideProductsMenuOpened" : "asideProductsMenuClosed"}>
                {
                    dirVals.map((item: any, idx) => (
                        <AsideProductsNavLink key={idx} displayText={item} currDirLayerIdx={currDirLayerIdx} />))
                }
            </div >
            : <></>
    },
        // memoize so that it only changes if the following props change
        (prevProps, nextProps) => (prevProps.dirVals === nextProps.dirVals
            && prevProps.currDirLayerIdx === nextProps.currDirLayerIdx)
    )

    const handleAsideProductsMenuClick = (displayText: string, linkTo?: string, currDirLayerIdx?: number) => {
        if (!linkTo && currDirLayerIdx === undefined) {
            throw "Must have either linkTo or a current directory layer index"
        }

        // must use !== undefined, the index can be 0, if(0) is equivalent to if(false)
        const hasCurrDirLayerIdx = currDirLayerIdx !== undefined;
        const isProductsLink = linkTo === "/products";


        if (hasCurrDirLayerIdx || isProductsLink) {

            setIsSideProductsMenuToggled(true)
            const newSearchParams = new URLSearchParams(searchParams.toString());

            if (hasCurrDirLayerIdx) {
                let idx = currDirLayerIdx

                while (searchParams.has(`subDir${idx}`)) {

                    newSearchParams.delete(`subDir${idx}`)
                    setDisplayedProductsMenu(prevMap => {
                        const newMap = new Map(prevMap)
                        newMap.delete(idx)
                        return newMap
                    })
                    idx++

                }
                // add the new param
                newSearchParams.set(`subDir${currDirLayerIdx}`, displayText)

                // check if has reached the end of the subDir
                const upperSubDirKeys = Array.from(newSearchParams.keys()).filter(key => key.startsWith('subDir'));
                const upperSubDirsVals: string[] = []

                // sorting the values
                for (let idx = 0; idx < upperSubDirKeys.length; idx++) {
                    upperSubDirsVals.push(newSearchParams.get(upperSubDirKeys[idx])!!)
                }

                getColValsWhereUpperDirOverlap(upperSubDirsVals).then(data => {
                    if (!(Array.isArray(data) && data.length > 0)) {
                        setIsSideProductsMenuToggled(false)
                        newSearchParams.set('sideNav', "false")
                    }

                    router.push(`/products?${newSearchParams.toString()}`)
                })
            }
            else {
                newSearchParams.set('sideNav', "true")
                router.push(`/products?${newSearchParams.toString()}`)
            }
        }
        else {
            router.push(linkTo!!)
        }
    }

    function AsideProductsNavLink({ displayText, linkTo, currDirLayerIdx }: {
        displayText: string, currDirLayerIdx?: number, linkTo?: string
    }) {
        return <h3 style={styles.link} onClick={() => handleAsideProductsMenuClick(displayText, linkTo, currDirLayerIdx)}
        > {displayText}</h3 >
    }

    async function getSetSubdir0Vals() {
        const subDir0Options = await fetchData('selectDistinctColVals', { colName: 'subDir0' }) as string[]

        const newOptions: JSX.Element = <AsideProductsMenu key={0} dirVals={subDir0Options} currDirLayerIdx={0} />

        setDisplayedProductsMenu(prevMap => {
            const newMap = new Map(prevMap)
            newMap.set(0, newOptions)
            return newMap
        })
    }

    async function getSetRemainingData() {

        const keys = Array.from(searchParams.keys())

        const upperSubDirKeys = keys.filter(key => key.startsWith('subDir'));
        const upperSubDirsVals: string[] = []

        // sorting the values
        for (let idx = 0; idx < upperSubDirKeys.length; idx++) {
            upperSubDirsVals.push(searchParams.get(upperSubDirKeys[idx])!!)
        }

        for (let idx = 0; idx < upperSubDirsVals.length; idx++) {
            getColValsWhereUpperDirOverlap(upperSubDirsVals.slice(0, idx + 1)).then(data => {

                if (!(Array.isArray(data) && data.length === 0)) {
                    const newMenu: JSX.Element = <AsideProductsMenu dirVals={data} currDirLayerIdx={idx + 1} />

                    setDisplayedProductsMenu(prevMap => {
                        const newMap = new Map(prevMap)
                        newMap.set(idx + 1, newMenu)
                        return newMap
                    })
                }
            })
        }
    }

    // set the displayed components
    useEffect(() => {
        if (isSideProductsMenuToggled) {
            getSetSubdir0Vals().then(() => getSetRemainingData())
        }
    }, [searchParams])

    // Reduce the JSX displayed components if overflow
    useEffect(() => {
        if (asideContainer?.current) {
            if (isChildWidthOverflowWindow(asideContainer?.current!!)) {
                setDisplayedProductsMenu(prevMap => {
                    const newMap = new Map(prevMap)
                    newMap.delete(prevMap.size)
                    return newMap
                })
            }
        }

    }, [displayedProductsMenu])

    return (
        <aside className={searchParams.get('sideNav') === "true" ? 'asideOpened' : 'asideClosed'} ref={asideContainer}>
            <div className={searchParams.get('sideNav') === "true" ? 'asideOpened' : 'asideClosed'}>
                <AsideProductsNavLink key={"HOME"} linkTo="/" displayText='HOME' />
                <AsideProductsNavLink key={"tmo"} linkTo="/trackmyorder" displayText='TRACK MY ORDER' />
                <AsideProductsNavLink key={"ai"} linkTo='/products' displayText='ALL ITEMS' />
                <AsideProductsNavLink key={"signup"} linkTo="/SignUpLogin?action=SignUp" displayText='Sign Up' />
                <AsideProductsNavLink key={"login"} linkTo="/SignUpLogin?action=LogIn" displayText='Log In' />
            </div>
            {Array.from(displayedProductsMenu.entries()).map(([key, value]) => <div key={key}>{value}</div>)}
        </aside >
    )
}
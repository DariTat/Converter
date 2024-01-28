import { Outlet } from "react-router-dom"
import { Header } from "./Header"



export const Page = () => {

    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}
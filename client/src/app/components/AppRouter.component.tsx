import { Navigate, Route, Routes } from "react-router-dom"
import { authedRoutes, publicRoutes } from "../routes"
import Layout from "./Layout/Layout.component"
import { useSelector } from "react-redux"
import { selectorGeneral } from "../../redux/general/general.selector"

export default function AppRouter() {
    const { isAuthed } = useSelector(selectorGeneral)
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                {authedRoutes.map(({ path, element }) =>
                    <Route key={path} path={path} element={isAuthed ? element : <Navigate to='/login' />} />
                )}
                {publicRoutes.map(({ path, element }) =>
                    <Route key={path} path={path} element={element} />
                )}
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>
        </Routes>
    )
}
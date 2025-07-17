import { Navigate, Route, Routes } from "react-router-dom"
import { authedRoutes, publicRoutes } from "../routes"
import Layout from "./Layout/Layout.component"
import { useSelector } from "react-redux"
import { selectorGeneral } from "../../redux/general/general.selector"
import { loginPath, mainPath, signupPath } from "../../utils/consts.utils"
import SignupPage from "../pages/Auth/Signup.page"
import LoginPage from "../pages/Auth/Login.page"

export default function AppRouter() {
    const { isSignedUp } = useSelector(selectorGeneral)
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                {authedRoutes.map(({ path, element }) =>
                    <Route key={path} path={path} element={isSignedUp ? element : <Navigate to={loginPath} />} />
                )}
                {publicRoutes.map(({ path, element }) =>
                    <Route key={path} path={path} element={element} />
                )}
                <Route path={signupPath} element={<SignupPage />} />,
                <Route path={loginPath} element={!isSignedUp ? <LoginPage /> : <Navigate to={mainPath} />} /> ,
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>
        </Routes>
    )
}
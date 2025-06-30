import { Navigate, Route, Routes } from "react-router-dom";
import { authedRoutes, publicRoutes } from "../routes";

export default function AppRouter() {
    return (
        <Routes>
            {true && authedRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} />
            )}
            {publicRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} />
            )}
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    )
}
import { lazy } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { Route, Routes } from "react-router";

const HomePage = lazy(() => import('../pages/HomePage'))
const PostListPage = lazy(() => import('../pages/PostList'))
const PostDetailPage = lazy(() => import('../pages/PostDetail'))
const LoginPage = lazy(() => import('../pages/LoginPage'))

export const AppRoutes = () => {
    const { isLoading, userInfo } = useAppSelector(state => state.auth)

if(isLoading || !userInfo) {
        return <Routes>
            <Route path='/' element={<LoginPage />}/>
        </Routes>
    }
    return <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/post" element={<PostListPage />}/>
        <Route path="/post/:id" element={<PostDetailPage />}/>
        {!userInfo && <Route path="/login" element={<LoginPage/>}/>}
    </Routes>
}

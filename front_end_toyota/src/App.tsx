import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';
import Login from './pages/Auths/Login';
import Register from './pages/Auths/Register';
import Dashboard from './pages/admin/Dashboard';
import Introduce from './pages/product/component/Introduce/Introduce';
import Vision from './pages/product/component/Vision/Vision';
import Home from './pages/product/component/Home/Home';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Products from './pages/product/component/Products/Products';
import { routes } from './constants/routes';
import Blogs from './pages/product/component/Blogs/Blogs';
import BlogDetail from './pages/product/component/BlogDetail/BlogDetail';
import CarDetail from './pages/product/component/CarDetail/CarDetail';

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/dashboard/*"
                    element={
                        <PrivateRouter role="admin">
                            <Dashboard />
                        </PrivateRouter>
                    }
                />
                <Route path={routes.home} element={<Home />} />
                <Route path="/gioi-thieu" element={<Introduce />} />
                <Route path="/tam-nhin-su-menh" element={<Vision />} />
                <Route path={routes.products} element={<Products />} />
                <Route path={`${routes.blogs}/:path`} element={<Blogs />} />
                <Route path={`${routes.blogDetail}/:path`} element={<BlogDetail />} />
                <Route path={`${routes.products}/:path`} element={<CarDetail />} />
            </Routes>
        </>
    );
}

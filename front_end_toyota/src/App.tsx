import { Route, Routes } from 'react-router-dom';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Header from './components/Header/Header';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';
import { routes } from './constants/routes';
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/Auths/Login';
import Register from './pages/Auths/Register';
import Charging from './pages/Charging/Charging';
import Me from './pages/Me/Me';
import BlogDetail from './pages/product/component/BlogDetail/BlogDetail';
import Blogs from './pages/product/component/Blogs/Blogs';
import CarDetail from './pages/product/component/CarDetail/CarDetail';
import Home from './pages/product/component/Home/Home';
import Introduce from './pages/product/component/Introduce/Introduce';
import Products from './pages/product/component/Products/Products';
import Vision from './pages/product/component/Vision/Vision';
import TestDrive from './pages/TestDrive/TestDrive';

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/test-drive"
                    element={
                        <PrivateRouter role="user">
                            <TestDrive />
                        </PrivateRouter>
                    }
                />
                <Route
                    path="/dashboard/*"
                    element={
                        <PrivateRouter role="admin">
                            <Dashboard />
                        </PrivateRouter>
                    }
                />
                <Route path={routes.home} element={<Home />} />
                <Route path="/me" element={<Me />} />
                <Route path="/gioi-thieu" element={<Introduce />} />
                <Route path="/tam-nhin-su-menh" element={<Vision />} />
                <Route path={routes.products} element={<Products />} />
                <Route path={`${routes.blogs}/:path`} element={<Blogs />} />
                <Route path={`${routes.blogDetail}/:path`} element={<BlogDetail />} />
                <Route path={`${routes.products}/:path`} element={<CarDetail />} />
                <Route path={`${routes.products}/:path`} element={<CarDetail />} />
                <Route path="/chargings" element={<Charging />} />
            </Routes>
        </>
    );
}

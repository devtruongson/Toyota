import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';
import Login from './pages/Auths/Login';
import Register from './pages/Auths/Register';
import Dashboard from './pages/admin/Dashboard';

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
            </Routes>
        </>
    );
}

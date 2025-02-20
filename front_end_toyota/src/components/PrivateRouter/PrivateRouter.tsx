import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { TRole } from '../../utils/interface';

export default function PrivateRouter({ children, role }: { children: ReactNode; role: TRole }) {
    const user = useAppSelector((state) => state.auth.user);

    if (user && role === 'admin' && user.role === 'admin') {
        return <>{children}</>;
    }

    if (user && role === 'user' && (user.role === 'user' || user.role === 'admin')) {
        return <>{children}</>;
    }

    return <Navigate to="/not-found" />;
}

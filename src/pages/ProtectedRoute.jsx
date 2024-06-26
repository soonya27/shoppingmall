import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContent } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireAdmin = false }) {
    //로그인 여부 체크
    // 일반 / admin 
    const { user } = useAuthContent();

    // const navigate = useNavigate();
    if (!user || (requireAdmin && !user.isAdmin)) {
        // navigate('/', { replace: false })
        return <Navigate to="/" replace />
    }
    return (
        <>
            {children}
        </>
    );
}


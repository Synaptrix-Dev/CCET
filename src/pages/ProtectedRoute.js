import React from 'react';
import { Navigate } from 'react-router-dom';

function ClientProtectedRoute({ Component }) {
    // const correctOTP = localStorage.getItem('code');
    // const requiredOTP = "1234";

    // if (correctOTP !== requiredOTP) {
    //     return <Navigate to="/login" replace />;
    // }
    return (
        <>
            <Component />
        </>
    );
}

export default ClientProtectedRoute;

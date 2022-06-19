import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function PrivateRoute({ children, redirectTo, excludedRoles, userData }) {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState(null)
    const authToken = localStorage.getItem('auth-token')
    useEffect(() => {
        if (!authToken) {
            navigate(redirectTo)
        }
        if (userData) {
            setUserInfo(userData.userInfo)
        }
        if (userInfo) {
            userInfo.roles.map(role => excludedRoles.includes(role) && navigate('/'))
        }
    }, [authToken, navigate, redirectTo, userData, userInfo, excludedRoles])

    return (
        <>
            {children}
        </>
    );
}
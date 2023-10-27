import { useContext } from "react";
import { AuthContext } from '../contexts/AuthContext'
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const { isAuthicated, isLoading } = useContext (AuthContext)

    if (!isLoading && !isAuthicated) {
        return <Navigate to='/login' />
    }
    return isLoading ? <h1>Loading...</h1> : <>{children}</>
}

export default PrivateRoute;
import { Navigate } from "react-router"

const ProtectedRoute = ({children,auth}) =>{
  return auth ? children : <Navigate to="/login"/>

}   

export default ProtectedRoute
import { BrowserRouter, Route, Routes } from "react-router"
import Login from "./components/Login"
import Home from "./components/Home"
import Jobs from "./components/Jobs"
import JobsDetails from "./components/JobsDetails"
import NotFoundPage from "./components/NotFound"
import { AppContext } from "./components/Context"
import { useContext } from "react"
import ProtectedRoute from "./components/ProtectedRoute"



function App() {
  const {auth} = useContext(AppContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path="/" >
        
        <Route index element={<ProtectedRoute auth={auth}>
          <Home/>
        </ProtectedRoute>}/>
        <Route path="jobs" element={<ProtectedRoute auth={auth}>
          <Jobs/>
        </ProtectedRoute>} />
        <Route path="jobs/:id" element={<ProtectedRoute auth={auth}>
          <JobsDetails/>
        </ProtectedRoute>} />
        <Route path="*" element={<ProtectedRoute auth={auth}>
          <NotFoundPage/>
        </ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
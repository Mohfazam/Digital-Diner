
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {Landing} from './Components/Landing/Landing';
import MenuPage from "./Components/Menu/MenuPage"
import Signup from "./Components/Auth/Signup";
import Login from "./Components/Auth/Login";
import AdminLogin from "./Components/Auth/AdminLogin";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />
    },
    {
      path: "/Menu",
      element: <MenuPage />
    },
    {
      path: "/Signup",
      element: <Signup />
    },
    {
      path: "/Login",
      element: <Login />
    },
    {
      path: "/AdminLogin",
      element: <AdminLogin />
    },
  ])

function App() {


  return (
   <RouterProvider router={router} />
  )
}

export default App
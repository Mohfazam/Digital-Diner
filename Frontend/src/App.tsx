
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {Landing} from './Components/Landing/Landing';
import MenuPage from "./Components/Menu/MenuPage"


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />
    },
    {
      path: "/Menu",
      element: <MenuPage />
    },
  ])

function App() {


  return (
   <RouterProvider router={router} />
  )
}

export default App
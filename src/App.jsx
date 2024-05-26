import { RouterProvider, createHashRouter } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgetPass from './pages/ForgetPass'
import ResetPass from './pages/ResetPass'
import NotFound from './pages/NotFound'
import Welcome from './pages/Welcome'
import Post from './pages/Post'
import AddPost from './pages/AddPost'
import Team from './pages/Team'
import { ToastContainer } from 'react-toastify'
import ProtectedRoutes from './components/ProtectedRouter'
import VerifyOTP from './pages/VerifyOTP'
import Person from './pages/Person'
import Item from './pages/Item'
import AllItems from './pages/AllItems'
import AllPersons from './pages/AllPersons'

function App() {

  const routes = createHashRouter(
    [{
      path: "/", element: <Layout />, children: [
        { index: true, element: <ProtectedRoutes> <Home /></ProtectedRoutes> },

        { path: "/about", element: <ProtectedRoutes> <About /></ProtectedRoutes> },
        { path: "/contact", element: <ProtectedRoutes><Contact /></ProtectedRoutes> },
        { path: "/items", element: <ProtectedRoutes><AllItems /></ProtectedRoutes> },
        { path: "/persons", element: <ProtectedRoutes><AllPersons /></ProtectedRoutes> },
        { path: "/post/:postId", element: <ProtectedRoutes><Post /></ProtectedRoutes> },
        { path: "/person/:personId", element: <ProtectedRoutes><Person /></ProtectedRoutes> },
        { path: "/item/:itemId", element: <ProtectedRoutes><Item /></ProtectedRoutes> },
        { path: "/post/add", element: <ProtectedRoutes><AddPost /></ProtectedRoutes> },
        { path: "/team", element: <ProtectedRoutes><Team /></ProtectedRoutes> },
        { path: "*", element: <NotFound /> }
      ]
    },
    { path: "/resetpass", element: <ResetPass /> },
    { path: "/verifyOTP", element: <VerifyOTP /> },
    { path: "/forgetpass", element: <ForgetPass /> },
    { path: "/welcome", element: <Welcome /> },
    { path: "/signin", element: <Login /> },
    { path: "/signup", element: <Register /> },]
  )

  return (
    <>
      <ToastContainer limit={1} hideProgressBar={true} autoClose={1500} position="top-center" />
      <RouterProvider router={routes} />
    </>
  )
}

export default App

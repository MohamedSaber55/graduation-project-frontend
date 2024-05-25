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
import Posts from './pages/Posts'
import Team from './pages/Team'
import { ToastContainer } from 'react-toastify'
import ProtectedRoutes from './components/ProtectedRouter'
import VerifyOTP from './pages/VerifyOTP'

function App() {

  const routes = createHashRouter(
    [{
      path: "/", element: <Layout />, children: [
        { index: true, element: <ProtectedRoutes> <Home /></ProtectedRoutes> },

        { path: "/about", element: <ProtectedRoutes> <About /></ProtectedRoutes> },
        { path: "/contact", element: <ProtectedRoutes><Contact /></ProtectedRoutes> },
        { path: "/posts", element: <ProtectedRoutes><Posts /></ProtectedRoutes> },
        { path: "/post/:postId", element: <ProtectedRoutes><Post /></ProtectedRoutes> },
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

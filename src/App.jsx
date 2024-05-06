import { RouterProvider, createBrowserRouter } from 'react-router-dom'
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

function App() {

  const routes = createBrowserRouter(
    [{
      path: "/", element: <Layout />, children: [
        { index: true, element: <Home /> },

        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/posts", element: <Posts /> },
        { path: "/post/:postId", element: <Post /> },
        { path: "/post/add", element: <AddPost /> },
        { path: "/team", element: <Team /> },
        { path: "/forgetpass", element: <ForgetPass /> },
        { path: "/resetpass", element: <ResetPass /> },
        { path: "*", element: <NotFound /> }
      ]
    },
    { path: "/welcome", element: <Welcome /> },
    { path: "/signin", element: <Login /> },
    { path: "/signup", element: <Register /> },]
  )

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App

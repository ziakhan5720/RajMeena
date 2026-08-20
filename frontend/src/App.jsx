import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Verify from './pages/Verify'
import VerifyEmail from './pages/VerifyEmail'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderDetails from './pages/OrderDetails'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Footer from './components/footer'

const router= createBrowserRouter([
  {
    path:'/',
    element:<><Navbar/><Home/><Footer/></>
  },
  {
    path:'/signup',
    element:<><Signup/></>
  },
  {
    path:'/login',
    element:<><Login/></>
  },
  {
    path: "/verify",
    element: <Verify/>
  },
  {
    path: "/verify/:token",
    element: <VerifyEmail/>
  },
  {
    path: "/products",
    element: <><Navbar/><Products/><Footer/></>
  },
  {
    path: "/product/:id",
    element: <><Navbar/><ProductDetails/><Footer/></>
  },
  {
    path: "/cart",
    element: <><Navbar/><Cart/><Footer/></>
  },
  {
    path: "/checkout",
    element: <><Navbar/><Checkout/><Footer/></>
  },
  {
    path: "/order/:id",
    element: <><Navbar/><OrderDetails/><Footer/></>
  },
  {
    path: "/profile",
    element: <><Navbar/><Profile/><Footer/></>
  },
  {
    path: "/admin",
    element: <><Navbar/><AdminDashboard/><Footer/></>
  },
  {
    path: "/about",
    element: <><Navbar/><About/><Footer/></>
  },
  {
    path: "/contact",
    element: <><Navbar/><Contact/><Footer/></>
  },
  {
    path: "/faq",
    element: <><Navbar/><FAQ/><Footer/></>
  }
])

const App = () => {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './pages/Root'
import Error from './pages/Error'
import Home from './pages/Home'
import BarRoute from './pages/BarRoute'
import StoreRoute from './pages/StoreRoute'
import { SkeletonTheme } from 'react-loading-skeleton'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/barfinder', element: <BarRoute /> },
      { path: '/store', element: <StoreRoute /> },
    ]
  }
])

export default function App() {
  return (
    <>
      <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
        <RouterProvider router={router} />
      </SkeletonTheme>
    </>
  )
}

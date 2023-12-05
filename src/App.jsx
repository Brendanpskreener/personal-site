import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './pages/Root'
import Error from './pages/Error'
import Home from './pages/Home'
import Pomodoro from './components/Pomodoro/Pomodoro'
import BarRoute from './pages/BarRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/barfinder', element: <BarRoute /> },
      { path: '/pomodoro', element: <Pomodoro /> },
    ]
  }
])

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

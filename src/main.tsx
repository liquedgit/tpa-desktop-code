import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import{
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import LoginView from './Views/LoginView.tsx'
import RegisterView from './Views/RegisterView.tsx'
import HomeView from './Views/HomeView.tsx'




const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginView />,
  },
  {
    path: "/register",
    element: <RegisterView/>
  },
  {
    path:"/home",
    element: <HomeView/>
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
      <RouterProvider router={router}/>
  </React.StrictMode>,
)


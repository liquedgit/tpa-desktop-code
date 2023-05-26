import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import{
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import LoginView from './Views/LoginView.tsx'
import RegisterView from './Views/RegisterView.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginView />,
  },
  {
    path: "register",
    element: <RegisterView/>
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <div className='h-[100vh] w-[100vw]'>
      <RouterProvider router={router}/>
    </div>
  </React.StrictMode>,
)


import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginView from "./Views/LoginView.tsx";
import RegisterView from "./Views/RegisterView.tsx";
import HomeView from "./Views/HomeView.tsx";
import NewStaffView from "./Views/NewStaffView.tsx";
import JobsView from "./Views/JobsView.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginView />,
  },
  {
    path: "/register",
    element: <RegisterView />,
  },
  {
    path: "/home",
    element: <HomeView />,
  },
  {
    path: "/newstaff",
    element: <NewStaffView />,
  },
  {
    path: "/jobs",
    element: <JobsView />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

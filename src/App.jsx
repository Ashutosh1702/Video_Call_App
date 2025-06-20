import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import VideoPage from "./components/VideoPage";
import ErrorPage from "./components/ErrorPage"; // <- add this

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorPage />, // <- handle errors
    },
    {
      path: "/room/:id", // <- dynamic route
      element: <VideoPage />,
      errorElement: <ErrorPage />, // <- handle errors
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

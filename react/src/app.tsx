import "@/app.css";
import { routeTree } from "@/routes/routeTree.tsx";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useEffect } from "react";

export const router = createRouter({ routeTree });

function App() {
  /* test API call to server */
  useEffect(() => {
    fetch("http://localhost:8080/api/hello")
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.error("Unable to query test API endpoint.")
      });
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

import '@/app.css';
import { router } from "@/routes/routes.tsx";
import { RouterProvider } from "@tanstack/react-router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

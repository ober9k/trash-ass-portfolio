import "@/app.css";
import AuthProvider from "@/providers/authProvider.tsx";
import { routeTree } from "@/routes/routeTree.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import axios from "axios";

/* pass with all requests */
axios.defaults.withCredentials = true;

export const router = createRouter({
  routeTree,
  context: {
    queryClient: new QueryClient()
  },
});
const queryClient = new QueryClient();

function App() {

  return (
    <>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
    </>
  );
}

export default App;

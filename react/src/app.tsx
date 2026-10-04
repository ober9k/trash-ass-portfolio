import "@/app.css";
import { darkTheme } from "@/config/themes";
import AuthProvider from "@/providers/authProvider.tsx";
import { routeTree } from "@/routes/routeTree.tsx";
import { ThemeProvider } from "@mui/material/styles";
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
        <ThemeProvider theme={darkTheme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
    </>
  );
}

export default App;

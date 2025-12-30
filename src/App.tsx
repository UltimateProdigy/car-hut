import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CarhutRoutes } from "./routes";
import { useCookie } from "./hooks/useCookie";
import { useEffect } from "react";
import { setupInterceptors } from "./api";
import { queryClient } from "./api/queryClient";
import { AuthProvider } from "./hooks/useAuth";
import MainLayout from "./components/layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<MainLayout />}>{CarhutRoutes()}</Route>
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Route>
  )
);

function AppContent() {
  const { getAccessToken, setAccessToken } = useCookie();

  useEffect(() => {
    setupInterceptors({ getAccessToken, setAccessToken });
  }, [getAccessToken, setAccessToken]);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

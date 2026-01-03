import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { CarhutRoutes } from "./routes";
import { useCookie } from "./hooks/useCookie";
import { useEffect, useMemo } from "react";
import { setupInterceptors } from "./api";
import MainLayout from "./components/layout";

function App() {
  const { getAccessToken, setAccessToken } = useCookie();

  useEffect(() => {
    setupInterceptors({ getAccessToken, setAccessToken });
  }, [getAccessToken, setAccessToken]);

  const router = useMemo(
    () =>
      createBrowserRouter(
        createRoutesFromElements(
          <Route>
            <Route element={<MainLayout />}>{CarhutRoutes()}</Route>
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Route>
        )
      ),
    []
  );

  return <RouterProvider router={router} />;
}

export default App;

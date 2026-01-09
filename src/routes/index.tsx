import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { routes } from "../lib/routes";
import Loader from "../components/loader";
import { ProtectedRoute } from "@/components/protected_routes";

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  protected?: boolean;
}

const Dashboard = lazy(() => import("../pages/dashboard"));
const Register = lazy(() => import("../pages/auth/register"));
const Login = lazy(() => import("../pages/auth/login"));
const Products = lazy(() => import("../pages/product"));
const ProductDetails = lazy(() => import("../pages/product/[id]"));
const Profile = lazy(() => import("../pages/profile"));

const carhutRoutesConfig: RouteConfig[] = [
  {
    path: routes.index,
    element: <Dashboard />,
  },
  {
    path: routes.auth.register,
    element: <Register />,
  },
  {
    path: routes.auth.login,
    element: <Login />,
  },
  {
    path: routes.product.index,
    element: <Products />,
  },
  {
    path: routes.product.details,
    element: <ProductDetails />,
  },
  {
    path: routes.profile.index,
    element: <Profile />,
    protected: true,
  },
];

export const CarhutRoutes = () => {
  return (
    <>
      {carhutRoutesConfig.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <Suspense fallback={<Loader />}>
              {route.protected ? (
                <ProtectedRoute>{route.element}</ProtectedRoute>
              ) : (
                route.element
              )}
            </Suspense>
          }
        />
      ))}
    </>
  );
};

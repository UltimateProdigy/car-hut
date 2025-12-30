import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../../components/loader";
import { routes } from "../../lib/routes";
import { useAuth } from "../../hooks/useAuth";

export default function MainLayout() {
  const location = useLocation();
  const { loading } = useAuth();

  if (
    [routes.auth.login, routes.auth.register, routes.index].includes(
      location.pathname
    )
  ) {
    return (
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    );
  }

  if (loading) {
    return <Loader />;
  }
}

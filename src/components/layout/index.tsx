import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../../components/loader";
import { routes } from "../../lib/routes";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "../navbar";

export default function MainLayout() {
  const location = useLocation();
  const { loading } = useAuth();

  if ([routes.auth.login, routes.auth.register].includes(location.pathname)) {
    return (
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
import { useRoutes } from "react-router-dom";
import PageLayout from "../components/Layout";
import { Assets } from "../pages/Assets";
import { Dashboard } from "../pages/Dashboard";

function CompanyRoutes() {
  const companyRoutes = useRoutes([
    {
      path: "/",
      element: (
        <PageLayout>
          <Dashboard />
        </PageLayout>
      ),
    },
    {
      path: "/assets",
      element: (
        <PageLayout>
          <Assets />
        </PageLayout>
      ),
    },
    {
      path: "/unities",
      element: (
        <PageLayout>
          <Dashboard />
        </PageLayout>
      ),
    },
    {
      path: "/users",
      element: (
        <PageLayout>
          <Dashboard />
        </PageLayout>
      ),
    },
  ]);

  return companyRoutes;
}

export default CompanyRoutes;

import { useRoutes } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";
import PageLayout from "../components/Layout";

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
  ]);

  return companyRoutes;
}

export default CompanyRoutes;

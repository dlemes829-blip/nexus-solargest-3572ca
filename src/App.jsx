import { useEffect, useMemo, useState } from "react";
import { AppShell } from "./components/AppShell.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { DashboardPage } from "./pages/DashboardPage.jsx";
import { RecordsPage } from "./pages/RecordsPage.jsx";
import { InsightsPage } from "./pages/InsightsPage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { siteContent } from "./data/siteContent.js";

const pageComponents = [HomePage, DashboardPage, RecordsPage, InsightsPage, AboutPage];

function currentRoute() {
  const value = window.location.hash.replace(/^#/, "") || "/";
  return value.startsWith("/") ? value : `/${value}`;
}

export default function App() {
  const [route, setRoute] = useState(currentRoute);

  useEffect(() => {
    const syncRoute = () => setRoute(currentRoute());
    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  const pageIndex = useMemo(() => {
    const index = siteContent.pages.findIndex(page => page.slug === route);
    return index < 0 ? 0 : index;
  }, [route]);
  const Page = pageComponents[pageIndex] || HomePage;

  return (
    <AppShell route={siteContent.pages[pageIndex]?.slug || "/"}>
      <Page />
    </AppShell>
  );
}

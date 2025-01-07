
import React from "react"
import { BrowserRouter, Route, Routes } from "react-router"
import WelcomePage from "./pages/welcome-page"
import LoginPage from "./pages/login-page"
import ErrorPage404 from "./pages/ErrorPage404"
import DuplicateTabErrorPage from "./pages/DuplicateTabErrorPage"
// import ProtectedDashboardLayout from "./components/protected-dashboard-layout"
import DashboardLayoutPage from "./pages/dashboard-layout-page"
import { AuthProvider } from "./context/authProvider"
import PublicRoute from "./components/public-route"
import { useLocalStorage } from "./hooks/use-local-storage"

function App() {

  const [routeItems] = useLocalStorage("userMenuItems")

  const createRoutes = () => {
    const maintenanceRoutes = routeItems[0].items.map(({ menuId, menuDesc, screenAction }) => {
      return { menuId, menuDesc, screenAction, component: React.lazy(() => {/* @vite-ignore */ return import(`./pages/maintenance/${screenAction}`) }) }
    });
    const systemAdminRoutes = routeItems[1].items.map(({ menuId, menuDesc, screenAction }) => {
      return { menuId, menuDesc, screenAction, component: React.lazy(() => {/* @vite-ignore */ return import(`./pages/system-admin/${screenAction}`) }) }
    });
    return [...maintenanceRoutes, ...systemAdminRoutes];
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="/dashboard" element={<DashboardLayoutPage />}>
              {/* Dynamic Routes as per user items */}
              {createRoutes().map(({ screenAction, menuDesc, component: Component }) => (
                <Route
                  key={screenAction}
                  path={`${screenAction}`}
                  element={<Component title={menuDesc} />}
                />
              ))}
            </Route>
            <Route path="/error" element={<ErrorPage404 />} />
            <Route path="/errorDuplicateTab" element={<DuplicateTabErrorPage />} />
            <Route path="*" element={<ErrorPage404 />} />
          </Routes>
        </React.Suspense>

      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

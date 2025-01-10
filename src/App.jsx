
import { Route, Routes } from "react-router"
import DuplicateTabErrorPage from "./pages/DuplicateTabErrorPage"
import DashboardLayoutPage from "./pages/dashboard-layout-page"
import PublicRoute from "./components/public-route"

// import pages
import KycAuthorPage from "./pages/maintenance/kyc-author"
import KycDocumentAuthorPage from "./pages/maintenance/kyc-document-author"
import KycDocumentMakerPage from "./pages/maintenance/kyc-document-maker"
import KycMakerPage from "./pages/maintenance/kyc-maker"
import ParameterAuthorPage from "./pages/maintenance/parameter-author"
import ParameterMakerPage from "./pages/maintenance/parameter-maker"
import ProductAuthorPage from "./pages/maintenance/product-author"
import ProductMakerPage from "./pages/maintenance/product-maker"
import SchemeAuthorPage from "./pages/maintenance/scheme-author"
import SchemeMakerPage from "./pages/maintenance/scheme-maker"
import SuperSchemeMakerPage from "./pages/maintenance/super-scheme-maker"
import SuperSchemeAuthorPage from "./pages/maintenance/super-scheme-author"
import TemplateAuthorPage from "./pages/maintenance/template-author"
import TemplateMakerPage from "./pages/maintenance/template-maker"

import BranchMasterAuthorPage from "./pages/system-admin/branch-master-author"
import BranchMasterMakerPage from "./pages/system-admin/branch-master-maker"
import CityAuthorPage from "./pages/system-admin/city-author"
import CityMakerPage from "./pages/system-admin/city-maker"
import CorporateAuthorPage from "./pages/system-admin/corporate-author"
import CorporateMakerPage from "./pages/system-admin/corporate-maker"
import CountryAuthorPage from "./pages/system-admin/country-author"
import CountryMakerPage from "./pages/system-admin/country-maker"
import DeviceAuthorPage from "./pages/system-admin/device-author"
import DeviceMakerPage from "./pages/system-admin/device-maker"
import IfscMasterAuthorPage from "./pages/system-admin/ifsc-master-author"
import IfscMasterMakerPage from "./pages/system-admin/ifsc-master-maker"
import ImageTrackerPage from "./pages/system-admin/image-tracker"
import LoginAuditTrailPage from "./pages/system-admin/login-audit-trail"
import PincodeAuthorPage from "./pages/system-admin/pincode-author"
import PincodeMakerPage from "./pages/system-admin/pincode-maker"
import ServiceAuditTrailPage from "./pages/system-admin/service-audit-trail"
import StateAuthorPage from "./pages/system-admin/state-author"
import StateMakerPage from "./pages/system-admin/state-maker"
import UserAuthorPage from "./pages/system-admin/user-author"
import UserMakerPage from "./pages/system-admin/user-maker"

import WelcomePage from "./pages/welcome-page"
import LoginPage from "./pages/login-page"
import ErrorPage404 from "./pages/ErrorPage404"

function App() {

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayoutPage />}>
        {/* maintainance routes */}
        <Route path="maintenance" >
          <Route path="kyc-author" element={<KycAuthorPage title={"kyc-author"} />} />
          <Route path="kyc-document-author" element={<KycDocumentAuthorPage title={"kyc-document-author"} />} />
          <Route path="kyc-document-maker" element={<KycDocumentMakerPage title={"kyc-document-maker"} />} />
          <Route path="kyc-maker" element={<KycMakerPage title={"kyc-maker"} />} />
          <Route path="parameter-author" element={<ParameterAuthorPage title={"parameter-author"} />} />
          <Route path="parameter-maker" element={<ParameterMakerPage title={"parameter-maker"} />} />
          <Route path="product-author" element={<ProductAuthorPage title={"product-author"} />} />
          <Route path="product-maker" element={<ProductMakerPage title={"product-maker"} />} />
          <Route path="scheme-author" element={<SchemeAuthorPage title={"scheme-author"} />} />
          <Route path="scheme-maker" element={<SchemeMakerPage title={"scheme-maker"} />} />
          <Route path="super-scheme-maker" element={<SuperSchemeMakerPage />} />
          <Route path="super-scheme-author" element={<SuperSchemeAuthorPage title={"super-scheme-author"} />} />
          <Route path="template-author" element={<TemplateAuthorPage title={"template-author"} />} />
          <Route path="template-maker" element={<TemplateMakerPage title={"template-maker"} />} />
        </Route>

        {/* system-admin routes  */}
        <Route path="system-admin" >
          <Route path="branch-master-author" element={<BranchMasterAuthorPage title={"branch-master-author"} />} />
          <Route path="branch-master-maker" element={<BranchMasterMakerPage title={"branch-master-maker"} />} />
          <Route path="city-author" element={<CityAuthorPage title={"city-author"} />} />
          <Route path="city-maker" element={<CityMakerPage title={"city-maker"} />} />
          <Route path="corporate-author" element={<CorporateAuthorPage title={"corporate-author"} />} />
          <Route path="corporate-maker" element={<CorporateMakerPage title={"corporate-maker"} />} />
          <Route path="country-author" element={<CountryAuthorPage title={"country-author"} />} />
          <Route path="country-maker" element={<CountryMakerPage title={"country-maker"} />} />
          <Route path="device-author" element={<DeviceAuthorPage title={"device-author"} />} />
          <Route path="device-maker" element={<DeviceMakerPage title={"device-maker"} />} />
          <Route path="ifsc-master-author" element={<IfscMasterAuthorPage title={"ifsc-master-author"} />} />
          <Route path="ifsc-master-maker" element={<IfscMasterMakerPage title={"ifsc-master-maker"} />} />
          <Route path="image-tracker" element={<ImageTrackerPage title={"image-tracker"} />} />
          <Route path="login-audit-trail" element={<LoginAuditTrailPage title={"login-audit-trail"} />} />
          <Route path="pincode-author" element={<PincodeAuthorPage title={"pincode-author"} />} />
          <Route path="pincode-maker" element={<PincodeMakerPage title={"pincode-maker"} />} />
          <Route path="service-audit-trail" element={<ServiceAuditTrailPage title={"service-audit-trail"} />} />
          <Route path="state-author" element={<StateAuthorPage title={"state-author"} />} />
          <Route path="state-maker" element={<StateMakerPage title={"state-maker"} />} />
          <Route path="user-author" element={<UserAuthorPage title={"user-author"} />} />
          <Route path="user-maker" element={<UserMakerPage />} />
        </Route>
      </Route>

      <Route path="/error" element={<ErrorPage404 />} />
      <Route path="/errorDuplicateTab" element={<DuplicateTabErrorPage />} />
      <Route path="*" element={<ErrorPage404 />} />
    </Routes>


  )
}

export default App

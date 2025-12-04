import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "@_page/DashboardPage";
import DefaultLayout from "@_components/layout/DefaultLayout";
import MerchantList from "@_page/MerchantListPage";
import PaymentList from "@_page/PaymentListPage";
import MerchantModal from "@_components/Common/MerchantModal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="merchantlist" element={<MerchantList />} />
          <Route path="paymentlist" element={<PaymentList />} />
        </Route>
      </Routes>
      <MerchantModal />
    </>
  );
}

export default App;

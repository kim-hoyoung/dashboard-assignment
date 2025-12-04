import "./App.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./page/DashboardPage";
import DefaultLayout from "./components/layout/DefaultLayout";
import MerchantList from "./page/MerchantListPage";
import PaymentList from "./page/PaymentListPage";
import MerchantModal from "./components/Common/MerchantModal";

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

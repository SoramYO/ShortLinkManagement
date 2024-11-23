import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../components/Auth/LoginPage";
import RegisterPage from "../components/Auth/RegisterPage";
import ErrorPage from "../components/ErrorPage";
import HomePage from "../components/Landing/HomePage";
import PaymentProof from "../components/Landing/PaymentProof";
import PayoutRatesPage from "../components/Landing/PayoutRatesPage";
import PrivacyPage from "../components/Landing/PrivacyPage";
import TermPage from "../components/Landing/TermPage";
import AdminLayout from "../layouts/AdminLayout";
import MemberLayout from "../layouts/MemberLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CampaignList from "../pages/admin/CampaignList";
import CreateCampaign from "../pages/admin/CreateCampaign";
import ForumCategories from "../pages/admin/ForumCategories";
import ForumTopics from "../pages/admin/ForumTopics";
import GiftCodeManager from "../pages/admin/GiftCodeManager";
import IPManager from "../pages/admin/IPManager";
import LinkManager from "../pages/admin/LinkManager";
import NotificationManager from "../pages/admin/NotificationManager";
import OTPManager from "../pages/admin/OTPManager";
import OrderManager from "../pages/admin/OrderManager";
import PageManager from "../pages/admin/PageManager";
import PaymentManager from "../pages/admin/PaymentManager";
import PromoCodeManager from "../pages/admin/PromoCodeManager";
import Settings from "../pages/admin/Settings";
import SupportManager from "../pages/admin/SupportManager";
import UserList from "../pages/admin/UserList";
import APIManager from "../pages/member/APIManager";
import Affiliates from "../pages/member/Affiliates";
import DeveloperAPI from "../pages/member/DeveloperAPI";
import LinkHistory from "../pages/member/LinkHistory";
import MassShrinker from "../pages/member/MassShrinker";
import MemberDashboard from "../pages/member/MemberDashboard";
import QuickLink from "../pages/member/QuickLink";
import Statistics from "../pages/member/Statistics";
import Withdraw from "../pages/member/Withdraw";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/terms",
          element: <TermPage />,
        },
        { path: "/privacy", element: <PrivacyPage /> },
        { path: "/payout-rates", element: <PayoutRatesPage /> },
        { path: "/payment-proof", element: <PaymentProof /> },
      ],
    },
    {
      path: "/member",
      element: (
        <ProtectedRoute>
          <MemberLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "dashboard", element: <MemberDashboard /> },
        { path: "statistics", element: <Statistics /> },
        { path: "api-manager", element: <APIManager /> },
        { path: "links", element: <LinkHistory /> },
        { path: "quick-link", element: <QuickLink /> },
        { path: "mass-shrinker", element: <MassShrinker /> },
        { path: "developer-api", element: <DeveloperAPI /> },
        { path: "withdraw", element: <Withdraw /> },
        { path: "affiliates", element: <Affiliates /> },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "campaigns/create", element: <CreateCampaign /> },
        { path: "campaigns", element: <CampaignList /> },
        { path: "users", element: <UserList /> },
        { path: "withdrawals", element: <PaymentManager /> },
        { path: "pages", element: <PageManager /> },
        { path: "otp", element: <OTPManager /> },
        { path: "notifications", element: <NotificationManager /> },
        { path: "links", element: <LinkManager /> },
        { path: "ip-manager", element: <IPManager /> },
        { path: "promo-codes", element: <PromoCodeManager /> },
        { path: "gift-codes", element: <GiftCodeManager /> },
        { path: "orders", element: <OrderManager /> },
        { path: "support", element: <SupportManager /> },
        { path: "forum/topics", element: <ForumTopics /> },
        { path: "forum/categories", element: <ForumCategories /> },
        { path: "settings", element: <Settings /> },
      ],
    },
  ],
  {
    future: {
      v7_partialHydration: true,
    },
  }
);

export default router;

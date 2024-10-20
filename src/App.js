import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import GetStarted from "./components/get_started/getStarted";
import Signup from "./components/get_started/signup";
import Login from "./components/get_started/login";
import MainHomePage from "./components/home/mainHomePage";
import RestaurantsList from "./components/restaurants/restaurantsList";
import ServicesMainPage from "./components/services/sevicesMainPage";
import MainProducts from "./components/products/mainProductsPage";
import Checkout from "./components/orders/checkout";
import PartnerWithUs from "./components/partner_with_us/partnerWithUs";
import RideWithUs from "./components/ride_with_us/rideWithUs";
import MainAccountSitting from "./components/account/accountSetting";
import ResetPassword from "./components/get_started/forgetPassword";
import TermsAndConditions from './components/terms_conditions/terms';
import PrivacyPolicy from './components/terms_conditions/policy';
import ServiceDetails from './components/services/serviceDetails';
function App() {
  const ProtectedRoute = ({ children }) => {
    const { token } = useSelector((state) => state.auth);

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<MainHomePage />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forget-password" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/restaurants" element={<RestaurantsList />} />
        <Route path="/shops" element={<RestaurantsList />} />
        <Route path="/services" element={<ServicesMainPage />} />
        <Route path="/products/:id" element={<MainProducts />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/TermsandConditions" element={<TermsAndConditions />} />
        <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/partnerwithus" element={<PartnerWithUs />} />
        <Route path="/ridewithus" element={<RideWithUs />} />
        <Route path="/profile" element={<MainAccountSitting />} />
        {/* <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainAccountSitting />
            </ProtectedRoute>
          }
        /> */}
      </Route>
    )
  );

  return (
    <div className="bg-[--main-green-background] min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

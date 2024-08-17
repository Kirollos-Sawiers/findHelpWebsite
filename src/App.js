import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import GetStarted from "./components/get_started/getStarted";
import Signup from "./components/get_started/signup";
import Login from "./components/get_started/login";
import MainHomePage from "./components/home/mainHomePage";
import RestaurantsList from "./components/restaurants/restaurantsList";
import MainProducts from "./components/products/mainProductsPage";
import Checkout from "./components/orders/checkout";
import PartnerWithUs from './components/partner_with_us/partnerWithUs';
import RideWithUs from './components/ride_with_us/rideWithUs';
import MainAccountSitting from './components/account/accountSetting';
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<MainHomePage />} />
        <Route path="/get-started" element={<GetStarted/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/restaurants" element={<RestaurantsList/>} />
        <Route path="/shops" element={<RestaurantsList/>} />
        <Route path="/products/:id" element={<MainProducts/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/partnerwithus" element={<PartnerWithUs/>} />
        <Route path="/ridewithus" element={<RideWithUs/>} />
        <Route path="/profile" element={<MainAccountSitting/>} />
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

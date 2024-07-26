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
import Footer from "./components/footer/footer";
import Checkout from "./components/orders/checkout";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<MainHomePage />} />
        <Route path="/get-started" element={<GetStarted/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/restaurants" element={<RestaurantsList/>} />
        <Route path="/products" element={<MainProducts/>} />
        <Route path="/checkout" element={<Checkout/>} />
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

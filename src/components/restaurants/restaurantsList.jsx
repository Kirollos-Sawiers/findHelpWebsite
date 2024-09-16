import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Image from "react-bootstrap/Image";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { InputText } from "primereact/inputtext";
import { Rating } from "primereact/rating";
import restaurant_list_img from "../../assets/restaurant_list_img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faPercent } from "@fortawesome/free-solid-svg-icons";
import { faStar as offStar } from "@fortawesome/free-regular-svg-icons";
import Footer from "./../footer/footer";
import { Link, useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRestaurants,
  getRestaurantCategoryData,
  getShopsCategoryData,
  getAllShops
} from "./../../features/restaurants/restaurantsAPI";

function RestaurantsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const dispatch = useDispatch();
  const allRestaurantsData = useSelector(
    (state) => state.restaurantsData.restaurants
  );
  const restaurantCategoryData = useSelector(
    (state) => state.restaurantsData.categories
  );
  const {loading} = useSelector((state) => state.restaurantsData);
  const error = useSelector((state) => state.restaurantsData.error);
  useEffect(() => {
    if (location.pathname === "/restaurants") {
      dispatch(getAllRestaurants(currentPage));
      dispatch(getRestaurantCategoryData());
    } else if (location.pathname === "/shops") {
      dispatch(getAllShops(currentPage));
      dispatch(getShopsCategoryData());
    }
  }, [location.pathname, currentPage, dispatch]);

  const restaurantCard = () => {
    return (
      <>
        <div className="flex flex-wrap justify-around">
          {allRestaurantsData.map((rest) => {
              return (
                <Link
                  to={`/products/${rest.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                  key={rest.id}
                >
                  <div className="rounded-2xl mb-3 shadow-md mr-1">
                    <Image
                      className="w-60 h-44 rounded-t-lg"
                      src={rest?.image?.url}
                    />
                    <div className="flex justify-between">
                      <div className="ml-2">
                        <p className="font-bold my-1">{rest?.name?.en}</p>
                        <p className="small mb-0">
                          {rest?.restaurant_categories[0]?.name.en || "Food"}
                        </p>
                        <div className="m-2.5">
                          <Rating
                            value={rest?.orders_reviews_avg_rates}
                            readOnly
                            cancel={false}
                            onIcon={
                              <FontAwesomeIcon
                                icon={faStar}
                                style={{ color: "#f0a835" }}
                              />
                            }
                            offIcon={
                              <FontAwesomeIcon
                                icon={offStar}
                                style={{ color: "#f0a835" }}
                              />
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </>
    );
  };

  const categoryHeader = () => {
    return (
      <>
        <div className="overflow-x-auto flex space-x-4 p-4 bg-gray-50 mb-5">
          {restaurantCategoryData.length > 0 ? (
            restaurantCategoryData.map((item) => {
              return (
                <div
                  key={item.id}
                  className="min-w-[100px] flex-shrink-0 p-2 bg-white rounded-lg shadow-md text-center"
                >
                  <img
                    src={item.image?.url}
                    alt={item.name?.en}
                    className="h-16 w-16 mx-auto mb-2"
                  />
                  <p className="text-sm font-semibold">{item.name?.en}</p>
                </div>
              );
            })
          ) : (
            <p className="font-bold text-center">No categories available</p>
          )}
        </div>
      </>
    );
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center align-middle items-center h-96">
  //       <Spinner animation="border" variant="warning" />
  //     </div>
  //   );
  // }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (<>
    {loading?  <div className="flex justify-center align-middle items-center h-96">
      <Spinner animation="border" variant="warning" />
    </div> : <>
      <Container fluid className="p-0">
        <Navbar />
        <Container>
          <Row>
            {/* <Col xs={12} md={3} lg={3}>
              <p className="text-xl text-zinc-500 mb-2">Show results for:</p>
              <div className="flex flex-wrap flex-row justify-content-start gap-3 md:block lg:block">
                <div className="flex align-items-center">
                  <Form.Check
                    invalid
                    inline
                    label="Open now"
                    name="group1"
                    type="checkbox"
                  />
                </div>
                <div className="flex align-items-center">
                  <Form.Check
                    inline
                    label="Promo"
                    name="group1"
                    type="checkbox"
                  />
                </div>
              </div>
              <p className="text-xl text-zinc-500 mb-2 mt-3">Sort by:</p>
              <div className="flex flex-wrap flex-row justify-content-start gap-3 md:block lg:block">
                <div className="flex align-items-center">
                  <Form.Check
                    inline
                    label="Popular"
                    name="group2"
                    type="checkbox"
                  />
                </div>
                <div className="flex align-items-center">
                  <Form.Check
                    inline
                    label="Rating"
                    name="group2"
                    type="checkbox"
                  />
                </div>
                <div className="flex align-items-center">
                  <Form.Check
                    inline
                    label="Delivery Time"
                    name="group2"
                    type="checkbox"
                  />
                </div>
              </div>
            </Col> */}
            <Col xs={12} md={12} lg={12}>
              {/* <div>
                <InputText
                  placeholder="Search"
                  type="text"
                  className="w-1/2 p-2 mb-5 border-2 border-[#f0a835] rounded-lg "
                />
              </div> */}

              <div>{categoryHeader()}</div>

              <div>
                {restaurantCard()}
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="w-32 px-4 py-2 mr-5 bg-[#f0a835] rounded text-white font-bold"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="w-32 px-4 py-2 bg-[#f0a835] rounded text-white font-bold"
                >
                  Next
                </button>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </Container>
    </>}
    </>)
}

export default RestaurantsList;

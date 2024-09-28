import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "./../footer/footer";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRestaurants,
  getRestaurantCategoryData,
  getShopsCategoryData,
  getAllShops,
  getRestaurantsByCategoryID,
  getShopsByCategoryID,
} from "./../../features/restaurants/restaurantsAPI";
import RestaurantCard from "./restaurantCard";
import CategoryHeader from "./categoryHeader";
import LoadingSpinner from "./loadingSpinner";
import ErrorDisplay from "./errorDisplay";
import Form from "react-bootstrap/Form";

function RestaurantsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const allRestaurantsData = useSelector(
    (state) => state.restaurantsData.restaurants
  );
  const restaurantCategoryData = useSelector(
    (state) => state.restaurantsData.categories
  );
  const { loading } = useSelector((state) => state.restaurantsData);
  const error = useSelector((state) => state.restaurantsData.error);

  useEffect(() => {
    if (location.pathname === "/restaurants") {
      dispatch(getRestaurantCategoryData());
    } else if (location.pathname === "/shops") {
      dispatch(getShopsCategoryData());
    }
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (location.pathname === "/restaurants") {
      console.log(allRestaurantsData)
      console.log(currentPage)
      if (selectedCategoryId) {
        dispatch(getRestaurantsByCategoryID(currentPage,selectedCategoryId));
      } else {
        dispatch(getAllRestaurants(currentPage));
      }
    } else if (location.pathname === "/shops") {
      if (selectedCategoryId) {
        dispatch(getShopsByCategoryID(currentPage,selectedCategoryId));
      } else {
        dispatch(getAllShops(currentPage));
      }
    }
  }, [location.pathname, currentPage, dispatch, selectedCategoryId]);

  const handleCategoryClick = (categoryId) => {
    setCurrentPage(1)
    setSelectedCategoryId(categoryId);
    console.log("Category clicked:", categoryId);
    if (location.pathname === "/restaurants") {
      dispatch(
        getRestaurantsByCategoryID({
          page: currentPage,
          selectedCategoryId: categoryId,
        })
      );
    } else if (location.pathname === "/shops") {
      dispatch(
        getShopsByCategoryID({
          page: currentPage,
          selectedCategoryId: categoryId,
        })
      );
    }

   
 


  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <Container fluid className="p-0">
      <Navbar />
      <Container>
        <Row>
              {/* <Col xs={12} md={2} lg={2}>
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
            <div>
              <CategoryHeader
                categories={restaurantCategoryData}
                onCategoryClick={handleCategoryClick}
              />
            </div>
            <div className="flex flex-wrap justify-around">
              {allRestaurantsData.map((rest) => (
                <RestaurantCard key={rest.id} restaurant={rest} />
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
  );
}

export default RestaurantsList;

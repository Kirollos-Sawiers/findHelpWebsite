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
import {
  getAllCountries,
  getAllCities,
} from "../../features/location/locationAPI";
import RestaurantCard from "./restaurantCard";
import CategoryHeader from "./categoryHeader";
import LoadingSpinner from "./loadingSpinner";
import ErrorDisplay from "./errorDisplay";
import Button from "react-bootstrap/Button";

function RestaurantsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
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
    dispatch(getAllCountries()).then((res) => {
      setCountries(res.payload.data);
    });
    if (location.pathname === "/restaurants") {
      dispatch(getRestaurantCategoryData());
    } else if (location.pathname === "/shops") {
      dispatch(getShopsCategoryData());
    }
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (location.pathname === "/restaurants") {
      // console.log(allRestaurantsData)
      // console.log(currentPage)
      if (selectedCategoryId) {
        dispatch(getRestaurantsByCategoryID(currentPage, selectedCategoryId));
      } else {
        dispatch(getAllRestaurants(currentPage))
      }
    } else if (location.pathname === "/shops") {
      if (selectedCategoryId) {
        dispatch(getShopsByCategoryID(currentPage, selectedCategoryId));
      } else {
        dispatch(getAllShops(currentPage));
      }
    }
  }, [location.pathname, currentPage, dispatch, selectedCategoryId]);

  const handleCategoryClick = (categoryId) => {
    setCurrentPage(1);
    setSelectedCategoryId(categoryId);
    // console.log("Category clicked:", categoryId);
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
  const handleCountryChange = (e) => {
    setSelectedCountryId(e.target.value);
    dispatch(getAllCities(e.target.value)).then((res) => {
      setCities(res.payload.data);
    });
  };

  const handleCityChange = (e) => {
    // console.log(e.target.value);
    setSelectedCity(e.target.value);
  };
  const countryCityDropdown = () => {
    return (
      <div className="pt-1">
        {countries ? (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="country">
              Country
            </label>
            <select
              className="block w-full bg-white border py-2 rounded shadow"
              id="country"
              value={selectedCountryId}
              onChange={handleCountryChange}
            >
              <option value="EG">Select a country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name.en}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <LoadingSpinner />
        )}

        {cities ? (
          <>
            {selectedCountryId && (
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="city">
                  City
                </label>
                <select
                  className="block w-full bg-white border py-2 rounded shadow"
                  id="city"
                  value={selectedCity}
                  onChange={handleCityChange}
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name.en}>
                      {city.name.en}
                    </option>
                  ))}
                </select>
               
              </div>
             
            )}
             {selectedCity? (<div className="flex justify-center py-4">
                <Button
            variant="warning"
            href="/login"
            style={{
              margin: 0,
              color: "black",
              fontWeight: "bold",
              fontSize: "14px",
              width: "7rem",
              height: "2rem",
            }}
            onClick={() => {}}
          >Search
          </Button>
                </div>) : <></>}
          </>
        ) : (
          <></>
        )}
      </div>
    );
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
          <Col xs={12} md={2} lg={2}>
            {countryCityDropdown()}
            {/* <p className="text-xl text-zinc-500 mb-2">Show results for:</p>
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
              </div> */}
          </Col>
          <Col xs={12} md={10} lg={10}>
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

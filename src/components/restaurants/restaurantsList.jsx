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
  filterRestaurantsByLocation,
  searchRestaurants,
  getBanners,
} from "./../../features/restaurants/restaurantsAPI";
import {
  getAllCountries,
  getAllCities,
} from "../../features/location/locationAPI";
import RestaurantCard from "./restaurantCard";
import CategoryHeader from "./categoryHeader";
import LoadingSpinner from "./loadingSpinner";
import ErrorDisplay from "./errorDisplay";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import ImageSlider from "./slider";
import {
  sortRestaurantsByDistance,
  getUserLocation,
} from "../../utils/locationService";

function RestaurantsList() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [banners, setBanners] = useState();
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
  const lng = cookies.get("i18next") || "en";

  // Helper function to get the correct language property
  const getLangProperty = (obj, property) => {
    return obj?.[property]?.[lng] || obj?.[property]?.en || "";
  };

  useEffect(() => {
    dispatch(getAllCountries()).then((res) => {
      setCountries(res.payload.data);
    });
    if (location.pathname === "/restaurants") {
      dispatch(getRestaurantCategoryData());
      dispatch(getBanners()).then((res) => {
        const filteredRestaurants = res.payload.filter(
          (item) => item.type === "restaurant"
        );
        setBanners(filteredRestaurants);
      });
    } else if (location.pathname === "/shops") {
      dispatch(getShopsCategoryData());
      dispatch(getBanners()).then((res) => {
        const filteredRestaurants = res.payload.filter(
          (item) => item.type === "shop"
        );
        setBanners(filteredRestaurants);
      });
    }
  }, [location.pathname, dispatch]);

  // Get the user's location
  const getLocation = async () => {
    try {
      const location = await getUserLocation(); // Assuming getUserLocation returns the location
      setUserLocation(location); // Update state (optional, if you need to store it globally)
      return location; // Return the location data
    } catch (error) {
      console.error("Error getting user location:", error);
      throw error; // Re-throw the error if needed
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location.pathname === "/restaurants") {
          if (selectedCategoryId) {
            dispatch(
              getRestaurantsByCategoryID(currentPage, selectedCategoryId)
            );
          } else {
            // Await the user location
            const userLocation = await getLocation();
            console.log("User Location:", userLocation); // Debugging

            if (!userLocation) {
              console.error("User location is undefined or null.");
              return; // Exit if location is not available
            }

            // Fetch restaurants
            const result = await dispatch(getAllRestaurants(currentPage));
            console.log("Restaurants Data:", result?.payload?.data); // Debugging

            if (result?.payload?.data?.length > 0) {
              // Sort restaurants by distance
              const sortedRestaurants = sortRestaurantsByDistance(
                result.payload.data,
                userLocation
              );
              setRestaurants(sortedRestaurants);
              console.log("Sorted Restaurants:", sortedRestaurants); // Debugging
            }
          }
        } else if (location.pathname === "/shops") {
          if (selectedCategoryId) {
            dispatch(getShopsByCategoryID(currentPage, selectedCategoryId));
          } else {
            dispatch(getAllShops(currentPage)).then((res)=>{
              setRestaurants(res.payload.data);
            })
          }
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    };

    fetchData();
  }, [location.pathname, currentPage, dispatch, selectedCategoryId]);

  const handleCategoryClick = (categoryId) => {
    setCurrentPage(1);
    setSelectedCategoryId(categoryId);
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
    setSelectedCity(e.target.value);
  };

  const handleSearch = () => {
    const type = location.pathname === "/restaurants" ? "restaurant" : "shop";
    dispatch(searchRestaurants({ type, searchValue }));
  };

  const countryCityDropdown = () => {
    return (
      <div className="pt-1">
        {countries ? (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="country">
              {t("country")}
            </label>
            <select
              className="block w-full bg-white border py-2 rounded shadow"
              id="country"
              value={selectedCountryId}
              onChange={handleCountryChange}
            >
              <option value="">{t("select_country")}</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {getLangProperty(country, "name")}
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
                  {t("city")}
                </label>
                <select
                  className="block w-full bg-white border py-2 rounded shadow"
                  id="city"
                  value={selectedCity}
                  onChange={handleCityChange}
                >
                  <option value="">{t("select_city")}</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {getLangProperty(city, "name")}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {selectedCity ? (
              <div className="flex justify-center py-4">
                <button
                  className="w-[70%] h-10 text-white font-semibold bg-[#f0a835] rounded-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    const type =
                      location.pathname === "/restaurants"
                        ? "restaurant"
                        : "shop";
                    dispatch(
                      filterRestaurantsByLocation({
                        type: type,
                        page: currentPage,
                        cityID: selectedCity,
                        countryID: selectedCountryId,
                      })
                    );
                  }}
                >
                  {t("search")}
                </button>
              </div>
            ) : (
              <></>
            )}
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
      <Container fluid className="px-3">
        <div className="w-full h-12 flex justify-center ">
          <div className="p-inputgroup w-[30%] h-8 border-1">
            <InputText
              className="px-2"
              placeholder={t("search")}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button
              icon="pi pi-search"
              className="bg-[#f0a835] w-3"
              onClick={handleSearch}
            />
          </div>
        </div>
        <Row>
          <Col xs={12} md={2} lg={2}>
            {countryCityDropdown()}
          </Col>
          <Col xs={12} md={10} lg={10}>
            <div>
              <CategoryHeader
                categories={restaurantCategoryData}
                onCategoryClick={handleCategoryClick}
              />
            </div>
            <div>
              {banners ? (
                <>
                  <div className="flex justify-center bg-gray-100 mt-3">
                    <ImageSlider
                      images={banners}
                      interval={3000}
                      width="[100%]"
                      height="[50%]"
                      isRTL={lng === "ar"}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-wrap justify-evenly">
              {restaurants && !selectedCategoryId ? (
                <>
                  {restaurants.map((rest) => (
                    <RestaurantCard key={rest.id} restaurant={rest} />
                  ))}
                </>
              ) : (
                <>
                  {allRestaurantsData?.data?.map((rest) => (
                    <RestaurantCard key={rest.id} restaurant={rest} />
                  ))}
                </>
              )}
               {/* {allRestaurantsData?.data?.map((rest) => (
                    <RestaurantCard key={rest.id} restaurant={rest} />
                  ))} */}
            </div>
            <div className="flex justify-evenly mt-4">
              <div>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={!allRestaurantsData?.prev_page_url}
                  className="w-32 px-4 py-2 mr-5 bg-[#f0a835] rounded text-white font-bold disabled:bg-gray-300"
                >
                  {t("previous")}
                </button>
              </div>
              <div>
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={!allRestaurantsData?.next_page_url}
                  className="w-32 px-4 py-2 bg-[#f0a835] rounded text-white font-bold disabled:bg-gray-300"
                >
                  {t("next")}
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Container>
  );
}

export default RestaurantsList;

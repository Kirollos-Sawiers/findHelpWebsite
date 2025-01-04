import React from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { Rating } from "primereact/rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as offStar } from "@fortawesome/free-regular-svg-icons";
import { Chip } from "primereact/chip";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";

function RestaurantCard({ restaurant }) {
  const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  const isOpen = restaurant?.work_times?.is_open;
  // Helper function to get the correct language property
  const getLangProperty = (obj, property) => {
    return obj?.[property]?.[lng] || obj?.[property]?.en || "";
  };

  return (
    <div
      className={`rounded-2xl mb-3 shadow-md w-44 ${
        !isOpen ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <Link
        to={`/products/${restaurant.id}`}
        style={{ textDecoration: "none", color: "black" }}
        key={restaurant.id}
        className={!isOpen ? "pointer-events-none" : ""}
      >
        <Image
          className="w-44 h-36 rounded-t-lg"
          src={restaurant?.image?.url}
        />
        <div className="w-full flex justify-between">
          <div className="w-44 ml-2">
            <p className="font-semibold text-sm p-1 leading-1 m-0">
              {getLangProperty(restaurant, "name")}
            </p>
            <p className="small mb-0 p-1">
              {getLangProperty(restaurant?.restaurant_categories[0], "name") || "Food"}
            </p>
            <div className="w-full flex justify-end">
              {!isOpen ? (
                <>
                  <Chip
                    className="bg-[#ff1d1d] rounded-full text-white p-1 mr-2 text-sm"
                    label="Closed"
                  />
                </>
              ) : null}
            </div>
            <div className="m-2.5">
              <Rating
                value={restaurant?.orders_reviews_avg_rates}
                readOnly
                cancel={false}
                onIcon={
                  <FontAwesomeIcon icon={faStar} style={{ color: "#f0a835" }} />
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
      </Link>
    </div>
  );
}

export default RestaurantCard;
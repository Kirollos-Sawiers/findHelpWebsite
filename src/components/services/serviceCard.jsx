import React from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { Rating } from "primereact/rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as offStar } from "@fortawesome/free-regular-svg-icons";

function ServiceCard({ service }) {
    console.log(service);
  return (
    <Link
      to={`/products/${service.id}`}
      style={{ textDecoration: "none", color: "black" }}
      key={service.id}
    >
      <div className="rounded-2xl mb-3 shadow-md mr-1">
        <Image
          className="w-52 h-36 rounded-t-lg"
          src={service?.category?.image?.url}
        />
        <div className="flex justify-between">
          <div className="ml-2">
            <p className="w-48 font-semibold text-sm p-1 leading-none m-0 truncate">{service?.user?.name}</p>
            <p className="w-48 small p-1 truncate mb-2">
              {service?.description?.en || "Service"}
            </p>
            {/* <div className="m-2.5">
              <Rating
                value={service?.orders_reviews_avg_rating}
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
            </div> */}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ServiceCard;
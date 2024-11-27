import React from "react";
import cookies from "js-cookie";

function CategoryHeader({ categories, onCategoryClick }) {
  const lng = cookies.get("i18next") || "en";

  // Helper function to get the correct language property
  const getLangProperty = (obj, property) => {
    return obj?.[property]?.[lng] || obj?.[property]?.en || "";
  };

  return (
    <div className="overflow-x-auto flex space-x-4 p-4 bg-gray-50 mb-5">
      {categories.length > 0 ? (
        categories.map((item) => (
          <div
            key={item.id}
            className="min-w-[100px] flex-shrink-0 p-2 bg-white rounded-lg shadow-md text-center cursor-pointer"
            onClick={() => onCategoryClick(item.id)}
          >
            <img
              src={item.image?.url}
              alt={getLangProperty(item, "name")}
              className="h-16 w-16 mx-auto mb-2"
            />
            <p className="text-sm font-semibold">{getLangProperty(item, "name")}</p>
          </div>
        ))
      ) : (
        <p className="font-bold text-center">No categories available</p>
      )}
    </div>
  );
}

export default CategoryHeader;
import React from "react";

function CategoryHeader({ categories, onCategoryClick }) {
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
              alt={item.name?.en}
              className="h-16 w-16 mx-auto mb-2"
            />
            <p className="text-sm font-semibold">{item.name?.en}</p>
          </div>
        ))
      ) : (
        <p className="font-bold text-center">No categories available</p>
      )}
    </div>
  );
}

export default CategoryHeader;
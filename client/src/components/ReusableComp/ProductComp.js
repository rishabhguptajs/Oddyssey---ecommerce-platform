import React from "react";

const ProductComp = ({name, price, img, description, rating, stock}) => {
  return (
    <div className="flex flex-col items-center justify-center m-2 border-[#ffd5dc] rounded-[20px] border-2 p-4 border-solid w-fit h-fit text-center">
      <img
        src= {img}
        className="w-[8em] h-[8em]"
      />
      <div className="flex flex-col justify-center mt-4 mb-3">
        <div className="font_styling">{name}</div>
        <div className="font_styling">{price}</div>
        <div className="font_styling">{description}</div>
        <div className="font_styling">{rating}</div>
      </div>

      <button className="bg-[#f5f5f5] border-[#f5f5f5] border-2 border-solid rounded-md p-2 mb-4 font_styling transition-all hover:translate-y-[-3px] hover:bg-[#e13453] hover:text-white hover:shad hover:shadow-lg">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductComp;

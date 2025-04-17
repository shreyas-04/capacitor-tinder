"use client";

import { Product } from "@/common/types";
import React from "react";
type Props = {
    product: Product;
    index: number;
}

const ProductCard = ({ product }: Props) => {
    return (
        <div className="relative h-full w-full text-center flex flex-col items-center w-1/4 rounded-lg text-black border-2 border-gray-300 pointer-events-none" >
            <img   src={product.imageUrl} alt={product.name} className=" object-cover border-2 border-gray-300 p-2 pb-0 h-4/5"  />
            <div className="p-4 flex flex-col justify-between flex-1  border-t border-gray-100 rounded-b-2xl">
                <h3 className="text-base font-semibold capitalize text-center text-gray-800 mb-2">
                {product.brand} - {product.name}
                </h3>

                {product.discountPercentage > 0 && (
                    <div className="absolute top-3 right-3 bg-emerald-700 text-white text-xs px-3 py-1 rounded-full shadow">
                    {product.discountPercentage}% OFF
                    </div>
                )}

                <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-gray-500 line-through">₹{product.originalPrice}</span>
                <span className="text-emerald-700 font-bold text-lg">₹{product.price}</span>
                </div>
            </div>
        </div>
    )
}

    export default React.memo(ProductCard);
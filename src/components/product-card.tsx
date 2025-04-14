"use client";

import { Product } from "@/common/types";
import Image from "next/image";

type Props = {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
    return (
        <div className="w-full h-full text-center flex flex-col items-center w-1/4 bg-gray-100 p-4 rounded-lg text-black border-2 border-gray-300 pointer-events-none" >
            <Image src={product.imageUrl} alt={product.name} width={200} height={200} />
            <h1>{product.name}</h1>
            <p>{product.brand}</p>
            <p>{product.price}</p>
            <p>{product.originalPrice}</p>
            <p>{product.discountPercentage}</p>
        </div>
    )
}

export default ProductCard;
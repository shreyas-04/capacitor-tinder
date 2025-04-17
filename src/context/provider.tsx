"use client";

import ProductContext from ".";
import { Product } from "@/common/types";
import data from "@/mock.json";
import { useState } from "react";

const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [products] = useState<Product[]>(data);

    return (
        <ProductContext.Provider value={products}>{children}</ProductContext.Provider>
    )
}

export default ProductProvider;
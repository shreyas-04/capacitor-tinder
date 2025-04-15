"use client";

import { createContext } from "react";
import { Product } from "@/common/types";

const ProductContext = createContext<Product[]>([]);


export default ProductContext;
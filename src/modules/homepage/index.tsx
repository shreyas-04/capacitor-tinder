
"use client";

import { useHomepage } from "./hook";
import dynamic from "next/dynamic";

const ProductCard = dynamic(() => import("@/components/product-card"), { ssr: false });
const Homepage = () => {    
    const {selectedProduct, nextProduct, onSelectedProductDragStart, onSelectedProductDragEnd, onSelectedProductDrag, traverse} = useHomepage();
    return (
        <div className="flex justify-center items-center h-[100vh] bg-gray-100">
            <div className="relative w-[30vw] h-[70vh]">
            <div draggable onDrag={onSelectedProductDrag} 
                onDragStart={onSelectedProductDragStart} 
                onDragEnd={onSelectedProductDragEnd} 
                style={{transform: `rotate(${traverse.rotation}deg) translateX(${traverse.x}px)`}}
                className={`absolute top-0 left-0 w-full h-full z-2 transition-transform duration-300`}>
                {selectedProduct && <ProductCard product={selectedProduct} />}
            </div>
            <div
                style={{transform: `scale(${traverse.scale})`}}
             className="absolute top-0 left-0 w-full h-full z-1">
                {nextProduct && <ProductCard product={nextProduct} />}
            </div>
            </div>
           
        </div>
    )
}

export default Homepage;
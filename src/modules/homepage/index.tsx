
"use client";

import { useHomepage } from "./hook";
import dynamic from "next/dynamic";
import LikedDislikedCount from "@/components/liked-disliked-count";
const ProductCard = dynamic(() => import("@/components/product-card"), { ssr: false });

const Homepage = () => {    
    const { onSelectedProductDragStart, onSelectedProductDragEnd, onSelectedProductDrag, traverse, productsState, likedProducts, dislikedProducts, nextCardScale} = useHomepage();
    return (
        <div>
            <LikedDislikedCount likedProducts={likedProducts} dislikedProducts={dislikedProducts} />

            <div className="flex justify-center items-center h-[100vh] bg-gray-100">
            
                <div className="relative w-[30vw] h-[70vh]">
                    {productsState.map((product, index) =>  {

                        let style = {};
                        const isFrontProduct = index === 0;

                        if(isFrontProduct) {
                            style = {
                                transform: `rotate(${traverse.rotation}deg) translateX(${traverse.x}px) translateY(${traverse.y}px)`,
                                opacity: traverse.opacity, 
                                transitionDuration: nextCardScale === 1 || traverse.scale === 0.7 || traverse.scale === 1 ? "0.5s" : "0.05s",
                                zIndex: 10,
                                scale: traverse.scale
                            }
                        } else if(index === 1) {
                            style = {zIndex: 5, scale: nextCardScale};
                        } else {
                            style = {zIndex: 2, opacity: 0.8, scale: "0.75"};
                        }

                        return (
                        <div 
                            key={product.id}
                            draggable={isFrontProduct} 
                            onDrag={isFrontProduct ? onSelectedProductDrag : undefined} 
                            onDragStart={isFrontProduct ? onSelectedProductDragStart : undefined} 
                            onDragEnd={isFrontProduct ? onSelectedProductDragEnd : undefined} 
                            style={style}
                            className={`absolute top-0 left-0 w-full h-full transition-all ease-in-out`}>
                            <ProductCard product={product} />
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>

    )
}

export default Homepage;
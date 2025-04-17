
"use client";

import { useHomepage } from "./hook";
import dynamic from "next/dynamic";
const ProductCard = dynamic(() => import("@/components/product-card"), { ssr: false });
const NoProducts = dynamic(() => import("@/components/no-products"), { ssr: false });

const Homepage = () => {    
    const { onSelectedProductDragStart, onSelectedProductDragEnd, onSelectedProductDrag, traverse, products, topProductIndex} = useHomepage();
    const isProductsAvailable = products.length !== topProductIndex;

    return (
        <div>

            <div className="flex justify-center items-center h-[100vh] bg-gray-100">
            {isProductsAvailable ?  
                <div className="relative h-[65vh]  sm:w-[45vw] md:w-[35vw] lg:w-[30vw] xl:w-[25vw] w-[80vw] " >

                    {products.map((product, index) =>  {

                        const {rotation = 0, x= 0,y = 0, scale = 0.4, opacity = 1} = traverse[index] || {};
                        const isFrontProduct = index === topProductIndex;

                        const style = {
                            transform: `rotate(${rotation}deg) translateX(${x}px) translateY(${y}px)`,
                            opacity: opacity, 
                            transitionDuration: "0.5s",
                            zIndex: products.length - index,
                            scale: scale ,
                            boxShadow: "inset 0 0 15px 0 #c7c7c7"
                        }

                        return (
                        <div 
                            key={product.id}
                            draggable={isFrontProduct} 
                            onDrag={isFrontProduct ? onSelectedProductDrag : undefined} 
                            onDragStart={isFrontProduct ? onSelectedProductDragStart : undefined} 
                            onDragEnd={isFrontProduct ? onSelectedProductDragEnd : undefined} 
                            className={`absolute top-0 left-0 w-full h-full bg-gray-100 rounded-lg transition-all ease-in-out`}
                            style={style}                  
                            >
                            <ProductCard product={product} index={index} />
                        </div>
                        )
                    })}
            </div> : <NoProducts />}
                </div>
        </div>

    )
}

export default Homepage;

import ProductContext from "@/common/context";
import { Product } from "@/common/types";
import { useContext, useRef, useState } from "react";

export const useHomepage = () => {
    const products = useContext(ProductContext);
    const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);
    const selectedProduct = products[selectedProductIndex];
    const nextProduct = selectedProductIndex < products.length - 1 ? products[selectedProductIndex + 1] : null;
    const [dragCoordinates, setDragCoordinates] = useState<{x: number, y: number}>({x: 0, y: 0});
    const [traverse, setTraverse] = useState<{rotation: number, x: number, scale: number}>({rotation: 0, x: 0, scale: .90});



    const onSelectedProductDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        const img = new Image();
        img.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjwvc3ZnPg=='; // 1x1 transparent SVG
        e.dataTransfer.setDragImage(img, 0, 0);

        setDragCoordinates({x: e.clientX, y: e.clientY});   
    }

    const onSelectedProductDrag = (e: React.DragEvent<HTMLDivElement>) => {
        const {x, y} = dragCoordinates;
        const xTraverse = e.clientX - x;
        const diff = Math.floor(xTraverse/50);
        if(Math.abs(xTraverse) < 250) {
            setTraverse({rotation: diff, x: xTraverse, scale: Math.min(1, .90 + xTraverse/2000)});
        }
    }

    const onSelectedProductDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        const diff = Math.abs(e.clientX - dragCoordinates.x);
        if (diff > 100) {
            setSelectedProductIndex(selectedProductIndex + 1);
        }
        setTraverse({rotation: 0, x: 0, scale: .90});
    }

 
    return {products, selectedProduct, nextProduct, onSelectedProductDragEnd, onSelectedProductDragStart, onSelectedProductDrag, traverse};
}

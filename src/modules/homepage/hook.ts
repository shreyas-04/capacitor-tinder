import { TraverseState } from "@/common/types";
import ProductContext from "@/context";
import { useContext, useState } from "react";
import { DEFAULT_ZOOM_ROTATION, DEFAULT_ZOOM_SCALE, DEFAULT_ZOOM_OPACITY, MAX_TRANSLATE_X, MAX_ROTATION, X_TRAVERSE_LIMIT,  Y_TRAVERSE_LIMIT } from "@/common/constant";


export const useHomepage = () => {
    const products = useContext(ProductContext);
    const [dragCoordinates, setDragCoordinates] = useState<{x: number, y: number}>({x: 0, y: 0});
    const [traverse, setTraverse] = useState<Record<number, TraverseState>>({0: {scale: 1}});
    const [topProductIndex, setTopProductIndex] = useState(0);


    const onSelectedProductDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        const img = new Image();
        img.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjwvc3ZnPg=='; // 1x1 transparent SVG
        e.dataTransfer.setDragImage(img, 0, 0);

        setDragCoordinates({x: e.clientX, y: e.clientY});   
    }

    const onSelectedProductDrag = (e: React.DragEvent<HTMLDivElement>) => {
        const {x,y} = dragCoordinates;

        if(e.clientX === 0 || e.clientY === 0) return;

        const xTraversed = e.clientX - x;
        const yTraversed = e.clientY - y;
        const rotate =  Math.floor(xTraversed/50);

        const absXTraversed = Math.abs(xTraversed);

        const isMinXTraversed = absXTraversed > 20;
        const isMinYTraversed = yTraversed < -30;


        const isUnderXLimit = absXTraversed < MAX_TRANSLATE_X;

        if(isUnderXLimit && isMinXTraversed) {
            const scaleNextItemBy = Math.min(1, DEFAULT_ZOOM_SCALE + Math.abs(xTraversed)/1200);
            const newState = {
                ...traverse,
                [topProductIndex]: {rotation: rotate, x: xTraversed, y: 0, opacity: 1, scale: 1},
                [topProductIndex + 1]: {scale: scaleNextItemBy}
            }
            setTraverse(newState)
        } 
        
        else if(isMinYTraversed) {
            const scaleNextItemBy = Math.min(0.85, 0.75 - yTraversed/500);
            const scaleMainCardBy = Math.max(0.75, 1 + yTraversed/550);

            const newState = {
                ...traverse,
                [topProductIndex]: {rotation: 0, x: 0, y: yTraversed, opacity: 1, scale: scaleMainCardBy},
                [topProductIndex + 1]: {scale: scaleNextItemBy}
            }
            setTraverse(newState);
        }
    }

    const onSelectedProductDragEnd = (e: React.DragEvent<HTMLDivElement>) => {

        const yTraversed = e.clientY - dragCoordinates.y;

        const isXTraverseLimitExceeded = Math.abs(e.clientX - dragCoordinates.x) > X_TRAVERSE_LIMIT;
        const isYTraverseLimitExceeded = yTraversed < -Y_TRAVERSE_LIMIT;

        
        const isLiked = (traverse[topProductIndex].rotation || 0) > 0;
        const currentProduct = products[topProductIndex];
        
        const hasCardMovedHorizontally = traverse[topProductIndex].x !== 0;

        if (hasCardMovedHorizontally && isXTraverseLimitExceeded) {
            if(isLiked) {
                console.log(`Liked Product ID: ${currentProduct.id}`);
            } else {
                console.log(`Passed Product ID: ${currentProduct.id}`);
            } 
            handleFadeOutAnimation(isLiked);
        } else {
            const newState = {
                ...traverse,
                [topProductIndex]: { rotation: DEFAULT_ZOOM_ROTATION, x: 0, y: 0, opacity: DEFAULT_ZOOM_OPACITY, scale: 1 },
            }
            setTraverse(newState); 
        }


        
        if(isYTraverseLimitExceeded) {
            handleFadeUpAnimation();
            console.log(`Add to cart Product ID: ${currentProduct.id}`);
        } else if(!hasCardMovedHorizontally) {
            const newState = {
                ...traverse,
                [topProductIndex]: { rotation: DEFAULT_ZOOM_ROTATION, x: 0, y: 0, opacity: DEFAULT_ZOOM_OPACITY, scale: 1 },
            }
            setTraverse(newState); 
        }

    }

    const handleFadeOutAnimation = (isLiked: boolean) => {
        const newState = {
            ...traverse,
            [topProductIndex]: {rotation: isLiked ? MAX_ROTATION : -MAX_ROTATION, x: isLiked ? MAX_TRANSLATE_X : -MAX_TRANSLATE_X, y: 0, opacity: 0, scale: 1},
            [topProductIndex+1]: {scale: 1}
        }

        setTraverse(newState);
        setTopProductIndex(prev => prev + 1);
    }

    const handleFadeUpAnimation = () => {
        const newState = {
            ...traverse,
            [topProductIndex]: {rotation: 0, x: 0, y: -500, opacity: 0, scale: 0.5},
            [topProductIndex + 1]: {scale: 1}
        }
        setTraverse(newState);
        setTopProductIndex(prev => prev + 1);

    }
 
    return {products, onSelectedProductDragEnd, onSelectedProductDragStart, onSelectedProductDrag, traverse, topProductIndex};
}

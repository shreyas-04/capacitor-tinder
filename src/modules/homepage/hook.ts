import { Product } from "@/common/types";
import ProductContext from "@/context";
import { useContext, useState } from "react";
import { DEFAULT_ZOOM_ROTATION, DEFAULT_ZOOM_SCALE, DEFAULT_ZOOM_OPACITY, MAX_TRANSLATE_X, MAX_ROTATION, X_TRAVERSE_LIMIT, MAX_TRANSLATE_Y, Y_TRAVERSE_LIMIT } from "@/common/constant";

type State = {
    rotation: number,
    x: number,
    y: number,
    opacity: number,
    scale: number
}


export const useHomepage = () => {
    const products = useContext(ProductContext);
    const [dragCoordinates, setDragCoordinates] = useState<{x: number, y: number}>({x: 0, y: 0});
    const [traverse, setTraverse] = useState<State>({rotation: DEFAULT_ZOOM_ROTATION, x: 0, y: 0, opacity: DEFAULT_ZOOM_OPACITY, scale: 1});
    const [productsState, setProductsState] = useState<Product[]>(products);
    const [nextCardScale, setNextCardScale] = useState<number>(DEFAULT_ZOOM_SCALE);

    const [likedProducts, setLikedProducts] = useState<Product[]>([]);
    const [dislikedProducts, setDislikedProducts] = useState<Product[]>([]);

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
            setTraverse({rotation: rotate, x: xTraversed, y: 0, opacity: 1, scale: 1});
            setNextCardScale(scaleNextItemBy);
        } 
        
        else if(isMinYTraversed) {
            const scaleNextItemBy = Math.min(0.85, 0.75 - yTraversed/500);
            const scaleMainCardBy = Math.max(0.75, 1 + yTraversed/550);
            setTraverse({rotation: 0, x: 0, y: yTraversed, opacity: 1, scale: scaleMainCardBy});
            setNextCardScale(scaleNextItemBy);
        }
    }

    const onSelectedProductDragEnd = (e: React.DragEvent<HTMLDivElement>) => {

        const yTraversed = e.clientY - dragCoordinates.y;

        const isXTraverseLimitExceeded = Math.abs(e.clientX - dragCoordinates.x) > X_TRAVERSE_LIMIT;
        const isYTraverseLimitExceeded = yTraversed < -Y_TRAVERSE_LIMIT;

        
        const isLiked = traverse.rotation > 0;
        const currentProduct = productsState[0];
        
        const hasCardMovedHorizontally = traverse.x !== 0;


        if (hasCardMovedHorizontally && isXTraverseLimitExceeded) {
            if(isLiked) {
                setLikedProducts(prev => [...prev, currentProduct]);
            } else {
                setDislikedProducts(prev => [...prev, currentProduct]);
            }
            handleFadeOutAnimation(isLiked);
            resetHorizontalAnimation();
        } else {
            setTraverse({ rotation: DEFAULT_ZOOM_ROTATION, x: 0, y: 0, opacity: DEFAULT_ZOOM_OPACITY, scale: 1 }); 
        }


        
        if(isYTraverseLimitExceeded) {
            handleFadeUpAnimation();
            resetVerticalAnimation();
        } else if(!hasCardMovedHorizontally) {
            setTraverse({ rotation: DEFAULT_ZOOM_ROTATION, x: 0, y: 0, opacity: DEFAULT_ZOOM_OPACITY, scale: 1 }); 
        }

    }

    const resetHorizontalAnimation = () => {
        setTraverse(prev => { return {...prev, opacity: 0, scale: 1 } });

        setTimeout(() => {
            setProductsState(prev => prev.slice(1));
            setTraverse({ rotation: DEFAULT_ZOOM_ROTATION, x: 0, y: 0, opacity: DEFAULT_ZOOM_OPACITY, scale: 1 });
            setNextCardScale(DEFAULT_ZOOM_SCALE);
        }, 400);
    }

    const resetVerticalAnimation = () => {
        setTimeout(() => {
            setProductsState(prev => prev.slice(1));
            setTraverse({ rotation: DEFAULT_ZOOM_ROTATION, x: 0, y: 0, opacity: DEFAULT_ZOOM_OPACITY, scale: 1 });
        }, 400);
    }

    const handleFadeOutAnimation = (isLiked: boolean) => {
        console.log("abcd", isLiked);
        setTraverse({rotation: isLiked ? MAX_ROTATION : -MAX_ROTATION, x: isLiked ? MAX_TRANSLATE_X : -MAX_TRANSLATE_X, y: 0, opacity: 0, scale: 1});
        setNextCardScale(1);
    }

    const handleFadeUpAnimation = () => {
        setTraverse({rotation: 0, x: 0, y: -500, opacity: 0, scale: 0.7});
    }
 
    return {productsState, onSelectedProductDragEnd, onSelectedProductDragStart, onSelectedProductDrag, traverse, likedProducts, dislikedProducts, nextCardScale};
}

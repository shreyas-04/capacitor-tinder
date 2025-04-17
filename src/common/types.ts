export type Product = {
    id: number;
    name: string;
    brand: string;
    price: number;
    originalPrice: number;
    discountPercentage: number;
    imageUrl: string;
}

export type TraverseState = {
    rotation?: number;
    x?: number;
    y?: number;
    opacity?: number;
    scale?: number;
}
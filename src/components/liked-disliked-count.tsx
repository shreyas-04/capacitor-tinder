import { Product } from "@/common/types"

const LikedDislikedCount = ({likedProducts, dislikedProducts}: {likedProducts: Product[], dislikedProducts: Product[]   }) => {
    return (
        <div className="flex flex-col items-center justify-center text-black bg-white">
               <h1> 
                Liked: {likedProducts.length}
               </h1>
               <h1> 
                Disliked: {dislikedProducts.length}
               </h1>
            </div>
    )
}

export default LikedDislikedCount;
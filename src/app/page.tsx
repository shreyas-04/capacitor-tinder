import Homepage from "@/modules/homepage";
import ProductProvider from "@/common/context/provider";

export default function Home() {
  return (
    <ProductProvider>
      <div>
        <h1>Welcome to Tinder for Clothes</h1>
        <Homepage />
      </div>
    </ProductProvider>
  );
}

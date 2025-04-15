import ProductProvider from "@/context/provider";
import Homepage from "@/modules/homepage";

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

import ProductItem from "./ProductItem";
 export default function ProductList({products, moveToCart}){
     return (
     <div className="product-list">
      {products.map((item) => (
        <ProductItem key={item.id} product={item} moveToCart={moveToCart} />
      ))}
    </div>
  );
}
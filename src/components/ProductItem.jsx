export default function Productitem ({product, moveToCart}){
     return (
         <div classNmae="product-card">
            <img src={product.photo} className="product-image"/>
            <p className="product-title">{product.title}</p>
            <strong className="product-price">{product.price} USD </strong>
            <button className="move-btn" onClick={() => moveToCart(product)}>Move</button>

         </div>
     )
}
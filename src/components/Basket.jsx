import BasketItem from "./BasketItem"
 export default function Basket({
    basket,
  increaseQuantity,
  decreaseQuantity,
  removeFromBasket
 }){

    return(
        <div>
            <h3> Basket</h3>

            <table>
                <thead>
                    <tr>
                       <th>product</th>
            <th>price</th>
            <th>quantity</th>
            <th>subtotal</th>
            <th>actions</th> 
                    </tr>
                </thead>
                <tbody>
                  {basket.map(item => (
            <BasketItem
              key={item.id}
              item={item}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromBasket={removeFromBasket}
            />
          ))}  
                </tbody>
            </table>
        </div>
    )

 }
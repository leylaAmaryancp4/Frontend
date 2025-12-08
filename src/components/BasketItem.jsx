export default function BasketItem({
    item,
    increaseQuantity,
    decreaseQuantity,
    removeFromBasket
}){

    return (
        <tr>
           <td>{item.title}</td>
      <td>${item.price}</td>
      <td>{item.quantity}</td>
      <td>${(item.price * item.quantity).toFixed(2)}</td>

      <td>
        <button onClick={() => increaseQuantity(item.id)}>+</button>
        <button onClick={() => decreaseQuantity(item.id)}>-</button>
        <button onClick={() => removeFromBasket(item.id)}>x</button>
      </td> 
        </tr>
    )
}
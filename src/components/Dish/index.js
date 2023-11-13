const Dish = ({dish, onIncrement, onDecrement, quantity, cart}) => (
  <div>
    <h3>{dish.dish_name}</h3>
    <p>
      {dish.dish_currency} {dish.dish_price}
    </p>
    <p>{dish.dish_description}</p>
    <p>{dish.dish_calories} calories</p>
    {dish.addonCat && <p>Customizations available</p>}
    {dish.dish_Availability === false && <p>Not available</p>}
    <img src={dish.dish_image} alt="Dish" />
    <p>Quantity: {quantity}</p>
    <button type="button" onClick={() => onIncrement(dish.dish_id)}>
      +
    </button>
    <span>{cart[dish.dish_id] || 0}</span>
    <button type="button" onClick={() => onDecrement(dish.dish_id)}>
      -
    </button>
  </div>
)

export default Dish

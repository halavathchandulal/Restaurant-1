import {useEffect, useState} from 'react'
import CategoryMenu from '../CategoryMenu'
import Dish from '../Dish' // Import Dish component

const UniRestoCafe = () => {
  const [restaurantInfo, setRestaurantInfo] = useState({})
  const [menuData, setMenuData] = useState([])
  const [activeCategory, setActiveCategory] = useState('')
  const [cart, setCart] = useState({})

  const incrementDishQuantity = dishId => {
    setCart(prevCart => ({
      ...prevCart,
      [dishId]: (prevCart[dishId] || 0) + 1,
    }))
  }

  const decrementDishQuantity = dishId => {
    setCart(prevCart => {
      const updatedCart = {...prevCart}
      if (updatedCart[dishId] > 0) {
        updatedCart[dishId] -= 1
      }
      return updatedCart
    })
  }

  useEffect(() => {
    const dishesApiUrl =
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    // Fetch menu data from the API when the page is opened
    fetch(dishesApiUrl)
      .then(response => response.json())
      .then(data => {
        setRestaurantInfo({
          restaurantId: data.restaurant_id,
          restaurantName: data.restaurant_name,
          restaurantImage: data.restaurant_image,
          tableId: data.table_id,
          tableName: data.table_name,
          branchName: data.branch_name,
        })
        setMenuData(data.table_menu_list || [])
        setActiveCategory(
          data.table_menu_list && data.table_menu_list.length > 0
            ? data.table_menu_list[0].menu_category
            : '',
        )
      })
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  const handleCategoryChange = category => {
    setActiveCategory(category)
  }

  const getTotalDishQuantity = () =>
    Object.values(cart).reduce((total, quantity) => total + quantity, 0)

  return (
    <div>
      <h1>
        {restaurantInfo.restaurantName || 'UNI Resto Cafe'}{' '}
        {/* Updated heading text content */}
      </h1>
      <header>
        <h2>My Orders</h2>
        <p>Total Dish Quantity: {getTotalDishQuantity()}</p>
      </header>
      <CategoryMenu
        menuData={menuData}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Display buttons for menu categories dynamically */}
      <div>
        {menuData.map(category => (
          <button
            key={category.menu_category}
            type="button"
            onClick={() => handleCategoryChange(category.menu_category)}
            className={
              activeCategory === category.menu_category ? 'active' : ''
            }
          >
            {category.menu_category}
          </button>
        ))}
      </div>

      {/* Display dish details for the active category */}
      {menuData.map(category => {
        if (category.menu_category === activeCategory) {
          return (
            <div key={category.menu_category}>
              {category.category_dishes.map(dish => (
                <Dish
                  key={dish.dish_id}
                  dish={dish}
                  onIncrement={incrementDishQuantity}
                  onDecrement={decrementDishQuantity}
                  quantity={cart[dish.dish_id] || 0}
                />
              ))}
            </div>
          )
        }
        return null
      })}

      <div>
        {menuData.map(category => (
          <div key={category.menu_category}>
            <h2>{category.menu_category}</h2>
          </div>
        ))}
      </div>

      {/* Display restaurant image */}
      <img src={restaurantInfo.restaurantImage} alt="Restaurant" />
    </div>
  )
}

export default UniRestoCafe

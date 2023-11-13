// CategoryMenu.js

const CategoryMenu = ({menuData, activeCategory, onCategoryChange}) => (
  <div>
    {menuData.map(category => (
      <button
        type="button"
        onClick={() => onCategoryChange(category.menu_category)}
        className={activeCategory === category.menu_category ? 'active' : ''}
      >
        {category.menu_category}
      </button>
    ))}
  </div>
)

export default CategoryMenu

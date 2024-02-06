import { useContext } from "react";
import Product from "./Product";
import StorePagination from "./StorePagination";
import { StoreContext } from "../../store/StoreContext";

export default function Store() {
  const { productList, filtered, changeFilter, totalPageCount } = useContext(StoreContext)

  return (
    <section className="shop">
      <div className="header">
        <h1>AI Shop</h1>
        <div>
          <span className={filtered === 0 ? 'selected' : null} onClick={() => changeFilter(0)}>All Products</span>
          <span className={filtered === 1 ? 'selected' : null} onClick={() => changeFilter(1)}>Favorites</span>
        </div>
      </div>
      <ul className="products">
        {productList.length > 0 ? productList.map((product, index) => (
          <Product key={product.productId} {...product} />
        )) : <h1 className="title">No Results</h1>}
      </ul>
      {totalPageCount > 1 && <StorePagination />}
    </section>
  )
}
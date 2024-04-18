import { useContext } from "react";
import Product from "./Product";
import StorePagination from "./StorePagination";
import { StoreContext } from "../../store/StoreContext";
import LoadingRing from "../UI/LoadingRing";

export default function Store() {
  const { productList, filtered, changeFilter, totalPageCount, favoritesList, loading } = useContext(StoreContext)

  return (
    <section className="shop">
      {loading ? <h1 className="title"><LoadingRing /></h1> : <><div className="header">
        <h1>AI Shop</h1>
        <div>
          <p className={filtered === 0 ? 'selected' : null}>
            <span onClick={() => changeFilter(0)}>All Products</span>
          </p>
          <p className={filtered === 1 ? 'selected' : null} >
            <span onClick={() => changeFilter(1)}>Favorites</span>
          </p>
        </div>
      </div>
        <ul className="products">
          {productList.length > 0 ? productList.map((product, index) => {
            const faved = favoritesList.includes(product.productId) ? true : false
            return (
              <Product key={product.productId} {...product} faved={faved} />
            )
          }) : <h1 className="title">No Results</h1>}
        </ul>
        {totalPageCount > 1 && <StorePagination />}</>}
    </section>
  )
}
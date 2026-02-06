import { useContext } from "react";
import Product from "./Product";
import StorePagination from "./StorePagination";
import { StoreContext } from "../../store/StoreContext";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Store() {
  const { productList, filtered, changeFilter, totalPageCount, favoritesList, loading } = useContext(StoreContext)
  const placeholder = Array(10).fill(0)
  let context
  if (productList.length > 0) {
    context = productList.map((product, index) => {
      const faved = favoritesList.includes(product.productId)
      return (
        <Product key={product.productId} {...product} faved={faved} />
      )
    })
  } else {
    context = <h1 className="title">No Results</h1>
  }

  return (
    <section className="shop">
      {<><div className="header">
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
          {loading ? placeholder.map((element, index) => {
            return (
              <Skeleton height={445} />
            )
          }) : context}
        </ul>
        {totalPageCount > 1 && <StorePagination />}</>}
    </section>
  )
}
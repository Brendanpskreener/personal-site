import { useContext } from "react";
import Product from "./Product";
import StorePagination from "./StorePagination";
import { StoreContext } from "../../store/StoreContext";
import LoginModal from "../UI/LoginModal";

export default function Store() {
  const { productList, filtered, changeFilter, totalPageCount, favoritesList, userLoggedIn, toggleModal } = useContext(StoreContext)

  function checkLoggedIn() {
    if (userLoggedIn) {
      changeFilter(1)
    } else {
      toggleModal(true)
    }
  }

  return (
    <section className="shop">
      <LoginModal />
      <div className="header">
        <h1>AI Shop</h1>
        <div>
          <span className={filtered === 0 ? 'selected' : null} onClick={() => changeFilter(0)}>All Products</span>
          <span className={filtered === 1 ? 'selected' : null} onClick={checkLoggedIn}>Favorites</span>
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
      {totalPageCount > 1 && <StorePagination />}
    </section>
  )
}
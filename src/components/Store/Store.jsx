import { useEffect, useState } from "react";
import Product from "./Product";
import findProducts from "../../interfaces/FindProducts";

export default function Store() {
  const [productList, setProductList] = useState([])

  async function getStore() {
    try {
      const store = await findProducts()
      setProductList(store.results)
    } catch (error) {
      console.warn(error)
    }
  }

  useEffect(() => {
    getStore()
  }, [])

  return (
    <section className="shop">
      <h1 className="title">AI Shop</h1>
      <ul className="products">
        {productList.map((product, index) => (
          <div key={product.productId}>
            <Product {...product} />
          </div>
        ))}
      </ul>
    </section>
  )
}
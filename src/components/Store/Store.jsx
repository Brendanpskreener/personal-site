import { useEffect, useState } from "react";
import Product from "./Product";
import findProducts from "../../interfaces/FindProducts";
import StorePagination from "./StorePagination";

export default function Store() {
  const [productList, setProductList] = useState([])
  const [pagination, setPagination] = useState({ from: 0, size: 1, total: 0 })
  const [currentPageNumber, setCurrentPageNumber] = useState(1)
  const [userPageSize, setUserPageSize] = useState(5)


  async function getStore() {
    try {
      const { results, pagination } = await findProducts({ from: (currentPageNumber - 1) * userPageSize, size: userPageSize })
      setProductList(results)
      setPagination(pagination)
    } catch (error) {
      console.warn(error)
    }
  }

  function onPageChange(page) {
    setCurrentPageNumber(page)
  }

  useEffect(() => {
    getStore()
  }, [currentPageNumber, userPageSize])

  const totalPageCount = Math.ceil(pagination.total / pagination.size)

  return (
    <section className="shop">
      <h1 className="title">AI Shop</h1>
      <ul className="products">
        {productList.map((product, index) => (
          <Product key={product.productId} {...product} />
        ))}
      </ul>
      {totalPageCount > 1 && <StorePagination totalPageCount={totalPageCount} onPageChange={onPageChange} currentPage={currentPageNumber} />}
    </section>
  )
}
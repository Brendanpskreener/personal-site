import Product from "./Product";

export default function Store() {
  const productList = []

  return (
    <div className="title">
      <h1>
        AI Shop
      </h1>
      {productList.length > 0 ? productList.map((product, index) => (
        <div key={product.productId}>
          <Product {...product} />
        </div>
      )) : <div>Found no Products </div>}
    </div>
  )
}
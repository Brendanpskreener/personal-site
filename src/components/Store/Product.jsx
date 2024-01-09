export default function Product({
  name,
  description,
  msrp,
  img,
  productId,
  slogan
}) {
  return (
    <article className="product">
      <img src={img} alt={slogan} />
      <div className="product-content">
        <div>
          <h3>{name}</h3>
          <p className="product-price">${msrp}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          <button>Add to Faves</button>
        </p>
      </div>
    </article>
  )
}
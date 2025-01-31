import { useContext, useState } from "react"
import { BlurhashCanvas } from "react-blurhash";
import setUserFavorite from "../../interfaces/setUserFavorite";
import deleteUserFavorite from "../../interfaces/deleteUserFavorite";
import { StoreContext } from "../../store/StoreContext";

export default function Product({
  name,
  blurHash,
  msrp,
  productId,
  slogan,
  faved
}) {
  const { userId, getFavorites } = useContext(StoreContext)
  const [imageLoaded, setImageLoaded] = useState(false)

  async function toggleFavorite() {
    if (faved) {
      await deleteUserFavorite({ userId, productId })
      await getFavorites()
    } else {
      await setUserFavorite({ userId, productId })
      await getFavorites()
    }
  }

  const formatPrice = (msrp) => [`${msrp}`.slice(0, -2), `${msrp}`.slice(-2)];
  return (
    <article className="product" style={{ position: 'relative' }}>
      <BlurhashCanvas
        hash={blurHash}
        width='330'
        height='330'
        style={{
          transition: 'opacity 0.5s ease',
          opacity: imageLoaded ? 0 : 1
        }} />
      <img
        src={`https://xkw4oz08el.execute-api.us-west-2.amazonaws.com/product/${productId}/image`}
        alt={slogan}
        onLoad={() => setImageLoaded(true)}
        loading="lazy"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transition: 'opacity 0.5s ease',
          opacity: imageLoaded ? 1 : 0
        }} />
      <div className="product-content">
        <h3>{name}</h3>
        <span className="product-price">
          <span className="product-symbol">$</span>
          <span className="product-dollars">{formatPrice(msrp)[0]}</span>
          <span className="product-cents">{formatPrice(msrp)[1]}</span>
        </span>
      </div>
      <p className="product-actions">
        <button onClick={toggleFavorite}>{faved ? 'Unfavorite' : 'Add to faves'}</button>
      </p>
    </article>
  )
}
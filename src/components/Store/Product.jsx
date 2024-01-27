import { useEffect, useState } from "react"
import findImage from '../../interfaces/FindImage'

export default function Product({
  name,
  description,
  msrp,
  productId,
  slogan
}) {
  const [image, setImage] = useState([])

  async function getImage() {
    try {
      const image = await findImage(productId)
      const uintBuf = new Uint8Array(image);
      const uintStrBuf = uintBuf.reduce((acc, bytes) => (`${acc}${String.fromCharCode(bytes)}`), '');
      const base64String = btoa(uintStrBuf);
      setImage(base64String)
    } catch (error) {
      console.warn(error)
    }
  }

  useEffect(() => {
    getImage()
  }, [])


  const formatPrice = (msrp) => [`${msrp}`.slice(0, -2), `${msrp}`.slice(-2)];

  return (
    <article className="product">
      <img src={`data:image/png;base64, ${image}`} alt={slogan} />
      <div className="product-content">
        <h3>{name}</h3>
        <span className="product-price">
          <span className="product-symbol">$</span>
          <span className="product-dollars">{formatPrice(msrp)[0]}</span>
          <span className="product-cents">{formatPrice(msrp)[1]}</span>
        </span>
      </div>
      <p className="product-actions">
        <button>Add to faves</button>
      </p>
    </article>
  )
}
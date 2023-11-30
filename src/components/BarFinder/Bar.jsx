import classes from './Bar.module.css'

export default function Bar(props) {
  const { name, street, city, state, zipcode, phone, site } = props
  const directionsUrl = ['https://www.google.com/maps/place/', street, city, state, zipcode]
  let formattedPhone
  if (phone) {
    formattedPhone = phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
  }

  return (
    <div className={classes['bar']}>
      <h2>{name}</h2>
      <h3><a href={directionsUrl} target='_blank'>Directions</a></h3>
      {site && <h3><a target="_blank" href={site}>Website</a></h3>}
      {phone && <h3>{formattedPhone}</h3>}
    </div>
  )
}
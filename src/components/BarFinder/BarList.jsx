import classes from './BarList.module.css'
import Bar from "./Bar";

export default function BarList({ bars }) {
  return (
    <div className={classes['bar-list']}>
      {bars.map((bar) => (
        <Bar
          key={bar.id}
          name={bar.name}
          street={bar.street}
          city={bar.city}
          state={bar.state}
          zipcode={bar.postal_code}
          phone={bar.phone}
          site={bar.website_url}
        />
      ))}
    </div>
  )
}
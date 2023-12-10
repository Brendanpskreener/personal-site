import classes from './BarList.module.css'
import Bar from "./Bar";
import { useContext } from 'react';
import { BarFinderContext } from '../../store/BarFinderContext';

export default function BarList() {
  const { barlist } = useContext(BarFinderContext)

  return (
    <div className={classes['bar-list']}>
      {barlist.length > 0 ? barlist.map((bar, index) => (
        <Bar
          key={bar.id}
          name={bar.name}
          phone={bar.phone}
          site={bar.website_url}
          index={index}
        />
      )) : <div className={classes.zilch}>Found no Bars</div>}
    </div>
  )
}
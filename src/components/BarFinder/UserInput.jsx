import { useEffect, useState, useContext } from "react"
import classes from './UserInput.module.css'
import { BarFinderContext } from "../../store/BarFinderContext"
import { motion } from "framer-motion"

export default function UserInput() {
  const { handleSearch, locationUnavailable, currentPage } = useContext(BarFinderContext)
  const defaultState = { name: '', zipcode: '', page: 1, locationToggle: !locationUnavailable }
  const [formData, setFormData] = useState(defaultState)
  const [timer, setTimer] = useState(null)
  const [formIsValid, setFormIsValid] = useState(false)
  //the timer must expire to set formIsValid to true, which will trigger handleSearch
  function autoSearch() {
    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      setFormIsValid(true)
    }, 300)
    setTimer(newTimer)
  }

  function handleNameChange(event) {
    const { value } = event.target
    setFormData(prevFormData => ({ ...prevFormData, name: value }))
    if (formData.zipcode.length === 5 || formData.zipcode.length === 0) {
      autoSearch()
    }
  }

  function handleZipChange(event) {
    const { value } = event.target
    const validatedZip = value.replace(/[^\d{5}]$/, "").substr(0, 5)
    setFormData(prevFormData => ({ ...prevFormData, zipcode: validatedZip }))
    if (value.length === 5 || value.length === 0) {
      autoSearch()
    }
  }

  function handleLocationToggleChange(event) {
    const { checked } = event.target
    setFormData(prevFormData => ({ ...prevFormData, locationToggle: checked, zipcode: '' }))
    autoSearch()
  }

  useEffect(() => {
    if (formIsValid) {
      handleSearch({ ...formData, page: 1 }, 'reset')
      setFormIsValid(false)
    }
  }, [formIsValid])

  useEffect(() => {
    handleSearch({ ...formData, page: currentPage })
  }, [currentPage])

  return (
    <motion.div className={classes['user-input']} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
      <div>Filters</div>
      <form>
        <input type="search" placeholder="Bar Name" name="name" value={formData.name} onChange={handleNameChange} />
        <input type="search" placeholder={formData.locationToggle ? "Disabled" : "Zip Code"} name="zipcode" value={formData.zipcode} onChange={handleZipChange} disabled={formData.locationToggle} />
        <label>
          <input type="checkbox" name="locationToggle" checked={formData.locationToggle} onChange={handleLocationToggleChange} disabled={locationUnavailable} />
          {locationUnavailable ? 'User Denied Location' : 'Use Location'}
        </label>
      </form>
    </motion.div>
  )
}
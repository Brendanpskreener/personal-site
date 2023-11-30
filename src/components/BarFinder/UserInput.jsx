import { useEffect, useState } from "react"
import classes from './UserInput.module.css'

export default function UserInput(props) {
  const { defaultState, findBars, locationUnavailable, currentPage, setCurrentPage } = props

  const [formData, setFormData] = useState(defaultState)
  const [timer, setTimer] = useState(null)
  const [formIsValid, setFormIsValid] = useState(false)

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
      findBars(formData)
      setFormIsValid(false)
      setCurrentPage(1)
    }
  }, [formIsValid])

  useEffect(() => {
    findBars({ ...formData, page: currentPage })
  }, [currentPage])

  return (
    <div className={classes['user-input']}>
      <div>Filters</div>
      <form>
        <input type="search" placeholder="Bar Name" name="name" value={formData.name} onChange={handleNameChange} />
        <input type="search" placeholder={formData.locationToggle ? "Disabled" : "Zip Code"} name="zipcode" value={formData.zipcode} onChange={handleZipChange} disabled={formData.locationToggle} />
        <label>
          <input type="checkbox" name="locationToggle" checked={formData.locationToggle} onChange={handleLocationToggleChange} disabled={locationUnavailable} />
          {locationUnavailable ? 'User Denied Location' : 'Use Location'}
        </label>
      </form>
    </div>

  )
}
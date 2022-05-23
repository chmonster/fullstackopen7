import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
    
  const url = `https://restcountries.com/v3.1/name/${name}?fullText=true`
  console.log(url)

  const hook = () => {
    const getCountry = () => {
      axios.get(url)
      .then(response => { 
        //console.log('getCountry', response)
        if(response.data) {
          setCountry(response.data[0])
        } else {
          setCountry(null)
        }
      })
    }
    getCountry()
  }

  useEffect(hook, [url])
 
  return country
}

import axios from 'axios'

const apiKey = import.meta.env.VITE_WEATHER_API_KEY
const baseCoordinatesUrl = 'http://api.openweathermap.org/geo/1.0'
const baseWeatherUrl = 'https://api.openweathermap.org/data/2.5'

const getCoordinates = (capital) => {
	const name = capital.charAt(0).toUpperCase() + capital.slice(1).toLowerCase()
  const request = axios.get(`${baseCoordinatesUrl}/direct?q=${name}&appid=${apiKey}`)
  return request.then(response => response.data)
}

const getWeather = (lat, lon) => {
  const request = axios.get(`${baseWeatherUrl}/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`)
  return request.then(response => response.data)
}

export default { getCoordinates, getWeather }
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [location, setLocation] = useState("")
  const [weather, setWeather] = useState("")

const getWeather = async() => {
  const api_key = 'c2a39762b03a45b397f51031230407'
  const api_url = 'https://api.weatherapi.com/v1/current.json?key=' + api_key + '&q=' + location

  if(location){
    try{
      const res = await fetch(api_url).then(data => data.json())

      if(res){
        console.log(res)
        const img = res.current.condition.icon
        const imgURL = "https:"+img

        console.log(imgURL)
        const api_data = {
          country: res.location.country,
          city: res.location.name,
          temp: res.current.temp_c,
          humidity: res.current.humidity,
          wind: res.current.wind_mph,
          gust: res.current.gust_mph,
          visibility:res.current.vis_miles,
          condition: res.current.condition.text,
          img: imgURL
        }
        // setWeather(api_data)
        setWeather(<>
          <div className="text-center text-2xl p-2">{api_data.city}</div>
          <div className="flex justify-center">
            <div className="flow-root">
              <div className="float-left"><Image src={api_data.img} width="80" height="80" alt="Condition" /></div>
              <div className="float-left text-6xl degrees">{api_data.temp}</div>
            </div>
          </div>
          <div className="text-center text-gray-600">{api_data.condition}</div>
          <div className="flow-root p-2">
            <div className="float-left text-gray-600">Humidity: {api_data.humidity} %</div>
            <div className="float-right text-gray-600">Wind: {api_data.wind} <span className="">mph</span></div>
            <div className="float-left text-gray-600">Visibility: {api_data.visibility} mi</div>
            <div className="float-right text-gray-600">Gust: {api_data.gust} mph</div>
          </div>
        </>)
      }
    }catch(err){
      console.log(err)
    }
  }
}
  


  return (
    <div className='h-screen w-screen'>
      <input
      type='text'
      id='location'
      value={location}
      onChange={e => setLocation(e.target.value)}
      placeholder='Location (ie. Istanbul)'
      />

      <button onClick={getWeather}>
        GO
      </button>

      <div>
        {weather}
      </div>
    </div>
  )
}

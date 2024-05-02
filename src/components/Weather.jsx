import React from 'react'
import { FaSearch } from "react-icons/fa";
import { WiCloud, WiCloudy, WiDayCloudy, WiDaySunny, WiFog, WiHumidity, WiNightClear, WiRain, WiShowers, WiSnowflakeCold, WiStrongWind, WiThunderstorm } from "react-icons/wi";
import { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('')
  // const [data, setData] = useState('')
  const [wicon, setWicon] = useState(<WiDayCloudy className='size-40'/>)

  const searchWeather = async () => {
    let api_key = "501e7053fe69ee727c95053e100836ac"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
    const response = await fetch(url)
    const result = await response.json()
    // setData(result)
    document.querySelector('.temp').innerHTML = result.main.temp.toFixed(1) +"°c"
    document.querySelector('.name').innerHTML = result.name +", "+ result.sys.country
    document.querySelector('.description').innerHTML = result.weather[0].description
    document.querySelector('.humidity').innerHTML = result.main.humidity +"%"
    document.querySelector('.wind').innerHTML = result.wind.speed + "Km/h"

    if(result.weather[0].icon==="01d"){
      setWicon(<WiDaySunny className='size-40'/>)
    } else if(result.weather[0].icon==="01n"){
      setWicon(<WiNightClear className='size-40'/>)
    } else if(result.weather[0].description==="few clouds"){
      setWicon(<WiDayCloudy className='size-40'/>)
    } else if(result.weather[0].description==="scattered clouds"){
      setWicon(<WiCloud className='size-40'/>)
    } else if(result.weather[0].description==="broken clouds" || result.weather[0].description==="overcast clouds"){
      setWicon(<WiCloudy className='size-40'/>)
    } else if(result.weather[0].description==="shower rain"){
      setWicon(<WiShowers className='size-40'/>)
    } else if(result.weather[0].description==="rain"){
      setWicon(<WiRain className='size-40'/>)
    } else if(result.weather[0].description==="thunderstorm"){
      setWicon(<WiThunderstorm className='size-40'/>)
    } else if(result.weather[0].description==="snow"){
      setWicon(<WiSnowflakeCold className='size-40'/>)
    } else if(result.weather[0].description==="mist"){
      setWicon(<WiFog className='size-40'/>)
    }
  }

  return (
    <div className='relative h-screen'>
      <div className='container absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-[30%] mx-auto rounded-xl bg-gradient-to-br from-purple-700 to-cyan-500'>
        <div className='searchbar flex justify-center items-center gap-4 py-10' onChange={(e) => setCity(e.target.value)}>
          <input type='text' placeholder='Search for a city' className='flex p-2 pl-4 bg-slate-100 rounded-full outline-none text-lg w-[70%]' />
          <div className='flex p-3 bg-slate-100 rounded-full cursor-pointer text-lg' onClick={searchWeather}>
            <FaSearch />
          </div>
        </div>
        <div className='winfo flex-col justify-between'>
          <div className='main'>
            <div className='img flex justify-center text-white'>
              {/* <WiDayCloudy className='size-40 text-white' /> */}
              {wicon}
            </div>
            <h1 className='temp text-center text-6xl text-white -mt-6'>24°c</h1>
            <h2 className='name text-center text-4xl text-white pt-3'>Delhi</h2>
            <p className='description text-xl text-white text-center'>Cloudy</p>
          </div>
          <div className="other flex justify-between p-8">
            <div className="humidity_container flex justify-center gap-2">
              <div>
                <WiHumidity className='size-12 text-white' />
              </div>
              <div>
                <p className='humidity text-white'>49%</p>
                <p className='text-white'>Humidity</p>
              </div>
            </div>
            <div className="wind_container flex justify-center gap-2">
              <div>
                <WiStrongWind className='size-12 text-white' />
              </div>
              <div>
                <p className='wind text-white'>2Km/h</p>
                <p className='text-white'>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
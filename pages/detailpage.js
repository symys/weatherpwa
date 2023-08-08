import React from 'react'
import Image from "next/image";

function DetailPage({cityInfo}) {
  console.log("cityLocation burada: "+ JSON.stringify(cityInfo))
  return (
    <div>
      <div className="text-center text-2xl p-2">{cityInfo.city}</div>
             <div className="flex justify-center">
                <div className="flow-root">
                 <div className="float-left">
                    <Image
                      src={cityInfo.img}
                      width="80"
                      height="80"
                      alt="Condition"
                    />
                  </div>
                  <div className="float-left text-6xl degrees">
                    {cityInfo.temp}
                  </div>
                </div>
              </div>
              <div className="text-center text-gray-600">
                {cityInfo.condition}
              </div>
              <div className="flow-root p-2">
                <div className="float-left text-gray-600">
                  Humidity: {cityInfo.humidity} %
                </div>
                <div className="float-right text-gray-600">
                  Wind: {cityInfo.wind} <span className="">mph</span>
                </div>
                <div className="float-left text-gray-600">
                  Visibility: {cityInfo.visibility} mi
                </div>
                <div className="float-right text-gray-600">
                  Gust: {cityInfo.gust} mph
                </div>
              </div>
    </div>
  )
}

export default DetailPage
import React from "react";
import { useState } from "react";
import Image from "next/image";
import logo from "../public/sunny.png";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../reduxfolder/features/location-slice";

function Landingpage() {
  const [location, changeLocation] = useState("");

  const dispatch = useDispatch();
  const locationState = useSelector((state) => state.currentLocation);
  console.log("hey" + JSON.stringify(locationState));

  const [weather, setWeather] = useState("");

  const getWeather = async () => {
    const api_key = "c2a39762b03a45b397f51031230407";
    const api_url =
      "https://api.weatherapi.com/v1/current.json?key=" +
      api_key +
      "&q=" +
      location;

    if (location) {
      try {
        const res = await fetch(api_url).then((data) => data.json());

        if (res) {
          // console.log(res)
          const img = res.current.condition.icon;
          const imgURL = "https:" + img;

          // console.log(imgURL)
          const api_data = {
            country: res.location.country,
            city: res.location.name,
            temp: res.current.temp_c,
            humidity: res.current.humidity,
            wind: res.current.wind_mph,
            gust: res.current.gust_mph,
            visibility: res.current.vis_miles,
            condition: res.current.condition.text,
            img: imgURL,
          };
          // setWeather(api_data)
          setWeather(
            <>
              <div className="text-center text-2xl p-2">{api_data.city}</div>
              <div className="flex justify-center">
                <div className="flow-root">
                  <div className="float-left">
                    <Image
                      src={api_data.img}
                      width="80"
                      height="80"
                      alt="Condition"
                    />
                  </div>
                  <div className="float-left text-6xl degrees">
                    {api_data.temp}
                  </div>
                </div>
              </div>
              <div className="text-center text-gray-600">
                {api_data.condition}
              </div>
              <div className="flow-root p-2">
                <div className="float-left text-gray-600">
                  Humidity: {api_data.humidity} %
                </div>
                <div className="float-right text-gray-600">
                  Wind: {api_data.wind} <span className="">mph</span>
                </div>
                <div className="float-left text-gray-600">
                  Visibility: {api_data.visibility} mi
                </div>
                <div className="float-right text-gray-600">
                  Gust: {api_data.gust} mph
                </div>
              </div>
            </>
          );
          dispatch(setLocation(api_data));
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-b from-yellow-100 to-rose-300 flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <Image src={logo} className="w-28 flex" alt="logo" />
        {/* <div className='text-xl tracking-wider text-gray-800 font-pacifico font-bold'>Weathery</div> */}
      </div>
      <div className="flex sm:flex-row flex-col">
        <input
          className="shadow-lg shadow-gray-600/50 rounded-xl transform lg:w-[40em] w-[80vw] p-4 lg:placeholder:text-xl"
          type="text"
          id="location"
          value={location}
          onChange={(e) => changeLocation(e.target.value)}
          placeholder="Location (ie. Istanbul)"
        />

        <button
          className="bg-indigo-600 px-12 py-4 rounded-xl hover:bg-indigo-400 lg:text-xl font-bold tracking-wider text-white "
          onClick={getWeather}
        >
          SEARCH
        </button>
      </div>

      <div>
        {weather? weather : <div>there is no place</div>}
      </div>
    </div>
  );
}

export default Landingpage;

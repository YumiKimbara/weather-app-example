import "./App.css";
import { useEffect, useState, useMemo } from "react";
import Weather from "./components/Weather";

interface geolocationTypes {
  country: string;
  lat: number;
  lon: number;
}

type Weather = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

type Temp = {
  feels_like: number;
  temp: number;
};

export type WeatherTypes = {
  name: string;
  weather: Weather[];
  main: Temp;
};

const App: React.FC = ({}) => {
  const [geolocation, setGeolocation] = useState<null | geolocationTypes>(null);
  const [weatherInfo, setWeatherInfo] = useState<null | WeatherTypes>(null);
  const [cityName, setCityName] = useState<string>("Vancouver");

  // this service somehow doesn't allow me to create .env file
  // so I just paste api key here
  const API_KEY = process.env.WEATHER_API_KEY
  const geolocationApi = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`;
  const fetchGeolocation = async () => {
    try {
      // show loading icon while fetching data
      // use then keyword make sure that geolocation api fetch lat and lon
      const res = await fetch(geolocationApi);
      const data = await res.json();
      setGeolocation(data[0]);
    } catch (err) {
      console.error(err);
      // show error message to user
    }
  };
  useEffect(() => {
    if (cityName?.length) fetchGeolocation();
  }, [cityName]);

  const createWeatherEndPoint = (geolocation: geolocationTypes) => `https://api.openweathermap.org/data/2.5/weather?lat=${geolocation?.lat}&lon=${geolocation?.lon}&appid=${API_KEY}`;

  // axiosを知っているけど今はインストールの時間がないからと説明一言入れる。
  useEffect(() => {
    if (!geolocation) return;
    fetch(createWeatherEndPoint(geolocation))
      .then((res) => res.json())
      .then((data) => setWeatherInfo(data))
      .catch((err) => console.error(err));
  }, [geolocation]);

  return <Weather weather={weatherInfo} setCityName={setCityName} />;
};

export default App;

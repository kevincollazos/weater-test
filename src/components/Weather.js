import React, { useEffect, useState} from 'react';

//API consume
import superagent from 'superagent';

//Styles
import '../styles/Weather.scss'

//Keys
import { wheaterKey, apiUrlCurrent, apiUrlForecast } from '../keys'

//Icons svg
import cloudy from '../img/nublado.svg'
import clear from '../img/dom.svg'
import rain from '../img/lluvia.svg';
import location from '../img/location.svg'

//Main Process
const Weather = () => {

    const [weatherBogota, setWeatherBogota] = useState({//vars Bogota weather
        temp:'',
        city:'',
        weather:''
      })
    const [weather3, setWeather3] = useState([]); //vars Bogota 3 days weather
    const [weatherParis, setWeatherParis] = useState({//vars Paris weather
        temp:'',
        city:'',
        country:'',
        humidity:'',
        windSpeed:'',
        description:'',
        weather:''
    });

    /**
     * 
    */
    const threeDaysWeater = async() =>{
        try {
            const city= "Bogota";
            const res = await superagent.post(`${apiUrlForecast}q=${city}&APPID=${wheaterKey}&units=metric&cnt=32`);
            
            for (let i = 8; i < res.body.list.length; i+=8) {
                console.log(res.body.list[i]);
                /*setWeather3({
                    tempMax: res.body.list[i].main.temp_max,
                    tempMin: res.body.list[i].main.temp_min,
                    date: res.body.list[i].dt_txt,
                    weather: res.body.list[i].weather[0].main
                });    */           
            }
        } catch (error) {
            
        }
    }

    /**
     * Function to get Bogota weather
    */
    const bogotaWeather = async() =>{
        try {
            const city= "Bogota";
            const res = await superagent.post(`${apiUrlCurrent}q=${city}&APPID=${wheaterKey}&units=metric`);
            setWeatherBogota({
                temp:res.body.main.temp,
                city:res.body.name,
                weather:res.body.weather[0].main
            });
        } catch (error) {
            
        }        
    }

    /**
     * Function to get Paris weather
    */
    const parisWeather = async() =>{
        try {
            const city= "Paris";
            const res = await superagent.post(`${apiUrlCurrent}q=${city}&APPID=${wheaterKey}&units=metric`);            
            setWeatherParis({
                temp:res.body.main.temp,
                city:res.body.name,
                country:res.body.sys.country,
                humidity:res.body.main.humidity,
                windSpeed:res.body.wind.speed,
                description:res.body.weather[0].description,
                weather:res.body.weather[0].main
            });
        } catch (error) {
            
        } 
    }

    /**
     * Function to accepts Bogota and Paris weather
    */
    useEffect( () => {
        bogotaWeather();
        parisWeather();
        threeDaysWeater();
    }, [] )

    /**
     * Finally views
     * 
    */
    return (
        <div className="containerMain">
            <div className="secondContainer">
                <div className="containerIcon">
                    { weatherBogota.weather === "Clouds" ?
                           <img
                           className="iconsWeather"
                           alt={weatherBogota.weather} 
                           width="35px"
                           height="35px"
                           src={cloudy} />
                        : weatherBogota.weather === "Rain" ? 
                            <img
                            className="iconsWeather"
                            alt={weatherBogota.weather} 
                            width="35px"
                            height="35px"
                            src={rain}/>
                        :
                            <img
                            className="iconsWeather"
                            alt={weatherBogota.weather}
                            width="35px"
                            height="35px" 
                            src={clear}/>
                    }
                    <p className="weatherText">{weatherBogota.weather}</p>
                </div>
                <div className="containerGrades">
                    <p className="gradesText">{weatherBogota.temp}°</p>
                </div>
                <div className="bannerWheater">
                    <div className="divIconTxtBta">
                        <img
                            className="iconsWeather"
                            alt={weatherBogota.city}
                            width="40px"
                            height="40px" 
                            src={location}/>
                        <span className="bogotaText">{weatherBogota.city}</span>
                    </div>
                </div>
                <div className="wrapper">
                    <div>
                        <b>3 Days</b> Forecast
                        
                    </div>
                    <div><b>Place to</b> Visit</div>
                    <div>+ Top viewers</div>
                    <div>
                        <div className="divParisInfo">
                            <div className="wrapperParis">
                                { weatherParis.weather === "Clouds" ?
                                    <img
                                    className="iconsWeatherParis"
                                    alt={weatherParis.weather} 
                                    width="45px"
                                    height="45px"
                                    src={cloudy} />
                                : weatherParis.weather === "Rain" ? 
                                    <img
                                    className="iconsWeatherParis"
                                    alt={weatherParis.weather} 
                                    width="45px"
                                    height="45px"
                                    src={rain}/>
                                :
                                    <img
                                    className="iconsWeatherParis"
                                    alt={weatherParis.weather}
                                    width="45px"
                                    height="45px" 
                                    src={clear}/>
                                }                            
                                <span className="weatherTextParis">{weatherParis.temp}°</span>                                
                                <span className="textParis">
                                    {weatherParis.city} <br/>
                                    <span >{weatherParis.country}</span>
                                </span>                                
                            </div> 
                            <div className="wrapperParis">
                                <span className="textExtraInfoParis">Humidity {weatherParis.humidity}</span>
                                <span className="textExtraInfoParis">{weatherParis.description}</span>
                                <span className="textExtraInfoParis">{weatherParis.windSpeed}</span>
                            </div>                           
                        </div>
                    </div>
                </div>                
            </div>           
        </div>
    )
}

export default Weather;

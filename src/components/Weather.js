import React, { useEffect, useState} from 'react';
import moment from 'moment';

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
                const res = await superagent.post(`${apiUrlForecast}q=${city}&APPID=${wheaterKey}&units=metric&cnt=25`);           
                ///*
                const arr = []                
                for (var i = 8; i < res.body.list.length; i+=8) { 
                                                    
                        const days = {
                            date: res.body.list[i].dt_txt,
                            tempMax: res.body.list[i].main.temp_max,
                            tempMin: res.body.list[i].main.temp_min,
                            weather: res.body.list[i].weather[0].main
                        }  
                        arr.push(days);               
                }   
                console.log("arr "+JSON.stringify(arr));
                setWeather3(arr)
                        
            } catch (error) {
                
            }
        };

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
                    <p className="gradesText">{parseFloat(weatherBogota.temp).toFixed(1) }°</p>
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
                    <div className="containerBrews">
                        <div className="divTxt"><span><b>3 Days</b> Forecast</span></div>
                        { weather3.length > 0 ?                                                
                            weather3.map((day, key) =>{                                
                                return(
                                    <div className="divDaysWeather" key={key}> 
                                    <div className="gradeFloat"><span className="textFloat">{parseFloat(day.tempMax).toFixed(1)}° / {parseFloat(day.tempMin).toFixed(1)}°</span></div>
                                        { day.weather === "Clouds" ?
                                            <img
                                            className="iconsWeatherThreeBta"
                                            alt={day.weather} 
                                            width="20px"
                                            height="20px"
                                            src={cloudy} />
                                        : day.weather === "Rain" ? 
                                            <img
                                            className="iconsWeatherThreeBta"
                                            alt={day.weather} 
                                            width="20px"
                                            height="20px"
                                            src={rain}/>
                                        :
                                            <img
                                            className="iconsWeatherThreeBta"
                                            alt={day.weather}
                                            width="20px"
                                            height="20px" 
                                            src={clear}/>
                                        }
                                        <span className="txtThreeDays">{moment(day.date).format('dddd')}</span>
                                        <span className="txtThreeWeather">{day.weather}</span>                                        
                                    </div>
                                )                                
                            })
                            :
                            <div className="divAlert">
                               <p  className="alertTxt">Se esta cargando la informacion</p>
                            </div>
                        }
                    </div>
                    <div className="containerBrews">
                        <div className="divTxt"><span><b>Place to</b> Visit</span></div>
                        <div className="placeImg">
                            <span className="placeVisitTxt">Arab Street <br/>Singapore</span>
                        </div>
                    </div>
                    <div className="containerBrews">
                        <div className="divTxt"><span className="txtTopViews"><b>+</b> Top viewers</span></div>
                        <div className="museumImg">
                            <span className="placeVisitTxt">Art Science Museum</span>
                        </div>
                        <div className="fountainImg">
                            <span className="placeVisitTxt">Fountain</span>
                            <div className="buttonPlus">
                                <span className="plusTxt">+</span>
                            </div>
                        </div>
                    </div>
                    <div className="containerBrews">
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
                                <span className="weatherTextParis">{parseFloat(weatherParis.temp).toFixed(1)}°</span>                                
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

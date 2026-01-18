
'use client'
import Image from "next/image";
import logo from "../public/assets/images/logo.svg"
import SearchButton from "./components/SearchButton";
import SearchBox from "./components/SearchBox";
import WeatherBackground from "./components/WeatherBackground";
import Skeleton from "./components/Skeleton";
import bgtodaydesk from "../public/assets/images/bg-today-large.svg"
import { searchCountry, getWeather, Location } from "./services";
import { useEffect, useState } from "react";

// Weather Icons
import iconSunny from "../public/assets/images/icon-sunny.webp"
import iconPartlyCloudy from "../public/assets/images/icon-partly-cloudy.webp"
import iconOvercast from "../public/assets/images/icon-overcast.webp"
import iconFog from "../public/assets/images/icon-fog.webp"
import iconDrizzle from "../public/assets/images/icon-drizzle.webp"
import iconRain from "../public/assets/images/icon-rain.webp"
import iconSnow from "../public/assets/images/icon-snow.webp"
import iconStorm from "../public/assets/images/icon-storm.webp"
import iconUnits from "../public/assets/images/icon-units.svg"
import iconError from "../public/assets/images/icon-error.svg"
import iconRetry from "../public/assets/images/icon-retry.svg"
import iconLoading from "../public/assets/images/icon-loading.svg"

export default function Home() {

    const [searchQuery, setSearchQuery] = useState('');
    const [locations, setLocations] = useState<any[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const [hasSearched, setHasSearched] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [showUnitDropdown, setShowUnitDropdown] = useState(false);
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        setCurrentDate(new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }));
    }, []);

    const [units, setUnits] = useState({
        temp: 'C', // 'C' | 'F'
        speed: 'km/h', // 'km/h' | 'mph'
        precip: 'mm' // 'mm' | 'in'
    });

    // Helper functions for conversion
    const convertTemp = (temp: number) => {
        if (units.temp === 'F') return Math.round((temp * 9/5) + 32);
        return Math.round(temp);
    };

    const convertSpeed = (speed: number) => {
        if (units.speed === 'mph') return Math.round(speed * 0.621371);
        return Math.round(speed);
    };

     const convertPrecip = (precip: number) => {
        if (units.precip === 'in') return (precip * 0.0393701).toFixed(2);
        return precip;
    };

    useEffect(() => {
        // Initial load for current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherData(latitude, longitude);
                    
                    // Reverse geocoding to get city name
                    try {
                        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=Abu%20Dhabi&count=1&language=en&format=json`); 
                        const data = await res.json();
                        
                        if (data.results && data.results.length > 0) {
                          console.log("data.results",data.results);
                            setSelectedLocation(data.results[0]);
                        } else {
                            // Fallback if no results
                             setSelectedLocation({ id: 0, name: data.results[0].name, latitude, longitude, country: data.results[0].country, admin1: data.results[0].admin1 });
                        }

                    } catch (e) {
                         console.error(e);
                         // Fallback on error
                         setSelectedLocation({ id: 0, name: "Abu Dhabi", latitude, longitude, country: "", admin1: "" });
                    }
                },
                (err) => {
                    console.error("Geolocation denied", err);
                    // Fallback to default location
                    const defaultLoc = { id: 292968, name: "Abu Dhabi", latitude: 24.45118, longitude: 54.39696, country: "United Arab Emirates", admin1: "Abu Dhabi" };
                    setSelectedLocation(defaultLoc);
                    fetchWeatherData(defaultLoc.latitude, defaultLoc.longitude);
                }
            );
        }
    }, []);


    const fetchWeatherData = async (lat: number, lon: number) => {
        try {
            setLoading(true);
            setError(null);
            const data = await getWeather(lat, lon);
            console.log("data weather",data);
            setWeather(data);
        } catch (err) {
            setError("Failed to fetch weather data");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (query: string) => {
        try {
            setIsSearching(true);
            setError(null);
            const locations = await searchCountry(query);
            console.log("locations",locations);
            setLocations(locations);
            setHasSearched(true);
        } catch (error) {
            setError("Failed to fetch locations");
        } finally {
            setIsSearching(false);
        }
    };

    const handleSelectLocation = (location: Location) => {
        setSelectedLocation(location);
        setLocations([]);
        setSearchQuery(''); // Optional: clear search query
        fetchWeatherData(location.latitude, location.longitude);
    };

    const handleSearchSubmit = async () => {
        if (!selectedLocation) return;
        try {
            setLoading(true);
            setError(null);
            const weatherData = await getWeather(selectedLocation.latitude, selectedLocation.longitude);
            console.log(weatherData);
        } catch (error) {
            setError("Failed to fetch weather data");
        } finally {
            setLoading(false);
        }
    };

    const getWeatherIcon = (code: number) => {
        if (code === 0) return iconSunny;
        if (code >= 1 && code <= 2) return iconPartlyCloudy;
        if (code === 3) return iconOvercast;
        if (code >= 45 && code <= 48) return iconFog;
        if (code >= 51 && code <= 57) return iconDrizzle;
        if (code >= 61 && code <= 67) return iconRain; // Rain
        if (code >= 80 && code <= 82) return iconRain; // Rain showers
        if (code >= 71 && code <= 77) return iconSnow;
        if (code >= 85 && code <= 86) return iconSnow;
        if (code >= 95 && code <= 99) return iconStorm;
        return iconSunny; // Default
    };

  return (
    <div className="min-h-screen py-6 px-4 md:px-10 lg:px-20 bg-[#02012B] font-sans dark:bg-black relative overflow-hidden">
      
      {/* Background Animation */}
      {weather?.current && <WeatherBackground weatherCode={weather.current.weather_code} />}

      <div className="relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <Image src={logo} alt="Logo"  />
        </div>
        
        {/* Unit Switcher */}
        <div className="relative z-[60]">
             <button 
                onClick={() => setShowUnitDropdown(!showUnitDropdown)}
                className="bg-[#2F2F49] hover:bg-[#3E3E5E] text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
             >
                <Image src={iconUnits} alt="Units" width={20} height={20} />
                <span>Units</span>
             </button>
             
             {showUnitDropdown && (
             <div className="absolute top-full right-0 mt-2 w-64 bg-[#24243E] border border-[#c0c7d42e] rounded-xl shadow-xl p-4">
                 <div className="flex justify-between items-center mb-3">
                    <h6 className="text-[#c0c7d4] text-xs font-semibold uppercase tracking-wider">Switch Units</h6>
                    <button onClick={() => setShowUnitDropdown(false)} className="text-gray-400 hover:text-white">✕</button>
                 </div>
                 
                 {/* Temperature */}
                 <div className="mb-4">
                     <p className="text-gray-400 text-xs mb-2">Temperature</p>
                     <div className="flex flex-col gap-1">
                         <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-[#2F2F49] rounded-lg">
                             <span className="text-white text-sm">Celsius (°C)</span>
                             <input type="radio" name="temp" checked={units.temp === 'C'} onChange={() => setUnits({...units, temp: 'C'})} className="accent-[#0095FF]" />
                         </label>
                         <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-[#2F2F49] rounded-lg">
                             <span className="text-white text-sm">Fahrenheit (°F)</span>
                             <input type="radio" name="temp" checked={units.temp === 'F'} onChange={() => setUnits({...units, temp: 'F'})} className="accent-[#0095FF]" />
                         </label>
                     </div>
                 </div>

                 {/* Wind Speed */}
                 <div className="mb-4">
                     <p className="text-gray-400 text-xs mb-2">Wind Speed</p>
                     <div className="flex flex-col gap-1">
                         <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-[#2F2F49] rounded-lg">
                             <span className="text-white text-sm">km/h</span>
                             <input type="radio" name="speed" checked={units.speed === 'km/h'} onChange={() => setUnits({...units, speed: 'km/h'})} className="accent-[#0095FF]" />
                         </label>
                         <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-[#2F2F49] rounded-lg">
                             <span className="text-white text-sm">mph</span>
                             <input type="radio" name="speed" checked={units.speed === 'mph'} onChange={() => setUnits({...units, speed: 'mph'})} className="accent-[#0095FF]" />
                         </label>
                     </div>
                 </div>
                 
                 {/* Precipitation */}
                 <div>
                     <p className="text-gray-400 text-xs mb-2">Precipitation</p>
                     <div className="flex flex-col gap-1">
                         <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-[#2F2F49] rounded-lg">
                             <span className="text-white text-sm">Millimeters (mm)</span>
                             <input type="radio" name="precip" checked={units.precip === 'mm'} onChange={() => setUnits({...units, precip: 'mm'})} className="accent-[#0095FF]" />
                         </label>
                         <label className="flex items-center justify-between cursor-pointer p-2 hover:bg-[#2F2F49] rounded-lg">
                             <span className="text-white text-sm">Inches (in)</span>
                             <input type="radio" name="precip" checked={units.precip === 'in'} onChange={() => setUnits({...units, precip: 'in'})} className="accent-[#0095FF]" />
                         </label>
                     </div>
                 </div>

             </div>
             )}
        </div>

      </div>
      <h1 className="text-center text-white text-2xl md:text-4xl font-bold mt-6 ">How's the sky looking today?</h1>

       <div className="w-full flex flex-col md:flex-row justify-center gap-4 mt-10 relative z-50">
         <div className="relative w-full md:w-[400px]">
          <SearchBox handleSearch={handleSearch} />
          {locations.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-[#24243E] rounded-md mt-2 max-h-60 overflow-y-auto z-10 shadow-lg border border-[#c0c7d42e]">
              {locations.map((location) => (
                <li
                  key={location.id}
                  onClick={() => {
                    handleSelectLocation(location);
                    setLocations([]); // Close dropdown
                  }}
                  className="px-4 py-2 hover:bg-[#2F2F49] cursor-pointer text-white flex flex-col border-b border-[#c0c7d42e] last:border-none"
                >
                  <span className="font-medium">{location.name}</span>
                  {location.admin1 || location.country ? (
                     <span className="text-xs text-gray-400">
                       {[location.admin1, location.country].filter(Boolean).join(", ")}
                     </span>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
          
           {/* Search Loading State */}
           {isSearching && (
              <div className="absolute top-full left-0 w-full mt-2 bg-[#25253F] p-3 rounded-lg flex items-center gap-3 border border-[#c0c7d42e]">
                  <Image src={iconLoading} alt="Loading" width={20} height={20} className="animate-spin" />
                  <span className="text-white text-sm">Search in progress</span>
              </div>
           )}

           {/* No Results Found */}
           {hasSearched && locations.length === 0 && !isSearching && (
              <div className="absolute top-full left-0 w-full mt-4 text-center">
                  <span className="text-white font-bold text-lg">No search result found!</span>
              </div>
           )}
        </div>
        <SearchButton />
      </div>

     {error ? (
        <div className="flex flex-col items-center justify-center mt-20 gap-6">
            <Image src={iconError} alt="Error" width={48} height={48} />
            <div className="text-center">
                <h2 className="text-white text-3xl font-bold mb-2">Something went wrong</h2>
                <p className="text-gray-400 max-w-md">We couldn't connect to the server (API error). Please try again in a few moments.</p>
            </div>
            <button 
                onClick={() => selectedLocation ? fetchWeatherData(selectedLocation.latitude, selectedLocation.longitude) : window.location.reload()}
                className="bg-[#2F2F49] hover:bg-[#3E3E5E] text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-colors border border-[#c0c7d42e]"
            >
                <Image src={iconRetry} alt="Retry" width={16} height={16} />
                <span>Retry</span>
            </button>
        </div>
     ) : (
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 mt-10">
        <div className="flex flex-col gap-6">
         
          <div className="relative w-full h-[200px] rounded-3xl overflow-hidden">
            {loading || !weather ? (
               <Skeleton className="w-full h-full" />
            ) : (
             <>
            <Image src={bgtodaydesk} alt="bg-today-large" className="object-cover w-full h-full" />
            <div className="absolute top-0 left-0 w-full h-full p-8 flex flex-col justify-between">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <h2 className="text-white text-2xl md:text-3xl font-bold">{selectedLocation?.name ?? "Select a City"}</h2>
                         {selectedLocation?.country && <p className="text-gray-200 text-sm">{selectedLocation.country}</p>}

                        <p className="text-gray-300 text-sm">
                            {currentDate}
                        </p>
                    </div>
                     <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                        {/* We could add an icon here if available in the design, currently design has icon next to temp */}
                          <span className="text-white text-6xl md:text-6xl font-bold">
                             {weather?.current?.temperature_2m ? convertTemp(weather.current.temperature_2m) : '--'}°
                         </span>
                        {/* Weather Icon/Condition could go here */}
                     </div>
                </div>
            </div>
             </>
            )}
          </div>
       
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
           {loading || !weather ? (
                Array(4).fill(0).map((_, i) => (
                     <Skeleton key={i} className="h-[100px] w-full rounded-2xl" />
                ))
           ) : (
             <>
           <div className="bg-[#25253F] border border-[#25253F] rounded-2xl p-4">
            <h6 className="text-[#c0c7d4]">Feels like</h6>
            <h3 className="text-white text-xl md:text-2xl">{weather?.current?.apparent_temperature ? convertTemp(weather.current.apparent_temperature) : '--'}°</h3>
           </div>
          <div className="bg-[#25253F] border border-[#25253F] rounded-2xl p-4">
            <h6 className="text-[#c0c7d4]">Humidity</h6>
            <h3 className="text-white text-xl md:text-2xl">{weather?.current?.relative_humidity_2m ?? '--'}%</h3>
          </div>
          <div className="bg-[#25253F] border border-[#25253F] rounded-2xl p-4">
            <h6 className="text-[#c0c7d4]">Wind</h6>
            <h3 className="text-white text-xl md:text-2xl">{weather?.current?.wind_speed_10m ? convertSpeed(weather.current.wind_speed_10m) : '--'} {units.speed}</h3>
          </div>
          <div className="bg-[#25253F] border border-[#25253F] rounded-2xl p-4">
            <h6 className="text-[#c0c7d4]">Precipitation</h6>
            <h3 className="text-white text-xl md:text-2xl">{weather?.current?.precipitation ? convertPrecip(weather.current.precipitation) : '--'} {units.precip}</h3>
          </div>
             </>
           )}
        </div>
        <div>
          <h6 className="mb-4 text-white">Daily forecast</h6>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:flex lg:gap-4 lg:overflow-x-auto pb-4 gap-3">
            {loading || !weather ? (
                 Array(7).fill(0).map((_, i) => (
                    <Skeleton key={i} className="min-w-[100px] h-[160px] flex-shrink-0" />
                 ))
            ) : (
            weather?.daily?.time?.map((date: string, index: number) => {
                 const code = weather.daily.weather_code[index];
                 const icon = getWeatherIcon(code);
                 
                 return (
                <div key={date} className="bg-[#25253F] border border-[#c0c7d42e] rounded-2xl p-4 flex flex-col items-center justify-between min-w-[100px] h-[160px] flex-shrink-0">
                    <span className="text-white text-lg font-medium">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    
                    <div className="w-12 h-12 relative animate-pulse-slow">
                        <Image src={icon} alt="Weather icon"  className="w-full h-full object-contain" />
                    </div>

                    <div className="flex gap-4 w-full justify-center">
                         <span className="text-white font-bold">{convertTemp(weather.daily.temperature_2m_max[index])}°</span>
                        <span className="text-gray-400 font-medium">{convertTemp(weather.daily.temperature_2m_min[index])}°</span>
                    </div>
                </div>
                 );
            })
            )}
          </div>
        </div>
        </div>


        <div>

         <div className="bg-[#25253F] border border-[#c0c7d42e] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h6 className="text-white font-semibold">Hourly forecast</h6>
            {/* Day Selection Dropdown */}
            <div className="relative">
                <select 
                    className="bg-[#2F2F49] text-gray-300 text-sm px-3 py-1 rounded-lg cursor-pointer outline-none border border-[#c0c7d42e]"
                    value={selectedDayIndex}
                    onChange={(e) => setSelectedDayIndex(Number(e.target.value))}
                >
                    {weather?.daily?.time?.map((date: string, index: number) => (
                        <option key={date} value={index}>
                            {new Date(date).toLocaleDateString('en-US', { weekday: 'long' })}
                        </option>
                    ))}
                </select>
            </div>
          </div>
          <div className="flex flex-col gap-4 h-[440px] overflow-y-auto pr-2">
            {loading || !weather ? (
                 Array(8).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-[60px] w-full rounded-2xl" />
                 ))
            ) : (
            weather?.hourly?.time?.map((time: string, index: number) => {
               // Filter: Check if this hourly time belongs to the selected day
               const selectedDateStr = weather.daily.time[selectedDayIndex]; // YYYY-MM-DD
               if (!time.startsWith(selectedDateStr)) return null;

               // Determine icon based on weather code
               const code = weather.hourly.weather_code[index];
               const icon = getWeatherIcon(code); // Reuse helper (though helper returns static imports, might need to check if we can dynamic import or just use what we have)
               // Note: 'icon' is a StaticImageData object, so we can use it in Image src.
               
               const temp = Math.round(weather.hourly.temperature_2m[index]);
               const dateObj = new Date(time);
               const timeStr = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });

               return (
               <div key={time} className="bg-[#2F2F49] border border-[#c0c7d42e] hover:bg-[#3E3E5E] transition-colors rounded-2xl p-4 flex items-center justify-between cursor-pointer">
                   <div className="flex items-center gap-4">
                       <div className="w-8 h-8 flex items-center justify-center">
                            <Image src={icon} alt="Weather icon"  className="w-full h-full object-contain" />
                       </div>
                       <span className="text-white font-medium text-lg">
                           {timeStr}
                       </span>
                   </div>
                   <span className="text-white font-bold text-xl">
                       {temp}°
                   </span>
               </div>
               );
            })
            )}
          </div>
          
        </div>
        </div>
      </div>
     )}
    </div>
    </div>
  )
}



import React from 'react';

interface WeatherBackgroundProps {
  weatherCode: number;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ weatherCode }) => {
  // Determine weather type
  // 0: Sunny/Clear
  // 1-3: Cloudy/Overcast
  // 45, 48: Fog
  // 51-67, 80-82: Rain
  // 71-77, 85-86: Snow
  // 95-99: Storm

  let weatherType = 'clear';
  if (weatherCode >= 1 && weatherCode <= 3) weatherType = 'cloudy';
  else if (weatherCode === 45 || weatherCode === 48) weatherType = 'fog';
  else if ((weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82)) weatherType = 'rain';
  else if ((weatherCode >= 71 && weatherCode <= 77) || (weatherCode >= 85 && weatherCode <= 86)) weatherType = 'snow';
  else if (weatherCode >= 95 && weatherCode <= 99) weatherType = 'storm';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      
      {/* Sunny / Clear */}
      {weatherType === 'clear' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#02012B] via-[#02012B] to-[#1a1a40]">
            <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-yellow-500 rounded-full blur-[100px] opacity-20 animate-pulse-slow"></div>
        </div>
      )}

      {/* Cloudy */}
      {weatherType === 'cloudy' && (
        <div className="absolute inset-0 opacity-30">
             <div className="absolute top-20 left-10 w-40 h-10 bg-gray-400 rounded-full blur-xl animate-float-slow"></div>
             <div className="absolute top-40 right-20 w-60 h-16 bg-gray-500 rounded-full blur-2xl animate-float-slower"></div>
        </div>
      )}

      {/* Rain */}
      {weatherType === 'rain' && (
        <div className="rain-container absolute inset-0">
             {[...Array(50)].map((_, i) => (
                <div key={i} className="rain-drop" style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${0.5 + Math.random() * 0.5}s`,
                    animationDelay: `${Math.random() * 2}s`
                }}></div>
             ))}
        </div>
      )}

      {/* Snow */}
      {weatherType === 'snow' && (
        <div className="snow-container absolute inset-0">
            {[...Array(50)].map((_, i) => (
                <div key={i} className="snow-flake" style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${3 + Math.random() * 7}s`,
                    animationDelay: `${Math.random() * 5}s`,
                    opacity: Math.random()
                }}></div>
             ))}
        </div>
      )}

      {/* Storm */}
       {weatherType === 'storm' && (
        <div className="absolute inset-0 bg-gray-900/40">
            <div className="absolute inset-0 bg-black/10 animate-flash"></div>
             {[...Array(30)].map((_, i) => (
                <div key={i} className="rain-drop" style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${0.3 + Math.random() * 0.4}s`,
                    animationDelay: `${Math.random() * 2}s`
                }}></div>
             ))}
        </div>
      )}

      <style jsx>{`
        .animate-float-slow {
            animation: float 20s infinite alternate ease-in-out;
        }
        .animate-float-slower {
            animation: float 25s infinite alternate ease-in-out;
        }
        @keyframes float {
            0% { transform: translateX(0); }
            100% { transform: translateX(50px); }
        }
        
        .rain-drop {
            position: absolute;
            top: -20px;
            width: 2px;
            height: 15px;
            background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.4));
            animation: fall linear infinite;
        }
        @keyframes fall {
            to { transform: translateY(100vh); }
        }

        .snow-flake {
            position: absolute;
            top: -10px;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            filter: blur(1px);
            animation: snowFall linear infinite;
        }
        @keyframes snowFall {
            to { transform: translateY(100vh); }
        }

        .animate-flash {
            animation: flash 5s infinite;
        }
        @keyframes flash {
            0%, 90%, 100% { opacity: 0; }
            92% { opacity: 0.3; }
            94% { opacity: 0; }
            96% { opacity: 0.3; }
        }
        
        .animate-pulse-slow {
             animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.3; }
        }
      `}</style>

    </div>
  );
};

export default WeatherBackground;

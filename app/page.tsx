import Image from "next/image";
import logo from "../public/assets/images/logo.svg"
import SearchButton from "./components/SearchButton";
import SearchBox from "./components/SearchBox";
import bgtodaydesk from "../public/assets/images/bg-today-large.svg"

export default function Home() {
  return (
    <div className="min-h-screen pt-10 pb-10 pl-20 pr-20 bg-[#02012B] font-sans dark:bg-black">
      <div className="flex items-center justify-between">
        <div>
          <Image src={logo} alt="Logo"  />
        </div>
        <div>
          select box
        </div>

      </div>
      <h1 className="text-center text-white text-4xl font-bold mt-6 ">How's the sky looking today?</h1>

      <div className="w-full flex justify-center gap-4 mt-10">
        <SearchBox />
        <SearchButton />
      </div>

      <div className="grid grid-cols-[1fr_400px] gap-4 mt-10">
        <div className="flex flex-col gap-6">
         
          <Image src={bgtodaydesk} alt="bg-today-large"  />
       
        <div className="grid grid-cols-[190px_190px_190px_190px] gap-4">
           <div className="bg-[#25253F] border border-[#25253F] rounded-2xl p-4">
            <h6>Feels like</h6>
            <h3 className="text-white text-2xl">64</h3>

           </div>
          <div className="bg-[#25253F] border border-[#25253F] rounded-2xl p-4">
            <h6>Humidity</h6>
            <h3 className="text-white text-2xl">46%</h3>
          </div>
          <div className="bg-[#25253F] border border-[#25253F] rounded-2xl p-4">
            <h6>Wind</h6>
            <h3 className="text-white text-2xl">9 mph</h3>
          </div>
          <div className="bg-[#25253F] border border-[#25253F] rounded-2xl p-4">
            <h6>Precipitation</h6>
            <h3 className="text-white text-2xl">0 in</h3>
          </div>
        </div>
        <div>
          <h6 className="mb-4 text-white">Daily forecast</h6>
          <div className="grid grid-cols-[100px_100px_100px_100px_100px_100px_100px] gap-4">
            <div className="bg-[#25253F] border border-[#c0c7d42e] rounded-2xl p-4">1</div>
            <div className="bg-[#25253F] border border-[#c0c7d42e] rounded-2xl p-4">2</div>
            <div className="bg-[#25253F] border border-[#c0c7d42e] rounded-2xl p-4">3</div>
            <div className="bg-[#25253F] border border-[#c0c7d42e] rounded-2xl p-4">4</div>
            <div className="bg-[#25253F] border border-[#c0c7d42e] rounded-2xl p-4">5</div>
            <div className="bg-[#25253F] border border-[#c0c7d42e] rounded-2xl p-4">6</div>
            <div className="bg-[#25253F] border border-[#c0c7d42e] rounded-2xl p-4">7</div>
          </div>
        </div>
        </div>


        <div>

         <div className="bg-[#25253F] border border-[#c0c7d42e] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h6>Hourly forecast</h6>
            <select name="" id=""></select>
          </div>
          <div className="flex flex-col gap-4 h-[440px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#c0c7d42e] scrollbar-track-[#25253F]">
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >1</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >2</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >3</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >4</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >5</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >6</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >7</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >8</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >9</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >10</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >11</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >12</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >13</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >14</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >15</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >16</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >17</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >18</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >19</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >20</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >21</div>
          <div className="bg-[#2F2F49] border border-[#c0c7d42e] rounded-2xl p-4" >22</div>
         </div>
          
        </div>
        </div>
      
       
      </div>
     
    </div>
  );
}

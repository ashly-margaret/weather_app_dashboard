'use client'

import { Search } from "lucide-react"

const SearchBox = () => {
  return (
    <div className="bg-[#24243E]  pl-4 pr-4 pt-3 pb-3 text-white rounded-2xl flex items-center w-[400px]">
        <Search className="text-white pr-2" size={25} />
        <input type="text" placeholder="Search for a place" className="w-full text-white text-sm focus:outline-none " />
    </div>
  )
}

export default SearchBox
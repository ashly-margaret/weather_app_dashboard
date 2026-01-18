'use client'

import { Search } from "lucide-react"

const SearchBox = ({handleSearch}: {handleSearch: (query: string) => void}) => {
  return (
    <div className="bg-[#24243E]  pl-4 pr-4 pt-3 pb-3 text-white rounded-2xl flex items-center w-[400px]">
        <Search className="text-white pr-2" size={25} />
        <input type="text" placeholder="Search for a place" className="w-full text-white text-sm focus:outline-none " onChange={(e) => handleSearch(e.target.value)} />
    </div>
  )
}

export default SearchBox
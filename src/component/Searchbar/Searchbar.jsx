/* eslint-disable react/prop-types */
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

export default function Searchbar({ value, onChange, handleSearch, onClearSearch }) {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black mr-3"
        onClick={handleSearch}
      />

      <input
        type="text"
        placeholder="Cari..."
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />

      {value && <IoMdClose
        className="text-xl text-slate-500 cursor-pointer hover:text-black"
        onClick={onClearSearch}
      />}
    </div>
  );
}

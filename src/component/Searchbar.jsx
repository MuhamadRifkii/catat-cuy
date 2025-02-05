/* eslint-disable react/prop-types */
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

export default function Searchbar({ value, onChange, onClearSearch }) {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-lg border hover:shadow-lg focus-within:shadow-xl focus-within:border-blue-500 focus-within:outline-none">
      <FaMagnifyingGlass className="text-gray-400 cursor-pointer hover:text-black mr-3" />

      <input
        type="text"
        placeholder="Cari..."
        className="w-full text-sm bg-transparent py-2 outline-none text-gray-700"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoMdClose
          data-testid="clear"
          className="text-xl text-gray-500 cursor-pointer hover:text-black"
          onClick={onClearSearch}
        />
      )}
    </div>
  );
}

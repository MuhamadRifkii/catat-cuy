/* eslint-disable react/prop-types */
import { useMediaQuery } from "react-responsive";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";

export default function Searchbar({ value, onChange, onClearSearch }) {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const targetWidth = isDesktop ? "40rem" : "100%";
  return (
    <motion.div
      initial={{ width: "0px", opacity: 0 }}
      animate={{ width: targetWidth, opacity: 1 }}
      exit={{ width: "0px", opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="w-full md:w-80 flex items-center px-4 bg-[var(--searchbar-bg)] rounded-lg hover:shadow-lg focus-within:shadow-xl focus-within:border-blue-500 focus-within:outline-none"
    >
      <FaMagnifyingGlass className="text-gray-400 cursor-pointer hover:text-black mr-3" />

      <input
        type="text"
        placeholder="Cari..."
        className="w-full text-sm bg-transparent py-2 outline-none "
        style={{ color: "var(--main)" }}
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
    </motion.div>
  );
}

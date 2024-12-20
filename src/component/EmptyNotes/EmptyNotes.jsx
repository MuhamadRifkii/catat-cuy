import { FiFileText } from "react-icons/fi";
import { MdAddCircle } from "react-icons/md";

function EmptyNotes() {
  return (
    <div className="flex flex-col items-center justify-center mt-40 relative">
      <div className="relative">
        <FiFileText className="text-[#c7c7c7] w-40 h-40" />
        <MdAddCircle
          size={60}
          className="absolute bottom-0 right-0 transform translate-x-0 translate-y-2"
        />
      </div>
      <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">
        Mulai Tambahkan Catatan! Klik Tombol &apos;+&apos;!
      </p>
    </div>
  );
}

export default EmptyNotes;

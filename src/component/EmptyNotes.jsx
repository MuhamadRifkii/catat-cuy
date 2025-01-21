/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FiAlertCircle, FiFileText, FiServer } from "react-icons/fi";
import { MdAddCircle } from "react-icons/md";

function EmptyNotes({ userInfo, isLoading }) {
  const [errorStatus, setErrorStatus] = useState(null);

  useEffect(() => {
    if (!userInfo && !isLoading) {
      setErrorStatus("Gagal memuat catatan, coba lagi nanti");
    } else {
      setErrorStatus(null);
    }
  }, [userInfo, isLoading]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center mt-40 relative">
        <div className="relative">
          <FiFileText className="text-[#c7c7c7] w-40 h-40 animate-pulse" />
        </div>
        <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">
          Sedang memuat catatan...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-40 relative">
      {!errorStatus ? (
        <>
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
        </>
      ) : (
        <>
          <div className="relative">
            <FiServer className="text-[#c7c7c7] w-40 h-40" />
            <FiAlertCircle
              size={60}
              className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4"
            />
          </div>
          <p className="w-1/2 text-sm font-medium text-red-500 text-center leading-7 mt-5">
            {errorStatus}
          </p>
        </>
      )}
    </div>
  );
}

export default EmptyNotes;

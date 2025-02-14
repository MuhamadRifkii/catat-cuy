/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  FaFile,
  FaFileCirclePlus,
  FaFileCircleQuestion,
} from "react-icons/fa6";
import { FiAlertCircle, FiServer } from "react-icons/fi";

function EmptyNotes({ userInfo, isLoading, filteredNotes, filter }) {
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
          <FaFile className="text-[#c7c7c7] w-40 h-40 animate-pulse" />
        </div>
        <p
          className="w-1/2 text-sm font-medium text-center leading-7 mt-5"
          style={{ color: "var(--text-color)" }}
        >
          Sedang memuat catatan...
        </p>
      </div>
    );
  }

  if (filter && filteredNotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-40 relative">
        <div className="relative">
          <FaFileCircleQuestion className="text-[#c7c7c7] w-40 h-40" />
        </div>
        <p
          className="w-1/2 text-sm font-medium text-center leading-7 mt-5"
          style={{ color: "var(--text-color)" }}
        >
          Catatan tidak ditemukan
        </p>
      </div>
    );
  }

  if (filteredNotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-40 relative">
        {!errorStatus ? (
          <>
            <div className="relative">
              <FaFileCirclePlus className="text-[#c7c7c7] w-40 h-40" />
            </div>
            <p
              className="w-1/2 text-sm font-medium text-center leading-7 mt-5"
              style={{ color: "var(--text-color)" }}
            >
              Mulai Tambahkan Catatan! Klik Tombol &apos;+&apos;!
            </p>
          </>
        ) : (
          <>
            <div className="relative">
              <FiServer className="text-[#c7c7c7] w-40 h-40" />
              <FiAlertCircle
                size={60}
                className="text-red-500 absolute bottom-0 right-0 transform translate-x-4 translate-y-4"
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

  return null;
}

export default EmptyNotes;

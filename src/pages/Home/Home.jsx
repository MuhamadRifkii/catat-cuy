/* eslint-disable no-unused-vars */
import { useSpring, animated } from "@react-spring/web";
import { MdAdd } from "react-icons/md";
import { NoteCard } from "../../component/Cards/NoteCard";
import Navbar from "../../component/Navbar/Navbar";
import AddEditNotes from "./AddEditNotes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function Home() {
  const [openAddEditModal, setOpenAddModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const modalAnimation = useSpring({
    opacity: openAddEditModal.isShown ? 1 : 0,
    transform: openAddEditModal.isShown ? "scale(1)" : "scale(0.9)",
    config: { tension: 300, friction: 25 },
  });

  const LoadingSpinner = useSpring({
    opacity: isLoading ? 1 : 0,
    visibility: isLoading ? "visible" : "hidden",
    config: { duration: 300 },
  });

  const handleEdit = (noteDetails) => {
    setOpenAddModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const getUserInfo = async ({ token }) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/v2/auth/get-user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to get user info");
      }

      const data = await response.json();
      setUserInfo(data.user);
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllNotes = async ({ token }) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/v2/notes/get-all-notes`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to get all notes");
      }
      const data = await response.json();
      setAllNotes(data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserInfo({ token });
      getAllNotes({ token });
      return () => {};
    }
  }, []);

  return (
    <>
      <animated.div
        style={LoadingSpinner}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
      </animated.div>
      <Navbar userInfo={userInfo} />

      <div className="container mx-auto mt-8 px-4">
        <div className="grid grid-cols-3 gap-4 mt-8">
          {allNotes.map((item) => (
            <NoteCard
              key={item.id}
              title={item.title}
              date={item.createdAt}
              content={item.content}
              isPinned={item.isPinned}
              onEdit={() => handleEdit(item)}
              onDelete={() => {}}
              onPinNote={() => {}}
              onClick={() => handleEdit(item)}
            />
          ))}
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      {openAddEditModal.isShown && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* Animated Modal */}
          <animated.div
            style={modalAnimation}
            className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg"
          >
            <button
              className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
              onClick={() =>
                setOpenAddModal({ isShown: false, type: "add", data: null })
              }
            />
            <AddEditNotes
              type={openAddEditModal.type}
              noteData={openAddEditModal.data}
              onClose={() =>
                setOpenAddModal({ isShown: false, type: "add", data: null })
              }
              getAllNotes={getAllNotes}
            />
          </animated.div>
        </div>
      )}
    </>
  );
}

/* eslint-disable no-unused-vars */
import { MdAdd } from "react-icons/md";
import { NoteCard } from "../../component/Cards/NoteCard";
import Navbar from "../../component/Navbar/Navbar";
import AddEditNotes from "./AddEditNotes";
import { useEffect, useState } from "react";
import Modal from "react-modal";
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

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const getUserInfo = async ({ token }) => {
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
    }
  };

  const getAllNotes = async ({ token }) => {
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

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
        }}
        contentLabel="Add Notes"
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
}

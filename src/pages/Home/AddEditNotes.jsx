/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { MdClose } from "react-icons/md";

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function AddEditNotes({ noteData, type, getAllNotes, onClose }) {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const token = localStorage.getItem("token");

  const [error, setError] = useState(null);

  // Add note
  const addNewNote = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/v2/notes/add-note`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add note");
      }

      if (result.note) {
        await getAllNotes({ token });
        onClose();
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
    }
  };

  // Edit note
  const editNote = async () => {
    const noteId = noteData.id;
    try {
      const response = await fetch(
        `${baseUrl}/api/v2/notes/edit-note/` + noteId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add note");
      }

      if (result.note) {
        await getAllNotes({ token });
        onClose();
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred");
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Masukkan judul");
      return;
    }

    if (!content) {
      setError("Masukkan isi");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };
  return (
    <div className="relative ">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label ">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4 ">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
}

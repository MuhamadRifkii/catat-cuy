/* eslint-disable react/prop-types */
import { useSpring, animated } from "@react-spring/web";
import { useEffect } from "react";
import { MdClose } from "react-icons/md";
import {
  setTitle,
  setContent,
  setError,
  addNewNote,
  editNote,
} from "../../store/actions/note.action";
import { useDispatch, useSelector } from "react-redux";

export default function AddEditNotes({ noteData, type, onClose }) {
  const dispatch = useDispatch();

  const { title, content, error, setIsLoading } = useSelector(
    (state) => state.noteReducer
  );

  const token = localStorage.getItem("token");

  const LoadingSpinner = useSpring({
    opacity: setIsLoading ? 1 : 0,
    visibility: setIsLoading ? "visible" : "hidden",
    config: { duration: 300 },
  });

  useEffect(() => {
    if (noteData) {
      dispatch(setTitle(noteData.title || ""));
      dispatch(setContent(noteData.content || ""));
    }
  }, [noteData, dispatch]);

  const handleAddNote = () => {
    if (!title) {
      dispatch(setError("Masukkan judul"));
      return;
    }

    if (!content) {
      setError("Masukkan isi");
      return;
    }

    setError("");

    if (type === "edit" && noteData) {
      dispatch(editNote(noteData.id, title, content, token, onClose));
    } else if (type === "add") {
      dispatch(addNewNote(title, content, token, onClose));
    }
  };
  return (
    <>
      <animated.div
        style={LoadingSpinner}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
      </animated.div>
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
            onChange={({ target }) => dispatch(setTitle(target.value))}
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
            onChange={({ target }) => dispatch(setContent(target.value))}
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
    </>
  );
}

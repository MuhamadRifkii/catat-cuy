import { useSpring, animated } from "@react-spring/web";
import { MdAdd } from "react-icons/md";
import { NoteCard } from "../../component/NoteCard";
import Navbar from "../../component/Navbar";
import AddEditNotes from "../../component/AddEditNotes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllNotes,
  setUserInfo,
  setFilter,
  setOpenAddEditModal,
  setToast,
} from "../../store/actions/home.action";
import {
  deleteNote,
  pinNote,
  resetForm,
} from "../../store/actions/note.action";
import Toast from "../../component/Toast";
import EmptyNotes from "../../component/EmptyNotes";
import Swal from "sweetalert2";
import moment from "moment";

const formatDate = (date) => {
  return moment(date).format("DD MMM YYYY");
};

export default function Home() {
  const { isLoading, userInfo, allNotes, filter, openAddEditModal, toast } =
    useSelector((state) => state.homeReducer);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleCloseToast = () =>
    dispatch(setToast({ isShown: false, message: "" }));

  const handleEdit = (noteDetails) => {
    dispatch(
      setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" })
    );
  };

  const handleDelete = async (noteId) => {
    Swal.fire({
      title: "Hapus catatan?",
      icon: "warning",
      color: "var(--main)",
      background: "var(--bg-color)",
      showDenyButton: true,
      denyButtonText: "Batal",
      confirmButtonText: "Hapus",
      reverseButtons: true,
      customClass: {
        confirmButton: "swal-confirm-btn",
        denyButton: "swal-deny-btn",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteNote(noteId, token));
      }
    });
  };

  useEffect(() => {
    const loadUserAndNotes = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await dispatch(setUserInfo(token, navigate));
          await dispatch(setAllNotes(token));
        } catch (error) {
          console.error("Error loading data:", error);
        }
      } else {
        navigate("/login");
      }
    };

    loadUserAndNotes();
  }, [dispatch, navigate]);

  const filteredNotes = allNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(filter.toLowerCase()) ||
      note.content.toLowerCase().includes(filter.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter((note) => note.isPinned);
  const groupedNotes = filteredNotes
    .filter((note) => !note.isPinned)
    .reduce((groups, note) => {
      const noteDate = formatDate(note.createdAt);
      if (!groups[noteDate]) {
        groups[noteDate] = [];
      }
      groups[noteDate].push(note);
      return groups;
    }, {});

  return (
    <>
      <animated.div
        style={LoadingSpinner}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
      </animated.div>

      <Navbar
        token={token}
        userInfo={userInfo}
        setFilter={(value) => dispatch(setFilter(value))}
        filterValue={filter}
      />

      <div className="container mx-auto my-4 px-4">
        {pinnedNotes.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg my-2">Disematkan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
              {pinnedNotes.map((item) => (
                <NoteCard
                  key={item.id}
                  title={item.title}
                  date={item.createdAt}
                  content={item.content}
                  isPinned={item.isPinned}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => {
                    handleDelete(item.id);
                  }}
                  onPinNote={() => {
                    dispatch(pinNote(item.id, item.isPinned, token));
                  }}
                  onClick={() => handleEdit(item)}
                />
              ))}
            </div>
          </div>
        )}

        {Object.keys(groupedNotes).length > 0 ? (
          Object.keys(groupedNotes).map((date) => (
            <div key={date}>
              <h3 className="font-semibold text-lg my-2">{date}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
                {groupedNotes[date].map((item) => (
                  <NoteCard
                    key={item.id}
                    title={item.title}
                    date={item.createdAt}
                    content={item.content}
                    isPinned={item.isPinned}
                    onEdit={() => handleEdit(item)}
                    onDelete={() => {
                      handleDelete(item.id);
                    }}
                    onPinNote={() => {
                      dispatch(pinNote(item.id, item.isPinned, token));
                    }}
                    onClick={() => handleEdit(item)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <EmptyNotes
            userInfo={userInfo}
            isLoading={isLoading}
            filteredNotes={filteredNotes}
            filter={filter}
          />
        )}
      </div>

      {userInfo && (
        <button
          className="fixed bottom-8 right-8 w-16 h-16 flex items-center justify-center rounded-full bg-primary shadow-lg hover:bg-blue-600 z-50"
          onClick={() => {
            dispatch(
              setOpenAddEditModal({ isShown: true, type: "add", data: null })
            );
          }}
        >
          <MdAdd className="text-[32px] " style={{ color: "var(--button)" }} />
        </button>
      )}

      {openAddEditModal.isShown && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <animated.div
            style={modalAnimation}
            className="bg-[var(--modal-bg)] p-6 rounded-lg max-w-md w-full shadow-lg"
          >
            <button
              className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
              onClick={() =>
                dispatch(
                  setOpenAddEditModal({
                    isShown: false,
                    type: "add",
                    data: null,
                  })
                )
              }
            />
            <AddEditNotes
              userInfo={userInfo}
              type={openAddEditModal.type}
              noteData={openAddEditModal.data}
              onClose={() => [
                dispatch(
                  setOpenAddEditModal({
                    isShown: false,
                    type: "add",
                    data: null,
                  })
                ),
                dispatch(resetForm()),
              ]}
            />
          </animated.div>
        </div>
      )}

      {toast.isShown && (
        <Toast
          isShown={toast.isShown}
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
    </>
  );
}

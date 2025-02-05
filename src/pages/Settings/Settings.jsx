import { useSpring, animated } from "@react-spring/web";
import Navbar from "../../component/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllNotes,
  setUserInfo,
  setToast,
} from "../../store/actions/home.action";
import Toast from "../../component/Toast";

export default function Settings() {
  const { isLoading, userInfo, toast } = useSelector(
    (state) => state.homeReducer
  );

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LoadingSpinner = useSpring({
    opacity: isLoading ? 1 : 0,
    visibility: isLoading ? "visible" : "hidden",
    config: { duration: 300 },
  });

  const handleCloseToast = () =>
    dispatch(setToast({ isShown: false, message: "" }));

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

  // const filteredNotes = allNotes.filter(
  //   (note) =>
  //     note.title.toLowerCase().includes(filter.toLowerCase()) ||
  //     note.content.toLowerCase().includes(filter.toLowerCase())
  // );

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
        // setFilter={(value) => dispatch(setFilter(value))}
        // filterValue={filter}
      />

      {/* <div className="container mx-auto my-4 px-4">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredNotes.map((item) => (
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
        ) : (
          <EmptyNotes userInfo={userInfo} isLoading={isLoading} />
        )}
      </div> */}

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

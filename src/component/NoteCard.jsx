/* eslint-disable react/prop-types */
import moment from "moment";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
import { useState, useEffect } from "react";

export const NoteCard = ({
  title,
  date,
  content,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Generate a random background color only if the note is pinned
  const backgroundColor = isPinned
    ? `hsl(${Math.floor(Math.random() * 180)}, 70%, 90%)`
    : "var(--card-bg)";

  const titleStyle = isPinned
    ? { color: "#1f2937" }
    : { color: "var(--card-title-text)" };
  const dateStyle = isPinned
    ? { color: "#6b7280" }
    : { color: "var(--card-date-text)" };
  const contentStyle = isPinned
    ? { color: "#4b5563" }
    : { color: "var(--card-content-text)" };

  return (
    <div
      className="border rounded p-4 shadow transition-all ease-in-out cursor-pointer relative hover:shadow-xl"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundColor, borderColor: "var(--card-border-color)" }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium" style={titleStyle}>
            {title}
          </h6>
          <span className="text-xs" style={dateStyle}>
            {moment(date).format("DD MMM YYYY")}
          </span>
        </div>

        <div className="w-5 h-5 flex items-center justify-center">
          {(isHovered || isMobile) && (
            <MdOutlinePushPin
              className={`icon-btn ${
                isPinned ? "text-primary" : "text-slate-300"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onPinNote();
              }}
            />
          )}
        </div>
      </div>

      <div
        className="text-xs mt-2 overflow-hidden whitespace-nowrap text-ellipsis max-w-full"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
          ...contentStyle,
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>

      <div className="h-6 flex items-center justify-end mt-2">
        {(isHovered || isMobile) && (
          <div className="flex items-center gap-2">
            <MdCreate
              className={`icon-btn hover:text-green-600 ${
                isPinned ? "text-black" : ""
              }`}
              onClick={onEdit}
            />

            <MdDelete
              className={`icon-btn hover:text-red-500 ${
                isPinned ? "text-black" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

/* eslint-disable react/prop-types */
import moment from "moment";
import { MdCreate, MdDelete } from "react-icons/md";

export const SaranCard = ({
  title,
  date,
  content,
  onEdit,
  onDelete,
  onClick,
  isDeletable,
}) => {
  return (
    <div
      className="border rounded p-4 bg-[var(--card-bg)] hover:shadow-xl transition-all ease-in-out cursor-pointer"
      style={{ borderColor: "var(--card-border-color)" }}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <h6
            className="text-sm font-medium"
            style={{ color: "var(--card-title-text)" }}
          >
            {title}
          </h6>
          <span
            className="text-xs text-slate-500"
            style={{ color: "var(--card-date-text)" }}
          >
            {moment(date).format("DD MMM YYYY")}
          </span>
        </div>
      </div>

      <div
        className="text-xs text-slate-600 mt-2 overflow-hidden whitespace-nowrap text-ellipsis max-w-full"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
          color: "var(--card-content-text)",
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2 ml-auto">
          <MdCreate
            className="icon-btn hover:text-green-600 "
            onClick={onEdit}
          />

          <MdDelete
            className={`icon-btn ${
              isDeletable
                ? "hover:text-red-500"
                : "hover:text-slate-300 cursor-not-allowed"
            }`}
            onClick={(e) => {
              if (!isDeletable) return;
              e.stopPropagation();
              onDelete();
            }}
          />
        </div>
      </div>
    </div>
  );
};

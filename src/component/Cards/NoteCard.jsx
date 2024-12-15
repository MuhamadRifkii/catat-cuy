/* eslint-disable react/prop-types */
import moment from "moment";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";

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
  return (
    <div
      className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500 ">
            {moment(date).format("DD MMM YYYY")}
          </span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`}
          onClick={(e) => {
            e.stopPropagation();
            onPinNote();
          }}
        />
      </div>

      <p className="text-xs text-slate-600 mt-2 truncate">{content}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2 ml-auto">
          <MdCreate
            className="icon-btn hover:text-green-600 "
            onClick={onEdit}
          />

          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          />
        </div>
      </div>
    </div>
  );
};

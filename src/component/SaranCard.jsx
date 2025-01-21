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
      </div>

      <div
        className="text-xs text-slate-600 mt-2 overflow-hidden whitespace-nowrap text-ellipsis max-w-full"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
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

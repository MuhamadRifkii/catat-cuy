/* eslint-disable react/prop-types */
import { getInitials } from "../../utils/helper";

export default function Profile({ userInfo, logout }) {
  return (
    userInfo && (
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
          {getInitials(userInfo?.name)}
        </div>

        <div>
          <p className="text-sm font-medium ">{userInfo?.name}</p>
          <button className="text-sm text-slate-700 underline" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    )
  );
}

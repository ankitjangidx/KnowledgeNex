import { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";

import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import ConfirmationModal from "../../common/ConfirmationModal";
import SidebarLink from "./SidebarLink";

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null);

  const [active, setActive] = useState(true);

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      {active ? (
        <div className="absolute z-20 block">
          <div className="flex h-[calc(100vh-3.5rem)]  md:min-w-60 flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-5 text-richblack-25 relative">
            <div className=" flex flex-col">
              <div
                onClick={() => setActive(!active)}
                className="absolute top-1 z-10  -right-5"
              >
                <div className=" bg-yellow-800 rounded-full p-1">
                  <AiOutlineDoubleLeft className="text-2xl md:text-3xl text-yellow-50" />
                </div>
              </div>
              {sidebarLinks.map((link) => {
                if (link.type && user?.accountType !== link.type) return null;
                return (
                  <SidebarLink key={link.id} link={link} iconName={link.icon} />
                );
              })}
            </div>
            <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
            <div className="flex flex-col">
              <SidebarLink
                link={{ name: "Settings", path: "/dashboard/settings" }}
                iconName="VscSettingsGear"
              />
              <button
                onClick={() =>
                  setConfirmationModal({
                    text1: "Are you sure?",
                    text2: "You will be logged out of your account.",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }
                className="px-8 py-2 text-sm font-medium text-richblack-300"
              >
                <div className="flex items-center gap-x-2">
                  <VscSignOut className="text-lg" />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </div>
          {confirmationModal && (
            <ConfirmationModal modalData={confirmationModal} />
          )}
        </div>
      ) : (
        <div className="absolute top-2 -left-4 bg-yellow-800 rounded-full p-2">
          <div onClick={() => setActive(!active)} className="flex justify-end">
            <AiOutlineDoubleRight className="text-2xl md:text-3xl text-yellow-100" />
          </div>
        </div>
      )}
    </div>
  );
}

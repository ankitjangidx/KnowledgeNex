import { useEffect, useRef, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  const show = useRef();
  const overlay = useRef();

  const shownav = () => {
    show.current.classList.toggle("navshow");
    overlay.current.classList.toggle("hidden");
  };

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`relative z-50 flex h-14 w-screen items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-900 transition-all  duration-500 sm:relative`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* Navigation links */}
        {/* mobile Navbar */}

        {user && user?.accountType !== "Instructor" && (
          <div className=" md:hidden">
            <Link to="/dashboard/cart" className=" relative left-10">
              <div>
                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                {totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
          </div>
        )}
        <div
          className={`gap- relative  flex flex-row md:hidden ${
            token !== null && user?.accountType !== "Instructor"
              ? " -left-12"
              : ""
          }`}
        >
          <GiHamburgerMenu
            className={`absolute -bottom-4 left-10 h-8 w-16 fill-richblack-25 `}
            onClick={shownav}
          />
          <div
            ref={overlay}
            className=" bg fixed bottom-0 left-0 right-0 top-0 z-30 hidden h-[100vh] w-[100vw] overflow-y-hidden bg-[rgba(0,0,0,0.5)] "
            onClick={shownav}
          ></div>
          <div ref={show} className="mobNav z-50">
            <nav
              className=" glass2 absolute -left-[80px] -top-7 flex w-[200px] flex-col  items-center"
              ref={show}
            >
              {token == null && (
                <Link to="/login" className="">
                  <button
                    onClick={shownav}
                    className=" mt-4 rounded-md bg-yellow-50 px-6 py-2 text-center text-[15px] font-semibold text-black transition-all duration-200 hover:scale-95"
                  >
                    Login
                  </button>
                </Link>
              )}
              {token == null && (
                <Link to="/signup" className="text-yellow-50">
                  <button
                    onClick={shownav}
                    className="mt-4 rounded-md bg-yellow-50 px-5 py-2 text-center text-[15px] font-semibold text-black transition-all duration-200 hover:scale-95"
                  >
                    Signup
                  </button>
                </Link>
              )}

              {token != null && (
                <div className=" mt-2">
                  <p className=" mb-2 text-center text-richblack-50">Account</p>

                  <ProfileDropdown />
                </div>
              )}
              <div className=" mb-4 mt-4 h-[2px] w-[200px] bg-richblack-25"></div>
              <p className=" text-xl font-semibold text-yellow-50">Courses</p>
              <div className=" flex flex-col items-end pr-4">
                {subLinks?.length < 0 ? (
                  <div></div>
                ) : (
                  subLinks?.map((element, index) => (
                    <Link
                      to={`/catalog/${element?.name}`}
                      key={index}
                      onClick={() => {
                        shownav();
                      }}
                      className="p-2 text-sm"
                    >
                      <p className=" text-richblack-5 ">{element?.name}</p>
                    </Link>
                  ))
                )}
              </div>
              <div className=" mb-4 mt-4 h-[2px] w-[200px] bg-richblack-25"></div>
              <Link
                to="/about"
                onClick={() => {
                  shownav();
                }}
                className="p-2"
              >
                <p className=" text-richblack-5 ">About</p>
              </Link>
              <Link
                to="/contact"
                onClick={() => {
                  shownav();
                }}
                className="p-2"
              >
                <p className=" text-richblack-5 ">Contact</p>
              </Link>
            </nav>
          </div>
        </div>
        {/* Desktop Navbar */}
        <nav>
          <ul className=" hidden flex-row gap-5 gap-x-6 text-richblack-25 md:flex">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks?.length > 0 ? (
                          <>
                            {subLinks?.map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                key={i}
                              >
                                <p>{subLink.name}</p>
                              </Link>
                            ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden flex-row items-center gap-5 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

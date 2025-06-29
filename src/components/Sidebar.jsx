import IITI_Logo from "../assets/logos/IITILogo.png"
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"

const Sidebar = ({ navItems }) => {
  const [active, setActive] = useState("")
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const currentItem = navItems.find((item) => location.pathname === item.path || (location.pathname === "/" && item.path === "/Dashboard"))

    if (currentItem) {
      setActive(currentItem.name)
    }
  }, [location.pathname, navItems])

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const mainNavItems = navItems.filter((item) => item.section === "main")
  const bottomNavItems = navItems.filter((item) => item.section === "bottom")

  const handleNavigation = (item) => {
    setActive(item.name)

    if (item.action) {
      item.action()
    } else if (item.path) {
      navigate(item.path)
    }

    if (window.innerWidth < 768) {
      setIsOpen(false)
    }
  }

  const renderNavItem = (item) => {
    const isActiveItem = active === item.name
    const isLogout = item.name === "Logout"

    return (
      <li
        key={item.name}
        onClick={() => handleNavigation(item)}
        className={`
          group relative my-1.5 rounded-xl transition-all duration-200 cursor-pointer
          ${isActiveItem ? "bg-[#1360AB] text-white shadow-md" : "text-gray-700 hover:bg-[#1360AB]/10"}
          ${isLogout ? "hover:bg-red-50 hover:text-red-600" : ""}
        `}
      >
        <div
          className={`
          flex items-center px-4 py-3 
          ${isActiveItem ? "" : isLogout ? "hover:text-red-600" : "hover:text-[#1360AB]"}
        `}
        >
          <div className={`flex justify-center items-center ${isOpen ? "mr-3" : "mx-auto"}`}>
            <item.icon
              className={`
              text-xl
              ${isActiveItem ? "text-white" : isLogout ? "text-red-500" : "text-[#1360AB]"}
              ${!isActiveItem && !isLogout ? "group-hover:text-[#1360AB]" : ""}
            `}
            />
          </div>

          {isOpen && (
            <span
              className={`
              text-sm font-medium whitespace-nowrap transition-all duration-200
              ${!isActiveItem ? "group-hover:translate-x-1" : ""}
              ${isLogout && !isActiveItem ? "text-red-500" : ""}
            `}
            >
              {item.name}
            </span>
          )}
        </div>

        {isActiveItem && <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-2/3 bg-white rounded-r-md"></div>}
      </li>
    )
  }

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden fixed z-50 top-4 left-4 bg-[#1360AB] text-white p-2.5 rounded-full shadow-lg">
        {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
      </button>

      {isOpen && <div className="md:hidden fixed inset-0 bg-black bg-opacity-40 z-20 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>}

      <div
        className={`
        fixed md:relative z-30 h-screen transition-all duration-300 ease-in-out
        bg-white shadow-lg border-r border-gray-100
        ${isOpen ? "left-0" : "-left-full md:left-0"}
        ${isOpen ? "w-64" : "w-0 md:w-20"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo section */}
          <div
            className={`
            p-4 flex justify-center items-center border-b border-gray-100
            ${isOpen ? "h-20" : "h-16"}
          `}
          >
            {isOpen ? <img src={IITI_Logo} alt="IIT Indore Logo" className="h-14 w-auto object-contain" /> : <div className="w-10 h-10 rounded-full bg-[#1360AB] flex items-center justify-center text-white font-bold text-xs">IITI</div>}
          </div>

          <div className="flex-1 overflow-y-auto p-3 scrollbar-thin">
            <ul className="space-y-1">{mainNavItems.map(renderNavItem)}</ul>
          </div>

          <div className="p-3 border-t border-gray-100">
            <ul className="space-y-1">{bottomNavItems.map(renderNavItem)}</ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar

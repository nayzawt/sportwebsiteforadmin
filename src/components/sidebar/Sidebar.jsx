import "./sidebr.scss";
import { useDispatch} from 'react-redux'
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { NavLink } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import SidebarData from "./SidebarData";
import { logout } from "../../redux/slices/authSlice";

const Sidebar = () => {
  const Dispatch = useDispatch()
  const { dispatch } = useContext(DarkModeContext);
  const Logout = () => {
    Dispatch(logout())
    alert('You sure logout')
  }

  return (
    <div className="sidebar">
      <div className="center">
        {
          SidebarData.map((item, index) => {
            return (
              <div className="inner-center" key={index}>
                <NavLink to={item.path} style={{ textDecoration: "none", alignItems: 'center' }} className={cl => cl.isActive ? 'sidebar-icon' : 'sidebar-icon icon-change'}  >
                  <p style={{ paddingRight: '15px', paddingLeft: '15px' }}>{item.icon}</p>
                  <p>{item.name}</p>
                </NavLink>
              </div>
            )
          })
        }

        <div className="inner-center" >
          <NavLink to={'/login'} style={{ textDecoration: "none", alignItems: 'center' }} className={cl => cl.isActive ? 'sidebar-icon' : 'sidebar-icon icon-change'} onClick={Logout}  >
            <p style={{ paddingRight: '15px', paddingLeft: '15px' }}>
              <ExitToAppIcon />
            </p>
            <p>Logout</p>
          </NavLink>
        </div>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
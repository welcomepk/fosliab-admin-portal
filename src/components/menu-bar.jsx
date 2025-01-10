import { useState, createContext } from "react"; //useContext,createContext
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Outlet, Link } from "react-router";
import { Accordion } from "react-bootstrap";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { Tooltip } from "@mui/material";
export const MyContext = createContext("");
import Header from "./header";
import { useAuth } from "../context/authProvider";
import { useLocalStorage } from "../hooks/use-local-storage";

function toSlug(text) {
    return text.toLowerCase().replace(/\s+/g, "-");
}
function transformMenuData(data) {
    const menuItems = [];
    let currentMenu = null;
    let firstItem = true;
    data.forEach(item => {
        if (item.screenAction === "") {
            // Create a new menu group
            currentMenu = {
                title: item.menuDesc,
                url: "#",
                icon: item.menuDesc === "Maintenance" ? "SquareTerminal" : "Bot", // Customize icons per category
                isActive: firstItem ? true : false,
                items: []
            };
            menuItems.push(currentMenu);
        } else if (currentMenu) {
            // Add to the current menu's items
            currentMenu.items.push({
                menuId: item.menuId,
                menuDesc: item.menuDesc,
                screenAction: `${toSlug(currentMenu.title)}/${toSlug(item.menuDesc.trim())}` //item.menuDesc.toLowerCase().replace(/\s+/g, "-") // Convert to slug format
            });
        }
        firstItem = false;
    });
    console.log({ menuItems });

    return menuItems;
}

function MenuBar() {
    const [navbar, setnavbar] = useState(true);
    const [menu, setMenu] = useState(true);
    const [Tryvalue, setTrayvalue] = useState();
    const { user } = useAuth()
    const onhandlechange = () => {
        setnavbar(!navbar);
        setMenu(!menu);
    };
    const sidebarMenuitems = transformMenuData(user.menu);
    useLocalStorage("userMenuItems", sidebarMenuitems);
    window.localStorage.setItem("userMenuItems", JSON.stringify(sidebarMenuitems))
    const Icon = type => {
        if (type === "Maintenance")
            return <SettingsSuggestIcon />
        return <AdminPanelSettingsIcon />
    }

    return (
        <>
            <MyContext.Provider value={[Tryvalue, setTrayvalue]}>
                <Header />
                <div className="main">
                    <div className={navbar ? "menu" : "menu2"}>
                        <div className={navbar ? "sidenav" : "unset_sidenav"}>
                            <div className="menuIcon" onClick={onhandlechange}>
                                <FontAwesomeIcon icon={faBars} />
                            </div>
                            {navbar ? (
                                <>
                                    <Accordion>
                                        {sidebarMenuitems?.map((entry) => {
                                            const category = entry.title;
                                            const itemList = entry.items;

                                            return (
                                                // category == "License Management" &&
                                                <Accordion.Item eventKey={category} key={category}>
                                                    <Accordion.Header>
                                                        <p className="me-3">
                                                            {
                                                                <Tooltip
                                                                    title={<div className="fs-5">{category}</div>}
                                                                    placement="right"
                                                                >
                                                                    <span>{Icon(category)}</span>
                                                                </Tooltip>
                                                            }
                                                        </p>
                                                        <p> {category}</p>
                                                    </Accordion.Header>
                                                    <Accordion.Body
                                                        className={menu ? "subMenu" : "subMenuClose"}
                                                    // onClick={onhandlechange}
                                                    >
                                                        {itemList.map((item, index) => {
                                                            return (
                                                                <div key={index} className="submenulist">
                                                                    <Link to={`${item.screenAction}`}>
                                                                        {" "}
                                                                        {item.menuDesc}
                                                                    </Link>
                                                                </div>
                                                            );
                                                        })}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            );
                                        })}
                                    </Accordion>
                                </>
                            ) : (
                                <>
                                    <Accordion>
                                        {sidebarMenuitems?.map((entry) => {
                                            const category = entry.title;
                                            const itemList = entry.items;

                                            return (
                                                // category == "License Management" &&
                                                <Accordion.Item
                                                    eventKey={category}
                                                    key={category}
                                                    className="circle"
                                                >
                                                    <Accordion.Header
                                                        onClick={onhandlechange}
                                                        data-title={category}
                                                    >
                                                        {
                                                            <Tooltip
                                                                placement="right"
                                                                title={<div className="fs-5">{category}</div>}
                                                            >
                                                                <span>{Icon(category)}</span>
                                                            </Tooltip>
                                                        }
                                                    </Accordion.Header>
                                                    <Accordion.Body
                                                        className={menu ? "subMenu2" : "subMenuClose"}
                                                    >
                                                        {itemList.map((item) => (
                                                            <div key={item.index}>
                                                                <Link
                                                                    to={item.screenAction}
                                                                >
                                                                    {" "}
                                                                    {item.menuDesc}
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            );
                                        })}
                                    </Accordion>
                                </>
                            )}
                        </div>
                    </div>

                    <div className={navbar ? "section" : "sectionclose"}>
                        <Outlet></Outlet>
                    </div>
                </div>
            </MyContext.Provider>
        </>
    );
}
export default MenuBar;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import chevron from "../../assets/vectors/icons/chevron.svg";
import "./sidebar.css";

export default function Submenu( { item }) {

    const [subnav, setSubnav] = useState(false);

    const toggleSubnav = () => setSubnav(!subnav);

    useEffect(() => {
        if(
            window.location.pathname.includes(item.path) && item.subNav ) { setSubnav(true); }
    }, [])

    const props = {
        to: item.path
    }

    return (
        <>
            <Link
                {...(!item.subNav && props)}
                onClick={item.subNav && toggleSubnav}
                className={"dropdown-title-container" + (subnav || window.location.pathname.includes(item.path) ? " subnav-open" : "") + (subnav || window.location.pathname.includes(item.path) ? " current-page" : "")}
            >
                <div className="dropdown-title">
                    <div className="dropdown-icon-container">
                        <img src={item.icon} alt="" className="dropdown-icon"/>
                    </div>
                    <p>{item.title}</p>
                    {item.subNav &&
                        <img src={chevron} alt="" className={"dropdown-right-icon" + (subnav ? " open" : "")}/>
                    }
                </div>
            </Link>
            <div className="subnav-container" aria-hidden={subnav ? "false" : "true"}>
                <div className="subnav">
                    <div className="verticle-bar-container"><div className="verticle-bar"/></div>
                    <div className="subnav-content">
                        {subnav &&
                            item.subNav.map((item, index) => {
                                return (
                                    <Link
                                        to={item.path}
                                        key={index}
                                        className={window.location.pathname.includes(item.path) ? "active" : ""}
                                    >
                                        <p>{item.title}</p>
                                        {item.pro &&
                                            <p className="pro-tier">Pro</p>
                                        }
                                    </Link>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
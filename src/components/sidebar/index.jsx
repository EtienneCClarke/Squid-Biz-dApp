import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import makeBlockie from 'ethereum-blockies-base64';
import { sidebarData } from "./sidebarData";
import Submenu from "./Submenu";
import ChangeNetwork from "../changeNetwork";
import logo from "../../assets/images/png/logo_small.png";
import logoNoText from "../../assets/vectors/logo_no_text.svg"
import exit from "../../assets/vectors/icons/exit.svg";
import close from "../../assets/vectors/icons/close.svg";
import "./sidebar.css";

export default function SideBar() {

    const [sidebar, setSidebar] = useState(true);

    const hideSidebar = () => setSidebar(false);
    const showSidebar = () => setSidebar(true);

    const { address } = useAccount();
    const { disconnect } = useDisconnect();

    return (
        <nav
            sidebar={sidebar.toString()}
            id="sidebar"
            className={(!sidebar ? "closed" : "")}
            onClick={() => showSidebar()}
        >
            <div className="sidebar-top-container">
                <div className="sidebar-top-content">
                    <img src={logo} alt="Ardoda" className="sidebar-logo"/>
                    {!sidebar &&
                        <img src={logoNoText} alt="Ardoda" className="sidebar-logo-closed"/>
                    }
                    <div
                        className="close-sidebar"
                        onClick={(e) => {
                            e.stopPropagation();
                            hideSidebar()
                        }}
                    >
                        <img src={close} alt="close-sidebar" />
                    </div>
                </div>
            </div>
            <ChangeNetwork />
            <div className="dropdown-container">
                {
                    sidebarData.map((item, index) => {
                        return <Submenu item={item} key={index} />
                    })
                }
            </div>
            <div className="help-container">
                <a
                    href="https://squid.biz/faqs"
                    target="_blank"
                >
                    Help
                </a>
                <a
                    href="https://squid.biz/privacy_policy"
                    target="_blank"
                >
                    Privacy Policy
                </a>
                <a
                    href="https://squid.biz/terms_and_conditions"
                    target="_blank"
                >
                    Terms &amp; Conditions
                </a>
            </div>
            <div className="wallet-details-container">
                <div className="wallet-details-content">
                    <img src={makeBlockie(address ? address : "0x")} alt="wallet blockie" className="wallet-blockie" />
                    <p className="wallet-address">{address}</p>
                    <div className="disconnect-btn" onClick={() => disconnect()}>
                        <img src={exit} />
                    </div>
                </div>
            </div>
        </nav>
    );
}
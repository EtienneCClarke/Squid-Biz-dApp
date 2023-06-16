import { useState } from "react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi"
import { useNavigate } from "react-router-dom";
import ChainIcon from "../chainIcon";
import icon from "../../assets/vectors/icons/changeNetwork.svg";
import "./changeNetwork.css";

export default function ChangeNetwork() {

    const [open, setOpen] = useState(false);
    const { navigate } = useNavigate();

    const { chain } = useNetwork();
    const { chains, switchNetwork, error, isLoading, pendingChainId } = useSwitchNetwork({
        onSuccess() {
            window.location.reload();
        }
    });
    const { isConnected } = useAccount();

    if(isConnected) {
        return (
            <>
                <div
                    className="dropdown-title-container change-network"
                    onClick={() => setOpen(!open)}
                >
                    <div className="dropdown-title">
                        <div className="dropdown-icon-container">
                            <ChainIcon name={chain.name}/>
                        </div>
                        <p>{chain.name}</p>
                        <img src={icon} className="dropdown-right-icon" />
                    </div>
                </div>
                <div className="subnav-container" aria-hidden={open ? "false" : "true"}>
                    <div className="subnav">
                        <div className="verticle-bar-container"><div className="verticle-bar"></div></div>
                        <div className="subnav-content">
                                {open &&
                                    chains?.map((item, index) => {
                                        if(item.name == chain.name) return null;
                                        return(
                                            <a
                                                key={index}
                                                className={
                                                    "network" +
                                                    (isLoading && pendingChainId === item.id ? " pending" : "")
                                                }
                                                onClick={() => switchNetwork?.(item.id)}
                                            >
                                                <ChainIcon name={item.name}/>
                                                <p>{item.name}</p>
                                                {/* {isLoading && pendingChainId === item.id && <span>(switching)</span>} */}
                                            </a>
                                        );
                                    })
                                }
                            </div>
                    </div>
                </div>
            </>
        )
    }
}
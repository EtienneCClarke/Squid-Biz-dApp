import { useEffect, useState } from "react"
import copyIcon from "../../../assets/vectors/icons/copy.svg";
import tickIcon from "../../../assets/vectors/icons/tick-coral-blue.svg";
import "./address.css";

export default function SquidAddress({ address }) {

    const [copied, setCopied] = useState();

    function copy() {
        navigator.clipboard.writeText(address);
        setCopied(true);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(copied) setCopied(false);
        }, 5000)

        return () => clearTimeout(timeout);
    }, [copied])

    return(
        <div className="copy-address-container">
            <p className="copy-address-title bold">Squid Payment Address</p>
            <div className="copy-address" onClick={() => copy()}>
                <div className="copy-address-icon-container">
                    {copied ? <img src={tickIcon} alt="" /> : <img src={copyIcon} alt=""/>}
                </div>
                {copied ? <p>Copied to clipboard!</p> : <p>{address}</p> }
                {copied ? null : <p className="copy-address-right-txt">Copy</p> }
            </div>
        </div>
    )
}
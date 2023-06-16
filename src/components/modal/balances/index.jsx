import { useNetwork } from "wagmi";
import CloseModal from "../closeModal";
import ChainIcon from "../../chainIcon";
import "./balances.css";

export default function Balances({ bal, totalPot, personal = false, closeModal}) {
    
    const { chain } = useNetwork();

    return(
        <div className="balances-container">
            <CloseModal closeModal={closeModal} />
            <div className="large-balance">
                <ChainIcon name={chain.name} />
                <h3>{personal ? bal : totalPot}</h3>
            </div>
            <p className="large-balance-label">
                {personal ? "Personal Balance" : "Total Pot Value"}
            </p>
            <p className="balance-sub-label">
                {personal ?
                    `Total Pot Value: ${totalPot} `
                    :
                    `Personal Balance: ` + (bal ? bal : "N/A ")
                }
                {bal ? chain.nativeCurrency.symbol : ""}
            </p>
        </div>
    )

}
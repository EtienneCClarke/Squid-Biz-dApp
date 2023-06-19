import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import { fetchBalance } from "@wagmi/core";
import CloseModal from "../closeModal";
import ChainIcon from "../../chainIcon";
import "./balances.css";

export default function Balances({
    bal,
    totalPot,
    personal = false,
    closeModal,
    token = "",
    fetchToken = false,
    squidAddr = ""
}) {

    const { chain } = useNetwork();
    
    const [balance, setBalance] = useState(bal);
    const [pot, setPot] = useState(totalPot);
    const [symbol, setSymbol] = useState(chain.nativeCurrency.symbol);


    useEffect(() => {
        try {
            if(fetchToken) {
                const fetch = async () => {
                    const res = await fetchBalance({
                        address: squidAddr,
                        token: token
                    })
                    setPot(res.formatted);
                    setSymbol(res.symbol);
                    setBalance("");
                };
                fetch();
            } else {
                setBalance(bal);
                setPot(totalPot);
                setSymbol(chain.nativeCurrency.symbol);
            }
        } catch (e) {
            console.error(e);
        }
    }, [fetchToken])

    return(
        <div className="balances-container">
            <CloseModal closeModal={closeModal} />
            <div className="large-balance">
                <ChainIcon name={chain.name} />
                <h3>
                    {personal ? balance : pot + (fetchToken ? " " + symbol : "")}
                </h3>
            </div>
            <p className="large-balance-label">
                {personal ? "Personal Balance" : "Total Pot Value"}
            </p>
            <p className="balance-sub-label">
                {personal ?
                    `Total Pot Value: ${pot} `
                    :
                    `Personal Balance: ` + (balance ? balance + " " : "N/A ")
                }
                {balance ? symbol : ""}
            </p>
        </div>
    )

}
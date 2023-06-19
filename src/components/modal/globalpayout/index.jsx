import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import { useWriteContract } from "../../../libs/wagmi";
import loading from "../../../assets/images/gifs/loading.gif";
import "./globalpayout.css";

export default function GlobalPayout({ id, ercToken, nativeToken = true }) {
    
    const [token, setToken] = useState();
    const [native, setNative] = useState();

    useEffect(() => {
        if(!nativeToken) {
            setToken(ercToken);
            setNative(false);
        } else {
            setToken("0x0000000000000000000000000000000000001010");
            setNative(true);
        }
    }, [ercToken, nativeToken]);

    const { chain } = useNetwork();
    const { write, isError, isSuccess, isLoading, data } = useWriteContract("payoutAll", [id, token, native]);

    function handleButton() {
        if(!write) return;
        write?.();
    }

    return(
        <div className="withdraw-container w-90 push-center">
            {isError && <p className="error-txt withdraw-error">Uh Oh! Something went wrong...</p>}
            {isSuccess && <div className="withdraw-success"><p>Success! Txn Hash: <a href={chain.blockExplorers.default.url + "/tx/" + data.hash} target="_blank">{data.hash}</a></p></div>}
            <div
                onClick={() => handleButton()}
                className="withdraw-button-payout-all"
            >
                {isLoading ? <img src={loading} alt="pending" /> : <p>Global Payout</p>}
            </div>
        </div>
    )
}
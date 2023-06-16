import { useNetwork } from "wagmi";
import { useWriteContract } from "../../../libs/wagmi";
import loading from "../../../assets/images/gifs/loading.gif";
import "./globalpayout.css";

export default function GlobalPayout({ id }) {

    const { chain } = useNetwork();
    const { write, isError, isSuccess, isLoading, data } = useWriteContract("payoutAll", [id, "0x0000000000000000000000000000000000001010", true]);

    function handleButton() {
        if(!write) return;
        write?.();
    }

    return(
        <div className="withdraw-container w-90 push-center">
            {isError && <p className="error-txt withdraw-error">Uh Oh! Something went wrong...</p>}
            {isSuccess && <div className="withdraw-success"><p>Success! Txn Hash: <a href={chain.blockExplorers.default.url + "/tx/" + data.hash} target="_blank">{data.hash}</a></p></div>}
            <div className="withdraw-button-global" onClick={() => handleButton()}>
                {isLoading ? <img src={loading} alt="pending" /> : <p>Global Payout</p>}
            </div>
        </div>
    )
}
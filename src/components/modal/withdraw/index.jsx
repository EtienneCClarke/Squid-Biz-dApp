import { useNetwork } from "wagmi";
import { useWriteContract } from "../../../libs/wagmi";
import loading from "../../../assets/images/gifs/loading.gif";
import "./withdraw.css";

export default function Withdraw({ id }) {

    const { chain } = useNetwork();
    const { write, isError, isSuccess, isLoading, data } = useWriteContract("payout", [id]);

    function handleButton() {
        if(!write) return;
        write?.();
    }

    return(
        <div className="withdraw-container w-90 push-center">
            {isError && <p className="error-txt withdraw-error">Uh Oh! Something went wrong...</p>}
            {isSuccess && <div className="withdraw-success"><p>Success! Txn Hash: <a href={chain.blockExplorers.default.url + "/tx/" + data.hash} target="_blank">{data.hash}</a></p></div>}
            <div className="withdraw-button" onClick={() => handleButton()}>
            {isLoading ? <img src={loading} alt="pending" /> : <p>Withdraw</p>}
            </div>
        </div>
    )
}
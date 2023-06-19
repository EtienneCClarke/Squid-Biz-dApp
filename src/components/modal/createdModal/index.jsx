import { useState } from "react";
import Balances from "../balances";
import SquidDetails from "../squidDetails";
import GlobalPayout from "../globalpayout";
import "./createdModal.css";

export default function CreatedModal({ closeModal, data }) {
    
    const [token, setToken] = useState("");
    const [fetchToken, setFetchToken] = useState(false);

    function reset() {
        setToken("");
        setFetchToken(false);
    }

    return (
        <div className="modal-content bg-light-grey">
            <Balances
                bal={data.balance}
                totalPot={data.pot}
                closeModal={closeModal}
                token={token}
                fetchToken={fetchToken}
                squidAddr={data.address}
            />
            <div className="w-90 push-center">
                <SquidDetails data={data} />
                <p className="fetchToken-label">Access ERC-20 Token</p>
                <div className="fetchToken-container">
                    <input type="text" onChange={(e) => setToken(e.target.value)} value={token}/>
                    {!fetchToken && <div type="submit" onClick={() => setFetchToken(true)}>Fetch</div>}
                    {fetchToken && <div type="submit" onClick={() => reset()} className="reset">RESET</div>}
                </div>
            </div>
            <GlobalPayout id={data.uuid} ercToken={token} nativeToken={!fetchToken}/>
        </div>
    );
}
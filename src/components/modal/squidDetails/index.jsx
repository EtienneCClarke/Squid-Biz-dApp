import SquidAddress from "../squidAddress";
import { timestampToDate } from "../../../utils/timestampToDate";
import "./details.css";

export default function SquidDetails({ data }) {
    
    function percent() {
        const n = 3; // decimal places
        const p = parseInt(data.shares) / parseInt(data.totalShares) * 100;
        return <>{Math.round(p * 10**n) / 10**n}</>
    }

    return(
        <div className="squid-details-container">
            <div className="squid-header">
                <p className="squid-title">{data.name}</p>
                <p className="squid-id">&#35;{data.uuid}</p>
            </div>
            <p className="squid-description">{data.description}</p>
            <SquidAddress address={data.address} />
            <div className="squid-details">
                <p>Your Shares: {data.shares} ({percent()}%)</p>
                <p>Total Shares: {data.totalShares}</p>
                <br/>
                <p>Last Withdrawl: {data.lastWithdrawl === "0" ? "None" : timestampToDate(data.lastWithdrawl)}</p>
                <br/>
                <p>Creator Address:</p>
                <p>{data.creator}</p>
            </div>
        </div>
    )
}
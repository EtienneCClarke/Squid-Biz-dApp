import SquidAddress from "../squidAddress";
import { timestampToDate } from "../../../utils/timestampToDate";
import "./details.css";

export default function SquidDetails({ data }) {
    
    return(
        <div className="squid-details-container">
            <div className="squid-header">
                <p className="squid-title">{data.name}</p>
                <p className="squid-id">&#35;{data.uuid}</p>
            </div>
            <p className="squid-description">{data.description}</p>
            <SquidAddress address={data.address} />
            <div className="squid-details">
                <p>Your Shares: {data.shares}</p>
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
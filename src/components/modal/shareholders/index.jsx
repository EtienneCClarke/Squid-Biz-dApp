import { useState } from "react";
import { useReadContract } from "../../../libs/wagmi";
import loading from "../../../assets/images/gifs/loading.gif";
import "./shareholders.css";
import { useEffect } from "react";

export default function Shareholders({ id, totalShares }) {

    const { data, isSuccess, isLoading } = useReadContract("getShareholders", [id]);
    const [shareholders, setShareholders] = useState([]);

    function calcPercent(share) {
        const n = 3; // decimal places
        const p = share / parseInt(totalShares) * 100;
        return Math.round(p * 10**n) / 10**n;
    }
    
    useEffect(() => {
        if(isSuccess && shareholders.length < 1) {
            let tempData = [];
            for(let i = 0; i < data.length; i = i + 2) {
                tempData.push({
                    address: data[i],
                    share: data[i + 1],
                    percent: calcPercent(data[i + 1])
                });
            }
            setShareholders(tempData)
        }
    }, [isSuccess])

    return(
        <div className="shareholders-wrapper">
            <p className="bold">Shareholders</p>
            <div className="shareholders-container">
                <div className="shareholders-title">
                    <p className="">Address</p>
                    <p className="">Share</p>
                    <p className="push-right">%</p>
                </div>
                {isLoading ? <img src={loading} alt="loading..." /> : (
                    <>
                        {shareholders.map(s => {
                            return(
                                <div className="shareholders-row">
                                    <p>{s.address}</p>
                                    <p>{s.share}</p>
                                    <p className="push-right">{s.percent}&#37;</p>
                                </div>
                            );
                        })}
                    </>
                )}
                
            </div>
        </div>
    );
}
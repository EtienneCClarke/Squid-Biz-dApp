import { useAccount, useNetwork, useDisconnect } from "wagmi";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

export default function RequireConnected({ children }) {

    const { disconnect } = useDisconnect();
    const { isConnected } = useAccount();
    const { chain, chains } = useNetwork();
    const navigate = useNavigate();

    useEffect(() => {
        let validChain = false;
        chains.forEach((item) => {
            if(item.id == chain.id) validChain = true;
        });
        if(!validChain) {
            disconnect();
        }
    }, [chain])

    useEffect(() => {
        if(!isConnected) {
            navigate("/");
        }
    }, [isConnected]);

    if(isConnected) {
        return (
            <>
                {children}
            </>
        );
    }
}
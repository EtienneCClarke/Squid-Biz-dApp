import "./chainIcon.css";
import { useNetwork } from "wagmi";
import { chainLogos } from "./chainData";

export default function ChainIcon({ name }) {

    const { chain } = useNetwork();

    return (
        <img
            src={chainLogos[name]}
            alt={name + " logo"}
            className="chain-logo"
        />
    );
}
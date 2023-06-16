import "./chainIcon.css";
import { chainLogos } from "./chainData";

export default function ChainIcon({ name }) {

    return (
        <img
            src={chainLogos[name]}
            alt={name + " logo"}
            className="chain-logo"
        />
    );
}
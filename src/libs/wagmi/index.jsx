import { wagmiConfig } from "./configure/client";
import {
    useReadContract,
    useWriteContract,
    useContractDetails
} from "./contract/useWagmi";

export { wagmiConfig, useReadContract, useWriteContract, useContractDetails }
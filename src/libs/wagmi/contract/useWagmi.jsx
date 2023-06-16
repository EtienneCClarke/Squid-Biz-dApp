import {
    useAccount,
    useNetwork,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite
} from "wagmi";
import ABI from "../data/contract.json";
import addresses from "../data/addresses.json";

function useContractDetails() {

    const { chain } = useNetwork();
    const { isConnected } = useAccount();

    if(isConnected) {
        const address = addresses[chain.id];
        const abi = ABI;
        return { address, abi }
    };

    return { undefined }

}

function useReadContract(target, arg, watch = false) {

    const { address, abi } = useContractDetails();

    return useContractRead({
        address: address,
        abi: abi,
        functionName: target,
        args: arg,
        watch: watch
    });

}

function useWriteContract(target, arg) {

    const { address, abi } = useContractDetails();

    const { config } = usePrepareContractWrite({
        address: address,
        abi: abi,
        functionName: target,
        args: arg
    });

    return useContractWrite(config);

}

export { useReadContract, useWriteContract, useContractDetails }
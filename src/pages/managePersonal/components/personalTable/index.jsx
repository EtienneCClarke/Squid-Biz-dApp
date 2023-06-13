import { useEffect, useMemo, useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import { readContract } from "@wagmi/core";
import { useReadContract, useContractDetails } from "../../../../libs/wagmi";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import loadingGif from "../../../../assets/images/gifs/loading.gif";
import { Table } from "../../../../components";
import { useInterval } from "../../../../helpers";

export default function PersonalTable() {

    const { address } = useAccount();
    const { chain } = useNetwork();
    const { address:contractAddress, abi } = useContractDetails();
    const { data:ids, isError, isSuccess, error } = useReadContract("getIds", [address], true);

    const [rows, setRows] = useState([]);
    const [loaded, finishedLoading] = useState(false);
    const [search, setSearch] = useState('');

    const columns = useMemo(() => [
        {
            header: "UUID",
            accessorKey: "uuid",
            cell: props => <>&#35;{props.getValue()}</>
        },
        {
            header: "Name",
            accessorKey: "name",
            cell: props => <p className="bold">{props.getValue()}</p>
        },
        {
            header: "My Share",
            accessorKey: "balance",
            cell: props => <>{props.getValue() + " " + chain.nativeCurrency.symbol}</>
        },
        {
            header: "Total Pot",
            accessorKey: "pot",
            cell: props => <>{props.getValue() + " " + chain.nativeCurrency.symbol}</>
        },
        {
            header: "Address",
            accessorKey: "address"
        }
    ], []);

    const fetchData = async () => {
        let temp = [];
        for(let i = 0; i < ids.length; i++) {
            const id = BigNumber.from(ids[i]).toNumber();
            await readContract({
                address: contractAddress,
                abi: abi,
                functionName: "getShareData",
                args: [id, address]
            }).then((squid) => {
                const newRow = {
                    uuid: id,
                    name: squid[1],
                    balance: formatEther(squid[5]),
                    pot: formatEther(squid[6]),
                    address: squid[0],
                    creator: squid[8]
                }
                temp.push(newRow);
            });
        }
        return temp;
    }

    useInterval(() => {
        if(isSuccess) {
            fetchData().then((res) => {
                console.log(res)
                setRows(res);
            });
        }
    }, 60000)

    useEffect(() => {
        if(isSuccess) {
            fetchData().then((res) => {
                console.log(res)
                setRows(res);
                finishedLoading(true);
            });
        }
    }, [isSuccess]);

    if(isError) {
        console.log(error);
    }

    function filter(arr) {
        try {
            let res = [];
            for(let i = 0; i < arr.length; i++) {
                if(arr[i].uuid.toString().includes(search)) { res.push(arr[i]); continue; }
                if(arr[i].name.includes(search)) { res.push(arr[i]); continue; }
                if(arr[i].pot.toString().includes(search)) { res.push(arr[i]); continue; }
                if(arr[i].address.includes(search)) { res.push(arr[i]); continue; }
            }
            return res;
        } catch (e) {
            console.error(e)
        }
        return arr;
    }

    if(loaded) {
        return(
            <>
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search"
                    className="search-table-input"
                />
                <Table rowData={filter(rows)} columns={columns} title="My Squids"/>
            </>
        );
    }

    return(
        <div className="loading-table">
            {!loaded &&
                <>
                    <img src={loadingGif} alt="" />
                    <p>Retrieving data from blockchain...</p>
                </>
            }
            {isError && <p className="error-txt">Uh oh! Something went wrong</p>}
        </div>
    );
}
import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import { fetchBalance } from "@wagmi/core";
import Modal from "react-modal";
import QRCode from "react-qr-code";
import CloseModal from "../closeModal";
import ChainIcon from "../../chainIcon";
import qrCodeIcon from "../../../assets/vectors/icons/qrcode.svg";
import "./balances.css";

export default function Balances({
    bal,
    totalPot,
    personal = false,
    closeModal,
    token = "",
    fetchToken = false,
    squidAddr = "",
    qrData = {name: "", uuid: ""}
}) {

    const { chain } = useNetwork();
    
    const [balance, setBalance] = useState(bal);
    const [pot, setPot] = useState(totalPot);
    const [symbol, setSymbol] = useState(chain.nativeCurrency.symbol);

    const [qrModalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeQRModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        try {
            if(fetchToken) {
                const fetch = async () => {
                    const res = await fetchBalance({
                        address: squidAddr,
                        token: token
                    })
                    setPot(res.formatted);
                    setSymbol(res.symbol);
                    setBalance("");
                };
                fetch();
            } else {
                setBalance(bal);
                setPot(totalPot);
                setSymbol(chain.nativeCurrency.symbol);
            }
        } catch (e) {
            console.error(e);
        }
    }, [fetchToken])

    return(
        <>
            <div className="balances-container">
                <div
                    onClick={openModal}
                    className="qr-code-icon-container"
                >
                    <img src={qrCodeIcon} alt="Show QR Code" />
                </div>
                <CloseModal closeModal={closeModal} />
                <div className="large-balance">
                    <ChainIcon name={chain.name} />
                    <h3>
                        {personal ? balance : pot + (fetchToken ? " " + symbol : "")}
                    </h3>
                </div>
                <p className="large-balance-label">
                    {personal ? "Personal Balance" : "Total Pot Value"}
                </p>
                <p className="balance-sub-label">
                    {personal ?
                        `Total Pot Value: ${pot} `
                        :
                        `Personal Balance: ` + (balance ? balance + " " : "N/A ")
                    }
                    {balance ? symbol : ""}
                </p>
            </div>
            <Modal
                isOpen={qrModalIsOpen}
                onRequestClose={closeQRModal}
                className="qr-modal"
            >
                <div className="qr-title">
                    <p className="qr-title-name">{qrData.name}</p>
                    <p className="qr-title-id">&#x23;{qrData.uuid}</p>
                </div>
                <QRCode value={squidAddr} className="qr-code"/>
                <div className="qr-address">
                    <p>{squidAddr}</p>
                </div>
            </Modal>
        </>
    )

}
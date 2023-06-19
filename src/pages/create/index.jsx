import { useState } from "react";
import { useNetwork } from "wagmi";
import { SideBar } from "../../components";
import Modal from "react-modal";
import CloseModal from "../../components/modal/closeModal";
import { useWriteContract } from "../../libs/wagmi";

import info from "../../assets/vectors/icons/info.svg";
import minus from "../../assets/vectors/icons/minus.svg";
import cross from "../../assets/vectors/icons/cross.svg";
import "./create.css";

export default function Create() {

    const { chain } = useNetwork();

    // Form
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [shares, setShares] = useState([]);
    const [payeeAddr, setPayeeAddr] = useState('');
    const [payeeShares, setPayeeShares] = useState();
    const [totalShares, setTotalShares] = useState(0);
    const [fee, setFee] = useState("0");
    
    // Errors
    const [nameError, setNameError] = useState();
    const [descError, setDescError] = useState();
    const [addrError, setAddrError] = useState();
    const [shareError, setShareError] = useState();
    const [modalText, setModalText] = useState('');

    // Modal
    const [modalIsOpen, setIsOpen] = useState(false);

    const { writeAsync, isError } = useWriteContract("create", [
        name,
        desc,
        addresses,
        shares,
    ]);

    function remainingCharacters(target) {
        if(target === 'name') {
            if(!name) { return 20; }
            return (20 - name.length);
        } else if (target === 'desc') {
            if(!desc) { return 50; }
            return (50 - desc.length);
        }
        return -1;
    }

    function checkDuplicates() {
        if(addresses.indexOf(payeeAddr) > -1) {
            setModalText('Sorry! You cannot enter the same address twice.');
            openModal();
            return false;
        }
        return true;
    }

    function checkForm() {
        let flag = 0;

        // Check Name
        if(!name || name === '' || name.length > 20) {
            flag++;
            setNameError(" error-input");
        } else setNameError(" ");

        // Check description
        if(desc.length > 50) {
            flag++;
            setDescError(" error-input")
        } else { setDescError(" "); }

        if(flag > 0) return false;

        if(addresses.length === 0 || !checkDuplicates()) {
            setModalText("Please check you have entered the payees correctly!");
            openModal();
            return false;
        }
        return true;
    }

    async function handleSubmit() {
        if(!checkForm()) return;
        if(!writeAsync) return;
        try {
            await writeAsync().then(() => {
                setName("");
                setDesc("");
                setPayeeAddr("");
                setPayeeShares("");
                setTotalShares(0);
                setModalText("Contract creation can be monitored from your wallet.");
                openModal();
            });
        } catch(e) {
            setModalText("Something went wrong? Check you have entered the details correctly.");
            openModal();
        }
    }

    function addPayee() {
        if(!payeeAddr) { setAddrError(" error-input") }
        if(!payeeShares) { setShareError(" error-input") }
        if(!payeeAddr || !payeeShares) return null;
        if(!checkDuplicates()) return null;
        setTotalShares(totalShares + payeeShares);
        setAddresses(addresses => [...addresses, payeeAddr]);
        setShares(shares => [...shares, payeeShares]);
        setAddrError("");
        setShareError("");
        setPayeeAddr("");
        setPayeeShares("");
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return(
        <main>
            <SideBar />
            <div className="view pos-relative">
                <div className="create-container">
                    <h1 className="create-title">Create New Squid</h1>
                    <div className="enter-details-container">
                        <h3 className="sub-heading">Enter Details</h3>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength={20}
                            placeholder="Name*"
                            className={nameError}
                        />
                        <p>{remainingCharacters("name")} / 20</p>
                        <textarea
                            type="text"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            rows={3}
                            maxLength={50}
                            placeholder="Description"
                            className={descError}
                        />
                        <p>{remainingCharacters("desc")} / 50</p>
                    </div>
                    <h3 className="sub-heading vtspace-20">Add Payee</h3>
                    <div className="add-payee-container">
                        <input
                            type="text"
                            value={payeeAddr}
                            placeholder="Wallet Address* (0xFf9...)"
                            onChange={(e) => setPayeeAddr(e.target.value)}
                            className={addrError}
                        />
                        <input
                            type="number"
                            value={payeeShares}
                            placeholder="Shares*"
                            onChange={(e) => setPayeeShares(parseInt(e.target.value))}
                            min={0}
                            className={shareError}
                        />
                        <div className="add-payee-btn" onClick={() => addPayee()}>
                            <img className="add-payee-btn-icon" src={cross} alt="" />
                        </div>
                    </div>
                    <div className="payees-container">
                        <div className="payees-title-container">
                            <h3 className="payees-title-payee sub-heading">Payees</h3>
                            <h3 className="payees-title-share sub-heading">Share</h3>
                            <h3></h3>
                        </div>
                        {addresses.map((addr, index) => {
                            let share = shares[index];
                            return (
                                <div className="payee-row" key={index}>
                                    <p className="payee-row-address">{addr}</p>
                                    <p className="payee-row-shares">{share}</p>
                                    <div
                                        className="remove-btn"
                                        onClick={() => {
                                            setAddresses(addresses.filter((a) => a !== addr));
                                            setShares(shares.filter((s) => s !== share));
                                            setTotalShares(totalShares - parseInt(share))
                                        }}
                                    >
                                        <img
                                            src={minus}
                                            alt="remove"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <p className="create-total-shares">Total Shares: {totalShares}</p>
                    <p className="create-fee-label">Fee: Gas Only</p>
                    <div className="create-btn" onClick={() => handleSubmit()}>
                        <p>Create</p>
                    </div>
                </div>
            </div>
            <Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
                className="modal-fit-content"
            >
                <div className="modal-content bdr-25 ovrflw-hdn">
                    <CloseModal closeModal={closeModal} />
                    <div className="info-text">
				        <div className="alert-header">
                            <div className="alert-icon-container"><img src={info} alt="" /></div>
                            <p>Notice</p>
                        </div>
                        <div className="alert-content">
                            {modalText}
                        </div>
                    </div>
                </div>
			</Modal>
            {isError &&
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="modal-fit-content"
            >
                <div className="modal-content bdr-25 ovrflw-hdn">
                    <CloseModal closeModal={closeModal} />
                    <div className="info-text">
                        <div className="alert-header">
                            <div className="alert-icon-container"><img src={info} alt="" /></div>
                            <p>Notice</p>
                        </div>
                        <div className="alert-content">
                            Oh no! Something went wrong...
                        </div>
                    </div>
                </div>
            </Modal>
            }
        </main>
    );
}
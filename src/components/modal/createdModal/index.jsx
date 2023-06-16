import Balances from "../balances";
import SquidDetails from "../squidDetails";
import GlobalPayout from "../globalpayout";

export default function CreatedModal({ closeModal, data }) {
    
    return (
        <div className="modal-content">
            <Balances bal={data.balance} totalPot={data.pot} closeModal={closeModal}/>
            <div className="w-90 push-center">
                <SquidDetails data={data} />
            </div>
            <GlobalPayout id={data.uuid} />
        </div>
    );
}
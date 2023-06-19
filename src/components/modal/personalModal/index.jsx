import Balances from "../balances";
import SquidDetails from "../squidDetails";
import Withdraw from "../withdraw";

export default function PersonalModal({ closeModal, data }) {

    return(
        <div className="modal-content bg-light-grey">
            <Balances bal={data.balance} totalPot={data.pot} personal={true} closeModal={closeModal}/>
            <div className="w-90 push-center">
                <SquidDetails data={data} />
            </div>
            <Withdraw id={data.uuid} />
        </div>
    );

}
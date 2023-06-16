import cross from "../../../assets/vectors/icons/cross.svg";
import "./closeModal.css";

export default function CloseModal({ closeModal }) {
    
    return(
        <div className="close-modal-container" onClick={closeModal}>
            <img src={cross} alt="close" />
        </div>
    )
}
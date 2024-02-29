import {createPortal} from "react-dom";
import styles from "./Modal.module.css";
import closeIcon from "../../images/icon-close.svg"

const ModalOverlay = (props)=>{
    const  {close, display} = props.control;

    return(
        <>
            <div className={`${styles.layout} ${display ? styles.showLayout : ""}`}></div>
            <div className={`${styles.modal} ${display ? styles.show : ""}`}>
                <img src={closeIcon} className={styles.close} onClick={close} />
                <div className={styles.content}>{props.children}</div>
            </div>
        </>
    )
}

const portal = document.getElementById("overlay");

const Modal = (props)=>{

    return(
        <>
            {createPortal(<ModalOverlay control={props}>{props.children}</ModalOverlay>,portal)}
        </>
    )
};

export default Modal;
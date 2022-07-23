import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

function MsgModal(props) {
    return (
        <Modal
            show={props.modalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>
                    {props.message}
                </h6>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.toggleModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MsgModal;
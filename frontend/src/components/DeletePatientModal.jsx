import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import { deletePatient } from "../api/patients";

export const DeletePatientModal = ({patient, children, onDelete}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return <div>
        {children(onOpen)}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Delete Patient</ModalHeader>
                        <ModalBody>
                            <p>Are you sure you want to delete <b>{patient?.full_name || 'this patient'}</b>? This action cannot be undone.</p>
                            <p>If you proceed, all information related to this patient will be permanently removed.</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="danger" onPress={async () => {
                                await deletePatient(patient.id);
                                if (onDelete) onDelete();
                                onClose();
                            }}>
                                Yes, Delete Patient
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </div>
}
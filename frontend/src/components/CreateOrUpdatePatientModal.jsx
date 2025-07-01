import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Select,
    SelectItem,
} from "@heroui/react";
import {useState, useEffect} from "react";
import {createPatient, updatePatient} from "../api/patients";

export const CreateOrUpdatePatientModal = ({patient, children, onSuccess}) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const isUpdate = !!patient;

    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        dob: '',
        status: 'Inquiry',
        address_street: '',
        address_city: '',
        address_state: '',
        address_zip_code: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const statusOptions = [
        {key: 'Inquiry', label: 'Inquiry'},
        {key: 'Onboarding', label: 'Onboarding'},
        {key: 'Active', label: 'Active'},
        {key: 'Churned', label: 'Churned'},
    ];

    useEffect(() => {
        if (patient) {
            setFormData({
                first_name: patient.first_name || '',
                middle_name: patient.middle_name || '',
                last_name: patient.last_name || '',
                dob: patient.dob ? new Date(patient.dob).toISOString().split('T')[0] : '',
                status: patient.status || 'Inquiry',
                address_street: patient.address_street || '',
                address_city: patient.address_city || '',
                address_state: patient.address_state || '',
                address_zip_code: patient.address_zip_code || '',
            });
        } else {
            setFormData({
                first_name: '',
                middle_name: '',
                last_name: '',
                dob: '',
                status: 'Inquiry',
                address_street: '',
                address_city: '',
                address_state: '',
                address_zip_code: '',
            });
        }
        // Clear errors when patient changes
        setErrors({});
    }, [patient]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }));
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setErrors({});

        try {
            if (isUpdate) {
                await updatePatient(patient.id, formData);
            } else {
                await createPatient(formData);
            }

            if (onSuccess) onSuccess();
            onOpenChange(false);
        } catch (error) {
            console.error('Error:', error);

            // Handle Django validation errors
            if (error.validationErrors) {
                setErrors(error.validationErrors);
            } else {
                // Show general error
                setErrors({general: error.message || 'An error occurred. Please try again.'});
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            {children(onOpen)}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" scrollBehavior={'outside'}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {isUpdate ? 'Update Patient' : 'Create New Patient'}
                            </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-1 gap-4">
                                    <Input
                                        label="First Name"
                                        placeholder="Enter first name"
                                        value={formData.first_name}
                                        onChange={(e) => handleInputChange('first_name', e.target.value)}
                                        isRequired
                                        isInvalid={!!errors.first_name}
                                        errorMessage={errors.first_name}
                                    />

                                    <Input
                                        label="Middle Name"
                                        placeholder="Enter middle name (optional)"
                                        value={formData.middle_name}
                                        onChange={(e) => handleInputChange('middle_name', e.target.value)}
                                        isInvalid={!!errors.middle_name}
                                        errorMessage={errors.middle_name}
                                    />

                                    <Input
                                        label="Last Name"
                                        placeholder="Enter last name"
                                        value={formData.last_name}
                                        onChange={(e) => handleInputChange('last_name', e.target.value)}
                                        isRequired
                                        isInvalid={!!errors.last_name}
                                        errorMessage={errors.last_name}
                                    />

                                    <Input
                                        label="Date of Birth"
                                        type="date"
                                        value={formData.dob}
                                        onChange={(e) => handleInputChange('dob', e.target.value)}
                                        isRequired
                                        isInvalid={!!errors.dob}
                                        errorMessage={errors.dob}
                                    />

                                    <Select
                                        label="Status"
                                        placeholder="Select status"
                                        selectedKeys={[formData.status]}
                                        onChange={(e) => handleInputChange('status', e.target.value)}
                                        isRequired
                                        isInvalid={!!errors.status}
                                        errorMessage={errors.status}
                                    >
                                        {statusOptions.map((status) => (
                                            <SelectItem key={status.key} value={status.key}>
                                                {status.label}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <Input
                                        label="Street Address"
                                        placeholder="Enter street address"
                                        value={formData.address_street}
                                        onChange={(e) => handleInputChange('address_street', e.target.value)}
                                        isRequired
                                        isInvalid={!!errors.address_street}
                                        errorMessage={errors.address_street}
                                    />

                                    <Input
                                        label="City"
                                        placeholder="Enter city"
                                        value={formData.address_city}
                                        onChange={(e) => handleInputChange('address_city', e.target.value)}
                                        isRequired
                                        isInvalid={!!errors.address_city}
                                        errorMessage={errors.address_city}
                                    />

                                    <Input
                                        label="State"
                                        placeholder="Enter state"
                                        value={formData.address_state}
                                        onChange={(e) => handleInputChange('address_state', e.target.value)}
                                        isRequired
                                        isInvalid={!!errors.address_state}
                                        errorMessage={errors.address_state}
                                    />

                                    <Input
                                        label="Zip Code"
                                        placeholder="Enter zip code"
                                        value={formData.address_zip_code}
                                        onChange={(e) => handleInputChange('address_zip_code', e.target.value)}
                                        isRequired
                                        isInvalid={!!errors.address_zip_code}
                                        errorMessage={errors.address_zip_code}
                                    />
                                </div>

                                {/* General error message */}
                                {errors.general && (
                                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-600 text-sm">{errors.general}</p>
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" variant="light" onPress={onClose} isDisabled={isSubmitting}>
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={handleSubmit}
                                    isLoading={isSubmitting}
                                    isDisabled={isSubmitting}
                                >
                                    {isUpdate ? 'Update Patient' : 'Create Patient'}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}; 
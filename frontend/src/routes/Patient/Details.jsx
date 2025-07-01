import {useNavigate, useParams} from "react-router-dom";
import {useFetchPatient} from "../../api/patients.jsx";
import {HeaderTitle, HeaderActions, HeaderSubtitle} from "../../layout/Header.jsx";
import {Pencil, Plus, Trash2, User, Calendar, MapPin, Home, Building, Map, Hash, FileText, Heart} from "lucide-react";
import {Button} from "@heroui/react";
import {DeletePatientModal} from "../../components/DeletePatientModal.jsx";
import {CreateOrUpdatePatientModal} from "../../components/CreateOrUpdatePatientModal.jsx";
import {PatientStatus} from "./Index.jsx";

const PatientDetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3 p-4 rounded-xl border-1 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900">
        <div className="flex-shrink-0">
            <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</p>
            <p className="text-base text-gray-900 dark:text-gray-100 font-medium">
                {value ? value : <span className="text-gray-400 dark:text-gray-500 italic">Not provided</span>}
            </p>
        </div>
    </div>
);

function PatientDetails() {
    const {pk} = useParams()
    const {data, isLoading, error} = useFetchPatient(pk)
    let navigate = useNavigate();

    return <>
        {/* Fill header portals */}
        <HeaderTitle>Patient Details</HeaderTitle>
        <HeaderSubtitle>{data?.full_name ? `Viewing details for ${data.full_name}` : 'Loading patient information...'}</HeaderSubtitle>
        <HeaderActions>
            <div className="flex items-center gap-3">
                <CreateOrUpdatePatientModal patient={data}>
                    {onOpen => <Button 
                        color={'primary'} 
                        startContent={<Pencil className="h-4 w-4"/>} 
                        aria-label="Edit Patient"
                        onPress={onOpen}
                        size="md"
                    >
                        Edit Patient
                    </Button>}
                </CreateOrUpdatePatientModal>
                <DeletePatientModal patient={data} onDelete={() => navigate('/')}>
                    {onOpen => <Button 
                        color={'danger'} 
                        startContent={<Trash2 className="h-4 w-4"/>}
                        aria-label="Delete Patient"
                        onPress={onOpen}
                        size="md"
                    >
                        Delete Patient
                    </Button>}
                </DeletePatientModal>
            </div>
        </HeaderActions>
        
        <div className="w-full p-8 bg-gray-50 dark:bg-gray-900/50">
            {!isLoading && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <PatientDetailItem icon={User} label="Full Name" value={data?.full_name} />
                    <PatientDetailItem icon={Calendar} label="Date of Birth" value={data?.dob ? new Date(data.dob).toDateString() : null} />
                    <PatientDetailItem icon={Heart} label="Status" value={<PatientStatus patient={data} />} />
                    <PatientDetailItem icon={MapPin} label="Full Address" value={data?.full_address} />
                </div>
            )}
        </div>
    </>
}

export default PatientDetails

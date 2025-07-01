import {useState} from "react";
import {useFetchPatients} from "../../api/patients.jsx";
import {Pencil, Plus, Search, Trash2} from "lucide-react";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/table";
import {Button, Chip, Input, Tooltip, Skeleton, Spinner} from "@heroui/react";
import {NavLink} from "react-router-dom";
import {HeaderTitle, HeaderActions, HeaderSubtitle} from "../../layout/Header.jsx";
import {DeletePatientModal} from "../../components/DeletePatientModal.jsx";
import {CreateOrUpdatePatientModal} from "../../components/CreateOrUpdatePatientModal.jsx";
import {AdvancedSearchFilter} from "../../components/AdvancedSearchFilter.jsx";


export const PatientStatus = ({patient}) => {
    return <Chip variant={'flat'} color={{
        'Inquiry': 'warning',
        'Onboarding': 'primary',
        'Active': 'success',
        'Churned': 'default',
    }[patient.status]}>{patient.status}</Chip>
}

function Index() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        dob: '',
        status: '',
        address_street: '',
        address_city: '',
        address_state: '',
        address_zip_code: ''
    })

    const {data, isLoading, error} = useFetchPatients(searchQuery, filters)

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const clearFilters = () => {
        setFilters({
            first_name: '',
            middle_name: '',
            last_name: '',
            dob: '',
            status: '',
            address_street: '',
            address_city: '',
            address_state: '',
            address_zip_code: ''
        })
    }

    console.log(data)
    return <div>
        <HeaderTitle>Dashboard</HeaderTitle>
        <HeaderSubtitle>Manage and track patient information</HeaderSubtitle>
        <HeaderActions>
            <div className="flex items-center gap-4">
                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[22rem] h-11",
                        mainWrapper: "h-full",
                        input: "text-sm",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-50 dark:bg-default-100/20 border-default-200 dark:border-default-700",
                    }}
                    placeholder="Search patients..."
                    size="md"
                    startContent={<Search className="h-4 w-4 text-default-400"/>}
                    type="search"
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    variant="bordered"
                />

                <AdvancedSearchFilter
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={clearFilters}
                />

                <CreateOrUpdatePatientModal>
                    {onOpen => <Button
                        color={'primary'}
                        startContent={<Plus className="h-4 w-4"/>}
                        aria-label="Create Patient"
                        onPress={onOpen}
                        size="md"
                    >
                        Create Patient
                    </Button>}
                </CreateOrUpdatePatientModal>
            </div>
        </HeaderActions>

        <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900/50">
            <Table aria-label="Patients List" classNames={{
                wrapper: 'shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 p-0',
                td: 'p-0',
                th: 'py-4 px-6 bg-gray-50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 font-semibold text-sm',
                tr: 'border-b border-gray-100 dark:border-gray-800 last:border-b-0'
            }}>
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>DATE OF BIRTH</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ADDRESS</TableColumn>
                    <TableColumn></TableColumn>
                </TableHeader>
                <TableBody isLoading={isLoading} loadingContent={<Spinner className={'pt-10'}/>} emptyContent={"No rows to display."}>
                    {(data ?? []).map(patient => (
                        <TableRow key={patient.id} className="hover:bg-gray-50 hover:dark:bg-gray-800/50 active:bg-gray-100 active:dark:bg-gray-700/50 transition-colors duration-200 cursor-pointer group">
                            <TableCell>
                                <NavLink to={`/patient/${patient.id}`} className="block p-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 font-medium text-gray-900 dark:text-gray-100">
                                    {patient.full_name}
                                </NavLink>
                            </TableCell>
                            <TableCell>
                                <NavLink to={`/patient/${patient.id}`} className="block p-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 text-gray-600 dark:text-gray-400">
                                    {new Date(patient.dob).toDateString()}
                                </NavLink>
                            </TableCell>
                            <TableCell>
                                <NavLink to={`/patient/${patient.id}`} className="block p-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                                    <PatientStatus patient={patient}/>
                                </NavLink>
                            </TableCell>
                            <TableCell>
                                <NavLink to={`/patient/${patient.id}`} className="block p-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 text-gray-600 dark:text-gray-400">
                                    {patient.full_address}
                                </NavLink>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-end p-4">
                                    <div className="flex items-center space-x-1">
                                        <Tooltip content="Edit patient">
                                            <CreateOrUpdatePatientModal patient={patient}>
                                                {onOpen => <Button isIconOnly variant={'light'} size="sm" className="text-gray-800 hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-200" aria-label="Edit patient" onPress={onOpen}>
                                                    <Pencil size={16}/>
                                                </Button>}
                                            </CreateOrUpdatePatientModal>
                                        </Tooltip>
                                        <Tooltip content="Delete patient">
                                            <DeletePatientModal patient={patient} onDelete={() => null}>
                                                {onOpen =>
                                                    <Button isIconOnly variant={'light'} size="sm" className="text-gray-800 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400" aria-label="Delete patient" onPress={onOpen}>
                                                        <Trash2 size={16}/>
                                                    </Button>}
                                            </DeletePatientModal>
                                        </Tooltip>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </div>


}

export default Index

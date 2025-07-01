import { useState } from "react";
import { Button, Chip, Input, Popover, PopoverContent, PopoverTrigger, Select, SelectItem } from "@heroui/react";
import { Filter, X } from "lucide-react";

export const AdvancedSearchFilter = ({ filters, onFilterChange, onClearFilters }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [localFilters, setLocalFilters] = useState(filters);
    
    const statusOptions = [
        {key: 'Inquiry', label: 'Inquiry'},
        {key: 'Onboarding', label: 'Onboarding'},
        {key: 'Active', label: 'Active'},
        {key: 'Churned', label: 'Churned'},
    ];

    const handleLocalFilterChange = (field, value) => {
        setLocalFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleApplyFilters = () => {
        // Apply all filters at once
        Object.keys(localFilters).forEach(field => {
            onFilterChange(field, localFilters[field]);
        });
        setIsPopoverOpen(false);
    };

    const handleClearFilters = () => {
        setLocalFilters({
            first_name: '',
            middle_name: '',
            last_name: '',
            dob: '',
            status: '',
            address_street: '',
            address_city: '',
            address_state: '',
            address_zip_code: ''
        });
        onClearFilters();
        setIsPopoverOpen(false);
    };

    const hasActiveFilters = Object.values(filters).some(value => value !== '');

    return (
        <Popover 
            isOpen={isPopoverOpen} 
            onOpenChange={setIsPopoverOpen}
            placement="bottom-end"
            offset={10}
            isDismissable={false}
            shouldCloseOnScroll={false}
        >
            <PopoverTrigger>
                <Button
                    variant={"solid"}
                    color={"primary"}
                    size={'md'}
                    startContent={<Filter className="h-4 w-4" />}
                    className="shrink-0"
                >
                    Advanced Search
                    {hasActiveFilters && (
                        <Chip size="sm" variant="solid" color="danger" className="ml-2 text-white font-bold shadow-md">
                            {Object.values(filters).filter(v => v !== '').length}
                        </Chip>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0">
                <div className="flex items-center justify-between w-full p-4 pb-0">
                    <h4 className="font-semibold text-lg">Advanced Search</h4>
                    <div className="flex items-center gap-2">
                        {hasActiveFilters && (
                            <Button
                                size="sm"
                                variant="light"
                                color="danger"
                                onPress={handleClearFilters}
                                startContent={<X className="h-3 w-3"/>}
                            >
                                Clear All
                            </Button>
                        )}
                        <Button
                            size="sm"
                            variant="light"
                            isIconOnly
                            onPress={() => setIsPopoverOpen(false)}
                        >
                            <X className="h-4 w-4"/>
                        </Button>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4 p-4 max-h-[80vh] overflow-y-auto">

                    <div className="grid grid-cols-1 gap-3">
                        <Input
                            label="First Name"
                            value={localFilters.first_name}
                            onValueChange={(value) => handleLocalFilterChange('first_name', value)}
                            size="sm"
                        />

                        <Input
                            label="Middle Name"
                            value={localFilters.middle_name}
                            onValueChange={(value) => handleLocalFilterChange('middle_name', value)}
                            size="sm"
                        />

                        <Input
                            label="Last Name"
                            value={localFilters.last_name}
                            onValueChange={(value) => handleLocalFilterChange('last_name', value)}
                            size="sm"
                        />

                        <Input
                            label="Date of Birth"
                            type="date"
                            value={localFilters.dob}
                            onValueChange={(value) => handleLocalFilterChange('dob', value)}
                            size="sm"
                        />

                        <Select
                            label="Status"
                            selectedKeys={localFilters.status ? [localFilters.status] : []}
                            onSelectionChange={(keys) => {
                                const selectedKey = Array.from(keys)[0] || ''
                                handleLocalFilterChange('status', selectedKey)
                            }}
                            size="sm"
                        >
                            {statusOptions.map((status) => (
                                <SelectItem key={status.key} value={status.key}>
                                    {status.label}
                                </SelectItem>
                            ))}
                        </Select>

                        <Input
                            label="Street Address"
                            value={localFilters.address_street}
                            onValueChange={(value) => handleLocalFilterChange('address_street', value)}
                            size="sm"
                        />

                        <Input
                            label="City"
                            value={localFilters.address_city}
                            onValueChange={(value) => handleLocalFilterChange('address_city', value)}
                            size="sm"
                        />

                        <Input
                            label="State"
                            value={localFilters.address_state}
                            onValueChange={(value) => handleLocalFilterChange('address_state', value)}
                            size="sm"
                        />

                        <Input
                            label="Zip Code"
                            value={localFilters.address_zip_code}
                            onValueChange={(value) => handleLocalFilterChange('address_zip_code', value)}
                            size="sm"
                        />
                    </div>

                </div>

                <div className="w-full p-4 flex justify-end pt-2">
                    <Button
                        color="primary"
                        variant="solid"
                        startContent={<Filter className="h-4 w-4"/>}
                        onPress={handleApplyFilters}
                        fullWidth
                    >
                        Apply Filters
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}; 
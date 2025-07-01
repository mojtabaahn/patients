import useSWR, {mutate} from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const base_url = 'http://localhost:8000'

export const useFetchPatients = (searchQuery = '', filters = {}) => {
    // Build query parameters
    const params = new URLSearchParams()
    
    // Add search query if provided
    if (searchQuery) {
        params.append('search', searchQuery)
    }
    
    // Map filter keys to Django Filter parameter names
    const filterMapping = {
        'first_name': 'first_name__icontains',
        'middle_name': 'middle_name__icontains',
        'last_name': 'last_name__icontains',
        'dob': 'dob', // exact match for dates
        'status': 'status__icontains',
        'address_street': 'address_street__icontains',
        'address_city': 'address_city__icontains',
        'address_state': 'address_state__icontains',
        'address_zip_code': 'address_zip_code__icontains'
    }
    
    // Add individual field filters if provided
    Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== '') {
            const filterKey = filterMapping[key] || key
            params.append(filterKey, value)
        }
    })
    
    const queryString = params.toString()
    const url = `${base_url}/api/patients/${queryString ? `?${queryString}` : ''}`
    
    return useSWR(url, fetcher)
}

export const useFetchPatient = (pk) => {
    return useSWR(`${base_url}/api/patients/${pk}/`, fetcher)
}

export const revalidatePatients = () => {
    mutate(key => key.startsWith(`${base_url}/api/patients`), undefined, {revalidate: true})
}

export const deletePatient = async (pk) => {
    const response = await fetch(`${base_url}/api/patients/${pk}/`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete patient');
    }
    revalidatePatients()
    return true;
}

export const createPatient = async (patientData) => {
    const response = await fetch(`${base_url}/api/patients/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        // Return validation errors if they exist
        if (response.status === 400 && data) {
            throw { validationErrors: data };
        }
        throw new Error('Failed to create patient');
    }
    
    revalidatePatients()
    return data;
}

export const updatePatient = async (pk, patientData) => {
    const response = await fetch(`${base_url}/api/patients/${pk}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        // Return validation errors if they exist
        if (response.status === 400 && data) {
            throw { validationErrors: data };
        }
        throw new Error('Failed to update patient');
    }
    
    revalidatePatients()
    return data;
}

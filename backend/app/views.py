import time
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

from app import serializers, models


# Create your views here.

class PatientViewSet(viewsets.ModelViewSet):
    queryset = models.Patient.objects.all()
    serializer_class = serializers.PatientSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    
    filterset_fields = {
        'first_name': ['icontains'],
        'middle_name': ['icontains'], 
        'last_name': ['icontains'],
        'dob': ['exact'],
        'status': ['icontains'],
        'address_street': ['icontains'],
        'address_city': ['icontains'],
        'address_state': ['icontains'],
        'address_zip_code': ['icontains']
    }
    
    search_fields = [
        'first_name',
        'middle_name',
        'last_name', 
        'status',
        'address_street',
        'address_city',
        'address_state',
        'address_zip_code'
    ]
    
    def dispatch(self, request, *args, **kwargs):
        # Add 1 second delay for testing frontend loading states
        time.sleep(1)
        return super().dispatch(request, *args, **kwargs)

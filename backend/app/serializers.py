from rest_framework import serializers

from app import models


class PatientSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(read_only=True)
    full_address = serializers.CharField(read_only=True)

    class Meta:
        model = models.Patient
        exclude = []
        read_only_fields = ['id']

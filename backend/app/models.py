import random
from datetime import date

from django.db import models


class Patient(models.Model):
    id = models.IntegerField(primary_key=True)
    first_name = models.CharField(max_length=200)
    middle_name = models.CharField(max_length=200, null=True, blank=True)
    last_name = models.CharField(max_length=200)
    dob = models.DateField()
    status = models.CharField(
        choices=(
            ('Inquiry', 'Inquiry'),
            ('Onboarding', 'Onboarding'),
            ('Active', 'Active'),
            ('Churned', 'Churned'),
        ),
        max_length=100
    )
    address_street = models.CharField(max_length=100)
    address_city = models.CharField(max_length=100)
    address_state = models.CharField(max_length=100)
    address_zip_code = models.CharField(max_length=100)

    @property
    def full_name(self):
        return f"{self.first_name}{' ' + self.middle_name if self.middle_name else ''} {self.last_name}"

    @property
    def full_address(self):
        return f"{self.address_street}, {self.address_city}, {self.address_state} {self.address_zip_code}"

    @staticmethod
    def generate(num=10):
        first_names = ["John", "Jane", "Alice", "Bob", "Mike", "Sara", "Tom", "Lily", "Max", "Eva"]
        last_names = ["Smith", "Doe", "Brown", "Wilson", "Taylor", "Lee", "Clark", "Hall", "Young", "King"]
        statuses = ['Inquiry', 'Onboarding', 'Active', 'Churned']

        for i in range(num):
            Patient.objects.create(
                first_name=first_names[i],
                middle_name=None,
                last_name=last_names[i],
                dob=date(1990 + i, 1, 1),
                status=random.choice(statuses),
                address_street=f"{i + 1} Main St",
                address_city="Cityville",
                address_state="StateX",
                address_zip_code=f"1000{i}"
            )

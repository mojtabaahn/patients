from django.core.management.base import BaseCommand
from app.models import Patient


class Command(BaseCommand):
    help = 'Generate sample patient data'

    def add_arguments(self, parser):
        parser.add_argument(
            '--num',
            type=int,
            default=10,
            help='Number of patients to generate (default: 10)'
        )

    def handle(self, *args, **options):
        num_patients = options['num']
        
        self.stdout.write(
            self.style.SUCCESS(f'Generating {num_patients} sample patients...')
        )
        
        try:
            Patient.generate(num=num_patients)
            self.stdout.write(
                self.style.SUCCESS(f'Successfully generated {num_patients} patients!')
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Error generating patients: {str(e)}')
            ) 
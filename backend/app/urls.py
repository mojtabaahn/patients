from rest_framework import routers

from app import views

router = routers.DefaultRouter()
router.register(r'api/patients', views.PatientViewSet)

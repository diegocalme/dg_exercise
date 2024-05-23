from api.serializers import PeopleSerializer
from models.models import People
from rest_framework import viewsets

class PeopleViewSet(viewsets.ModelViewSet):
  queryset = People.objects.all()
  serializer_class = PeopleSerializer

from models.models import People
from rest_framework import serializers

class PeopleSerializer(serializers.ModelSerializer):
  class Meta:
    model = People
    fields = ['id', 'first_name', 'last_name', 'age', 'address']

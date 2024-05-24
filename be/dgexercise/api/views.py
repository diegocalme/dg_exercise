from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
import csv
from segno import make_qr
import uuid

from api.models import People
from api.serializers import PeopleSerializer

# Create your views here.
class PeopleViewSet(viewsets.ModelViewSet):
  queryset = People.objects.all()
  serializer_class = PeopleSerializer
  # parser_classes = [FileUploadParser]

  def create(self, request):
    uploaded_file = request.data.get('csv')

    print(uploaded_file)

    if not uploaded_file:
      return Response({'success': False}, status=status.HTTP_400_BAD_REQUEST)

    csv_data = uploaded_file.read().decode('utf-8').split('\n')

    return self.create_many_with_csv(csv_data)

  def create_many_with_csv(self, csv_data):
    reader = csv.reader(csv_data, quotechar="\"", delimiter=",")

    people_to_create = []

    next(reader)

    for row in reader:
      id = uuid.uuid4()

      qrcode = make_qr(str(id)).svg_data_uri()

      people_to_create.append({
        'id': str(id),
        'first_name': row[0],
        'last_name': row[1],
        'age': row[2],
        'address': row[3],
        'qrcode': qrcode
      })

    serializer = self.get_serializer(data=people_to_create,many=True)

    serializer.is_valid(raise_exception=True)

    data = serializer.save()

    return Response(people_to_create, status=status.HTTP_201_CREATED)

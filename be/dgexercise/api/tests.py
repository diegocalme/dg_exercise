import json
from django.test import TestCase
from rest_framework.test import APITestCase, APIRequestFactory
from rest_framework import status
from api.models import People
from uuid import uuid4
from django.core.files.uploadedfile import SimpleUploadedFile

factory = APIRequestFactory()

raw_csv_data = b'firstName,lastName,age,address\nDee,Watson,32,"490 Vineyard Drive, Mayfield Heights, Ohio, 44124"\nCharlene,Gilliam,66,"4536 Emerson Road, Boyce, Louisiana, 71409"\nMarc,Butcher,62,"1835 Ash Street, Dallas, Texas, 75204"\nRichard,Sutherland,46,"882 Hart Street, New Milford, Connecticut, 06776"\nLinda,Reece,38,"1059 Maple Lane, Birmingham, Alabama, 35222"\nMichael,Jackson,65,"2567 Taylor Street, New York, New York, 10007"\nFrank,Parks,37,"1315 Retreat Avenue, Birmingham, Alabama, 35203"\nCharles,Jenkins,41,"4340 Goldcliff Circle, Washington, Washington DC, 20200"\nJean,Brooks,30,"1808 Paradise Lane, Santa Ana, California, 92705"\nRobert,Catalano,56,"957 Sun Valley Road, Portland, Washington, 97209"';

# Create your tests here.
class PeopleViewSetTestCase(APITestCase):
  def setUp(self):
    self.person = People.objects.create(
      id=uuid4(),
      first_name='Tyler',
      last_name='Dog',
      age=10,
      address='home',
      qrcode='qrcode'
    )
  
  def test_create_many_from_csv(self):
    mock_file = SimpleUploadedFile(
      name='test.csv', content=raw_csv_data, content_type='text/csv'
    )

    request = factory.post(
      '/api/people', 
      json.dumps({'csv':mock_file}),
    )

    response = self.client.post(request)

    self.assertEqual(response.status.code, status.HTTP_201_CREATED)


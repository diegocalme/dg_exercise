from django.db import models

# Create your models here.
class People(models.Model):
    id = models.UUIDField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    age = models.IntegerField()
    address = models.TextField()
    qrcode = models.TextField()
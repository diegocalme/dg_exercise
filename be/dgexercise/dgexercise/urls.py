from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.views import PeopleViewSet

router = DefaultRouter(trailing_slash=False)

router.register(r'people', PeopleViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

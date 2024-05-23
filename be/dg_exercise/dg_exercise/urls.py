from django.contrib import admin
from django.urls import include, path
from api.views import PeopleViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'people', PeopleViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

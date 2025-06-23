from django.urls import path
from .views import *

urlpatterns = [
    path('login/', login, name = 'resc_login'),
    path('insights/', insights, name = 'resc_insights'),
    path('under_development/', under_development, name = 'under_development'),
    
]
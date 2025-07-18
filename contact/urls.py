from django.urls import path, include
from .views import *

urlpatterns = [
    path('contact/', contact, name='contact'),
    path('faq/', faq, name='faq'),
    path('cookie_policy/', cookie_policy, name='cookie_policy'),
    path('privacy_policy/', privacy_policy, name='privacy_policy'),
    path('terms_conditions/', terms_conditions, name='terms_conditions'),
    
]
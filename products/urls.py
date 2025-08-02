from django.urls import path, include
from .views import *

urlpatterns = [
    path('axiom/', axiom, name='product_axiom'),
    path('edusphere/', edusphere, name='product_edusphere'),
    path('genesis/', genesis, name='product_genesis'),
    path('solutions/', solutions, name='solutions_all'),
    path('genesis/genesis_stu_reg/', Genesis_stu_reg, name='genesis_stu_reg'),
    path('genesis/genesis_stu_booking/', Genesis_stu_booking, name='genesis_stu_booking')
]
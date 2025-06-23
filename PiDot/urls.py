from django.urls import path, include
from .views import *
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('about/', about, name='PiDot_about'),
    path('careers/', careers, name='PiDot_careers'),
    path('leadership/', leadership, name='PiDot_leadership'),
    path('newsroom/', newsroom, name='PiDot_newsroom'),
    path('careers_register/', careers_register, name='PiDot_careers_register'),
    
    

    path('careers/', careers, name='careers'),
    path('careers/<slug:slug>/', job_description_view, name='job_description'),
    # path('secret/', secret_admin_view, name='secret_page'),
    # path('secret/download/<str:file_type>/', download_template, name='download_template'),

    path('admin/secret/', secret_admin_view, name='secret_page'),
    path('admin/download/<str:file_type>/', download_data, name='download_data'),

    path('secret/add-role/', add_role, name='add_role'),
    path('secret/edit-role/<int:pk>/', edit_role, name='edit_role'),
    path('secret/delete-role/<int:pk>/', delete_role, name='delete_role'),

    path('secret/add-description/', add_description, name='add_description'),
    path('secret/edit-description/<int:pk>/', edit_description, name='edit_description'),
    path('secret/delete-description/<int:pk>/', delete_description, name='delete_description'),

    path('accounts/login/', auth_views.LoginView.as_view(), name='login'),


]
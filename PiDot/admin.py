from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import ActiveRole, JobDescription


@admin.register(ActiveRole)
class ActiveRoleAdmin(admin.ModelAdmin):
    list_display = ('job_id', 'job_title', 'date_posted', 'job_location', 'job_type', 'status')
    list_filter = ('status', 'job_type', 'job_location', 'date_posted')
    search_fields = ('job_id', 'job_title', 'product_or_service', 'job_location')
    prepopulated_fields = {'slug': ('job_title',)}
    ordering = ('-date_posted',)


@admin.register(JobDescription)
class JobDescriptionAdmin(admin.ModelAdmin):
    list_display = ('job', 'team')
    search_fields = ('job__job_title', 'team')

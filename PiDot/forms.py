from django import forms

class CSVUploadForm(forms.Form):
    active_roles_file = forms.FileField(required=False, label="Upload Active Roles CSV")
    job_descriptions_file = forms.FileField(required=False, label="Upload Job Descriptions CSV")


from .models import ActiveRole, JobDescription

class ActiveRoleForm(forms.ModelForm):
    class Meta:
        model = ActiveRole
        fields = '__all__'

class JobDescriptionForm(forms.ModelForm):
    class Meta:
        model = JobDescription
        fields = '__all__'

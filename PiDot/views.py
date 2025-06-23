import csv, io
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.admin.views.decorators import staff_member_required
from django.http import HttpResponse
from .models import ActiveRole, JobDescription
from .forms import CSVUploadForm
from django.contrib.auth.models import User
from django.contrib import messages


# Static Pages
def index(request):
    return render(request, 'index.html')

def about(request):
    return render(request, 'PiDot/About.html')

def leadership(request):
    return render(request, 'PiDot/leadership.html')

def newsroom(request):
    return render(request, 'PiDot/Newsroom.html')

# Careers Page (List all active jobs)
def careers(request):
    jobs = ActiveRole.objects.filter(status='Active')
    departments = ActiveRole.objects.exclude(department__isnull=True).exclude(department__exact='').values_list('department', flat=True).distinct()
    locations = ActiveRole.objects.exclude(job_location__isnull=True).exclude(job_location__exact='').values_list('job_location', flat=True).distinct()

    return render(request, 'PiDot/Careers.html', {
        'jobs': jobs,
        'departments': departments,
        'locations': locations,
    })


def careers_register(request):
    return render(request, 'PiDot/Careers_register.html')

# Job Description Page (slug-based routing)
def job_description_view(request, slug):
    job = get_object_or_404(ActiveRole, slug=slug)
    try:
        description = JobDescription.objects.get(job=job)
        # Convert requirements string to list
        requirements_list = [req.strip() for req in description.requirements.split('\n') if req.strip()]
        nice_to_have_list = [item.strip() for item in description.nice_to_have.split('\n') if item.strip()]
        responsibilities_list = [item.strip() for item in description.responsibilities.split('\n') if item.strip()]
    except JobDescription.DoesNotExist:
        description = None
        requirements_list = []
        nice_to_have_list = []
        responsibilities_list = []

    similar_jobs = job.get_similar_jobs()
    print("Similar jobs in view:", similar_jobs)

    return render(request, 'PiDot/Job_description.html', {
        'job': job,
        'description': description,
        'requirements_list': requirements_list,
        'nice_to_have_list': nice_to_have_list,
        'responsibilities_list': responsibilities_list,
        'jobs': similar_jobs
    })
    # return render(request, 'PiDot/Job_description.html', {'job': job})


# Admin-only upload view for CSVs
from django.contrib.auth.models import User
from django.contrib import messages

@staff_member_required
def secret_admin_view(request):
    context = {}
    form = CSVUploadForm()

    if request.method == 'POST':
        form = CSVUploadForm(request.POST, request.FILES)
        if form.is_valid():
            # Delete old data first
            if form.cleaned_data['active_roles_file']:
                ActiveRole.objects.all().delete()

            if form.cleaned_data['job_descriptions_file']:
                JobDescription.objects.all().delete()

            # Re-upload new Active Roles
            if form.cleaned_data['active_roles_file']:
                file = io.TextIOWrapper(form.cleaned_data['active_roles_file'].file, encoding='windows-1252')
                reader = csv.DictReader(file)
                for row in reader:
                    ActiveRole.objects.update_or_create(
                        job_id=row['job_id'],
                        defaults={
                            'job_title': row['job_title'],
                            'slug': row['slug'],
                            'date_posted': row['date_posted'],
                            'product_or_service': row['product/service'],
                            'job_location': row['job_location'],
                            'job_type': row['job_type'],
                            'sal': row['sal'],
                            'basic_qualification': row['Basic_qualification'],
                            'status': row['Active/inactive'],
                            'department': row['department'],
                        }
                    )

            # Re-upload new Job Descriptions
            if form.cleaned_data['job_descriptions_file']:
                file = io.TextIOWrapper(form.cleaned_data['job_descriptions_file'].file, encoding='windows-1252')
                reader = csv.DictReader(file)
                for row in reader:
                    job = ActiveRole.objects.filter(job_id=row['job_id']).first()
                    if job:
                        JobDescription.objects.update_or_create(
                            job=job,
                            defaults={
                                'job_roles': row['job_roles'],
                                'about_role': row['about_role'],
                                'requirements': '\n'.join([item.strip() for item in row['requirements'].split(',') if item.strip()]),
                                'nice_to_have': '\n'.join([item.strip() for item in row['nice_to_have'].split(',') if item.strip()]),
                                'responsibilities': '\n'.join([item.strip() for item in row['responsibilities'].split(',') if item.strip()]),
                                'team': row['team']
                            }
                        )

            messages.success(request, "Data uploaded and replaced successfully.")
            return redirect('secret_page')

    # Display existing records
    roles = ActiveRole.objects.all()
    descriptions = JobDescription.objects.all()
    context['form'] = form
    context['roles'] = roles
    context['descriptions'] = descriptions
    return render(request, 'PiDot/secret.html', context)


@staff_member_required
def download_data(request, file_type):
    response = HttpResponse(content_type='text/csv')

    if file_type == 'active_roles':
        response['Content-Disposition'] = 'attachment; filename="active_roles_data.csv"'
        writer = csv.writer(response)
        writer.writerow([
            'job_id', 'job_title', 'slug', 'date_posted', 'product/service',
            'job_location', 'job_type', 'sal', 'Basic_qualification', 'Active/inactive', 'department',
        ])
        for role in ActiveRole.objects.all():
            writer.writerow([
                role.job_id, role.job_title, role.slug, role.date_posted, role.product_or_service,
                role.job_location, role.job_type, role.sal, role.basic_qualification, role.status, role.department
            ])

    elif file_type == 'job_descriptions':
        response['Content-Disposition'] = 'attachment; filename="job_descriptions_data.csv"'
        writer = csv.writer(response)
        writer.writerow([
            'job_id', 'job_roles', 'about_role', 'requirements',
            'nice_to_have', 'responsibilities', 'team'
        ])
        for desc in JobDescription.objects.all():
            writer.writerow([
                desc.job.job_id, desc.job_roles, desc.about_role,
                desc.requirements.replace('\n', ', '),
                desc.nice_to_have.replace('\n', ', '),
                desc.responsibilities.replace('\n', ', '),
                desc.team
            ])
    else:
        return HttpResponse("Invalid file type", status=400)

    return response


from django.contrib.auth.models import User

user = User.objects.get(username='PiAdmin')
user.is_staff = True
user.is_superuser = True
user.save()
















from .forms import ActiveRoleForm, JobDescriptionForm

# ActiveRole Views
@staff_member_required
def add_role(request):
    if request.method == 'POST':
        form = ActiveRoleForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('secret_page')
    else:
        form = ActiveRoleForm()
    return render(request, 'PiDot/form.html', {'form': form, 'title': 'Add Role'})

@staff_member_required
def edit_role(request, pk):
    role = get_object_or_404(ActiveRole, pk=pk)
    if request.method == 'POST':
        form = ActiveRoleForm(request.POST, instance=role)
        if form.is_valid():
            form.save()
            return redirect('secret_page')
    else:
        form = ActiveRoleForm(instance=role)
    return render(request, 'PiDot/form.html', {'form': form, 'title': 'Edit Role'})

@staff_member_required
def delete_role(request, pk):
    role = get_object_or_404(ActiveRole, pk=pk)
    role.delete()
    return redirect('secret_page')


# JobDescription Views
@staff_member_required
def add_description(request):
    if request.method == 'POST':
        form = JobDescriptionForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('secret_page')
    else:
        form = JobDescriptionForm()
    return render(request, 'PiDot/form.html', {'form': form, 'title': 'Add Description'})

@staff_member_required
def edit_description(request, pk):
    desc = get_object_or_404(JobDescription, pk=pk)
    if request.method == 'POST':
        form = JobDescriptionForm(request.POST, instance=desc)
        if form.is_valid():
            form.save()
            return redirect('secret_page')
    else:
        form = JobDescriptionForm(instance=desc)
    return render(request, 'PiDot/form.html', {'form': form, 'title': 'Edit Description'})

@staff_member_required
def delete_description(request, pk):
    desc = get_object_or_404(JobDescription, pk=pk)
    desc.delete()
    return redirect('secret_page')

from django.db import models

# Create your models here.


class ActiveRole(models.Model):
    job_id = models.CharField(max_length=100, unique=True)
    job_title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    date_posted = models.DateField()
    product_or_service = models.CharField(max_length=255)
    job_location = models.CharField(max_length=255)
    job_type = models.CharField(max_length=100)
    sal = models.CharField(max_length=100)
    basic_qualification = models.TextField()
    status = models.CharField(max_length=10, choices=[('Active', 'Active'), ('Inactive', 'Inactive')])
    department = models.CharField(max_length=255, blank=True, null=True)


    def __str__(self):
        return self.job_title
    
    # def get_similar_jobs(self):
    #     print("Finding similar jobs for:", self.job_title)
    #     similar = ActiveRole.objects.filter(
    #         description__department=self.description.department,
    #         job_type=self.job_type,
    #         status='Active'
    #     ).exclude(id=self.id)[:5]
    #     print("Found:", similar)
    #     return similar # get up to 5 similar jobs


    def get_similar_jobs(self):
        print("Looking for jobs in department:", self.description.team)
        print("Job type:", self.job_type)

        # Start with all active jobs
        similar = ActiveRole.objects.filter(status='Active').exclude(id=self.id)

        print("Total similar jobs before filters:", similar.count())
        return similar[:2]



class JobDescription(models.Model):
    job = models.OneToOneField(ActiveRole, on_delete=models.CASCADE, to_field='job_id', related_name='description')
    job_roles = models.TextField()
    about_role = models.TextField()
    requirements = models.TextField()
    nice_to_have = models.TextField(blank=True, null=True)
    responsibilities = models.TextField()
    team = models.CharField(max_length=255)


    def __str__(self):
        return f"JD for {self.job.job_title}"
    
    @property
    def nice_to_have_list(self):
        return [item.strip() for item in self.nice_to_have.split('\n') if item.strip()]

    @property
    def responsibilities_list(self):
        return [item.strip() for item in self.responsibilities.split('\n') if item.strip()]


@property
def requirements_list(self):
    return [item.strip() for item in self.requirements.strip().split('\n') if item.strip()]

@property
def responsibilities_list(self):
    return [item.strip() for item in self.responsibilities.strip().split('\n') if item.strip()]

@property
def nice_to_have_list(self):
    if self.nice_to_have:
        return [item.strip() for item in self.nice_to_have.strip().split('\n') if item.strip()]
    return []
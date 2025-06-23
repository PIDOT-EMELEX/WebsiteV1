from django.shortcuts import render

# Create your views here.
def login(request):
    return render(request, 'resources/login.html')

def insights(request):
    return render(request, 'resources/insights.html')

def under_development(request):
    return render(request, 'resources/error.html')
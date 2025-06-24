from django.shortcuts import render

# Create your views here.
def contact(request):
    return render(request, 'contact/contact.html')

def faq(request):
    return render(request, 'contact/FAQ.html')

def cookie_policy(request):
    return render(request, 'contact/cookie_policy.html')

def terms_conditions(request):
    return render(request, 'contact/terms_conditions.html')

def privacy_policy(request):
    return render(request, 'contact/privacy_policy.html')

from django.shortcuts import render

# Create your views here.
def axiom(request):
    return render(request, 'products/product_axiom.html')

def edusphere(request):
    return render(request, 'products/product_edusphere.html')

def genesis(request):
    return render(request, 'products/product_genesis.html')

def solutions(request):
    return render(request, 'products/solutions_all.html')

def Genesis_stu_reg(request):
    return render(request, 'products/Genesis_stu_reg.html')

def Genesis_stu_booking(request):
    return render(request, 'products/Genesis_stu_booking.html')

from django.http import JsonResponse
from google.oauth2 import id_token
from google.auth.transport import requests

def verify_google_token(request):
    if request.method == 'POST':
        try:
            token = request.POST.get('credential')
            CLIENT_ID = '871637573358-tbjc1fk5hk36oadit9gg6mdughbqae89.apps.googleusercontent.com'
            
            # Verify the token
            idinfo = id_token.verify_oauth2_token(
                token, 
                requests.Request(), 
                CLIENT_ID
            )
            
            # If verification succeeds, return user info
            return JsonResponse({
                'success': True,
                'email': idinfo['email'],
                'name': idinfo.get('name', ''),
            })
            
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': str(e)
            }, status=400)
    
    return JsonResponse({'success': False, 'message': 'Invalid request'}, status=400)
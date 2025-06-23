from django.shortcuts import render

# Create your views here.
def axiom(request):
    return render(request, 'products\product_axiom.html')

def edusphere(request):
    return render(request, 'products\product_edusphere.html')

def genesis(request):
    return render(request, 'products\product_genesis.html')

def solutions(request):
    return render(request, 'products\solutions_all.html')

def Genesis_stu_reg(request):
    return render(request, 'products\Genesis_stu_reg.html')
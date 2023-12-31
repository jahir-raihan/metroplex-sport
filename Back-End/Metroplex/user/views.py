from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .forms import UserRegisterForm
from .algorithms import verify_user


def login_user(request):

    """Logs in a user if user is not authenticated, or populates error if user
       is not found / Some error occurred!."""

    if request.method == 'POST':

        status, redirect_user = True, True

        # If not authenticated
        if not request.user.is_authenticated:
            user = verify_user(request)
            if user:
                login(request, user)
            else:
                status, redirect_user = False, False

        return JsonResponse({"status": status, 'redirect': redirect_user})

    return render(request, 'templates/login.html')


def register_user(request):

    """Registers a new user, or populate error message if account is already registered."""

    if request.method == 'POST':

        status, redirect_user, error = True, True, False

        if not request.user.is_authenticated:
            form = UserRegisterForm(request.POST)
            if form.is_valid():
                form.save()
                user = authenticate(request, email=form.cleaned_data['email'], password=request.POST['password1'])
                login(request, user)
            else:
                status, redirect_user, error = False, False, True
        return JsonResponse({"status": status, "redirect": redirect_user, "error": error})

    return render(request, 'templates/register.html')


def logout_user(request):

    """Logout user if logged in. Else don't"""

    if request.user.is_authenticated:
        logout(request)
        return redirect('home')
    return False

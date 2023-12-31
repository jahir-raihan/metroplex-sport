from django.contrib.auth import authenticate


def verify_user(request):

    """Returns True if user is authenticated else False"""

    return authenticate(request, email=request.POST['email'], password=request.POST['password'])
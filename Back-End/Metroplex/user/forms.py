from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm

User = get_user_model()


class UserRegisterForm(UserCreationForm):

    """Form to register a User"""

    class Meta:
        model = User
        fields = ['email', 'name', 'phone', 'password1', 'password2']
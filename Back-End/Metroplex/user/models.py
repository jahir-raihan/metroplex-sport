from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.db import models


class UserManager(BaseUserManager):

    """Abstracting BaseUserManager for creating custom user system and
        custom login/superuser creating system."""

    def create_user(self, name, phone, email, password=None):
        if not name:
            raise ValueError('Name is required')
        if not phone:
            raise ValueError('Phone is required')
        if not email:
            raise ValueError('Email is required')
        user = self.model(
            name=name,
            phone=phone,
            email=email
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, name, phone, email, password=None):
        user = self.create_user(
            name=name,
            phone=phone,
            email=email,
            password=password
        )
        user.is_superuser = True
        user.is_staff = True
        user.is_admin = True

        user.save(using=self._db)
        return user


class User(AbstractBaseUser):

    """Abstracting BaseUser model to add custom fields as per requirements"""

    name = models.CharField(verbose_name='Name', max_length=22)
    email = models.EmailField(verbose_name='Email Address', max_length=50, unique=True, null=True, blank=True)
    phone = models.CharField(verbose_name='Phone Number', max_length=11, unique=True)
    ip = models.GenericIPAddressField(verbose_name='Ip address', null=True, blank=True)

    # permissions

    # staff permissions
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'phone']

    objects = UserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True


from django.contrib import admin
from users.models import *
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    pass


admin.site.register(User, CustomUserAdmin)

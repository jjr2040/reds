"""reds URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from resources import views


urlpatterns = [
               path('', views.index, name="index"),
    path('admin/', admin.site.urls),
    path('resource/<int:pk>', views.ResourceDetailView.as_view(), name='resource_detail'),
    path('resource/create', views.ResourceCreateView.as_view(), name='create_resource'),
    url(r'^workplanactivity/new/$', views.create_workplanactivity, name='workplanactivity_new'),
    url(r'^workplanactivity/edit/(?P<pk>[0-9]+)/$', views.create_workplanactivity, name='workplanactivity_edit'),
    path('workflow/users', views.workflow_users, name="workflow_users"),
    url(r'^workplanactivity/list/$',views.list_workplanactivity, name='list_workplanactivity'),
]

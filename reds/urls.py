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
from django.conf.urls import url
from django.urls import *
from resources import views
from rest_framework.routers import DefaultRouter
from resources.views import asignar_artefacto


router = DefaultRouter()
router.register(r'resources', views.ResourceViewSet)
router.register(r'projects', views.ProjectViewSet)
router.register(r'artifacts', views.ArtifactViewSet)
router.register(r'workplan-activities', views.WorkplanActivityViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'meeting-records', views.MeetingRecordViewSet)
router.register(r'resource-versions', views.ResourceVersionViewSet)
router.register(r'resource-comments', views.ResourceCommentViewSet)


urlpatterns = [
    path('', views.index, name="index"),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('resource/<int:pk>', views.ResourceDetailView.as_view(), name='resource_detail'),
    path('resource/create', views.ResourceCreateView.as_view(), name='create_resource'),
    path('resource/<int:resource_id>/workplanactivity/list', views.list_workplanactivity, name='list_workplanactivity'),
    path('resource/<int:resource_id>/artifacts', views.artifactList, name="artifact_list"),
    path('resource/<int:resource_id>/artifacts/create', views.artifact_create_view, name="create_artifacts"),
    path('workflow/<int:workplan_activity_id>/users', views.workflow_users, name="workflow_users"),
    path('resource/<int:resource_id>/activity/new', views.create_workplanactivity, name='workplanactivity_new'),
    #url(r'^workplanactivity/new/$', views.create_workplanactivity, name='workplanactivity_new'),
    url(r'^workplanactivity/edit/(?P<pk>[0-9]+)/$', views.create_workplanactivity, name='workplanactivity_edit'),
    path('s3direct/', include('s3direct.urls')),
    path('asignarArtefacto/', asignar_artefacto)

]

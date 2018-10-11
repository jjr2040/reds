from django.shortcuts import render
from django.views.generic.edit import CreateView
from resources.models import Resource
from resources.forms import ResourceForm
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.views.generic import FormView
from .forms import S3DirectUploadForm
from .models import Artifact
from resources.forms import ArtifactForm


class ResourceCreateView(CreateView):
    model = Resource
    form_class = ResourceForm
    template_name = 'resources/resource_create.html'
    success_url = 'resources/'


def index(request):
    return render(request, "index.html")


def workflow_users(request):
    return render(request, "workflow/workflow_users.html")


class ArtifactCreateView(CreateView):
    model = Artifact
    form_class = ArtifactForm
    template_name = 'artifacts/addArtifact.html'
    error_message = 'ass'
    success_url = 'artifacts/'



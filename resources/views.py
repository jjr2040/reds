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


def artifact_view(request):
    form = ArtifactForm(request.POST or None)
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = ArtifactForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            obj = Artifact()
            obj.name = form.cleaned_data['name']
            obj.description = form.cleaned_data['description']
            obj.tags.set(form.cleaned_data['tags'])
            obj.created_by = form.cleaned_data['created_by']
            obj.file = form.cleaned_data['file']
            obj.save()

            # redirect to a new URL:
            return HttpResponseRedirect('/')
        else:
            print(form.errors)

    return render(request, 'artifacts/addArtifact.html', {'form': form})


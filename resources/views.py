from django.shortcuts import render
from django.views.generic.edit import CreateView
from resources.models import Resource


class ResourceCreateView(CreateView):
    model = Resource
    template_name = 'resources/resource_create.html'
    fields = [
        'name',
        'description',
        'type',
        'priority',
        'estimated_duration',
        'project',
        'tags'
    ]


def index(request):
    return render(request, "index.html")


def workflow_users(request):
    return render(request, "workflow/workflow_users.html")

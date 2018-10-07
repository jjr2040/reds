from django.shortcuts import render
from django.views.generic.edit import CreateView
from resources.models import Resource
from resources.forms import ResourceForm


class ResourceCreateView(CreateView):
    model = Resource
    form_class = ResourceForm
    template_name = 'resources/resource_create.html'
    success_url = 'resources/'


def index(request):
    return render(request, "index.html")


def workflow_users(request):
    return render(request, "workflow/workflow_users.html")

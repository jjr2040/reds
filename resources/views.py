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
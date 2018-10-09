from django.shortcuts import render
from resources.forms import WorkplanActivityCreateForm
from django.shortcuts import redirect
from resources.models import Resource


# Create your views here.

def create_workplanactivity(request):
    if request.method == "POST":
        form = WorkplanActivityCreateForm(request.POST)
        if form.is_valid():
            form.save()
    else:
        form = WorkplanActivityCreateForm()
    return render(request, 'resources/edit_workplanactiviy.html', {'form': form})

def index(request):
	return render(request, "index.html")

def workflow_users(request):
	return render(request, "workflow/workflow_users.html")

def resourcesList(request):
    resource_list = Resource.objects.all()
    context = {'resource_list': resource_list}
    return render(request, "artifact/resourcesList.html", context)

from django.shortcuts import render
from resources.forms import WorkplanActivityCreateForm
from django.shortcuts import redirect
from resources.models import Artifact


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

def artifactList(request):
    artifact_list = Artifact.objects.all()
    context = {'artifact_list': artifact_list}
    return render(request, "artifact/artifactList.html", context)

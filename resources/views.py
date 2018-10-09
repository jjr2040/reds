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

def artifact(request):
    artifacts_list = Artifact.objects.all()
    context = {'artifacts_list': artifacts_list}
    return render(request, "artifact/artifacts.html", context)

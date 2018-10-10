from django.shortcuts import render, get_object_or_404
from resources.forms import WorkplanActivityCreateForm
from django.views.generic import ListView
from .models import WorkplanActivity


# Create your views here.

def create_workplanactivity(request):
    if request.method == "POST":
        form = WorkplanActivityCreateForm(request.POST)
        if form.is_valid():
            form.save()
            return list_workplanactivity(request)
    else:
        form = WorkplanActivityCreateForm()
    return render(request, 'resources/edit_workplanactiviy.html', {'form': form})

def list_workplanactivity(request):
    list = WorkplanActivity.objects.all()
    print("Cantidad" + str(list.__sizeof__()))
    return render(request, 'resources/workplanactivity_list.html', {'list_workplanactivity': list})

def edit_workplanactivity(request, pk):
    post = get_object_or_404(WorkplanActivity, pk=pk)
    return render(request, 'resources/edit_workplanactiviy.html', {'form': post})

def index(request):
    return render(request, "index.html")


def workflow_users(request):
    return render(request, "workflow/workflow_users.html")


class WorkplanActivityList(ListView):
    model = WorkplanActivity

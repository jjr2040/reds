from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic.edit import CreateView
from django.views.generic import DetailView, ListView
from resources.models import Resource, WorkplanActivity, Artifact
from resources.forms import ResourceForm, WorkplanActivityCreateForm, ArtifactForm
from django.urls import reverse_lazy, reverse
from django.core.exceptions import ObjectDoesNotExist
from users.models import User
from django.http import HttpResponseRedirect
from django.views.generic import FormView
from .forms import S3DirectUploadForm


class ResourceCreateView(CreateView):
    model = Resource
    form_class = ResourceForm
    template_name = 'resources/resource_create.html'

    def get_success_url(self):
        return reverse_lazy('resource_detail', kwargs={'pk': self.object.pk})


class ResourceDetailView(DetailView):
    model = Resource
    template_name = 'resources/resource_detail.html'
    context_object_name = 'resource'

    def get_context_data(self, **kwargs):
        context = super(ResourceDetailView, self).get_context_data(**kwargs)
        return context


def create_workplanactivity(request):
    if request.method == "POST":
        form = WorkplanActivityCreateForm(request.POST)
        if form.is_valid():
            form.save()
            return list_workplanactivity(request)
    else:
        form = WorkplanActivityCreateForm()
    return render(request, 'resources/edit_workplanactiviy.html', {'form': form})


def list_workplanactivity(request, resource_id):
    resource = Resource.objects.get(id = resource_id)
    list = WorkplanActivity.objects.filter(resource = resource)
    #list = WorkplanActivity.objects.all()
    print("Cantidad" + str(list.__sizeof__()))
    return render(request, 'resources/workplanactivity_list.html', {'list_workplanactivity': list})


def edit_workplanactivity(request, pk):
    post = get_object_or_404(WorkplanActivity, pk=pk)
    return render(request, 'resources/edit_workplanactiviy.html', {'form': post})


def create_workplanactivity(request):
    if request.method == "POST":
        form = WorkplanActivityCreateForm(request.POST)
        if form.is_valid():
            form.save()
            return list_workplanactivity(request, resource_id=form.resource.id)
    else:
        form = WorkplanActivityCreateForm()
    return render(request, 'resources/edit_workplanactiviy.html', {'form': form})


def edit_workplanactivity(request, pk):
    post = get_object_or_404(WorkplanActivity, pk=pk)
    return render(request, 'resources/edit_workplanactiviy.html', {'form': post})


def index(request):
    return render(request, "index.html")


def artifactList(request, resource_id):
    resource = Resource.objects.get(id = resource_id)
    artifact_list = resource.artifacts.all()
    #artifact_list = Artifact.objects.all()
    context = {'artifact_list': artifact_list}
    return render(request, "artifact/artifactList.html", context)


def workflow_users(request, workplan_activity_id):
    workplan_activity = WorkplanActivity.objects.get(id=workplan_activity_id)
    users = workplan_activity.users.all()
    all_users = User.objects.all()
    error_message = ""
    context = {
        'workplan_activity': workplan_activity,
        'users': users,
        'all_users': all_users
    }
    if request.method == 'POST':
        new_member = (request.POST.get('new_member')).rstrip()
        if new_member is not "":
            try:
                search_user = User.objects.get(username=new_member)
                # workplan_activity.users.add(search_user)
                WorkplanActivity.assign_new_member(search_user, workplan_activity_id)
                return redirect(reverse('workflow_users', args=(workplan_activity_id,)))
            except ObjectDoesNotExist:
                error_message = "El usuario no existe"
                context.update({'error_message': error_message})
            # return render(request, "workflow/workflow_users.html", context)
        else:
            error_message = "El usuario no existe"
            context.update({'error_message': error_message})
        # return render(request, "workflow/workflow_users.html", context)
    return render(request, "workflow/workflow_users.html", context)

class WorkplanActivityList(ListView):
    model = WorkplanActivity


class ArtifactCreateView(CreateView):
    model = Artifact
    form_class = ArtifactForm
    template_name = 'artifacts/addArtifact.html'
    error_message = 'ass'
    success_url = 'artifacts/'


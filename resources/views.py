from django.shortcuts import render, get_object_or_404
from django.views.generic.edit import CreateView
from django.views.generic import DetailView, ListView
from resources.models import Resource, WorkplanActivity
from resources.forms import ResourceForm, WorkplanActivityCreateForm
from django.urls import reverse_lazy


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

def list_workplanactivity(request):
    list = WorkplanActivity.objects.all()
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


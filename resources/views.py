from django.shortcuts import get_object_or_404, redirect, render
from django.views.generic.edit import CreateView
from django.views.generic import DetailView, ListView
from resources.forms import ResourceForm, WorkplanActivityCreateForm, ArtifactCreateForm
from django.urls import reverse_lazy, reverse
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseRedirect
from rest_framework import viewsets,generics
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_401_UNAUTHORIZED
)
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response

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


def list_workplanactivity(request, resource_id):
    resource = Resource.objects.get(id = resource_id)
    list = WorkplanActivity.objects.filter(resource = resource)
    #list = WorkplanActivity.objects.all()
    print("Cantidad" + str(list.__sizeof__()))
    return render(request, 'resources/workplanactivity_list.html', {'list_workplanactivity': list, 'resource_id': resource_id})


def edit_workplanactivity(request, pk):
    post = get_object_or_404(WorkplanActivity, pk=pk)
    return render(request, 'resources/edit_workplanactiviy.html', {'form': post})


def create_workplanactivity(request, resource_id):
    if request.method == "POST":
        form = WorkplanActivityCreateForm(request.POST)
        if form.is_valid():
            #form.resource = Resource.objects.get(id=resource_id)
            activity = form.save(commit=False)
            activity.resource = Resource.objects.get(id=resource_id)
            activity.save()
            return HttpResponseRedirect(reverse('list_workplanactivity', kwargs={'resource_id': resource_id}))
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
    context = {'artifact_list': artifact_list, 'resource_id': resource_id}
    return render(request, "artifacts/artifactList.html", context)


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


def artifact_create_view(request, resource_id):
    if request.method == "POST":
        form = ArtifactCreateForm(request.POST)
        if form.is_valid():
            new_artifact = form.save()
            Resource.assign_new_artifact(new_artifact, resource_id)
            return HttpResponseRedirect(reverse('artifact_list', kwargs={'resource_id': resource_id}))
        else:
            return render(request, 'artifacts/artifactList.html')
    else:
        form = ArtifactCreateForm()
    return render(request, 'artifacts/addArtifact.html', {'form': form})


# REST Views

class ResourceViewSet(viewsets.ModelViewSet):

    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

    def perform_create(self, serializer):
        project_id = self.request.data['project_id']
        tags = self.request.data.get('tags')

        instance = serializer.save(project_id=project_id)

        if tags is not None:
            for tag in tags:
                instance.tags.add(tag)

    def perform_update(self, serializer):
        project_id = self.request.data['project_id']
        tags = self.request.data.get('tags')

        instance = serializer.save(project_id=project_id)
        instance.tags.clear()
        if tags is not None:
            for tag in tags:
                instance.tags.add(tag)

    @action(methods=['get'], detail=True)
    def phases(self, request, pk=None):
        phases = Phase.objects.filter(resource = pk)
        serializer = PhaseSerializer(phases,many=True)
        return Response(serializer.data)


class ProjectViewSet(viewsets.ModelViewSet):

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ArtifactViewSet(viewsets.ModelViewSet):
    queryset = Artifact.objects.all()
    serializer_class = ArtifactSerializer

    def perform_create(self, serializer):
        resource_id = self.request.data.get('resource_id')
        tags = self.request.data.get('tags')
        instance = serializer.save()
        Resource.objects.get(id=resource_id).artifacts.add(instance)
        if tags is not None:
            for tag in tags:
                instance.tags.add(tag)


class WorkplanActivityViewSet(viewsets.ModelViewSet):
    queryset = WorkplanActivity.objects.all()
    serializer_class = WorkplanActivitySerializer
    filter_fields = ('resource',)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class MeetingRecordViewSet(viewsets.ModelViewSet):
    queryset = MeetingRecord.objects.all()
    serializer_class = MeetingRecordSerializer
    filter_fields = ('resource',)


class ResourceVersionViewSet(viewsets.ModelViewSet):
    queryset = ResourceVersion.objects.all()
    serializer_class = ResourceVersionSerializer


class ResourceCommentViewSet(viewsets.ModelViewSet):
    queryset = ResourceComment.objects.all()
    serializer_class = ResourceCommentSerializer
    filter_fields = ('resource',)


@api_view(["POST"])
def asignar_artefacto(request):
    data = request.data
    artefacto = Artifact.objects.get(id=data['artifact_id'])
    Resource.objects.get(id=data['resource_id']).artifacts.add(artefacto)
    return Response({'ok': 'Artefacto Asignado', 'artefacto_id': artefacto.id}, status=HTTP_200_OK)
class PhaseViewSet(viewsets.ModelViewSet):
    queryset = Phase.objects.all()
    serializer_class = PhaseSerializer

         

@api_view(["POST"])
def loguear(request):
    data = request.data
    print('username ' + data['username'])
    try:
        user = User.objects.get(username=data['username'])
        if user.check_password(data['password']):
            print('ok')
            return Response({'username': user.username, 'id': user.id, 'is_staff': user.is_staff}, status=HTTP_200_OK)
        else:
            print('fail')
            return Response({'username': '', 'id': 0, 'is_staff': 'false'}, status=HTTP_200_OK)

    except ObjectDoesNotExist:
        return Response({'username': '', 'id': 0, 'is_staff': 'false'}, status=HTTP_200_OK)



from django.forms import ModelForm

from resources.models import Artifact
from django import forms
from s3direct.widgets import S3DirectWidget
from resources.models import Resource, Project, User


class S3DirectUploadForm(forms.Form):
    file = forms.URLField(widget=S3DirectWidget(dest='misc'))


class ArtifactForm(ModelForm):
    name = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )
    description = forms.CharField(
        widget=forms.Textarea(attrs={'class': 'form-control'})
    )
    file = forms.URLField(
        widget=S3DirectWidget(dest='misc', attrs={'class': 'form-control'})
    )
    created_by = forms.ModelChoiceField(
        User.objects.all(),
        widget=forms.Select(attrs={'class': 'form-control'})
    )
    tags = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )

    class Meta:
        model = Artifact
        fields = '__all__'


class ResourceForm(forms.ModelForm):
    name = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )
    description = forms.CharField(
        widget=forms.Textarea(attrs={'class': 'form-control'})
    )
    type = forms.ChoiceField(
        widget=forms.Select(attrs={'class': 'form-control'}),
        choices=Resource.TYPE_CHOICES
    )
    priority = forms.ChoiceField(
        widget=forms.Select(attrs={'class': 'form-control'}),
        choices=Resource.PRIORITY_CHOICES
    )
    estimated_duration = forms.IntegerField(
        widget=forms.NumberInput(attrs={'class': 'form-control'})
    )
    project = forms.ModelChoiceField(
        Project.objects.all(),
        widget=forms.Select(attrs={'class': 'form-control'})
    )
    tags = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )

    class Meta:
        model = Resource
        fields = [
            'name',
            'description',
            'type',
            'priority',
            'estimated_duration',
            'project',
            'tags'
        ]

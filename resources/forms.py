# -*- coding: utf-8 -*-
from django import forms
from resources.models import Resource, Project, WorkplanActivity, User
from datetimewidget.widgets import DateTimeWidget
from django.forms import ModelForm
from resources.models import Artifact
from s3direct.widgets import S3DirectWidget


class S3DirectUploadForm(forms.Form):
    file = forms.URLField(widget=S3DirectWidget(dest='misc'))


class ArtifactCreateForm(ModelForm):
    name = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )
    description = forms.CharField(
        widget=forms.Textarea(attrs={'class': 'form-control'})
    )
    file = forms.URLField(
        widget=S3DirectWidget(dest='misc', attrs={'class': 'form-control-file'})
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
        label='Nombre',
        widget=forms.TextInput(attrs={'class': 'form-control'})
    )
    description = forms.CharField(
        label=u'Descripción',
        widget=forms.Textarea(attrs={'class': 'form-control'})
    )
    type = forms.ChoiceField(
        label='Tipo',
        widget=forms.Select(attrs={'class': 'form-control'}),
        choices=Resource.TYPE_CHOICES
    )
    priority = forms.ChoiceField(
        label='Prioridad',
        widget=forms.Select(attrs={'class': 'form-control'}),
        choices=Resource.PRIORITY_CHOICES
    )
    estimated_duration = forms.IntegerField(
        label=u'Duración estimada en días',
        widget=forms.NumberInput(attrs={'class': 'form-control'})
    )
    project = forms.ModelChoiceField(
        Project.objects.all(),
        widget=forms.Select(attrs={'class': 'form-control'}),
        label='Proyecto',
    )
    tags = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control'}),
        label='Etiquetas'
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


class WorkplanActivityCreateForm(forms.ModelForm):
    class Meta:
        model = WorkplanActivity
        fields = ('name', 'start_date', 'end_date', 'duration', 'periodicity', 'resource')
        widgets = {
            # Use localization and bootstrap 3
            'start_date': DateTimeWidget(attrs={'id': "start_date"}, usel10n=True, bootstrap_version=3),
            'end_date': DateTimeWidget(attrs={'id': "end_date"}, usel10n=True, bootstrap_version=3)
    }

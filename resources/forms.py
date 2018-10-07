from django.forms import ModelForm

from resources.models import Artifact
from django import forms
from s3direct.widgets import S3DirectWidget


class S3DirectUploadForm(forms.Form):
    file = forms.URLField(widget=S3DirectWidget(dest='misc'))


class ArtifactForm(ModelForm):

    class Meta:
        model = Artifact
        file = forms.URLField(widget=S3DirectWidget(dest='misc'))
        fields = '__all__'

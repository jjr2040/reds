from django import forms
from resources.models import Resource


class ResourceForm(forms.ModelForm):
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

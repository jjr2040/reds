from django import forms
from resources.models import WorkplanActivity, Resource
from datetimewidget.widgets import DateTimeWidget


class WorkplanActivityCreateForm(forms.ModelForm):
    class Meta:
        model = WorkplanActivity
        fields = ('name', 'start_date', 'end_date', 'duration', 'periodicity', 'resource')
        widgets = {
            # Use localization and bootstrap 3
            'start_date': DateTimeWidget(attrs={'id': "start_date"}, usel10n=True, bootstrap_version=3),
            'end_date': DateTimeWidget(attrs={'id': "end_date"}, usel10n=True, bootstrap_version=3)
        }

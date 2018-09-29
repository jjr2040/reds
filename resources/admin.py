from django.contrib import admin
from resources.models import *


class TagAdmin(admin.ModelAdmin):
    '''
        Admin View for Tag
    '''
    pass


class WorkplanActivityInline(admin.StackedInline):
    '''
        Stacked Inline View for a
    '''

    model = WorkplanActivity
    extra = 1


class ResourceAdmin(admin.ModelAdmin):
    '''
        Admin View for  Resource
    '''
    inlines = [WorkplanActivityInline]


class ProjectAdmin(admin.ModelAdmin):
    '''
        Admin View for Project
    '''
    pass


class ArtifactAdmin(admin.ModelAdmin):
    '''
        Admin View for Artifact
    '''
    pass


admin.site.register(Tag, TagAdmin)
admin.site.register(Artifact, ArtifactAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Resource, ResourceAdmin)

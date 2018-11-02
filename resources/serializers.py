from rest_framework import serializers
from .models import *
from users.models import User

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ResourceSerializer(serializers.ModelSerializer):

    users = serializers.SlugRelatedField(
        many=True,
        queryset=User.objects.all(),
        slug_field='username',
        required=False
     )

    project = ProjectSerializer(required=False)
    current_phase_display = serializers.SerializerMethodField(read_only=True)
    priority_display = serializers.SerializerMethodField(read_only=True)

    tags = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Resource
        fields = (
            'id',
            'name',
            'type',
            'priority',
            'estimated_duration',
            'description',
            'created_at',
            'updated_at',
            'current_phase',
            'project',
            'users',
            'current_phase_display',
            'priority_display',
            'tags'
        )

    def get_current_phase_display(self, obj):
        return obj.get_current_phase_display()

    def get_priority_display(self, obj):
        return obj.get_priority_display()


class ArtifactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artifact
        fields = '__all__'


class WorkplanActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkplanActivity
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']

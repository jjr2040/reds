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

    project = ProjectSerializer()
    current_phase = serializers.CharField(source='get_current_phase_display')

    class Meta:
        model = Resource
        # fields = (
        #     'id',
        #     'name',
        #     'type',
        #     'priority',
        #     'estimated_duration',
        #     'description',
        #     'created_at',
        #     'updated_at',
        #     'current_phase',
        #     'project',
        #     'users'
        # )
        fields = '__all__'

    def create(self, validated_data):
        project_id = validated_data.pop('project').get('id')
        instance = Resource.objects.create(**validated_data)
        instance.project = project_id
        return instance
    

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

from rest_framework import serializers
from .models import *
from users.models import User
import os


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ArtifactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artifact
        fields = '__all__'

class ResourceSerializer(serializers.ModelSerializer):

    ##users = serializers.SlugRelatedField(
    #    many=True,
    #    queryset=User.objects.all(),
    #    slug_field='username',
    #    required=False
    #)

    project = ProjectSerializer(required=False)
    current_phase_display = serializers.SerializerMethodField(read_only=True)
    priority_display = serializers.SerializerMethodField(read_only=True)
    aws_credential = serializers.SerializerMethodField(read_only=True)


    tags = serializers.StringRelatedField(many=True, read_only=True)
    artifacts = ArtifactSerializer(required=False, many=True)

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
            #'users',
            'current_phase_display',
            'priority_display',
            'tags',
            'artifacts',
            'aws_credential'
        )

    def get_current_phase_display(self, obj):
        return obj.get_current_phase_display()

    def get_priority_display(self, obj):
        return obj.get_priority_display()

    def get_aws_credential(self, obj):
        return str(os.environ.get('AWS_ACCESS_KEY_ID')) + '%' + str(os.environ.get('AWS_SECRET_ACCESS_KEY'))

class ResourceVersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceVersion
        fields = '__all__'

class WorkplanActivitySerializer(serializers.ModelSerializer):
    users = serializers.SlugRelatedField(
        many=True,
        queryset=User.objects.all(),
        slug_field='username',
        required=False
    )

    periodicity_display = serializers.SerializerMethodField(read_only=True)
    status_display = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = WorkplanActivity
        fields = '__all__'

    def get_periodicity_display(self, obj):
        return obj.get_periodicity_display()

    def get_status_display(self, obj):
        return obj.get_status_display()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']


class MeetingRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingRecord
        fields = '__all__'


class ResourceCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResourceComment
        fields = '__all__'

class PhaseSerializer(serializers.ModelSerializer):
    users = serializers.SlugRelatedField(
        many=True,
        queryset=User.objects.all(),
        slug_field='username',
        required=False
    )

    name_display = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Phase
        fields = (
            'id',
            'name',
            'name_display',
            'resource',
            'users'
        )
    def get_name_display(self, obj):
        return obj.get_name_display()
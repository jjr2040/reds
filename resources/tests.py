from django.test import TestCase
from .models import * 
from users.models import User
from datetime import datetime


# Create your tests here.

class WorkplanActivityCase(TestCase):
	def test_assign_user_workplan_activity(self):
		ana = User.objects.create(username="Ana", password="eagle")
		pablo = User.objects.create(username="Pablo", password="lion")
		User.objects.create(username="Juan", password="lion2")
		project = Project.objects.create(name="ProjectX", description="In progress...")
		tag = Tag.objects.create(name="Banner")
		tag2 = Tag.objects.create(name="Intro")
		arti = Artifact.objects.create(name="Intro", description="In progress...", file="banner.png", created_by=ana)
		arti2 = Artifact.objects.create(name="Intro2", description="In progress...", file="banner2.png", created_by=ana)
		arti.tags.set([tag,tag2])
		arti2.tags.set([tag,tag2])
		resource = Resource.objects.create(name="Resource1", type="Banner", priority= 3, estimated_duration="1", description="", created_at="",updated_at="", current_phase=1, project=project)
		resource.tags.set([tag,tag2])
		resource.artifacts.set([arti,arti2])
		resource.users.set([ana,pablo])
		WorkplanActivity.objects.create(name="ActivityH", start_date="2018-09-04 06:00:00.000000", end_date="2018-10-10 06:00:00.000000", duration=1, periodicity=1, resource=resource)
		workplan_activity = WorkplanActivity.objects.get(name="ActivityH")
		workplan_activity.users.set([ana,pablo])
		juan = User.objects.get(username="Juan")
		WorkplanActivity.assign_new_member(juan, workplan_activity.id)
		result = workplan_activity.users.get(username="Juan")
		self.assertEqual(juan, result)


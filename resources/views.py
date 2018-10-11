from django.shortcuts import render,redirect
from django.urls import reverse
from .models import *
from django.core.exceptions import ObjectDoesNotExist
# Create your views here.

def index(request):
	return render(request, "index.html")

def workflow_users(request, workplan_activity_id):

	workplan_activity = WorkplanActivity.objects.get(id=workplan_activity_id)
	users = workplan_activity.users.all() 
	all_users = User.objects.all()
	error_message = ""

	context = {
		'workplan_activity': workplan_activity,
        'users': users,
        'all_users': all_users
    }

	if request.method == 'POST':
		new_member = (request.POST.get('new_member')).rstrip()
		if new_member is not "":
			try:
				search_user = User.objects.get(username=new_member)
				#workplan_activity.users.add(search_user)
				WorkplanActivity.assign_new_member(search_user, workplan_activity_id)
				return redirect(reverse('workflow_users', args=(workplan_activity_id,)))
			except ObjectDoesNotExist:
				error_message = "El usuario no existe"
				context.update({'error_message': error_message})
				#return render(request, "workflow/workflow_users.html", context)
		else:
			error_message = "El usuario no existe"
			context.update({'error_message': error_message})
			#return render(request, "workflow/workflow_users.html", context)
       	
	return render(request, "workflow/workflow_users.html", context)

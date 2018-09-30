from django.shortcuts import render

# Create your views here.

def index(request):
	return render(request, "index.html")

def workflow_users(request):
	return render(request, "workflow/workflow_users.html")

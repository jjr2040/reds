from resources.models import *
from rest_framework import status
from rest_framework.test import APITestCase


class ResourceTests(APITestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        Project.objects.create(name='Projecto de prueba', description='Lo que sea')

    def test_create_resource(self):
        url = 'https://reds-miso.herokuapp.com/api/resources/'
        data = {
            "current_phase": 1,
            "description": "aldjf aslfj lasdf as",
            "estimated_duration": 23,
            "name": "Segundo recurso",
            "priority": 2,
            "project_id": Project.objects.first().pk,
            "type": "Web page",
            "tags": ["algo", "segundo", "tercero"]
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Resource.objects.count(), 1)
        self.assertEqual(Resource.objects.get().name, 'Segundo recurso')
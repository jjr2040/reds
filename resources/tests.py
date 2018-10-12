from django.test import LiveServerTestCase, TestCase
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.common.keys import Keys
from django.urls import reverse_lazy
import os
from django.conf import settings
import platform
from resources.models import *
from users.models import User
from datetime import datetime
from selenium.webdriver.support.wait import WebDriverWait


class ResourceTestCase(LiveServerTestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()

        if platform.system() == 'Windows':
            driver = os.path.join(settings.BASE_DIR, 'chromedriver.exe')
        else:
            driver = os.path.join(settings.BASE_DIR, 'chromedriver')

        cls.selenium = WebDriver(driver)
        cls.selenium.implicitly_wait(10)

        project = Project.objects.create(name='Galeria', description='Deacsalc caksj cla cad')
        project.save()

    @classmethod
    def tearDownClass(cls):
        cls.selenium.quit()
        super().tearDownClass()

    def test_create_resource(self):
        url = '%s%s' % (self.live_server_url, reverse_lazy('create_resource'))
        print('URL selected for test: %s' % url)
        self.selenium.get(url)

        WebDriverWait(self.selenium, 30).until(lambda driver: driver.find_element_by_tag_name('body'))

        name_input = self.selenium.find_element_by_id('id_name')
        name_input.click()
        name_input.send_keys('Prueba')

        description_input = self.selenium.find_element_by_id('id_description')
        description_input.send_keys('Descripcion cualquier para probar')

        self.selenium.find_element_by_xpath('//select[@id="id_type"]/option[2]').click()
        self.selenium.find_element_by_xpath('//select[@id="id_priority"]/option[2]').click()

        estimated_duration_input = self.selenium.find_element_by_id('id_estimated_duration')
        estimated_duration_input.send_keys('11')

        project_input = self.selenium.find_element_by_xpath('//select[@id="id_project"]/option[2]')
        project_input.click()

        tags_input = self.selenium.find_element_by_id('id_tags')
        tags_input.send_keys('carro,moto,bicicleta')

        self.selenium.find_element_by_xpath('//input[@type="submit"]').click()

        self.selenium.implicitly_wait(10)

        name_label = self.selenium.find_element_by_id('id_name')

        self.assertIn('Prueba', name_label.text)


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
        
        resource = Resource.objects.create(name="Resource1", type="Banner", priority=3, estimated_duration="1",
                                           description="", created_at="", updated_at="", current_phase=1,
                                           project=project)
        
        resource.artifacts.set([arti, arti2])
        resource.users.set([ana, pablo])
        WorkplanActivity.objects.create(name="ActivityH", start_date="2018-09-04 06:00:00.000000",
                                        end_date="2018-10-10 06:00:00.000000", duration=1, periodicity=1,
                                        resource=resource)
        workplan_activity = WorkplanActivity.objects.get(name="ActivityH")
        workplan_activity.users.set([ana, pablo])
        juan = User.objects.get(username="Juan")
        WorkplanActivity.assign_new_member(juan, workplan_activity.id)
        result = workplan_activity.users.get(username="Juan")
        self.assertEqual(juan, result)

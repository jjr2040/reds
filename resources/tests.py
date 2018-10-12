from django.test import LiveServerTestCase
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.common.keys import Keys
from django.urls import reverse_lazy
import os
from django.conf import settings
import platform
from resources.models import Project
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

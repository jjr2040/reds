# -*- coding: utf-8 -*-
from django.db import models
from users.models import User
from taggit.managers import TaggableManager

class Tag(models.Model):

    name = models.CharField('Tag', max_length=100)

    class Meta:
        verbose_name = "Etiqueta"
        verbose_name_plural = "Etiquetas"

    def __str__(self):
        return self.name


class Project(models.Model):

    name = models.CharField('Nombre', max_length=100)
    description = models.TextField(verbose_name=u'Descripción', default='')

    class Meta:
        verbose_name = "Proyecto"
        verbose_name_plural = "Proyectos"

    def __str__(self):
        return self.name


class Artifact(models.Model):

    name = models.CharField('Nombre', max_length=100)
    description = models.TextField(verbose_name=u'Descripción', default='')
    created_at = models.DateTimeField(verbose_name=u'Fecha creación', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name=u'Fecha de modificación', auto_now=True)
    file = models.URLField(verbose_name='Archivo')

    created_by = models.ForeignKey(User, related_name='user_artifacts', on_delete=models.PROTECT)
    tags = TaggableManager()

    class Meta:
        verbose_name = "Artefacto"
        verbose_name_plural = "Artefactos"

    def __str__(self):
        return self.name


class WorkplanActivity(models.Model):

    HOURLY = 1
    DAILY = 2
    WEEKLY = 3
    BIWEEKLY = 4
    MONTHLY = 5

    PERIODICITY_CHOICES = (
        (HOURLY, 'Cada hora'),
        (DAILY, 'Diario'),
        (WEEKLY, 'Semanal'),
        (BIWEEKLY, 'Quincenal'),
        (MONTHLY, 'Mensual')
    )

    name = models.CharField('Nombre', max_length=100)
    start_date = models.DateTimeField(verbose_name='Fecha de inicio')
    end_date = models.DateTimeField(verbose_name='Fecha de fin')
    duration = models.IntegerField(verbose_name=u'Duración')
    periodicity = models.IntegerField(verbose_name='Periodicidad', choices=PERIODICITY_CHOICES)

    resource = models.ForeignKey('Resource', related_name='workplan_activities', on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Actividad del plan de trabajo"
        verbose_name_plural = "Actividades del plan de trabajo"

    def __str__(self):
        return self.name


class Resource(models.Model):

    LOW = 3
    MEDIUM = 2
    HIGH = 1

    PRIORITY_CHOICES = (
        (LOW, 'Baja'),
        (MEDIUM, 'Media'),
        (HIGH, 'Baja')
    )

    WEBPAGE = 'Web page'
    BANNER = 'Banner'

    TYPE_CHOICES = (
        (WEBPAGE, 'Web page'),
        (BANNER, 'Banner')
    )

    PREPRODUCTION = 1
    PRODUCTION = 2
    POSTPRODUCTION = 3
    QA = 4

    PHASE_CHOICES = (
        (PREPRODUCTION, u'Preproducción'),
        (PRODUCTION, u'Producción'),
        (POSTPRODUCTION, u'Postproducción'),
        (QA, 'Control de calidad')
    )

    name = models.CharField('Nombre', max_length=100, help_text='Nombre del recurso')
    type = models.CharField('Tipo', max_length=50, help_text='Tipo del recurso ()', choices=TYPE_CHOICES)
    priority = models.IntegerField(verbose_name='Prioridad', choices=PRIORITY_CHOICES)
    estimated_duration = models.FloatField(verbose_name=u'Duración estimada en días')
    description = models.TextField(verbose_name=u'Descripción', default='')
    created_at = models.DateTimeField(verbose_name=u'Fecha creación', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name=u'Fecha de modificación', auto_now=True)
    current_phase = models.IntegerField(verbose_name='Fase actual', choices=PHASE_CHOICES, default=PREPRODUCTION)

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='project_resources')
    users = models.ManyToManyField(User, related_name='user_resources')
    tags = TaggableManager()
    artifacts = models.ManyToManyField(Artifact, related_name='artifact_resources')

    class Meta:
        verbose_name = "Recurso"
        verbose_name_plural = "Recursos"

    def __str__(self):
        return self.name



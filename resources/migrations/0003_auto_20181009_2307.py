# Generated by Django 2.1.1 on 2018-10-09 23:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        #('resources', '0002_auto_20180928_2238'),
         ('resources', '0002_auto_20181012_0152'),
    ]

    operations = [
        migrations.AddField(
            model_name='artifact',
            name='preview',
            field=models.BooleanField(default=False, verbose_name='Vista Previa'),
        ),
        migrations.AlterField(
            model_name='artifact',
            name='file',
            field=models.URLField(verbose_name='Archivo'),
        ),
    ]

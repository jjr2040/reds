# Generated by Django 2.1.2 on 2018-11-26 02:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0010_auto_20181117_1858'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workplanactivity',
            name='end_date',
            field=models.DateField(verbose_name='Fecha de fin'),
        ),
        migrations.AlterField(
            model_name='workplanactivity',
            name='start_date',
            field=models.DateField(verbose_name='Fecha de inicio'),
        ),
    ]

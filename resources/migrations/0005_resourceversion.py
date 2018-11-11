# Generated by Django 2.1.2 on 2018-11-04 18:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0004_auto_20181103_1256'),
    ]

    operations = [
        migrations.CreateModel(
            name='ResourceVersion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Fecha creación')),
                ('version_number', models.IntegerField(verbose_name='Versión Número')),
                ('file', models.TextField(verbose_name='Archivo')),
                ('resource', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='resource', to='resources.Resource')),
            ],
            options={
                'verbose_name': 'ResourceVersion',
                'verbose_name_plural': 'ResourceVersions',
            },
        ),
    ]
# Generated by Django 2.1.1 on 2018-09-30 23:59

from django.db import migrations
import s3direct.fields


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0004_auto_20180930_2334'),
    ]

    operations = [
        migrations.AlterField(
            model_name='artifact',
            name='file',
            field=s3direct.fields.S3DirectField(),
        ),
    ]

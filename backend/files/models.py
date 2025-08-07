from django.db import models

class File(models.Model):
    filename = models.CharField(max_length=500, help_text="The name of the file")
    s3url = models.CharField(max_length=500, help_text="The Amazon S3 url of the file")
    def __str__(self):
        return f"{self.filename}"
    

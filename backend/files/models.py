from django.db import models

class File(models.Model):
    filename = models.CharField(max_length=500, help_text="The name of the file")
    diskname = models.CharField(max_length=537, help_text="The on disk uuid name of the file")
    def __str__(self):
        return f"{self.diskname}"
    

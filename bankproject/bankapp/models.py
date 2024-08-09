from django.db import models

# Create your models here.

class BasicInformation(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    full_name = models.CharField(max_length=255)
    father_or_husband_name = models.CharField(max_length=255)
    gender = models.CharField(max_length=10)
    occupation = models.CharField(max_length=255)
    income = models.CharField(max_length=255)
    kyc_document_number = models.CharField(max_length=255)
    email = models.EmailField()
    mobile = models.CharField(max_length=20)
    permanent_address = models.TextField()
    address_details = models.TextField()
    communication_address = models.TextField()
    pin_code = models.CharField(max_length=10)

    # def __str__(self):
    #     return self.full_name

class BasicInfoAccount(models.Model):
    account_number = models.CharField(max_length=50)
    loan_amount = models.CharField(max_length=50)
    loan_requested_for = models.CharField(max_length=255)

    # def __str__(self):
    #     return self.account_number

class User(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    email = models.EmailField()
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=20, blank=True, null=True)

    # def __str__(self):
    #     return self.email

class Admin(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    email = models.EmailField()
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=20)

    # def __str__(self):
    #     return self.email

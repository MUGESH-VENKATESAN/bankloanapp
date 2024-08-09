# from rest_framework import serializers
# from .models import *

# class BasicInformationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = BasicInformation
#         fields = [
#             'id', 'full_name', 'father_or_husband_name', 'gender', 'occupation', 
#             'income', 'kyc_document_number', 'email', 'mobile', 
#             'permanent_address', 'address_details', 'communication_address', 'pin_code'
#         ]

# class BasicInfoAccountSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = BasicInfoAccount
#         fields = [
#             'account_number', 'loan_amount', 'loan_requested_for'
#         ]

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = [
#             'id', 'email', 'password', 'role'
#         ]

# class AdminSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Admin
#         fields = [
#             'id', 'email', 'password', 'role'
#         ]

from rest_framework import serializers
from .models import *

class BasicInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasicInformation
        fields = '__all__'

class BasicInfoAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BasicInfoAccount
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

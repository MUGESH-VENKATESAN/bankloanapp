
# from django.contrib import admin
# from django.urls import path
# from bankapp.views import BasicInformationView, BasicInfoAccountView, UserView, AdminView

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('basic-information/', BasicInformationView.as_view(), name='basic-information'),
#     path('basic-information/<str:pk>/', BasicInformationView.as_view(), name='basic-information-detail'),
#     path('basic-info-account/', BasicInfoAccountView.as_view(), name='basic-info-account'),
#     path('basic-info-account/<str:pk>/', BasicInfoAccountView.as_view(), name='basic-info-account-detail'),
#     path('users/', UserView.as_view(), name='users'),
#     path('users/<str:pk>/', UserView.as_view(), name='user-detail'),
#     path('admins/', AdminView.as_view(), name='admins'),
#     path('admins/<str:pk>/', AdminView.as_view(), name='admin-detail'),
# ]
from django.contrib import admin
from django.urls import path
from bankapp.views import BasicInformationView, BasicInfoAccountView, UserView, AdminView

urlpatterns = [
    path('admin/', admin.site.urls),

    # Basic Information URLs
    path('basic-information/', BasicInformationView.as_view(), name='basic-information-list'),
    path('basic-information/<str:pk>/', BasicInformationView.as_view(), name='basic-information-detail'),

    # Basic Info Account URLs
    path('basic-info-account/', BasicInfoAccountView.as_view(), name='basic-info-account-list'),
    path('basic-info-account/<str:pk>/', BasicInfoAccountView.as_view(), name='basic-info-account-detail'),

    # User URLs
    path('users/', UserView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserView.as_view(), name='user-detail'),
    path('users/login/', UserView.as_view(), name='user-login'),
    # path('users/login/', UserView.as_view({'post': 'post_login'}), name='user-login'),
    # Admin URLs
    path('admins/', AdminView.as_view(), name='admin-list'),
    path('admins/<int:pk>/', AdminView.as_view(), name='admin-detail'),
   
]


from django_rq import enqueue
from django.contrib.auth.tokens import default_token_generator
from .models import UserAccount
from djoser import utils
from email.utils import formataddr
from django.core.mail import EmailMultiAlternatives
from django.template import loader
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


class BaseControllerMail():
    def __init__(self, request=None, context=None, template_name=None,
                 *args, **kwargs):
        if context is not None:
            self.user:UserAccount = context.get("user", None)
        else:
            self.user = None

class ActivationEmail(BaseControllerMail):    
    def send(self, to, *args, **kwargs):
        to_string = ','.join(to)
        if self.user is not None:
            kwargs = {"user_id": self.user.pk, "to_string": to_string}
            enqueue(send_activation_email, *args, **kwargs)

class ConfirmationEmail(BaseControllerMail):    
    def send(self, to, *args, **kwargs):
        to_string = ','.join(to)
        if self.user is not None:
            kwargs = {"user_id": self.user.pk, "to_string": to_string}
            enqueue(send_confirmation_email, *args, **kwargs)

class PasswordResetEmail(BaseControllerMail):
   def send(self, to, *args, **kwargs):
        to_string = ','.join(to)
        if self.user is not None:
            kwargs = {"user_id": self.user.pk, "to_string": to_string}
            enqueue(send_activation_password_email, *args, **kwargs)

class PasswordChangedConfirmationEmail(BaseControllerMail):
    def send(self, to, *args, **kwargs):
        to_string = ','.join(to)
        if self.user is not None:
            kwargs = {"user_id": self.user.pk, "to_string": to_string}
            enqueue(send_confirmation_password_email, *args, **kwargs)


def send_activation_email(*args, **kwargs):
    active_url = getattr(settings, "ACTIVATE_URL", "http://localhost:3000/activation/{uid}/{token}")
    user_id = kwargs.get("user_id", None)
    to_string = kwargs.get("to_string", "angel.napolesqva@gmail.com")
    to = str(to_string).split(",")
    user = UserAccount.objects.filter(pk=user_id).first()    
    if user is not None:
        activation_url = active_url.format(
            **{
                "uid":utils.encode_uid(user.pk), 
                "token": default_token_generator.make_token(user)
            }
        )
        data_dict = {
            "name_site": getattr(settings, "SITE_NAME", "Next-Store"),
            "activation_url": activation_url
        }
        text_template = loader.render_to_string('user_emails/activation.txt', context=data_dict)
        html_template = loader.render_to_string('user_emails/activation.html', context=data_dict)
        try:
            sender_name = getattr(settings, "EMAIL_FROM_NAME", "Next-Store")
            sender_email = getattr(settings, "EMAIL_FROM", "angel.napolesqva@gmail.com")
            sender = formataddr((sender_name, sender_email))
            subject = "Account Activation Email"
            msg = EmailMultiAlternatives(subject, text_template, sender, to)
            msg.attach_alternative(html_template, "text/html")
            msg.send()
            logger.info("Success Activation Email Send")
        except Exception as e:
            logger.info("Exception Activation Email Send")
            logger.info(str(e))

def send_confirmation_email(*args, **kwargs):    
    url_login = getattr(settings, "URL_LOGIN", "http://localhost:3000/auth/login")
    to_string = kwargs.get("to_string", "angel.napolesqva@gmail.com")
    to = str(to_string).split(",")       
    data_dict = {
        "url_login": url_login,
        "name_site": getattr(settings, "SITE_NAME", "Next-Store"),
    }
    text_template = loader.render_to_string('user_emails/confirmation.txt', context=data_dict)
    html_template = loader.render_to_string('user_emails/confirmation.html', context=data_dict)
    try:
        sender_name = getattr(settings, "EMAIL_FROM_NAME", "Next-Store")
        sender_email = getattr(settings, "EMAIL_FROM", "angel.napolesqva@gmail.com")
        sender = formataddr((sender_name, sender_email))
        subject = "Account Success Activation"
        msg = EmailMultiAlternatives(subject, text_template, sender, to)
        msg.attach_alternative(html_template, "text/html")
        msg.send()
        logger.info("Success Confirmation Email Send")
    except Exception as e:
        logger.info("Exception Confirmation Email Send")
        logger.info(str(e))

def send_activation_password_email(*args, **kwargs):
    reset_url = getattr(settings, "RESET_CONFIRM_URL", "http://localhost:3000/password-reset/{uid}/{token}")
    user_id = kwargs.get("user_id", None)
    to_string = kwargs.get("to_string", "angel.napolesqva@gmail.com")
    to = str(to_string).split(",")
    user = UserAccount.objects.filter(pk=user_id).first()    
    if user is not None:
        reset_url = reset_url.format(
            **{
                "uid":utils.encode_uid(user.pk), 
                "token": default_token_generator.make_token(user)
            }
        )
        data_dict = {
            "name_site": getattr(settings, "SITE_NAME", "Next-Store"),
            "reset_url": reset_url
        }
        text_template = loader.render_to_string('user_emails/password_reset.txt', context=data_dict)
        html_template = loader.render_to_string('user_emails/password_reset.html', context=data_dict)
        try:
            sender_name = getattr(settings, "EMAIL_FROM_NAME", "Next-Store")
            sender_email = getattr(settings, "EMAIL_FROM", "angel.napolesqva@gmail.com")
            sender = formataddr((sender_name, sender_email))
            subject = "Account Password Reset Email"
            msg = EmailMultiAlternatives(subject, text_template, sender, to)
            msg.attach_alternative(html_template, "text/html")
            msg.send()
            logger.info("Success Password Reset Email Send")
        except Exception as e:
            logger.info("Exception Password Reset Email Send")
            logger.info(str(e))

def send_confirmation_password_email(*args, **kwargs):
    url_login = getattr(settings, "URL_LOGIN", "http://localhost:3000/auth/login")
    to_string = kwargs.get("to_string", "angel.napolesqva@gmail.com")
    to = str(to_string).split(",")       
    data_dict = {
        "url_login": url_login,
        "name_site": getattr(settings, "SITE_NAME", "Next-Store"),
    }
    text_template = loader.render_to_string('user_emails/password_confirm.txt', context=data_dict)
    html_template = loader.render_to_string('user_emails/password_confirm.html', context=data_dict)
    try:
        sender_name = getattr(settings, "EMAIL_FROM_NAME", "Next-Store")
        sender_email = getattr(settings, "EMAIL_FROM", "angel.napolesqva@gmail.com")
        sender = formataddr((sender_name, sender_email))
        subject = "Account Success Password Changed"
        msg = EmailMultiAlternatives(subject, text_template, sender, to)
        msg.attach_alternative(html_template, "text/html")
        msg.send()
        logger.info("Success Password Changed Email Send")
    except Exception as e:
        logger.info("Exception Password Changed Email Send")
        logger.info(str(e))


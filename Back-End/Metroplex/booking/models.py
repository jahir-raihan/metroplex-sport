from django.db import models
from django.contrib.auth import get_user_model


# Get user model
User = get_user_model()


class Court(models.Model):

    """
    Model for storing  court data of each day.
    Every day 3 court objects will be created along with
    24 hours timetable with them using cron-job
    """

    court_name = models.CharField(max_length=50)
    court_name_postfix = models.CharField(max_length=10, null=True, blank=True)
    created_at = models.DateField(auto_now_add=True, db_index=True)


class TimeSlot(models.Model):

    """
    Model for storing an hour objects, and it's booking, holding
    bookers names along with some other fields for tracking.
    """

    from_time = models.TimeField()
    to_time = models.TimeField()

    is_booked = models.BooleanField(default=False)
    booking_time = models.DateTimeField(null=True, blank=True)
    booked_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='booked_by', blank=True, null=True)

    court = models.ForeignKey(Court, on_delete=models.SET_NULL, null=True, blank=True)

    on_hold = models.BooleanField(default=False)
    hold_by = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='hold_by', blank=True, null=True)
    hold_start_time = models.DateTimeField(null=True, blank=True)

    team1_name = models.CharField(max_length=20, null=True, blank=True)
    team2_name = models.CharField(max_length=20, null=True, blank=True)


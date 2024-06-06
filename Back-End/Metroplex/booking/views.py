# Imports

from django.views import View
from django.shortcuts import render, redirect
from .models import Court, TimeSlot
from datetime import datetime
from django.db.models import Q

# End Imports


class HomeView(View):

    """
    Home view of metro-plex website
    """
    template_name = 'search.html'

    def get(self, request):

        """
        Get method for rendering search page with some banners
        :param request:
        """

        data = request.GET
        if data.get('date'):
            return redirect(f'/search?date={data.get('date')}&sport-type={data.get('sport-type')}')

        context = {}

        return render(request, self.template_name, context)


class SearchView(View):

    """
    Search view
    """

    template_name = 'time-slots.html'

    def get(self, request):

        """
        View after search is being made
        :param request:
        :return courts&courts.timeslots:
        """

        data = request.GET
        date = data.get('date')
        sport_type = data.get('sport-type')

        # Catch request for invalid lookup and redirect
        try:
            if not (date or sport_type):
                return redirect('home')
            date = datetime.strptime(date, '%Y-%m-%d').date()
        except Exception:
            return redirect('home')

        # Filter courts based on sport_type and date
        courts = Court.objects.filter(
            Q(created_at=date) & Q(court_name=sport_type)
        ).prefetch_related('timeslot_set')

        # Create context with courts and their timeslots
        context = {
            'courts': [
                {
                    'court': court,
                    'timeslots': court.timeslot_set.all()
                }
                for court in courts
            ]
        }

        return render(request, self.template_name, context)

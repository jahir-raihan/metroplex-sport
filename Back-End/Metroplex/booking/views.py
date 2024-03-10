# Imports

from django.views import View
from django.shortcuts import render

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
        :return:
        """

        context = {}

        return render(request, self.template_name, context)

"""
Render the front end of the app
"""

import os
import json

# from auth import fetch_url
# from auth import get_access_token
# from auth import get_user_name
from basehandler import BaseHandler


class RenderApp(BaseHandler):
    """
    Check that the user is logged in, then render the front end of the app
    """

    def get(self):

        # Check that user is logged in. Send to auth if False
        #if not self.session.get('logged_in'):
        #    self.redirect('/auth')
        #    return

        # Get data for render
        #data = _get_front_page_data()

        # Put data into context
        context = {"name": "ben"}

        # Render the app
        self.render('index', context)

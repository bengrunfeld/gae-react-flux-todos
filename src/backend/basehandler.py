"""
BaseHandler provides the necessary setup for sessions and page renders
to be performed.
"""

import os
import json

import jinja2
import webapp2

from webapp2_extras import sessions


TEMPLATE_DIR = '/templates'
TEMPLATE_SUFFIX = '.html'

GITHUB_API_URL = 'https://api.github.com'
ACCESS_TOKEN = os.environ.get('ACCESS_TOKEN')

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


class BaseHandler(webapp2.RequestHandler):
    """
    Set up sessions and perform template renders
    """

    def dispatch(self):
        # Get a session store for this request.
        self.session_store = sessions.get_store(request=self.request)

        try:
            # Dispatch the request.
            webapp2.RequestHandler.dispatch(self)
        finally:
            # Save all sessions.
            self.session_store.save_sessions(self.response)

    @webapp2.cached_property
    def session(self):
        # Returns a session using the default cookie key.
        return self.session_store.get_session()

    def render(self, template_name, context=''):

        if not template_name.startswith(TEMPLATE_DIR):
            template_name = os.path.join(TEMPLATE_DIR, template_name)

        if not template_name.endswith(TEMPLATE_SUFFIX):
            template_name += TEMPLATE_SUFFIX

        template = JINJA_ENVIRONMENT.get_template(template_name)
        self.response.write(template.render(context))


class JsonHandler(webapp2.RequestHandler):
    """Dump outgoing JSON then send it"""

    # TODO: Possibly implement this across app
    def send_json(self, payload, **kwargs):
        self.response.out.write(json.dumps(payload, **kwargs))

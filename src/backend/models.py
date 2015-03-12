"""
Models the data that is stored in the datastore (NDB) and retrieved from it
"""

from google.appengine.ext import ndb


class TodoModel(ndb.Model):
    "Models an individual todo title"
    todoText = ndb.StringProperty()
    time_stored = ndb.DateTimeProperty(auto_now_add=True)

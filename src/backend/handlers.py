"""
The handlers below are triggered by routes.py
They execute commands that retrieve, store, update and delete resources.
"""

import json
import webapp2
import datetime

from google.appengine.ext import ndb

from models import TodoModel


def build_new_dict(data):
    """Build a new dict so that the data can be JSON serializable"""

    result = data.to_dict()
    print result
    record = {}

    # Make datetime objects JSON serializable
    for key in result.iterkeys():
        if isinstance(result[key], datetime.datetime):
            record[key] = result[key].isoformat()
            continue
        record[key] = result[key]

    # Add the key so that we have a reference to the record
    record['id'] = data.key.id()

    return record


def serialize_data(qry):
    """serialize ndb return data so that we can convert it to JSON"""

    # check if qry is a list (multiple records) or not (single record)
    data = []

    if type(qry) != list:
        record = build_new_dict(qry)
        return record

    for q in qry:
        data.append(build_new_dict(q))

    return data


def initialize_headers(headers, http_verb):
    """Set up the headers for HTTP requests"""

    headers['Access-Control-Allow-Origin'] = 'null'
    headers['Access-Control-Allow-Methods'] = http_verb
    headers['Access-Control-Request-Method'] = http_verb
    headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
    headers['Content-Type'] = 'text/plain'

    return headers


class HandleOptions(webapp2.RequestHandler):
    def options(self):
        """GET /: Retrieve all todos"""

        self.response.headers = initialize_headers(self.response.headers, 'OPTIONS')

        # HTTP DELETE requests come as a header with OPTIONS, so it needs to be set here
        self.response.headers = initialize_headers(self.response.headers, 'DELETE')


class DisplayHomePage(webapp2.RequestHandler):
    def get(self):
        """GET /: Display home page"""

        self.response.headers = initialize_headers(self.response.headers, 'GET')




class GetAllTodos(webapp2.RequestHandler):
    def get(self):
        """GET /: Retrieve all todos"""

        self.response.headers = initialize_headers(self.response.headers, 'GET')

        qry = TodoModel.query().fetch()
        all_todos = serialize_data(qry)

        self.response.out.write(json.dumps(all_todos, sort_keys=True, indent=4))


class GetTodo(webapp2.RequestHandler):
    def get(self, todo_id):
        """GET /<todo_id>: Retrieve a single todo"""

        self.response.headers = initialize_headers(self.response.headers, 'GET')

        qry = ndb.Key('TodoModel', int(todo_id))
        record = serialize_data(qry.get())

        self.response.write(json.dumps(record, sort_keys=True, indent=4))


class CreateTodo(webapp2.RequestHandler):
    def post(self):
        """POST /: Create a single todo"""

        self.response.headers = initialize_headers(self.response.headers, 'POST')

        # new_title = json.loads(self.request.body).get('title')
        new_todo = self.request.get('todoText')
        new_todo = TodoModel(title = new_todo)
        key = new_todo.put()

        response_text = json.dumps(dict([('response', 'Successfully added to database')]))

        self.response.write(response_text)


class UpdateTodo(webapp2.RequestHandler):
    def put(self, todo_id):
        """PUT /<todo_id>: Update a single todo"""

        self.response.headers = initialize_headers(self.response.headers, 'UPDATE')

        qry = ndb.Key('TodoModel', int(todo_id))

        target = qry.get()
        target.title = self.request.get('title')
        target.put()

        self.response.write('Record was updated')


class DeleteTodo(webapp2.RequestHandler):
    def delete(self, todo_id):
        """DELETE /<todo_id>: Delete a single todo"""

        self.response.headers = initialize_headers(self.response.headers, 'DELETE')

        qry = ndb.Key('TodoModel', int(todo_id))
        qry.delete()

        self.response.write('{} was deleted'.format('record'))

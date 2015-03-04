"""
This file sets up a RESTful API, using HTTP methods combined with URI's to trigger
handlers that retrieve, store, update and delete resources.
"""

import webapp2

from webapp2_extras import routes

from config import config
from handlers import HandleOptions
from handlers import GetAllTodos
from handlers import GetTodo
from handlers import CreateTodo
from handlers import UpdateTodo
from handlers import DeleteTodo
from main import RenderApp


app = webapp2.WSGIApplication([
    routes.PathPrefixRoute('/todos', [
        # List all todos
        webapp2.Route('/',
                      handler=RenderApp,
                      name='render-app',
                      methods=['GET']),
        # List one todo
#        webapp2.Route('/',
#                      handler=GetTodo,
#                      name='list-one-todo',
#                      methods=['GET']),
        # Create a new todo
        webapp2.Route('/',
                      handler=CreateTodo,
                      name='create-todo',
                      methods=['POST']),
        # Update an existing todo
        webapp2.Route('/<model_id>',
                      handler=UpdateTodo,
                      name='update-todo',
                      methods=['PUT']),
        # Delete an existing todo
        webapp2.Route('/',
                      handler=DeleteTodo,
                      name='delete-todo',
                      methods=['DELETE']),
        # Route a HTTP request that uses OPTIONS
        webapp2.Route('/',
                      handler=HandleOptions,
                      name='handle-rpc',
                      methods=['OPTIONS']),
    ]),
], config=config())

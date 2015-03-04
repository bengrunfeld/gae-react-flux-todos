"""
Set up the config for the request handler
Add a secret key for enhanced security
"""


def config():
    config = {}
    config['webapp2_extras.sessions'] = {
        'secret_key': ''  # use secret key
    }
    return config

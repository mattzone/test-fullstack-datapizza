import json

class Cache:
    def __init__(self, filename='cache.txt'):
        self.filename = filename
        self.cache = self.load_cache()

    def load_cache(self):
        try:
            with open(self.filename, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return {}

    def save_cache(self):
        with open(self.filename, 'w') as f:
            json.dump(self.cache, f)

    def get(self, query):
        return self.cache.get(query, None)

    def set(self, query, answer):
        self.cache[query] = answer
        self.save_cache()


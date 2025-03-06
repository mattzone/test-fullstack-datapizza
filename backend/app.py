from flask import Flask, request
from flask_cors import CORS
import json
from lorem_text import lorem

app = Flask(__name__)
CORS(app, support_credentials=True)


@app.route('/documents')
def get_documents():
    """
        Retrieve a list of documents.
        Returns a dictionary containing a list of documents, where each document has a title and content.
    """

    return {
        'documents': [
            {"title": "Doc 1", "content": "Questo è l'inizio di un paragrafo..."},
            {"title": "Doc 2", "content": "Questo è l'inizio di un altro paragrafo..."}
        ]
    }


@app.route('/generate',  methods=['POST'])
def post_generate():
    """
        Generate a response based on the given query.

        This function handles POST requests to the '/generate' endpoint. It retrieves
        a query from the request body, checks if a response for the query exists in
        the cache, and returns the cached response if available. If not, it generates
        a new response using lorem text, stores it in the cache, and returns it.

        Returns a dictionary containing the generated response under the 'response' key.
    """

    query = request.json['query']  # retrieve the query

    # load the cache save in cache.json
    with open('cache.json', 'r', encoding='utf-8') as json_file:
        cache = json.load(json_file)

    answer = cache.get(query)  # check if the query is in the cache

    # if not, generate a new response
    if not answer:
        answer = lorem.paragraph()  # generate a new response using lorem ipsum
        cache[query] = answer  # store the response in the cache

        # save the cache in cache.json
        with open('cache.json', 'w', encoding='utf-8') as json_file:
            json.dump(cache, json_file, ensure_ascii=False, indent=2)

    return {'response': answer}  # return the answer


if __name__ == '__main__':
    app.run(debug=True)

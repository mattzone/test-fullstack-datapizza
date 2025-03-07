from flask import Flask, request
from flask_cors import CORS
import json
import asyncio
from lorem_text import lorem
import cache

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
            {"title": "Document 1", "content": "Blanditiis fuga deleniti rem nemo rerum sed omnis recusandae perspiciatis, enim eos distinctio eveniet optio cumque ducimus voluptate quod sit."},
            {"title": "Document 2", "content": "Enim quidem doloribus voluptates doloremque, assumenda quo voluptatum, sit sapiente obcaecati deleniti."}
        ]
    }


@app.route('/generate',  methods=['POST'])
async def post_generate():
    """
        Generate a response based on the given query.

        This function handles POST requests to the '/generate' endpoint. It retrieves
        a query from the request body, checks if a answer for the query exists in
        the cache, and returns the cached answer if available. If not, it generates
        a new answer using lorem text, stores it in the cache, and returns it.

        Returns a dictionary containing the generated answer under the 'response' key.
    """

    query = request.json['query']  # retrieve the query

    cache_json = await asyncio.create_task(cache.get_json())  # load the cache
    answer = cache_json.get(query)  # check if the query is in the cache

    # if not, generate a new response
    if not answer:
        answer = lorem.paragraph()  # generate a new response using lorem ipsum
        cache_json[query] = answer  # store the response in the cache
        # save the cache
        await asyncio.create_task(cache.save_json(cache_json))

    return {'response': answer}  # return the answer


if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request

app = Flask(__name__)

@app.route('/documents')
def get_documents():
    return {
        'documents': [
            {'title': 'Doc 1', 'content': 'Questo è l\'inizio di un paragrafo...'},
            {'title': 'Doc 2', 'content': 'Questo è l\'inizio di un altro paragrafo...'}
        ]
    }

@app.route('/generate',  methods = ['POST'])
def post_generate():
    cache = {
        "Qual è la capitale dell'Italia?": "La capitale dell'Italia è Roma.",
        "Qual è il colore del cielo?": "Il colore del cielo è generalmente blu.",
        "Qual è la somma di 2 + 2?": "La somma di 2 + 2 è 4.",
        "Quando è stata fondata Microsoft?": "Microsoft è stata fondata il 4 aprile 1975.",
        "Qual è l'animale più veloce del mondo?": "L'animale più veloce del mondo è il ghepardo."
    }
    query = request.json['query']
    answer = cache.get(query)

    return {
        'response': answer
    }


if __name__ == '__main__':
    app.run(debug=True)

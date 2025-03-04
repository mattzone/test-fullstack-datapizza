from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/documents')
def get_documents():
    return {
        'documents': [
  {
    "title": "Doc 1",
    "content": "In un mondo pieno di infinite possibilità, le opportunità di esplorazione sono altrettanto illimitate. Continuando la nostra avventura, scopriremo nuovi orizzonti e supereremo gli ostacoli che incontreremo lungo il cammino. Non ci fermeremo mai, perché la nostra sete di conoscenza ci spinge sempre avanti."
  },
  {
    "title": "Doc 2",
    "content": "Immagina un futuro in cui la tecnologia e la creatività lavorano insieme in perfetta armonia. In questo mondo, le idee innovative prendono vita con facilità e le barriere che una volta ci trattenevano cadono come foglie in autunno. Il potere di trasformare i nostri sogni in realtà è alla nostra portata, basta avere il coraggio di afferrarlo."
  },
  {
    "title": "Doc 3",
    "content": "La bellezza della natura ci circonda ovunque andiamo, offrendoci un rifugio tranquillo dal trambusto della vita quotidiana. Ogni albero, fiore e ruscello racconta una storia di crescita e resilienza, insegnandoci lezioni preziose su come affrontare le sfide con grazia e determinazione. Abbracciando questa saggezza, possiamo trovare la pace interiore e la forza necessaria per prosperare."
  }
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

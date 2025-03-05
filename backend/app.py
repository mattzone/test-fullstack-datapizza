from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, support_credentials=True)


@app.route('/documents')
def get_documents():
    return {
        'documents': [
            {"title": "Doc 1", "content": "Questo è l'inizio di un paragrafo..."},
            {"title": "Doc 2", "content": "Questo è l'inizio di un altro paragrafo..."}
        ]
    }


@app.route('/generate',  methods=['POST'])
def post_generate():
    cache = {
        "Qual è la capitale dell'Australia?": "La capitale dell'Australia è Canberra.",
        "Quanto pesa un elefante africano adulto?": "Un elefante africano adulto può pesare tra 4.000 e 7.000 chilogrammi.",
        "Chi ha scritto 'Il nome della rosa'?": "Il libro 'Il nome della rosa' è stato scritto da Umberto Eco.",
        "Come si calcola l'area di un cerchio?": "L'area di un cerchio si calcola con la formula A = πr², dove r è il raggio.",
        "Quanti pianeti ci sono nel Sistema Solare?": "Nel Sistema Solare ci sono otto pianeti.",
        "Qual è il colore primario che manca in una combinazione di rosso e blu?": "Il colore primario mancante in una combinazione di rosso e blu è il giallo.",
        "Quanto dura un volo da Roma a New York?": "Un volo diretto da Roma a New York dura circa 9 ore.",
        "Qual è la velocità della luce?": "La velocità della luce nel vuoto è di circa 299.792.458 metri al secondo.",
        "Chi è l'autore della teoria della relatività?": "L'autore della teoria della relatività è Albert Einstein.",
        "Qual è il più grande oceano del mondo?": "Il più grande oceano del mondo è l'Oceano Pacifico.",
        "In che anno è avvenuta la prima missione sulla Luna?": "La prima missione sulla Luna, Apollo 11, è avvenuta nel 1969.",
        "Qual è il paese più popoloso del mondo?": "Il paese più popoloso del mondo è la Cina.",
        "Come si chiama il gas che compone la maggior parte dell'atmosfera terrestre?": "Il gas che compone la maggior parte dell'atmosfera terrestre è l'azoto.",
        "Qual è la montagna più alta del mondo?": "La montagna più alta del mondo è l'Everest, con un'altitudine di circa 8.848 metri.",
        "Che strumento misura i terremoti?": "I terremoti vengono misurati dal sismografo.",
        "Cosa succede durante un'eclissi solare?": "Un'eclissi solare si verifica quando la Luna passa tra la Terra e il Sole, bloccando la luce del Sole e proiettando un'ombra sulla Terra. Esistono tre tipi principali di eclissi solari: totale, parziale e anulare. In un'eclissi totale, la Luna copre completamente il disco solare, mentre in un'eclissi parziale ne copre solo una parte. Nell'eclissi anulare, la Luna è troppo lontana per coprire completamente il Sole, lasciando visibile un anello luminoso attorno alla Luna.",
        "Come funziona l'energia solare?": "L'energia solare è prodotta convertendo la luce del sole in elettricità o calore. Ci sono due principali tipi di tecnologia solare: fotovoltaica (PV) e solare termica. La tecnologia fotovoltaica utilizza celle solari, di solito fatte di silicio, per convertire direttamente la luce solare in elettricità. La solare termica, invece, usa specchi o lenti per concentrare la luce del sole su un fluido, che viene riscaldato e usato per produrre vapore e generare elettricità tramite una turbina. L'energia solare è considerata una delle fonti più promettenti di energia rinnovabile.",
        "Cos'è l'effetto serra?": "L'effetto serra è un processo naturale che permette alla Terra di mantenere una temperatura adatta alla vita. Alcuni gas presenti nell'atmosfera, come anidride carbonica, metano e vapore acqueo, trattengono parte del calore che la Terra emette dopo essere stata riscaldata dal Sole. Questi gas impediscono che tutto il calore venga disperso nello spazio, mantenendo il pianeta più caldo. Tuttavia, le attività umane come la combustione di combustibili fossili stanno aumentando la concentrazione di questi gas, causando un riscaldamento globale e cambiamenti climatici significativi.",
        "Come funziona l'intelligenza artificiale?": "L'intelligenza artificiale (IA) è un campo dell'informatica che si occupa della creazione di macchine e software in grado di svolgere compiti che normalmente richiedono l'intelligenza umana. Ciò include il riconoscimento di immagini, la comprensione del linguaggio naturale, l'apprendimento automatico e la presa di decisioni. Una delle tecnologie principali dietro l'IA è il machine learning, in cui i sistemi imparano da grandi quantità di dati per migliorare le proprie prestazioni nel tempo. Le reti neurali artificiali, ispirate dal cervello umano, sono spesso usate per compiti complessi come il riconoscimento vocale o la guida autonoma.",
        "Perché l'acqua è essenziale per la vita?": "L'acqua è fondamentale per la vita perché svolge numerose funzioni essenziali all'interno degli organismi viventi. Agisce come solvente, permettendo alle molecole di sciogliersi e reagire tra di loro; partecipa nei processi di trasporto delle sostanze nutritive, eliminazione dei rifiuti e regolazione della temperatura corporea. È anche essenziale per la fotosintesi nelle piante, il processo che converte l'energia solare in energia chimica. Senza acqua, le cellule non sarebbero in grado di mantenere la loro struttura e funzionamento, rendendo impossibile la vita come la conosciamo."
    }
    query = request.json['query']
    answer = cache.get(query)

    return {'response': answer}


if __name__ == '__main__':
    app.run(debug=True)

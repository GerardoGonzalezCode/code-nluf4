require('dotenv').config()
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

exports.handler = async (event) => {
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2021-03-25',
        authenticator: new IamAuthenticator({
          apikey: process.env.API_KEY,
        }),
        serviceUrl: process.env.URL_API,
    });

    const analyzeParams = {
        'text': event.historial_clinico,
        'features': {
            'keywords': {
                'sentiment': true,
                'emotion': true,
                'limit': 5,
            },
            'entities': {
                'sentiment': true,
                'emotion': true,
                'limit': 5,
            },
        }
    };

    let response = {};

    const result = await naturalLanguageUnderstanding.analyze(analyzeParams)
    /*.then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));    
    }).catch(err => {
        console.log('error:', err);
    });*/

    /*resultJSON.keywords.forEach(element => {
        let text = element.text
        let sentiment = element.sentiment.label
        let relevance = element.relevance
        let count = element.count
        let keyword = { 
            text : {
                "sentimiento": sentiment,
                "relevancia": relevance,
                "repeticiones": count,
            }
        };
        response['palabras_clave_desc'][keyword]
    });*/

    return result.result
};
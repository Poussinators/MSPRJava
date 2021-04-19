import { Promotion } from "../interfaces/promotion"
// import { React } from "react"
// import { ReactDOM } from "react-dom"


const login = require('../../appSettings.json').login
const password = require('../../appSettings.json').password

export class MsprAPI {

    private token: string = ''

    constructor() {}

    public async initToken() {

        return new Promise<void>(async (resolve, reject) => {

            // Test si l'API est up.
            const data: any = await (await fetch(`http://mspr.webqbe.com/`)).json()
            if (data.name != 'MsprJavaOuPasWebService' || data.version == undefined) {
                reject()
            }

            // Récupération du token d'API possiblement stocké en méoire interne.
            const internalToken = window.localStorage.getItem("token")

            // console.log('internalToken :', internalToken);

            if (internalToken != null) {
                // TODO : s'il existe, check s'il est valide en interogeant l'API
                const response: any = await (await fetch(`http://mspr.webqbe.com/getTokenValidity?token=${internalToken}`)).json()

                // console.log('getTokenValidity :', response);

                if(response.response[0].validity) {
                    // console.log('internalToken is valid');
                    this.token = internalToken
                    resolve()
                }
                // else {
                //     console.log('internalToken is not valid.');
                // }
            }
            // else {
            //     console.log('internalToken doesn\'t exist.');
            // }

            fetch(`http://mspr.webqbe.com/token?login=${login}&password=${password}`)
            .then(async (res) => {
                const response: any = await res.json()

                // console.log('response :', response);

                if (response.status == 'OK') {
                    this.token = response.token
                    // TODO : On enregistre le token dans l'internal storage
                    window.localStorage.setItem("token", this.token);
                }

            })

            resolve()

        })
        
    }

    public getAPromotion(code: string): Promise<Promotion> {

        return new Promise<Promotion>((resolve, reject) => {

            // resolve({
            //     codePromo: "UNICORN04",
            //     libelle: "C'est la fete des licornes !",
            //     sujet: "sur chaque article Licorne achetés.",
            //     description: "Quelle dinguerie cette promotion !",
            //     valeurPromo: 10,
            //     typePromo: 2,
            //     dateDebut: "2021-03-11 10:26:00.000",
            //     dateFin: "2021-05-01 10:26:00.000",
            //     imgPath: "https://test.com/img.png"
            // })
            
            fetch(`http://mspr.webqbe.com/promotion?token=${this.token}&codePromo=${code}`)
            .then(async (res) => {
                    const response: any = await res.json()
                    if (response.status == 'OK') {
                        resolve(response.response[0])
                    }
                    else {
                        reject()
                    }
            })

        })
    } 

}
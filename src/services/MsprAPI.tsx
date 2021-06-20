import { Promotion } from "../interfaces/promotion"
import AsyncStorage from '@react-native-async-storage/async-storage'
import "isomorphic-fetch";
// import { React } from "react"
// import { ReactDOM } from "react-dom"


const login = require('../../appSettings.json').login
const password = require('../../appSettings.json').password

export class MsprAPI {

    readonly token: string = ''

    constructor() {}

    public async initToken() {

        return new Promise<void>(async (resolve, reject) => {

            console.log('===== DEBUT MsprAPI.initToken =====')

            // Test si l'API est up.
            console.log(`REQ: http://mspr.webqbe.com/`)
            const data: any = await (await fetch(`http://mspr.webqbe.com/`)).json()
            console.log(`RES:`, data)
            if (data.name != 'MsprJavaOuPasWebService' || data.version == undefined) {
                reject()
            }

            // Récupération du token d'API possiblement stocké en méoire interne.
            const internalToken = await AsyncStorage.getItem("token")

            console.log('internalToken :', internalToken)

            if (internalToken != null) {
                // TODO : s'il existe, check s'il est valide en interogeant l'API
                console.log(`REQ: http://mspr.webqbe.com/getTokenValidity?token=${internalToken}`)
                const response: any = await (await fetch(`http://mspr.webqbe.com/getTokenValidity?token=${internalToken}`)).json()
                console.log('RES:', response)

                console.log('getTokenValidity :', response)

                if(response.response[0].validity) {
                    console.log('internalToken is valid')
                    this.token = internalToken
                    resolve()
                    console.log('=====  FIN MsprAPI.initToken  =====')
                    return
                }
                else {
                    console.log('internalToken is not valid.')
                }
            }
            else {
                console.log('internalToken doesn\'t exist.')
            }

            console.log('Récupération d\'un nouveau token.')
            console.log(`REQ: http://mspr.webqbe.com/token?login=${login}&password=${password}`)
            fetch(`http://mspr.webqbe.com/token?login=${login}&password=${password}`)
            .then(async (res) => {
                const response: any = await res.json()

                console.log('RES:', response)
                console.log('New Token :', response)

                if (response.status == 'OK') {

                    this.token = response.token
                    // TODO : On enregistre le token dans l'internal storage
                    await AsyncStorage.setItem("token", this.token)

                    resolve()

                }
                else {
                    reject()
                    
                }

                console.log('=====  FIN MsprAPI.initToken  =====')
                return

            })
        })

    }

    public getAPromotion(code: string): Promise<Promotion> {

        return new Promise<Promotion>((resolve, reject) => {
            
            console.log('===== DEBUT MsprAPI.getAPromotion =====')

            console.log(`REQ: http://mspr.webqbe.com/promotion?token=${this.token}&codePromo=${code}`)
            fetch(`http://mspr.webqbe.com/promotion?token=${this.token}&codePromo=${code}`)
            .then(async (res) => {
                    const response: any = await res.json()
                    console.log('RES:', response)
                    if (response.status == 'OK') {
                        resolve(response.response[0])
                    }
                    else {
                        reject()
                    }
                    console.log('=====  FIN MsprAPI.getAPromotion  =====')
                    return
            })

        })
    }

}

import { Promotion } from "../interfaces/promotion";
import AsyncStorage from '@react-native-async-storage/async-storage';

export class InternalStorage {

    constructor() {}


    // =============== CODE EXAMPLE ===============

    // const internalStorage: InternalStorage = new InternalStorage()

    // internalStorage.addPromotionToList(SomePromotion).catch((err) => {
    //     if (err !== 'CODEPROMO already exists') {
    //         throw err
    //     }
    // })

    // internalStorage.getListPromotions().then((res: Promotion[]) => {
    //     console.log('Return of getListPromotions :', res)
    // })

    // internalStorage.removePromotion(SomePromotion.codePromo)

    // ============================================


    getListPromotions(): Promise<Promotion[]> {
        
        return new Promise<Promotion[]>(async (resolve, reject) => {

            console.log('===== DEBUT InternalStorage.getListPromotions =====')

            const strListePromo = await AsyncStorage.getItem('listePromotion')

            if (strListePromo == null) {
                console.log('Aucune Promotions n\'ont été enregistrées pour le moment.');
                resolve([])
                return
            }

            const ListePromotions: Promotion[] = JSON.parse(strListePromo);

            console.log('Liste des Promotions récupérées : ', ListePromotions);

            resolve(ListePromotions)
            console.log('=====  FIN InternalStorage.getListPromotions  =====')
            return

        })

    }

    async addPromotionToList(promotion: Promotion) {

        console.log('===== DEBUT InternalStorage.addPromotionToList =====')

        let ListePromos: Promotion[] = await this.getListPromotions()

        for (let index = 0; index < ListePromos.length; index++) {
            if (ListePromos[index].codePromo = promotion.codePromo) {
                console.warn('Une promotion avec ce code est déjà enregistrée !')
                console.log('=====  FIN InternalStorage.addPromotionToList  =====')
                throw "CODEPROMO already exists"
            }
        }

        ListePromos.push(promotion)
        await AsyncStorage.setItem('listePromotion', JSON.stringify(ListePromos))
        console.log('Sauvegarde effectuée.')

        console.log('=====  FIN InternalStorage.addPromotionToList  =====')

    }

    async removePromotion(codePromo: string) {

        console.log('===== DEBUT InternalStorage.removePromotion =====')

        let ListePromos: Promotion[] = await this.getListPromotions()

        for (let index = 0; index < ListePromos.length; index++) {
            if (ListePromos[index].codePromo == codePromo) {
                const DeletedPromo: Promotion = ListePromos.splice(index, 1)[0]
                console.log('Promotion trouvée et supprimée de la liste.', DeletedPromo)
                break;
            }
        }

        await AsyncStorage.setItem('listePromotion', JSON.stringify(ListePromos))
        console.log('Sauvegarde effectuée.')

        console.log('=====  FIN InternalStorage.removePromotion  =====')

    }

}
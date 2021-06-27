/**
 * @jest-environment jsdom
 */

import { InternalStorage } from './InternalStorage';
import { Promotion } from '../interfaces/promotion'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { exp } from 'react-native-reanimated';

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

test("L'objet InternalStorage se crée sans problèmes.", async () => {

    await AsyncStorage.clear()

    const InternalStorageObj: InternalStorage = new InternalStorage()

    expect(InternalStorageObj).toBeDefined();
    expect(typeof InternalStorageObj).toBe('object');
    expect(typeof InternalStorageObj.addPromotionToList).toBe('function');
    expect(typeof InternalStorageObj.getListPromotions).toBe('function');
    expect(typeof InternalStorageObj.removePromotion).toBe('function');

});

test("La fonction addPromotionToList() de a classe InternalStorage est fonctionnelle.", async () => {

    await AsyncStorage.clear()

    const PromotionObj: Promotion = {
        codePromo: "UNICORN04",
        libelle: "C'est la fete des licornes !",
        sujet: "sur chaque article Licorne achetés.",
        description: "Quelle dinguerie cette promotion !",
        valeurPromo: 10,
        typePromo: 2,
        dateDebut: "2021-03-11 10:26:00.000",
        dateFin: "2021-05-01 10:26:00.000",
        imgPath: "https://placekitten.com/450/300"
    }

    const InternalStorageObj: InternalStorage = new InternalStorage()

    await InternalStorageObj.addPromotionToList(PromotionObj)

    const listePromotionStr: string| null = await AsyncStorage.getItem('listePromotion')

    expect(await AsyncStorage.getItem('listePromotion')).not.toBeUndefined
    expect(await AsyncStorage.getItem('listePromotion')).not.toBeNull

    if (listePromotionStr != null) {

        const listePromotion: Promotion[] = JSON.parse(listePromotionStr)

        expect(listePromotion[0].codePromo).toBe(PromotionObj.codePromo)
        expect(listePromotion[0].libelle).toBe(PromotionObj.libelle)
        expect(listePromotion[0].sujet).toBe(PromotionObj.sujet)
        expect(listePromotion[0].description).toBe(PromotionObj.description)
        expect(listePromotion[0].valeurPromo).toBe(PromotionObj.valeurPromo)
        expect(listePromotion[0].typePromo).toBe(PromotionObj.typePromo)
        expect(listePromotion[0].dateDebut).toBe(PromotionObj.dateDebut)
        expect(listePromotion[0].dateFin).toBe(PromotionObj.dateFin)
        expect(listePromotion[0].imgPath).toBe(PromotionObj.imgPath)

    }

    InternalStorageObj.addPromotionToList(PromotionObj)
    .then(() => {
        fail("Should have thrown 'CODEPROMO already exists'")
    })
    .catch((err) => {
        expect(err).toBe('CODEPROMO already exists')
    })
    
});

test("La fonction getListPromotions() de a classe InternalStorage est fonctionnelle.", async () => {

    await AsyncStorage.clear()

    const PromotionsListModel: Promotion[] = [{
        codePromo: "UNICORN04",
        libelle: "C'est la fete des licornes !",
        sujet: "sur chaque article Licorne achetés.",
        description: "Quelle dinguerie cette promotion !",
        valeurPromo: 10,
        typePromo: 2,
        dateDebut: "2021-03-11 10:26:00.000",
        dateFin: "2021-05-01 10:26:00.000",
        imgPath: "https://placekitten.com/450/300"
    },
    {
        codePromo: "UNICORN05",
        libelle: "C'est la fete des licornes ?",
        sujet: "sur chaque article Licorne achetés ?",
        description: "Quelle dinguerie cette promotion ?",
        valeurPromo: 10,
        typePromo: 2,
        dateDebut: "2021-03-11 10:26:00.000",
        dateFin: "2021-05-01 10:26:00.000",
        imgPath: "https://placekitten.com/300/450"
    }]

    const InternalStorageObj: InternalStorage = new InternalStorage()


    let PromotionsListRes: Promotion[] | null = await InternalStorageObj.getListPromotions()

    expect(PromotionsListRes).not.toBeUndefined
    expect(PromotionsListRes).not.toBeNull

    if (PromotionsListRes != null) {

        expect(PromotionsListRes).toEqual([])

    }

    await AsyncStorage.setItem('listePromotion', JSON.stringify(PromotionsListModel))

    PromotionsListRes = await InternalStorageObj.getListPromotions()

    expect(PromotionsListRes).not.toBeUndefined
    expect(PromotionsListRes).not.toBeNull

    if (PromotionsListRes != null) {

        expect(PromotionsListRes).toEqual(PromotionsListModel)

    }
    
});

test("La fonction removePromotion() de a classe InternalStorage est fonctionnelle.", async () => {

    await AsyncStorage.clear()

    const PromotionsListModelBefore: Promotion[] = [{
        codePromo: "UNICORN04-KEEP",
        libelle: "C'est la fete des licornes !",
        sujet: "sur chaque article Licorne achetés.",
        description: "Quelle dinguerie cette promotion !",
        valeurPromo: 10,
        typePromo: 2,
        dateDebut: "2021-03-11 10:26:00.000",
        dateFin: "2021-05-01 10:26:00.000",
        imgPath: "https://placekitten.com/450/300"
    },
    {
        codePromo: "UNICORN04-REMOVE",
        libelle: "C'est la fete des licornes ?",
        sujet: "sur chaque article Licorne achetés ?",
        description: "Quelle dinguerie cette promotion ?",
        valeurPromo: 10,
        typePromo: 2,
        dateDebut: "2021-03-11 10:26:00.000",
        dateFin: "2021-05-01 10:26:00.000",
        imgPath: "https://placekitten.com/300/450"
    }]

    const PromotionsListModelAfter: Promotion[] = [{
        codePromo: "UNICORN04-KEEP",
        libelle: "C'est la fete des licornes !",
        sujet: "sur chaque article Licorne achetés.",
        description: "Quelle dinguerie cette promotion !",
        valeurPromo: 10,
        typePromo: 2,
        dateDebut: "2021-03-11 10:26:00.000",
        dateFin: "2021-05-01 10:26:00.000",
        imgPath: "https://placekitten.com/450/300"
    }]

    await AsyncStorage.setItem('listePromotion', JSON.stringify(PromotionsListModelBefore))

    const InternalStorageObj: InternalStorage = new InternalStorage()

    await InternalStorageObj.removePromotion('UNICORN04-REMOVE')

    expect(await AsyncStorage.getItem('listePromotion')).not.toBeUndefined
    expect(await AsyncStorage.getItem('listePromotion')).not.toBeNull

    const listePromotionStr = await AsyncStorage.getItem('listePromotion')

    if (listePromotionStr != null) {

        const listePromotion: Promotion[] = JSON.parse(listePromotionStr)

        expect(listePromotion).toEqual(PromotionsListModelAfter)

    }
    
});
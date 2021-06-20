/**
 * @jest-environment jsdom
 */

import { MsprAPI } from './MsprAPI';
import { Promotion } from '../interfaces/promotion'

test("L'objet MsprAPI se crée sans problèmes.", () => {

    const MsprAPIObj: MsprAPI = new MsprAPI()

    expect(MsprAPIObj).toBeDefined();
    expect(typeof MsprAPIObj).toBe('object');
    expect(typeof MsprAPIObj.getToken()).toBe('string');
    expect(MsprAPIObj.getToken()).toBe('');
    expect(typeof MsprAPIObj.initToken).toBe('function');
    expect(typeof MsprAPIObj.getAPromotion).toBe('function');

});

test("L'objet MsprAPI peut récupérer un token valide.", async () => {

    const MsprAPIObj: MsprAPI = new MsprAPI()
    expect(MsprAPIObj.getToken()).toBe('');

    await MsprAPIObj.initToken()
    expect(MsprAPIObj.getToken() != '').toBe(true);
    expect((await (await fetch(`http://mspr.webqbe.com/getTokenValidity?token=${MsprAPIObj.getToken()}`)).json()).response[0].validity).toBe(true);

});

test("L'objet MsprAPI peut récupérer une promotion.", async () => {

    const MsprAPIObj: MsprAPI = new MsprAPI()
    await MsprAPIObj.initToken()
    const PromotionObj: Promotion = await MsprAPIObj.getAPromotion('UNICORN04')

    const PromotionObjExpected: Promotion = {
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

    expect(PromotionObj.codePromo).toBe(PromotionObjExpected.codePromo)
    expect(PromotionObj.libelle).toBe(PromotionObjExpected.libelle)
    expect(PromotionObj.sujet).toBe(PromotionObjExpected.sujet)
    expect(PromotionObj.description).toBe(PromotionObjExpected.description)
    expect(PromotionObj.valeurPromo).toBe(PromotionObjExpected.valeurPromo)
    expect(PromotionObj.typePromo).toBe(PromotionObjExpected.typePromo)
    expect(PromotionObj.dateDebut).toBe(PromotionObjExpected.dateDebut)
    expect(PromotionObj.dateFin).toBe(PromotionObjExpected.dateFin)
    expect(PromotionObj.imgPath).toBe(PromotionObjExpected.imgPath)

});


// const msprAPI: MsprAPI = new MsprAPI()
//         msprAPI.initToken().then(() => {
//             msprAPI.getAPromotion('UNICORN04').then((promotion: Promotion) => {
//                 this.promotion = promotion
//                 this.setState({
//                     loading: true
//                   });

//             })
//         })
import {Rule} from './base';
import * as cst from '../../../constants';
import {ScoreItemResult} from '../result';


export const RULE_ID = 'families';

const FAMILIES_LABEL = 'Biodiversité';
const FAMILIES_DESCRIPTION = 'Biodiversité : évalue les différentes espèces présentes sur le potager';
const FAMILIES_DETAIL = `
Il est important de conserver une certaine biodiversité au sein du potager...
`;
const FAMILIES_RECOMMENDATION = `
Ajoutez d'autres familles de plantes pour enrichir l'éco-système de votre potager.
`;


export class FamiliesRule extends Rule {
  evaluate(input) {
    let result = [];
    const plants = input.getPlantModels();
    const items = input.getItems();
    let families = [];
    for (const idPlant in plants) {
      const family = plants[idPlant].famille.getValue();
      if (families.indexOf(family) === -1) {
        families.push(family);
      }
    }

    families.map(family => {
      const familyItems = items.filter(item => plants[item.idPlant].famille.getValue() === family).map(item => ({
        idImage: item.idImage,
        family: family
      }));
      result.push(new ScoreItemResult(RULE_ID, 10, familyItems));
    });

    return result;
  }

  getLabel(resultItem) {
    return `Biodiversité : famille ${resultItem.getPlants()[0].family}`;
  }

  getDescription() {
    return FAMILIES_DESCRIPTION;
  }

  getDetail(resultItem) {
    return FAMILIES_DETAIL;
  }

  getRecommendation(resultItem) {
    return FAMILIES_RECOMMENDATION;
  }
}

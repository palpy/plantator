import {Rule} from './base';
import * as cst from '../../../constants';
import {ScoreItemResult} from '../result';


export const RULE_ID = 'height';

const HEIGHT_LABEL = 'Hauteur';
const HEIGHT_DESCRIPTION = 'Hauteur : évalue la diversité de plantes ayant des tailles différentes';
const HEIGHT_DETAIL = `
Il est important d'avoir des plantes de hauteurs différentes dans son potager...
`;
const HEIGHT_RECOMMENDATION = `
Ajoutez des plantes de hauteur différente...
`;


export class HeightRule extends Rule {
  evaluate(input) {
    let result = [];
    let itemsByHeight = {};
    const plants = input.getPlantModels();
    const items = input.getItems();
    for (const heightKey in cst.HEIGHTS) {
      const [min, max] = heightKey.split('_');
      let heightItems = [];
      for (const idPlant in plants) {
        const height = plants[idPlant].hauteur.getValue();
        if (min <= height && height <= max) {
          const plantItems = items.filter(item => item.idPlant === parseInt(idPlant));
          plantItems.map(item => heightItems.push(item));
        }
      }
      itemsByHeight[cst.HEIGHTS[heightKey]] = heightItems;
    }
    // TODO : pas super propre...
    delete itemsByHeight[''];
    
    for (const category in itemsByHeight) {
      // For each category, if no items, score is negative
      const items = itemsByHeight[category].map(item => ({
        idImage: item.idImage
      }));
      const customData = {
        category: category
      };
      const score = (items.length > 0) ? 50 : -50;
      result.push(new ScoreItemResult(RULE_ID, score, items, customData));
    }
    return result;
  }

  getLabel(resultItem) {
    const category = resultItem.getCustomData().category;
    if (resultItem.getScore() < 0) {
      return `Hauteur : aucune plante de catégorie ${category}`;
    }
    return `Hauteur : catégorie ${category}`;
  }

  getDescription() {
    return HEIGHT_DESCRIPTION;
  }

  getDetail(resultItem) {
    return HEIGHT_DETAIL;
  }

  getRecommendation(resultItem) {
    return HEIGHT_RECOMMENDATION;
  }
}

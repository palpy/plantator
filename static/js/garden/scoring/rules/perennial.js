import {Rule} from './base';
import * as cst from '../../../constants';
import {ScoreItemResult} from '../result';


export const RULE_ID = 'perennial';

const PERENNIAL_DESCRIPTION = 'Plantes vivaces : évalue les plantes annuelles et vivaces présentes';
const PERENNIAL_DETAIL = `
Contrairement aux plantes annuelles, les plantes vivaces durent sur plusieurs années.
Il est conseillé d'en avoir au moins quelques-unes pour laisser de la vie suivre son cours dans votre jardin en période plus creuse, comme en hiver.
`;
const PERENNIAL_RECOMMENDATION = `
Vous pourriez rajouter des plantes vivaces dans votre potager.
`;


export class PerennialRule extends Rule {
  evaluate(input) {
    let result = [];
    const indexPerennial = cst.VIVACE_TYPES.indexOf('vivace');
    const models = input.getPlantModels();
    for (const id in models) {
      const plantModel = models[id];
      if (plantModel.vivace.getValue() === indexPerennial) {
        // For each different perennial plant, we add score and bind the ones put on garden
        const plantsFiltered = input.getItems(id).map(plant => {
          return {
            idPlant: plant.idPlant,
            namePlant: plantModel.nom.getValue(),
            idImage: plant.idImage,
          };
        });
        result.push(new ScoreItemResult(RULE_ID, 10, plantsFiltered));
      }
    }
    if (result.length === 0) {
      result.push(new ScoreItemResult(RULE_ID, -20));
    }
    return result;
  }

  getLabel(resultItem) {
    if (resultItem.getScore() < 0) {
      return `Aucune plante vivace`;
    }
    return `Plante vivace ${resultItem.getPlants()[0].namePlant}`;
  }

  getDescription() {
    return PERENNIAL_DESCRIPTION;
  }

  getDetail(resultItem) {
    return PERENNIAL_DETAIL;
  }

  getRecommendation(resultItem) {
    return PERENNIAL_RECOMMENDATION;
  }
}

import {Rule} from './base';
import * as cst from '../../../constants';
import {ScoreItemResult} from '../result';


export const RULE_ID = 'harvest';

const HARVEST_DESCRIPTION = 'Récolte : évalue les différents mois sur lesquels il y a des récoltes';
const HARVEST_DETAIL = `
C'est cool d'avoir un mois de récolte... (à écrire)
`;
const HARVEST_RECOMMENDATION = `
Augmentez vos périodes de récolte pour avoir de la nourriture de votre potager plus souvent.
`;


export class HarvestRule extends Rule {
  evaluate(input) {
    let result = [];
    const plants = input.getPlantModels();
    for (let month = 1 ; month < cst.MONTHS.length ; month++) {
      let monthPlants = [];
      let plantsValues = [];
      for (const id in plants) {
        plantsValues.push(plants[id]);
      }
      plantsValues.filter(plant => plant.estMoisDeRecolte(month)).map(plant => {
        const items = input.getItems(plant.id).map(item => {
          return {
            idImage: item.idImage
          };
        });
        monthPlants = [...monthPlants, ...items];
      });
      if (monthPlants.length > 0) {
        result.push(new ScoreItemResult(RULE_ID, 10, monthPlants, {
          month: cst.MONTHS[month],
        }));
      }
    }

    if (result.length === 0) {
      result.push(new ScoreItemResult(RULE_ID, -20));
    }
    return result;
  }

  getLabel(resultItem) {
    if (resultItem.getScore() < 0) {
        return 'Aucun mois de récolte';
    }
    return `Mois de récolte : ${resultItem.getCustomData().month}`;
  }

  getDescription() {
    return HARVEST_DESCRIPTION;
  }

  getDetail(resultItem) {
    return HARVEST_DETAIL;
  }

  getRecommendation(resultItem) {
    return HARVEST_RECOMMENDATION;
  }
}

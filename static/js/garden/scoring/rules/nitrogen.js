import {Rule} from './base';
import * as cst from '../../../constants';
import {ScoreItemResult} from '../result';


export const RULE_ID = 'nitrogen';

const NITROGEN_LABEL = 'Fixateur azote';
const NITROGEN_DESCRIPTION = 'Fixateur d\'azote : évalue les plantes fixatrices d\'azote';
const NITROGEN_DETAIL = `
Certaines plantes parviennent à capter l'azote contenu dans l'atmosphère, par le biais de symbioses avec des bactéries.
Ainsi elles rendent disponibles cet azote pour leurs plantes avoisinantes, et qui est important pour la croissance des plantes.
C'est pourquoi il est conseillé d'avoir un ou plusieurs fixateurs d'azote dans son potager.
`;
const NITROGEN_RECOMMENDATION = `
Vous pourriez rajouter des fixateurs d'azote dans votre potager. Allez voir par exemple du côté des légumineuses.
`;


export class NitrogenRule extends Rule {
  evaluate(input) {
    let result = [];
    const indexNitrogen = cst.USAGE_TYPES.indexOf('fixateur d\'azote');
    let filteredPlants = input.getItems().filter(plant =>
      input.getPlantModel(plant.idPlant).utilisation.getValue().indexOf(indexNitrogen) > -1
    );
    filteredPlants.map(plant => {
      const model = input.getPlantModel(plant.idPlant);
      result.push(new ScoreItemResult(RULE_ID, 10, [{
        idImage: plant.idImage,
        namePlant: model.nom.getValue()
      }]));
    });
    if (filteredPlants.length === 0) {
      result.push(new ScoreItemResult(RULE_ID, -20));
    }
    return result;
  }

  getLabel(resultItem) {
    if (resultItem.getScore() < 0) {
      return `Aucune plante fixatrice d'azote`;
    }
    return `Fixateur d'azote ${resultItem.getPlants()[0].namePlant}`;
  }

  getDescription() {
    return NITROGEN_DESCRIPTION;
  }

  getDetail(resultItem) {
    return NITROGEN_DETAIL;
  }

  getRecommendation(resultItem) {
    return NITROGEN_RECOMMENDATION;
  }
}

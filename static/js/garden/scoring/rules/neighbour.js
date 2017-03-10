import {Rule} from './base';
import * as cst from '../../../constants';
import {ScoreItemResult} from '../result';

export const RULE_ID = 'neighbour';

const NEIGHBOUR_DESCRIPTION = 'Compagnonnage : évalue les associations de plantes qui sont voisines sur le potager';
const NEIGHBOUR_DETAIL = `
Les plantes ont plus ou moins d'affinités avec les autres plantes, dépendant de nombreux critères.
`;
const NEIGHBOUR_RECOMMENDATION = `
...
`;


export class NeighbourRule extends Rule {
  evaluate(input) {
    console.log(input);
    const sizeMeter = input.getParameter('sizeMeter');
    let associations = [],
        result = [];
    const idModels = Object.keys(input.plantModels);
    // Create list of associations to evaluate
    for (let i = 0; i < idModels.length ; i++) {
      for (let j = i+1; j < idModels.length ; j++) {
        associations.push(`${idModels[i]}-${idModels[j]}`);
      }
    }

    for (const association of associations) {
      const [idPlant1, idPlant2] = association.split('-').map(id => parseInt(id));
      const plant1 = input.plantModels[idPlant2];
      const plant2 = input.plantModels[idPlant1];
      const goodNeighbours1 = plant1.associe.getValue();
      const badNeighbours1 = plant1.antiassocie.getValue();
      const goodNeighbours2 = plant2.associe.getValue();
      const badNeighbours2 = plant2.antiassocie.getValue();
      const isGood = goodNeighbours1.indexOf(idPlant2) > -1 || goodNeighbours2.indexOf(idPlant1) > -1 ;
      const isBad = badNeighbours1.indexOf(idPlant2) > -1 || badNeighbours2.indexOf(idPlant1) > -1 ;
      const sizePlant1 = plant1.largeur.getValue() * 0.01;
      const sizePlant2 = plant2.largeur.getValue() * 0.01;
      // If these are good or bad neighbours, and one of both has its size known
      if ((isGood || isBad) && (sizePlant1 > 0 || sizePlant2 > 0)) {
        const itemsPlant1 = input.items.filter(item => item.idPlant === idPlant1);
        const itemsPlant2 = input.items.filter(item => item.idPlant === idPlant2);
        for (let item1 of itemsPlant1) {
          for (let item2 of itemsPlant2) {
            const position1 = item1.position;
            const position2 = item2.position;
            // Calculate distance in pixels
            let distance = Math.sqrt(
              Math.pow(Math.abs(position2.x - position1.x), 2) + Math.pow(Math.abs(position2.y - position1.y), 2)
            );
            // Convert distance in meters
            distance = distance / sizeMeter;
            // If distance less than radius of one of both plants, there is association
            if ((sizePlant1 / 2 > distance) || (sizePlant2 / 2 > distance)) {
              const score = (isGood) ? 20 : -20;
              result.push(new ScoreItemResult(RULE_ID, score, [
                {
                  idImage: item1.idImage,
                  name: plant1.nom.getValue()
                },
                {
                  idImage: item2.idImage,
                  name: plant2.nom.getValue()
                }
              ]));
            }
          }
        }
      }
    }

    return result;
  }

  getLabel(resultItem) {
    const plants = resultItem.getPlants();
    return `Compagnonnage : ${plants[0].name}  et ${plants[1].name}`;
  }

  getDescription() {
    return NEIGHBOUR_DESCRIPTION;
  }

  getDetail(resultItem) {
    return NEIGHBOUR_DETAIL;
  }

  getRecommendation(resultItem) {
    return NEIGHBOUR_RECOMMENDATION;
  }
}

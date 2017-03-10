

/*
 * Encapsulates input to be scored in Plantator score engine
 * 'items' is a list containing plant items put on garden and to be evaluated
 * 'plantModels' is an object binding ids of plant put on garden to each data plant object
 * 'parameters' is an object of parameters containing some garden data needed for evaluation of some rules
 */
export class ScoreInput {
  constructor(items, plantModels, parameters) {
    this.items = items;
    this.plantModels = plantModels;
    this.parameters = parameters;
  }

  getPlantModel(plantId) {
    return this.plantModels[plantId];
  }

  getPlantModels(plantIds=null) {
    if (plantIds === null) {
      return this.plantModels;
    }
    let result = [];
    plantIds.map(id => {
      result.push(this.plantModels[id]);
    });
    return result;
  }

  getItems(plantId=null) {
    if (plantId === null) {
      return this.items;
    }
    return this.items.filter(item => item.idPlant == plantId);
  }

  getParameter(key) {
    const parameterKeys = Object.keys(this.parameters);
    if (parameterKeys.indexOf(key) === -1) {
      throw 'Parametre de jardin non défini';
    }
    return this.parameters[key];
  }

}

import {createAttribute} from './attributes';
import * as cst from '../constants';


// Return config of all attributes of plant
const createAttributeConfig = (plantsChoice) => {
  return {
    'nom': {type: 'text', label: 'Nom usuel', description: 'Nom de la plante'},
    'genre': {type: 'text', label: 'Genre', description: 'Genre de la plante'},
    'espece': {type: 'text', label: 'Espèce', description: 'Espèce de la plante'},
    'famille': {type: 'text', label: 'Famille', description: 'Famille de la plante'},
    'commentaire': {type: 'text', label: 'Commentaire', description: ''},

    'largeur': {type: 'int', label: 'Largeur', description: '', unit: 'cm'},
    'hauteur': {type: 'int', label: 'Hauteur', description: '', unit: 'cm'},
    'prof': {type: 'int', label: 'Profondeur', description: '', unit: 'cm'},
    'vie': {type: 'int', label: 'Espérance de vie', description: '', unit: 'an(s)'},
    'drang': {type: 'int', label: 'Espacement dans le rang', description: '', unit: 'cm'},
    'dligne': {type: 'int', label: 'Espacement dans la ligne', description: '', unit: 'cm'},
    'tpsconserv': {type: 'int', label: 'Durée de conservation des semences', description: '', unit: 'an(s)'},
    'tpslevee': {type: 'int', label: 'Nombre de jours de la graine à la plantule', description: '', unit: 'jour(s)'},
    'conservalimt': {type: 'int', label: 'Conservation de l\'aliment', description: '', unit: 'jour(s)'},
    'rendement': {type: 'int', label: 'Nombre de kg/m² lors de la récolte', description: '', unit: 'kg/m2'},
    'Tlevee': {type: 'int', label: 'Température de levée des graines', description: '', unit: '°C'},
    'Tmin': {type: 'int', label: 'Température mini', description: '', unit: '°C'},

    'moisflo': {type: 'choice', label: 'Floraison', description: '', choices: cst.MONTHS},
    'moistaille': {type: 'choice', label: 'Taille', description: '', choices: cst.MONTHS},
    'moisbourgeonfeuille': {type: 'choice', label: 'Bourgeonnement des feuilles', description: '', choices: cst.MONTHS},
    'moispertefeuille': {type: 'choice', label: 'Perte des feuilles', description: '', choices: cst.MONTHS},
    'recolteDeb': {type: 'choice', label: 'Début de la récolte', description: '', choices: cst.MONTHS},
    'recolteFin': {type: 'choice', label: 'Fin de la récolte', description: '', choices: cst.MONTHS},
    'repiq': {type: 'choice', label: 'Repiquage', description: '', choices: cst.MONTHS},
    'semisabri': {type: 'choice', label: 'Semis sous abri', description: '', choices: cst.MONTHS},
    'semisint': {type: 'choice', label: 'Semis intérieur', description: '', choices: cst.MONTHS},
    'semisext': {type: 'choice', label: 'Semis extérieur', description: '', choices: cst.MONTHS},

    'racine': {type: 'choice', label: 'Racine', description: '', choices: cst.RACINE_TYPES},
    'vivace': {type: 'choice', label: 'Caractère vivace', description: '', choices: cst.VIVACE_TYPES},
    'eau': {type: 'choice', label: 'Sol', description: '', choices: cst.EAU_TYPES},
    'pH': {type: 'choice', label: 'pH', description: '', choices: cst.PH_TYPES},
    'soleil': {type: 'choice', label: 'Ensoleillement', description: '', choices: cst.SOLEIL_TYPES, imgChoices: cst.SOLEIL_IMAGES},
    'solriche': {type: 'choice', label: 'Besoins en nutriments', description: '', choices: cst.SOL_TYPES, imgChoices: cst.SOL_IMAGES},

    'type': {type: 'list', label: 'Partie comestible', description: '', choices: cst.COMESTIBLE_TYPES, imgChoices: cst.COMESTIBLE_IMAGES},
    'multi': {type: 'list', label: 'Multiplication par', description: '', choices: cst.MULTI_TYPES},
    'usagemedic': {type: 'list', label: 'Usage médical', description: '', choices: cst.MEDICAL_TYPES},
    'utilisation': {type: 'list', label: 'Utilisations de la plante', description: '', choices: cst.USAGE_TYPES},
    'associe': {type: 'list', label: 'Bons compagnons', description: '', choices: plantsChoice},
    'antiassocie': {type: 'list', label: 'Compagnons néfastes', description: '', choices: plantsChoice}
  };

}


/*
 * Encapsulates a plant ant all informations concerning it
 */
class Plant {
  constructor(attributesConfig, data={}) {
    this.id = (typeof(data.ID) !== 'undefined' && data.ID !== 'NULL') ? data.ID : null;
    for (let property in attributesConfig) {
      let config = attributesConfig[property];
      config.id = property;
      config.data = (typeof(data[property]) !== 'undefined') ? data[property] : '';
      this[property] = createAttribute(config);
    }
  }

  estMoisDeRecolte(mois) {
    if (mois === 0) {
      return false;
    }
  	return (this.recolteDeb.getValue() <= mois) && (mois <= this.recolteFin.getValue());
  }

  getDifferences(otherPlant) {
    const attributes = createAttributeConfig();
    let differences = [];
    for (let name in attributes) {
      const plantAttribute = this[name];
      const otherAttribute = otherPlant[name];
      if (!plantAttribute.equals(otherAttribute)) {
        // If difference, we store it as an array of two strings [attribute, valueBefore, valueAfter]
        let before = '', after = '';
        if (attributes[name].type === 'list') {
          before = otherAttribute.findMissingItems(plantAttribute).join(',');
          after = otherAttribute.findAddedItems(plantAttribute).join(',');
        } else {
          before = plantAttribute.getTextValue();
          after = otherAttribute.getTextValue();
        }
        differences.push([name, before, after]);
      }
    }
    return differences;
  }
}


/* Factory for plants */
export class PlantFactory {
  constructor(rawPlantsData) {
    this.rawData = rawPlantsData;
    let plantsByName = {};
    for (let id in this.rawData) {
      plantsByName[id] = this.rawData[id].nom;
    }
    this.attributes = createAttributeConfig(plantsByName);
    this.plants = {};
  }

  // Build the plant with id, if not already built, and return a copy
  buildPlant(idPlant) {
    if (idPlant === null) {
      return new Plant(this.attributes, {});
    }
    if (!(idPlant in this.plants)) {
      this.plants[idPlant] = new Plant(this.attributes, this.rawData[idPlant]);
    }
    return this.plants[idPlant];
  }

  // Build an object containing all plants known and built
  buildAllPlants() {
    for (let id in this.rawData) {
      if (!(id in this.plants)) {
        this.plants[id] = new Plant(this.attributes, this.rawData[id]);
      }
    }
    return Object.assign({}, this.plants);
  }

  // Build and return a plant object, with input data in parameter
  buildModifiedPlant(plantData) {
    return new Plant(this.attributes, plantData);
  }

}

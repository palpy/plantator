import $ from 'jquery';
import * as actions from './actions';
import * as cst from '../constants';


const getAttributeLine = (attribute) => {
  let value = attribute.getTextValue();
  // if value is null or an empty list
  if (value === null || value.length === 0) {
    value = 'Non renseigné(e)';
  }
  return `<div>
            <span style="text-decoration:underline">${attribute.getLabel()}</span>
            :
            <span class="${attribute.getId()}">${value}</span></div>`;
};

/*
 * Display a set of informations about a specific plant
 */
export class PlantCard {
  constructor(rootSelector, actionDispatcher) {
    this.rootSelector = rootSelector;
    this.actionDispatcher = actionDispatcher;
    this.actionDispatcher.register('activateCard', actions.ACTIVATE_CARD, () => this.activate());
    this.actionDispatcher.register('buildFeatureCard', actions.BUILD_FEATURES, () => this.build());
  }

  activate() {
    this.actionDispatcher.unregister('activateCard');
    this.build();
  }

  build() {
    this.actionDispatcher.unregister('activateCard');
    this.actionDispatcher.unregister('buildFeatureCard');
    $(`#${this.rootSelector}`).append(`
      <div class="panel panel-default">
        <div class="panel-title">
          <span>Plante sélectionnée</span>
        </div>
        <div class="panel-body">
          Aucune
        </div>
      </div>
    `);
    this.actionDispatcher.register('showCard', actions.SHOW_CARD, (plant) => this.showPlantCard(plant));
    this.actionDispatcher.register('hideCard', actions.HIDE_CARD, () => this.hidePlantCard());
  }

  /* Show informations for plant in parameter */
  showPlantCard(plant) {
    $(`#${this.rootSelector}`).find('.panel-title').empty().append(`
      <span>Plante sélectionnée</span>
      <div class="pull-right">
        <a href="${cst.URL_PLANTATOR_EDIT}?id=${plant.id}" target="_blank" class="btn btn-default btn-xs"
           title="Editer informations de la plante">
          Editer
        </a>
      </div>
    `);

    $(`#${this.rootSelector}`).find('.panel-body').empty().append(`
      ${getAttributeLine(plant.nom)}
      ${getAttributeLine(plant.famille)}
      <br/>
      ${getAttributeLine(plant.vivace)}
      ${getAttributeLine(plant.vie)}
      ${getAttributeLine(plant.soleil)}
      ${getAttributeLine(plant.solriche)}
      ${getAttributeLine(plant.eau)}
      ${getAttributeLine(plant.pH)}
      ${getAttributeLine(plant.multi)}
      ${getAttributeLine(plant.tpslevee)}
      <br/>
      ${getAttributeLine(plant.associe)}
      ${getAttributeLine(plant.antiassocie)}
    `);
  }

  /* Hide informations for plant in parameter */
  hidePlantCard() {
    $(`#${this.rootSelector}`).find('.panel-title').empty().append(`
      <span>Plante sélectionnée</span>
    `);
    $(`#${this.rootSelector}`).find('.panel-body').empty().text(`Aucune`);
  }

}

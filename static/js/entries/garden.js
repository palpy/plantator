/*import $ from 'jquery';
import jQueryUI from 'jquery-ui';*/
import {fabric} from 'fabric';

import * as cst from '../constants';
import * as utils from '../utils';
import * as actions from '../garden/actions';
import {PlantFactory} from '../plant/plant';
import {ActionDispatcher} from '../garden/actionDispatcher';
import {PlantSelectorView} from '../garden/plantSelector';
import {PlantCard} from '../garden/plantCard';
import {Toolbar} from '../garden/toolbar';
import {GardenView} from '../garden/gardenView';
import {GardenSerializer} from '../garden/serializer';
import {GardenStateView} from '../garden/stateView';

import {ScoreView} from '../garden/scoreView';
import {ScoreEngine} from '../garden/scoring/engine';

import {GardenModal} from '../garden/modal';


// on document ready
$(() => {

  if (!(Modernizr.draganddrop)) {
    alert(`Ce navigateur ne supporte pas certaines fonctionnalités nécessaires pour le potager virtuel.
           Veuillez essayer avec un autre navigateur`);
    return;
  }

  // Loading plants before any process
  utils.getPlantsFromDb((response) => {
    const factory = new PlantFactory(response);
    const allPlants = factory.buildAllPlants();
    const options = Object.keys(allPlants).map(key => allPlants[key]).sort((a,b) => {
      const nameA = a.nom.getValue();
      const nameB = b.nom.getValue();
      return nameA.localeCompare(nameB);
    });

    const actionDispatcher = new ActionDispatcher();

    let gardenSerializer = new GardenSerializer(actionDispatcher);
    let stateView = new GardenStateView('garden-state', actionDispatcher);
    let plantSelectorView = new PlantSelectorView('plant-selector', options, factory, actionDispatcher);
    let plantCard = new PlantCard('plant-card', actionDispatcher);
    let toolbar = new Toolbar('garden-toolbar', actionDispatcher);
    let gardenView = new GardenView('canvas-container', factory, actionDispatcher);
    let scoreView = new ScoreView('score-panel', actionDispatcher);

    let modal = new GardenModal(`modal-garden`, actionDispatcher);

    let scoreEngine = new ScoreEngine(actionDispatcher);

    // Load garden with id in url arguments if any
    const idArgs = window.location.search.substr(1)
      .split('&')
      .map(arg => arg.split('='))
      .filter(arg => arg[0] == 'id');
    if (idArgs.length > 0 && idArgs[0][1] !== '') {
      gardenSerializer.load(idArgs[0][1]);
    }

  });
});

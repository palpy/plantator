import $ from 'jquery';

import {PlantFactory} from '../plant/plant';
import {renderForm, FIELD_SETS} from '../edit/commonEdit';
import * as cst from '../constants';
import * as utils from '../utils';


// Render action buttons
const renderActions = ($form, plant) => {
  $form.append($(`<div class="col-md-12"><div class="text-center buttons-bar"></div></div>`));
  let $buttonsBar = $form.find('.buttons-bar');
  $(`<button class="btn btn-default" type="submit">Valider</button>`).appendTo($buttonsBar).on('click', (event) => {
    event.preventDefault();
    if (window.confirm('Confirmez-vous votre saisie ?')) {
      sendData(plant);
    }
  });
};


// Send posted data about edited plant
const sendData = (plant) => {
  let data = {};
  // For each category, we enhance data object with specific data from category
  FIELD_SETS.map(fieldSet => {
    data = Object.assign(data, fieldSet.getValues(plant));
  });
  data.ID = (plant.id !== null) ? plant.id : 'NULL';

  $.ajax({
    url: cst.URL_PLANT_INSERT_TEMP,
    data: {
      'data' : JSON.stringify(data)
    },
    type : 'POST',
    error: function(jqHxr, statut, error){
      console.log('Erreur: ' + error);
      window.alert('Une erreur est survenue, la modification n\'a pas été enregistrée. Si le problème persiste, veuillez contacter l\'administrateur du site.');
    },
    success: function(data) {
      window.alert('Modification prise en compte. Une fois validée par un modérateur, elle sera visible dans le tableau.');
      window.location = cst.URL_PLANTATOR;
    }
  });
};


// Scroll down to anchor category
const goToAnchor = () => {
  const anchor = window.location.hash.substr(1);
  if (anchor !== 'undefined' && anchor !== '') {
    self.location.href = window.location.hash;
    $(`#${anchor}`).find('.panel-title').trigger('click');
  }
};

// on document ready
$(() => {

  const idPlant = utils.detectIdPlant();

  // Loading plants data before any process
  utils.getPlantsFromDb((allPlants) => {
    if (idPlant !== null && (!(idPlant in allPlants))) {
      window.alert('Id incorrect en paramètre ! Edition des données impossible');
      return;
    }
    const factory = new PlantFactory(allPlants);
    const editedPlant = factory.buildPlant(idPlant);

    // render form
    const fillForm = (editedPlant.id !== null);
    renderForm($('#form-root'), editedPlant, fillForm);
    renderActions($('#form-root'), editedPlant);

    goToAnchor();

  });

});

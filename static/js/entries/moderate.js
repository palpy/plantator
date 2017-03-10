import $ from 'jquery';

import {PlantFactory} from '../plant/plant';
import {renderForm, FIELD_SETS} from '../edit/commonEdit';
import * as cst from '../constants';
import * as utils from '../utils';


// Render differences between initial plant datas and the ones modified by user
const renderDifferences = (plantInitial, plantModified) => {
  let $diffRoot = $('#diff-root');
  $diffRoot.append(`<h3>Différences : </h3>`);
  const differences = plantInitial.getDifferences(plantModified);
  differences.map(diff => {
    const [name, before, after] = diff;
    $diffRoot.append(`<div><span>${name}</span> : <span>${before} (-)</span> --> <span>${after} (+)</span></div>`);
  });
}


// Render action bar (delete and validate buttons)
const renderActions = ($form, plant) => {
  $form.append($(`<div class="col-md-12"><div class="text-center buttons-bar"></div></div>`));
  let $buttonsBar = $form.find('.buttons-bar');
  $(`<button class="btn btn-default">Effacer</button>`).appendTo($buttonsBar).on('click', (event) => {
    event.preventDefault();
    removeEntry();
  });
  $(`<button class="btn btn-default">Valider</button>`).appendTo($buttonsBar).on('click', (event) => {
    event.preventDefault();
    sendData(plant);
    removeEntry();
  });
};


// Remove first entry of the temporay plants table
const removeEntry = () => {
  $.ajax({
    url: cst.URL_PLANTS_CANCEL,
    type : 'POST',
    error: function(jqHxr, statut, error){
      console.log('Erreur: ' + error);
    },
    success: function(data) {
      // Empty different parts of moderation and load next moderaton to do if existing
      $('#diff-root').empty();
      $('#form-root').empty();
      doNextModeration();
    }
  });
};


// Send posted data about edited plant
const sendData = (plant) => {
  let data = {};
  FIELD_SETS.map(fieldSet => {
    data = Object.assign(data, fieldSet.getValues(plant));
  });
  data.ID = (plant.id !== null) ? plant.id : 'NULL';
  let url = (plant.id !== null) ? cst.URL_PLANT_EDIT : cst.URL_PLANT_INSERT;
  $.ajax({
    url: url,
    data: {
      'data' : JSON.stringify(data)
    },
    type : 'POST',
    error: function(jqHxr, statut, error){
      console.log('Erreur: ' + error);
      window.alert('Une erreur est survenue, la modification n\'a pas été enregistrée. Si le problème persiste, veuillez contacter l\'administrateur du site.');
    },
    success: function(data) {
      console.log(data);
    }
  });
};


// Get next modification to moderate and render it
const doNextModeration = () => {
  utils.getNextModeration(plantModifiedData => {
    if (plantModifiedData === null) {
      $('#diff-root').append($(`<h3>Il n'y a aucune modification à valider</h3>`));
      return;
    }

    // For each moderation, we load back all plants data
    utils.getPlantsFromDb(allPlants => {
      const factory = new PlantFactory(allPlants);
      const plantModified = factory.buildModifiedPlant(plantModifiedData);

      if (plantModified.id !== null) {
        const plantInitial = factory.buildPlant(plantModified.id);
        renderDifferences(plantInitial, plantModified);
      }

      // render form
      renderForm($('#form-root'), plantModified, true);
      renderActions($('#form-root'), plantModified);
    });
  });
};


// on document ready
$(() => {

  doNextModeration();

});

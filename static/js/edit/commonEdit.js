import $ from 'jquery';

import * as cst from '../constants';
import * as fieldSet from './fieldSet';


export const FIELD_SETS = [
  new fieldSet.IdentityFieldSet(),
  new fieldSet.FeaturesFieldSet(),
  new fieldSet.CalendarFieldSet(),
  new fieldSet.SoilOccupationFieldSet(),
  new fieldSet.AreaFieldSet(),
  new fieldSet.SunFieldSet(),
  new fieldSet.NeighbourFieldSet(),
  new fieldSet.SoilFieldSet(),
  new fieldSet.UsageFieldSet(),
  new fieldSet.SeedingFieldSet(),
  new fieldSet.OtherFieldSet()
] ;


// Render plant form on edit page
export const renderForm = ($root, plant, fillForm=false) => {
  let $form = $(`<form></form>`).appendTo($root);
  let $group = $(`<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">`).appendTo($form);
  FIELD_SETS.map(fieldSet => fieldSet.render($group, plant));

  const title = (plant.id === null)
    ? `<span>Saisie d'une nouvelle plante</span>`
    : `<span>Plante éditée</span> : <span> ${plant.nom.getTextValue()}</span>`;
  $form.prepend(`<h3>${title}</h3>`);
  if (fillForm) {
    FIELD_SETS.map(fieldSet => fieldSet.populate(plant));
  }
  return $form;
};

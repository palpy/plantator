import $ from 'jquery';

import * as cst from './constants';


// Detect id of plant in url if present
export const detectIdPlant = () => {
  const queryArgs = window.location.search.substr(1).split('&');
  const idArg = queryArgs.filter(arg => arg.indexOf('id') > -1);
  const idPlant = (idArg.length > 0) ? idArg[0].split('=')[1] : null;
  return idPlant;
};


// Get plants informations from base, and do callback with plants data
export const getPlantsFromDb = (callback) => {
  $.ajax({
    url: cst.URL_PLANTS,
    type : 'GET',
    error: function(jqHxr, statut, error){
      console.log('erreur:'+error);
    },
    success: function(data) {
      let response = JSON.parse(data);
      callback(response);
    }
  });
};


// Get next modification to moderate, and do callback with data about moderation
export const getNextModeration = (callback) => {
  $.ajax({
    url: cst.URL_PLANTS_MODERATE,
    type : 'GET',
    error: function(jqHxr, statut, error){
      console.log('erreur:'+error);
    },
    success: function(data) {
      let response = JSON.parse(data);
      callback(response);
    }
  });
};

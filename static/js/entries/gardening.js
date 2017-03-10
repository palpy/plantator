import * as cst from '../constants';


const fillErrorMessage = (message) => {
  $('.error-message').remove();
  $('#idGarden').after($(`<span class="error-message">${message}</span>`));
};

// on document ready
$(() => {

  $(`#loadGarden`).on('click', (event) => {
    const idTyped = $('#idGarden').val();
    // First check that id is not empty and contains less than 50 characters
    if (idTyped.length === 0) {
      fillErrorMessage('Champ vide');
      return;
    }
    if (idTyped.length > 50) {
      fillErrorMessage('Le champ doit contenir moins de 50 caractères');
      return;
    }

    $.ajax({
      url: `${cst.URL_GARDEN}?action=checkExisting&id=${idTyped}`,
      type : 'GET',
      error: function(jqHxr, statut, error){
        console.log('erreur:'+error);
      },
      success: function(result) {
        result = JSON.parse(result);
        if (result.status === false) {
          fillErrorMessage(result.error);
          return;
        }
        if (result.status === true && result.isExisting === false) {
          fillErrorMessage('Ce nom ne correspond à aucun potager sauvegardé');
          return;
        }

        // If ok, we load garden with typed id
        $('.error-message').empty();
        window.location = `./garden.html?id=${idTyped}`;
        return;
      }
    });
  });

});

import * as cst from '../constants';
import * as actions from './actions';


/*
 * Serializer for garden
 */
export class GardenSerializer {
  constructor(actionDispatcher) {
    this.actionDispatcher = actionDispatcher;
    this.idGarden = null;
    this.actionDispatcher.register('gardenSave', actions.SAVE, (data) => {
      (this.idGarden === null) ? this.checkBeforeSaving(data) : this.save(data);
    });
  }

  /* Load from server garden with id in parameter */
  load(idGarden) {
    let that = this;
    $.ajax({
      url: `${cst.URL_GARDEN}?action=load&id=${idGarden}`,
      type : 'GET',
      success: (response) => {
        response = JSON.parse(response);
        if (response.status === true) {
          that.idGarden = idGarden;
          that.actionDispatcher.dispatch({type: actions.BUILD_FEATURES});
          that.actionDispatcher.dispatch({type: actions.LOAD_GARDEN, data: response.data});
          that.actionDispatcher.dispatch({type: actions.UPDATE_STATE, data: response});
        } else {
          that.actionDispatcher.dispatch({type: actions.MODAL_LOAD_ERROR});
          console.log('load error');
          console.log(response);
        }
      }
    });
  }

  /* Check if an entry already exists before to save garden with id contained in data */
  checkBeforeSaving(data) {
    let that = this;
    $.ajax({
      url: `${cst.URL_GARDEN}?action=checkExisting&id=${data.id}`,
      type : 'GET',
      success: (response) => {
        response = JSON.parse(response);
        if (response.status === false) {
          that.actionDispatcher.dispatch({type: actions.MODAL_SAVE_RESPONSE, data: response});
          return;
        }
        if (response.status === true && response.isExisting === true) {
          response.status = false;
          response.error = 'Ce nom est déjà utilisé pour un autre potager. Veuillez en utiliser un autre.';
          that.actionDispatcher.dispatch({type: actions.MODAL_SAVE_RESPONSE, data: response});
          return;
        }
        // If id correct and not already existing, we can save
        that.save(data);
      }
    });
  }

  /* Save on server the garden represented in data */
  save(data) {
    let that = this;
    $.ajax({
      url: cst.URL_GARDEN,
      data: {
        'data' : JSON.stringify(data),
        'action': 'save'
      },
      type : 'POST',
      success: (response) => {
        response = JSON.parse(response);
        if (response.status === true) {
          that.idGarden = response.id;
          that.actionDispatcher.dispatch({type: actions.UPDATE_STATE, data: response});
        }
        that.actionDispatcher.dispatch({type: actions.MODAL_SAVE_RESPONSE, data: response});
      }
    });
  }
}

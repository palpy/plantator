import * as actions from './actions';


/*
 * Handle a panel indicating state of a garden
 */
export class GardenStateView {
  constructor(rootSelector, actionDispatcher) {
    this.rootSelector = rootSelector;
    this.actionDispatcher = actionDispatcher;
    this.actionDispatcher.register('activateState', actions.ACTIVATE_FEATURES, () => this.activate());
    this.actionDispatcher.register('buildFeatureState', actions.BUILD_FEATURES, () => this.build());
  }

  activate() {
    this.actionDispatcher.unregister('activateState');
    $(`#${this.rootSelector}`).empty().append(`
      <div class="panel panel-default">
        <div class="panel-title">
          <div class="text-center">
            <button type="button" class="btn btn-default" title="Activer l'enregistrement le potager">
              Enregistrement
            </button>
          </div>
        </div>
      </div>
    `);
    const that = this;
    $(`#${this.rootSelector} button`).on('click', (event) => {
      $(this).off('click');
      that.build();
    });
  }

  build() {
    this.actionDispatcher.unregister('activateState');
    this.actionDispatcher.unregister('buildFeatureState');
    $(`#${this.rootSelector}`).empty().append(`
      <div class="panel panel-default">
        <div class="panel-title">
          <span>Potager</span>
          <div class="pull-right">
            <button class="btn btn-default btn-xs" title="Enregistrement du potager">Enregistrer</button>
          </div>
        </div>
        <div class="panel-body">
          <div class="resume">Etat non enregistré</div>
        </div>
      </div>
    `);
    let that = this;
    $(`#${this.rootSelector} .panel-title button`).on('click', (event) => {
      that.save();
    });
    this.actionDispatcher.register('updateState', actions.UPDATE_STATE, (data) => this.refresh(data.id));
    this.idGarden = null;
  }

  /* Refresh informations about garden, based on id in parameter */
  refresh(id) {
    this.idGarden = id;
    const gardenLocation = `http://${window.location.host}${window.location.pathname}?id=${id}`;
    $(`#${this.rootSelector}`).find('.resume').empty().append(`
      <div><span>Nom</span> : <span>${id}</span></div>
      <div><span>Url</span> : <input type="text" value="${gardenLocation}" read-only></div>
    `);
    // Once garden is saved, we notify when a new change is done but not saved
    this.actionDispatcher.register('notifyChange', actions.NOTIFY_CHANGE, (data) => this.notifyChange());
  }

  /* Notify user that some data changed and are not still saved */
  notifyChange() {
    let $resume = $(`#${this.rootSelector}`).find('.resume');
    if ($resume.find('.change-notification').length === 0) {
      // If text not already displayed, we indicate that some modifications are not saved
      $(`#${this.rootSelector}`).find('.resume').append(
        $(`<div class="change-notification">
            <span class="glyphicon glyphicon-asterisk" aria-hidden="true"> </span>
            Modifications non enregistrées
        </div>`)
      );
    }
  }

  /* Start a save process, and if first time for this garden, display modal for choosing a name */
  save() {
    if (this.idGarden !== null) {
      this.actionDispatcher.dispatch({type: actions.PREPARE_SAVE, data: {id: this.idGarden}});
    } else {
      this.actionDispatcher.dispatch({type: actions.MODAL_SAVE_REQUEST});
    }
    $(`#${this.rootSelector}`).find('.resume .change-notification').remove();
  }
}

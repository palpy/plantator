import * as actions from './actions';
import * as cst from '../constants';

/*
 * Handle a toolbar for garden features
 */
export class Toolbar {

  constructor(rootSelector, actionDispatcher) {
    this.rootSelector = rootSelector;
    this.actionDispatcher = actionDispatcher;
    this.actionDispatcher.register('activateToolbar', actions.ACTIVATE_FEATURES, () => this.activate());
    this.actionDispatcher.register('buildFeatureToolbar', actions.BUILD_FEATURES, () => this.build());
  }

  activate() {
    this.actionDispatcher.unregister('activateToolbar');
    $(`#${this.rootSelector}`).empty().append(`
      <div class="panel panel-default">
        <div class="panel-title">
          <div class="text-center">
            <button type="button" class="btn btn-default" title="Activer la barre d'outils">
              Barre d'outils
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
    this.actionDispatcher.unregister('activateToolbar');
    this.actionDispatcher.unregister('buildFeatureToolbar');
    this.idActiveButtons = [];
    $(`#${this.rootSelector}`).empty().append(`
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="row">
            <div class="col-md-6">
              <span class="pull-left" style="padding-top:8px">Zones : </span>
              <div class="btn-toolbar" role="toolbar" aria-label="toolbar">
                <div class="btn-group" role="group">
                  <!--<button type="button" id="areaNoneButton" class="btn btn-default" title="Cacher zones">
                    <img width="20px" height="20px" src="static/img/none.png"/>
                  </button>-->
                  <!--<button type="button" id="areaSeedingButton" class="btn btn-default" title="Afficher zone de semis">
                    <img width="20px" height="20px" src="static/img/seeding.png"/>
                  </button>-->
                  <button type="button" id="areaSizeButton" class="btn btn-default" title="Afficher envergure">
                    <img width="20px" height="20px" src="static/img/size.png"/>
                  </button>
                  <button type="button" id="areaHeightButton" class="btn btn-default" title="Afficher hauteur">
                    <img width="20px" height="20px" src="static/img/height.png"/>
                  </button>
                  <button type="button" id="areaSunButton" class="btn btn-default" title="Afficher ensoleillement">
                    <img width="20px" height="20px" src="static/img/sun.png"/>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <div>
                <span>Mois</span> : <span id="selectedMonth"></span>
              </div>
              <div id="monthSlider"></div>
            </div>
            <div class="col-md-3">
              <div class="btn-group" role="group" aria-label="button-remove">
                <button id="removePlantButton" type="button" class="btn btn-default" title="Retirer plante sélectionnée">
                  <img width="20px" height="20px" src="static/img/poubelle.png"/>
                </button>
              </div>
              <div class="pull-right">
                <button id="toolbarHelpButton" type="button" class="btn btn-default" title="Aide">
                  <img width="20px" height="20px" src="static/img/help.png"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);

    const that = this;
    $(`#removePlantButton`).on('click', (event) => {
      that.actionDispatcher.dispatch({type: actions.REMOVE_PLANT});
    });

    $(`#toolbarHelpButton`).on('click', (event) => {
      that.actionDispatcher.dispatch({type: actions.MODAL_HELP_TOOLBAR});
    });

    /*$(`#areaNoneButton`).on('click', (event) =>
      that.activeAreaButton(event.currentTarget.id, actions.HIDE_AREAS)
    );*/
    $(`#areaSeedingButton`).on('click', (event) =>
      that.onClickAreaButton($(event.currentTarget), 'seeding')
    );
    $(`#areaSizeButton`).on('click', (event) =>
      that.onClickAreaButton($(event.currentTarget), 'size')
    );
    $(`#areaHeightButton`).on('click', (event) =>
      that.onClickAreaButton($(event.currentTarget), 'height')
    );
    $(`#areaSunButton`).on('click', (event) =>
      that.onClickAreaButton($(event.currentTarget), 'sun')
    );

    $(`#monthSlider`).slider({
      min: 0,
      max: 12,
      step: 1,
      create: function (event, ui) {
        $('#selectedMonth').text(cst.MONTHS[0]);
      },
      slide: function (event, ui) {
        const month = ui.value;
        $('#selectedMonth').text(cst.MONTHS[month]);
        that.actionDispatcher.dispatch({type: actions.SHOW_TASK_MONTH, data: month});
      }
    });
  }

  onClickAreaButton($button, areaType) {
    const idButton = $button.attr('id');
    let actionType = null;
    if (this.idActiveButtons.indexOf(idButton) > -1) {
      $button.removeClass('active');
      actionType = actions.HIDE_AREAS;
      this.idActiveButtons.splice(this.idActiveButtons.indexOf(idButton), 1);
    } else {
      $button.addClass('active');
      actionType = actions.SHOW_AREAS;
      this.idActiveButtons.push(idButton);
    }
    this.actionDispatcher.dispatch({type: actionType, data: areaType});
  }

}

import * as cst from '../constants';
import * as actions from './actions';


/* Render a item selected */
const renderSelectizeItem = (item, escape) => {
  const image = cst.PLANTS_IMAGES[item.id] || cst.DEFAULT_PLANT_IMAGE;
  return `
    <div>
      <img style='width:15px;height:15px' src='static/img/plants/${image}'/>
      ${escape(item.name)}
    </div>
  `;
};


/* Display a draggable plant image besides selector */
const displayPlantImage = (imageSelector, value) => {
  const image = cst.PLANTS_IMAGES[value] || cst.DEFAULT_PLANT_IMAGE;
  $(`#${imageSelector}`).empty().append($(`
    <img draggable="true" src="static/img/plants/${image}" style="width:30px;height:30px;" title="Image à déplacer sur la grille" />
  `));
  $(`#${imageSelector} img`)
    .on('dragstart', (event) => {
      $(`#${imageSelector} img`).addClass('img-dragging');
    })
    .on('dragend', (event) => {
      $(`#${imageSelector} img`).removeClass('img-dragging');
    });
};


export class PlantSelectorView {
  constructor(rootSelector, options, plantFactory, actionDispatcher) {
    this.rootSelector = rootSelector;
    this.options = options;
    this.plantFactory = plantFactory;
    this.actionDispatcher = actionDispatcher;
    this.actionDispatcher.register('activateSelector', actions.ACTIVATE_FEATURES, () => this.activate());
    this.actionDispatcher.register('buildFeatureSelector', actions.BUILD_FEATURES, () => this.build());
  }

  activate() {
    this.actionDispatcher.unregister('activateSelector');
    $(`#${this.rootSelector}`).empty().append(`
      <div class="panel panel-default">
        <div class="panel-title">
          <div class="text-center">
            <button type="button" class="btn btn-default" title="Activer la recherche et sélection de plante">
              Sélection d'une plante
            </button>
          </div>
        </div>
      </div>
    `);
    const that = this;
    $(`#${this.rootSelector} button`).on('click', (event) => {
      $(this).off('click');
      that.build();
      that.actionDispatcher.dispatch({type: actions.ACTIVATE_CARD});
    });
  }

  build() {
    this.actionDispatcher.unregister('activateSelector');
    this.actionDispatcher.unregister('buildFeatureSelector');
    $(`#${this.rootSelector}`).empty().append(`
      <div class="panel panel-default">
        <div class="panel-title">
          <span>Choix de la plante (
            <a id="helpSelection" href="#" title="Aide">
              <img height="15px" src="static/img/help.png"/>
            </a>)
          </span>
        </div>
        <div class="panel-body">
          <div class="row">
            <div class="col-md-9">
              <select id="plant-selectize" name="plant-selectize" placeholder="Sélectionnez une plante"></select>
            </div>
            <div class="col-md-2">
              <div id="image-selected"></div>
            </div>
          </div>
        </div>
      </div>
    `);

    const options = this.options.map(opt => {
      return {
        id: opt.id,
        name: opt.nom.getTextValue()
      };
    });

    const that = this;
    $(`#helpSelection`).on('click', (event) => {
      that.actionDispatcher.dispatch({type: actions.MODAL_HELP_SELECTION});
    });

    // Initialization of the selectize plugin
    $('#plant-selectize').selectize({
      maxItems: 1,
      labelField: 'name',
      valueField: 'id',
      searchField: ['name'],
      options: options,
      preload: true,
      persist: false,
      render: {
        item: (item, escape) => {
          return renderSelectizeItem(item, escape);
        },
        option: (item, escape) => {
          return renderSelectizeItem(item, escape);
        }
      },
      onChange: (value) => {
        // on change, we show card and draggable image of the new plant selected
        const plantSelected = that.plantFactory.buildPlant(value);
        that.actionDispatcher.dispatch({type: actions.UNSELECT_PLANT});
        that.actionDispatcher.dispatch({type: actions.SHOW_CARD, data: plantSelected});
        return displayPlantImage('image-selected', value);
      }
    });
  }
}

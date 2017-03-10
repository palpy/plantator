import {fabric} from 'fabric';
import * as actions from './actions';
import * as cst from '../constants';
import {PlantView} from './plantView';
import {ScoreInput} from './scoring/input';

const DEFAULT_IMAGE_WIDTH = 28;
const DEFAULT_IMAGE_HEIGHT = 28;

const SCROLLBAR_WIDTH = 26;

const DEFAULT_USER_WIDTH = 6;
const DEFAULT_USER_LENGTH = 4;

/*
 * Encapsulates a grid representing a garden
 */
export class GardenView {
  constructor(containerSelector, plantFactory, actionDispatcher) {
    this.containerSelector = containerSelector;
    this.actionDispatcher = actionDispatcher;
    this.idImageSelected = null;
    this.imagesMapping = {};
    this.plantFactory = plantFactory;
    this.monthSelected = 0;
    this.idGardenCounter = 0;
    this.grid = null;
    this.actionDispatcher.register('generateGarden', actions.GENERATE_GARDEN, (data) => this.generate(data.width, data.length));
    this.actionDispatcher.register('loadGarden', actions.LOAD_GARDEN, (data) => this.load(data));

    const that = this;
    $(`#${this.containerSelector}`).append(`
      <div class="text-center"><button type="button" class="btn btn-default btn-lg">Générer votre potager</button>
    `);
    $(`#${this.containerSelector}`).find('button').on('click', (event) => {
      that.actionDispatcher.dispatch({type: actions.MODAL_GARDEN_CREATOR});
    });
  }

  generate(width, length) {
    // From user dimensions, we calculate grid features, like the size in pixels of a meter
    this.grid = {
      userDimensions: {
        width: width,
        length: length
      },
      sizeMeter: ($(`#${this.containerSelector}`).width() - SCROLLBAR_WIDTH) / width,
      horizontalLines: [],
      verticalLines: []
    };

    $(`#${this.containerSelector}`).empty().append(`
      <div class="row">
        <div class="col-md-12">
          <div style="height:400px; overflow: auto;">
            <canvas
              id="canvas-garden"
              width=${this.grid.sizeMeter * width}
              height=${this.grid.sizeMeter * length}>
            </canvas>
          </div>
        </div>
      </div>
    `);

    let self = this;

    this.canvas = new fabric.Canvas('canvas-garden');
    let canvasContainer = $(`#${this.containerSelector}`).parent()[0];

    // drag and drop events dont work right with JQuery on container...
    // so for canvas container, use native JS methods

    // On drag over
    canvasContainer.addEventListener('dragover', (event) => {
      if (event.preventDefault) {
          event.preventDefault();
      }
      event.dataTransfer.dropEffect = 'copy';
      return false;
    }, false);

    // On drop
    canvasContainer.addEventListener('drop', (event) => {
      event.preventDefault();
      if (event.stopPropagation) {
        event.stopPropagation();
      }
      const idPlant = $('#plant-selectize').val();
      const position = {
        x: event.layerX,
        y: event.layerY
      };
      self.putPlant($('#image-selected img.img-dragging')[0], idPlant, position);
      return false;

    }, false);

    // On selection of an object
    this.canvas.on('object:selected', (event) => {
      this.selectPlant(event.target);
    });

    // On click on grid, but not on a object
    this.canvas.on('before:selection:cleared', (event) => {
      this.unselectPlant();
    });

    // On image moving
    this.canvas.on('object:moving', (event) => {
      var obj = event.target;
      if (typeof(obj) === 'undefined' || obj === null || typeof(obj.canvas) === 'undefined') {
        return;
      }
      // Below is code to be sure we can't drag a plant outside of the visible grid

       // if object is too big ignore
      if(obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width){
          return;
      }
      obj.setCoords();
      const imagePlant = obj._objects.filter(o => o.isType('image'))[0];
      const boundingRect = {
        left: obj.left + obj.width / 2 - imagePlant.width / 2,
        top: obj.top + obj.height / 2 - imagePlant.height / 2,
        width: imagePlant.width,
        height: imagePlant.height
      };

      // top-left  corner
      if(boundingRect.top < 0 || boundingRect.left < 0){
          obj.top = Math.max(obj.top, obj.top-boundingRect.top);
          obj.left = Math.max(obj.left, obj.left-boundingRect.left);
      }
      // bot-right corner
      if(boundingRect.top+boundingRect.height  > obj.canvas.height || boundingRect.left+boundingRect.width  > obj.canvas.width){
          obj.top = Math.min(obj.top, obj.canvas.height-boundingRect.height+obj.top-boundingRect.top);
          obj.left = Math.min(obj.left, obj.canvas.width-boundingRect.width+obj.left-boundingRect.left);
      }

      // On moving, notify state panel that we made a change
      this.actionDispatcher.dispatch({type: actions.NOTIFY_CHANGE});
    });

    this.refreshGrid();

    // Register listeners on some actions
    this.actionDispatcher.register('unselectPlant', actions.UNSELECT_PLANT, () => this.canvas.trigger('before:selection:cleared'));
    this.actionDispatcher.register('removePlant', actions.REMOVE_PLANT, () => this.removePlant());

    this.actionDispatcher.register('showAreas', actions.SHOW_AREAS, (areaType) => this.showAreas(areaType));
    this.actionDispatcher.register('hideAreas', actions.HIDE_AREAS, (areaType) => this.hideAreas(areaType));
    /*this.actionDispatcher.register('showAreaSeeding', actions.SHOW_AREA_SEEDING, () => this.showAreas('seeding'));
    this.actionDispatcher.register('showAreaSize', actions.SHOW_AREA_SIZE, () => this.showAreas('size'));
    this.actionDispatcher.register('showAreaHeight', actions.SHOW_AREA_HEIGHT, () => this.showAreas('height'));
    this.actionDispatcher.register('showAreaSun', actions.SHOW_AREA_SUN, () => this.showAreas('sun'));
    this.actionDispatcher.register('hideArea', actions.HIDE_AREAS, () => this.hideAreas());*/
    this.actionDispatcher.register('showMonthlyTask', actions.SHOW_TASK_MONTH, (data) => this.showMonthlyTask(data));

    this.actionDispatcher.register('prepareSave', actions.PREPARE_SAVE, (data) => this.prepareSave(data));
    this.actionDispatcher.register('prepareScore', actions.PREPARE_SCORE, (data) => this.prepareScoring(data));
    this.actionDispatcher.register('showScorePlants', actions.SHOW_SCORE_PLANTS, (data) => this.showScoreSelection(data));
    this.actionDispatcher.register('hideScorePlants', actions.HIDE_SCORE_PLANTS, (data) => this.hideScoreSelection(data));

    // Unregister listeners on garden creation / loading
    this.actionDispatcher.unregister('generateGarden');
    this.actionDispatcher.unregister('loadGarden');
  }

  /* Get some datas about plants in garden, for saving */
  prepareSave(data) {
    let plants = [];
    for (const id in this.imagesMapping) {
      plants.push(this.imagesMapping[id].toJSON());
    }
    // Call save process by dispatching save event with plants data
    this.actionDispatcher.dispatch({type: actions.SAVE, data: {
      id: data.id,
      garden: {
        plants: plants,
        userDimensions: this.grid.userDimensions
      }
    }});
  }

  /* Get some datas about plants in garden, to run scoring */
  prepareScoring() {
    let plants = [], plantModels = {};
    for (const id in this.imagesMapping) {
      const plantView = this.imagesMapping[id];
      const plant = plantView.getPlant();
      plants.push(plantView.toJSON());
      if (!(plant.id in plantModels)) {
        plantModels[plant.id] = plant;
      }
    }
    const scoreInput = new ScoreInput(plants, plantModels, {
      sizeMeter: this.grid.sizeMeter
    });
    // Call score process by dispatching save event with plants data
    this.actionDispatcher.dispatch({type: actions.SCORE, data: {
      input: scoreInput,
    }});
  }

  /*
    Add a plant on grid, by putting image in a fabricjs group
    and instanciating a plantView object
  */
  addPlantOnGrid(img, idPlant, width, height, position) {
    img.set({
      width: width,
      height: height,
      left: position.x,
      top: position.y,
      hasRotatingPoint: false,
      lockRotation: true,
      lockScalingFlip : true,
      lockScalingX: true,
      lockScalingY: true
    });
    const plant = this.plantFactory.buildPlant(idPlant);
    let plantView = new PlantView(img, plant);
    this.imagesMapping[img.id] = plantView;
    this.canvas.add(plantView.getGroup());
  }

  /* Populate garden with plants from imported data */
  load(data) {
    // By default, if no user dimensions saved, we generate a 6mx4m garden
    const {width, length} = (typeof(data.garden.userDimensions) !== 'undefined')
      ? data.garden.userDimensions
      : {width: DEFAULT_USER_WIDTH, length: DEFAULT_USER_LENGTH};
    this.generate(width, length);

    data.garden.plants.map(jsonPlant => {
      const idImage = this.idGardenCounter;
      this.idGardenCounter = this.idGardenCounter + 1;
      const img = cst.PLANTS_IMAGES[jsonPlant.idPlant] || cst.DEFAULT_PLANT_IMAGE;
      fabric.Image.fromURL(`${cst.URL_IMAGES}/${img}`, oImg => {
        oImg.set({
          id: idImage
        });
        this.addPlantOnGrid(oImg, jsonPlant.idPlant, DEFAULT_IMAGE_WIDTH, DEFAULT_IMAGE_HEIGHT, jsonPlant.position);
      });
    });
  }

  /* Put a plant into the garden, from dragged image */
  putPlant(img, idPlant, position) {
    const idImage = this.idGardenCounter;
    this.idGardenCounter = this.idGardenCounter + 1;
    img = new fabric.Image(img, {
      id: idImage
    });
    this.addPlantOnGrid(img, idPlant, img.width, img.height, position);
    this.showMonthlyTask(this.monthSelected);
    this.actionDispatcher.dispatch({type: actions.NOTIFY_CHANGE});
  }

  /* Remove selected plant */
  removePlant() {
    if (this.idImageSelected === null) {
      return;
    }
    // We keep id in another variable to keep a reference for deleting from imagesMapping
    const id = this.idImageSelected;
    let imageGroupToRemove = this.imagesMapping[this.idImageSelected].getGroup();
    this.canvas.remove(imageGroupToRemove);
    delete this.imagesMapping[id];
    this.actionDispatcher.dispatch({type: actions.HIDE_CARD});
    this.actionDispatcher.dispatch({type: actions.NOTIFY_CHANGE});
  }

  /* Clear all plants from garden */
  clear() {
    this.canvas.clear();
    for (const id in this.imagesMapping) {
      delete this.imagesMapping[id];
    }
    this.imagesMapping = {};
  }

  /* Select a plant, and display some informations about it */
  selectPlant(imageGroup) {
    if (this.idImageSelected !== null) {
      this.unselectPlant();
    }

    const imagePlant = imageGroup._objects.filter(o => o.isType('image'))[0];
    const plantView = this.imagesMapping[imagePlant.id];
    this.idImageSelected = imagePlant.id;
    this.actionDispatcher.dispatch({type: actions.SHOW_CARD, data: plantView.getPlant()});
  }

  /* Unselect plant, and hide some informations about it */
  unselectPlant() {
    if (this.idImageSelected === null) {
      return;
    }
    const plantView = this.imagesMapping[this.idImageSelected];
    this.canvas.selection = false;
    this.idImageSelected = null;
    this.actionDispatcher.dispatch({type: actions.HIDE_CARD});
  }

  showAreas(type) {
    for (let idImage in this.imagesMapping) {
      this.imagesMapping[idImage].showArea(type, this.grid.sizeMeter);
    }
    this.canvas.renderAll();
  }

  hideAreas(type) {
    for (let idImage in this.imagesMapping) {
      this.imagesMapping[idImage].hideArea(type);
    }
    this.canvas.renderAll();
  }

  /* Show for each plant in garden which task is associated to selected month, if any */
  showMonthlyTask(month) {
    this.monthSelected = month;
    if (this.monthSelected === 0) {
      this.hideMonthlyTasks();
      return;
    }
    for (let idImage in this.imagesMapping) {
      // Because of asynchronous image loading, the render if executed in a callback
      this.imagesMapping[idImage].showMonthlyTasks(this.monthSelected, () => {
        this.canvas.renderAll();
      });
    }
  }

  /* Hide all tasks associated to selected monh */
  hideMonthlyTasks() {
    for (let idImage in this.imagesMapping) {
      this.imagesMapping[idImage].hideMonthlyTasks(() => {
        this.canvas.renderAll();
      });
    }
  }

  showScoreSelection(selection) {
    selection.plants.map(plant => {
      this.imagesMapping[plant.idImage].showScoreSelection(selection.circlePlantColor);
    });
    this.canvas.renderAll();
  }

  hideScoreSelection(selection) {
    selection.plants.map(plant => {
      this.imagesMapping[plant.idImage].hideScoreSelection();
    });
    this.canvas.renderAll();
  }

  /* Refresh garden grid by redrawing lines, depending of the size in pixels of a meter */
  refreshGrid() {
    const canvasWidth = this.canvas.getWidth();
    const canvasHeight = this.canvas.getHeight();
    this.grid.horizontalLines.map(line => this.canvas.remove(line));
    this.grid.verticalLines.map(line => this.canvas.remove(line));
    this.grid.horizontalLines = [];
    this.grid.verticalLines = [];
    for (let xStart=this.grid.sizeMeter; xStart < canvasWidth; xStart=xStart+this.grid.sizeMeter) {
      const line = new fabric.Line([xStart, 0, xStart, canvasHeight], {
        stroke: '#222',
        strokeDashArray: [5, 5],
        selectable: false
      });
      this.canvas.add(line);
      this.grid.verticalLines.push(line);
    }
    for (let yStart=this.grid.sizeMeter; yStart < canvasHeight ; yStart=yStart+this.grid.sizeMeter) {
      const line = new fabric.Line([0, yStart, canvasWidth, yStart], {
        stroke: '#222',
        strokeDashArray: [5, 5],
        selectable: false
      });
      this.canvas.add(line);
      this.grid.horizontalLines.push(line);
    }
  }

}

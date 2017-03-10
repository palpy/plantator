import {fabric} from 'fabric';

const ID_SEEDING_AREA = 'seeding';
const ID_SIZE_AREA = 'size';
const ID_HEIGHT_AREA = 'height';
const ID_SUN_AREA = 'sun';
const ID_SCORE_BIND = 'score';

const ID_IMAGE_HARVEST = 'image_harvest';
const ID_IMAGE_SEEDING = 'image_seeding';

const IMAGES_MAPPING = {};
IMAGES_MAPPING[ID_IMAGE_HARVEST] = 'static/img/rcolte.png';
IMAGES_MAPPING[ID_IMAGE_SEEDING] = 'static/img/semiext.png';


/*
 * Encapsulates a view on a plant put in a garden grid
 */
export class PlantView {
  constructor(img, plant) {
    this.plant = plant;
    this.plantImage = img;
    this.group = new fabric.Group([this.plantImage]);
    // We keep center of plant image as reference center for drawing each area
    this.imageCenterPoint = this.group.getCenterPoint();
  }

  getGroup() {
    return this.group;
  }

  getPlantImage() {
    return this.plantImage;
  }

  getPlant() {
    return this.plant;
  }

  /* Return a json representation of plant, containing all useful informations for saving */
  toJSON() {
    return {
      idPlant: parseInt(this.plant.id),
      idImage: this.plantImage.id,
      position: {
        x: this.group.left,
        y: this.group.top
      }
    };
  }

  /* Reset size of the group to the size of the image plant */
  resetGroupSize() {
    this.group.set({
      left: this.group.left + this.group.width / 2 - this.plantImage.width / 2,
      top: this.group.top + this.group.height / 2 - this.plantImage.height / 2,
      width: this.plantImage.width,
      height: this.plantImage.height
    });
    this.group.setCoords();
  }

  getImageCenterPoint() {
    let isHeightDrawn = false;
    const idHeightArea = `${this.plantImage.id}-height`;
    this.group.forEachObject(o => {
      if (o && (o.id === idHeightArea)) {
        isHeightDrawn = true;
      }
    });
    if (isHeightDrawn) {
      // Si hauteur dessinée, on prend pas le centre du groupe
      // mais le centre de l'image de la plante
      const groupCenter = this.group.getCenterPoint();
      const imageCenter = this.plantImage.getCenterPoint();
      return {
        x: groupCenter.x + imageCenter.x,
        y: groupCenter.y + imageCenter.y
      };
    } else {
      return this.group.getCenterPoint();
    }
  }

  showArea(type, sizeMeter) {
    //this.hideAreas();
    let area = null;
    if (type === 'seeding') {
      this.showSeedingArea(sizeMeter);
    } else if (type === 'size') {
      this.showSizeArea(sizeMeter);
    } else if (type === 'height') {
      this.showHeightShadow(sizeMeter);
    } else if (type === 'sun') {
      this.showSunArea();
    }
  }

  hideArea(type) {
    const idImageToRemove = `${this.plantImage.id}-${type}`;
    this.group.forEachObject(o => {
      if ((typeof(o) !== 'undefined') && (idImageToRemove === o.id)) {
        this.group.removeWithUpdate(o);
      }
    });
  }

  /* Show seeding area around the plant, on grid */
  showSeedingArea(sizeMeter) {
    const dligne = this.plant.dligne.getValue();
    const drang = this.plant.drang.getValue();
    if (dligne === null || drang === null) {
      return;
    }
    const imageCenter = this.getImageCenterPoint();
    // conversion of width/height to meters, then to pixels
    const widthRadius = dligne * 0.01 * sizeMeter;
    const heightRadius = drang * 0.01 * sizeMeter;
    const area = new fabric.Ellipse({
      id: `${this.plantImage.id}-${ID_SEEDING_AREA}`,
      left: imageCenter.x - widthRadius,
      top: imageCenter.y - heightRadius,
      rx: widthRadius,
      ry: heightRadius,
      angle: 0,
      stroke: '#CD853F',
      strokeWidth:3,
      opacity: 0.5,
      selectable: false
    });
    this.group.addWithUpdate(area);
  }

  /* Show size needed for plant for growing */
  showSizeArea(sizeMeter) {
    const largeur = this.plant.largeur.getValue();
    if (largeur === null) {
      return;
    }
    const imageCenter = this.getImageCenterPoint();
    // conversion of width/height to meters, then to pixels
    const radius = largeur * 0.01 * sizeMeter;
    const area = new fabric.Circle({
      id: `${this.plantImage.id}-${ID_SIZE_AREA}`,
      left: imageCenter.x - radius,
      top: imageCenter.y - radius,
      radius: radius,
      angle: 0,
      fill: 'rgba(0,0,0,0)',
      stroke: '#9ACD32',
      strokeWidth: 5,
      opacity: 0.5,
      selectable: false
    });
    this.group.addWithUpdate(area);
  }

  /* Show shadow area caused by height of plant */
  showHeightShadow(sizeMeter) {
    const hauteur = this.plant.hauteur.getValue();
    if (hauteur === null) {
      return;
    }
    const imageCenter = this.getImageCenterPoint();
    // conversion of width/height to meters, then to pixels
    const pixelHeight = hauteur * 0.01 * sizeMeter;
    const widthRadius = pixelHeight * 0.1;
    const heightRadius = pixelHeight * 0.3;
    const area = new fabric.Ellipse({
      id: `${this.plantImage.id}-${ID_HEIGHT_AREA}`,
      left: imageCenter.x - widthRadius,
      top: imageCenter.y - heightRadius * 2,
      rx: widthRadius,
      ry: heightRadius,
      fill: '#ddd',
      opacity: 0.5,
      angle: 0, //-180,
      selectable: false,
      shadow: {
        color: '#444',
        blur: 5,
        offsetX: 0,
        offsetY: 0
      }
    });
    this.group.addWithUpdate(area);
    area.sendToBack();
  }

  /* Show amount of sun needed by plant (a little, medium or a lot) */
  showSunArea() {
    const soleil = this.plant.soleil.getValue();
    if (soleil === null) {
      return;
    }
    const imageCenter = this.getImageCenterPoint();
    const greys = ['rgba(0,0,0,0)', '#FFDF00', '#FFDF00', '#FFDF00'];
    const radius = (soleil === 0) ? 0 : 10 * (4-soleil) + 10;
    const area = new fabric.Circle({
      id: `${this.plantImage.id}-${ID_SUN_AREA}`,
      left: imageCenter.x - radius,
      top: imageCenter.y - radius,
      radius: radius,
      angle: 0,
      fill: greys[soleil],
      opacity: (4-soleil) * 0.15 + 0.3,
      selectable: false
    });
    this.group.addWithUpdate(area);
  }

  /*
    Show image of a task corresponding to imageKey, over the plant
    top parameter represents top position of a image relative to the plant view group
  */
  showTaskImage(imageKey, top, afterImageLoad) {
    const imageCenter = this.getImageCenterPoint();
    fabric.Image.fromURL(IMAGES_MAPPING[imageKey], oImg => {
      oImg.set({
        id: `${this.plantImage.id}-${imageKey}`,
        width: 20,
        height: 20,
        left: imageCenter.x,
        top: imageCenter.y,
        hasRotatingPoint: false,
        lockRotation: true,
        lockScalingFlip : true,
        lockScalingX: true,
        lockScalingY: true,
        opacity: 0.85
      });
      this.group.addWithUpdate(oImg);
      afterImageLoad();
    });
  }

  /* Show all tasks relative to plant and month in parameter */
  showMonthlyTasks(month, afterImageLoad) {
    this.hideMonthlyTasks(afterImageLoad);
    // If multiple tasks on a same month, we show images with some shift on top position
    let top = 0;
    if (this.plant.estMoisDeRecolte(month)) {
      this.showTaskImage(ID_IMAGE_HARVEST, top, afterImageLoad);
      top = top - 10;
    }
    if (this.plant.semisext.getValue() == month) {
      this.showTaskImage(ID_IMAGE_SEEDING, top, afterImageLoad);
      top = top - 10;
    }
  }

  /* Hide all tasks relative to plant */
  hideMonthlyTasks(afterImageLoad) {
    const idImagesToRemove = [
      `${this.plantImage.id}-${ID_IMAGE_HARVEST}`,
      `${this.plantImage.id}-${ID_IMAGE_SEEDING}`
    ];
    this.group.forEachObject(o => {
      if ((typeof(o) !== 'undefined') && (idImagesToRemove.indexOf(o.id) > -1)) {
        this.group.remove(o);
        afterImageLoad();
      }
    });
  }

  /* Show plants from grid bound to rule evaluated */
  showScoreSelection(color) {
    const imageCenter = this.group.getCenterPoint();
    const radius = 20;
    let scoreCircle = new fabric.Circle({
      id: `${this.plantImage.id}-${ID_SCORE_BIND}`,
      left: imageCenter.x - radius,
      top: imageCenter.y - radius,
      radius: radius,
      angle: 0,
      fill: color,
      stroke: color,
      strokeWidth:1,
      opacity: 0.5,
      selectable: false
    });
    this.group.addWithUpdate(scoreCircle);
    this.group.setCoords();
  }

  /* Hide plants bound to a rule evaluation */
  hideScoreSelection() {
    this.group.forEachObject(o => {
      if ((typeof(o) !== 'undefined') && (o.id === `${this.plantImage.id}-${ID_SCORE_BIND}`)) {
        this.group.remove(o);
        this.group.setCoords();
      }
    });
  }

}

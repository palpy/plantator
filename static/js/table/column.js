import * as cst from '../constants';
import {categories} from '../plant/category';
import {views} from './cell';


/*
 * Representation of a column of the table
 */
class Column {
  constructor(category, viewAttributes) {
    this.category = category;
    this.viewAttributes = viewAttributes;
  }

  getName() {
    return this.category.getName();
  }

  // To override
  getCellContent(plant) {
    let content = [];
    for (let attr in this.viewAttributes) {
      let typeRepr = this.viewAttributes[attr];
      content.push(views[typeRepr].buildCellContent(plant[attr]));
    }
    return content.join('');
  }

  // To override
  getPopoverContent(plant) {
    let content = [];
    for (let attr in this.viewAttributes) {
      let typeRepr = this.viewAttributes[attr];
      content.push(views[typeRepr].buildPopoverContent(plant[attr]));
    }
    return content.join('');
  }

  /* Return content of a cell, depending of plant */
  renderCell(plant) {
    return this.getCellContent(plant);
  }

  /* Render a popover bound to cell (a html node), depending on plant */
  renderPopover(cell, plant) {
    const popoverContent = `${ this.getPopoverContent(plant) }
                            <div class='col-md-12'>
                              <div class='text-center' style='margin:10px 0'>
                                <a class='btn btn-default' href='${cst.URL_PLANTATOR_EDIT}?id=${ plant.id }#${ this.category.getId() }'>Editer informations</a>
                              </div>
                            </div>`;
    $(cell).attr({
      style: `border-bottom:5px solid ${ this.category.getColor() }`,
      'data-container': "body",
      'data-content': popoverContent,
      'data-toggle': "popover",
      'title': `${ this.category.getName() } <a href='#' class='pull-right'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></a>`
    });

    $(cell).popover({html: true, placement: 'top', trigger: 'manual'});
    $(cell).on('click', (event) => {
      // on click on a cell, hide all open popovers and display the one selected
      $('.popover').popover('hide');
      $(event.currentTarget).popover('show');
      $('.popover-title').find('a').on('click', (event) => {
        $('.popover').popover('hide');
      });
    });
  }

}


// COLUMN IDENTITY
export class IdentityColumn extends Column {
  constructor() {
    const viewsAttr = {
      famille: 'text',
      nom: 'text',
      genre: 'text',
      espece: 'text'
    };
    super(categories.identity, viewsAttr);
  }

  getCellContent(plant) {
    return `${views.text.buildCellContent(plant.famille)}
            ${views.text.buildCellContent(plant.nom)}
            <div>
              <a target="blank" href="https://www.google.fr/search?q=${ plant.nom.getValue() }&tbm=isch" class="awsm" title="Voir des images">&#xf03e;</a>
            </div>`;
  }
}


// COLUMN FEATURES
export class FeaturesColumn extends Column {
  constructor() {
    const viewsAttr = {
      type: 'list',
      vivace: 'text',
      vie: 'text',
      conservalimt: 'text'
    };
    super(categories.features, viewsAttr);
  }

  getCellContent(plant) {
    return `${views.list.buildCellContent(plant.type, 'awsm', true)}
            ${views.text.buildCellContent(plant.vivace, 'awsm')}`;
  }
}


// COLUMN CALENDAR
export class CalendarColumn extends Column {
  constructor() {
    const viewsAttr = {
      moistaille: 'text',
      moisflo: 'text',
      moisbourgeonfeuille: 'text',
      moispertefeuille: 'text',
      recolteDeb: 'text',
      recolteFin: 'text',
      semisint: 'text',
      semisext: 'text',
      semisabri: 'text'
    };
    super(categories.calendar, viewsAttr);
  }

  getCellContent(plant) {
    let months = [];
    for (var i = 1 ; i < cst.MONTHS_LETTERS.length ; i++) {
      const iconSemisExt = (plant.semisext.getValue() == i) ? '<img alt="semisext" src="static/img/semiext.png"/>' : '';
      const iconRecolte = (plant.estMoisDeRecolte(i)) ? '<img alt="recolte" src="static/img/rcolte.png"/>' : '';
      months.push(`<div class="col-md-1 col-sm-1"><span class="${cst.MONTHS_CLASSES[i]}">${cst.MONTHS_LETTERS[i]}</span>${iconSemisExt}${iconRecolte}</div>`);
    }
    return `<section class="lesmois">${months.join('')}</section>`;
  }
}


// COLUMN SOIL OCCUPATION
export class SoilOccupationColumn extends Column {
  constructor() {
    const viewsAttr = {
      solriche: 'text',
      multi: 'list',
      racine: 'text'
    };
    super(categories.soiloccupation, viewsAttr);
  }

  getCellContent(plant) {
    return `${views.text.buildCellContent(plant.solriche, 'awsm', true)}
            ${views.text.buildCellContent(plant.racine, 'awsm')}
            ${views.list.buildCellContent(plant.multi)}`;
  }

}


// COLUMN AREA
export class AreaColumn extends Column {
  constructor() {
    const viewsAttr = {
      hauteur: 'text',
      largeur: 'text'
    };
    super(categories.area, viewsAttr);
  }

  getCellContent(plant) {
    return `${views.text.buildCellContent(plant.hauteur, 'awsm')}
            ${views.text.buildCellContent(plant.largeur, 'awsm')}`;
  }
}


// COLUMN SUN
export class SunColumn extends Column {
  constructor() {
    const viewsAttr = {
      soleil: 'text',
      Tmin: 'text'
    };
    super(categories.sun, viewsAttr);
  }

  getCellContent(plant) {
    return `${views.text.buildCellContent(plant.soleil, 'awsm', true)}
            ${views.text.buildCellContent(plant.Tmin, 'aswm')}`;
  }
}


// COLUMN ASSOCIATION
export class NeighbourColumn extends Column {
  constructor() {
    const viewsAttr = {
      associe: 'list',
      antiassocie: 'list'
    };
    super(categories.neighbour, viewsAttr);
  }

  getCellContent(plant) {
    return `${views.list.buildCellContent(plant.associe, 'neighbour-good')}
            ${views.list.buildCellContent(plant.antiassocie, 'neighbour-bad')}`;
  }

}


// COLUMN SOIL
export class SoilColumn extends Column {
  constructor() {
    const viewsAttr = {
      eau: 'text',
      pH: 'text',
      rendement: 'text',
    };
    super(categories.soil, viewsAttr);
  }
}


// COLUMN USAGE
export class UsageColumn extends Column {
  constructor() {
    const viewsAttr = {
      usagemedic: 'list',
      utilisation: 'list'
    };
    super(categories.usage, viewsAttr);
  }

}


// COLUMN SEEDING
export class SeedingColumn extends Column {
  constructor() {
    const viewsAttr = {
      drang: 'text',
      dligne: 'text',
      Tlevee: 'text',
      prof: 'text'
    };
    super(categories.seeding, viewsAttr);
  }
}


// COLUMN OTHER
export class OtherColumn extends Column {
  constructor() {
    const viewsAttr = {
      commentaire: 'text',
      tpsconserv: 'text',
      tpslevee: 'text'
    };
    super(categories.other, viewsAttr);
  }
}

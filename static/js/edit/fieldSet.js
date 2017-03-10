import {categories} from '../plant/category';
import {fields} from './fields';


/*
 * Encapsulates a set of fields, belonging to a same category
 */
class FieldSet {
  constructor(category, fieldAttributes) {
    this.category = category;
    this.fieldAttributes = fieldAttributes;
  }

  // Build a panel containing all fields bound to category
  render($root, plant) {
    let fieldsRepr = [];
    for (let attr in this.fieldAttributes) {
      // For each field attribute, we build a input representation  of the plant attribute
      let typeRepr = this.fieldAttributes[attr];
      fieldsRepr.push(fields[typeRepr].render(plant[attr]));
    }
    let $panel = $(`<div class="panel panel-default" id="${this.category.getId()}">
                      <div class="panel-heading" role="tab" id="heading${this.category.getId()}" style="background: ${this.category.getColor()}">
                        <h4 class="panel-title" role="button" data-toggle="collapse" data-parent="#accordion"
                           href="#collapse${this.category.getId()}" aria-expanded="true" aria-controls="collapse${this.category.getId()}">
                          ${this.category.getName()}
                        </h4>
            					</div>
                      <div id="collapse${this.category.getId()}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading${this.category.getId()}">
                        <div class="panel-body">
                          ${fieldsRepr.join('')}
                        </div>
                      </div>
                    </div>`).appendTo($root);
    return $panel;
  }

  // Populate all fields with corresponding attributes of the plant
  populate(plant) {
    for (let attr in this.fieldAttributes) {
      let typeRepr = this.fieldAttributes[attr];
      fields[typeRepr].setValue(plant[attr]);
    }
  }

  // Get all values contined in fields of set
  getValues(plant) {
    let result = {};
    for (let attr in this.fieldAttributes) {
      let typeRepr = this.fieldAttributes[attr];
      result[attr] = fields[typeRepr].getValue(plant[attr]);
    }
    return result;
  }
}


// FIELD SET IDENTITY
export class IdentityFieldSet extends FieldSet {
  constructor() {
    const viewsAttr = {
      famille: 'text',
      nom: 'text',
      genre: 'text',
      espece: 'text'
    };
    super(categories.identity, viewsAttr);
  }
}


// FIELD SET FEATURES
export class FeaturesFieldSet extends FieldSet {
  constructor() {
    const viewsAttr = {
      type: 'checkbox',
      vivace: 'select',
      vie: 'text',
      conservalimt: 'text'
    };
    super(categories.features, viewsAttr);
  }
}


// FIELD SET CALENDAR
export class CalendarFieldSet extends FieldSet {
  constructor() {
    const viewsAttr = {
      moistaille: 'select',
      moisflo: 'select',
      moisbourgeonfeuille: 'select',
      moispertefeuille: 'select',
      recolteDeb: 'select',
      recolteFin: 'select',
      semisint: 'select',
      semisext: 'select',
      semisabri: 'select'
    };
    super(categories.calendar, viewsAttr);
  }

}


// FIELD SET SOIL OCCUPATION
export class SoilOccupationFieldSet extends FieldSet {
  constructor() {
    const viewsAttr = {
      solriche: 'select',
      multi: 'checkbox',
      racine: 'select'
    };
    super(categories.soiloccupation, viewsAttr);
  }
}


// FIELD SET AREA
export class AreaFieldSet extends FieldSet {
  constructor() {
    const viewsAttr = {
      hauteur: 'text',
      largeur: 'text'
    };
    super(categories.area, viewsAttr);
  }
}


// FIELD SET SUN
export class SunFieldSet extends FieldSet {
  constructor() {
    const viewsAttr = {
      soleil: 'select',
      Tmin: 'text'
    };
    super(categories.sun, viewsAttr);
  }

}


// FIELD SET ASSOCIATION
export class NeighbourFieldSet extends FieldSet {
  constructor() {
    const viewsAttr = {
      associe: 'checkbox',
      antiassocie: 'checkbox',
    };
    super(categories.neighbour, viewsAttr);
  }

}


// FIELD SET SOIL
export class SoilFieldSet extends FieldSet {
  constructor() {
    const viewsAttr = {
      eau: 'select',
      pH: 'select',
      rendement: 'text'
    };
    super(categories.soil, viewsAttr);
  }
}


// FIELD SET USAGE
export class UsageFieldSet extends FieldSet {
  constructor() {
    const viewsAttr = {
      usagemedic: 'checkbox',
      utilisation: 'checkbox'
    };
    super(categories.usage, viewsAttr);
  }

}


// FIELD SET SEEDING
export class SeedingFieldSet extends FieldSet {
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


// FIELD SET OTHER
export class OtherFieldSet extends FieldSet {
  constructor() {
    const viewsAttr = {
      commentaire: 'text',
      tpsconserv: 'text',
      tpslevee: 'text'
    };
    super(categories.other, viewsAttr);
  }
}

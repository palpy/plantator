import $ from 'jquery';
import * as cst from '../constants';

/*
 * Encapsulates a set of filters, for filtering a set of plantes
 */
export class FilterSet {
  constructor() {
    this.filters = new Array();
    this.callback = null;
  }

  addFilter(filter) {
    this.filters.push(filter);
  }

  removeFilter(idFilter) {
    this.filters = this.filters.filter(f => f.id != idFilter);
  }

  resetFilters() {
    this.filters = [];
  }

  /* Prepare request for adding filter argument, on server get request */
  prepareRequest() {
    return this.filters.map(f => f.prepare()).filter(str => str != null).join('&');
  }

  /* Callback is a rendering method to render result */
  render($parent, callback) {
    let that = this;
    let $container = $('<div></div>').appendTo($parent);
    for (let f of this.filters) {
      f.render($container);
    }
    let $button = $('<div class="col-md-3"><button id="filterButton" class="btn btn-default">Filtrer</button></div>').appendTo($container);
    $button.on('click', (event) => {
      const filterQuery = that.prepareRequest();
      callback(filterQuery);
    })
  }
}


/*
 * Encapsulates a filter for a set of plantes
 */
class Filter {
  constructor(id, label, choices) {
    this.id = id;
    this.label = label;
    this.choices = choices;
    this.$component = null;
  }

  // To override
  filter(plant) {
    return false;
  }

  // To override, return string to be used as filter argument for server request
  prepare() {
    return '';
  }

  getValue() {
    if (this.$component === null) {
      return null;
    }
    return this.$component.find('select').val();
  }

  getLabelValue() {
    if (this.$component === null) {
      return null;
    }
    return this.$component.find('select option:selected').text();
  }

  // To override
  render($parent) {
    if (this.$component !== null) {
        this.$component.empty();
    }
    this.$component = $('<div class="form-group col-md-3"></div>').appendTo($parent);
    this.$component.append(`<label>${this.label}</label>`);
    let $select = $(`<select id="${this.id}" class="form-control"></select>`).appendTo(this.$component);
    for (let id in this.choices) {
      $select.append(`<option value="${id}">${this.choices[id]}</option>`);
    }
    return $select;
  }
}


/*
 * Filter for seeding attribute
 */
export class SeedingFilter extends Filter {
  constructor(id, label) {
    super(id, label, Object.assign({}, cst.MONTHS));
  }

  prepare() {
    if (this.getValue() == 0) {
      return null;
    }
    return `semisext=${this.getValue()}`;
  }

  filter(plant) {
    if (this.getValue() == 0) {
      return true;
    }
    if (plant.semisext.getValue() == null ) {
      return false;
    }
    return plant.semisext.getValue() == this.getValue();
  }
}


/*
 * Filter for pruning attribute
 */
export class PruningFilter extends Filter {
  constructor(id, label) {
    super(id, label, Object.assign({}, cst.MONTHS));
  }

  prepare() {
    if (this.getValue() == 0) {
      return null;
    }
    return `moistaille=${this.getValue()}`;
  }

  filter(plant) {
    if (this.getValue() == 0) {
      return true;
    }
    if (plant.moistaille.getValue() == null ) {
      return false;
    }
    return plant.moistaille.getValue() == this.getValue();
  }
}


/*
 * Filter for harvest attribute
 */
export class HarvestFilter extends Filter {
  constructor(id, label) {
    super(id, label, Object.assign({}, cst.MONTHS));
  }

  prepare() {
    if (this.getValue() == 0) {
      return null;
    }
    return `recolte=${this.getValue()}`;
  }

  filter(plant) {
    if (this.getValue() == 0) {
      return true;
    }
    return plant.estMoisDeRecolte(this.getValue());
  }
}


/*
 * Filter for perennial attribute
 */
export class PerennialFilter extends Filter {
  constructor(id, label) {
    let choices = {};
    cst.VIVACE_TYPES.map((item, index) => { choices[index] = item })
    super(id, label, choices);
  }

  prepare() {
    if (this.getValue() == '0') {
      return null;
    }
    return `vivace=${this.getValue()}`;
  }

  filter(plant) {
    if (this.getValue() == '0') {
      return true;
    }
    return plant.vivace.getValue() == parseInt(this.getValue());
  }
}


/*
 * Filter for height attribute
 */
export class HeightFilter extends Filter {
  constructor(id, label) {
    super(id, label, cst.HEIGHTS);
  }

  prepare() {
    if (this.getValue() == '0') {
      return null;
    }
    return `hauteur=${this.getValue()}`;
  }

  filter(plant) {
    if (this.getValue() == '0') {
      return true;
    }
    if (plant.hauteur.getValue() === null) {
      return false;
    }
    const [min, max] = this.getValue().split('_');
    return parseInt(min) <= plant.hauteur.getValue() && plant.hauteur.getValue() <= parseInt(max);
  }
}


/*
 * Filter for sun attribute
 */
export class SunFilter extends Filter {
  constructor(id, label) {
    let choices = {};
    cst.SOLEIL_TYPES.map((item, index) => {
      choices[index] = item;
    })
    super(id, label, choices)
  }

  prepare() {
    if (this.getValue() == '0') {
      return null;
    }
    return `soleil=${this.getValue()}`;
  }

  filter(plant) {
    if (this.getValue() == '0') {
      return true;
    }
    return plant.soleil.getValue() == parseInt(this.getValue());
  }
}


/*
 * Filter for medical attribute
 */
export class MedicalFilter extends Filter {
  constructor(id, label) {
    let choices = {};
    cst.MEDICAL_TYPES.map((item, i) => {
      choices[i] = item;
    })
    super(id, label, choices)
  }

  prepare() {
    if (this.getValue() == '0') {
      return null;
    }
    return `usagemedic=${this.getValue()}`;
  }

  filter(plant) {
    if (this.getValue() == '0') {
      return true;
    }
    return (plant.usagemedic.getTextValue().indexOf(this.getLabelValue()) > -1)
  }
}


/*
 * Filter for usage attribute
 */
export class UsageFilter extends Filter {
  constructor(id, label) {
    let choices = {}
    cst.USAGE_TYPES.map((item, i) => {
      choices[i] = item;
    })
    super(id, label, choices)
  }

  prepare() {
    if (this.getValue() == 0) {
      return null;
    }
    return `utilisation=${this.getValue()}`;
  }

  filter(plant) {
    if (this.getValue() == '0') {
      return true;
    }
    return (plant.utilisation.getTextValue().indexOf(this.getLabelValue()) > -1)
  }
}

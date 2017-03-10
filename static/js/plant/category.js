import * as cst from '../constants';


/*
 * Encapsulates a category of attributes (identity, features, calendar...)
 * Manage rendering of the cells of table and fields of form
 */
class Category {
  constructor(id, name, color, attributes) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.attributes = attributes;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getColor() {
    return this.color;
  }
}


// CATEGORY IDENTITY
class IdentityCategory extends Category {
  constructor() {
    const attributes = ['famille', 'nom', 'genre', 'espece'];
    super('identity', 'Identité', '#EFEFEF', attributes);
  }
}


// CATEGORY FEATURES
class FeaturesCategory extends Category {
  constructor() {
    const attributes = ['type', 'vivace', 'vie', 'conservalimit'];
    super('features', 'Caractéristiques', '#54CEAD', attributes);
  }
}


// CATEGORY CALENDAR
class CalendarCategory extends Category {
  constructor() {
    const attributes = ['moistaille', 'moisflo', 'moisbourgeonfeuille', 'moispertefeuille', 'recolteDeb', 'recolteFin', 'semisint', 'semisext', 'semisabri'];
    super('calendar', 'Calendrier', '#3EF53E', attributes);
  }
}


// CATEGORY SOIL OCCUPATION
class SoilOccupationCategory extends Category {
  constructor() {
    const attributes = ['solriche', 'multi', 'racine'];
    super('soiloccupation', 'Occupation du sol', '#FFA500', attributes);
  }
}


// CATEGORY AREA
class AreaCategory extends Category {
  constructor() {
    const attributes = ['hauteur', 'largeur'];
    super('area', 'Envergure', '#F53E82', attributes);
  }
}


// CATEGORY SUN
class SunCategory extends Category {
  constructor() {
    const attributes = ['soleil', 'Tmin'];
    super('sun', 'Ensoleillement', '#54CEAD', attributes);
  }
}


// CATEGORY ASSOCIATION
class NeighbourCategory extends Category {
  constructor() {
    const attributes = ['associe', 'antiassocie'];
    super('neighbour', 'Compagnonage', '#71EAAE', attributes);
  }
}

// CATEGORY SOIL
class SoilCategory extends Category {
  constructor() {
    const attributes = ['eau', 'pH', 'rendement'];
    super('soil', 'Sol', '#E8ADAD', attributes);
  }
}


// CATEGORY USAGE
class UsageCategory extends Category {
  constructor() {
    const attributes = ['usagemedic', 'utiilisation']
    super('usage', 'Utilité', '#E0ADAD', attributes);
  }
}


// CATEGORY SEEDING
class SeedingCategory extends Category {
  constructor() {
    const attributes = ['drang', 'dligne', 'Tlevee', 'prof'];
    super('seeding', 'Semis', '#D8D5D5', attributes);
  }
}


// CATEGORY OTHER
class OtherCategory extends Category {
  constructor() {
    const attributes = ['commentaire', 'tpsconserv', 'tpslevee'];
    super('other', 'Autres', '#E0ADAD', attributes);
  }
}


// Export categories to be initialized
export const categories = {
  identity: new IdentityCategory(),
  features: new FeaturesCategory(),
  calendar: new CalendarCategory(),
  soiloccupation: new SoilOccupationCategory(),
  area: new AreaCategory(),
  sun: new SunCategory(),
  neighbour: new NeighbourCategory(),
  soil: new SoilCategory(),
  usage: new UsageCategory(),
  seeding: new SeedingCategory(),
  other: new OtherCategory()
};

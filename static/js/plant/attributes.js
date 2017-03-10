
/*
 * Encapsule un attribut de plante
 */
class Attribute {
  constructor(id, label, data, description) {
    this.id = id;
    this.label = label;
    this.data = data;
    this.description = description;
  }

  getId() {
    return this.id;
  }

  getType() {
    return null;
  }

  getValue() {
    return this.data;
  }

  getTextValue() {
    return this.data;
  }

  getLabel() {
    return this.label;
  }

  getDescription() {
    return this.description;
  }

  getImage() {
    return null;
  }

  equals(otherAttribute) {
    return this.getValue() === otherAttribute.getValue();
  }

}


/*
 * Attribut de plante de type texte
 */
class TextAttribute extends Attribute {
  constructor(id, label, data, description) {
    super(id, label, data, description);
  }

  getValue() {
    if (this.data === 'undefined' || this.data === '' || this.data === null) {
      return null;
    }
    return this.data;
  }

  getType() {
    return 'text';
  }
}


/*
 * Attribut de plante de type entier
 */
class IntAttribute extends Attribute {
  constructor(id, label, data, description, unit, acceptZero=false) {
    super(id, label, data, description);
    this.unit = unit;
    this.acceptZero = acceptZero;
  }

  getValue() {
    let validValue = (this.data !== 'undefined' && this.data !== '' && this.data !== null);
    validValue = validValue && (this.data != '0' || (this.data == '0' && this.acceptZero));
    return (validValue) ? parseInt(this.data) : null;
  }

  getType() {
    return 'number';
  }

  getLabel(showUnit) {
    const unit = (showUnit && this.unit !== 'undefined') ? `(${this.unit})` : '';
    return `${ this.label } ${unit}`;
  }

  getTextValue() {
    let text = this.getValue();
    if (text === null) {
      return null;
    }
    if (this.unit !== 'undefined') {
      text = text + ` ${this.unit}`
    }
    return text;
  }
}


/*
 * Attribut de plante de type choix unique
 */
class ChoiceAttribute extends Attribute {
  constructor(id, label, data, description, choices, imgChoices) {
    super(id, label, data, description);
    this.choices = choices;
    this.imgChoices = imgChoices;
  }

  getValue() {
    if (this.data === null || this.data === '' || this.data === '0' || this.data === 'undefined') {
      return null;
    }
    return parseInt(this.data);
  }

  getTextValue() {
    if (this.getValue() == null) {
      return null;
    }
  	return this.choices[this.data];
  }

  getImage() {
    if (this.getValue() == null) {
      return null;
    }
  	return this.imgChoices[this.data];
  }
}


/*
 * Attribut de plante de type choix multiple
 */
class ListAttribute extends Attribute {
  constructor(id, label, data, description, choices, imgChoices) {
    super(id, label, data, description);
    this.choices = choices;
    this.imgChoices = imgChoices;
  }

  getValue() {
    if (this.data === null || this.data === '') {
      return [];
    }
    return this.data.filter(val => val !== '').map(val => parseInt(val));
  }

  getTextValue() {
    const values = this.getValue();
    let result = values.filter(val => val !== '').map(val => {
      return (val in this.choices) ? this.choices[val] : '';
  	});
  	return result.filter(val => val !== '');
  }

  getImage() {
    const values = this.getValue();
    let result = values.filter(val => val !== '').map(val => {
      return (val in this.choices) ? this.imgChoices[val] : '';
  	});
  	return result.filter(val => val != '');
  }

  equals(otherAttribute) {
    return (this.findMissingItems(otherAttribute).length == 0)
        && (this.findAddedItems(otherAttribute).length == 0);
  }

  findMissingItems(otherAttribute) {
    const valuesSet = new Set(this.getTextValue());
    const otherValues = otherAttribute.getTextValue();
    return otherValues.filter(item => {
      return !valuesSet.has(item);
    });
  }

  findAddedItems(otherAttribute) {
    const values = this.getTextValue();
    const otherValuesSet = new Set(otherAttribute.getTextValue());
    return values.filter(item => {
      return !otherValuesSet.has(item);
    });
  }
}


// Attribute factory
export const createAttribute = (input) => {
  if (input.type === 'text') {
    return new TextAttribute(input.id, input.label, input.data, input.description);
  } else if (input.type === 'int') {
    return new IntAttribute(input.id, input.label, input.data, input.description, input.unit, input.acceptZero);
  } else if (input.type === 'choice') {
    return new ChoiceAttribute(input.id, input.label, input.data, input.description, input.choices, input.imgChoices);
  } else if (input.type === 'list') {
    return new ListAttribute(input.id, input.label, input.data, input.description, input.choices, input.imgChoices);
  } else {
    return null;
  }
};

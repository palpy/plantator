
/*
 * Encapsulates rendering of a plant attribute in cell of a table page
 */
class ViewCellAttribute {
  buildCellContent(attribute, cssClasses) {
    return '';
  }
  buildPopoverContent(attribute) {
    return '';
  }
}


/*
 * Attribute of type text
 */
class ViewTextAttribute extends ViewCellAttribute {
  buildCellContent(attribute, cssClasses, showImage) {
    cssClasses = (typeof(cssClasses) !== 'undefined') ? cssClasses : '';
    if (attribute.getValue() == null) {
      return '';
    }
    const textValue = attribute.getTextValue();
    return `<div title="${attribute.getLabel()} ${ textValue }" class="${cssClasses} ${attribute.getId()}">
              ${ (showImage) ? attribute.getImage() : textValue}
            </div>`;
  }

  buildPopoverContent(attribute) {
    if (attribute.getValue() == null) {
      return '';
    }
    return `<div><b>${ attribute.getLabel() }</b>: ${ attribute.getTextValue() }</div>`;
  }

}


/*
 * Attribute of type list
 */
class ViewListAttribute extends ViewCellAttribute {
  buildCellContent(attribute, cssClasses, showImage) {
    cssClasses = (typeof(cssClasses) !== 'undefined') ? cssClasses : '';
    const value = attribute.getValue();
    const textValue = attribute.getTextValue();
    if (value.length === 0) {
      return '';
    }
    return `<div title="${attribute.getLabel()} ${ textValue }" class="${cssClasses} ${attribute.getId()}">
              ${ (showImage) ? attribute.getImage() : textValue}
            </div>`;
  }

  buildPopoverContent(attribute) {
    const value = attribute.getValue();
    if (value.length == 0) {
      return '';
    }
    return `<div><b>${attribute.getLabel()}</b>: ${ attribute.getTextValue() }</div>`;
  }

}


// Export viewz to be initialized
export const views = {
  text: new ViewTextAttribute(),
  list: new ViewListAttribute()
};

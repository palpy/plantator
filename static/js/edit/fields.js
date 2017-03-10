
/*
 * Encapsulates a field of edition form
 */
class Field {
  render(attribute) {
    return '';
  }
  getValue(attribute) {
    return $(`#${attribute.getId()}`).val();
  }
  setValue(attribute) {
    $(`#${attribute.getId()}`).val(attribute.getValue());
  }
}


/*
 * Field of type text
 */
class TextField extends Field {
  render(attribute) {
    let value = attribute.getValue();
    return `<div class="form-group col-md-2">
              <label>${ attribute.getLabel(true) }</label>
              <input id="${ attribute.getId() }" class="form-control" type="${ attribute.getType() }"
                     name="${ attribute.getId() }" value="${ (value !== null) ? value : '' }"/>
            </div>`;
  }

}


/*
 * Field of type select
 */
class SelectField extends Field {
  render(attribute) {
    let options = [];
    let choices = Object.assign({}, attribute.choices);
    for (let idChoice in choices) {
      options.push(`<option value="${idChoice}">${choices[idChoice]}</option>`);
    }
    return `<div class="form-group col-md-2">
              <label>${ attribute.getLabel() }</label>
              <select id="${ attribute.getId() }" class="form-control">
                ${options.join('')}
              </select>
            </div>`;
  }
}


/*
 * Field of type checkbox
 */
class CheckboxField extends Field {
  render(attribute) {
    let options = [];
    let choices = Object.assign({}, attribute.choices);
    for (let idChoice in choices) {
      if (choices[idChoice] !== '') {
        options.push(`<div class="checkbox">
                        <label>
                          <input type="checkbox" value="${idChoice}"/>
                          <span>${choices[idChoice]}</span>
                        </label>
                      </div>`);
      }
    }
    // Detect chunks for displaying set of checkboxes on more columns than one
    const chunkSize = 10;
    const nbchunks = parseInt(options.length / chunkSize);
    let chunks = options.map((item, index) => {
      return index % chunkSize === 0 ? options.slice(index, index + chunkSize) : null;
    }).filter(item => item); // Trick to filter null values
    chunks = chunks.map(chunk => chunk.join(''));
    return `<div class="col-md-2" style="overflow:auto; height: 250px; width:200px">
              <label>${ attribute.getLabel() }</label>
              <div id=${ attribute.getId() }>
                ${chunks.join('')}
              </div>
            </div>`;
  }

  getValue(attribute) {
    let values = [];
    $(`#${attribute.getId()}`).find('input[type="checkbox"]:checked').each((index, checkbox) => {
      values.push($(checkbox).val());
    });
    return values;
  }

  setValue(attribute) {
    let values = attribute.getValue();
    $(`#${attribute.getId()}`).find('input[type="checkbox"]').each((index, checkbox) => {
      const valueCheckbox = parseInt($(checkbox).val());
      $(checkbox).attr('checked', values.indexOf(valueCheckbox) > -1);
    });
  }
}


// Export classes to be used for field rendering
export const fields = {
  text: new TextField(),
  select: new SelectField(),
  checkbox: new CheckboxField()
};

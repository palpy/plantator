import * as cst from '../constants';
import * as columns from './column';
import {PlantFactory} from '../plant/plant';


// Get, in node, text value of item having class selector attribute
const getTextValue = (node, classSelector, defaultValue) => {
  let value = defaultValue;
  $(node).each((index, item) => {
    if ($(item).hasClass(classSelector)) {
      value = $(item).text().trim().split(' ')[0];
    }
  });
  return value;
};


/*
 * Encapsulates plant table
 */
export class PlantTable {
  constructor(containerSelector, plantFactory) {
    this.idTable = containerSelector;
    this.plantFactory = plantFactory;
    this.filterArg = '';
    this.columns = [
      new columns.IdentityColumn(),
      new columns.FeaturesColumn(),
      new columns.CalendarColumn(),
      new columns.SoilOccupationColumn(),
      new columns.AreaColumn(),
      new columns.SunColumn(),
      new columns.NeighbourColumn(),
      new columns.SoilColumn(),
      new columns.UsageColumn(),
      new columns.SeedingColumn(),
      new columns.OtherColumn()
    ];

    this.$table = $(`#${containerSelector}`);
    this.$table.empty();
    this.renderHeader();
    this.$table.append($('<tbody></tbody>'));

    // Initialize DataTable plugin on plants table
    this.datatable = this.$table.DataTable({
      retrieve: true,
  		language: {
  			processing:     "Traitement en cours...",
  			search:         "Rechercher :",
  			lengthMenu:    "Afficher _MENU_ &eacute;l&eacute;ments",
  			info:           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
  			infoEmpty:      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
  			infoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
  			infoPostFix:    "",
  			loadingRecords: "Chargement en cours...",
  			zeroRecords:    "Aucun &eacute;l&eacute;ment &agrave; afficher",
  			emptyTable:     "Aucune donnée disponible dans le tableau",
  			paginate: {
  				first:      "Premier",
  				previous:   "Précédent",
  				next:       "Suivant",
  				last:       "Dernier"
  			},
  			aria: {
  				sortAscending:  ": activer pour trier la colonne par ordre croissant",
  				sortDescending: ": activer pour trier la colonne par ordre décroissant"
  			}
  		},
  		aLengthMenu: [
  			[10, 25, 50, 100, -1],
  			[10, 25, 50, 100, "Tous"]
  		],
  		iDisplayLength: 10,
  		oTableTools: {
  			oSelectorOpts: { filter: 'applied'},
  			sRowSelect: "single"
  		},
  		aoColumns: [
  			{
          bSortable: true,
          sType: "identity",
          bSearchable: true
        },
  			{
          bSortable: false,
          bSearchable: true
        },
        {
          bSortable: false,
          bSearchable: false
        },
        {
          bSortable: false,
          bSearchable: true
        },
        {
          bSortable: false,
          sType: "height",
          bSearchable: true
        },
        {
          bSortable: false,
          sType: "temperature",
          bSearchable: true
        },
        {
          bSortable: false,
          bSearchable: true
        },
        {
          bSortable: false,
          bSearchable: true
        },
        {
          bSortable: false,
          bSearchable: true
        },
        {
          bSortable: false,
          bSearchable: true
        },
        {
          bSortable: false,
          bSearchable: true
        },
  		],
      paging: true,
      processing: true,
      serverSide: true,
      ajax: (data, callback, settings) => {
        $.ajax({
          url: `${cst.URL_QUERY_PLANTS}?${this.filterArg}`,
          data: data,
          success: (result) => {
            result = JSON.parse(result);
            this.renderRows(callback, result);
          }
        });
      },
  	});

  	$('.dataTables_filter').css({
  		'float': 'left',
  		'text-align': 'left'
  	});
  	$('.dataTables_length').css({
  		'float': 'right',
  		'text-align': 'right'
  	});

  	// Toggle columns
    let that = this;
  	$('a.toggle-column').on( 'click', function (e) {
      e.preventDefault();

      // Get the column API object
      let column = that.datatable.column( $(this).attr('data-column') );

      // Toggle the visibility
      column.visible( ! column.visible() );

      (column.visible()) ? $(this).removeClass('column-hidden') : $(this).addClass('column-hidden');
    });

    $('#columns > a[data-column="3"]').trigger('click');
    $('#columns > a[data-column="6"]').trigger('click');
    $('#columns > a[data-column="7"]').trigger('click');
    $('#columns > a[data-column="9"]').trigger('click');
    $('#columns > a[data-column="10"]').trigger('click');

  }

  /* Render header of table */
  renderHeader() {
    let $thead = $('<thead></thead>').appendTo(this.$table);
    let $tr = $('<tr></tr>').appendTo($thead);
    for (let column of this.columns) {
      $tr.append(`<th>${ column.getName() }</th>`);
    }
  }

  /*
    Render rows of the table from data collected on server
    callback is a datatable function we need to call to render items
  */
  renderRows(callback, result) {
    let plants = [];
    for (const id in result.data) {
      plants.push(this.plantFactory.buildModifiedPlant(result.data[id]));
    }

    let objects = plants.map(plant =>
      this.columns.map(column => column.renderCell(plant))
    );
    callback(Object.assign({}, result, {data:objects}));

    if (plants.length === 0) {
      return;
    }

    // Set temporary all columns visible to be reached by jquery and set popover
    const hiddenColumns = this.getHiddenColumns();
    hiddenColumns.map(column => column.visible(true));
    this.$table.find('tr').each((indexRow, tr) => {
      $(tr).find('td').each((indexCell, td) => {
        const plant = plants[indexRow-1];
        this.columns[indexCell].renderPopover(td, plant);
      });
    });
    hiddenColumns.map(column => column.visible(false));
  }

  /* Refresh table by triggering a server request*/
  refresh(filterArg) {
    this.filterArg = filterArg;
    this.$table.DataTable().ajax.reload();
  }

  /* Get columns currently hidden on the table */
  getHiddenColumns() {
    let columns = [];
    let that = this;
    $('a.toggle-column').each((index, link) => {
      columns.push(this.datatable.column( $(link).attr('data-column') ));
    });
    return columns.filter(column => !column.visible());
  }
}

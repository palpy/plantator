import $ from 'jquery';
import jQueryUI from 'jquery-ui';
import dt from 'datatables.net';

import * as cst from '../constants';
import * as utils from '../utils';
import * as filter from '../table/filter';
import {PlantFactory} from '../plant/plant';
import {PlantTable} from '../table/table';


// Build filters for plants
const buildFilters = () => {
  let filters = new filter.FilterSet();
  filters.addFilter(new filter.SeedingFilter('seeding', 'Semis'));
  filters.addFilter(new filter.PruningFilter('pruning', 'Taille'));
  filters.addFilter(new filter.HarvestFilter('harvest', 'Récolte'));
  filters.addFilter(new filter.PerennialFilter('perennial', 'Vivace?'));
  filters.addFilter(new filter.HeightFilter('height', 'Hauteur'));
  filters.addFilter(new filter.SunFilter('sun', 'Ensoleillement'));
  filters.addFilter(new filter.MedicalFilter('medical', 'Medicinal'));
  filters.addFilter(new filter.UsageFilter('usage', 'Utilisations'));
  return filters;
};


// on document ready
$(() => {
  utils.getPlantsFromDb(allPlants => {
    const factory = new PlantFactory(allPlants);
    let plantTable = new PlantTable('table-plants', factory);

    let filters = buildFilters();
    // on filter button validation, execute rendering callback with result filtered
    filters.render($('#filters'), filterArg => {
      plantTable.refresh(filterArg);
    });
  });
});

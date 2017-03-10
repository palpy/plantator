import * as nitrogen from './nitrogen';
import * as perennial from './perennial';
import * as harvest from './harvest';
import * as neighbour from './neighbour';
import * as families from './families';
import * as height from './height';

export const NITROGEN_ID = nitrogen.RULE_ID;
export const PERENNIAL_ID = perennial.RULE_ID;
export const HARVEST_ID = harvest.RULE_ID;
export const NEIGHBOUR_ID = neighbour.RULE_ID;
export const FAMILIES_ID = families.RULE_ID;
export const HEIGHT_ID = height.RULE_ID;


const rules = {};
rules[NITROGEN_ID] = new nitrogen.NitrogenRule();
rules[PERENNIAL_ID] = new perennial.PerennialRule();
rules[HARVEST_ID] = new harvest.HarvestRule();
rules[NEIGHBOUR_ID] = new neighbour.NeighbourRule();
rules[FAMILIES_ID] = new families.FamiliesRule();
rules[HEIGHT_ID] = new height.HeightRule();


export const PLANTATOR_SCORE_RULES = rules;

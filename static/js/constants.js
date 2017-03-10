
const URL_SCRIPTS = "./server/";

export const URL_QUERY_PLANTS = `${URL_SCRIPTS}queryplants.php`;
export const URL_PLANTS = `${URL_SCRIPTS}p_recupdata.php`;
export const URL_PLANT_INSERT_TEMP = `${URL_SCRIPTS}p_insertemp.php`;
export const URL_PLANTS_MODERATE = `${URL_SCRIPTS}p_recuptemp.php`;
export const URL_PLANTS_CANCEL = `${URL_SCRIPTS}p_efftemp.php`;
export const URL_PLANT_INSERT = `${URL_SCRIPTS}p_insertdata.php`;
export const URL_PLANT_EDIT = `${URL_SCRIPTS}p_editdata.php`;
export const URL_GARDEN = `${URL_SCRIPTS}garden.php`;

export const URL_PLANTATOR = "index.html";
export const URL_PLANTATOR_EDIT = "edit.html";

export const URL_IMAGES = 'static/img/plants';
export const DEFAULT_PLANT_IMAGE = 'default.png';

export const PLANTS_IMAGES = {
  1: 'ail.png',
  6: 'avoine.png',
  14: 'carotte.png',
  95: 'radis.png'
};

export const MONTHS = [
	'',
	'Janvier',
	'Février',
	'Mars',
	'Avril',
	'Mai',
	'Juin',
	'Juillet',
	'Août',
	'Septembre',
	'Octobre',
	'Novembre',
	'Décembre'
];
export const MONTHS_LETTERS = ' JFMAMJJASOND';
export const MONTHS_CLASSES = ['', 'hiver', 'hiver', '', 'ptps', 'ptps', '', 'ete', 'ete', '', 'automn', 'automn', ''];

export const VIVACE_TYPES = [
	'',
	'annuelle',
	'vivace'
];
export const COMESTIBLE_TYPES = [
	'',
	'feuille',
	'fruit',
	'fleur',
	'racine',
	'tige/sève'
];
export const COMESTIBLE_IMAGES = [
	'',
	'&#xf06c;',
	'&#xf094;',
	'&#xf1e9;',
	'&radic;',
	'I'
];
export const MULTI_TYPES = [
	'',
	'bouture',
	'division',
	'greffe',
	'marcottage',
	'rejet',
	'semis',
	'semis spontané'
];
export const EAU_TYPES = [
	'',
	'sableux/léger',
	'équilibré',
	'argileux/lourd',
	'plante aquatique'
];
export const MEDICAL_TYPES = [
	'',
	'Anesthésiant',
	'Antiseptique',
	'Anti-inflammatoire',
	'Astringent',
	'Cœur et vaisseaux',
	'Coupe-faim',
	'Dermatologie',
	'Digestion',
	'Diététique',
	'Diurétique',
	'Insomnie',
	'Lactation',
	'Œdème',
	'Parasites',
	'Poumons',
	'Sédatif',
	'Sclérose',
	'Vulnéraire',
	'Febrifuge'
];
export const USAGE_TYPES = [
	'',
	'bois de chauffe',
	'bois d\'oeuvre',
	'construction',
	'couverture hiver',
	'engrais',
	'fixateur d\'azote',
	'insecticide',
	'paillage',
	'refuge animal',
	'vannerie/textile',
	'parfum',
	'brise-vent',
	'fourrage',
	'épuration',
	'anti-erosion',
	'structure du sol +',
	'haie défensive',
	'ornemental',
	'pionnier',
	'anti-insecte',
	'anti-mamifère',
	'antifongique',
	'anti-concurrence',
	'mellifère',
	'aromatique'
];
export const SOLEIL_TYPES = ['', 'important','moyen','faible'];
export const SOLEIL_IMAGES = ['', '&#xf185;','&#xf185;/&#xf0c2;','&#xf0c2;'];
export const SOL_TYPES = ['', 'faibles', 'moyens', 'élevés'];
export const SOL_IMAGES = ['', '&#xf006;','&#xf123;','&#xf005;'];
export const RACINE_TYPES = ['', 'pivotante', 'traçante', 'fasciculée'];
export const PH_TYPES = ['', 'acide', 'neutre', 'basique'];

export const HEIGHTS = {
  '0': '',
  '1_30':'couvre-sol',
  '31_150':'petite plante',
  '151_300':'arbuste',
  '301_10000':'arbre'
};

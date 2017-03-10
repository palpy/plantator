import * as rules from './scoring/rules/mapper';
import * as actions from './actions';

/*
 * Encapsulates all modals (except help modal) used on garden app
 */
export class GardenModal {
  constructor(rootSelector, actionDispatcher) {
    this.rootSelector = rootSelector;
    this.actionDispatcher = actionDispatcher;
    this.actionDispatcher.register('modalGardenCreator', actions.MODAL_GARDEN_CREATOR, () => this.renderGardenCreator());
    this.actionDispatcher.register('modalLoadError', actions.MODAL_LOAD_ERROR, () => this.renderLoadError());
    this.actionDispatcher.register('modalSaveRequest', actions.MODAL_SAVE_REQUEST, () => this.renderSaveRequest());
    this.actionDispatcher.register('modalSaveResponse', actions.MODAL_SAVE_RESPONSE, (response) => this.renderSaveResponse(response));
    this.actionDispatcher.register('modalScoreRules', actions.MODAL_SCORE_RULES, () => this.renderScoreRules());
    this.actionDispatcher.register('modalHelpToolbar', actions.MODAL_HELP_TOOLBAR, () => this.renderHelpToolbar());
    this.actionDispatcher.register('modalHelpSelection', actions.MODAL_HELP_SELECTION, () => this.renderHelpSelection());
  }

  renderTitle(content) {
    $(`#${this.rootSelector}`).find('.modal-title').empty().append(content);
  }

  renderBody(content) {
    $(`#${this.rootSelector}`).find('.modal-body').empty().append(content);
  }

  renderFooter(content) {
    $(`#${this.rootSelector}`).find('.modal-footer').empty().append(content);
  }

  show() {
    $(`#${this.rootSelector}`).modal('show');
  }

  hide() {
    $(`#${this.rootSelector}`).modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

  /* Render message when error loading */
  renderGardenCreator() {
    this.renderTitle(`Création du potager`);
    this.renderBody(`
      <p>Commencez par délimiter une taille pour votre potager. Pour le moment, vous pouvez utiliser des valeurs entre 5 et 20 (en mètres).</p>
      <p>Après validation, votre grille apparaîtra, et sera découpé en carrés de 1 mètre sur 1 mètre.</p>
      <p>Si vous désirez créer un potager plus petit, choisissez la taille minimum (5x5) et concentrez-vous sur une petite partie de la grille.</p>
      <div class="form-horizontal" style="margin-top:20px">
        <div class="form-group">
          <label class="control-label col-md-4">Largeur (en mètres)</label>
          <div class="col-md-3">
            <input class="form-control" type="number" name="width" value="" min=5 max=20 />
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-md-4">Longueur (en mètres)</label>
          <div class="col-md-3">
            <input class="form-control" type="number" name="length" value="" min=5 max=20 />
          </div>
        </div>
      </div>
      <div class="error-message"></div>
    `);
    this.renderFooter(`
      <div class="text-center">
        <button type="button" class="btn btn-default btn-lg">Créer</button>
      </div>
    `);
    this.show();
    let that = this;
    $(`#${that.rootSelector}`).find('.modal-footer button').on('click', (event) => {
      const width = parseInt($(`#${that.rootSelector}`).find('input[name="width"]').val());
      const length = parseInt($(`#${that.rootSelector}`).find('input[name="length"]').val());

      // Check that values are allowed
      const correctWidth = (Number(width) === width) && (width % 1 === 0) && (Number(width) >= 3) && (Number(width) <= 20);
      const correctLength = (Number(length) === length) && (length % 1 === 0) && (Number(length) >= 3) && (Number(length) <= 20);

      // If correct, we activate all features and we generate garden, else we display error
      if (correctWidth && correctLength) {
        that.hide();
        that.actionDispatcher.dispatch({type: actions.ACTIVATE_FEATURES});
        that.actionDispatcher.dispatch({type: actions.GENERATE_GARDEN, data: {
          width: width,
          length: length
        }});
      } else {
        event.preventDefault();
        $(`#${this.rootSelector}`).find('.error-message').empty().append(`
          La largeur ou la longueur a une valeur incorrecte.
        `);
      }
    });
  }

  /* Render message when error loading */
  renderLoadError() {
    this.renderTitle(`Erreur de chargement`);
    this.renderBody(`
      <p>Votre potager n'a pas pu être chargé. Avez-vous saisi le bon identifiant ? </p>
      <p>Si le problème persiste, contactez l'administrateur du site via le lien Contact en bas de page</p>
      <br/>
      <p>L'équipe du Plantator</p>
    `);
    this.renderFooter(`
      <button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>
    `);
    this.show();
  }

  /* Render form to save a garden first time */
  renderSaveRequest() {
    this.renderTitle(`Enregistrement du potager`);
    this.renderBody(`
      <p>Choisissez un nom pour votre potager et souvenez-vous en. Ce nom vous permettra de retrouver votre potager lors de vos futures visites, dans l'état où vous l'aurez laissé.</p>
      <p>Le nom doit contenir entre 5 et 50 caractères.</p>
      <p>Attention : votre potager expirera un mois après la date de dernière édition.</p>
      <div class="form-horizontal">
        <div class="form-group">
          <label class="control-label col-md-1">Nom</label>
          <div class="col-md-9">
            <input class="form-control" type="text" name="id" value=""/>
          </div>
        </div>
      </div>
      <div><span class="error-message"></span></div>
    `);
    this.renderFooter(`
      <button type="button" class="btn btn-default" data-dismiss="modal">Enregistrer</button>
    `);
    this.show();
    let that = this;
    $(`#${that.rootSelector}`).find('.modal-footer button').on('click', (event) => {
      // On footer button, get id typed and start save process
      const idTyped = $(`#${that.rootSelector}`).find('input[name="id"]').val();
      that.hide();
      that.actionDispatcher.dispatch({type: actions.PREPARE_SAVE, data: {
        id: idTyped,
      }});
    });
  }

  /* Render confirmation or error on saving */
  renderSaveResponse(response) {
    const title = (response.status === true) ? 'Potager enregistré' : 'Enregistrement interrompu';
    this.renderTitle(title);
    const content = (response.status === true)
      ? `Votre potager a bien été enregistré. Il est désormais accessible via l'url visible dans le panneau d'état.`
      : `Votre potager n'a pas pu être enregistré pour la raison suivante : <br/>${response.error}`;
    this.renderBody(content);
    this.renderFooter(`
      <button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>
    `);
    this.show();
    let that = this;
    $(`#${that.rootSelector}`).find('.modal-footer button').on('click', (event) => {
      that.hide();
    });
  }

  /* Render list of rules for score engine */
  renderScoreRules() {
    this.renderTitle(`Règles d'évaluation`);
    let ruleContent = [];
    for (const id in rules.PLANTATOR_SCORE_RULES) {
      const rule = rules.PLANTATOR_SCORE_RULES[id];
      ruleContent.push(`
        <li>
          ${rule.getDescription()}
        </li>
      `);
    }
    this.renderBody(`
      <p>Cliquez sur le bouton "Evaluer" pour savoir si vous avez fait des choix de plantation pertinents, selon les données connues de Plantator sur les diférentes plantes.</p>
      <p>Plusieurs critères sont évalués, et des conseils vous sont donnés, le cas échéant, pour mettre en place un potager prolifique.</p>
      <p>Voici les différents critères évalués sur votre potager :</p>
      <ul>
        ${ruleContent.join(' ')}
      </ul>
    `);
    this.renderFooter(`
      <button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>
    `);
    this.show();
    let that = this;
    $(`#${that.rootSelector}`).find('.modal-footer button').on('click', (event) => {
      that.hide();
    });
  }

  /* Render help about toolbar and grid */
  renderHelpToolbar() {
    this.renderTitle(`Barre d'outils`);
    this.renderBody(`
      <p>Ci-dessous sont expliquées les fonctionnalités de la barre d'outils.</p>
      <h4>Zones</h4>
      <p>Cliquez sur un bouton zone pour afficher l'information associée pour chaque plante.
         Si l'information n'est pas connue, la zone ne s'affiche pas pour la plante.
      </p>
      <ul class="explanation-icons">
        <!--<li>
          <img width="20px" height="20px" src="static/img/none.png"/>
          Masquer la zone affichée
        </li>
        <li>
          <img width="20px" height="20px" src="static/img/seeding.png"/>
          Affiche l'envergure nécessaire à la plante pour la bonne poussée du semis
        </li>-->
        <li>
          <img width="20px" height="20px" src="static/img/size.png"/>
          Affiche l'envergure nécessaire à la plante pour grandir de manière optimale
        </li>
        <li>
          <img width="20px" height="20px" src="static/img/height.png"/>
          Affiche la zone d'ombre produite par la plante une fois qu'elle a atteint sa taille maximale.
          Attention : on considère le soleil au sud du potager (en-dessous de la grille), et la taille calculée de l'ombre est une valeur indicative, et non une représentation réelle
        </li>
        <li>
          <img width="20px" height="20px" src="static/img/sun.png"/>
          Affiche l'ensoleillement nécessaire. Plus le cercle de couleur autour de la plante est clair, plus la plante a besoin de soleil pour grandir.
        </li>
      </ul>
      <h4>Mois</h4>
      <p>Faites glisser le curseur pour afficher le traitement à appliquer à chaque plante suivant le mois choisi.</p>
      <ul class="explanation-icons">
        <li>
          <img width="20px" height="20px" src="static/img/rcolte.png"/>
          Mois de récolte de la partie comestible de la plante
        </li>
        <li>
          <img width="20px" height="20px" src="static/img/semiext.png"/>
          Mois pendant lequel on peut semer la plante en extérieur
        </li>
      </ul>
      <h4>Suppression</h4>
      <ul class="explanation-icons">
        <li>
          <img width="20px" height="20px" src="static/img/poubelle.png"/>
          Retire la plante sélectionnée du potager
        </li>
      </ul>
    `);
    this.renderFooter(`
      <button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>
    `);
    this.show();
    let that = this;
    $(`#${that.rootSelector}`).find('.modal-footer button').on('click', (event) => {
      that.hide();
    });
  }

  /* Render help about plant selection */
  renderHelpSelection() {
    this.renderTitle(`Sélection de la plante`);
    this.renderBody(`
      <p>Pour sélectionner une plante, choisissez dans la liste déroulante du panneau de gauche.
         Vous pouvez également saisir les premières lettres de la plante, et seules les entrées correspondantes à ce nom apparaîtront.

      </p>
      <p>Une fois une plante choisie, déplacez l'image de la plante sur la grille pour placer cette-ci où vous le souhaitez.</p>
    `);
    this.renderFooter(`
      <button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>
    `);
    this.show();
    let that = this;
    $(`#${that.rootSelector}`).find('.modal-footer button').on('click', (event) => {
      that.hide();
    });
  }

}

import * as actions from './actions';


/*
 * Handle score panel
 */
export class ScoreView {
  constructor(rootSelector, actionDispatcher) {
    this.rootSelector = rootSelector;
    this.actionDispatcher = actionDispatcher;
    this.actionDispatcher.register('activateScore', actions.ACTIVATE_FEATURES, () => this.activate());
    this.actionDispatcher.register('buildFeatureScore', actions.BUILD_FEATURES, () => this.build());
  }

  activate() {
    this.actionDispatcher.unregister('activateScore');
    $(`#${this.rootSelector}`).empty().append(`
      <div class="panel panel-default">
        <div class="panel-title">
          <div class="text-center">
            <button type="button" class="btn btn-default" title="Activer l'évaluation de score">
              Score
            </button>
          </div>
        </div>
      </div>
    `);
    const that = this;
    $(`#${this.rootSelector} button`).on('click', (event) => {
      $(this).off('click');
      that.build();
    });
  }

  build() {
    this.actionDispatcher.unregister('activateScore');
    this.actionDispatcher.unregister('buildFeatureScore');
    $(`#${this.rootSelector}`).empty().append(`
      <div class="panel panel-default">
        <div class="panel-title">
          <span>
            Score ( <a href="#" title="Liste des règles d'évaluation">
              <img height="15px" src="static/img/help.png"/>
            </a> )
          </span>
          <div class="pull-right">
            <button id="scoreButton" class="btn btn-default btn-xs" title="Evaluation du potager">Evaluer</button>
          </div>
        </div>
        <div class="panel-body">
          <div id="scoreResult"></div>
        </div>
      </div>
    `);
    let that = this;
    $(`#scoreButton`).on('click', (event) => {
      that.actionDispatcher.dispatch({type: actions.PREPARE_SCORE});
    });
    $(`#${this.rootSelector} .panel-title a`).on('click', (event) => {
      that.actionDispatcher.dispatch({type: actions.MODAL_SCORE_RULES});
    });
    this.actionDispatcher.register('showScoreResult', actions.SHOW_SCORE_RESULT, (data) => this.showResult(data));
  }

  showResult(result) {
    $(`#scoreResult`).empty();

    const globalScore = result.map(line => line.score).reduce((a, b) => a + b, 0);
    $(`#scoreResult`).append(`
      <div class="score-global">
        <span>Total obtenu</span> : <span>${globalScore}</span>
      </div>
    `);

    const goodLines = result.filter(line => line.score > 0);
    const badLines = result.filter(line => line.score <= 0);

    $(`#scoreResult`).append(`
      <h6>Points forts</h6>
      <div class="score-plus"></div>
      <h6>Points à améliorer</h6>
      <div class="score-minus"></div>
    `);
    this.showResultLines($(`#scoreResult`).find('.score-plus'), goodLines, '#009900');
    this.showResultLines($(`#scoreResult`).find('.score-minus'), badLines, '#cc0000');

    $('#scoreResult [data-toggle="popover"]').popover();
  }

  generateLineContent(line, index) {
    const isGood = (line.score > 0);
    const score = isGood  ? `+${line.score}` : line.score;
    const cssClass = isGood  ? `good` : `bad`;
    const adviceContent = (isGood) ? '' : `
      <p>Conseil :</p>
      <p>${line.recommendation}</p>
    `;
    const popoverContent = `
      <div class='score-line'>
        <p>Détail :</p>
        <p>${line.description}</p>
        ${adviceContent}
      </div>
    `;
    const lineContent = `
      <div>
        <a tabindex="${index}" href="#" class="${cssClass}" title="${line.label}" data-container="body"
           data-toggle="popover" data-html="true" data-placement="top" data-trigger="focus"
           data-content="${popoverContent}">
          ${line.label} (${score})
        </a>
      </div>`;
    return lineContent;
  }

  showResultLines($container, resultLines, circlePlantColor) {
    if (resultLines.length === 0) {
      $container.append(`<div>Aucun</div>`);
      return;
    }
    const that = this;
    resultLines.map((line, index) => {
      const lineContent = that.generateLineContent(line, index);
      let $line = $(lineContent).appendTo($container);
      $line.on('mouseover', (event) => {
        that.actionDispatcher.dispatch({
          type: actions.SHOW_SCORE_PLANTS,
          data: {
            plants: line.plants,
            circlePlantColor: circlePlantColor
          }
        });
      });
      $line.on('mouseout', (event) => {
        that.actionDispatcher.dispatch({
          type: actions.HIDE_SCORE_PLANTS,
          data: {
            plants: line.plants
          }
        });
      });
    });
  }

}

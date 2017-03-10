import * as rules from './rules/mapper';
import * as actions from '../actions';


export class ScoreEngine {
  constructor(actionDispatcher) {
    this.rules = rules.PLANTATOR_SCORE_RULES;
    this.actionDispatcher = actionDispatcher;
    this.actionDispatcher.register('score', actions.SCORE, (data) => this.evaluate(data.input));
  }

  evaluate(input) {
    let result = [];
    for (const id in this.rules) {
      result.push(...this.rules[id].evaluate(input));
    }
    result = this.formatResult(result);
    this.actionDispatcher.dispatch({type: actions.SHOW_SCORE_RESULT, data: result});
  }

  formatResult(result) {
    let details = [];
    result.map(line => {
      const rule = line.getRule();
      details.push({
        score: line.score,
        label: rule.getLabel(line),
        description: rule.getDetail(line),
        recommendation: rule.getRecommendation(line),
        plants: line.getPlants()
      });
    });
    return details;
  }
}

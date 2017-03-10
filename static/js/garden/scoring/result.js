import * as rules from './rules/mapper';


export class ScoreItemResult {
  constructor(ruleId, score, plants=[], customData={}) {
    this.ruleId = ruleId;
    this.score = score;
    this.plants = plants;
    this.customData = customData;
  }

  getRuleId() {
    return this.ruleId;
  }

  getRule() {
    return rules.PLANTATOR_SCORE_RULES[this.ruleId];
  }

  getScore() {
    return this.score;
  }

  getPlants() {
    return this.plants;
  }

  getCustomData() {
    return this.customData;
  }
}

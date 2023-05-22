export const GODS = {};

/**
 * The set of Ability Scores used within the sytem.
 * @type {Object}
 */

GODS.SkillLevels = {
  1:{ "label":"GODS.skill_level.beginner", "dicePool":1, "reroll":0},
  2:{ "label":"GODS.skill_level.proficient", "dicePool":1, "reroll":1},
  3:{ "label":"GODS.skill_level.expert", "dicePool":2, "reroll":1},
  4:{ "label":"GODS.skill_level.master", "dicePool":2, "reroll":2},
  5:{ "label":"GODS.skill_level.legend", "dicePool":3, "reroll":2},
}

GODS.GodsNumbers = {
  1:{ "label":"GODS.totems.human", "key":"human"},
  2:{ "label":"GODS.totems.scavenger", "key":"scavenger"},
  3:{ "label":"GODS.totems.symbiote", "key":"symbiote"},
  4:{ "label":"GODS.totems.parasite", "key":"parasite"},
  5:{ "label":"GODS.totems.builder", "key":"builder"},
  6:{ "label":"GODS.totems.horde", "key":"horde"},
  7:{ "label":"GODS.totems.hive", "key":"hive"},
  8:{ "label":"GODS.totems.solitary", "key":"solitary"},
  9:{ "label":"GODS.totems.adapted", "key":"adapted"}
}


GODS.abilityCategories = {
  "physical": {
    "label":"GODS.ability_category.physical"
  },
  "manual": {
    "label":"GODS.ability_category.manual"
  },
  "mental": {
    "label":"GODS.ability_category.mental"
  },
  "social": {
    "label":"GODS.ability_category.social"
  }
}

GODS.skillCategories = {
  "man": {
    "label":"GODS.skill_category.man"
  },
  "animal": {
    "label":"GODS.skill_category.animal"
  },
  "tool": {
    "label":"GODS.skill_category.machine"
  },
  "weapon": {
    "label":"GODS.skill_category.weapon"
  },
  "survival": {
    "label":"GODS.skill_category.survival"
  },
  "world": {
    "label":"GODS.skill_category.earth"
  }
}
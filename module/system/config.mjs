export const TOTEM = {};

/**
 * The set of Ability Scores used within the sytem.
 * @type {Object}
 */


TOTEM.SkillLevels = {
  1:{ "label":"TOTEM.skill_level.beginner", "dicePool":1, "reroll":0},
  2:{ "label":"TOTEM.skill_level.proficient", "dicePool":1, "reroll":1},
  3:{ "label":"TOTEM.skill_level.expert", "dicePool":2, "reroll":1},
  4:{ "label":"TOTEM.skill_level.master", "dicePool":2, "reroll":2},
  5:{ "label":"TOTEM.skill_level.legend", "dicePool":3, "reroll":2},
}

TOTEM.TotemNumbers = {
  1:{ "label":"TOTEM.totems.human", "key":"human"},
  2:{ "label":"TOTEM.totems.scavenger", "key":"scavenger"},
  3:{ "label":"TOTEM.totems.symbiote", "key":"symbiote"},
  4:{ "label":"TOTEM.totems.parasite", "key":"parasite"},
  5:{ "label":"TOTEM.totems.builder", "key":"builder"},
  6:{ "label":"TOTEM.totems.horde", "key":"horde"},
  7:{ "label":"TOTEM.totems.hive", "key":"hive"},
  8:{ "label":"TOTEM.totems.solitary", "key":"solitary"},
  9:{ "label":"TOTEM.totems.adapted", "key":"adapted"}
}


TOTEM.abilityCategories = {
  "physical": {
    "label":"TOTEM.ability_category.physical"
  },
  "manual": {
    "label":"TOTEM.ability_category.manual"
  },
  "mental": {
    "label":"TOTEM.ability_category.mental"
  },
  "social": {
    "label":"TOTEM.ability_category.social"
  }
}

TOTEM.skillCategories = {
  "man": {
    "label":"TOTEM.skill_category.man"
  },
  "animal": {
    "label":"TOTEM.skill_category.animal"
  },
  "tool": {
    "label":"TOTEM.skill_category.machine"
  },
  "weapon": {
    "label":"TOTEM.skill_category.weapon"
  },
  "survival": {
    "label":"TOTEM.skill_category.survival"
  },
  "world": {
    "label":"TOTEM.skill_category.earth"
  }
}
export const TOTEM = {};

/**
 * The set of Ability Scores used within the sytem.
 * @type {Object}
 */


TOTEM.SkillLevels = {
  1:{ "label":"TOTEM.SkillLevel.beginner", "dicePool":1, "reroll":0},
  2:{ "label":"TOTEM.SkillLevel.proficient", "dicePool":1, "reroll":1},
  3:{ "label":"TOTEM.SkillLevel.expert", "dicePool":2, "reroll":1},
  4:{ "label":"TOTEM.SkillLevel.master", "dicePool":2, "reroll":2},
  5:{ "label":"TOTEM.SkillLevel.legend", "dicePool":3, "reroll":2},
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
    "label":"TOTEM.abilityCategory.physical"
  },
  "manual": {
    "label":"TOTEM.abilityCategory.manual"
  },
  "mental": {
    "label":"TOTEM.abilityCategory.mental"
  },
  "social": {
    "label":"TOTEM.abilityCategory.social"
  }
}

TOTEM.skillCategories = {
  "man": {
    "label":"TOTEM.skillCategory.man"
  },
  "animal": {
    "label":"TOTEM.skillCategory.animal"
  },
  "machine": {
    "label":"TOTEM.skillCategory.machine"
  },
  "weapon": {
    "label":"TOTEM.skillCategory.weapon"
  },
  "survival": {
    "label":"TOTEM.skillCategory.survival"
  },
  "earth": {
    "label":"TOTEM.skillCategory.earth"
  }
}
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
  5:{ "label":"GODS.skill_level.archmaster", "dicePool":3, "reroll":2},
  5:{ "label":"GODS.skill_level.legend", "dicePool":3, "reroll":3},
}

GODS.Instincts = {
  1:{ "key":"architect"},
  2:{ "key":"sword"},
  3:{ "key":"flail"},
  4:{ "key":"man"},
  5:{ "key":"keeper"},
  6:{ "key":"hand"},
  7:{ "key":"mask"},
  8:{ "key":"void"},
  9:{ "key":"bone"},
  0:{ "key":"traveller"}
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

GODS.sexes = {"male": "GODS.sexes.male", "female": "GODS.sexes.female"};

GODS.signs = {"wolf":"SIGNS.wolf.name","child": "SIGNS.child.name" ,
"tree": "SIGNS.tree.name" ,
"specter": "SIGNS.specter.name" ,
"whirlwind": "SIGNS.whirlwind.name" ,
"vulture": "SIGNS.vulture.name" ,
"ship": "SIGNS.ship.name" ,
"sword": "SIGNS.sword.name" ,
"cat": "SIGNS.cat.name" }

GODS.origins = {"aon":"Aon",
"avhorae": "Avhorae" ,
"babel": "Babel",
"soleil_noir": "Empire du Soleil Noir",
"fakhar": "Fakhar",
"horde": "Horde",
"khashan": "Khashan",
"ool": "Ool",
"shattered_kingdoms": "Royaumes divisés",
"saeth": "Saeth",
"tegee": "Tégée (Thalos)",
"tuuhle": "Tuuhle",
"vaelor": "Vaelor",
"valdheim": "Valdheim"
}

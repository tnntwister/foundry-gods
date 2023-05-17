import { registerHooks } from "./system/hooks.mjs";
import { registerSettings } from "./system/settings.mjs";

// Import document classes.
import { TotemActor } from "./documents/actor.mjs";
import { TotemCharacter } from "./documents/character.mjs";
import { TotemNpc } from "./documents/npc.mjs";
import { TotemCreature } from "./documents/creature.mjs";

import { TotemCharacterSheet } from "./sheets/character-sheet.mjs";
import { TotemNpcSheet } from "./sheets/npc-sheet.mjs";
import { TotemCreatureSheet } from "./sheets/creature-sheet.mjs";

import { TotemItem } from "./documents/item.mjs";
import { TotemItemSheet } from "./sheets/item-sheet.mjs";

// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates, registerHandlebarsHelpers } from "./system/handlebars-manager.mjs";
import { TOTEM } from "./system/config.mjs";

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', async function() {

  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  game.totem = {
    TotemCharacter,
    TotemNpc,
    TotemCreature,
    TotemItem,
    rollItemMacro
  };

  // Add custom constants for configuration.
  CONFIG.TOTEM = TOTEM;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d10 + @abilities.dex.mod",
    decimals: 2
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = TotemActor;
  CONFIG.Item.documentClass = TotemItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet('totem', TotemCharacterSheet, {
      types: ['character'],
      makeDefault: true,
    });

  Actors.registerSheet('totem', TotemNpcSheet, {
      types: ['npc'],
      makeDefault: true,
    });

  Actors.registerSheet('totem', TotemCreatureSheet, {
    types: ['creature'],
    makeDefault: true,
  }); // Register vehicle Sheet
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("totem", TotemItemSheet, { makeDefault: true });

  registerHandlebarsHelpers(); // Register Handlebars helpers
  registerHooks(); // register Hooks
  registerSettings(); // register Engrenages Settings

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

// If you need to add Handlebars helpers, here are a few useful examples:
Handlebars.registerHelper('concat', function() {
  var outStr = '';
  for (var arg in arguments) {
    if (typeof arguments[arg] != 'object') {
      outStr += arguments[arg];
    }
  }
  return outStr;
});

Handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
});

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once("ready", async function() {
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on("hotbarDrop", (bar, data, slot) => createItemMacro(data, slot));
});

/* -------------------------------------------- */
/*  Hotbar Macros                               */
/* -------------------------------------------- */

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createItemMacro(data, slot) {
  // First, determine if this is a valid owned item.
  if (data.type !== "Item") return;
  if (!data.uuid.includes('Actor.') && !data.uuid.includes('Token.')) {
    return ui.notifications.warn("You can only create macro buttons for owned Items");
  }
  // If it is, retrieve it based on the uuid.
  const item = await Item.fromDropData(data);

  // Create the macro command using the uuid.
  const command = `game.totem.rollItemMacro("${data.uuid}");`;
  let macro = game.macros.find(m => (m.name === item.name) && (m.command === command));
  if (!macro) {
    macro = await Macro.create({
      name: item.name,
      type: "script",
      img: item.img,
      command: command,
      flags: { "totem.itemMacro": true }
    });
  }
  game.user.assignHotbarMacro(macro, slot);
  return false;
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemUuid
 */
function rollItemMacro(itemUuid) {
  // Reconstruct the drop data so that we can load the item.
  const dropData = {
    type: 'Item',
    uuid: itemUuid
  };
  // Load the item from the uuid.
  Item.fromDropData(dropData).then(item => {
    // Determine if the item loaded and if it's an owned item.
    if (!item || !item.parent) {
      const itemName = item?.name ?? itemUuid;
      return ui.notifications.warn(`Could not find item ${itemName}. You may need to delete and recreate this macro.`);
    }

    // Trigger the item roll
    item.roll();
  });
}
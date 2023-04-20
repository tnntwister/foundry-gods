import { TotemFight } from './fight.mjs';

export const registerHooks = function () {
    /**
     * Ready hook loads tables, and override's foundry's entity link functions to provide extension to pseudo entities
     */

    Hooks.once("ready", async () => {
        console.info("Totem | System Initialized.");
    });

    // changement de la pause 
    Hooks.on("renderPause", async function () {
        if ($("#pause").attr("class") !== "paused") return;
        $(".paused img").attr("src", 'systems/totem/images/pause.webp');
        $(".paused img").css({ "opacity": 1});
        $("#pause.paused").css({ "display": "flex", "justify-content": "center" });
        $("#pause.paused figcaption").css({ "width": `256px`, "height": `256px` });
        $("#pause.paused figcaption").text(game.i18n.localize("TOTEM.PausedText"));
    });

    /*Hooks.on("renderPause", ((_app, html) => {
        html.find("img").attr("src", "systems/bol/ui/pause2.webp")
    }))

    Hooks.on('renderChatLog', (log, html, data) => BoLUtility.chatListeners(html))
    Hooks.on('renderChatMessage', (message, html, data) => BoLUtility.chatMessageHandler(message, html, data))
    */
    console.log("rendering hooks");
    Hooks.on('renderChatLog', (log, html, data) => TotemFight.chatListeners(html));
    Hooks.on('renderChatMessage', (message, html, data) => TotemFight.chatMessageHandler(message, html, data));

    /**
     * Create a macro when dropping an entity on the hotbar
     * Item      - open roll dialog for item
     * Actor     - open actor sheet
     * Journal   - open journal sheet
     */
    Hooks.on("hotbarDrop", async (bar, data, slot) => {
        // console.log(data.type);
        // Create item macro if rollable item - weapon, spell, prayer, trait, or skill

        return false;
    });

    Hooks.on('getSceneControlButtons', (controls) => {
        controls.find((c) => c.name === 'token').tools.push({
        name: 'Dice Roller',
        title: game.i18n.localize("TOTEM.RollTool"),
        icon: 'fas fa-dice-d6',
        button: true,
        onClick() {
            TotemRoll.ui();
        }
        });
    });

    /* -------------------------------------------- */
    /*  PreCreate Hooks                                */
    /* -------------------------------------------- */

    Hooks.on("preCreateActor", function (actor) {
        console.log('pre create actor', actor);
        if (actor.img == "icons/svg/mystery-man.svg") {
        // actor.updateSource({"img": `systems/totem/icons/actors/${actor.type}.webp`});
        // item.updateSource({"img": `systems/totem/icons/competence.webp`});
        }
    });
    
    Hooks.on("preCreateItem", function (item) {
        if (item.img == "icons/svg/item-bag.svg") {
        item.updateSource({"img": `systems/totem/icons/items/${item.type}.webp`});
        // item.updateSource({"img": `systems/totem/icons/competence.webp`});
        }
    });
    
    /* -------------------------------------------- */
    /*  Combat Hooks                                */
    /* -------------------------------------------- */

    /*
    Hooks.on("createCombatant", function (combatant) {
    if (game.user.isGM) {
        let actor = combatant.actor;

        console.log('create combatant', actor);
    }
    });*/

    Hooks.on("updateCombat", function () {
        if (game.user.isGM) {
        let combatant = (game.combat.combatant) ? game.combat.combatant.actor : "";
    
        console.log('update combat', game.combat);
    
        /*if (combatant.type == "marker" && combatant.system.settings.general.isCounter == true) {
            let step = (!combatant.system.settings.general.counting) ? -1 : combatant.system.settings.general.counting;
            let newQuantity = combatant.system.pools.quantity.value + step;
            combatant.update({"system.pools.quantity.value": newQuantity});
        }*/
        }
    });
  
    
}

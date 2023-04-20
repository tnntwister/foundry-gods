export const registerSettings = function () {
    game.settings.register("totem", "game-level", {
        name: game.i18n.localize("TOTEM.WorldSettings.GameLevel.Name"),
        hint: game.i18n.localize("TOTEM.WorldSettings.GameLevel.Hint"),
        scope: "system",
        config: true,
        type: String,
        choices: {
        "e": "Totem",
        "c": "Céphale",
        "b": "Bohème",
        "a": "Amertume"
        },
        default: 'e',
        onChange: value => {
        console.log(value);
        }
    });

    game.settings.register("totem", "granting_cephalie", {
        name: game.i18n.localize("TOTEM.WorldSettings.GrantingCephales.Label"),
        hint: game.i18n.localize("TOTEM.WorldSettings.GrantingCephales.Description"),
        scope: "system",
        config: true,
        type: Boolean,
        default: !1
    })

}  
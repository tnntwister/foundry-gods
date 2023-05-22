export const registerSettings = function () {
    game.settings.register("gods-system", "game-mode", {
        name: game.i18n.localize("GODS.WorldSettings.GameMode.Name"),
        hint: game.i18n.localize("GODS.WorldSettings.GameMode.Hint"),
        scope: "system",
        config: true,
        type: String,
        choices: {
        "1": "Survie",
        "2": "Cauchemar",
        "3": "Apocalypse"
        },
        default: 'e',
        onChange: value => {
        // console.log(value);
        }
    });
}  
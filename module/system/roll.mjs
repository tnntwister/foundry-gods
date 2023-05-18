export class TotemRoll {

    static roll(actorId, label, NoD, Reroll = 0, params = {}){        
        const actor = game.actors.get(actorId);
        let formula = '{' + NoD + "d10";
        if (Reroll > 0){
          formula += 'r' + Reroll;
        }
        formula += (params.difficulty != undefined) ? "}cs>" + params.difficulty : "}cs>7";
        let roll = new Roll(formula, actor.getRollData());
        roll.toMessage({
          speaker: ChatMessage.getSpeaker({ actor: actor }),
          flavor: label,
          rollMode: game.settings.get('core', 'rollMode'),
        });
        return roll;
    } 

}




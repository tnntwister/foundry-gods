import { getActorSkillScore, updateActorSkillScore } from "./functions.mjs";

export class TotemRoll {
  async performTest(dicePool, target, trait, usingSpecialization, difficulty, skill, params, actor) {
    const r = new Roll(dicePool + 'd6');
    r.roll();    
    let _trait = trait || 0;
    let _usingSpecialization = usingSpecialization || 0;
    let _skillLabel = (params.skill != undefined) ? game.i18n.format(params.skill) : "";
    let _used = (params.usure != undefined) ? params.usure : 0;
    let diceString = '';
    let total = 0;

    // affichage des valeurs
    let targetText = _skillLabel + ' : ' + skill + ' (+'+ _used +')';
    if (trait)
      targetText += ', '+ game.i18n.format('TOTEM.Traits') + ' : ' + _trait;
    if (_usingSpecialization != 0)
      targetText += ', '+ game.i18n.format('TOTEM.UsingSpecialization');
    if (difficulty)
      targetText += '<br />'+ game.i18n.format('TOTEM.Against') +': ' + Math.abs(difficulty);

    // affichage des jets   
    for (let i = 0; i < dicePool; i++) {
      let result = r.terms[0].results[i].result;
      if (result == 6) {
        diceString += '<li class="roll die d6 max">' + result + '</li>';
      }
      else if (result <= 5) {
        diceString += '<li class="roll die d6">' + result + '</li>';
      }
      else if (result >= 1) {
        diceString += '<li class="roll die d6 min">' + result + '</li>';
      }
      total += result;
    }
   
    // Here we want to check if the success was exactly one (as "1 Successes" doesn't make grammatical sense).
    // We create a string for the Successes.
    let successText = '';
    let successMargin = 0;

    successMargin = total + skill + _trait + _usingSpecialization + _used + difficulty;
    if (params.usure != undefined){
      successMargin += parseInt(params.usure,10);
    }

    // console.log(total, skill, _trait, _usingSpecialization, difficulty, successMargin);
    // règle de la MR qui ne peut pas dépasser la compétence
    if (successMargin > skill){
      successMargin = skill;
    }

    if (successMargin > target + 1) {
      successText =  game.i18n.localize('TOTEM.RollSuccess') + ' (' + game.i18n.localize('TOTEM.SM') + ' ' + successMargin.toString() +')';
    } else if (successMargin == target + 1) {
      successText = game.i18n.localize('TOTEM.RollSuccess');
    } else if (successMargin == target) {
      successText = game.i18n.localize('TOTEM.PartialSuccess');
    } else {
      successText = game.i18n.localize('TOTEM.Failure');
    }


    // Build a dynamic html using the variables from above.
    const html = `
            <div class="totem roll attribute">
                <div class="dice-roll">
                    <div class="dice-result">
                        <div class="dice-formula">
                            ` + dicePool + `d6
                        </div>
                        <div class="dice-tooltip expanded">
                            <section class="tooltip-part flexrow">
                              <div class="" style="flex:60%;">
                                <div class="parameters">
                                  ` + targetText + `
                                </div>
                                <div class="dice">
                                    <ol class="dice-rolls">` + diceString + `</ol>
                                </div>
                              </div>  
                              <div class="align-center">
                               Résultat
                               <p style="font-weight:bold; font-size:2em;">` + (total + skill + _trait + _usingSpecialization + _used).toString() + `</p>
                              </div>
                            </section>
                        </div>` +
                        `<h4 class="dice-total">` + successText + `</h4>
                    </div>
                </div>
            </div>
        `;

    // Check if the dice3d module exists (Dice So Nice). If it does, post a roll in that and then
    // send to chat after the roll has finished. If not just send to chat.
    if (game.dice3d) {
      game.dice3d.showForRoll(r).then((displayed) => {
        this.sendToChat(html, r, actor);
      });
    } else {
      this.sendToChat(html, r, actor);
    };
  }

  async sendToChat(content, roll, actor) {
    let conf = {
      user: game.user._id,
      content: content,
      roll: roll,
      sound: 'sounds/dice.wav'
    };
    if (actor)
      conf.speaker = ChatMessage.getSpeaker({ actor: actor });
    // Send's Chat Message to foundry, if items are missing they will appear as false or undefined and this not be rendered.
    ChatMessage.create(conf).then((msg) => {
      return msg;
    });
  }

  static instance = null;

  static get() {
    if (!TotemRoll.instance)
      TotemRoll.instance = new TotemRoll();
    return TotemRoll.instance;
  }

  // Parse XdYtZfAc || XdYsZfAc
  // {size of dice pool}d{target number}(t|s)[{skill level - for trait}f][{complication range}c][D]
  async parse(cmd, usingSpecialization) {
    let actor = game.user.character;
    if (canvas.tokens.controlled.length > 0)
      actor = canvas.tokens.controlled[0].actor;
    let r = cmd.match(/([2-5])d([01]?[0-9])[ts](([4-8])f)?((20|[1][5-9])c)?(D)?/);
    if (r) {
      //console.log(r);
      let dicePool = +r[1];
      let target = +r[2];
      let trait = +r[4];
      if (!!r[7]) usingSpecialization = true;
      let difficulty = +r[6];
      this.performTest(dicePool, target, trait, usingSpecialization, difficulty, actor);
    } else
      ui.notifications.error("Unparsable command: " + cmd);
  }

  // data injected to char data
  static previousValues = {
    dicePool: 2
  };

  static rollerTemplate = 'systems/totem/templates/roll.html';
  
  /**
   * main class function
   * @returns 
   */
  static async ui(externalData = {}) {
    let charData = (externalData) => {
      return Object.assign({ _template: TotemRoll.rollerTemplate }, {...TotemRoll.previousValues, ...externalData});
    };

    // get the actor
    let actor = null;

    try {
      let actor = game.user.character;
    
      if (canvas.tokens.controlled.length > 0)
        actor = canvas.tokens.controlled[0].actor;        
    } catch (e) {
      console.log(e);
    }

    if (actor == null && externalData.speakerId != undefined && externalData.speakerId != null){
      // on récupère le speakerId, et de là l'objet actor
      actor = game.actors.get(externalData.speakerId);      
    }

    // get the data
    let data = charData(externalData);    
    console.log('npc2', data);

    if (actor.type != undefined){
      data.actor_type = actor.type;
      if (actor.type == 'character'){
        data.skillMaxScore = getActorSkillScore(actor, data.skill);
        data.skillScore = data.skillMaxScore - getActorSkillScore(actor, data.skill, 'spent');
        data.skillSpent = getActorSkillScore(actor, data.skill, 'spent');
      } else if(actor.type == 'npc'){
        
        if (data.specialization == 1){
          //data.skillMaxScore = getActorSkillScore(actor, data.skill);
          // data.skillScore = data.skillMaxScore;
        } else {
          // compétence, il faut récupérer le score du skill type
          data.skillScore = data.value;
        }
      }
    }

    // render template    
    let html = await renderTemplate(data._template, data);

    let ui = new Dialog({
      title: game.i18n.localize("TOTEM.RollTool"),
      content: html,
      buttons: {
        roll: {
          label: game.i18n.localize('TOTEM.RollDice'),
          callback: (html) => {
            let form = html.find('#dice-pool-form');
            if (!form[0].checkValidity()) {
              throw "Invalid Data";
            }
            let target = 0, trait, usingSpecialization, difficulty, skill = 0, params = {};
            form.serializeArray().forEach(e => {
              switch (e.name) {
                case "difficulty":
                  if (e.value != "")
                    difficulty = -e.value;
                  break;
                case "skillLabel":
                  params.skill = e.value;
                  break;
                case "usure":
                  params.usure = +e.value;
                  break;
                case "skill":
                    skill = +e.value;
                    break;
                case "trait":
                  trait = +e.value;
                  break;
                case "usingSpecialization":
                  if (e.value && +e.value > 1)
                    usingSpecialization = +e.value;
                  break;
              }

              // prise en compte de l'usure sur la feuille de perso
              if (params.usure != undefined){
                updateActorSkillScore(actor, data.skill, 'spent', data.skillSpent + parseInt(params.usure,10));
              }
            });
            return TotemRoll.get().performTest(data.dicePool, target, trait, usingSpecialization, difficulty, skill, params, actor);
          }
        },
        close: {
          label: game.i18n.localize('Close'),
          callback: () => { }
        }
      },
      render: function (h) {
        h.find("#skills-radio input").change(function () {
          let s = $(this).attr("data-skill");
          h.find(".trait-list .hidden").removeClass("show");
          let f = h.find(".trait-list ." + s);
          f.addClass("show");
          if (f.length == 0) {
            h.find(".use-trait input").attr("disabled", "disabled").prop("checked", false);
          } else
            h.find(".use-trait input").attr("disabled", null);
        });
      }
    });
    ui.render(true);
    return ui;
  }
}


Hooks.on("chatCommandsReady", function (chatCommands) {
  chatCommands.registerCommand(chatCommands.createCommandFromData({
    commandKey: "/dr",
    invokeOnCommand: (chatlog, messageText, chatdata) => {
      TotemRoll.get().parse(messageText);
    },
    shouldDisplayToChat: false,
    iconClass: "fa-dice-d6",
    description: "Roll Totem check"
  }));
});

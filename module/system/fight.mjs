import { GODS } from "./config.mjs";
import { getActorSkillScore,updateActorSkillScore } from "./functions.mjs";
import { CombatResultDialog } from "./dialogs.mjs";

export class GodsFight {

  async performTest(enemyAchievement, enemyConservation, skillKey, skill, params, actor) {
    const dicePool = (params.spleen != undefined || params.purpose != undefined) ? '5' : '4';
    const r = new Roll(dicePool +`d6`);
    let diceString = '';
    let dicePoolHint = '';
    let discardedRoll = false;    
    let bonus = 0;
    let bonusText = '/+';
    let currentSkillScore = skill;


    r.roll(); // dice are rolled
    if (params.usure != undefined){
      currentSkillScore += params.usure;
      bonus += params.usure;
    }

    if (params.specialization != undefined){
      currentSkillScore += 2;
    }

    if (params.trait != undefined){
      currentSkillScore += params.trait;
      bonus += params.trait;
    }

    bonusText += bonus;

    let targetText = game.i18n.format('GODS.Selected') + ' : ' + game.i18n.format(skillKey) + " " + skill + bonusText;
    if (params.specialization != undefined){
      targetText += " (S)"; 
    }
    // tri par ordre croissant
    r.terms[0].results.sort((a,b) => a.result - b.result );
        
    if (params.purpose != undefined){
      discardedRoll = r.terms[0].results.shift();
      dicePoolHint = ' - ' + game.i18n.format('GODS.PurposeTrait');
    } else if (params.spleen != undefined){
      discardedRoll = r.terms[0].results.pop();
      dicePoolHint = ' - ' + game.i18n.format('GODS.SpleenTrait');
    } 
    const discardedRollText = (discardedRoll.result != undefined) ? '<div class="discarded-roll">' + discardedRoll.result + '</div>' : "";

    for (let i = 0; i < r.terms[0].results.length; i++) {
      let result = r.terms[0].results[i].result;
      diceString += '<li class="roll die d6 die-'+ i +'">' + result + '</li>'; 
    }

    let hintText = game.i18n.format('GODS.ConfrontationHint');
    
    // Build a dynamic html using the variables from above.
    const html = `
            <div class="totem roll confrontation">
                <div class="dice-roll">
                    <div class="dice-result">
                        <div class="dice-formula">
                        ` + dicePool + `d6 ` + dicePoolHint + `
                        </div>
                        <div class="dice-tooltip expanded">
                            <section class="tooltip-part">
                                <div class="parameters">
                                  ` + targetText + `
                                </div>
                                <div class="dice flexrow flex-between items-center">
                                    <ol class="dice-rolls">` + diceString + `</ol>
                                    <div class="discards text-right">` + discardedRollText + `</div>
                                </div>
                            </section>
                        </div>` +
                        `<p class="step1-text" id="step1">` + hintText + `</p>
                          <div class="row">
                              <a class="inline-block button add-to-achievement">` + game.i18n.format('GODS.Achievement') + `</a>
                              <a class="inline-block button add-to-conservation">` + game.i18n.format('GODS.Conservation') + `</a>
                              <a class="inline-block button reset"><i class="fa-solid fa-rotate-right"></i></a>
                              <a class="inline-block button resolve"><i class="fa-solid fa-check"></i></a>
                          </div>                          
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

    // on fait les comptes

  }

  async sendToChat(content, roll, actor) {
    let conf = {
      user: game.user._id,
      content: content,
      roll: roll,
      // sound: 'sounds/dice.wav'
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
    if (!GodsFight.instance)
      GodsFight.instance = new GodsFight();
    return GodsFight.instance;
  }

 
  // data injected to char data
  static previousValues = {
    dicePool: 4,
    skills: GODS.skillsList,
    cskills: GODS.cskills,
    cephalic: false,
    achievementReroll: GODS.achievementReroll,
    conservationReroll: GODS.conservationReroll
  };

  static rollerTemplate = 'systems/totem/templates/fight.html';
  static CombatResultTemplate = 'systems/totem/templates/fight-result.html';
  
  static async chatMessageHandler(message, html, data) {
    // console.log("accès au fin du fin", message._id);

    // sélection du dé actif
    html.on("click", '.confrontation .die.d6', event => {
      const diceResult = parseInt($(event.target).html(),10);
      html.find('.confrontation .die.d6').removeClass('active');
      $(event.target).addClass('active');
    });

    // sélection des dés d'accomplissement
    html.on("click", '.confrontation .add-to-achievement', event => {
      const diceResult = parseInt(html.find('.confrontation .die.d6.active').html(),10);
      html.find('.confrontation .die.d6.active').removeClass('min').addClass('max');
    });

    // sélection des dés de conservation
    html.on("click", '.confrontation .add-to-conservation', event => {
      const diceResult = parseInt(html.find('.confrontation .die.d6.active').html(),10);
      html.find('.confrontation .die.d6.active').removeClass('max').addClass('min');
    });

    // reset de la sélection des pools
    html.on("click", '.confrontation .reset', event => {
      html.find('.confrontation .die.d6')
      .removeClass('max')
      .removeClass('min');
    });

    // résolution de la confrontation
    html.on("click", '.confrontation .resolve', async event => {
      let achievementDice = 0;
      let conservationDice = 0;
      let achievementBasis = 0;
      let conservationBasis = 0;
      html.find('.confrontation .die.d6.max').each(function(index){
        achievementDice += parseInt($(this).html(), 10);
      });
      html.find('.confrontation .die.d6.min').each(function(index){
        conservationDice += parseInt($(this).html(), 10);
      });

      // saisie des résultats  
      achievementBasis = html.find('td.achievement-result').data('achievement-basis');
      html.find('td.achievement-result').data('achievement-value', achievementDice);
      html.find('td.achievement-result').html(achievementBasis + achievementDice);

      conservationBasis = html.find('td.conservation-result').data('conservation-basis');
      html.find('td.conservation-result').data('conservation-value', conservationDice);
      html.find('td.conservation-result').html(conservationBasis + conservationDice);

      // calcul des marges
      const achievementMargin = achievementBasis + achievementDice - parseInt(html.find('td.adv-achievement-result').html(),10);
      const conservationMargin = conservationBasis + conservationDice - parseInt(html.find('td.adv-conservation-result').html(),10);
      html.find('td.achievement-margin').html(achievementMargin);
      html.find('td.conservation-margin').html(conservationMargin);

    });


    // fin de la résolution de la confrontation


  }

  static async chatListeners(html) {
    // supprime le masquage des résultats du dé
    html.off("click", ".dice-roll");
  }
  
  /**
   * main class function
   * @returns 
   */
  static async ui(externalData = {}) {
    let actor = {};

    // get the actor
    try {
      actor = game.user.character;
    } catch(e){
      throw("Aucun personnage défini !");
    }

    if (actor == null && externalData.speakerId != undefined && externalData.speakerId != null){
      // on récupère le speakerId, et de là l'objet actor
      actor = game.actors.get(externalData.speakerId);     
      GodsFight.previousValues['speakerName'] = actor.name;
      GodsFight.previousValues['speakerImg'] = actor.img;      
    } else {
      GodsFight.previousValues['speakerName'] = "Anonyme";
    }

    // get the data
    let charData = (externalData) => {
      let o = Object.assign({ _template: GodsFight.rollerTemplate }, {...GodsFight.previousValues, ...externalData});
      return o;
    };
    let data = charData(externalData);    
    console.log(data);  

    // render template    
    let html = await renderTemplate(data._template, data);
    
    let ui = new Dialog({
      title: game.i18n.localize("GODS.FightTool"),
      content: html,
      buttons: {
        roll: {
          label: game.i18n.localize('GODS.Roll4Fight'),
          callback: (html) => {
            let form = html.find('#dice-pool-form');
            if (!form[0].checkValidity()) {
              throw "Invalid Data";
            }
            let enemyAchievement, enemyConservation, skillKey, skill = 5, enemySkill, params = {};
            form.serializeArray().forEach(e => {
              switch (e.name) {
                case "skill":
                case "cephalic":
                  if (e.value !== ''){
                    skillKey = e.value;
                  }
                  break;
                case "skill-score":
                  skill = +e.value;
                  break;
                case "specialization":
                  params.specialization = true;
                  break;
                case "usure":
                  params.usure = +e.value;
                  break;
                  case "trait":
                    params.trait = +e.value;
                    break;
                  case "purpose":
                  params.purpose = true;
                  break;
                case "spleen":
                  params.spleen = true;
                  break;    
                case "adv-skill":
                    enemySkill = +e.value;
                    break;
                  case "achievement":
                  enemyAchievement = +e.value;
                  break;
                case "conservation":
                    enemyConservation = +e.value;
                    break;
                }
            });
            // prise en compte de l'usure sur la feuille de perso
             if (params.usure != undefined){
               const newSpentScore =  getActorSkillScore(actor, skillKey, 'spent') + params.usure;
               console.log(newSpentScore);
               updateActorSkillScore(actor, skillKey, 'spent', newSpentScore);
            }

            return GodsFight.get().performTest(enemyAchievement + enemySkill, enemyConservation + enemySkill, skillKey, skill, params, actor);
          }
        },
        cancel: {
          label: game.i18n.localize('Close'),
          callback: () => { }
        }
      },
      render: function (h) {
        h.on("change", 'select[name="skill"]', event => {
          const skillLabel = $(event.target).val();
          const currentSkillScore = getActorSkillScore(actor, skillLabel) - getActorSkillScore(actor, skillLabel, 'spent');
          if (parseInt(currentSkillScore,10) >= 0){
            h.find('input#skillScore').val(currentSkillScore);
          }
        });        
      }
    }, { width: 601, height: 'fit-content' });
    ui.render(true);
    return ui;
  }
}

export class GodsCombat extends Combat {
  _encounterCheck(){
    console.log('encounter combat object', this);
  }

  async rollInitiative(ids, formula = undefined, messageOptions = {}) {
    // console.log(`${game.system.title} | Combat.rollInitiative()`, ids, formula, messageOptions);
    // Structure input data
    ids = typeof ids === "string" ? [ids] : ids;
    const updates = [];
    const messages = [];
    // étape 1 : on vérifie que le combattant est un pj
    /*if (ids.length == 1){
      console.log("il n'y a qu'un actor en lice");
    } else {
      console.log("il faut prendre le premier pj pour lancer la confrontation");
    }*/
    const combatant = this.combatants.get(ids[0]);
    const combatantAttitude = combatant.flags.world.attitude;
    let difficulty = 7;
    if (combatantAttitude == 'passive'){
      difficulty = 9;
    } else if (combatantAttitude == 'offensive'){
      difficulty = 5;
    } 

    let cf = CONFIG.Combat.initiative.formula.replace('cs>7', 'cs>'+ difficulty.toString());
    console.log('formula', cf);
    let roll = null;
    if (isNewerVersion(game.version, '0.8.9')) {
      roll = await combatant.getInitiativeRoll(cf).evaluate({ async: true });
    } else {
      roll = await combatant.getInitiativeRoll(cf);
    }

    updates.push({ _id: ids[0], initiative: roll.total });
    await this.updateEmbeddedDocuments('Combatant', updates);

    let messageData = {
      speaker: {
        scene: canvas.scene.id,
        actor: combatant.actor ? combatant.actor.id : null,
        token: combatant.token.id,
        alias: combatant.token.name,
      },
      flavor: `${combatant.token.name} tire son Initiative! <br> `,
      flags: { 'core.initiativeRoll': true },
    };
    let rollMode = game.settings.get('core', 'rollMode');

    const chatData = await roll.toMessage(messageData, { create: false, rollMode });
    messages.push(chatData);
    await CONFIG.ChatMessage.documentClass.create(messages);
    return this;
  }

  nextRound() {
    /*let combatants = this.combatants.contents
    for (let c of combatants) {
      let actor = game.actors.get( c.actorId )
      actor.clearRoundModifiers()
    }*/
    super.nextRound();
  }

  /************************************************************************************/
  startCombat() {
    /*let combatants = this.combatants.contents
    for (let c of combatants) {
      let actor = game.actors.get( c.actorId )
      actor.storeVitaliteCombat()
    }*/

    return super.startCombat();
  }
  
  /************************************************************************************/
  _onDelete() {
    /*let combatants = this.combatants.contents
    for (let c of combatants) {
      let actor = game.actors.get(c.actorId)
      actor.clearInitiative()
      actor.displayRecuperation()
    }
    super._onDelete()*/
  }
}

export class GodsCombatTracker extends CombatTracker {
  /**
   * Default folder context actions
   * @param html {jQuery}
   * @private
   */
  /* -------------------------------------------- */

  /**
   * Get the sidebar directory entry context options
   * @return {Object}   The sidebar entry context options
   * @private
   */
  static getEntryContextOptions() {
    return [
      {
        name: 'Update',
        icon: '<i class="fas fa-edit"></i>',
        callback: this._onConfigureCombatant.bind(this),
      },
      {
        name: 'Reroll',
        icon: '<i class="fas fa-dice-d20"></i>',
        callback: (li) => this.viewed.rollInitiative(li.data('combatant-id')),
      },
      {
        name: 'Remove',
        icon: '<i class="fas fa-skull"></i>',
        // callback: (li) => this.viewed.deleteCombatant(li.data('combatant-id')),
        callback: (li) => this.viewed.deleteEmbeddedDocuments('Combatant', [li.data('combatant-id')]),
      },
      {
        name: 'CloneActor',
        icon: '<i class="far fa-copy fa-fw"></i>',
        callback: async (li) => {
          const combatant = this.viewed.combatants.get(li.data('combatant-id'));
          await combatant.clone({}, { save: true });
        },
      },
    ];
  }


  /* -------------------------------------------- */
  get template() {
      return "systems/gods-system/templates/combat/tracker.hbs";
  }

  async getData(options) {
      const context = await super.getData(options);

      if (!context.hasCombat) {
        return context;
      }

      for (let [i, combatant] of context.combat.turns.entries()) {
          context.turns[i].attitude = combatant.getFlag("world", "attitude");
          context.turns[i].isPlayer = combatant.actor.type == "character";
          context.turns[i].isNpc = combatant.actor.type == "npc";
          context.turns[i].isCreature = combatant.actor.type == "creature";
      }
      return context;
  }

  activateListeners(html) {
      super.activateListeners(html);

      html.find(".status").click(this._setStatut.bind(this));        
  }

  /**
   * @description Use to put an attitude to an actor
   * @param {*} event 
   */
  async _setStatut(event) {
      event.preventDefault();
      event.stopPropagation();
      const btn = event.currentTarget;
      const li = btn.closest(".combatant");
      const combat = this.viewed;
      const combatant = combat.combatants.get(li.dataset.combatantId);
      
      if ($(btn).hasClass('offensive'))
        await combatant.setFlag("world", "attitude", "offensive");
      else if  ($(btn).hasClass('active'))  
        await combatant.setFlag("world", "attitude", "active");
      else if  ($(btn).hasClass('passive'))  
        await combatant.setFlag("world", "attitude", "passive");  
      else  
        await combatant.setFlag("world", "attitude", null);
  }
}

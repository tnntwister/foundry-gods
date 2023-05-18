
  export class CombatResultDialog extends Dialog {

    constructor(dialogData, options) {      
      /*let options = { classes: ["combat", "result"], ...options };
      let conf = {
        title: "Résultat de la confrontation",
        content: dialogData.content      
      };
      super(conf, options);
      this.dialogData = dialogData;*/
    }
    
    /* -------------------------------------------- */
    activateListeners(html) {
      /*super.activateListeners(html);
      this.html = html;
      this.setEphemere(this.dialogData.signe.system.ephemere);
      html.find(".signe-aleatoire").click(event => this.setSigneAleatoire());
      html.find("[name='signe.system.ephemere']").change((event) => this.setEphemere(event.currentTarget.checked));
      html.find(".signe-xp-sort").change((event) => this.onValeurXpSort(event));
      html.find("input.select-actor").change((event) => this.onSelectActor(event));
      html.find("input.select-tmr").change((event) => this.onSelectTmr(event));*/
    }
  
  
    async onSelectActor(event) {
      /*const actorId = this.html.find(event.currentTarget)?.data("actor-id");
      const actor = this.dialogData.actors.find(it => it.id == actorId);
      if (actor) {
        actor.selected = event.currentTarget.checked;
      }*/
    }
  
  
  }

  export const getRollBox = async function(data) {
    let html = await renderTemplate('systems/totem/templates/roll.hbs', data);
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
            return EcrymeRoll.get().performTest(data.dicePool, target, trait, usingSpecialization, difficulty, skill, params, actor);
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
  }  
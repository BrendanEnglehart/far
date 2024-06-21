import { FAR_CONFIG } from "../helpers/config.mjs";

/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class farActor extends Actor {

  /**
    @type {class|null}
   */
  _class;
  get class() {
    if (this._class !== undefined) return this._class;
    if (this.system.attributes.class.class !== null) {
      this._class = game.items.find("this.system.attributes.class.class")
      return this._class
    }
  }


  /**
  @type {race|null}
 */
  _race;
  get race() {
    if (this._race !== undefined) return this._race;
    if (this.system.attributes.race !== null) {
      this._race = game.items.find("this.system.attributes.race")
      return this.__race
    }
  }


  _optionals;
  get optionals() {
    if (this._optionals !== undefined) return this._optionals;
    if (this.system.attributes.optionals !== null) {
      this._optionals = this.system.attributes.optionals
      return this._optionals
    }
    return {}
  }

  // // Subclass, needs to be renamed
  // _subclass;
  // get subclass() {
  //   if (this._subclass !== undefined) return this._subclass;
  //   return null;
  // }

  doUpdates() {
    this.update({ "system.attributes": this.system.attributes, "system.abilities": this.system.abilities })
  }

  damage(value, type = null) {
    this.system.health.value -= value;
    this.doUpdates();
  }

  parseChoice(choice) {
    if (choice == "crachoose1") {
      return ["culinary", "handicraft", "spellcraft", "warcraft"]
    } else if (choice == "choose1") {
      return Object.keys(FAR_CONFIG.abilityReference)
    }
    else {
      var ret = []
      for (var i = 0; i < choice.length; i += 3) {
        ret.push(FAR_CONFIG.shortName[choice.substring(i, i + 3)])
      }
      return ret
    }
  }

  updateSkills() {
    const skills = this.translateSkills(this._class.system);
    const training = this.translateSkills(this._race.system)
    this.system.attributes.class = this._class._id;
    for (let ability of skills) {
      this.system.abilities[ability].value = 5 + 2 * (Math.min(this.system.attributes.level.level, 4) - 1)
    }
    for (let ability of training) {
      if (skills.includes(ability)) {
        this.system.abilities[ability].value += +2
      }
      else {
        this.system.abilities[ability].value = 5 + 2 * (Math.min(this.system.attributes.level.level, 4) - 1)
      }

    }

  }

  translateSkills(system) {
    let skills = []
    for (let key in system) {
      if (key.startsWith("skill") || key.startsWith("training")) {
        if (system[key].length == 0) {
          continue;
        }
        else if (system[key].length == 3) {
          skills.push(CONFIG.far.shortName[system[key]])
        } else {
          if (this._optionals === undefined) {
            this._optionals = this.optionals()
          }
          if (this._optionals[key] === undefined) {
            this._optionals[key] = { "choice": undefined, "options": this.parseChoice(system[key]), "locked": false }
            // We don't save this value often, probably should have a better way to call and access it
            this.system.attributes.optionals = this._optionals
          }
          else {
            if (this._optionals[key].locked) {
              console.log(this._optionals[key].choice)
              skills.push(this._optionals[key].choice)
            }
          }
        }
      }
    }
    return skills
  }

  classLevelUp() {

    if (this.system.attributes.level.level >= 10)
      return false;
    this.system.attributes.level.level += 1;
    const stats = this.translateSkills(this._class.system)
    const data = this.system;
    // for (let ability of Object.keys(stats)) {
    //   if (Object.keys(stats[ability]).includes("per")) {
    //     this.system.abilities[ability].value += stats[ability].per
    //   }
    // }
    this.updateMaxHealth();
    return true;

  }


  rollAbilityCheck(ability) {
    var formula = "1d20+" + this.system.abilities[ability].value
    return this.rollCheck(formula, ability);
  }

  showClassList() {
    ret = []
    if (this.class !== null) {
      ret.push(this._class.name)
    }
  }

  // Right now we're not calling this but this will be run when you change your class class, you can call this
  // from the commandline (f12) to change the set class for the character 
  onclassChange(classObj) {
    if (classObj.type !== "class") {
      return;
    }
    if (this.class !== null) { return; } // We need to implement this but for now we'll just return and not change anything 
    this._class = classObj;
    this.classDataUpdate()
    this.updateMaxHealth()
    return;

  }
  onraceChange(raceObj) {
    if (raceObj.type !== "race") {
      return;
    }
    if (this.raceObj !== null) { return; } // We need to implement this but for now we'll just return and not change anything 
    this._race = raceObj;
    this.classDataUpdate()
    this.updateMaxHealth()
    return;

  }

  classDataUpdate() {
    if (this._class === undefined || this._race === undefined) {
      if (this.system.attributes.class.class !== null) {
        this._class = game.items.find(this.system.attributes.class.class)
      }
      if (this.system.attributes.race !== null) {
        this._class = game.items.find(this.system.attributes.race)
      }
      for (let item of this.items) {
        if (item.type == "class") {
          this._class = item;
        }
        if (item.type == "race") { this._race = item }
      }
      if (this._class !== undefined) {
        const data = this.system;
        for (let item of this.items) {
          if (item.type == "class" && item._id != this._class._id) {
            item.delete()
          }
          if (item.type == "race" && item._id != this._race._id) {
            item.delete()
          }
        }

        this.updateSkills()
        // Handle Specialized Here

        this.doUpdates();
      }

      else {
        console.log("No class Class for Actor")
      }
    }
  }

  /** @override */
  prepareData() {
    //console.log(this.system.abilities)
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
    //console.log(this.system.abilities)
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /**
   * @override
   * Augment the basic actor data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    this._prepareCharacterData();

  }

  updateMaxHealth() {
    const data = this.system;

    if (this._class !== undefined)
      data.health.max = +this._class.system.base_hp;
    else
      data.health.max = 2; // We get here when a race is added but there is no class
    //if (goblin or vampire) data.health.max /=2
    if (this._race !== undefined) {
      if (this._race.system.hp_mod_is_multiplyer == 1) {
        data.health.max *= +this._race.system.hp_mod
      }
      else {
        data.health.max += +this._race.system.hp_mod
      }
    }
    // Levels 2, 3, and 4 give you 2 additional hit points. 
    data.health.max += 2 * (Math.min(data.attributes.level.level, 4) - 1)
    data.health.max = Math.round(data.health.max)
    if (data.health.value > data.health.max) {
      data.health.value = data.health.max
    }


    // if (HND) max+=2


    this.update(this.system);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    //if (actorData.type !== 'character') return;

    this.classDataUpdate()
    this.updateMaxHealth()
  }




  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    const data = super.getRollData();

    // Prepare character roll data.
    this._getCharacterRollData(data);

    return data;
  }

  /**
   * Prepare character roll data.
   */
  _getCharacterRollData(data) {
    // if (this.data.type !== 'character') return;
    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@agility.value + 4`.
    if (this.system.abilities) {
      for (let [k, v] of Object.entries(this.system.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }
  }

  async rollAttack() { }
  async rollCheck(formula, message) {
    // Initialize chat data.
    const speaker = ChatMessage.getSpeaker({ actor: this.actor });
    const rollMode = game.settings.get('core', 'rollMode');
    const label = message;

    // If there's no roll data, send a chat message.
    if (!formula) {
      ChatMessage.create({
        speaker: speaker,
        rollMode: rollMode,
        flavor: label,
        content: message
      });
    }
    // Otherwise, create a roll and send a chat message from it.
    else {
      // Retrieve roll data.
      const rollData = this.getRollData();

      // Invoke the roll and submit it to chat.
      const roll = new Roll(formula, rollData);
      // If you need to store the value first, uncomment the next line.
      // let result = await roll.roll({async: true});
      roll.toMessage({
        speaker: speaker,
        rollMode: rollMode,
        flavor: label,
      });
      return roll;
    }
  }

}

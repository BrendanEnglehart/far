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


  // // Subclass, needs to be renamed
  // _t1class;
  // get t1class() {
  //   if (this._t1class !== undefined) return this._t1class;
  //   return null;
  // }


  doUpdates() {
    this.update({ "system.attributes": this.system.attributes, "system.abilities": this.system.abilities })
  }


  damage(value, type = null) {
    this.system.health.value -= value;
    this.doUpdates();
  }



  classLevelUp() {

    if (this.system.attributes.level.level >= 10)
      return false;
    this.system.attributes.level.level += 1;
    const stats = this._class.system.modifiers;
    const data = this.system;
    for (let ability of Object.keys(stats)) {
      if (Object.keys(stats[ability]).includes("per")) {
        this.system.abilities[ability].value += stats[ability].per
      }
    }
    this.updateMaxHealth();
    return true;

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

  classDataUpdate() {

    if (this._class === undefined) {
      if (this.system.attributes.class.class !== null) {
        this._class = game.items.find(this.system.attributes.class.class)
        if (this._class !== undefined) {
          return
        }
      }
      for (let item of this.items)
        if (item.type == "class") {
          this._class = item;
        }

      if (this._class !== undefined) {
        const data = this.system;
        for (let item of this.items) {
          if (item.type == "class" && item._id != this._class._id) {
            item.delete()
          }
        }

        const stats = this._class.system.modifiers;
        this.system.attributes.class = this._class._id;
        for (let ability of Object.keys(stats)) {
          if (Object.keys(stats[ability]).includes("initial")) {
            this.system.abilities[ability].value += stats[ability].initial
          }
        }
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
    const curr = data.health.max;
    // Since the health field is updated as an input, we want to guarantee the precision on the update rather than when we display it.
    // data.health.max = Math.round(100 * (data.abilities.endurance.value + (.1 * data.abilities.presence.value) + (.25 * data.abilities.strength.value))) / 100.0;
    const diff = data.health.max - curr
    if (diff > 0)
      data.health.value += data.health.max - curr
    this.update(this.system);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    //if (actorData.type !== 'character') return;

    // Make modifications to data here. For example:
    const data = this.system;
    this.classDataUpdate()
    // this.updateMaxHealth()
  }

  /**
   * Override getRollData() that's supplied to rolls.
   */
  // getRollData() {
  //   const data = super.getRollData();

  //   // Prepare character roll data.
  //   this._getCharacterRollData(data);

  //   return data;
  // }

  /**
   * Prepare character roll data.
   */
  _getCharacterRollData(data) {
    if (this.data.type !== 'character') return;
    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (data.abilities) {
      for (let [k, v] of Object.entries(data.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }
  }

}

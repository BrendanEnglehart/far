/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class revisionActor extends Actor {
 
/**
  @type {t0|null}
 */
  _t0class;
  get t0class() { 
     if (this._t0class !== undefined) return this._t0class;
     if (this.system.attributes.class.t0 !== null){
      this._t0class = game.items.find("this.system.attributes.class.t0")
     return this._t0class
   }  
  }



  _t1class;
  get t1class() { 
     if (this._t1class !== undefined) return this._t1class;
     return null;
  }


  doUpdates() {
     this.update({"system.attributes" : this.system.attributes, "system.abilities" : this.system.abilities})
  }


  damage(value, type=null){

    
    this.system.health.value -= value;


    this.doUpdates();


  }

  addExp(exp) { 
    if (this._t1class == undefined){
      console.log(this.system.attributes.experience.t0Exp)
      this.system.attributes.experience.t0Exp += exp;   
      console.log(this.system.attributes.experience.t0Exp)
      //this.update(this.system);
      // Can't gain more than 3 levels in one burst of exp.
      let capGain = 0;
      while (this.checkt0LevelUp()){
        capGain +=1; 
        if (capGain > 3)
          break
      }
      this.doUpdates();
    }
  }


  t0LevelUp(){
    
    if (this.system.attributes.level.t0level >= 10)
      return false;
    this.system.attributes.level.t0level += 1;
    const stats = this._t0class.system.modifiers;
    // const data = this.system;
    const data = this.system;
    this.system.abilities.strength.value   +=    stats.strength.per;
    this.system.abilities.dexterity.value  +=    stats.dexterity.per;
    this.system.abilities.focus.value      +=    stats.focus.per;
    this.system.abilities.endurance.value  +=    stats.endurance.per;
    this.system.abilities.presence.value   +=    stats.presence.per;
    //data.abilities.charm.value      +=    stats.charm.per;
    this.system.abilities.knowledge.value  +=    stats.knowledge.per;
    this.system.abilities.wisdom.value     +=    stats.wisdom.per;
    this.updateMaxHealth();
    return true;

  }

  checkt0LevelUp(){
    if (CONFIG.REVISION5.t0levelThresholds[this.system.attributes.level.t0level + 1] !== undefined)
    {
      let nextThreshold = CONFIG.REVISION5.t0levelThresholds[this.system.attributes.level.t0level + 1]
      if (this.system.attributes.experience.t0Exp > nextThreshold)
      {
        return this.t0LevelUp()
      }
    }
    return false;
  }





  showClassList(){
    ret = []
    if (this.t0class !== null) {
      ret.push(this._t0class.name)
    }
  }

  // Right now we're not calling this but this will be run when you change your t0 class, you can call this
  // from the commandline (f12) to change the set class for the character 
  ont0ClassChange(classObj) { 
    if (classObj.type !== "t0"){
    return;
    }
    if (this.t0class !== null){return;} // We need to implement this but for now we'll just return and not change anything 
    this._t0class = classObj;
    this.t0classDataUpdate()
    this.updateMaxHealth()
    return;

  }

  t0classDataUpdate(){

    if (this._t0class === undefined){
      if (this.system.attributes.class.t0 !== null){
        this._t0class = game.items.find(this.system.attributes.class.t0)
        if (this._t0class !== undefined) {
          return
        }
      }
    for (let item of this.items)
    if (item.type == "t0")
    {
      this._t0class = item;
    }
    
    if (this._t0class !== undefined){
    
    
    const data = this.system;
    for (let item of this.items) 
    {
      if (item.type == "t0" && item._id != this._t0class._id)
      {
        item.delete()
      }
    }

        const stats = this._t0class.system.modifiers;
        this.system.attributes.class = this._t0class._id;
        data.abilities.strength.value   +=    stats.strength.initial;
        data.abilities.dexterity.value  +=    stats.dexterity.initial;
        data.abilities.focus.value      +=    stats.focus.initial;
        data.abilities.endurance.value  +=    stats.endurance.initial;
        data.abilities.presence.value   +=    stats.presence.initial;
        //data.abilities.charm.value      +=    stats.charm.initial;
        data.abilities.knowledge.value  +=    stats.knowledge.initial;
        data.abilities.wisdom.value     +=    stats.wisdom.initial;
        this.doUpdates();
      }

      else {
        console.log("No t0 Class for Actor")
      }
    }
  }


  /** @override */
  prepareData() {
    console.log(this.system.abilities)
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
    console.log(this.system.abilities)
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
    data.health.max =  Math.round(100 * (data.abilities.endurance.value + (.1 * data.abilities.presence.value) + (.25 * data.abilities.strength.value))) / 100.0;
    const diff = data.health.max - curr
    if (diff > 0)
      data.health.value += data.health.max - curr
    //this.update(this.system);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    //if (actorData.type !== 'character') return;

    // Make modifications to data here. For example:
    const data = this.system;
    this.t0classDataUpdate()
    this.updateMaxHealth()
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

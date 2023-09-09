export class CharacterData extends foundry.abstract.DataModel {
    static defineSchema() {
      const fields = foundry.data.fields;
      return {
        biography: new fields.HTMLField(),
        health: new fields.SchemaField({
          value: new fields.NumberField({
            required: true,
            initial: 10,
            integer: false
          }),
          min: new fields.NumberField({
            required: true,
            initial: 0,
            integer: true
          }),
          max: new fields.NumberField({
            required: true,
            initial: 10,
            integer: false
          })
        }),
        attributes: new fields.SchemaField({
            class: new fields.SchemaField({
                t0: new fields.StringField({
                    required: true,
                    initial: null,
                    nullable: true
                })
            }),
            level:  new fields.SchemaField({
                t0level :  new fields.NumberField({
                    required: true,
                    initial: 0,
                    integer: true
                }),
                t1level :  new fields.NumberField({
                    required: true,
                    initial: 0,
                    integer: true
                }),
              }),
            activeTier: new fields.NumberField({
                required: true,
                initial: 0,
                integer: true
            }),
            experience : new fields.SchemaField({
                t0Exp : new fields.NumberField({
                    required: true,
                    initial: 0,
                    integer: true
                }),
                t1Exp : new  fields.NumberField({
                    required: true,
                    initial: 0,
                    integer: true
                }),
              })
        }),
        abilities: new fields.SchemaField({
            strength: new fields.SchemaField({
                value: new fields.NumberField({
                  required: true,
                  initial: 10,
                  integer: false
                })}),
            dexterity: new fields.SchemaField({
                value: new fields.NumberField({
                    required: true,
                    initial: 10,
                    integer: false
                    })}),
            focus: new fields.SchemaField({
                value: new fields.NumberField({
                    required: true,
                    initial: 10,
                    integer: false
                })}),
            endurance: new fields.SchemaField({
                value: new fields.NumberField({
                    required: true,
                    initial: 10,
                    integer: false
                    })}),
            wisdom: new fields.SchemaField({
                value: new fields.NumberField({
                    required: true,
                    initial: 10,
                    integer: false
                })}),
            charm: new fields.SchemaField({
                value: new fields.NumberField({
                    required: true,
                    initial: 10,
                    integer: false
                    })}),
            presence: new fields.SchemaField({
                value: new fields.NumberField({
                    required: true,
                    initial: 10,
                    integer: false
                })}),
            knowledge: new fields.SchemaField({
                value: new fields.NumberField({
                    required: true,
                    initial: 10,
                    integer: false
                    })}),
            
        
        })
        // proficiencies: new fields.SchemaField({
        //   weapons: new fields.ArrayField(new fields.StringField()),
        //   skills: new fields.ArrayField(new fields.StringField())
        // })
      };
    }
  }

export class AbilitiesData extends foundry.abstract.DataModel {
    static defineSchema() {
        const fields = foundry.data.fields;
        return { 
            description:  new fields.HTMLField(),
            passive : new fields.BooleanField({
                initial: false,
                required: true
            }),
            roll: new fields.SchemaField({
                staticModifiers:  new fields.SchemaField({
                    value: new fields.NumberField({
                        initial: 0,
                        required: true,
                        integer: false
                    })}),
                dice: new fields.SchemaField({
                    value: new fields.NumberField({
                    required: false,
                    integer: false
                    })}),
                abilitiesModifiers: new fields.SchemaField({
                    strength: new fields.SchemaField({
                        value: new fields.NumberField({
                        required: false,
                        integer: false
                        })}),
                    dexterity: new fields.SchemaField({
                        value: new fields.NumberField({
                            required: false,
                            integer: false
                            })}),
                    focus: new fields.SchemaField({
                        value: new fields.NumberField({
                            required: false,
                            integer: false
                        })}),
                    endurance: new fields.SchemaField({
                        value: new fields.NumberField({
                            required: false,
                            integer: false
                            })}),
                    wisdom: new fields.SchemaField({
                        value: new fields.NumberField({
                            required: false,
                            integer: false
                        })}),
                    charm: new fields.SchemaField({
                        value: new fields.NumberField({
                            required: false,
                            integer: false
                            })}),
                    presence: new fields.SchemaField({
                        value: new fields.NumberField({
                            required: false,
                            integer: false
                        })}),
                    knowledge: new fields.SchemaField({
                        value: new fields.NumberField({
                            required: false,
                            integer: false
                            })}),
                }),
            }),
            damage: new fields.SchemaField({
                staticModifiers:  new fields.SchemaField({
                    value: new fields.NumberField({
                        initial: 0,
                        required: false,
                        integer: false
                    })}),
                dice: new fields.SchemaField({
                    value: new fields.NumberField({
                    required: false,
                    integer: false
                    })}),
                abilitiesModifiers: new fields.SchemaField({
                    strength: new fields.SchemaField({
                        value: new fields.NumberField({
                        required: false,
                        integer: false
                        })}),
                    dexterity: new fields.SchemaField({
                        value: new fields.NumberField({
                            required: false,
                            integer: false
                            })}),
                    focus: new fields.SchemaField({
                        value: new fields.NumberField({
                            required: false,
                            integer: false
                        })}),
                    endurance: new fields.SchemaField({
                        value: new fields.NumberField({
                            required: false,
                            integer: false
                            })}),
                    wisdom: new fields.SchemaField({
                        value: new fields.NumberField({
                            required: false,
                            integer: false
                        })}),
                    charm: new fields.SchemaField({
                        value: new fields.NumberField({
                            required: false,
                            integer: false
                            })}),
                    presence: new fields.SchemaField({
                        value: new fields.NumberField({
                            required: false,
                            integer: false
                        })}),
                    knowledge: new fields.SchemaField({
                        value: new fields.NumberField({
                            required: false,
                            integer: false
                            })}),
                }),
            }),
            defenseModifiers: new fields.SchemaField({
                strength: new fields.SchemaField({
                    value: new fields.NumberField({
                      required: false,
                      integer: false
                    })}),
                dexterity: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: false,
                        integer: false
                        })}),
                focus: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: false,
                        integer: false
                    })}),
                endurance: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: false,
                        integer: false
                        })}),
                wisdom: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: false,
                        integer: false
                    })}),
                charm: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: false,
                        integer: false
                        })}),
                presence: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: false,
                        integer: false
                    })}),
                knowledge: new fields.SchemaField({
                    value: new fields.NumberField({
                        required: false,
                        integer: false
                        })}),
            }),
            factorsArmor: new fields.BooleanField({initial: false}),

        };
    }
  }
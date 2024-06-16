### far
# Test Build for LoF

## Steps towards playable state
# Equipment
# Base Classes
# Magic Spells
# Feats
# Abilities

## Future / Nice to have
# Subclasses
# Starter Class Pop up
# Helmet / Armor / Hand Equipment slots
# Consumables

```mermaid
flowchart TD
    actor[(actor)]
    character
    item[(item)]
    armor[armor]
    spell
    subclass
    subgraph main objects
        subgraph actor
            roll{"roll/Send to Chat"}
        end
        item
    end

    subgraph inheritors
        partyObj
        subgraph character
            rollAttributes{"roll Attributes/Send to Chat"}
            eqp{"equip/unequip"}
            eqpmnt_slots(["equipment slots (e.g head/hands/armor etc)"])
            rethink{rethink}
            attributes
            level
            c_cast_spell{"cast"}
            subclass
            spl_d{"apply spell damage"}
            phy_d{"apply weapon damage"}
            c_attack{"attack"}


        end
        subgraph wpn["weapon"]
         w_attack{"attack(hit bonus, damage bonus, crit range bonus)"}
        end
        mount
        armor
        subgraph spell
          cast_spell{"cast"}
        end
        farClass
        subclass
        variant
    end

    spell --> rethink
    eqp --> eqpmnt_slots
    armor --> eqp
    mount --> eqp
    wpn --> eqp
    actor-->character
    actor-->partyObj
    item-->wpn
    item-->spell
    item-->armor
    item-->mount
    item-->farClass
    c_cast_spell --> cast_spell
    cast_spell --> spl_d
    item-->subclass
    farClass --  DropDown --> variant
    level -- "When > 3 unhide dropdown for subclass in html" --> subclass 
    c_attack --> w_attack
    w_attack --> phy_d
```
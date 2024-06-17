
const { FAR_CONFIG } = require('./helpers/config.mjs');

// read races from races.json
class farImporter {

    getRaces() {
        const races = this.readFileReturnJson('../import/json/races.json');
        for (index in races['data']) {
            race = races['data'][index]
            raceCompendium = game.packs.get("world.races")
            race = new game.FAR.farItem({
                "name": race['name'],
                "type": 'race',
                "system": race
            })

            race.training = [CONFIG.far.shortName[race.training_1]]
            if (race.training_2 !== "") {
                race.training.push(CONFIG.far.shortName[race.training_2])
            }

            raceCompendium.importDocument(race)
        }
    }

    getClasses() {
        // This only kind of works but we can finagle the rest in foundry later
        // const classes = this.readFileReturnJson('../import/json/classes.json');
        // for (let farClass in classes['data']) {
        //     classCompendium = game.packs.get("far.classes")
        //     optionalSkills = []
        //     givenSkills = []
        //     if (farClass.skill_1 === "crachoose1") {
        //         // Not giving bards any effort before v1
        //         optionalSkills.push("crafting")
        //     }
        //     if (farClass.skill_1.length > 3) {
        //         for (i = 0; i < farClass.skill_1.length; i += 3) {
        //             short = farClass.skill_1.substring(i, i + 3)
        //             optionalSkills.push(CONFIG.far.shortName[short])
        //         }
        //     } else {
        //         givenSkills.push(CONFIG.far.shortName[farClass.skill_1])
        //     }
        //     givenSkills.push(CONFIG.far.shortName[farClass.skill_2])
        //     givenSkills.push(CONFIG.far.shortName[farClass.skill_3])
        //     if (farClass.skill_4 !== "")
        //         givenSkills.push(CONFIG.far.shortName[farClass.skill_4])
        //     if (farClass.skill_5 !== "")
        //         givenSkills.push(CONFIG.far.shortName[farClass.skill_5])



        //     farClass = new game.FAR.farItem({
        //         "name": farClass['name'],
        //         "type": 'class',
        //         "system": farClass
        //     })
        //     farClass.optionalSkills = optionalSkills;
        //     for (skill in givenSkills){
        //         farClass.modifiers[skill].initial = 5   
        //     }




        //     classCompendium.importDocument(farClass)
        // }
    }


    readFileReturnJson(file) {
        const reader = require('fs')
        reader.readFile(file, function (err, data) {
            return JSON.parse(data)
        })
    }

}
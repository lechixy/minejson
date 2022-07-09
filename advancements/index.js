let fs = require('fs');
let start = Date.now()

//Read first file
let olddata_reader = fs.readFileSync('./advancements_1.json', { encoding: 'utf8' })
//Read second file
let newdata_reader = fs.readFileSync('./advancements_2.json', { encoding: 'utf8' })

let olddata_raw = olddata_reader
let newdata_raw = newdata_reader
let write_filename = `minejson_advancements.json`

log('Successfully, readed all json files!');
convertStats()

function convertStats() {
    //Then parse it to json
    let olddata = JSON.parse(olddata_raw);
    let newdata = JSON.parse(newdata_raw);

    //New data
    let converteddata = {}

    Object.entries(olddata).forEach(action => {
        let current = action[0]
        converteddata[current] = action[1]
    })

    Object.entries(newdata).forEach(action => {
        let current = action[0]
        //if doesn't exist, create it
        if (!converteddata.hasOwnProperty(current))
            converteddata[current] = action[1]
    })

    converteddata["DataVersion"] = newdata.DataVersion

    //Write to all new data to json
    fs.writeFileSync(`./${write_filename}`, JSON.stringify(converteddata))
    log(`Created "${write_filename}" and finished in ${Date.now() - start}ms!`)
}

function log(message) {
    console.log(`[MINEJSON >> ADVANCEMENT] ${message}`);
}
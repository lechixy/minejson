let fs = require('fs');
let start = Date.now()

//Read first file
let olddata_reader = fs.readFileSync('./oldstats.json', { encoding: 'utf8' })
//Read second file
let newdata_reader = fs.readFileSync('./newstats.json', { encoding: 'utf8' })

let olddata_raw = olddata_reader
let newdata_raw = newdata_reader
let write_filename = 'minejson_stats.json'

log('Successfully, readed all json files!');
convertStats()

function convertStats() {
    //Then parse it to json
    let olddata = JSON.parse(olddata_raw);
    let newdata = JSON.parse(newdata_raw);

    //New data
    let converteddata = {
        "stats": {},
        "DataVersion": newdata.DataVersion
    }

    Object.entries(olddata.stats).forEach(action => {
        let current = action[0]
        //if doesn't exist, create it
        converteddata.stats[current] = {}

        Object.entries(action[1]).forEach(item => {
            converteddata.stats[current][item[0]] = item[1]
        })
    })

    Object.entries(newdata.stats).forEach(action => {
        let current = action[0]
        //if doesn't exist, create it
        if (!converteddata.stats.hasOwnProperty(current))
            converteddata.stats[current] = {}

        Object.entries(action[1]).forEach(item => {
            //Add exist data if data is already exist
            if (converteddata.stats[current].hasOwnProperty(item[0])) {
                return converteddata.stats[current][item[0]] = converteddata.stats[current][item[0]] + item[1]
            }
            //Otherwise, add new data
            converteddata.stats[current][item[0]] = item[1]
        })
    })

    //Write to all new data to json
    fs.writeFileSync(`./${write_filename}`, JSON.stringify(converteddata))
    log(`Created "${write_filename}" and finished in ${Date.now() - start}ms!`)
}

function log(message) {
    console.log(`[MINEJSON >> STATS] ${message}`);
}
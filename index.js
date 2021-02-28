const axios = require('axios');
const cheerio = require('cheerio');

const pageUrl = 'https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States'

async function getUsStates(){
 const {data} = await axios .get(pageUrl)
const $ = cheerio.load(data)
 const table = $('caption:contains("States of the United States of America")').parent()
 let states = []
 
 const rows = table.find('tbody tr').slice(2).each((index,element) => {
     const $row = $(element)
     
     const state = {}
     state.name = $row.find('th a').first().text().trim(); 
     const labels = ['code','capital','largest','ratification','population','total_area_m2','total_area_km2','land_area_m2','land_area_km2','water_area_m2','water_area_km2','number_of_reps']
    offset = 0

     $row.find('td').each((i,element)=>{
         const $col = $(element);
         if(i=== 1 && $col.attr('colspan') === '2') {
            const label = labels[i]
            state[label] = $col.text().trim()
            offset=1
         }
        else {
             const label = labels[i + offset]
             state[label] = $col.text().trim()
        }
         
         
     })
      states.push(state)
    })
console.log(states)
}

getUsStates();
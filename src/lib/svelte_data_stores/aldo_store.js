// @ts-nocheck
import { derived, readable } from "svelte/store";

let ws; 
const ws_port = "8044"

//preload data from previous tests
const TEST_DATA = {
    "ALDO Holyoke Mall": {
        "BUTAUD": 5,
        "RASIEN": 98,
        "GREG": 33,
        "SCHOOLER": 88,
        "SEVIDE": 19,
        "CADEVEN": 13,
        "WUMA": 50,
        "CAELAN": 77,
        "SODANO": 3,
        "BOZZA": 88,
        "MCTYRE": 40,
        "ALALIWEN": 30,
        "BEODA": 28,
        "ELOILLAN": 59,
        "ADERI": 78,
        "ABOEN": 37,
        "GRELIDIEN": 70,
        "MIRIRA": 65,
        "VENDOGNUS": 35
    },
    "ALDO Maine Mall": {
        "SODANO": 85,
        "ELOILLAN": 27,
        "MCTYRE": 67,
        "SEVIDE": 7,
        "VENDOGNUS": 78,
        "RASIEN": 20,
        "BUTAUD": 80,
        "BOZZA": 17,
        "ALALIWEN": 22,
        "CADEVEN": 20,
        "CADAUDIA": 97,
        "WUMA": 75,
        "MIRIRA": 28,
        "GREG": 8,
        "CAELAN": 23,
        "GRELIDIEN": 6,
        "SCHOOLER": 64,
        "ADERI": 50,
        "ABOEN": 18,
        "BEODA": 44
    },
    "ALDO Auburn Mall": {
        "WUMA": 53,
        "CADAUDIA": 41,
        "ALALIWEN": 40,
        "SCHOOLER": 20,
        "GRELIDIEN": 66,
        "BEODA": 78,
        "BUTAUD": 76,
        "SODANO": 40,
        "BOZZA": 97,
        "CADEVEN": 46,
        "ABOEN": 59,
        "VENDOGNUS": 69,
        "ELOILLAN": 21,
        "SEVIDE": 87,
        "ADERI": 17,
        "CAELAN": 54,
        "GREG": 31,
        "RASIEN": 13,
        "MCTYRE": 20
    },
    "ALDO Solomon Pond Mall": {
        "GREG": 53,
        "MCTYRE": 48,
        "SODANO": 54,
        "BEODA": 98,
        "BUTAUD": 39,
        "MIRIRA": 32,
        "WUMA": 76,
        "ELOILLAN": 29,
        "GRELIDIEN": 82,
        "ADERI": 99,
        "ABOEN": 29,
        "SEVIDE": 46,
        "CADAUDIA": 10,
        "VENDOGNUS": 56,
        "SCHOOLER": 77,
        "CAELAN": 50,
        "ALALIWEN": 11,
        "CADEVEN": 56,
        "BOZZA": 64
    },
    "ALDO Centre Eaton": {
        "ELOILLAN": 82,
        "SODANO": 52,
        "BUTAUD": 6,
        "RASIEN": 30,
        "VENDOGNUS": 56,
        "MCTYRE": 23,
        "GREG": 33,
        "CADEVEN": 5,
        "CAELAN": 67,
        "BEODA": 71,
        "ALALIWEN": 9,
        "WUMA": 25,
        "ABOEN": 64,
        "CADAUDIA": 68,
        "GRELIDIEN": 72,
        "SEVIDE": 79,
        "BOZZA": 55,
        "ADERI": 94,
        "SCHOOLER": 96
    },
    "ALDO Crossgates Mall": {
        "CAELAN": 46,
        "SEVIDE": 3,
        "ADERI": 7,
        "GREG": 49,
        "ABOEN": 6,
        "RASIEN": 70,
        "BUTAUD": 7,
        "GRELIDIEN": 26,
        "BOZZA": 76,
        "ALALIWEN": 55,
        "CADAUDIA": 0,
        "CADEVEN": 90,
        "SODANO": 43,
        "SCHOOLER": 55,
        "MIRIRA": 9,
        "BEODA": 37,
        "MCTYRE": 99,
        "VENDOGNUS": 11,
        "ELOILLAN": 43,
        "WUMA": 73
    },
    "ALDO Burlington Mall": {
        "RASIEN": 25,
        "CADEVEN": 31,
        "MIRIRA": 73,
        "CAELAN": 55,
        "BOZZA": 20,
        "CADAUDIA": 17,
        "SODANO": 11,
        "ABOEN": 31,
        "SEVIDE": 28,
        "VENDOGNUS": 41,
        "ALALIWEN": 8,
        "WUMA": 18,
        "ELOILLAN": 23,
        "SCHOOLER": 19,
        "BUTAUD": 24,
        "MCTYRE": 65,
        "GRELIDIEN": 80,
        "BEODA": 31,
        "GREG": 83,
        "ADERI": 55
    },
    "ALDO Destiny USA Mall": {
        "ADERI": 33,
        "CAELAN": 31,
        "MIRIRA": 13,
        "ALALIWEN": 51,
        "GRELIDIEN": 7,
        "MCTYRE": 63,
        "ELOILLAN": 35,
        "RASIEN": 88,
        "CADEVEN": 32,
        "SODANO": 7,
        "ABOEN": 28,
        "BUTAUD": 62,
        "SEVIDE": 3,
        "GREG": 78,
        "VENDOGNUS": 30,
        "BEODA": 24,
        "SCHOOLER": 1,
        "CADAUDIA": 30
    },
    "ALDO Pheasant Lane Mall": {
        "MCTYRE": 20,
        "WUMA": 70,
        "BOZZA": 69,
        "CADAUDIA": 95,
        "ADERI": 35,
        "BUTAUD": 82,
        "SEVIDE": 69,
        "ELOILLAN": 57,
        "RASIEN": 3,
        "GREG": 13,
        "GRELIDIEN": 47,
        "VENDOGNUS": 81,
        "MIRIRA": 79,
        "ALALIWEN": 3,
        "SCHOOLER": 97,
        "SODANO": 1,
        "CAELAN": 32,
        "ABOEN": 51,
        "BEODA": 19,
        "CADEVEN": 49
    },
    "ALDO Waterloo Premium Outlets": {
        "SODANO": 54,
        "WUMA": 72,
        "VENDOGNUS": 47,
        "CADAUDIA": 54,
        "BUTAUD": 64,
        "MIRIRA": 39,
        "ABOEN": 4,
        "SCHOOLER": 72,
        "CADEVEN": 94,
        "GREG": 31,
        "RASIEN": 14,
        "MCTYRE": 41,
        "ADERI": 90,
        "CAELAN": 7,
        "BOZZA": 54,
        "ALALIWEN": 95,
        "BEODA": 7,
        "GRELIDIEN": 85,
        "ELOILLAN": 77
    }
}


function listenForEvents(set) {
    ws = new WebSocket(`ws://localhost:${ws_port}/`)
    ws.onmessage = function(event) {
        console.log("Message", event.data)
        set(JSON.parse(event.data));
    }
}

export const aldoListener = readable({}, function start(set) {
    //initiate the socket when subscribing to the svelte store
    listenForEvents(set)
    

    //return unsubscribe function
    return function stop() {
        console.log("Unsubscribe")
        ws.close();
    }
})



export const aldoCache = (function(){
    const cache = {...TEST_DATA}
    let setter;

    const internal_store = derived(aldoListener, ($a, set) => {
        //crude way to persist the setter internally
        setter = set

        const {store, model, inventory} = $a
        if(store && model) {
            console.log("Updating model", store, model, inventory)
            methods.updateModel(store, model, inventory)
        }
    })
    
    const methods = {
        subscribe: internal_store.subscribe,
        updateModel: (store, model, inventory) => {
            if(!cache[store]) {
                cache[store] = {}
            }
            cache[store][model] = inventory
            setter(cache)
        },
        updateBatch: (list) => {
            list.forEach(entry => updateModel(entry.store, entry.model, entry.inventory))
        }
    }
    return methods;
})()



export class AldoCacheManager {
    constructor() {
        this._cache = {} 
        this._store = derived(aldoListener, ($a, set) => {
            const {store, model, inventory} = $a
            if(store && model) {
                console.log("Updating mode", store, model, inventory)
                this.updateModel(store, model, inventory)
                set(this._cache) 
            }
        })
    }
    initModel(list) {

    }

    updateModel(store, model, inventory) {
        if(!this._cache[store]) {
            this._cache[store] = {}
        }
        this._cache[store][model] = inventory
    }
    //allows this to be used as a svelte-store
    subscribe(fn) {
      return this._store.subscribe(fn)
    }
}




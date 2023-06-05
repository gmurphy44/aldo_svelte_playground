// @ts-nocheck
import { derived, readable } from "svelte/store";

let ws; 
const ws_port = "8044"

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
    const cache = {}
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


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore(){
    return new Vuex.Store({
        state:{
            count:0
        },
        actions:{
            increams({commit}){
                setTimeout(() => {
                    commit('add')
                }, 2000);
            }
        },
        mutations:{
            add(state){
                state.count++
            }
        }
    })
}
import { InjectionKey } from 'vue'
import { createStore,useStore as baseUseStore,Store } from 'vuex'
import  { TabType } from '@/store/type/TabType'
export interface State{
  collapse: boolean,
  tabs:Array<TabType>
}
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    collapse:false,
    tabs:[]
  },
  mutations:{
    setCollapse(state:State, collapse: boolean){
      state.collapse = collapse
    },
    addTabs:(state:State,tab:TabType)=>{
      if(state.tabs.some(item=>item.path == tab.path)) return
      state.tabs.push(tab)
      console.log(state.tabs);
      
    }
  },
  getters:{
    getCollapse(state:State){
      return state.collapse
    },
    getTabs(state:State){
      if(state.tabs.length == 0){
        const defaultTab = {
          path:'/dashboard',
          title:'首页'
        }
        state.tabs.push(defaultTab)
      }
      return state.tabs
    }
  }
})

export function useStore (){
  return baseUseStore(key)
}
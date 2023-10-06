import {createStore} from 'vuex'

import metric_graph from './modules/metric_graph'
// import user from './modules/user.js'
// import permission from './modules/permission'
import dataset from './modules/dataset.js'
import algorithm from './modules/algorithm'
import model from './modules/model'
import task_detail from './modules/task_detail'
import server_detail from './modules/server_detail'


const store = createStore({
    mutations:{
        loginIn(state){
            state.isAut=true
        },
        loginOut(state){
            state.isAut=false
            localStorage.removeItem("username")
            state.access=-1
            localStorage.removeItem("access")
            localStorage.removeItem("phone")
        },
        getAut(state){
            // console.log("getAut", state.isAut)
            return state.isAut
        },
        modifyDatasetId(state,datasetId){
            state.datasetId=datasetId
        },
        setAccount(state,newUsername) {
            state.username = newUsername
            localStorage.setItem("username", newUsername)
        },
        setPhone(state,newPhone) {
            state.phone = newPhone
            localStorage.setItem("phone", newPhone)
        },
        setInstitute(state,newInstitute){
            state.institute = newInstitute
            localStorage.setItem("institute", newInstitute)
        },
        getImageList(state){
            return state.imageList
        },
        getAccount(state){
            console.log("getAccount", state.account)
            return state.account
        },
        setAccess(state, access){
            state.access = access
            console.log('setAccess', state.access)
            localStorage.setItem('access', access)
        },
        setTableData(state, Data) {
            state.tableData = Data
        },
        setHistoryRecords(state, records){
            state.HistoryRecords = records
        },
        modifyShowHistoryRecordName(state, recordName){
            state.showHistoryRecordName = recordName
        },
        modifyShowHistoryDatasetId(state, recordDatasetId){
            state.showHistoryDatasetId = recordDatasetId
        },
        modifyshowHistory3DModelPath(state, ModelPath){
            state.showHistory3DModelPath = ModelPath
        },
        // toggleIsCollapse(state){
        //     state.isCollapse = !state.isCollapse
        //     console.log('toggleIsCollapse', state.isCollapse)
        //     localStorage.setItem('isCollapse', state.isCollapse)
        // },
    },
    state(){
        return{
            isAut:false,
            username:'',
            phone:'',
            institute:'',
            datasetId:1,
            imageList:[],
            access: -1,
            HistoryRecords: [],
            showHistoryRecordName:'',
            showHistoryDatasetId:-1,
            showHistory3DModelPath: '',
            tableData:[],
            pictures:[],
            // isCollapse:true,
        }
    },
    actions:{
        // getAut({commit}){
        //     return this.isAut
        // }
    },
    modules: { dataset, algorithm, model, task_detail, server_detail, metric_graph }
})

export default store
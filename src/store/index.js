import { createStore } from 'vuex'
import { getAuthUser, userDB } from '../config/functions'

const state = {
    user: {
        isLoggedIn: false,
        data: null,
    },
    workspace: [],
    workspaceData: [],
    getPreviousRoute: "",
    isWorkSpaceName: "",
    issuesDatas: [],
    getIssue: [],
    todos: [],
    isCollapsed: "",
};

const getters = {
    getallIssues: (state) => state.issues,
    getIssue: (state) => (id) => state.issues.filter(issue => {
        return issue.id === id
    }),
    getDoneIssues: (state) => state.issues.filter(issue => {
        return issue.status === "DONE"
    }),
    getUser(state) {
        return state.user
    },
    getUserID(state) {
        return state
    },
    getWorkspace: (state) => state.workspace,
    getWorkspaceData: (state) => state.workspaceData,
    deleteProject: (state) => (id) =>  state.workspaceData.filter(workspace => {
        return workspace.id === id
    }),
    getPreviousRoute: (state) => state.getPreviousRoute,
    getWorkSpaceName: (state) => state.isisWorkSpaceName,
    getIssuesDatas: (state) => state.issuesDatas,
    getIssueData: (state) => state.getIssue,
    getTodos: (state) => state.todos,
    getCollapsedState: (state) => state.isCollapsed,
};

const actions = {
    async viewIssue({commit}, id) {
      const issue = await state.issues.filter(issue => {
          return issue.id === id
      })
       commit('viewIssue', issue)
    },
    fetchUser({ commit }, user) {
        commit("SET_ISLOGGED_IN", user !== null);
        if(user) {
            commit("SET_USER", {
                displayName: user.displayName,
                email: user.email
            })
        }
        else {
            commit("SET_USER", null);
        }
    },
    async deleteWorkspace ({commit },path)  {
         await getAuthUser().then(user => {
          const isUserDB = userDB.doc(user.uid)
           if(confirm("Areyou sure?")) {
            isUserDB.collection("projects").doc(path).delete()
            commit('DELETE_PROJECT', path)
           }
           else {
               return false
           }
        })
      },


};

const mutations = {
    viewIssue: (state, id) =>  state.issues.filter(issue => {
        return issue.id === id
    }),
    SET_ISLOGGED_IN(state, value) {
        state.user.isLoggedIn = value
    },
    SET_USER(state, data) {
        state.user.data = data
    },
    SET_WORKSPACE (state, data) {
     state.workspace = data
    },
    SET_WORKSPACE_DATA (state, data) {
     state.workspaceData = data
    },
    SET_PREVIOUS_ROUTE (state, route) {
     state.getPreviousRoute = route 
    },
    DELETE_WORKSPACE: (state, path) => state.workspaceData = state.workspaceData.filter(workspace => workspace.path !== path),
    SET_WORKSPACE_NAME (state, workSpaceName) {
        state.isWorkSpaceName = workSpaceName
    },
    SET_ISSUES_DATAS (state, data) {
        state.issuesDatas = data
    },
    SET_ISSUE (state, data) {
         state.getIssue = data
    },
    SET_TODOS (state, data) {
         state.todos = data
    },
    SET_COLLAPSED (state, data) {
        state.isCollapsed = data
    }
};


export default createStore ({
    state,
    getters,
    actions,
    mutations
})
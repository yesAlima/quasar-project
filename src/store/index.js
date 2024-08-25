import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    state: {currentuser: null},
    getters: {
      isAdmin: state => {
        if (state.userProfile && (state.userProfile.access == "sysSuperAdmin" || state.userProfile.access == "sysAdmin")) return true
        return false
      }
    },
    mutations: {
      gmailUser(state, guser) {
          state.gmailUserDetails = guser
        },
      changeCurrentUser(state, user) {
          // mutate state
          state.currentuser = user

      },
      setUserProfile(state, userProfile) {
          // mutate state
          state.userProfile = userProfile
      },
    }
  })

  return Store
})

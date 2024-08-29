import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

import axios from 'axios'
import _ from 'lodash';
import * as moment from "moment/moment.js"

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


const config = {
  apiKey: "AIzaSyByYV9bmmrnunsnqdVk0Lbud9bGthPlRzM",
  authDomain: "tg-ali.firebaseapp.com",
  databaseURL: "https://tg-ali-default-rtdb.firebaseio.com",
  projectId: "tg-ali",
  storageBucket: "tg-ali.appspot.com",
  messagingSenderId: "271369439971",
  appId: "1:271369439971:web:8fda578530b904688d93d6",
  measurementId: "G-F6RE51NT3R"
};
const fireApp = firebase.initializeApp(config)
export const appAUTH = fireApp.auth()
export const appDB = fireApp.database()
export const appStorage = fireApp.storage()
export default boot(({ app }) => {
  const i18n = createI18n({
    locale: 'en-US',
    globalInjection: true,
    messages
  })

  app.config.globalProperties.axios= axios
  app.config.globalProperties.$crmAUTH = appAUTH
  app.config.globalProperties.$crmDB = appDB
  app.config.globalProperties.$crmSTORAGE = appStorage
  app.config.globalProperties.$_lodash = _
  app.config.globalProperties.$moment = moment


  // Set i18n instance on app
  app.use(i18n)
})

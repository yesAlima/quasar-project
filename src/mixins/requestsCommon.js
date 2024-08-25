import { Loading, QSpinnerRings } from 'quasar'
import { required, email, mobile, notreqmobile } from "./validation";
export default {
  name: 'requestsCommon',
  computed: {
    db() {
      return this.$crmDB
    },
    storage() {
      return this.$crmSTORAGE
    },
    crmAUTH() {
      return this.$crmAUTH
    },
    apiURL() {

      // return "http://192.168.196.20:8000/api"
      if (this.$store.state.userProfile && this.$store.state.userProfile.workingfrom == 'out')
        return "http://109.161.174.225:8080/api"
      else
        return "http://10.10.40.137:8080/api"


    },

    imgsLink() {
      var workingfrom = this.$store.state.userProfile && this.$store.state.userProfile.workingfrom ? this.$store.state.userProfile.workingfrom : 'office';

      return (workingfrom == "office" || workingfrom == "tg")
        ? "http://10.10.40.234:9999/" + "Uploads/PolicyAttachments/"
        : "http://109.161.174.225:999/" + "Uploads/PolicyAttachments/";
    },



  },
  data() {
    return {
      spinnerLoad: false,
      paginationTable: {
        sortBy: null, // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 0 // current rows per page being displayed
      },
    }
  },
  methods: {
    email,
    required,
    mobile,
    notreqmobile,
    loading: function (msg) {
      var showmsg
      if (!msg)
        showmsg = "Getting Your Request"
      else
        showmsg = msg
      this.$q.loading.show({
        spinnerColor: "secondary",
        spinnerSize: 140,
        backgroundColor: "primary",
        message: "Some important process is in progress. Hang on...",
        messageColor: "white"
      })
    },
    hideloading() {
      this.$q.loading.hide()
    },
    snotify: function (msg) {
      this.$q.notify({
        position: 'bottom',
        message: msg,
        icon: 'thumb_up',
        color: 'positive'
      })
    },
    fnotify: function (msg) {
      this.$q.notify({
        position: 'bottom',
        message: msg,
        icon: 'report_problem',
        color: 'negative'
      })
    },
    onAttSizeRejected(rejectedEntries) {
      this.fnotify(`${rejectedEntries.length} file(s) did not pass size validation constraints`)
    },
    StartOfDayTStamp(ddate) {
      if (ddate)
        return this.$moment(this.$moment(ddate).format('YYYY-MM-DD')).startOf('day').valueOf()
      return this.$moment(this.$moment().format('YYYY-MM-DD')).startOf('day').valueOf()
    },
    roundfun(num, decimalplaces) {
      var decp = decimalplaces
      if (!decimalplaces)
        decp = 3
      if (num == '-') return '-'
      if (num || num == 0)
        // return Math.round(num,decp)
        return Math.round(num * 10**decp) / (10**decp)

      // return roundTo(parseFloat(num), decp)
      else
        return null


    },


  }

}

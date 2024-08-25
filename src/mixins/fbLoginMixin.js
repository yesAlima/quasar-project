import requestsCommon from "../mixins/requestsCommon";
import firebase from "firebase/app";

export default {
  name: "fbloginMixin",
  mixins: [requestsCommon],

  data() {
    return {
      userEmail: null,
      password: null,
      provider: null,
    };
  },
  methods: {
    currentuser() {
      var self = this;
      self.loading();
      this.$crmAUTH.onAuthStateChanged(function (user) {
        if (user) {
          var loginCheckref = self.$crmDB.ref("/loginCheck");
          loginCheckref.once(
            "value",
            (snapshot) => {
              self.accessSysAfterCurrentUser(user);
            },
            (error) => {
              self.fnotify(
                "You are not authorized to access the system, Ask Amina Darwish or Ali to add you."
              );
              if (self.$route.path !== "/loginpage")
                self.$router.push("/loginpage");

              self.hideloading();
            }
          );
        } else {
          // No user is signed in.
          self.$store.commit("changeCurrentUser", null);
          self.hideloading();
          //   console.log(self.$route.path)
          if (self.$route.path !== "/loginpage")
            self.$router.push("/loginpage");
          console.log("no user signed in");
        }
      });
    },
    googleLogin() {
      console.log("googleLogin");
      var self = this;
      this.provider = new firebase.auth.GoogleAuthProvider();
      // this.provider.addScope("https://www.googleapis.com/auth/calendar");
      // this.provider.addScope("https://www.googleapis.com/auth/drive");
      this.provider.setCustomParameters({
        login_hint: "Ask Amina Darwish or Ali to give your gmail account",
      });

      firebase
        .auth()
        .signInWithPopup(this.provider)
        .then(function (result) {
          var loginCheckref = self.$crmDB.ref("/loginCheck");
          loginCheckref.once(
            "value",
            (snapshot) => {
              self.accessSysAfterGoogleLogin(result);
            },
            (error) => {
              self.fnotify(
                "You are not authorized to access the system, Ask Amina Darwish or Ali to add you."
              );
            }
          );
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
          self.fnotify(error.message);
          // The email of the user's account used.
          // var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          // var credential = error.credential;
          // ...
        });
    },

    accessSysAfterGoogleLogin(result) {
      var self = this;
      //  This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      console.log(token);
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      self.$store.commit("gmailUser", {
        photoURL: user.photoURL,
        email: user.email,
        displayName: user.displayName,
        token: token,
      });

      if (self.$route.path !== "/" && self.$route.path !== "")
        self.$router.push("/");

      return true;
    },
    logout() {
      var self = this;
      self.$store.commit("changeCurrentUser", null);
      self.$store.commit("gmailUser", null);
      self.userEmail = null;
      self.password = null;
      this.$crmAUTH
        .signOut()
        .then(function () {
        })
        .catch(function (error) {
          self.fnotify(error.message);
        });
    },
    accessSysAfterCurrentUser(user) {
      var self = this;
      self.hideloading();
      self.userEmail = user.email;
      self.$store.commit("changeCurrentUser", user.email);
      self.$store.commit("gmailUser", {
        photoURL: user.photoURL,
        email: user.email,
        displayName: user.displayName,
        token: localStorage.calenderToken,
      });
      self.getUserProfile(user.email);
    },
    getUserProfile(email) {
      var self = this;
      if (!email) return;

      this.db
        .ref("/users")
        .orderByChild("email")
        .equalTo(email)
        .on(
          "value",
          (snapshot) => {
            if (!snapshot.val()) {
              console.log("user does not exist ,  in  profiles ");
            } else {
              console.log("user exists", snapshot.val());
              var obj = snapshot.val()[Object.keys(snapshot.val())[0]];
              obj.key = Object.keys(snapshot.val())[0];
              self.$store.commit("setUserProfile", obj);
            }
          },
          (error) => {
            self.fnotify(error.message);
          }
        );
    },
  },
};

import firebaseApp from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

let firebaseConfig = {
  apiKey: "AIzaSyCr5mCRt9bGwobghuPfnWQ-sxEUt0g5GiE",
  authDomain: "reactapp-3c196.firebaseapp.com",
  databaseURL: "https://reactapp-3c196.firebaseio.com",
  projectId: "reactapp-3c196",
  storageBucket: "reactapp-3c196.appspot.com",
  messagingSenderId: "369452747759",
  appId: "1:369452747759:web:0880d7aa90bb644382041a",
  measurementId: "G-EH2JH8GS7Y"
};

class Firebase {
  constructor() {
    // Initialize Firebase
    if (!firebaseApp.apps.length) {
      firebaseApp.initializeApp(firebaseConfig);
    }
    this.database = firebaseApp.database()
    this.storage = firebaseApp.storage()
  }
  login(email, password) {
    return firebaseApp.auth().signInWithEmailAndPassword(email, password)
  }
  logout(){
    return firebaseApp.auth().signOut()
  }
  async register(nome, email, password) {
    await firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    const uid = firebaseApp.auth().currentUser.uid
    return firebaseApp.database().ref('usuarios').child(uid).set({ nome: nome })
  }
  isInitialized() {
    return new Promise((resolve) => {
      firebaseApp.auth().onAuthStateChanged(resolve)
    })
  }
  getCurrent() {
    return firebaseApp.auth().currentUser && firebaseApp.auth().currentUser.email
  }
  getCurrentUid(){
    return firebaseApp.auth().currentUser && firebaseApp.auth().currentUser.uid
  }
  async getUserName(callback) {
    if (!firebaseApp.auth().currentUser) {
      return null
    }
    const uid = firebaseApp.auth().currentUser.uid
    await firebaseApp.database().ref('usuarios').child(uid)
      .once('value', callback)
  }
}
export default new Firebase()
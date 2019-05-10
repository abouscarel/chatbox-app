import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

// Init firebase with config
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD2o0r125NtgqMAUdJn2TMsW1rQCpgN8aM",
    authDomain: "chatbox-app-f1f00.firebaseapp.com",
    databaseURL: "https://chatbox-app-f1f00.firebaseio.com",
})

// Use Rebase (community wrapper) instead of firebase for database
const base = Rebase.createClass(firebase.database())

export { firebaseApp }

export default base
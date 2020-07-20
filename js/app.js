(function () {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyD49BT26a5AIuD3mIRJlpZGOg0-06yJnC8",
        authDomain: "mineko-1.firebaseapp.com",
        databaseURL: "https://mineko-1.firebaseio.com",
        projectId: "mineko-1",
        storageBucket: "mineko-1.appspot.com",
        messagingSenderId: "416600253190",
        appId: "1:416600253190:web:21967ef9d9707b0ec3b487"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Get elements
    const inputSection = document.getElementById('inputSection');
    const operationSection = document.getElementById('operationSection');
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnLogout = document.getElementById('btnLogout');
    const btnGathering = document.getElementById('btnGathering');
    const lblUser = document.getElementById('lblUser');

    function displayUser(firebaseUser) {
        const { email } = firebaseUser;
        lblUser.innerText = email;
    }

    function displayLoginSection() {
        inputSection.classList.remove('hide');
        operationSection.classList.add('hide');
        btnLogin.classList.remove('hide');
        btnLogout.classList.add('hide');
    }

    function hideLoginSection() {
        inputSection.classList.add('hide');
        operationSection.classList.remove('hide');
        btnLogin.classList.add('hide');
        btnLogout.classList.remove('hide');
    }

    async function GatheringResult(sdate) {
        try {
            const response = await fetch(`https://us-central1-mineko-1.cloudfunctions.net/SearchAndGatheringPsc3YrsLottoPrizeListByDate?sdate=${sdate}`);
            console.log(response);
            ///const result = await fetch(`https://us-central1-test-exe91.cloudfunctions.net/app/hello`, {mode: 'no-cors'});
            // const url = `https://us-central1-test-exe91.cloudfunctions.net/app/hello`; // site that doesn’t send Access-Control-*
            // fetch(url)
            //     .then(response => response.text())
            //     .then(contents => console.log(contents))
            //     .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
            // console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    function onGatheringClick() {
        console.log('onGatheringClick');
        const txtDate = document.getElementById('txtDate');
        const sdate = txtDate.value.trim();
        GatheringResult(sdate);
    }

    // Add login event
    btnLogin.addEventListener('click', e => {
        // Get email and pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    // Add log out event
    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();  // sign out authenticated user ปัจจุบันที่ login อยู่
    });

    // Add gathering event
    btnGathering.addEventListener('click', onGatheringClick);

    // // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            displayUser(firebaseUser);
            hideLoginSection();
        } else {
            console.log('not logged in');
            displayLoginSection();
        }
    });
}());
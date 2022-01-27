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
    const loaderElem = document.querySelector('.loader');
    const overlayElem = document.querySelector('.overlay');
    const snackbarElem = document.querySelector('.snackbar');

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

    function displayResult(message) {
        // Add the "show" class to DIV
        snackbarElem.classList.add('show');

        snackbarElem.innerText = message;
      
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ snackbarElem.classList.remove('show'); }, 3000);
      }

    async function GatheringResult(sdate) {
        try {
            const response = await fetch(`https://us-central1-mineko-1.cloudfunctions.net/SearchAndGatheringPsc3YrsLottoPrizeListByDate?sdate=${sdate}`);
            const result = await response.json();
            console.log(result);
            const { message } = result;
            // hide Loader
            hideLoader();
            // display snackbar message
            displayResult(message);
            document.getElementById('txtDate').value = "";
        } catch (error) {
            console.log(error);
            // hide Loader
            hideLoader();
            // display snackbar message
            displayResult('Has error');
        }
    }

    function showLoader() {
        loaderElem.classList.add('visible');
        overlayElem.style.width = "100%";
        document.body.classList.add('wait');
    }

    function hideLoader() {        
        loaderElem.classList.remove('visible');
        overlayElem.style.width = "0%";
        document.body.classList.remove('wait');
    }

    function onGatheringClick() {
        // display Loader
        showLoader();
        const txtDate = document.getElementById('txtDate');
        const sdate = txtDate.value.trim();
        // setTimeout(() => {
        //     GatheringResult(sdate);  
        // }, 5000);
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
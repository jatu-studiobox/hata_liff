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
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');

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

    // Add signup event
    btnSignUp.addEventListener('click', e => {
        // Get email and pass
        // TODO: CHECK 4 REAL EMAILZ // ควรจะมีการ check ว่า input email เป็น email จริงด้วย
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);   // หลังจาก create user แล้วไม่เกิดอะไรขึ้น
        promise.catch(e => console.log(e.message)); // ไม่สามารถใช้ promise.then ดึงข้อมูล user ได้ด้วยเนื่องจากถูกทิ้งไปแล้ว เลยทำให้ไม่รู้ว่า user ถูก create รึเปล่า
    });

    // Add log out event
    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();  // sign out authenticated user ปัจจุบันที่ login อยู่
    });

    // // Add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {  // ใช้ตรวจสอบเมื่อมีการเปลี่ยน state ของการ Authen
        if (firebaseUser) { // ตรวจสอบ firebase user ว่าไม่เท่ากับ null (ถ้าเป็น null แสดงว่าไม่มีข้อมูล firebase user)
            console.log(firebaseUser);
            btnLogout.classList.remove('d-none');   // เอา css class 'd-none' ออก เพื่อแสดงปุ่ม logout ออกมา
        } else {
            console.log('not logged in');
            btnLogout.classList.add('d-none');   // เพิ่ม css class 'd-none' เข้าไป เพื่อซ่อนปุ่ม logout
        }
    });
}());
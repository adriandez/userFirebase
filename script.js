import { firebaseConfig } from './config.js'

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore(); // Objeto que representa la BBDD

const crearUsuario = (dataUser) => {

    db.collection("users").add(dataUser)
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

}

const readAllUsers = () => {
    db
    .collection("users")
    .get()
    .then((querySnapshot) => {
        console.log(querySnapshot.length);
        querySnapshot.forEach((doc) => {
            console.log(doc.id);
            printData(doc.data(), doc.id)
        });
    });
}

let newUser = (nom, email, msg) => {
    let user ={
        nombre: nom,
        mail: email,
        mensaje: msg
    }
    return user
}

const addSubmit = () => {
    let brSubmit1 = document.createElement("br");
    document.getElementById("fieldset").appendChild(brSubmit1);

    let inputSend = document.createElement("input")
    inputSend.id = "SendForm";
    inputSend.name = "SendForm";
    inputSend.value = "Enviar";
    inputSend.type = "submit";
    document.getElementById("fieldset").appendChild(inputSend);
};

addSubmit();

document.getElementById("formulario").addEventListener("submit", (event) => {

    event.preventDefault();

    const nombre = document.getElementById("nombre").value
    const email = document.getElementById("email").value
    const mensaje = document.getElementById("mensaje").value


    crearUsuario(newUser(nombre, email, mensaje));

    readAllUsers();
})

const printData = (docData, id) => {
        console.log(docData);
        document.getElementById(`${id}`) !== null ? document.getElementById(`${id}`).remove() : ""

        const div = document.createElement("div")
        div.id = `${id}`
        document.getElementById("seccion").appendChild(div)

        const ul = document.createElement("ul")
        ul.id = `pintar${id}`
        document.getElementById(`${id}`).appendChild(ul)

        const li = document.createElement("li")
        document.getElementById(`pintar${id}`).appendChild(li)
        const liTxt = document.createTextNode(`Nombre: ${docData.nombre}, Email: ${docData.mail}, Mensaje: ${docData.mensaje}`)
        li.appendChild(liTxt)

        const botonBorrar = document.createElement("input")
        botonBorrar.type = "button"
        botonBorrar.id = `${id}`
        botonBorrar.value = "Borrar usuario"
        botonBorrar.addEventListener("click", borrado)
        document.getElementById(`${id}`).appendChild(botonBorrar)
}

const borrado = (event) => {
    let id = event.target.id
    db
        .collection('users').doc(`${id}`)
        .delete()
        .then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        document.getElementById("seccion").innerHTML = ""
        readAllUsers()
}

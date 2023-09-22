let array = [];
let editarID = '';

const URL = 'https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo255';

setInterval(() => {
    mostrarDatos();
}, 5000);

const submit = document.getElementById('submit');


submit.addEventListener('click', () => {
    
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let grupo = document.getElementById('grupo').value;
    let numero = document.getElementById('numero').value;

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            grupo: grupo,
            room: numero
        })
    })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            
            //Lo vuelvo a declarar porque no se por que razon no los puedo modificar
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('grupo').value = '';
            document.getElementById('numero').value = '';
        });

    mostrarDatos();
});


function mostrarDatos() {
    contenedor.innerHTML = '';

    fetch(URL)
        .then(response => response.json())
        .then(data => {
            console.log('Datos obtenidos:', data);

            let lista = document.createElement('ul');
            lista.classList.add('list-group', 'm-5');

            array = data;

            array.forEach(element => {
                let li = document.createElement('li');
                let nombre = element.nombre;
                let apellido = element.apellido;
                let grupo = element.grupo;
                let room = element.room;
                let id = element._id;

                li.innerHTML = `
                            <li>${nombre}</li>
                            <li>${apellido}</li>
                            <li>${grupo}</li>
                            <li>${room}</li>
                            <button id="${id}" class="eliminar"><i class='bx bx-message-square-x'></i></button>
                            <button id="${id}" class="editar">Editar</button>
                            `;

                lista.appendChild(li);
            });

            contenedor.appendChild(lista);

            const eliminarData = document.querySelectorAll(".eliminar");

            eliminarData.forEach(eliminar => {
                eliminar.addEventListener('click', () => {
                    const id = eliminar.id;


                    fetch(URL + "/" + id, {
                        method: 'DELETE',
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8'
                        },
                    });
                });
            });

        })
}


const contenedor = document.getElementById('contenedor');
const modificar = document.getElementById('editarForm'); 

modificar.addEventListener('click', () => {

    modificar.classList.toggle('no-visible');
    submit.classList.toggle('no-visible');

    let nuevoNombre = document.getElementById('nombre').value;
    let nuevoApellido = document.getElementById('apellido').value;
    let nuevoGrupo = document.getElementById('grupo').value;
    let nuevoRoom = document.getElementById('numero').value;

    fetch(URL + "/" + editarID, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nuevoNombre,
            apellido: nuevoApellido,
            grupo: nuevoGrupo,
            room: nuevoRoom,
        })

    })
        .then(response => response.json())
        .then(data => {
            console.log('Datos actualizados y respuesta recibida:', data)
        })
        
    nombre.value = " ";
    apellido.value = " ";
    grupo.value = " ";
    numero.value = " ";
});

//Tuve que hacer esto porque fue la única forma de que tomara las clases de editar, no me funcionó con queryselectorAll o con otras formas.
contenedor.addEventListener('click', (event) => {
    if (event.target.classList.contains('editar')) {
        editarID = event.target.id;

        let elementoAEditar = array.find(element => element._id === editarID);

        if (elementoAEditar) {
            modificar.classList.toggle('no-visible');
            submit.classList.toggle('no-visible');

            nombre.value = elementoAEditar.nombre;
            apellido.value = elementoAEditar.apellido;
            grupo.value = elementoAEditar.grupo;
            numero.value = elementoAEditar.room;
        }
    }
});


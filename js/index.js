document.addEventListener("DOMContentLoaded", () => {
    const URL = 'https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo255';

    setInterval(() => {
        console.log('1500 segundos');
        mostrarDatos();
    }, 5500);

    const submit = document.getElementById('submit');

    submit.addEventListener('click', async () => {
        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let grupo = document.getElementById('grupo').value;
        let number = document.getElementById('numero').value;

        try {
            const response = await fetch(URL, {
                headers: { "Content-Type": "application/json; charset=utf-8" },
                method: 'POST',
                body: JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                    grupo: grupo,
                    number: number
                })
            });
            const data = await response.json();
            console.log(data);
            mostrarDatos();
        } catch (error) {
            console.error("Error al agregar el elemento:", error);
        }
    });

    const contenedor = document.getElementById('contenedor');

    async function mostrarDatos() {
        contenedor.innerHTML = '';

        try {
            const resp = await fetch(URL);
            const datos = await resp.json();

            let lista = document.createElement('ul');
            lista.classList.add('list-group', 'm-5');
            
            let array = datos;

            array.forEach(element => {
                let li = document.createElement('li');
                let nombre = element.nombre;
                let apellido = element.apellido;
                let grupo = element.grupo;
                let number = element.number;
                let id = element._id;

                li.innerHTML = `
                    <li>${nombre}</li>
                    <li>${apellido}</li>
                    <li>${grupo}</li>
                    <li>${number}</li>
                    <button id="${id}" class="eliminar"><i class='bx bx-message-square-x'></i></button>
                    <br>`;
                
                lista.appendChild(li);
            });

            contenedor.appendChild(lista);

            const eliminarData = document.querySelectorAll(".eliminar");

            eliminarData.forEach(eliminar => {
                eliminar.addEventListener('click', async () => {
                    const id = eliminar.id;

                    try {
                        await fetch(URL + "/" + id, {
                            method: 'DELETE',
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8'
                            },
                        });
                        mostrarDatos();
                    } catch (error) {
                        console.error("Error al eliminar el elemento:", error);
                    }
                });
            });
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    }


});

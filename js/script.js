let botonNuevaTarea = document.getElementById('nuevaTareaToDo');
let popup = document.querySelector('.popUpWrapper');
let botonSave = document.querySelector('#saveChangesButton');
let tituloGeneralPopUp = document.querySelector('.popUpForm').children[0];
botonSave.style.display = 'none';

let idArticuloClicado;
let articuloElegido;
let articulosContador = 0;
let arrayTareas = [];

botonNuevaTarea.addEventListener('click', () => {
    //Reset inputs
    document.getElementById('titulo').value = "";
    document.getElementById('descripcion').value = "";
    document.getElementById('asignacion').value = "";
    //Show popup
    popup.style.display = 'block';
    botonEnviarTarea.style.display = 'block';

});

let botonSalirPopup = document.querySelector('.popUpClose > button');

botonSalirPopup.addEventListener('click', () => {
    popup.style.display= 'none';
    botonSave.style.display = 'none';
    tituloGeneralPopUp.innerText = "New Task";

});

popup.addEventListener('click', e => {
    if (e.target.className === 'popUpWrapper') {
        popup.style.display = 'none';
        botonEnviarTarea.style.display = 'block';
        botonSave.style.display = 'none';
        tituloGeneralPopUp.innerText = "New Task";
    }
});

const botonEnviarTarea = document.getElementById('botonEnviarTarea');

let tituloTareaNueva = "";
let descTareaNueva = "";
let asignacionTareaNueva = "";
let columnaReferencia = "";


botonEnviarTarea.addEventListener('click', () => {

    tituloTareaNueva = document.getElementById('titulo').value;
    descTareaNueva = document.getElementById('descripcion').value;
    asignacionTareaNueva = document.getElementById('asignacion').value;
    
    popup.style.display = 'none';

    let laFecha = new Date();
    let fecha = laFecha.toLocaleDateString();
    crearNuevaTarea(tituloTareaNueva, descTareaNueva, asignacionTareaNueva, fecha);

});



function crearNuevaTarea (titulo, desc, fecha, asignacion, columna) {

    let IdTarea = arrayTareas.length + 1;

    let BotonCerrarTarea = document.createElement('Button');
    BotonCerrarTarea.innerText = "X";
    BotonCerrarTarea.classList.add('botonCerrarTarea');


    let BotonEditarTarea = document.createElement('Button');
    BotonEditarTarea.innerText = "-/-";
    BotonEditarTarea.classList.add('botonEditarTarea');
    BotonEditarTarea.addEventListener('click', modificarTarea) //Agregamos listener para modificar tareas

    

    let Titulo = document.createElement('h3');
    Titulo.innerText = titulo;
    Titulo.classList.add('tituloTarea');

    let Descripcion = document.createElement('p');
    Descripcion.innerText = desc;
    Descripcion.classList.add('descTarea');

    let Asignado = document.createElement('p');
    Asignado.innerText = asignacion;
    Asignado.classList.add('asignadoTarea');

    let Fecha = document.createElement('p');
    Fecha.innerText = fecha;
    Fecha.classList.add('fechaTarea');

    let Columna = columna;

    let Articulo = document.createElement('article');
    Articulo.classList.add('task');
    Articulo.draggable="true";
    Articulo.id = articulosContador + 1;

    //Construimos HTML
    Articulo.appendChild(BotonCerrarTarea);
    Articulo.appendChild(BotonEditarTarea);
    Articulo.appendChild(Titulo);
    Articulo.appendChild(Descripcion);
    Articulo.appendChild(Fecha);
    Articulo.appendChild(Asignado);

    //Localizar Columna 1 e Insertar Articulo nuevo
    const columna1dentro = document.querySelector('.toDoContainer')
    columna1dentro.insertAdjacentElement("afterbegin", Articulo);

    //Sumamos un articulo al contador
    articulosContador++;

    //Agregamos Listener mousedown
    Articulo.addEventListener('mousedown', ponerListener);
    
    function ponerListener(e) {

    idArticuloClicado = Articulo.id;
    ActivarListeners(idArticuloClicado);

    }

    //Agregamos Listener para Eliminar Tareas
    BotonCerrarTarea.addEventListener('click', eliminarTarea)

    function eliminarTarea (e) {
        //let articuloPadre = e.target.parentNode;
        Articulo.innerHTML = "";
        Articulo.id = "";
        articulosContador--;
    }

   
}



function modificarTarea (e) {
        //Selecting values to modify
        let tareaClicadaModificable = e.target.parentNode;
        let tituloPopUp = document.querySelector('.popUpForm').children[0];
        let botonPopUpEnviar = document.querySelector('#botonEnviarTarea');
        let tituloModificable = tareaClicadaModificable.children[2];
        let descModificable = tareaClicadaModificable.children[3];
        let asignacionModificable = tareaClicadaModificable.children[4];    

        botonPopUpEnviar.style.display = 'none';
        botonSave.style.display = 'block';
        
        tituloPopUp.innerText = "Edit Task";
        document.getElementById('titulo').value = tituloModificable.innerText;
        document.getElementById('descripcion').value = descModificable.innerText;
        document.getElementById('asignacion').value = asignacionModificable.innerText;


        botonSave.addEventListener('click', guardarCambios);

        function guardarCambios() {


            let tituloTareaModificar = document.getElementById('titulo').value;
            let descTareaModificar = document.getElementById('descripcion').value;
            let asignacionTareaModificar = document.getElementById('asignacion').value;


            tituloModificable.innerText = tituloTareaModificar;
            descModificable.innerText = descTareaModificar;
            asignacionModificable.innerText = asignacionTareaModificar;
            popup.style.display = 'none';
            botonSave.style.display = 'none';
            tituloGeneralPopUp.innerText = "New Task";

            botonSave.removeEventListener('click', guardarCambios);
            console.log('Se han guardado los cambios');
        }

        //Show popup
        popup.style.display = 'block';

        
    }



//Seleccionamos columnas contenedoras
const columna1 = document.querySelector('.column1');
const columna2 = document.querySelector('.column2');
const columna3 = document.querySelector('.column3');


function ActivarListeners(articleSelected) {

    let articuloElegido = document.getElementById(articleSelected);
   
 

    //tenemos nuestro articulo
    console.log("La id del articulo clicado es: " + articuloElegido.id);
    
    //Eventos de Drag
    articuloElegido.addEventListener('dragstart', e=> {
        e.stopPropagation();
        
    });

    articuloElegido.addEventListener('dragend', e=> {
        e.stopPropagation();
        
    });

    articuloElegido.addEventListener('drag', e=> {
        e.stopPropagation();
        
    });


    //Destino del Drag
    columna1.addEventListener('dragenter', e=> {
        e.preventDefault();
        e.stopPropagation();
        columna1.className += ' hovered';
        

    });
    columna2.addEventListener('dragenter', e=> {
        e.preventDefault();
        e.stopPropagation();
        columna2.className += ' hovered';
        

    });
    columna3.addEventListener('dragenter', e=> {
        e.preventDefault();
        e.stopPropagation();
        columna3.className += ' hovered';
        

    });

    
    columna1.addEventListener('dragleave', e=> {
        e.stopPropagation();
        columna1.className = 'column1';
        

    });
    columna2.addEventListener('dragleave', e=> {
        e.stopPropagation();
        columna2.className = 'column2';
        

    });
    columna3.addEventListener('dragleave', e=> {
        e.stopPropagation();
        columna3.className = 'column3';
        

    });

    
    columna1.addEventListener('dragover', e=> {
        
        e.preventDefault();
        e.stopPropagation();
        columna1.className += ' hovered';

    });
    columna2.addEventListener('dragover', e=> {
        
            e.preventDefault();
            e.stopPropagation();
        columna2.className += ' hovered';

    });
    columna3.addEventListener('dragover', e=> {
        
            e.preventDefault();
            e.stopPropagation();
        columna3.className += ' hovered';

    });

    
    columna1.addEventListener('drop', AppendCol1);
    columna2.addEventListener('drop', AppendCol2);
    columna3.addEventListener('drop', AppendCol3);

    function AppendCol1(e) {
        e.stopPropagation();
        columna1.className = 'column1';
        columna1.appendChild(articuloElegido);
        columna1.removeEventListener('drop', AppendCol1);
        columna2.removeEventListener('drop', AppendCol2);
        columna3.removeEventListener('drop', AppendCol3);
    }
    function AppendCol2(e) {
        e.stopPropagation();
        columna2.className = 'column2';
        columna2.appendChild(articuloElegido);
        columna1.removeEventListener('drop', AppendCol1);
        columna2.removeEventListener('drop', AppendCol2);
        columna3.removeEventListener('drop', AppendCol3);       
    }
    function AppendCol3(e) {
        e.stopPropagation();
        columna3.className = 'column3';
        columna3.appendChild(articuloElegido); 
        columna1.removeEventListener('drop', AppendCol1);
        columna2.removeEventListener('drop', AppendCol2);
        columna3.removeEventListener('drop', AppendCol3);
    }
    
        
    




}
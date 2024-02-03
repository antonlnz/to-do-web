// Obtén los elementos del DOM
let listaTareas = document.getElementById('listaTareas');
let listaTareasCompletadas = document.getElementById('listaTareasCompletadas');
let tituloTareasPendientes = document.querySelector('h2');
let tituloTareasCompletadas = document.querySelectorAll('h2')[1];

document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();
    var tituloTarea = document.getElementById('tituloTarea').value;
    var descripcionTarea = document.getElementById('descripcionTarea').value;
    var fechaLimite = document.getElementById('fechaLimite').value;
    var div = document.createElement('div');
    div.className = 'tarea';
    div.innerHTML = '<div class="tarea_title"><input type="checkbox" aria-label="Marcar como completada"> <span>' + tituloTarea +'</span><p>Fecha límite: ' + fechaLimite +'</p><div><button class="edit" aria-label="Editar tarea">editar</button><button aria-label="Eliminar tarea"><i class="fa fa-trash"></i></button></div></div><div class="tarea_descripcion"><p>' + descripcionTarea + '</p></div>';
    document.getElementById('listaTareas').appendChild(div);
    document.getElementById('tituloTarea').value = '';
    document.getElementById('descripcionTarea').value = '';
    document.getElementById('fechaLimite').value = '';
    actualizarTitulos();
});

document.getElementById('listaTareas').addEventListener('change', function(event) {
    if (event.target.tagName === 'INPUT') {
        var tareaCompletada = event.target.parentNode.parentNode;
        document.getElementById('listaTareas').removeChild(tareaCompletada);
        document.getElementById('listaTareasCompletadas').appendChild(tareaCompletada);
        actualizarTitulos();
    }
});

// Función para eliminar tareas de la lista de tareas completadas
document.getElementById('listaTareasCompletadas').addEventListener('click', function(event) {
    if (event.target.classList.contains('fa-trash')) {
        event.target.closest('.tarea').remove();
        actualizarTitulos();
    }
});

// Función para eliminar tareas de la lista de tareas pendientes
document.getElementById('listaTareas').addEventListener('click', function(event) {
    if (event.target.classList.contains('fa-trash')) {
        event.target.closest('.tarea').remove();
        actualizarTitulos();
    }
});

// Función para devolver las tareas de la lista de tareas completadas a la lista de tareas pendientes
document.getElementById('listaTareasCompletadas').addEventListener('change', function(event) {
    if (event.target.tagName === 'INPUT' && !event.target.checked) {
        var tareaNoCompletada = event.target.parentNode.parentNode;
        document.getElementById('listaTareasCompletadas').removeChild(tareaNoCompletada);
        document.getElementById('listaTareas').appendChild(tareaNoCompletada);
        actualizarTitulos();
    }
});


// Función marcar todas
document.getElementById('filaNoCompletadas').addEventListener('change', function(event){
    if (event.target.tagName === 'INPUT'){
        var listaTareas = document.getElementById('listaTareas');
        var listaTareasCompletadas = document.getElementById('listaTareasCompletadas');
        event.target.checked = false;


        while (listaTareas.childElementCount > 0){
            var tarea = listaTareas.childNodes[1];
            tarea.childNodes[0].childNodes[0].checked = true;
            listaTareas.removeChild(tarea);
            listaTareasCompletadas.appendChild(tarea);
        }       
        
        actualizarTitulos();
    }
});

// Desmarcar todas
document.getElementById('filaCompletadas').addEventListener('change', function(event){
    if (event.target.tagName === 'INPUT'){
        var listaTareas = document.getElementById('listaTareas');
        var listaTareasCompletadas = document.getElementById('listaTareasCompletadas');
        event.target.checked = false;


        while (listaTareasCompletadas.childElementCount > 0){
            var tarea = listaTareasCompletadas.childNodes[0];
            tarea.childNodes[0].childNodes[0].checked = false;
            listaTareasCompletadas.removeChild(tarea);
            listaTareas.appendChild(tarea);
        }       
        
        actualizarTitulos();
        
    }
});

// Eliminar todas no completadas
document.getElementById('innerButtonNoCompletadas').addEventListener('click', function(event){
    if (event.target.tagName === 'BUTTON'){
        var listaTareas = document.getElementById('listaTareas');

        while (listaTareas.childElementCount > 0){
            var tarea = listaTareas.childNodes[0];
            listaTareas.removeChild(tarea);
        }       
        
        actualizarTitulos();
        
    }
});

// Eliminar todas completadas
document.getElementById('innerButtonCompletadas').addEventListener('click', function(event){
    if (event.target.tagName === 'BUTTON'){
        var listaTareasCompletadas = document.getElementById('listaTareasCompletadas');

        while (listaTareasCompletadas.childElementCount > 0){
            var tarea = listaTareasCompletadas.childNodes[0];
            listaTareasCompletadas.removeChild(tarea);
        }       
        
        actualizarTitulos();
        
    }
});

// Implementar los indicadores de tareas pendientes y tareas completadas
// Función para contar tareas
function contarTareas() {
    let numTareasPendientes = listaTareas.children.length;
    let numTareasCompletadas = listaTareasCompletadas.children.length;
    let totalTareas = numTareasPendientes + numTareasCompletadas;
    return [numTareasPendientes, numTareasCompletadas, totalTareas];
}

// Función para actualizar títulos
function actualizarTitulos() {
    let [numTareasPendientes, numTareasCompletadas, totalTareas] = contarTareas();
    tituloTareasPendientes.textContent = `Tareas Pendientes (${numTareasPendientes} de ${totalTareas})`;
    tituloTareasCompletadas.textContent = `Tareas Completadas (${numTareasCompletadas} de ${totalTareas})`;
}

document.getElementById('listaTareas').addEventListener('click', function(event) {
    if (event.target.classList.contains('edit')) {        
        var tarea = event.target.closest('.tarea').childNodes[1];
        
        var editButton = event.target.closest('.tarea').childNodes[0].childNodes[4].childNodes[0];

        event.target.closest('.tarea').childNodes[0].childNodes[4].childNodes[0] = document.createElement('button');
        editButton.classList = ['acceptButton'];
        editButton.innerHTML = 'Ok';
        
        

        if(tarea.childNodes[0].childNodes.length == 0){
            tarea.innerHTML = '<textarea id="editArea" maxlength="250" id="descripcionTarea" placeholder="Descripción de la tarea (opcional)"></textarea>';
        }
        else{
            tarea.innerHTML = '<textarea id="editArea" maxlength="250" id="descripcionTarea" placeholder="Descripción de la tarea (opcional)">' + tarea.childNodes[0].childNodes[0].data + '</textarea>';
        }
        
    }
    else if (event.target.classList.contains('acceptButton')) {        
        var tarea = event.target.closest('.tarea').childNodes[1];
        var text = tarea.childNodes[0].value;

        var editButton = event.target.closest('.tarea').childNodes[0].childNodes[4].childNodes[0];

        event.target.closest('.tarea').childNodes[0].childNodes[4].childNodes[0] = document.createElement('button');
        editButton.classList = ['edit'];
        editButton.innerHTML = 'Editar';


        if(text === ""){
            tarea.innerHTML = '<p></p>';
        }else{
            tarea.innerHTML = '<p>' + text + '</p>';
        }
    }
});

document.getElementById('listaTareasCompletadas').addEventListener('click', function(event) {
    if (event.target.classList.contains('edit')) {        
        var tarea = event.target.closest('.tarea').childNodes[1];

        var editButton = event.target.closest('.tarea').childNodes[0].childNodes[4].childNodes[0];

        event.target.closest('.tarea').childNodes[0].childNodes[4].childNodes[0] = document.createElement('button');
        editButton.classList = ['acceptButton'];
        editButton.innerHTML = 'Ok';

        if(tarea.childNodes[0].childNodes.length == 0){
            tarea.innerHTML = '<textarea id="editArea" maxlength="250" id="descripcionTarea" placeholder="Descripción de la tarea (opcional)"></textarea>';
        }
        else{
            tarea.innerHTML = '<textarea id="editArea" maxlength="250" id="descripcionTarea" placeholder="Descripción de la tarea (opcional)">' + tarea.childNodes[0].childNodes[0].data + '</textarea>';
        }
        
    }
    else if (event.target.classList.contains('acceptButton')) {        
        var tarea = event.target.closest('.tarea').childNodes[1];
        var text = tarea.childNodes[0].value;
        

        var editButton = event.target.closest('.tarea').childNodes[0].childNodes[4].childNodes[0];

        event.target.closest('.tarea').childNodes[0].childNodes[4].childNodes[0] = document.createElement('button');
        editButton.classList = ['edit'];
        editButton.innerHTML = 'Editar';

        
        if(text === ""){
            tarea.innerHTML = '<p></p>';
        }else{
            tarea.innerHTML = '<p>' + text + '</p>';
        }
    }
});
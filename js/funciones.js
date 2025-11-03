function recuperar() {
  const contenedor = document.getElementById('contenedorConceptos');
  contenedor.innerHTML = '';

  const cantidad = parseInt(document.getElementById('numConceptos').value);
  let datos = "";
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("clave").value;

  // Validar campos vacíos
  if (usuario === "" || password === "") {
    datos = "No puedes dejar campos en blanco";
  } else {
    datos = 'Usuario:<br> ' + usuario + '<br>Contraseña: ' + password + '<br>';
  }

  document.getElementById("mensaje").innerHTML = datos;

  for (let i = 0; i < cantidad; i++) {
    agregarConcepto(contenedor);
  }

  let btnAgregar = document.getElementById('btnAgregar');
  if (!btnAgregar) {
    btnAgregar = document.createElement('button');
    btnAgregar.textContent = 'Agregar concepto';
    btnAgregar.id = 'btnAgregar';
    btnAgregar.className = 'btn btn-success mt-3';
    btnAgregar.addEventListener('click', () => {
      agregarConcepto(contenedor);
      mostrarBotonAgregar();
    });
    contenedor.parentNode.appendChild(btnAgregar);
  }


  mostrarBotonAgregar();
}

function agregarConcepto(contenedor) {
  const div = document.createElement('div');
  div.className = 'concepto mt-2 p-2 border rounded';
  div.innerHTML = `

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-1 g-lg-4">
    <div class="col">
    <button type="button" class="btn btn-danger btn-sm eliminar">X</button>
    <label class="ms-2">Cantidad:</label><br>
    <input type="number" value="1" class="cantidad form-control d-inline-block w-auto">
    </div>
    <div class="col">
    <label class="ms-2">Descripción:</label><br>
    <input type="text" placeholder="Descripción" class="descripcion form-control d-inline-block w-auto">
    </div>
    <div class="col">
    <label class="ms-2">Valor Unitario:</label><br>
    <input type="number" value="0" class="valorUnitario form-control d-inline-block w-auto">
    </div>
    <div class="col">
    <label class="ms-2">Importe:</label><br>
    <input type="number" value="0" class="importe form-control d-inline-block w-auto" readonly>
    </div>
  `;

  contenedor.appendChild(div);


  const btnEliminar = div.querySelector('.eliminar');
  btnEliminar.addEventListener('click', () => {
    div.remove();
    mostrarBotonAgregar(); 
  });

  const cantidadInput = div.querySelector('.cantidad');
  const valorInput = div.querySelector('.valorUnitario');
  const importeInput = div.querySelector('.importe');

  cantidadInput.addEventListener('input', () => {
    importeInput.value = cantidadInput.value * valorInput.value;
  });

  valorInput.addEventListener('input', () => {
    importeInput.value = cantidadInput.value * valorInput.value;
  });
}

function mostrarBotonAgregar() {
  const contenedor = document.getElementById('contenedorConceptos');
  const btnAgregar = document.getElementById('btnAgregar');
  if (!btnAgregar) return;

  if (contenedor.children.length === 0) {
    btnAgregar.style.display = 'none';
  } else {
    btnAgregar.style.display = 'block';
  }
}


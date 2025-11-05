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
    datos = '<br>Usuario: ' + usuario + '<br>Contraseña: ' + password + '<br>';
  }

  document.getElementById("mensaje").innerHTML = datos;

  // que no sean negativos 
  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Ingresa un número válido de conceptos (solo enteros positivos)");//alerta por numero no correctos
    return;
  }

  for (let i = 0; i < cantidad; i++) {//recorido para poner todos los conceptod
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
      mostrarElementos();
    });      //padre elemt
    contenedor.parentNode.appendChild(btnAgregar);//agrega el boton en el conetedor
  }

  mostrarElementos();
  actualizarTotales();
}

function agregarConcepto(contenedor) {//contiene el contendo de los conceptos
  const div = document.createElement('div');
  div.className = 'concepto mt-2 p-2 border rounded';
  div.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-1 g-lg-4">
      <div class="col">
        <button type="button" class="btn btn-danger btn-sm eliminar">X</button>
        <label class="ms-2">Cantidad:</label><br>
        <input type="number" value="1" min="0" step="1" class="cantidad form-control d-inline-block w-auto">
      </div>
      <div class="col">
        <label class="ms-2">Descripción:</label><br>
        <input type="text" placeholder="Descripción" class="descripcion form-control d-inline-block w-auto">
      </div>
      <div class="col">
        <label class="ms-2">Valor Unitario:</label><br>
        <input type="number" value="0" min="0" step="1" class="valorUnitario form-control d-inline-block w-auto">
      </div>
      <div class="col">
        <label class="ms-2">Importe:</label><br>
        <input type="number" value="0" class="importe form-control d-inline-block w-auto" readonly>
      </div>
    </div>
  `;

  contenedor.appendChild(div);//nuevo elemto en el div

  const btnEliminar = div.querySelector('.eliminar');//elimina conceptos
  btnEliminar.addEventListener('click', () => {
    div.remove();
    mostrarElementos();
    actualizarTotales();
  });
//selecionan un valor dentro de algo especifico
  const cantidadInput = div.querySelector('.cantidad');
  const valorInput = div.querySelector('.valorUnitario');
  const importeInput = div.querySelector('.importe');

  const recalcular = () => {
    // Evita negativos o decimales
    cantidadInput.value = Math.max(0, Math.floor(Number(cantidadInput.value) || 0));
    valorInput.value = Math.max(0, Math.floor(Number(valorInput.value) || 0));

    importeInput.value = (cantidadInput.value * valorInput.value).toFixed(2);
    actualizarTotales();
  };

    //cuando pase sierta cosa llama a una funcion
  cantidadInput.addEventListener('input', recalcular);
  valorInput.addEventListener('input', recalcular);

  mostrarElementos();
  actualizarTotales();
}

function mostrarElementos() {
  const contenedor = document.getElementById('contenedorConceptos');
  const btnAgregar = document.getElementById('btnAgregar');
  const cajaTotales = document.querySelector('.totals-box');//elprimer elemento con esa clase

  if (!cajaTotales) return;

  if (contenedor.children.length === 0) {
    if (btnAgregar) btnAgregar.style.display = 'none';
    cajaTotales.style.display = 'none';
  } else {
    if (btnAgregar) btnAgregar.style.display = 'block';
    cajaTotales.style.display = 'block';
  }
}

function actualizarTotales() {
  const conceptos = document.querySelectorAll('.concepto');//seleciona todos los .concepto en la pagina 
  let subtotal = 0;

  conceptos.forEach(concepto => {
    const importe = parseFloat(concepto.querySelector('.importe').value) || 0;
    subtotal += importe;
  });
//iva es 0.16 y es una costante
  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  document.getElementById('subtotalDisplay').value = subtotal.toFixed(2);
  document.getElementById('ivaDisplay').value = iva.toFixed(2);
  document.getElementById('totalDisplay').value = total.toFixed(2);

  const cajaTotales = document.querySelector('.totals-box');
  if (conceptos.length > 0) {
    cajaTotales.style.display = 'block';
  } else {
    cajaTotales.style.display = 'none';
  }
}

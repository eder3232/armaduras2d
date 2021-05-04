//importaciones
import { WeightedGraph } from './file/graph.js'
import { twoDimensionArray } from './file/funciones.js'
//agregar quitar nudos

const $addNode = document.getElementById('addNode')
const $removeNode = document.getElementById('removeNode')
const $tbodyNode = document.getElementById('tBodyNode')

$addNode.addEventListener('click', () => {
  const $nodes = document.querySelectorAll('.node')
  $tbodyNode.innerHTML += `
    <tr class="node">
                  <td><input type="number" class="number enumeration" value="${
                    $nodes.length + 1
                  }" /></td>
                  <td>
                    <input
                      type="number"
                      class="number dataNodeX"
                      onfocus="this.value=''"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="number dataNodeY"
                      onfocus="this.value=''"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="number dataNodeForce"
                      onfocus="this.value=''"
                      value="0"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="number dataNodeForceAngle"
                      onfocus="this.value=''"
                      value="0"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="number dataNodeDisplacementX"
                      value="0"
                      onfocus="this.value=''"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="number dataNodeDisplacementY"
                      value="0"
                      onfocus="this.value=''"
                    />
                  </td>
                  <td><input class="restrictionX" type="checkbox" /></td>
                  <td><input class="restrictionY" type="checkbox" /></td>                  
                </tr>
    `
})

$removeNode.addEventListener('click', () => {
  $tbodyNode.removeChild($tbodyNode.lastElementChild)
})

// add and remove elements

const $addElement = document.getElementById('addElement')
const $removeElement = document.getElementById('removeElement')
const $tbodyElements = document.getElementById('tBodyElements')

$addElement.addEventListener('click', () => {
  const $elements = document.querySelectorAll('.element')
  $tbodyElements.innerHTML += `
    <tr class="element">
                  <td>
                    <input type="number" class="number enumeration" value="${
                      $elements.length + 1
                    }" />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="number dataElementsE large"
                      onfocus="this.value=''"
                      value="1"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="number dataElementsA"
                      onfocus="this.value=''"
                      value="1"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="number dataElementsL"
                      onfocus="this.value=''"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="number dataElementsFrom"
                      onfocus="this.value=''"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="number dataElementsTo"
                      onfocus="this.value=''"
                    />
                  </td>
                </tr>    
    `
})
$removeElement.addEventListener('click', () => {
  $tbodyElements.removeChild($tbodyElements.lastElementChild)
})

// read data

let nodes = []

function dataNodes() {
  nodes = []
  const $nodeList = document.querySelectorAll('.node')
  const $dataNodeX = document.querySelectorAll('.dataNodeX')
  const $dataNodeY = document.querySelectorAll('.dataNodeY')
  const $dataNodeForce = document.querySelectorAll('.dataNodeForce')
  const $dataNodeForceAngle = document.querySelectorAll('.dataNodeForceAngle')
  const $dataNodeDisplacementX = document.querySelectorAll(
    '.dataNodeDisplacementX'
  )
  const $dataNodeDisplacementY = document.querySelectorAll(
    '.dataNodeDisplacementY'
  )
  const $dataRestrictionX = document.querySelectorAll('.restrictionX')
  const $dataRestrictionY = document.querySelectorAll('.restrictionY')
  //console.log($dataRestrictionX[0].checked)
  //console.log($dataRestrictionY[0].checked)

  for (let i = 0; i < $nodeList.length; i++) {
    nodes.push({
      x: parseFloat($dataNodeX[i].value),
      y: parseFloat($dataNodeY[i].value),
      F: parseFloat($dataNodeForce[i].value),
      theta: parseFloat($dataNodeForceAngle[i].value),
      DeltaX: parseFloat($dataNodeDisplacementX[i].value),
      DeltaY: parseFloat($dataNodeDisplacementY[i].value),
      restrictedX: $dataRestrictionX[i].checked,
      restrictedY: $dataRestrictionY[i].checked,
    })
  }
  // borrar solo provisional
  /* nodes = [
    {
      x: 0,
      y: 0,
      F: 0,
      theta: 0,
      DeltaX: 0,
      DeltaY: 0,
      restrictedX: true,
      restrictedY: true,
    },
    {
      x: 3,
      y: 0,
      F: 0,
      theta: 0,
      DeltaX: 0,
      DeltaY: 0,
      restrictedX: true,
      restrictedY: true,
    },
    {
      x: 0,
      y: 4,
      F: 8,
      theta: -53.13,
      DeltaX: 0,
      DeltaY: 0,
      restrictedX: false,
      restrictedY: false,
    },
    {
      x: 3,
      y: 4,
      F: 6,
      theta: -90,
      DeltaX: 0,
      DeltaY: 0,
      restrictedX: false,
      restrictedY: false,
    },
  ] */
  //console.log(nodes)
}

let elements = []
function dataElements() {
  elements = []
  const $elementsList = document.querySelectorAll('.element')
  const $dataElementsE = document.querySelectorAll('.dataElementsE')
  const $dataElementsA = document.querySelectorAll('.dataElementsA')
  const $dataElementsL = document.querySelectorAll('.dataElementsL')
  const $dataElementsFrom = document.querySelectorAll('.dataElementsFrom')
  const $dataElementsTo = document.querySelectorAll('.dataElementsTo')
  for (let i = 0; i < $elementsList.length; i++) {
    elements.push({
      E: parseFloat($dataElementsE[i].value),
      A: parseFloat($dataElementsA[i].value),
      L: parseFloat($dataElementsL[i].value),
      From: parseFloat($dataElementsFrom[i].value),
      To: parseFloat($dataElementsTo[i].value),
      k:
        (parseFloat($dataElementsE[i].value) *
          parseFloat($dataElementsA[i].value)) /
        parseFloat($dataElementsL[i].value),
    })
  }

  //borrar solo provisional
  /* elements = [
    { E: 2, A: 1, L: 3, From: 1, To: 2, k: 0.66666666 },
    { E: 2, A: 1, L: 3, From: 3, To: 4, k: 0.66666666 },
    { E: 2, A: 1, L: 4, From: 1, To: 3, k: 0.5 },
    { E: 2, A: 1, L: 4, From: 2, To: 4, k: 0.5 },
    { E: 2, A: 1, L: 5, From: 1, To: 4, k: 0.4 },
    { E: 2, A: 1, L: 5, From: 2, To: 3, k: 0.4 },
  ] */
  //console.log(elements)
}
// parte logica

function backEnd() {
  const graph = new WeightedGraph()
  //crear el grafo
  for (let i = 0; i < nodes.length; i++) {
    graph.addVertex(i + 1)
  }
  for (let i = 0; i < elements.length; i++) {
    /* console.log(elements[i].From)
    console.log(elements[i].To) */
    graph.addEdge(elements[i].From, elements[i].To, elements[i].k)
  }
  //console.log(graph)
  //creamos una variable donde almacenar las matrices de rigidez globales
  const matricesGlobalesRigidez = []
  const k = twoDimensionArray(nodes.length * 2, nodes.length * 2)
  for (let i = 0; i < elements.length; i++) {
    //escribimos su matris de rigidez global
    const matrizLocalRigidez = twoDimensionArray(2, 2)
    matrizLocalRigidez[0][0] = elements[i].k
    matrizLocalRigidez[0][1] = -elements[i].k
    matrizLocalRigidez[1][0] = -elements[i].k
    matrizLocalRigidez[1][1] = elements[i].k
    //console.log(matrizLocalRigidez)

    const matrizTransformacionFuerzas = twoDimensionArray(4, 2)
    const cx =
      (nodes[elements[i].To - 1].x - nodes[elements[i].From - 1].x) /
      elements[i].L
    const cy =
      (nodes[elements[i].To - 1].y - nodes[elements[i].From - 1].y) /
      elements[i].L

    matrizTransformacionFuerzas[0][0] = cx
    matrizTransformacionFuerzas[1][0] = cy
    matrizTransformacionFuerzas[2][1] = cx
    matrizTransformacionFuerzas[3][1] = cy
    const matrizGlobalRigidez = math.multiply(
      math.multiply(matrizTransformacionFuerzas, matrizLocalRigidez),
      math.transpose(matrizTransformacionFuerzas)
    )
    console.log(`matriz local de rigidez ${i + 1}`)
    console.log(matrizGlobalRigidez)
    // hallando los indices donde escribiremos los componentes de la matriz
    // de rigidez global
    const from = (elements[i].From - 1) * 2
    const to = (elements[i].To - 1) * 2
    const fromX = from
    const fromY = from + 1
    const toX = to
    const toY = to + 1
    /* console.log(fromX)
    console.log(fromY)
    console.log(toX)
    console.log(toY)
    console.log('melissa') */

    k[fromX][fromX] += matrizGlobalRigidez[0][0]
    k[fromX][fromY] += matrizGlobalRigidez[0][1]
    k[fromY][fromX] += matrizGlobalRigidez[1][0]
    k[fromY][fromY] += matrizGlobalRigidez[1][1]

    k[fromX][toX] += matrizGlobalRigidez[0][2]
    k[fromX][toY] += matrizGlobalRigidez[0][3]
    k[fromY][toX] += matrizGlobalRigidez[1][2]
    k[fromY][toY] += matrizGlobalRigidez[1][3]

    k[toX][fromX] += matrizGlobalRigidez[2][0]
    k[toX][fromY] += matrizGlobalRigidez[2][1]
    k[toY][fromX] += matrizGlobalRigidez[3][0]
    k[toY][fromY] += matrizGlobalRigidez[3][1]

    k[toX][toX] += matrizGlobalRigidez[2][2]
    k[toX][toY] += matrizGlobalRigidez[2][3]
    k[toY][toX] += matrizGlobalRigidez[3][2]
    k[toY][toY] += matrizGlobalRigidez[3][3]
  }

  //ensamblamos la matriz de fuerzas y la matriz de desplazamientos
  const matrizFuerzas = twoDimensionArray(2 * nodes.length, 1)
  const matrizDesplazamientos = twoDimensionArray(2 * nodes.length, 1)
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].restrictedX) {
      matrizFuerzas[i * 2] = 'reaccion'
      matrizDesplazamientos[i * 2] = nodes[i].DeltaX
    } else {
      ;(matrizFuerzas[i * 2] =
        nodes[i].F * math.cos(math.unit(nodes[i].theta, 'deg'))),
        (matrizDesplazamientos[i * 2] = 'desplazamiento')
    }
    if (nodes[i].restrictedY) {
      matrizFuerzas[i * 2 + 1] = 'reaccion'
      matrizDesplazamientos[i * 2 + 1] = nodes[i].DeltaY
    } else {
      ;(matrizFuerzas[i * 2 + 1] =
        nodes[i].F * math.sin(math.unit(nodes[i].theta, 'deg'))),
        (matrizDesplazamientos[i * 2 + 1] = 'desplazamiento')
    }

    /* matrizDesplazamientos[i * 2] = [nodes[i].DeltaX]
    matrizDesplazamientos[i * 2 + 1] = [nodes[i].DeltaY] */
  }
  // comprobando las 3 matrices
  //console.log(matrizFuerzas)
  //console.log(k)
  //console.log(matrizDesplazamientos)

  //creamos una super matriz juntando las 3 matrices para poderlas ordenar,
  //en caso que las fuerzas no esten ordenadas
  const superMatriz = twoDimensionArray(k.length, k.length + 4)
  for (let i = 0; i < k.length; i++) {
    let etiqueta = 'x'
    if (i % 2 != 0) etiqueta = 'y'
    superMatriz[i] = [
      matrizFuerzas[i],
      k[i],
      matrizDesplazamientos[i],
      i,
      `nodo ${Math.floor(i / 2) + 1} ${etiqueta}`,
    ]
  }
  //console.log(superMatriz)
  //console.log(superMatriz[0])
  superMatriz.sort()
  superMatriz.reverse()
  console.log(superMatriz)
  const ordenadoF = []
  const ordenadoK = []
  const ordenadoU = []
  const ordenadoId = []
  const ordenadoEtiqueta = []
  for (let i = 0; i < superMatriz.length; i++) {
    ordenadoF.push(superMatriz[i][0])
    ordenadoK.push(superMatriz[i][1])
    ordenadoU.push(superMatriz[i][2])
    ordenadoId.push(superMatriz[i][3])
    ordenadoEtiqueta.push(superMatriz[i][4])
  }
  // tenemos todos los valores listos para ser resueltos
  //procedemos a resolver

  // contamos reacciones
  let reacciones = 0
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].restrictedX) reacciones++
    if (nodes[i].restrictedY) reacciones++
  }

  //escribimos matrices necesarias para el calculo
  // escribiendo Fu
  let Fu = twoDimensionArray(superMatriz.length - reacciones, 1)
  for (let i = reacciones; i < superMatriz.length; i++) {
    Fu[i - reacciones][0] = ordenadoF[i]
  }
  //escribiendo kuu
  let kuu = twoDimensionArray(
    superMatriz.length - reacciones,
    superMatriz.length - reacciones
  )

  for (let i = reacciones; i < superMatriz.length; i++) {
    for (let j = reacciones; j < superMatriz.length; j++) {
      kuu[i - reacciones][j - reacciones] = ordenadoK[i][j]
    }
  }
  //escribiendo kur
  let kur = twoDimensionArray(superMatriz.length - reacciones, reacciones)
  for (let i = reacciones; i < superMatriz.length; i++) {
    for (let j = 0; j < reacciones; j++) {
      kur[i - reacciones][j] = ordenadoK[i][j]
    }
  }
  //escribiendo ur
  let ur = twoDimensionArray(reacciones, 1)
  for (let i = 0; i < reacciones; i++) {
    ur[i][0] = ordenadoU[i]
  }
  console.log('k')
  console.log(k)
  console.log('kuu')
  console.log(kuu)
  console.log('Fu')
  console.log(Fu)
  console.log('kur')
  console.log(kur)
  console.log('ur')
  console.log(ur)
  //calculos finales
  let respuesta = math.inv(kuu)
  let respuesta2 = math.multiply(kur, ur)
  let respuesta3 = math.subtract(Fu, respuesta2)
  let uu = math.multiply(respuesta, respuesta3)

  /* console.log(respuesta)
  console.log(respuesta2)
  console.log(respuesta3)
  console.log('respuesta') */
  console.log('uu')
  console.log(uu)
  //calculo de reacciones

  //escribiendo krr
  const krr = twoDimensionArray(reacciones, reacciones)
  for (let i = 0; i < reacciones; i++) {
    for (let j = 0; j < reacciones; j++) {
      krr[i][j] = ordenadoK[i][j]
    }
  }
  //escribiendo kru
  const kru = twoDimensionArray(reacciones, superMatriz.length - reacciones)
  for (let i = 0; i < reacciones; i++) {
    for (let j = reacciones; j < superMatriz.length; j++) {
      kru[i][j - reacciones] = ordenadoK[i][j]
    }
  }
  console.log('kru')
  console.log(kru)
  console.log('krr')
  console.log(krr)
  //calculos
  let resp1 = math.multiply(krr, ur)
  let resp2 = math.multiply(kru, uu)
  let fr = math.add(resp1, resp2)
  console.log('fr')
  console.log(fr)

  const resultados = twoDimensionArray(superMatriz.length, 2)
  for (let i = 0; i < fr.length; i++) {
    resultados[i][0] = fr[i]
  }
  for (let i = reacciones; i < superMatriz.length; i++) {
    resultados[i][1] = uu[i - reacciones]
  }
  console.log(resultados)
  /////////////////////////////////////////////////////////////////////////////////
  //impresion
  const $outPut = document.getElementById('tableOutPut')
  $outPut.innerHTML = ''
  for (let i = 0; i < superMatriz.length; i++) {
    $outPut.innerHTML += `
    <tr>
      <td style="width:10rem">${ordenadoEtiqueta[i]}</td>
      <td style="width:10rem" class="print">${
        Math.round(resultados[i][0] * 10000) / 10000
      }</td>
      <td style="width:10rem" class="print">${
        Math.round(resultados[i][1] * 1000000) / 1000000
      }</td>
    </tr>
    `
  }
  /// visibilidad css
  const $tableNotVisible = document.getElementById('tableNotVisible')
  $tableNotVisible.classList.remove('notVisible')
}

//la funcion ejecutora final
function theClick() {
  console.log('inicia')
  dataNodes()
  dataElements()
  backEnd()
}

const $calculate = document.getElementById('calculate')
$calculate.addEventListener('click', theClick)

//clase que crea el grafo ponderado no dirigido

export class WeightedGraph {
  constructor() {
    this.adjacencyList = {}
  }
  addVertex(name) {
    if (!this.adjacencyList[name]) {
      this.adjacencyList[name] = {}
    }
  }
  addEdge(vert1, vert2, weight) {
    this.adjacencyList[vert1][vert2] = weight
    this.adjacencyList[vert2][vert1] = weight
  }
  removeEdge(v1, v2) {
    delete this.adjacencyList[v1][v2]
    delete this.adjacencyList[v2][v1]
  }
  removeVertex(vert) {
    for (let i in this.adjacencyList[vert]) {
      this.removeEdge(vert, i)
    }
    delete this.adjacencyList[vert]
  }
  DFS(target) {
    const result = []
    const visited = {}
    const helper = (vert) => {
      if (!vert) return null
      visited[vert] = true
      result.push(vert)
      for (let neighbor in this.adjacencyList[vert]) {
        if (!visited[neighbor]) {
          return helper(neighbor)
        }
      }
    }
    helper(target)
    return result
  }
  BFS(start) {
    const queue = [start]
    const result = []
    const visited = {}
    while (queue.length) {
      let current = queue.shift()
      visited[current] = true
      result.push(current)
      for (let neighbor in this.adjacencyList[current]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true
          queue.push(neighbor)
        }
      }
    }
    return result
  }

  Dijkstras(start, finish) {
    // List1
    const costFromStartTo = {}
    // List2
    const checkList = new PriorityQueue()
    // List3
    const prev = {}

    let current
    let result = []
    for (let vert in this.adjacencyList) {
    }
    while (checkList.values.length) {}
  }
}

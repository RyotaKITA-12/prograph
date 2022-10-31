<template>
    <img style="height: 15%" src="@/assets/prograph.png" />
    <div class="overview">
        <el-alert type="info" show-icon :closable="false">
            <pre
                style="margin-left: 15px; font-size: medium;">Shift&#009;&#009;: Multiple selection of nodes and edges.</pre>
            <pre
                style="margin-left: 15px; font-size: medium;">Command&#009;: Multiple selections by specifying a range</pre>
            <pre
                style="margin-left: 15px; font-size: medium;">Right Click&#009;: Open menu to change name and cost.</pre>
        </el-alert>
        <div style="text-align: end;">
            <el-button type="text" @click="visible = true">Tutorial</el-button>
        </div>
    </div>
    <el-dialog v-model="visible" title="Tutorial" center>
        <el-carousel style="text-align: center;">
            <el-carousel-item>
                <img src="@/assets/tutorial/001.png" />
            </el-carousel-item>
            <el-carousel-item>
                <img src="@/assets/tutorial/002.png" />
            </el-carousel-item>
            <el-carousel-item>
                <img src="@/assets/tutorial/003.png" />
            </el-carousel-item>
            <el-carousel-item>
                <img src="@/assets/tutorial/004.png" />
            </el-carousel-item>
        </el-carousel>
    </el-dialog>
    <div class="graph-space">
        <div class="demo-control-panel">
            <div class="frame">
                <span class="left">
                    <label>Node:</label>
                    <el-button @click="addNode" :icon="CirclePlusFilled" />
                    <el-button :disabled="selectedNodes.length == 0" @click="removeNode" :icon="RemoveFilled" />
                    <label>Edge:</label>
                    <el-button :disabled="selectedNodes.length != 2" @click="addEdge" :icon="CirclePlusFilled" />
                    <el-button :disabled="selectedEdges.length == 0" @click="removeEdge" :icon="RemoveFilled" />
                </span>
                <span class="right">
                    <label>Position:</label>
                    <el-button @click="graph?.panToCenter()" :icon="Aim" />
                    <el-button @click="graph?.fitToContents()" :icon="FullScreen" />
                    <el-button @click="graph?.zoomIn()" :icon="ZoomIn" />
                    <el-button @click="graph?.zoomOut()" :icon="ZoomOut" />
                    <label>LayOut:</label>
                    <el-button @click="updateLayout('LR')" :icon="CaretRight" />
                    <el-button @click="updateLayout('TB')" :icon="CaretBottom" />
                </span>
            </div>
        </div>

        <v-network-graph v-model:selected-nodes="selectedNodes" v-model:selected-edges="selectedEdges" ref="graph"
            class="graph" :paths="paths" :nodes="nodes" :edges="edges" :layouts="layouts" :configs="configs"
            :event-handlers="eventHandlers">
            <template #edge-label="{ edge, ...slotProps }">
                <v-edge-label :text="`${edge.cost}`" align="center" vertical-align="below" v-bind="slotProps" />
            </template>
        </v-network-graph>
        <div ref="viewMenu" class="context-menu">Menu for the background</div>
        <div ref="nodeMenu" class="context-menu">
            {{ menuTargetNode }}
            <div>
                <el-form-item label="Name" style="margin-top: 15px;">
                    <el-input v-if="nodes[menuTargetNodeId]" v-model="nodes[menuTargetNodeId].name">
                    </el-input>
                </el-form-item>
            </div>
            <div @click="menuRemoveNode(menuTargetNodeId)">
                削除
            </div>
        </div>
        <div ref="edgeMenu" class="context-menu">
            <div>
                <el-form-item label="Name" style="margin-top: 15px;">
                    <el-input v-if="edges[menuTargetEdges.join(', ')]" v-model="edges[menuTargetEdges.join(', ')].name">
                    </el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="Cost" style="margin-top: 15px;">
                    <el-input v-if="edges[menuTargetEdges.join(', ')]" v-model="edges[menuTargetEdges.join(', ')].cost">
                    </el-input>
                </el-form-item>
            </div>
            <div @click="menuRemoveEdge(menuTargetEdges.join(', '))">
                削除
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref, watchEffect } from "vue"
import * as vNG from "v-network-graph"
import { Nodes, Edges, Layouts, GridLayout, EventHandlers } from "v-network-graph"
//@ts-ignore
import dagre from "dagre/dist/dagre.min.js"

import {
    CirclePlusFilled,
    RemoveFilled,
    Aim,
    FullScreen,
    ZoomIn,
    ZoomOut,
    CaretRight,
    CaretBottom,
} from '@element-plus/icons-vue'

type GraphMap = { [key: string]: { [key: string]: number } }
type EdgeMap = { [key: string]: { [key: string]: string } }

class Graph {
    map: GraphMap
    edgeMap: EdgeMap

    _sorter = function (a: string, b: string) {
        return parseFloat(a) - parseFloat(b)
    }

    constructor(edges: Edges) {
        // var map = {a:{b:3,c:1},b:{a:2,c:1},c:{a:4,b:1}},
        const map: GraphMap = {}
        const edgeMap: EdgeMap = {}
        Object.entries(edges).forEach(([edgeId, edge]) => {
            const source = edge.source
            const target = edge.target
            const cost = Number(edge.cost)
            if (!map[source]) map[source] = {}
            if (!map[target]) map[target] = {}
            if (!edgeMap[source]) edgeMap[source] = {}
            if (!edgeMap[target]) edgeMap[target] = {}

            if (map[source][target]) {
                if (map[source][target] > cost) {
                    map[source][target] = cost
                    map[target][source] = cost
                    edgeMap[source][target] = edgeId
                    edgeMap[target][source] = edgeId
                }
            } else {
                map[source][target] = cost
                map[target][source] = cost
                edgeMap[source][target] = edgeId
                edgeMap[target][source] = edgeId
            }
        })
        this.map = map
        this.edgeMap = edgeMap
    }

    findShortestPath(viaNodes: string[]) {
        return this._findShortestPath(this.map, viaNodes)
    }
    convertNodesToEdges(nodes: string[]): string[] {
        const edges: string[] = []
        if (nodes.length === 0) {
            return []
        }
        let prev = nodes[0]
        for (let i = 1; i < nodes.length; i++) {
            const next = nodes[i]
            edges.push(this.edgeMap[prev][next])
            prev = next
        }
        return edges
    }

    _extractKeys(obj: object) {
        const keys = []
        let key
        for (key in obj) {
            Object.prototype.hasOwnProperty.call(obj, key) && keys.push(key)
        }
        return keys
    }

    _findPaths(map: GraphMap, start: string, end: string) {
        const costs: { [key: string]: number } = {}
        const open: { [key: string]: string[] } = { 0: [start] }
        const predecessors: { [key: string]: string } = {}
        let keys

        const addToOpen = function (cost: number, vertex: string) {
            const key = "" + cost
            if (!open[key]) {
                open[key] = []
            }
            open[key].push(vertex)
        }

        costs[start] = 0

        // eslint-disable-next-line no-unmodified-loop-condition
        while (open) {
            if (!(keys = this._extractKeys(open)).length) {
                break
            }

            keys.sort(this._sorter)

            const key = keys[0]
            const bucket = open[key]
            const node = bucket.shift() || ""
            const currentCost = parseFloat(key)
            const adjacentNodes = map[node] || {}

            if (!bucket.length) {
                delete open[key]
            }

            for (const vertex in adjacentNodes) {
                if (Object.prototype.hasOwnProperty.call(adjacentNodes, vertex)) {
                    const cost = adjacentNodes[vertex]
                    const totalCost = cost + currentCost
                    const vertexCost = costs[vertex]

                    if (vertexCost === undefined || vertexCost > totalCost) {
                        costs[vertex] = totalCost
                        addToOpen(totalCost, vertex)
                        predecessors[vertex] = node
                    }
                }
            }
        }

        if (costs[end] === undefined) {
            return null
        } else {
            return predecessors
        }
    }

    _extractShortest(predecessors: { [key: string]: string }, end: string) {
        const nodes = []
        let u = end

        while (u !== undefined) {
            nodes.push(u)
            u = predecessors[u]
        }

        nodes.reverse()
        return nodes
    }

    _findShortestPath(map: GraphMap, nodes: string[]) {
        nodes = [...nodes] // copy
        let start = nodes.shift() || ""
        let end: string
        let predecessors
        const path: string[] = []
        let shortest

        while (nodes.length) {
            end = nodes.shift() || ""
            predecessors = this._findPaths(map, start, end)

            if (predecessors) {
                shortest = this._extractShortest(predecessors, end)
                if (nodes.length) {
                    path.push.apply(path, shortest.slice(0, -1))
                } else {
                    return path.concat(shortest)
                }
            } else {
                return null
            }

            start = end
        }
    }
}


const visible = ref(false)


const nodes: Nodes = reactive({})
const edges: Edges = reactive({})
const layouts: Layouts = reactive({
    nodes: {},
})

const nextNodeIndex = ref(Object.keys(nodes).length + 1)
const nextEdgeIndex = ref(Object.keys(edges).length + 1)

const selectedNodes = ref<string[]>([])
const selectedEdges = ref<string[]>([])

const isBoxSelectionMode = ref(false)

function startBoxSelection() {
    graph.value?.startBoxSelection()
}

const nodeSize = 40
const zoomLevel = ref(1)

const graph = ref<vNG.VNetworkGraphInstance>()

var configs = reactive(vNG.getFullConfigs())
configs.node.selectable = true
configs.node.focusring.color = "#B388FF"
configs.edge.selectable = true
configs.edge.normal.width = 3
configs.edge.marker = {
    source: {
        type: "none",
        width: 4,
        height: 4,
        margin: -1,
        units: "strokeWidth",
        color: null,
    },
    target: {
        type: "arrow",
        width: 4,
        height: 4,
        margin: -1,
        units: "strokeWidth",
        color: null,
    }
}
configs.path = {
    visible: true,
    curveInNode: true,
    path: {
        width: 14,
        color: "#ff000088",
    },
}
configs.view.boxSelectionEnabled = true
configs.view.layoutHandler = new GridLayout({ grid: 15 })

onMounted(() => layout("TB"))

function layout(direction: "TB" | "LR") {
    if (Object.keys(nodes).length <= 1 || Object.keys(edges).length == 0) {
        return
    }

    // convert graph
    // ref: https://github.com/dagrejs/dagre/wiki
    const g = new dagre.graphlib.Graph() // Set an object for the graph label
    g.setGraph({
        rankdir: direction,
        nodesep: nodeSize * 2,
        edgesep: nodeSize,
        ranksep: nodeSize * 2,
    })
    // Default to assigning a new object as a label for each new edge.
    g.setDefaultEdgeLabel(() => ({}))

    // Add nodes to the graph. The first argument is the node id. The second is
    // metadata about the node. In this case we're going to add labels to each of
    // our nodes.
    Object.entries(nodes).forEach(([nodeId, node]) => {
        g.setNode(nodeId, { label: node.name, width: nodeSize, height: nodeSize })
    })

    // Add edges to the graph.
    Object.values(edges).forEach(edge => {
        g.setEdge(edge.source, edge.target)
    })

    dagre.layout(g)

    const box: Record<string, number | undefined> = {}
    g.nodes().forEach((nodeId: string) => {
        // update node position
        const x = g.node(nodeId).x
        const y = g.node(nodeId).y
        layouts.nodes[nodeId] = { x, y }

        // calculate bounding box size
        box.top = box.top ? Math.min(box.top, y) : y
        box.bottom = box.bottom ? Math.max(box.bottom, y) : y
        box.left = box.left ? Math.min(box.left, x) : x
        box.right = box.right ? Math.max(box.right, x) : x
    })

    const graphMargin = nodeSize * 2
    const viewBox = {
        top: (box.top ?? 0) - graphMargin,
        bottom: (box.bottom ?? 0) + graphMargin,
        left: (box.left ?? 0) - graphMargin,
        right: (box.right ?? 0) + graphMargin,
    }
    graph.value?.setViewBox(viewBox)
}

function updateLayout(direction: "TB" | "LR") {
    // Animates the movement of an element.
    graph.value?.transitionWhile(() => {
        layout(direction)
    })
}

function addNode() {
    const nodeId = `node${nextNodeIndex.value}`
    const name = `N${nextNodeIndex.value}`
    nodes[nodeId] = { name }
    nextNodeIndex.value++
}

function removeNode() {
    for (const nodeId of selectedNodes.value) {
        delete nodes[nodeId]
    }
}

function addEdge() {
    if (selectedNodes.value.length !== 2) return
    const [source, target, cost, name] = [...selectedNodes.value, 1, 'edge']
    const edgeId = `edge${nextEdgeIndex.value}`
    edges[edgeId] = { source, target, cost, name }
    nextEdgeIndex.value++
}

function removeEdge() {
    for (const edgeId of selectedEdges.value) {
        delete edges[edgeId]
    }
}

function menuRemoveNode(nodeId: string) {
    delete nodes[nodeId]
}

function menuRemoveEdge(edgeId: string) {
    delete edges[edgeId]
}

function showContextMenu(element: HTMLElement, event: MouseEvent) {
    element.style.left = event.x + "px"
    element.style.top = event.y + "px"
    element.style.visibility = "visible"
    const handler = (event: PointerEvent) => {
        if (!event.target || !element.contains(event.target as HTMLElement)) {
            element.style.visibility = "hidden"
            document.removeEventListener("pointerdown", handler, { capture: true })
        }
    }
    document.addEventListener("pointerdown", handler, { passive: true, capture: true })
}

const nodeMenu = ref<HTMLDivElement>()
const menuTargetNode = ref("")
const menuTargetNodeId = ref("")
function showNodeContextMenu(params: vNG.NodeEvent<MouseEvent>) {
    const { node, event } = params
    // Disable browser's default context menu
    event.stopPropagation()
    event.preventDefault()
    if (nodeMenu.value) {
        menuTargetNode.value = nodes[node].name ?? ""
        menuTargetNodeId.value = node ?? ""
        showContextMenu(nodeMenu.value, event)
    }
}

const edgeMenu = ref<HTMLDivElement>()
const menuTargetEdges = ref<string[]>([])
function showEdgeContextMenu(params: vNG.EdgeEvent<MouseEvent>) {
    const { event } = params
    // Disable browser's default context menu
    event.stopPropagation()
    event.preventDefault()
    if (edgeMenu.value) {
        menuTargetEdges.value = params.summarized ? params.edges : [params.edge]
        if (params.edge) {
            edges[params.edge].name = params.edge
        }
        showContextMenu(edgeMenu.value, event)
    }
}

const paths = ref<vNG.Paths>({})

const targetNode = ref("node2")
watchEffect(() => {
    const graph = new Graph(edges)
    const routeOfNodes = graph.findShortestPath(["node1", targetNode.value])
    if (routeOfNodes) {
        const routeOfEdges = graph.convertNodesToEdges(routeOfNodes)
        paths.value = { shortestPath: { edges: routeOfEdges } }
    }
})

const eventHandlers: EventHandlers = {
    "view:mode": mode => {
        // Observe mode change events
        isBoxSelectionMode.value = mode === "box-selection"
    },
    "node:contextmenu": showNodeContextMenu,
    "edge:contextmenu": showEdgeContextMenu,
    "node:pointerover": ({ node }) => {
        if (node === "node1") return
        targetNode.value = node
    },
}
</script>

<style>
.graph-space {
    border: 2px solid #3949AB;
    border-radius: 30px;
    height: 130%;
}

.graph {
    width: 90%;
    height: 80%;
    border: 1px solid #9FA8DA;
    margin-left: 5%;
}

.demo-control-panel {
    width: 90%;
    padding: 20px;
    margin: 0 auto;
    margin-bottom: 10px;
    border-radius: 10px;
}

label {
    font-size: 5px;
    padding-left: 10px;
    padding-right: 5px;
}

.left,
.right {
    display: inline-block;
}

.frame {
    display: flex;
    justify-content: space-between;
}

.overview {
    margin: 0 auto;
    width: 65%;
    padding-top: 15px;
    padding-bottom: 15px;
    text-align: start;
}

.el-carousel__item img {
    width: 100%;
}
</style>

<style lang="scss" scoped>
.context-menu {
    width: 180px;
    background-color: #efefef;
    padding: 10px;
    position: fixed;
    visibility: hidden;
    font-size: 12px;
    border: 1px solid #aaa;
    box-shadow: 2px 2px 2px #aaa;

    >div {
        border: 1px dashed #aaa;
        padding: 4px;
        margin-top: 8px;
    }
}
</style>

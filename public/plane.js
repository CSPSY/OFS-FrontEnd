// THREE 相关变量
var scene, camera, renderer;

// 创建场景
function createScene() {
    scene = new THREE.Scene();
    // 创建相机
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
    camera.position.x = 0;
    camera.position.y = 100;
    camera.position.z = 200;

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById('world').appendChild(renderer.domElement);

    window.addEventListener('resize', Resize, false);
}

// 窗口大小改变时更新相机和渲染器
function Resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

// 添加光照
var ambientLight, hemisphereLight, shadowLight;
function createLights() {
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9)
    shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
    shadowLight.position.set(150, 350, 350);
    shadowLight.castShadow = true;
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    scene.add(hemisphereLight);
    scene.add(shadowLight);
}

// 飞机
var AirPlane = function () {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "airPlane";

    var geomCockpit = new THREE.BoxGeometry(100, 50, 40); //5 4 10
    var matCockpit = new THREE.MeshPhongMaterial({ color: 0x497fdb, shading: THREE.FlatShading });
    var cockpit = new THREE.Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);

    // 创建飞机引擎
    var geomEngine = new THREE.BoxGeometry(20, 50, 40);
    var matEngine = new THREE.MeshPhongMaterial({ color: 0xd8d0d1, shading: THREE.FlatShading });
    var engine = new THREE.Mesh(geomEngine, matEngine);
    engine.position.x = 50;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);

    // 创建飞机尾翼
    var geomTailPlane, matTailPlane;

    geomTailPlane = new THREE.BoxGeometry(15, 20, 5);
    matTailPlane = new THREE.MeshPhongMaterial({ color: 0xd3db69, shading: THREE.FlatShading });
    var tailPlane1 = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane1.position.set(-50, 25, 0);
    tailPlane1.castShadow = true;
    tailPlane1.receiveShadow = true;
    this.mesh.add(tailPlane1);

    geomTailPlane = new THREE.BoxGeometry(25, 5, 40);
    matTailPlane = new THREE.MeshPhongMaterial({ color: 0xd3db69, shading: THREE.FlatShading });
    var tailPlane2 = new THREE.Mesh(geomTailPlane, matTailPlane);
    tailPlane2.position.set(-35, 10, 40);
    tailPlane2.castShadow = true;
    tailPlane2.receiveShadow = true;
    this.mesh.add(tailPlane2);

    // 创建飞机机翼
    var geomSideWing = new THREE.BoxGeometry(40, 8, 150);
    var matSideWing = new THREE.MeshPhongMaterial({ color: 0xf25346, shading: THREE.FlatShading });

    var sideWing1 = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing1.position.set(15, 25, 0);
    sideWing1.castShadow = true;
    sideWing1.receiveShadow = true;
    this.mesh.add(sideWing1);

    var sideWing2 = new THREE.Mesh(geomSideWing, matSideWing);
    sideWing2.position.set(15, -25, 0);
    sideWing2.castShadow = true;
    sideWing2.receiveShadow = true;
    this.mesh.add(sideWing2);

    // 创建机翼支架
    var geomStand = new THREE.BoxGeometry(10, 40, 5);
    var matStand = new THREE.MeshPhongMaterial({ color: 0x59332e, shading: THREE.FlatShading });

    var Stand1 = new THREE.Mesh(geomStand, matStand);
    Stand1.position.set(15, 0, 40);
    Stand1.castShadow = true;
    Stand1.receiveShadow = true;
    this.mesh.add(Stand1);

    var Stand2 = new THREE.Mesh(geomStand, matStand);
    Stand2.position.set(15, 0, 70);
    Stand2.castShadow = true;
    Stand2.receiveShadow = true;
    this.mesh.add(Stand2);

    // 螺旋桨
    var geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
    var matPropeller = new THREE.MeshPhongMaterial({ color: 0x59332e, shading: THREE.FlatShading });
    this.propeller = new THREE.Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    // 螺旋桨片
    var geomBlade = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
    var matBlade = new THREE.MeshPhongMaterial({ color: 0x23190f, shading: THREE.FlatShading });
    var blade = new THREE.Mesh(geomBlade, matBlade);
    blade.position.set(8, 0, 0);
    blade.castShadow = true;
    blade.receiveShadow = true;

    this.propeller.add(blade);
    this.propeller.position.set(65, 0, 0);
    this.mesh.add(this.propeller);
};


Sky = function () {
    this.mesh = new THREE.Object3D();

    // 生成云朵
    this.nClouds = 40;
    var stepAngle = Math.PI * 2 / this.nClouds;
    for (let i = 0; i < this.nClouds; i++) {
        let c = new Cloud();
        let a = stepAngle * i;
        let h = 750 + Math.random() * 200;
        c.mesh.position.y = Math.sin(a) * h;
        c.mesh.position.x = Math.cos(a) * h;
        c.mesh.position.z = -400 - Math.random() * 400;
        c.mesh.rotation.z = a + Math.PI / 2;
        let s = 1 + Math.random() * 2;
        c.mesh.scale.set(s, s, s);
        this.mesh.add(c.mesh);
    }
}

var rocksH = [];
Rocks = function () {
    this.mesh = new THREE.Object3D();
    // 生成石块
    this.nRocks = 15;
    var stepAngle = Math.PI * 2 / this.nRocks;
    for (let i = 0; i < this.nRocks; i++) {
        let c = new Rock();
        let a = stepAngle * i;
        let h = 630 + Math.random() * 170;  //650 -- 800
        rocksH.push(h);
        c.mesh.position.x = Math.cos(a) * h;
        c.mesh.position.y = Math.sin(a) * h;
        this.mesh.add(c.mesh);
    }
}

Land = function () {
    this.mesh = new THREE.Object3D();

    // 添加树叶
    var geomLeaf = new THREE.IcosahedronGeometry(30);
    var matLeaf = new THREE.MeshPhongMaterial({
        color: 0x6e9c47, shininess: 0,
        specular: 0xffffff,
        shading: THREE.FlatShading
    });
    var Leaf = new THREE.Mesh(geomLeaf, matLeaf);
    Leaf.position.set(0, 60, 0);
    Leaf.castShadow = true;

    // 添加树干
    var geomTrunk = new THREE.BoxGeometry(15, 80, 15);
    var matTrunk = new THREE.MeshPhongMaterial({ color: 0x393b28, });
    var Trunk = new THREE.Mesh(geomTrunk, matTrunk);
    Trunk.castShadow = true;
    Trunk.receiveShadow = true;
    Trunk.add(Leaf);

    // 生成陆地
    var geomLand = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
    geomLand.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    var matLand = new THREE.MeshPhongMaterial({ color: 0x1c571f, });
    var Land = new THREE.Mesh(geomLand, matLand);
    Land.receiveShadow = true;

    // 在陆地生成树
    var nTrees = 40;
    var stepAngle = Math.PI * 2 / nTrees;
    for (let i = 0; i < nTrees; i++) {
        var TrunkClone = Trunk.clone();
        let a = stepAngle * i;
        TrunkClone.rotation.z = a - (Math.PI / 2);
        TrunkClone.position.x = 600 * Math.cos(a);
        TrunkClone.position.y = 600 * Math.sin(a);
        TrunkClone.position.z = -500 + Math.random() * 550; //-500 --50
        let s = Math.random() * 1.1 + 0.4;
        TrunkClone.scale.set(s, s, s);
        Land.add(TrunkClone);
    }
    this.mesh.add(Land);
}

// 生成云朵
Cloud = function () {
    this.mesh = new THREE.Object3D();
    var geom = new THREE.CubeGeometry(20, 20, 20);
    var mat = new THREE.MeshPhongMaterial({ color: 0xd8d0d1, });

    var nBlocs = 3 + Math.floor(Math.random() * 3);
    for (var i = 0; i < nBlocs; i++) {
        var m = new THREE.Mesh(geom.clone(), mat);
        m.position.x = i * 15;
        m.position.y = Math.random() * 10;
        m.position.z = Math.random() * 10;
        m.rotation.z = Math.random() * Math.PI * 2;
        m.rotation.y = Math.random() * Math.PI * 2;
        var s = 0.1 + Math.random() * 0.9;
        m.scale.set(s, s, s);
        m.castShadow = true;
        m.receiveShadow = true;
        this.mesh.add(m);
    }
}

Rock = function () {
    this.mesh = new THREE.Object3D();
    var geom = new THREE.TetrahedronGeometry(8, 2);
    var mat = new THREE.MeshPhongMaterial({
        color: 0x4a4e5f,
        shininess: 0,
        specular: 0xffffff,
        shading: THREE.FlatShading
    });
    rock = new THREE.Mesh(geom, mat);
    this.mesh.add(rock);
}

var land;
var airplane;
var rocks;
var sky;

// 创建飞机
function createPlane() {
    airplane = new AirPlane();
    airplane.mesh.scale.set(0.25, 0.25, 0.25);
    airplane.mesh.position.y = 100;
    scene.add(airplane.mesh);
}

// 创建陆地
function createLand() {
    land = new Land();
    land.mesh.position.y = -600;
    scene.add(land.mesh);
}

// 创建天空
function createSky() {
    sky = new Sky();
    sky.mesh.position.y = -600;
    scene.add(sky.mesh);
}

function createRocks() {
    rocks = new Rocks();
    rocks.mesh.position.y = -600;
    scene.add(rocks.mesh);
}

var t = 0;
var targetY, targetX;
var beginCreateRocks = 0;
var IfCreateRocks = false;
var time = 0.001;
var frame = 0;
function loop() {
    updatePlane();
    land.mesh.rotation.z += 0.005;
    sky.mesh.rotation.z += 0.01;
    beginCreateRocks += 1;
    frame++;
    if(frame == 6 && !IsCollide){
        time+=0.1;
        document.getElementById("Time").innerHTML=time.toFixed(1);
        frame=0;
    }
    if (beginCreateRocks > 50 && !IfCreateRocks) {
        createRocks();
        IfCreateRocks = true;
    }
    if (beginCreateRocks > 51) {
        rocks.mesh.rotation.z += Math.PI / 360;
        t += 1;
        var stepAngle = Math.PI * 2 / 15;
        if (!IsCollide) {
            for (let i = 0; i < 15; i++) {
                let a = (stepAngle * i) + ((Math.PI / 360) * t);
                Collide(rocksH[i], a);
            }
        }
    }

    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}

// 检测是否发生碰撞
var IsCollide = false;
function Collide(h, a) {
    let rX = Math.cos(a) * h;
    let rY = Math.sin(a) * h;
    if (Math.abs(rX - targetX) < 10 && Math.abs(targetY + 600 - rY) < 10) {
        scene.remove(rocks.mesh);
        IsCollide = true;
    }
}

// 飞机移动
var mousePos = { x: 0, y: 0 };
function updatePlane() {
    if (!IsCollide) {
        targetY = normalize(mousePos.y, -0.75, 0.75, 25, 175);
        targetX = normalize(mousePos.x, -0.75, 0.75, -100, 100);
        airplane.mesh.position.y = targetY;
        airplane.mesh.position.x = targetX;
        airplane.propeller.rotation.x += 0.5;
    }
    else {
        airplane.mesh.rotation.z = -Math.PI * 0.25;
        airplane.mesh.position.x += 2.5;
        airplane.mesh.position.y -= 2.5;
    }
}

function normalize(v, vmin, vmax, tmin, tmax) {
    var nv = Math.max(Math.min(v, vmax), vmin);
    var dv = vmax - vmin;
    var pc = (nv - vmin) / dv;
    var dt = tmax - tmin;
    var tv = tmin + (pc * dt);
    return tv;
}

// 处理鼠标事件
function handleMouseMove(event) {
    var tx = -1 + (event.clientX / window.innerWidth) * 2;
    var ty = 1 - (event.clientY / window.innerHeight) * 2;
    mousePos = { x: tx, y: ty };
}


function init(event) {
    document.addEventListener('mousemove', handleMouseMove, false);
    createScene();
    createLights();
    createPlane();
    createLand();
    createSky();
    // createRocks();
    loop();
}

// 网页加载完毕后的事件处理程序
window.addEventListener('load', init, false);
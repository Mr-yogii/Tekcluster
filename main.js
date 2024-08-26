function countdown() {
    const eventDate = new Date('September 21, 2024 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById('days').innerText = days < 10 ? `0${days}` : days;
    document.getElementById('hours').innerText = hours < 10 ? `0${hours}` : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? `0${seconds}` : seconds;
    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById('days').innerText = "00";
        document.getElementById('hours').innerText = "00";
        document.getElementById('minutes').innerText = "00";
        document.getElementById('seconds').innerText = "00";
    }
}
const timerInterval = setInterval(countdown, 1000);
document.getElementById('mobile-menu').addEventListener('click', function() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
    this.classList.toggle('active');
});
document.querySelectorAll('.nav-links').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelectorAll('.nav-links').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        const sectionId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(sectionId);
        window.scrollTo({
            top: targetSection.offsetTop - document.querySelector('nav').offsetHeight,
            behavior: 'smooth'
        });
        if (window.innerWidth <= 768) {
            document.querySelector('.nav-menu').classList.remove('active');
            document.getElementById('mobile-menu').classList.remove('active');
        }
    });
});
document.getElementById('register-btn')?.addEventListener('click', function() {
    alert('Register button clicked!');
});

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 100;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

function setVideoBackground() {
    const video = document.createElement('video');
    video.src = 'Bg4.mp4';
    video.loop = true;
    video.muted = true;
    video.playbackRate = 0.3;
    video.play();
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;
    videoTexture.wrapS = THREE.ClampToEdgeWrapping;
    videoTexture.wrapT = THREE.ClampToEdgeWrapping;
    scene.background = videoTexture;
    video.style.opacity = '2';
}

function createElectricShock() {
    const shockGroup = new THREE.Group();
    scene.add(shockGroup);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });
    function addShockLine() {
        const points = [];
        let currentX = (Math.random() - 0.5) * window.innerWidth / 2;
        let currentY = (Math.random() - 0.5) * window.innerHeight / 2;
        const segments = Math.floor(Math.random() * 15) + 5;
        const segmentLength = 16; 
        for (let i = 0; i < segments; i++) {
            points.push(new THREE.Vector3(currentX, currentY, 0));
            currentX += (Math.random() - 0.5) * segmentLength * 2;
            currentY += (Math.random() - 0.5) * segmentLength * 2;
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        shockGroup.add(line);
        setTimeout(() => {
            shockGroup.remove(line);
            geometry.dispose();
            line.material.dispose();
        }, 100);
    }
    function animateShock() {
        requestAnimationFrame(animateShock);
        if (Math.random() > 0.8) {
            addShockLine();
        }
        renderer.render(scene, camera);
    }
    animateShock();
}
setVideoBackground();
createElectricShock();
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

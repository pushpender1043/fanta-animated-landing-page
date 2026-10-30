// --- 1. LENIS SMOOTH SCROLL SETUP ---
const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


// --- 2. EXISTING ANIMATION SETUP ---
const width = window.innerWidth;
let mm = gsap.matchMedia();

gsap.set("#fanta", { width: "40%" });
gsap.set("#orange-cut", { width: "20%" });

// Timeline 1: Section 1 to 2
var tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".two",
        start: "0% 95%",
        end: "60% 50%",
        scrub: 1,
    }
});

// Timeline 2: Section 2 to 3
var tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".three",
        start: "5% 95%",
        end: "20% 50%",
        scrub: 1,
    }
});

// --- SCROLL ANIMATIONS ---
tl.to("#fanta", { top: "120%", left: "0%", duration: 0.5 }, 'orange')
tl.to("#orange-cut", { top: "160%", left: "23%", duration: 0.5 }, 'orange')
tl.to("#orange", { width: "15%", top: "160%", right: "10%", duration: 0.5 }, 'orange')
tl.to("#leaf", { top: "110%", rotate: "130deg", left: "70%", duration: 0.5 }, 'orange')
tl.to("#leaf2", { top: "110%", rotate: "130deg", left: "0%", duration: 0.5 }, 'orange')

tl2.from(".lemon1", { rotate: "-90deg", top: "110%", left: "-100%", duration: 0.5 }, 'lemon')
tl2.from(".lemon2", { rotate: "90deg", top: "110%", left: "100%", duration: 0.5 }, 'lemon')
tl2.from("#cocacola", { rotate: "-90deg", top: "100%", left: "-110%", duration: 0.5 }, 'lemon')
tl2.from("#pepsi", { rotate: "90deg", top: "100%", left: "110%", duration: 0.5 }, 'lemon')

tl2.to("#orange-cut", { left: '40%', top: "204%", width: "20%", zIndex: 10, duration: 0.5 }, 'lemon')
tl2.to("#fanta", { width: "30%", left: '35%', top: "212%", zIndex: 10, duration: 0.5 }, 'lemon')

// --- RESPONSIVE TIMELINES ---
mm.add("(max-width: 1100px)", () => {
    tl.to("#fanta", { top: "140%", left: "0%" }, 'orange')
    tl.to("#orange-cut", { top: "160%", left: "23%" }, 'orange')
    tl2.to("#fanta", { width: "30%", left: '35%', top: "222%" }, 'lemon')
    tl2.to("#orange-cut", { left: '41%', width: "18%", top: "212%" }, 'lemon')
})

mm.add("(max-width: 780px)", () => {
    tl.to("#fanta", { top: "145%" }, 'orange')
    tl2.to("#fanta", { width: "43%", left: '29%', top: "227%" }, 'lemon')
    tl2.to("#orange-cut", { top: "218%" }, 'lemon')
})

mm.add("(max-width: 550px)", () => {
    tl.to("#fanta", { top: "115%", width: "50%", left: "25%" }, 'orange')
    tl.to("#orange-cut", { left: "50%", top: "130%" }, 'orange')
})


// --- 3. CUSTOM MOUSE FOLLOWER CURSOR ---
var cursor = document.querySelector("#cursor");

document.addEventListener("mousemove", function(e) {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
    });
});


// --- 4. PARALLAX EFFECT (HERO SECTION) ---
document.querySelector(".one").addEventListener("mousemove", function (e) {
    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;

    var moveX = (e.clientX - centerX) / 30;
    var moveY = (e.clientY - centerY) / 30;

    gsap.to("#fanta", { x: moveX * 0.4, y: moveY * 0.4, duration: 1, ease: "power2.out" });
    gsap.to("#orange-cut", { x: -moveX, y: -moveY, duration: 1, ease: "power2.out" });
    gsap.to("#orange", { x: moveX, y: moveY, duration: 1, ease: "power2.out" });
    gsap.to("#leaf", { x: -moveX * 1.5, y: -moveY * 1.5, rotate: "+=2", duration: 1, ease: "power2.out" });
    gsap.to("#leaf2", { x: moveX * 1.2, y: moveY * 1.2, rotate: "-=2", duration: 1, ease: "power2.out" });
});


// --- 5. 3D TILT EFFECT FOR CARDS ---
document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        let rect = card.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        
        // Tilt Calculation
        let dx = (x - rect.width / 2) / 15;
        let dy = (y - rect.height / 2) / 15;

        gsap.to(card, {
            rotationY: dx,
            rotationX: -dy,
            transformPerspective: 1000,
            ease: "power1.out",
            duration: 0.3
        });
    });

    card.addEventListener("mouseleave", () => {
        gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            ease: "power1.out",
            duration: 0.5
        });
    });
});
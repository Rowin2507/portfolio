// GLOBAL --------------------------------
// GLOBAL --------------------------------
var body = document.querySelector("body");
var windowHeight = document.documentElement.clientHeight;
var windowWidth = document.documentElement.clientWidth;



// INITIAL LOADING (OVERLAY) --------------------------------
// INITIAL LOADING (OVERLAY) --------------------------------
window.addEventListener('load', (e) => {
    body.classList.add("loaded");

    setTimeout(() => {
        body.classList.add("loaded-fully");
    }, "500");
});



// NAV MARKER --------------------------------
// NAV MARKER --------------------------------
var navMarker = document.querySelector("header > nav div");
var navItems = document.querySelectorAll("header > nav ul li");

function indicator(e) {
    navMarker.style.left = e.offsetLeft + "px";
    navMarker.style.width = e.offsetWidth + "px";
}

for (var i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener("click", (e)=> {
        indicator(e.target);
        
        // REMOVE CLASS FROM ACTIVE ELEMENT AND ADD TO CURRENT ELEMENT
        document.querySelector('.active') ? document.querySelector('.active').classList.remove('active') : '';
        e.target.classList.add("active");
    });
}

window.addEventListener('load', (e) => {
    navMarker.style.left = navItems[0].offsetLeft + "px";
    navMarker.style.width = navItems[0].offsetWidth + "px";
});



// LANDING RENDER CANVAS --------------------------------
// LANDING RENDER CANVAS --------------------------------
const html = document.documentElement;
const canvas = document.querySelector("section.landing-render canvas");
const context = canvas.getContext("2d");

const frameCount = 131;
const currentFrame = index => (
    `assets/images/animation/${index.toString().padStart(4, '0')}.png`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width = 2560;
canvas.height = 1080;

img.onload=function(){
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => updateImage(frameIndex + 1));

  console.log(frameIndex);
});

preloadImages();
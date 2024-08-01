// // Initialize EmailJS with your user ID
// emailjs.init("15i4Plu9QY29omjH6");

// Initialize Three.js scene for hero section
const heroCanvas = document.getElementById("hero-canvas");
const heroScene = new THREE.Scene();
const heroCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const heroRenderer = new THREE.WebGLRenderer({
  canvas: heroCanvas,
  alpha: true,
});
heroRenderer.setSize(window.innerWidth, window.innerHeight);

// Create a rotating group of dry fruits
const fruitsGroup = new THREE.Group();
heroScene.add(fruitsGroup);

const loader = new THREE.TextureLoader();
const fruitGeometry = new THREE.SphereGeometry(1, 32, 32);
const fruitMaterials = [
  new THREE.MeshPhongMaterial({ map: loader.load("cashew_texture.jpg") }),
  new THREE.MeshPhongMaterial({ map: loader.load("raisin_texture.jpg") }),
  new THREE.MeshPhongMaterial({ map: loader.load("almond_texture.jpg") }),
  new THREE.MeshPhongMaterial({ map: loader.load("walnut_texture.jpg") }),
  new THREE.MeshPhongMaterial({ map: loader.load("pista_texture.jpg") }),
];

for (let i = 0; i < 100; i++) {
  const fruit = new THREE.Mesh(
    fruitGeometry,
    fruitMaterials[Math.floor(Math.random() * fruitMaterials.length)]
  );
  fruit.position.set(
    Math.random() * 20 - 10,
    Math.random() * 20 - 10,
    Math.random() * 20 - 10
  );
  fruit.scale.setScalar(Math.random() * 0.3 + 0.1);
  fruitsGroup.add(fruit);
}

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
heroScene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
heroScene.add(directionalLight);

heroCamera.position.z = 15;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  fruitsGroup.rotation.x += 0.003;
  fruitsGroup.rotation.y += 0.005;
  heroRenderer.render(heroScene, heroCamera);
}
animate();

// Resize handler
window.addEventListener("resize", () => {
  heroCamera.aspect = window.innerWidth / window.innerHeight;
  heroCamera.updateProjectionMatrix();
  heroRenderer.setSize(window.innerWidth, window.innerHeight);
});

// Scroll animation for products
const products = document.querySelectorAll(".product");
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const productObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

products.forEach((product) => {
  product.style.opacity = 0;
  product.style.transform = "translateY(50px)";
  product.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  productObserver.observe(product);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// CTA button animation
const ctaButton = document.getElementById("cta-button");
ctaButton.addEventListener("mouseover", () => {
  ctaButton.style.transform = "scale(1.05) translateY(-2px)";
  ctaButton.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.2)";
});
ctaButton.addEventListener("mouseout", () => {
  ctaButton.style.transform = "scale(1) translateY(0)";
  ctaButton.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrollPosition = window.pageYOffset;
  fruitsGroup.position.y = scrollPosition * 0.05;
});

// Header animation on scroll
const header = document.querySelector("header");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  header.style.transform =
    scrollTop > lastScrollTop ? "translateY(-100%)" : "translateY(0)";
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Product hover effect
products.forEach((product) => {
  product.addEventListener("mouseenter", () => {
    product.querySelector("img").style.transform = "scale(1.1)";
  });
  product.addEventListener("mouseleave", () => {
    product.querySelector("img").style.transform = "scale(1)";
  });
});

// Newsletter form submission
const newsletterForm = document.querySelector(".newsletter");
newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = newsletterForm.querySelector('input[type="email"]').value;
  if (email) {
    alert("Thank you for subscribing to our newsletter!");
    newsletterForm.reset();
  } else {
    alert("Please enter a valid email address.");
  }
});

// Dynamic copyright year
const copyrightYear = document.querySelector("footer p");
copyrightYear.textContent = `© ${new Date().getFullYear()} Jagdamba Traders. All rights reserved.`;

// Loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Interactive product showcase
const productShowcase = document.createElement("div");
productShowcase.classList.add("product-showcase");
document.body.appendChild(productShowcase);

products.forEach((product) => {
  product.addEventListener("click", () => {
    const productName = product.querySelector("h3").textContent;
    const productImage = product.querySelector("img").src;

    productShowcase.innerHTML = `
      <div class="showcase-content">
        <img src="${productImage}" alt="${productName}">
        <h2>${productName}</h2>
        <p>Experience the premium quality of our ${productName}. Handpicked and carefully processed to ensure the best flavor and nutrition.</p>
        <button class="close-showcase">Close</button>
      </div>
    `;

    productShowcase.style.display = "flex";
    setTimeout(() => {
      productShowcase.style.opacity = "1";
    }, 10);

    document.querySelector(".close-showcase").addEventListener("click", () => {
      productShowcase.style.opacity = "0";
      setTimeout(() => {
        productShowcase.style.display = "none";
      }, 300);
    });
  });
});

// Initialize EmailJS with your user ID
emailjs.init("15i4Plu9QY29omjH6");

// Contact form submission
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = {
    item: contactForm.item.value,
    quantity: contactForm.quantity.value,
    name: contactForm.name.value,
    phone: contactForm.phone.value,
  };

  console.log("Form data:", formData); // Debugging: Check the form data

  emailjs
    .send("service_1y2mmce", "template_0izjsra", formData)
    .then(function (response) {
      console.log("EmailJS response:", response); // Debugging: Check the response
      alert("Order sent successfully!");
      contactForm.reset();
    })
    .catch(function (error) {
      console.error("EmailJS error:", error); // Debugging: Check the error
      alert("Failed to send order. Please try again.");
    });
});

// ===== Helpers =====

// Welke pagina zijn we? ("index", "about", "portfolio", "skills", "contact")
function getPageSlug() {
    let path = location.pathname.replace(/\/+$/, "");
    const parts = path.split("/").filter(Boolean);
    if (parts.length === 0) return "index";

    const last = parts[parts.length - 1];
    if (last.endsWith(".html")) {
        const name = last.slice(0, -5);
        if (name !== "index") return name;
        return parts.length > 1 ? parts[parts.length - 2] : "index";
    }
    return last; // mapnaam
}

// Taal laden vanaf site-root: /en/<page>_en.xml of /nl/<page>_nl.xml
async function loadLanguage(lang) {
    localStorage.setItem("userLang", lang);

    const page = getPageSlug();             // bv. "portfolio"
    const file = `/${lang}/${page}_${lang}.xml`; // bv. "/en/portfolio_en.xml"

    try {
        const res = await fetch(file, { cache: "no-store" });
        if (!res.ok) {
            console.error("Kon taalbestand niet laden:", file, res.status);
            return;
        }
        const text = await res.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "application/xml");
        applyTranslations(xmlDoc);
    } catch (e) {
        console.error("Fout bij laden taalbestand:", file, e);
    }
}

let translations = {}; // gevuld in applyTranslations

function applyTranslations(xmlDoc) {
    const currentYear = new Date().getFullYear();
    const previousYear = 2023;
    const yearText = `${previousYear}-${currentYear}`;

    translations = {};
    const nodes = xmlDoc.getElementsByTagName("translation");
    for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const key = n.getAttribute("id");
        const text = (n.textContent || "").replace("{year}", yearText);
        translations[key] = text;
    }

    // Elementen met id invullen
    document.querySelectorAll("[id]").forEach((el) => {
        const key = el.id;
        if (translations[key]) el.innerHTML = translations[key];
    });

    // Tooltips updaten
    document.querySelectorAll("[data-translation-id]").forEach((el) => {
        const key = el.getAttribute("data-translation-id");
        if (translations[key]) el.setAttribute("title", translations[key]);
    });

    // Optioneel: CV embed (alleen op contactpagina)
    const resumeNode = xmlDoc.querySelector('translation[id="resumeEmbedSrc"]');
    const resumeEmbed = document.getElementById("resumeEmbed");
    if (resumeNode && resumeEmbed) {
        resumeEmbed.src = resumeNode.textContent;
    }
}

// Sterrenveld
function getRandomColor() {
    const colors = ["#FFFFFF", "#F0F8FF", "#E0FFFF", "#E6E6FA", "#F8F8FF"];
    return colors[Math.floor(Math.random() * colors.length)];
}
function generateStars(n) {
    const sky = document.getElementById("starry-sky");
    if (!sky) return;

    for (let i = 0; i < n; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.position = "absolute";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        const size = Math.random() * 7 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.borderRadius = "50%";
        star.style.backgroundColor = getRandomColor();

        const dur = 3 + Math.random() * 7;
        const delay = Math.random() * 10;
        star.style.animation = `twinkle ${dur}s ease-in-out ${delay}s infinite`;
        star.style.opacity = Math.random();

        sky.appendChild(star);
    }
}

// Navigatie via bewegende planeten
function showPage(el) {
    const page = el?.dataset?.page;
    if (!page) return;

    let base = "/";
    const pathParts = location.pathname.split("/").filter(Boolean);

    // Speciale case: WebStorm Live Preview: /JustMeGameDev.github.io/index.html
    if (location.hostname === "localhost" && pathParts.length > 0 &&
        pathParts[0].endsWith(".github.io")) {
        base = `/${pathParts[0]}/`;
    }

    location.href = `${base}${page}/`;
}

// Tooltip voor planeten
let mouseX = 0, mouseY = 0;
function updateTooltipPosition(tooltip) {
    tooltip.style.left = `${mouseX}px`;
    tooltip.style.top = `${mouseY}px`;
}
function showTooltipAtMouse(element) {
    const tooltip = document.getElementById("mouse-tooltip");
    if (!tooltip) return;

    const name = element.getAttribute("data-name");
    const isSun = element.className.includes("sun");
    let msg = isSun
        ? (translations["travelToStar"] || "TRAVEL TO THE STAR")
        : (translations["travelToPlanet"] || "TRAVEL TO THE PLANET");
    msg += `: ${translations[name] || name || "Unknown"}`;

    tooltip.textContent = msg;
    tooltip.style.opacity = "1";
    updateTooltipPosition(tooltip);
}
function hideMouseTooltip() {
    const tooltip = document.getElementById("mouse-tooltip");
    if (tooltip) tooltip.style.opacity = "0";
}

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
    // 1. Taal instellen
    let userLang = localStorage.getItem("userLang") || "en";
    localStorage.setItem("userLang", userLang);
    loadLanguage(userLang);

    // 2. Taal-knoppen (als ze op de pagina staan)
    const btnEN = document.getElementById("switchToEnglish");
    const btnNL = document.getElementById("switchToDutch");
    if (btnEN) btnEN.addEventListener("click", () => loadLanguage("en"));
    if (btnNL) btnNL.addEventListener("click", () => loadLanguage("nl"));

    // 3. Header tooltips (als aanwezig)
    const headerTooltip = document.getElementById("header-tooltip");
    const headerImages = document.querySelectorAll(".header-img");
    const spaceshipImg = document.querySelector('.header-img[title="System Overview"]');

    if (headerTooltip && headerImages.length > 0) {
        headerImages.forEach((img) => {
            img.addEventListener("mouseenter", function () {
                headerTooltip.textContent = this.title;
                headerTooltip.style.opacity = 1;
                headerTooltip.style.visibility = "visible";
            });
            img.addEventListener("mousemove", (event) => {
                headerTooltip.style.top = `${event.pageY + 10}px`;
                headerTooltip.style.left = `${event.pageX}px`;
            });
            img.addEventListener("mouseleave", () => {
                headerTooltip.style.opacity = 0;
                headerTooltip.style.visibility = "hidden";
            });
        });
    }

    // 4. Hamburger menu (als aanwezig)
    const menuToggle = document.getElementById("menu-toggle");
    const navText = document.getElementById("nav-text");
    if (menuToggle && navText) {
        menuToggle.addEventListener("click", () => {
            navText.classList.toggle("open");
        });
    }

    // 5. Huidige pagina highlighten in nav
    const slug = getPageSlug();
    document.querySelectorAll(".nav-link").forEach((link) => {
        if (link.getAttribute("data-page") === slug) {
            link.classList.add("current-page");
        }
    });

    // 6. Titel van spaceship bij portrait/landscape
    function updateSpaceshipTitle() {
        if (!spaceshipImg) return;
        if (window.innerWidth < window.innerHeight) {
            spaceshipImg.setAttribute("title", "Home");
        } else {
            spaceshipImg.setAttribute("title", "System Overview");
        }
    }
    if (spaceshipImg) {
        updateSpaceshipTitle();
        window.addEventListener("resize", updateSpaceshipTitle);
    }

    // 7. Sterrenveld
    generateStars(200);

    // 8. Mouse tracking voor planeten-tooltips
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        const tooltip = document.getElementById("mouse-tooltip");
        if (tooltip && tooltip.style.opacity > 0) {
            updateTooltipPosition(tooltip);
        }
    });

    document.querySelectorAll(".planet, .sun").forEach((el) => {
        el.addEventListener("mouseenter", function () {
            this.style.animationPlayState = "paused";
            showTooltipAtMouse(this);
        });
        el.addEventListener("mousemove", () => {
            const tooltip = document.getElementById("mouse-tooltip");
            if (tooltip) updateTooltipPosition(tooltip);
        });
        el.addEventListener("mouseleave", function () {
            this.style.animationPlayState = "running";
            hideMouseTooltip();
        });
        // klik = naar pagina
        el.addEventListener("click", () => showPage(el));
    });
});

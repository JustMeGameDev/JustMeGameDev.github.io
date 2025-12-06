document.addEventListener("DOMContentLoaded", () => {
    // Check if the page is being accessed on GitHub Pages
    const isLivePage = window.location.hostname.includes("github.io")

    // If on GitHub Pages, force English language
    if (isLivePage) {
        loadLanguage("en")
    } else {
        // Check user's language preference in local storage or default to English
        let userLang = localStorage.getItem("userLang")
        if (!userLang) {
            userLang = "en"
            localStorage.setItem("userLang", userLang)
        }
        loadLanguage(userLang)
    }
})
document.addEventListener("DOMContentLoaded", () => {
    const headerTooltip = document.getElementById("header-tooltip")
    const headerImages = document.querySelectorAll(".header-img")
    const spaceshipImg = document.querySelector('.header-img[title="System Overview"]')

    headerImages.forEach((img) => {
        img.addEventListener("mouseenter", function () {
            headerTooltip.textContent = this.title // Set the tooltip text based on the image title attribute
            headerTooltip.style.opacity = 1
            headerTooltip.style.visibility = "visible"
        })

        img.addEventListener("mousemove", (event) => {
            headerTooltip.style.top = `${event.pageY + 10}px`
            headerTooltip.style.left = `${event.pageX}px`
        })

        img.addEventListener("mouseleave", () => {
            headerTooltip.style.opacity = 0
            headerTooltip.style.visibility = "hidden"
        })
    })

    // Hamburger Menu Toggle for Mobile
    const menuToggle = document.getElementById("menu-toggle")
    const navText = document.getElementById("nav-text")

    menuToggle.addEventListener("click", () => {
        navText.classList.toggle("open")
    })

    // Highlight the Current Page in Both Navigation Menus
    const currentPage = window.location.pathname.split("/").pop().split(".")[0]
    const navLinks = document.querySelectorAll(".nav-link")

    navLinks.forEach((link) => {
        if (link.getAttribute("data-page") === currentPage) {
            link.classList.add("current-page")
        }
    })

    // Update Title for Spaceship Image when in Portrait Mode
    function updateSpaceshipTitle() {
        if (window.innerWidth < window.innerHeight) {
            spaceshipImg.setAttribute("title", "Home")
        } else {
            spaceshipImg.setAttribute("title", "System Overview")
        }
    }

    updateSpaceshipTitle()
    window.addEventListener("resize", updateSpaceshipTitle)
})

// Immediately set the language to English when the script is loaded for the first time
loadLanguage(localStorage.getItem("userLang"))

// Event listener for language switch
document.getElementById("switchToEnglish").addEventListener("click", () => {
    loadLanguage("en")
})

document.getElementById("switchToDutch").addEventListener("click", () => {
    loadLanguage("nl")
})

let translations = {} // Global object to store translations

// Bepaalt "slug" van de huidige pagina (index, about, portfolio, skills, contact)
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

async function loadLanguage(lang) {
    localStorage.setItem("userLang", lang);
    const page = getPageSlug(); // bv. "portfolio"

    const prefix = computePrefix();  // bv. "../" of "../../" of ""
    const file   = `${page}_${lang}.xml`;

    // Probeer meerdere varianten: met prefix, zonder, absolute
    const candidates = [
        `${prefix}${lang}/${file}`,
        `${lang}/${file}`,
        `/${lang}/${file}`
    ];

    try {
        const xmlDoc = await loadXML(candidates);
        applyTranslations(xmlDoc);
    } catch (e) {
        console.error("Taalbestand niet gevonden:", candidates);
    }
}

function applyTranslations(xmlDoc) {
    var currentYear = new Date().getFullYear()
    var previousYear = 2023
    var yearText = `${previousYear}-${currentYear}` // Generates "2023-2024"

    translations = {} // Reset translations object

    var translationNodes = xmlDoc.getElementsByTagName("translation")
    for (var i = 0; i < translationNodes.length; i++) {
        var node = translationNodes[i]
        var key = node.getAttribute("id")
        var text = node.textContent
        translations[key] = text.replace("{year}", yearText)
    }

    // Apply translations to elements
    document.querySelectorAll("[id]").forEach((element) => {
        const key = element.getAttribute("id")
        if (translations[key]) {
            element.innerHTML = translations[key]
        }
    })

    // Update tooltips
    document.querySelectorAll("[data-translation-id]").forEach((element) => {
        const key = element.getAttribute("data-translation-id")
        if (translations[key]) {
            element.setAttribute("title", translations[key])
        }
    })

    var resumeNode = xmlDoc.querySelector('translation[id="resumeEmbedSrc"]')
    if (resumeNode) {
        document.getElementById("resumeEmbed").src = resumeNode.textContent
    }
}

document.querySelectorAll(".orbit").forEach((orbit) => {
    orbit.addEventListener("animationiteration", () => {
        console.log("A planet has completed an orbit!")
    })
})

// Mouse position tracking for tooltip
let mouseX = 0
let mouseY = 0

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    // Update tooltip position if it's visible
    const tooltip = document.getElementById("mouse-tooltip")
    if (tooltip && tooltip.style.opacity > 0) {
        updateTooltipPosition(tooltip)
    }
})

function updateTooltipPosition(tooltip) {
    // Position the tooltip near the mouse cursor
    tooltip.style.left = `${mouseX}px`
    tooltip.style.top = `${mouseY}px`
}

document.querySelectorAll(".planet, .sun").forEach((element) => {
    element.addEventListener("mouseenter", function (e) {
        // Pause animation
        this.style.animationPlayState = "paused"

        // Show tooltip at mouse position
        showTooltipAtMouse(this)
    })

    element.addEventListener("mousemove", (e) => {
        // Update tooltip position as mouse moves
        const tooltip = document.getElementById("mouse-tooltip")
        updateTooltipPosition(tooltip)
    })

    element.addEventListener("mouseleave", function () {
        // Resume animation
        this.style.animationPlayState = "running"

        // Hide tooltip
        hideMouseTooltip()
    })
})

function showTooltipAtMouse(element) {
    const tooltip = document.getElementById("mouse-tooltip")
    const name = element.getAttribute("data-name")
    const elementClass = element.getAttribute("class")

    let message = ""
    if (elementClass.includes("sun")) {
        message = translations["travelToStar"] || "TRAVEL TO THE STAR"
    } else {
        message = translations["travelToPlanet"] || "TRAVEL TO THE PLANET"
    }

    message += `: ${translations[name] || name || "Unknown"}`

    tooltip.textContent = message
    tooltip.style.opacity = "1"
    updateTooltipPosition(tooltip)
}

function hideMouseTooltip() {
    const tooltip = document.getElementById("mouse-tooltip")
    tooltip.style.opacity = "0"
}

function showTooltip(element) {
    // This function is kept for backward compatibility
    showTooltipAtMouse(element)
}

function hideTooltip() {
    // This function is kept for backward compatibility
    hideMouseTooltip()
}

function generateStars(numberOfStars) {
    const sky = document.getElementById("starry-sky")

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement("div")
        star.className = "star"
        star.style.position = "absolute"
        star.style.left = `${Math.random() * 100}%`
        star.style.top = `${Math.random() * 100}%`

        // Randomize star size between 1px and 7px
        const size = Math.random() * 7 + 1
        star.style.width = `${size}px`
        star.style.height = `${size}px`

        star.style.borderRadius = "50%"
        star.style.backgroundColor = getRandomColor()

        // Add animation with random duration and delay
        const animationDuration = 3 + Math.random() * 7 // Between 3 and 10 seconds
        const animationDelay = Math.random() * 10 // Random delay up to 10 seconds

        star.style.animation = `twinkle ${animationDuration}s ease-in-out ${animationDelay}s infinite`
        star.style.opacity = Math.random() // Start with random opacity

        sky.appendChild(star)
    }
}

function getRandomColor() {
    const colors = ["#FFFFFF", "#F0F8FF", "#E0FFFF", "#E6E6FA", "#F8F8FF"] // Example star colors
    return colors[Math.floor(Math.random() * colors.length)]
}

function showPage(el){
    const page = el?.dataset?.page;
    if (!page) return;

    // base bepalen: "/" (user/custom domain) of "/reponaam/" (project pages)
    const segs = location.pathname.split("/").filter(Boolean);
    const base = (segs.length > 0 && !location.pathname.endsWith(".html")) ? `/${segs[0]}/` : `/`;

    // altijd naar de map-URL navigeren
    location.href = `${base}${page}/`;
}


document.querySelectorAll(".header-img").forEach((img) => {
    img.addEventListener("mouseenter", function () {
        // Get the tooltip element
        const tooltip = document.querySelector(".header-tooltip")
        // Set the tooltip text to the title of the image
        tooltip.textContent = this.title
        // Optional: make the tooltip visible if it's hidden by default
        tooltip.style.opacity = 1
    })

    img.addEventListener("mouseleave", () => {
        // Clear the tooltip text when not hovering
        const tooltip = document.querySelector(".header-tooltip")
        tooltip.style.opacity = 0

        // Optional: hide the tooltip when not hovering
    })
})

// === universele helpers voor paden + fetch ===

// Bepaal hoeveel niveaus diep je nu zit en maak een prefix als "../../" etc.
function computePrefix() {
    // vb: "/" -> [], "/portfolio/" -> ["portfolio"], "/repo/skills/" -> ["repo","skills"]
    const parts = location.pathname.replace(/\/+$/, "").split("/").filter(Boolean);

    // Als je user/ custom domain site in root draait: depth = 1 voor "/portfolio" (map)
    // Als je een project page draait: depth = 2 voor "/reponaam/portfolio"
    // In beide gevallen willen we 1 stap omhoog per extra niveau (behalve het laatste, dat de map zelf is).
    // Concreet: we willen van "/portfolio/" naar root: "../"
    //           van "/reponaam/portfolio/" naar root: "../../"
    const depth = Math.max(0, parts.length); // veilige benadering
    return "../".repeat(depth);
}

// Probeer een lijst mogelijke paden tot er één werkt
async function fetchFirstOK(urls) {
    for (const u of urls) {
        try {
            const res = await fetch(u, { cache: "no-store" });
            if (res.ok) return res.text();
        } catch (_) {}
    }
    throw new Error("Kon geen XML laden uit: " + urls.join(", "));
}

// Laad een XML-bestand door meerdere pad-varianten te proberen
async function loadXML(variants) {
    const text = await fetchFirstOK(variants);
    const parser = new DOMParser();
    return parser.parseFromString(text, "application/xml");
}


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

generateStars(200) // Generate 200 stars. Adjust the number as needed.


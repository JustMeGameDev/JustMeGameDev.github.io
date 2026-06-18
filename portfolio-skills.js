(function () {
    const cardPage = document.body.dataset.cardPage

    if (!cardPage) {
        return
    }

    document.addEventListener("DOMContentLoaded", () => {
        setupCarousel()
        loadCardsForCurrentLanguage()

        document.getElementById("switchToEnglish")?.addEventListener("click", () => {
            setTimeout(loadCardsForCurrentLanguage, 50)
        })

        document.getElementById("switchToDutch")?.addEventListener("click", () => {
            setTimeout(loadCardsForCurrentLanguage, 50)
        })
    })

    function getCurrentLanguage() {
        if (window.location.hostname.includes("github.io")) {
            return "en"
        }

        return localStorage.getItem("userLang") || "en"
    }

    function loadCardsForCurrentLanguage() {
        const lang = getCurrentLanguage()
        const filepath = `/${lang}/${cardPage}_${lang}.xml`

        fetch(filepath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Could not load ${filepath}`)
                }
                return response.text()
            })
            .then((xmlText) => new DOMParser().parseFromString(xmlText, "application/xml"))
            .then((xmlDoc) => {
                if (cardPage === "portfolio") {
                    renderPortfolio(xmlDoc)
                } else {
                    renderSkills(xmlDoc)
                }
            })
            .catch((error) => {
                const target = document.getElementById(cardPage === "portfolio" ? "portfolioGrid" : "skillsGrid")
                target.innerHTML = `<p>${error.message}</p>`
            })
    }

    function text(node, selector, fallback = "") {
        return node.querySelector(selector)?.textContent.trim() || fallback
    }

    function renderPortfolio(xmlDoc) {
        const grid = document.getElementById("portfolioGrid")
        const projects = Array.from(xmlDoc.querySelectorAll("project"))

        grid.innerHTML = projects.map((project) => {
            const category = text(project, "category", "uncategorized")
            const cover = text(project, "cover", "./img/Other/blackplaceholder.png")
            const engine = text(project, "engine")
            const searchTokens = portfolioSearchTokens(project)
            const filterTokens = cardFilterTokens(project)
            const carouselItems = [
                { type: mediaTypeFromPath(cover), src: cover, description: text(project, "title", "Cover") },
                ...Array.from(project.querySelectorAll("images image")).map((image) => {
                    const src = image.textContent.trim()
                    return { type: mediaTypeFromPath(src), src, description: text(project, "title", "Project image") }
                })
            ].filter((item) => item.src)
            const badges = Array.from(project.querySelectorAll("badges badge")).map((badge) => {
                const color = badge.getAttribute("color") || "#ffffff"
                return `<span class="badge" style="background:${escapeAttribute(color)}">${escapeHtml(badge.textContent.trim())}</span>`
            }).join("")
            const links = Array.from(project.querySelectorAll("links > *")).map((link) => {
                return `<a class="card-link" href="${escapeAttribute(link.textContent.trim())}" target="_blank">${escapeHtml(link.tagName)}</a>`
            }).join("")

            return `
                <article class="portfolio-card" data-search-text="${escapeAttribute(searchTokens.join(" "))}" data-filter-text="${escapeAttribute(filterTokens.join("|"))}">
                    <button class="cover-button" type="button" data-carousel='${escapeAttribute(JSON.stringify(carouselItems))}'>
                        ${renderMediaPreview(carouselItems[0], "card-cover")}
                    </button>
                    <div class="card-body">
                        <h3>${escapeHtml(text(project, "title", "Untitled"))}</h3>
                        ${engine ? `<img class="engine-logo" src="${escapeAttribute(engine)}" alt="">` : ""}
                        <p>${escapeHtml(text(project, "description"))}</p>
                        ${badges ? `<div class="badge-row">${badges}</div>` : ""}
                        ${links ? `<div class="link-row">${links}</div>` : ""}
                    </div>
                </article>
            `
        }).join("")

        setupFilters("portfolio", projects.flatMap(cardFilterTokens))
    }

    function renderSkills(xmlDoc) {
        const grid = document.getElementById("skillsGrid")
        const sets = Array.from(xmlDoc.querySelectorAll("skill-set"))

        grid.innerHTML = sets.map((set) => {
            const logo = text(set, ":scope > logo")
            const setFilterTokens = skillSetNameTokens(set)
            const setBadges = Array.from(set.querySelectorAll(":scope > badges > badge")).map((badge) => {
                const color = badge.getAttribute("color") || "#ffffff"
                return `<span class="badge" style="background:${escapeAttribute(color)}">${escapeHtml(badge.textContent.trim())}</span>`
            }).join("")
            const skills = Array.from(set.querySelectorAll(":scope > skills > skill")).map((skill) => {
                const level = Math.max(0, Math.min(100, Number(text(skill, "level", "0"))))
                const searchTokens = skillSearchTokens(set, skill)
                const filterTokens = [...setFilterTokens, ...cardFilterTokens(skill)]
                const carouselItems = Array.from(skill.querySelectorAll("media item")).map((item) => {
                    return {
                        type: text(item, "type", "image"),
                        src: text(item, "src"),
                        description: text(item, "description", text(skill, "name", "Skill media"))
                    }
                }).filter((item) => item.src)
                const badges = Array.from(skill.querySelectorAll(":scope > badges > badge")).map((badge) => {
                    const color = badge.getAttribute("color") || "#ffffff"
                    return `<span class="badge" style="background:${escapeAttribute(color)}">${escapeHtml(badge.textContent.trim())}</span>`
                }).join("")
                return `
                    <article class="skill-card" data-search-text="${escapeAttribute(searchTokens.join(" "))}" data-filter-text="${escapeAttribute(filterTokens.join("|"))}">
                        ${carouselItems.length ? `
                            <button class="cover-button" type="button" data-carousel='${escapeAttribute(JSON.stringify(carouselItems))}'>
                                ${renderMediaPreview(carouselItems[0], "card-cover")}
                            </button>
                        ` : ""}
                        <h4>${escapeHtml(text(skill, "name", "Skill"))}</h4>
                        <div class="level-bar"><div class="level-fill" style="width:${level}%"></div></div>
                        <p>${escapeHtml(text(skill, "description"))}</p>
                        ${badges ? `<div class="badge-row">${badges}</div>` : ""}
                    </article>
                `
            }).join("")

            return `
                <article class="skill-set-card">
                    <div class="skill-set-body">
                        <div class="skill-set-head">
                            ${logo ? `<img class="skill-logo" src="${escapeAttribute(logo)}" alt="">` : ""}
                            <h3>${escapeHtml(text(set, ":scope > name", "Skill set"))}</h3>
                        </div>
                        ${setBadges ? `<div class="badge-row">${setBadges}</div>` : ""}
                        <div class="skill-grid">${skills}</div>
                    </div>
                </article>
            `
        }).join("")

        setupFilters("skills", sets.flatMap(skillSetNameTokens))
    }

    function setupFilters(page, tokens) {
        const filterRow = document.getElementById(`${page}Filters`)
        const searchInput = document.getElementById(`${page}Search`)
        const cards = page === "portfolio"
            ? Array.from(document.querySelectorAll(".portfolio-card"))
            : Array.from(document.querySelectorAll(".skill-card"))

        const labels = [...new Set(tokens.map(normalizeToken).filter(Boolean))]
            .filter((token) => token !== "all")
            .sort()

        filterRow.innerHTML = `<button class="filter-btn active" data-filter="all">All</button>${labels.map((label) => {
            return `<button class="filter-btn" data-filter="${escapeAttribute(label)}">${escapeHtml(displayToken(label))}</button>`
        }).join("")}`

        let activeFilter = "all"

        function applyFilters() {
            const search = normalizeToken(searchInput?.value || "")

            cards.forEach((card) => {
                const filterHaystack = normalizeToken(card.dataset.filterText || "")
                const searchHaystack = normalizeToken(`${card.dataset.searchText || ""} ${card.dataset.filterText || ""}`)
                const filterMatches = activeFilter === "all" || tokenList(filterHaystack).includes(activeFilter)
                const searchMatches = !search || searchHaystack.includes(search)
                card.classList.toggle("hidden", !filterMatches || !searchMatches)
            })

            if (page === "skills") {
                document.querySelectorAll(".skill-set-card").forEach((setCard) => {
                    const visibleSkills = setCard.querySelectorAll(".skill-card:not(.hidden)").length
                    setCard.classList.toggle("hidden", visibleSkills === 0)
                })
            }
        }

        filterRow.querySelectorAll(".filter-btn").forEach((button) => {
            button.addEventListener("click", () => {
                filterRow.querySelectorAll(".filter-btn").forEach((item) => item.classList.remove("active"))
                button.classList.add("active")
                activeFilter = button.dataset.filter
                applyFilters()
            })
        })

        searchInput?.addEventListener("input", applyFilters)
        applyFilters()
    }

    function portfolioSearchTokens(project) {
        return [
            text(project, "title"),
            text(project, "description"),
            ...cardFilterTokens(project)
        ]
    }

    function cardFilterTokens(cardNode) {
        return [
            ...Array.from(cardNode.querySelectorAll(":scope > tags > tag")).map((tag) => tag.textContent.trim()),
            ...Array.from(cardNode.querySelectorAll(":scope > badges > badge")).map((badge) => badge.textContent.trim())
        ]
    }

    function skillSetNameTokens(set) {
        return [
            text(set, ":scope > name")
        ]
    }

    function skillSearchTokens(set, skill) {
        return [
            text(set, ":scope > name"),
            text(skill, "name"),
            text(skill, "description"),
            ...skillSetNameTokens(set),
            ...cardFilterTokens(skill)
        ]
    }

    function normalizeToken(value) {
        return String(value).toLowerCase().replace(/[_/-]+/g, " ").replace(/\s+/g, " ").trim()
    }

    function tokenList(value) {
        return String(value).split("|").map(normalizeToken).filter(Boolean)
    }

    function displayToken(value) {
        return value.split(" ").map((part) => {
            if (part === "vr") {
                return "VR"
            }
            if (part === "ar") {
                return "AR"
            }
            if (part === "csharp") {
                return "C#"
            }
            return part.charAt(0).toUpperCase() + part.slice(1)
        }).join(" ")
    }

    function setupCarousel() {
        const modal = document.createElement("div")
        modal.className = "carousel-modal"
        modal.innerHTML = `
            <div class="carousel-panel" role="dialog" aria-modal="true" aria-label="Media carousel">
                <button class="carousel-close" type="button" aria-label="Close carousel">Close</button>
                <button class="carousel-nav carousel-prev" type="button" aria-label="Previous media">‹</button>
                <div class="carousel-stage"></div>
                <button class="carousel-nav carousel-next" type="button" aria-label="Next media">›</button>
                <p class="carousel-caption"></p>
            </div>
        `
        document.body.appendChild(modal)

        let items = []
        let index = 0

        function render() {
            const item = items[index]
            const stage = modal.querySelector(".carousel-stage")
            const caption = modal.querySelector(".carousel-caption")
            stage.innerHTML = renderMediaPreview(item, "carousel-media")
            caption.textContent = `${index + 1} / ${items.length}${item.description ? ` - ${item.description}` : ""}`
        }

        document.addEventListener("click", (event) => {
            const coverButton = event.target.closest(".cover-button")
            if (coverButton) {
                items = JSON.parse(coverButton.dataset.carousel || "[]")
                if (!items.length) {
                    return
                }
                index = 0
                render()
                modal.classList.add("open")
                return
            }

            if (event.target.closest(".carousel-close") || event.target === modal) {
                modal.classList.remove("open")
                return
            }

            if (event.target.closest(".carousel-prev")) {
                index = (index - 1 + items.length) % items.length
                render()
                return
            }

            if (event.target.closest(".carousel-next")) {
                index = (index + 1) % items.length
                render()
            }
        })

        document.addEventListener("keydown", (event) => {
            if (!modal.classList.contains("open")) {
                return
            }
            if (event.key === "Escape") {
                modal.classList.remove("open")
            }
            if (event.key === "ArrowLeft") {
                index = (index - 1 + items.length) % items.length
                render()
            }
            if (event.key === "ArrowRight") {
                index = (index + 1) % items.length
                render()
            }
        })
    }

    function renderMediaPreview(item, className) {
        if (!item) {
            return ""
        }
        if (item.type === "video") {
            return `<video class="${className}" src="${escapeAttribute(item.src)}" muted controls></video>`
        }
        return `<img class="${className}" src="${escapeAttribute(item.src)}" alt="${escapeAttribute(item.description || "")}">`
    }

    function mediaTypeFromPath(path) {
        return /\.(mp4|webm|mov)$/i.test(path) ? "video" : "image"
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
    }

    function escapeAttribute(value) {
        return escapeHtml(value).replace(/`/g, "&#096;")
    }
})()

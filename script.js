document.addEventListener('DOMContentLoaded', {
    // Always default to English on first load
});

function firstload(){
    let userLang = localStorage.getItem('userLang');
    console.log(userLang)
    if (userLang != 'en' || userLang != 'nl') {
        userLang = 'en';
        localStorage.setItem('userLang', userLang);
    }
    loadLanguage(userLang);
}
// Immediately set the language to English when the script is loaded for the first time
localStorage.setItem('userLang', 'en');
loadLanguage('en');

// Event listener for language switch
document.getElementById('switchToEnglish').addEventListener('click', function() {
    loadLanguage('en');
});

document.getElementById('switchToDutch').addEventListener('click', function() {
    loadLanguage('nl');
});

function loadLanguage(lang) {
    // Store language selection in localStorage
    localStorage.setItem('userLang', lang);
    let pageName = window.location.pathname.split('/').pop().split('.')[0]
    // Get the current HTML file name without extension
    if (pageName == null) 
    {
        pageName = 'index';
    }
    // Construct the filename based on the current page and language selection
    const filename = `${pageName}_${lang}.xml`;

    // Define the path using the lang directory
    const filepath = `/${lang}/${filename}`;

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            applyTranslations(this.responseXML);
        } else if (this.readyState == 4 && this.status != 200) {
            console.error("Failed to load language file:", filepath); // Log an error if the file can't be loaded
        }
    };
    xhttp.open("GET", filepath, true);
    xhttp.send();
}

function applyTranslations(xmlDoc) {
    var currentYear = new Date().getFullYear();
    var previousYear = 2023;
    var yearText = `${previousYear}-${currentYear}`; // Generates "2023-2024"

    var translations = xmlDoc.getElementsByTagName("translation");
    document.querySelectorAll("[id]").forEach(element => {
        const key = element.getAttribute("id");
        var node = xmlDoc.querySelector(`translation[id="${key}"]`);
        if (node) {
            var text = node.textContent;
            text = text.replace('{year}', yearText); // Replace the placeholder with the current year range
            element.innerHTML = text;
        }
    });

    // Update tooltips
    document.querySelectorAll("[data-translation-id]").forEach(element => {
        const key = element.getAttribute("data-translation-id");
        var node = xmlDoc.querySelector(`translation[id="${key}"]`);
        if (node) {
            element.setAttribute('title', node.textContent);
        }
    });
    var resumeNode = xmlDoc.querySelector('translation[id="resumeEmbedSrc"]');
    if (resumeNode) {
        document.getElementById('resumeEmbed').src = resumeNode.textContent;
    }
}

document.querySelectorAll('.orbit').forEach(orbit => {
    orbit.addEventListener('animationiteration', () => {
        console.log('A planet has completed an orbit!');
    });
});
document.querySelectorAll('.planet, .sun').forEach(element => {
    element.addEventListener('mouseenter', () => {
        // Pause animation
        element.style.animationPlayState = 'paused';
        showTooltip(element);
        // Show tooltip
    });
    element.addEventListener('mouseleave', () => {
        // Resume animation
        element.style.animationPlayState = 'running';
        hideTooltip(element);
        // Hide tooltip
    });
});

function showTooltip(element) {
    const tooltipArea = document.getElementById('tooltip-area');
    const name = element.getAttribute('data-name');
    const name2 = element.getAttribute('class');// This should correctly extract the attribute
    if (name2 == "sun")
    {
        tooltipArea.innerHTML = 'TRAVEL TO THE STAR: ' + name || 'Unknown'; // Fallback to 'Unknown' if attribute is missing
        tooltipArea.style.opacity = '1';
    }
    else
    {
        tooltipArea.innerHTML = 'TRAVEL TO THE PLANET: ' + name || 'Unknown'; // Fallback to 'Unknown' if attribute is missing
        tooltipArea.style.opacity = '1';

    }
}

function hideTooltip() {
    const tooltipArea = document.getElementById('tooltip-area');
    tooltipArea.style.opacity = '0';
}

function generateStars(numberOfStars) {
    const sky = document.getElementById('starry-sky');

    for (let i = 0; i < numberOfStars; i++) {
        let star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 7 }px`; // Stars size between 1px and 3px
        star.style.height = star.style.width; // Keep the star size consistent
        star.style.borderRadius = '50%';
        star.style.backgroundColor = getRandomColor();
        sky.appendChild(star);
    }
}

function getRandomColor() {
    const colors = ['#FFFFFF', '#F0F8FF', '#E0FFFF', '#E6E6FA', '#F8F8FF']; // Example star colors
    return colors[Math.floor(Math.random() * colors.length)];
}

function showPage(element) {
    const page = element.getAttribute('data-page');
    window.location.href = page + '.html';
}

document.querySelectorAll('.header-img').forEach(img => {
    img.addEventListener('mouseenter', function() {
        // Get the tooltip element
        const tooltip = document.querySelector('.header-tooltip');
        // Set the tooltip text to the title of the image
        tooltip.textContent = this.title;
        // Optional: make the tooltip visible if it's hidden by default
        tooltip.style.opacity = 1;
    });

    img.addEventListener('mouseleave', function() {
        // Clear the tooltip text when not hovering
        const tooltip = document.querySelector('.header-tooltip');
        tooltip.style.opacity = 0;

        // Optional: hide the tooltip when not hovering
    });
});

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
window.mobileCheck = function() {
    (function(a){
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
            window.location.href = "mobile.html";
    })(navigator.userAgent||navigator.vendor||window.opera);
};

function detectMobileAndRedirect() {
    if (window.mobileCheck() && window.innerHeight > window.innerWidth) {

    }
}

window.onload = mobileCheck;

generateStars(200); // Generate 200 stars. Adjust the number as needed.

const skillsData = {
    "Unity": {
        pieChart: {
            labels: ['Basic', 'Intermediate', 'Advanced'],
            data: [10, 20, 70]
        },
        media: [
            {
                type: 'image',
                src: 'img/unity_examples.png',
                description: 'Unity Engine Image Example',
                skillname:''

            },
            {
                type: 'video',
                src: 'videos/unity_demo.mp4',
                description: 'Unity Engine Video Demo',
                skillname:''

            }
        ]
    },
    "Unreal Engine": {
        pieChart: {
            labels: ['Basic', 'Intermediate', 'Advanced'],
            data: [5, 15, 80]
        },
        media: [
            {
                type: 'image',
                src: 'img/unreal_examples.png',
                description: 'Unreal Engine Image Example',
                skillname:''
            },
            {
                type: 'video',
                src: 'videos/unreal_demo.mp4',
                description: 'Unreal Engine Video Demo',
                skillname:''

            }
        ]
    },
    // Add other skills similarly
};

function showSkillDetails(skillName) {
    const pieChartDiv = document.getElementById('skill-pie-chart');
    const mediaDiv = document.getElementById('skill-media');

    // Clear previous content
    pieChartDiv.innerHTML = '';
    mediaDiv.innerHTML = '';

    // Create and append the title
    const titleDiv = document.createElement('h2');
    titleDiv.textContent = skillName;
    titleDiv.className = 'centered-title';
    pieChartDiv.appendChild(titleDiv);

    // Create and append the canvas for the chart
    const canvas = document.createElement('canvas');
    canvas.id = 'skillPieChartCanvas';
    pieChartDiv.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (window.myPieChart) { // Check if a chart instance exists
        window.myPieChart.destroy(); // Destroy existing chart instance if any
    }
    window.myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: skillsData[skillName].pieChart.labels,
            datasets: [{
                data: skillsData[skillName].pieChart.data,
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    enabled: true
                }
            }
        }
    });


    // Dynamically create media and description sections, alternating their layout
    skill.media.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'media-row' + (index % 2 === 1 ? ' reverse' : '');

        const mediaHtml = item.type === 'image' ?
            `<img src="${item.src}" alt="${item.skillName} example" style="width: 100%;">` :
            `<video controls style="width: 100%;"><source src="${item.src}" type="video/mp4">Your browser does not support the video tag.</video>`;

        const descriptionHtml = `<p>${item.description}</p>`; // Use the description from the data

        row.innerHTML = `
            <div class="media">${mediaHtml}</div>
            <div class="description">${descriptionHtml}</div>
        `;
        mediaDiv.appendChild(row);
    });

    // Display the details section
    detailsDiv.style.display = 'block';
}




function showSkillDetails(skillName) {
    const detailsDiv = document.getElementById('skill-details');
    const pieChartDiv = document.getElementById('skill-pie-chart');
    const mediaDiv = document.getElementById('skill-media');
    const skill = skillsData[skillName];
    const skillsData = {
        "Unity": {
            pieChart: {
                labels: ['Basic', 'Intermediate', 'Advanced'],
                data: [10, 20, 70]
            },
            media: [
                { type: 'image', src: 'img/unity_examples.png' },
                { type: 'video', src: 'videos/unity_demo.mp4' }
            ]
        },
        "Unreal Engine": {
            pieChart: {
                labels: ['Basic', 'Intermediate', 'Advanced'],
                data: [5, 15, 80]
            },
            media: [
                { type: 'image', src: 'img/unreal_examples.png' },
                { type: 'video', src: 'videos/unreal_demo.mp4' }
            ]
        },
        // Add other skills similarly
    };

    // Clear previous content
    pieChartDiv.innerHTML = `<canvas id="skillPieChartCanvas"></canvas>`;
    mediaDiv.innerHTML = '';

    // Create Pie Chart
    const ctx = document.getElementById('skillPieChartCanvas').getContext('2d');
    const pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: skill.pieChart.labels,
            datasets: [{
                label: 'Skill Proficiency',
                data: skill.pieChart.data,
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });

    // Display media
    skill.media.forEach(item => {
        if (item.type === 'image') {
            mediaDiv.innerHTML += `<img src="${item.src}" alt="${skillName} example" style="width: 100%; margin-top: 10px;">`;
        } else if (item.type === 'video') {
            mediaDiv.innerHTML += `<video controls style="width: 100%; margin-top: 10px;"><source src="${item.src}" type="video/mp4">Your browser does not support the video tag.</video>`;
        }
    });

    // Display the details section
    detailsDiv.style.display = 'block';
}

// You would need additional logic and possibly data sources to populate the pie charts and media dynamically.

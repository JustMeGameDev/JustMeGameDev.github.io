const skillsData = {
    "Unity": {
        pieChart: {
            labels: ['Basic', 'Intermediate', 'Advanced'],
            data: [10, 20, 70]
        },
        media: [
            {
                type: 'image',
                src: './img/Other/award_01.jpg',
                description: 'test pic',
                skillname:'Skill 1'

            },
            {
                type: 'image',
                src: './img/Other/SampleGIFImage_350kbmb.gif',
                description: 'test gif',
                skillname:'Skill 1'

            },
            {
                type: 'video',
                src: './img/Other/Free_Test_Data_15MB_MP4.mp4',
                description: 'test video',
                skillname:'Skill 2'

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
                src: './img/Other/award_01.jpg',
                description: 'test pic',
                skillname:'Skill 1'

            },
            {
                type: 'image',
                src: './img/Other/SampleGIFImage_350kbmb.gif',
                description: 'test gif',
                skillname:'Skill 1'

            },
            {
                type: 'video',
                src: './img/Other/Free_Test_Data_15MB_MP4.mp4',
                description: 'test video',
                skillname:'Skill 2'

            }
        ]
    },
    "Blender": {
        pieChart: {
            labels: ['Basic', 'Intermediate', 'Advanced'],
            data: [20, 3, 77]
        },
        media: [
            {
                type: 'image',
                src: './img/Other/award_01.jpg',
                description: 'test pic',
                skillname:'Skill 1'

            },
            {
                type: 'image',
                src: './img/Other/SampleGIFImage_350kbmb.gif',
                description: 'test gif',
                skillname:'Skill 1'

            },
            {
                type: 'video',
                src: './img/Other/Free_Test_Data_15MB_MP4.mp4',
                description: 'test video',
                skillname:'Skill 2'

            }
        ]
    },
    "C#": {
        pieChart: {
            labels: ['Basic', 'Intermediate', 'Advanced'],
            data: [50, 30, 20]
        },
        media: [
            {
                type: 'image',
                src: './img/Other/award_01.jpg',
                description: 'test pic',
                skillname:'Skill 1'

            },
            {
                type: 'image',
                src: './img/Other/SampleGIFImage_350kbmb.gif',
                description: 'test gif',
                skillname:'Skill 1'

            },
            {
                type: 'video',
                src: './img/Other/Free_Test_Data_15MB_MP4.mp4',
                description: 'test video',
                skillname:'Skill 2'

            }
        ]
    },
    "HTML,CSS,JS": {
        pieChart: {
            labels: ['Basic', 'Intermediate', 'Advanced'],
            data: [60, 35, 5]
        },
        media: [
            {
                type: 'image',
                src: './img/Other/award_01.jpg',
                description: 'test pic',
                skillname:'Skill 1'

            },
            {
                type: 'image',
                src: './img/Other/SampleGIFImage_350kbmb.gif',
                description: 'test gif',
                skillname:'Skill 1'

            },
            {
                type: 'video',
                src: './img/Other/Free_Test_Data_15MB_MP4.mp4',
                description: 'test video',
                skillname:'Skill 2'

            }
        ]
    },
    "Arduino": {
        pieChart: {
            labels: ['Basic', 'Intermediate', 'Advanced'],
            data: [80, 15, 5]
        },
        media: [
            {
                type: 'image',
                src: './img/Other/award_01.jpg',
                description: 'test pic',
                skillname:'Skill 1'

            },
            {
                type: 'image',
                src: './img/Other/SampleGIFImage_350kbmb.gif',
                description: 'test gif',
                skillname:'Skill 1'

            },
            {
                type: 'video',
                src: './img/Other/Free_Test_Data_15MB_MP4.mp4',
                description: 'test video',
                skillname:'Skill 2'

            }
        ]
    },
    // Add other skills similarly
};

function showSkillDetails(skillName) {
    const pieChartDiv = document.getElementById('skill-pie-chart');
    const mediaDiv = document.getElementById('skill-media');
    const detailsDiv = document.getElementById('skill-details');  // Make sure this ID matches your HTML

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
    if (window.myPieChart) {
        console.log("Destroying old chart instance");
        window.myPieChart.destroy();
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

    // Create media and description sections
    skillsData[skillName].media.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'media-row';

        const mediaHtml = item.type === 'image' ?
            `<img src="${item.src}" alt="${item.skillname}" style="width: 100%;">` :
            `<video autoplay muted style="width: 100%;"><source src="${item.src}" type="video/mp4">Your browser does not support the video tag.</video>`;

        const descriptionHtml = `<div class="description">${item.description}</div>`;

        row.innerHTML = `
            <div class="media">${mediaHtml}</div>
            ${descriptionHtml}
        `;
        mediaDiv.appendChild(row);
    });

    // Display the details section
    detailsDiv.style.display = 'block'; // Now this should work without errors
}



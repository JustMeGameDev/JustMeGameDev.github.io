async function loadYouTubeVideos() {
    const API_KEY = 'AIzaSyCmVuVnA6fluo5UPlFKvPSMAcZP_VtpZ4E';
    const CHANNEL_ID = 'UC24ZbB7jvP1yJmUjcj6V1ug';
    const URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=5&type=video`;

    try {
        const response = await fetch(URL);
        const data = await response.json();
        const videosContainer = document.getElementById('youtube-videos');
        videosContainer.innerHTML = ''; // Clear previous videos

        data.items.forEach((item) => {
            const videoFrame = document.createElement('iframe');
            videoFrame.src = `https://www.youtube.com/embed/${item.id.videoId}`;
            videoFrame.width = '100%'; // Adjust width to fit the column
            videoFrame.height = '350px'; // Set a fixed height, or adjust as needed
            videoFrame.className = "Youtube-Video"
            videoFrame.frameBorder = '0';
            videoFrame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            videoFrame.allowFullscreen = true;
            videosContainer.appendChild(videoFrame);
        });
    } catch (error) {
        console.error('Failed to fetch YouTube videos:', error);
    }
}

// Call this function when the window loads or when appropriate
window.addEventListener('DOMContentLoaded', loadYouTubeVideos);

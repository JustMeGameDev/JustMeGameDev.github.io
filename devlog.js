
async function loadYouTubeVideos() {
    const API_KEY = '' ;
    const CHANNEL_ID = ' ';
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
async function loadBlueskyFeed() {
    const API_URL = 'https://bsky.social/xrpc/com.atproto.repo.listRecords';
    const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'; // Replace with your token
    const DID = 'did:plc:ar7c4by46qjdydhdevvrndac;redact'; // Replace with your DID
    const LIMIT = 5;

    try {
        const response = await fetch(`${API_URL}?repo=${DID}&collection=app.bsky.feed.post&limit=${LIMIT}`, {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            }
        });

        const data = await response.json();
        const blueskyFeed = document.getElementById('bluesky-feed');
        blueskyFeed.innerHTML = ''; // Clear previous content

        data.records.forEach((post) => {
            const postElement = document.createElement('div');
            postElement.className = 'bluesky-post';
            postElement.innerHTML = `
                <p><strong>${post.author.displayName}</strong></p>
                <p>${post.text}</p>
                <p><em>${new Date(post.createdAt).toLocaleString()}</em></p>
            `;
            blueskyFeed.appendChild(postElement);
        });
    } catch (error) {
        console.error('Failed to fetch Bluesky feed:', error);
        document.getElementById('bluesky-feed').innerText = 'Failed to load Bluesky feed.';
    }
}

window.addEventListener('DOMContentLoaded', loadBlueskyFeed);

// Call this function when the window loads or when appropriate
window.addEventListener('DOMContentLoaded', loadYouTubeVideos);

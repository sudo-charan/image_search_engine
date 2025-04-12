const searchForm = document.getElementById("serach-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

// Create download modal
const downloadModal = document.createElement('div');
downloadModal.className = 'download-modal';
downloadModal.innerHTML = `
    <div class="download-content">
        <span class="close-download">&times;</span>
        <h3>Download Options</h3>
        <div class="download-options">
            <button class="download-option" data-quality="small">
                <i class="fas fa-image"></i> Small (640px)
            </button>
            <button class="download-option" data-quality="regular">
                <i class="fas fa-image"></i> Regular (1080px)
            </button>
            <button class="download-option" data-quality="full">
                <i class="fas fa-image"></i> Full Size
            </button>
        </div>
        <div class="download-progress">
            <div class="progress-bar"></div>
            <span class="progress-text">Preparing download...</span>
        </div>
    </div>
`;
document.body.appendChild(downloadModal);

let currentDownloadImage = null;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=ko5qSDZtt_RajprPHe54rcgvN_E_J0ZP7IQ4EqZZR0Y&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResult.innerHTML = "";
    }

    const results = data.results;
    results.map((result) => {
        // Create image container
        const imageContainer = document.createElement("div");
        imageContainer.className = "image-container";

        // Create image
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description || "Unsplash image";
        image.loading = "lazy";

        // Create image link
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.rel = "noopener noreferrer";

        // Create download button
        const downloadBtn = document.createElement("button");
        downloadBtn.className = "download-btn";
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download';
        downloadBtn.onclick = () => {
            currentDownloadImage = result;
            showDownloadModal();
        };

        // Create image info
        const imageInfo = document.createElement("div");
        imageInfo.className = "image-info";
        imageInfo.innerHTML = `
            <span class="likes"><i class="fas fa-heart"></i> ${result.likes || 0}</span>
            <span class="downloads"><i class="fas fa-download"></i> ${result.downloads || 0}</span>
        `;

        // Assemble the elements
        imageLink.appendChild(image);
        imageContainer.appendChild(imageLink);
        imageContainer.appendChild(imageInfo);
        imageContainer.appendChild(downloadBtn);
        searchResult.appendChild(imageContainer);
    });

    showMoreBtn.style.display = "block";
}

function showDownloadModal() {
    downloadModal.style.display = "block";
    const progressBar = downloadModal.querySelector('.progress-bar');
    const progressText = downloadModal.querySelector('.progress-text');
    progressBar.style.width = '0%';
    progressText.textContent = 'Select download quality';
}

function hideDownloadModal() {
    downloadModal.style.display = "none";
    currentDownloadImage = null;
}

async function downloadImage(quality) {
    if (!currentDownloadImage) return;

    const progressBar = downloadModal.querySelector('.progress-bar');
    const progressText = downloadModal.querySelector('.progress-text');
    
    try {
        let downloadUrl;
        switch(quality) {
            case 'small':
                downloadUrl = currentDownloadImage.urls.small;
                break;
            case 'regular':
                downloadUrl = currentDownloadImage.urls.regular;
                break;
            case 'full':
                downloadUrl = currentDownloadImage.urls.full;
                break;
            default:
                downloadUrl = currentDownloadImage.urls.regular;
        }

        progressText.textContent = 'Starting download...';
        progressBar.style.width = '10%';

        const response = await fetch(downloadUrl);
        const contentLength = response.headers.get('content-length');
        const total = parseInt(contentLength, 10);
        let loaded = 0;

        const reader = response.body.getReader();
        const chunks = [];

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            chunks.push(value);
            loaded += value.length;
            
            const progress = (loaded / total) * 100;
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `Downloading... ${Math.round(progress)}%`;
        }

        const blob = new Blob(chunks);
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `unsplash-image-${currentDownloadImage.id}-${quality}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        progressText.textContent = 'Download complete!';
        setTimeout(hideDownloadModal, 1000);
    } catch (error) {
        console.error('Download error:', error);
        progressText.textContent = 'Download failed. Please try again.';
        progressBar.style.width = '0%';
    }
}

// Event listeners
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});

// Download modal event listeners
document.querySelector('.close-download').addEventListener('click', hideDownloadModal);
document.querySelectorAll('.download-option').forEach(option => {
    option.addEventListener('click', () => {
        const quality = option.dataset.quality;
        downloadImage(quality);
    });
});

// Close download modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === downloadModal) {
        hideDownloadModal();
    }
});

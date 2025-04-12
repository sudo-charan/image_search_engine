# Image Search Engine

A modern, responsive image search engine built with HTML, CSS, and JavaScript that allows users to search, view, and download high-quality images from Unsplash.

![Image Search Engine Screenshot](screenshot.png)

## Features

- 🖼️ **Image Display**
  - Responsive grid layout
  - Lazy loading for better performance
  - Image information (likes, downloads)
  - Quick category buttons for popular searches

- 💾 **Download Options**
  - Multiple size options (Small, Regular, Full)
  - Download progress tracking
  - Visual progress bar
  - Automatic file naming

- 🎨 **Modern UI**
  - Clean, minimalist design
  - Purple theme with orange accents
  - Responsive layout for all devices
  - Smooth animations and transitions

## Getting Started

### Prerequisites

- Web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- Unsplash API key (optional, for higher rate limits)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/image-search-engine.git
```

2. Open `index.html` in your web browser

3. (Optional) Add your Unsplash API key:
   - Get an API key from [Unsplash Developer](https://unsplash.com/developers)
   - Replace the API key in `script.js`:
   ```javascript
   const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=YOUR_API_KEY&per_page=12`;
   ```

## Usage

1. **Searching Images**
   - Enter keywords in the search box
   - Use filters to refine your search
   - Click category buttons for quick searches

2. **Viewing Images**
   - Click on any image to view details
   - See image statistics (likes, downloads)
   - Navigate between images in the modal

3. **Downloading Images**
   - Click the download button on any image
   - Choose your preferred size
   - Monitor download progress
   - Image will save to your downloads folder

## Project Structure

```
image-search-engine/
├── index.html          # Main HTML file
├── style.css           # Styles and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## API Integration

This project uses the Unsplash API to fetch images. The API provides:
- High-quality images
- Multiple size options
- Image metadata
- Search and filtering capabilities

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Unsplash](https://unsplash.com) for providing the image API
- [Font Awesome](https://fontawesome.com) for icons
- All contributors and users of this project


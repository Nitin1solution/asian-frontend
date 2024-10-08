import { useEffect } from 'react';

const useAdjustImg = (post, isEnabled) => {
  useEffect(() => {
    if (!post) return;

    const handleImages = () => {
      const images = document.querySelectorAll('img');

      images.forEach((img) => {
        const alt = img.getAttribute('alt');
        const parentDiv = document.createElement('div');
        parentDiv.classList.add('image-paragraph');

        img.parentNode.insertBefore(parentDiv, img);
        parentDiv.appendChild(img);

        if (alt) {
          const captionDiv = document.createElement('div');
          captionDiv.classList.add('caption');
          captionDiv.textContent = alt;
          parentDiv.appendChild(captionDiv);
          captionDiv.style.padding = '10px';
        }

        parentDiv.parentElement.classList.add('image-parent');
      });
    };

    const handleMedia = () => {
      const iframes = document.querySelectorAll('iframe');

      iframes.forEach((iframe) => {
        const src = iframe.getAttribute('src');

        const isAudio = (url) => url.match(/\.(mp3|wav|ogg)$/i);
        const isVideo = (url) => url.match(/\.(mp4|webm|ogg)$/i);

        if (isAudio(src)) {
          const audio = document.createElement('audio');
          audio.setAttribute('controls', '');
          audio.setAttribute('src', src);

          iframe.parentNode.replaceChild(audio, iframe);
        } else if (isVideo(src)) {
          const video = document.createElement('video');
          video.setAttribute('controls', '');
          video.setAttribute('src', src);

          iframe.parentNode.replaceChild(video, iframe);
        }
      });
    };
    const handleBlockquote = () => {
      const blockquotes = document.querySelectorAll('blockquote');

      blockquotes.forEach(blockquote => {
        // Find all p elements inside each blockquote
        const paragraphs = blockquote.querySelectorAll('p');

        paragraphs.forEach((paragraph) => {
          // Find the span inside the p tag
          const span = paragraph.querySelector('span');

          if (span) {
            // Move the style from span to p
            paragraph.style.cssText += span.style.cssText;

            // Move the inner content of span to p
            paragraph.innerHTML = span.innerHTML;

            // Remove the span element
            span.remove();
          }
        });
      });
    }
    handleImages();
    handleMedia();
    handleBlockquote();
  });
};

export default useAdjustImg;
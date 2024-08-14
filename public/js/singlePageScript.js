

// Wait for the document to load
document.addEventListener("DOMContentLoaded", function() {
    // Select all img elements
    var images = document.querySelectorAll('img');

    // Loop through each img element
    images.forEach(function(img) {
        // Get the alt attribute value
        var alt = img.getAttribute('alt');

        // Create a new div element for the image container
        var parentDiv = document.createElement('div');
        parentDiv.classList.add('image-paragraph');

        // Insert the parent div before the img element
        img.parentNode.insertBefore(parentDiv, img);

        // Move the img element inside the parent div
        parentDiv.appendChild(img);

        // Check if the alt attribute is not empty to create a caption
        if (alt) {
            // Create a caption div
            var captionDiv = document.createElement('div');
            captionDiv.classList.add('caption'); // Add 'caption' class
            captionDiv.textContent = alt; // Set caption text to alt attribute value

            // Move the caption div inside the parent div
            parentDiv.appendChild(captionDiv);

            // Add padding to the parent div
            captionDiv.style.padding = "10px";
        }

        // Add d-flex class to the parent of image-paragraph
        parentDiv.parentElement.classList.add('image-parent');
    });
});





document.addEventListener('DOMContentLoaded', () => {
    // Function to check if the URL is an audio file
    function isAudio(url) {
        return url.match(/\.(mp3|wav|ogg)$/i);
    }

    // Function to check if the URL is a video file
    function isVideo(url) {
        return url.match(/\.(mp4|webm|ogg)$/i);
    }

    // Get all iframe elements
    const iframes = document.querySelectorAll('iframe');

    iframes.forEach(iframe => {
        const src = iframe.getAttribute('src');

        // Check if the src attribute contains an audio or video link
        if (isAudio(src)) {
            // Create an audio element
            const audio = document.createElement('audio');
            audio.setAttribute('controls', '');
            audio.setAttribute('src', src);

            // Replace the iframe with the audio element
            iframe.parentNode.replaceChild(audio, iframe);

        } else if (isVideo(src)) {
            // Create a video element
            const video = document.createElement('video');
            video.setAttribute('controls', '');
            video.setAttribute('src', src);

            // Replace the iframe with the video element
            iframe.parentNode.replaceChild(video, iframe);
        }
    });
});




$(document).ready(function() {
    // Get the modal
    var modal = $('#myModal');

    // Get the <span> element that closes the modal
    var span = $('.close');

    $('#republish-btn').click(function() {
        var content = $('#container').clone(); // Clone the container
        content.find('#republish-btn').remove(); // Remove the button from the cloned container
        content.find('.single-category-section').remove(); 
        content.find('#language').remove();
        content.find('.date-author').remove();
        $('#modal-content').text(content.html()); // Set the modal content

        modal.show(); // Show the modal
    });

    // When the user clicks on <span> (x), close the modal
    span.click(function() {
        $('#copy-btn').html('Copy Html');
        modal.hide();
    });

    // When the user clicks anywhere outside of the modal, close it
    $(window).click(function(event) {
        if (event.target == modal[0]) {
            modal.hide();
        }
    });

 
    $('#copy-btn').click(function() {
        var contentDiv = document.getElementById('modal-content');

        if (document.body.createTextRange) {
            // For older browsers
            var range = document.body.createTextRange();
            range.moveToElementText(contentDiv);
            range.select();
        } else if (window.getSelection) {
            // For modern browsers
            var range = document.createRange();
            range.selectNodeContents(contentDiv);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }

        try {
            document.execCommand('copy');
            $('#copy-btn').html('Copied');
        } catch (err) {
            alert('Unable to copy');
        }

        window.getSelection().removeAllRanges(); // Deselect the content
    });
});

$(document).ready(function() {
    $('.single-post-content a').attr('target', '_blank');
});
document.getElementById('language').addEventListener('click', function() {
    var ul = this.querySelector('ul');
    if (ul.style.display === 'block') {
        ul.style.display = 'none';
    } else {
        ul.style.display = 'block';
    }
});

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', function(event) {
    if (!event.target.matches('#language') && !event.target.matches('#language *')) {
        var dropdowns = document.querySelectorAll('.language ul');
        dropdowns.forEach(function(dropdown) {
            dropdown.style.display = 'none';
        });
    }
});




function applyDesktopOnlyScripts() {
    if (window.innerWidth >= 1024) {
        const images = document.querySelectorAll('img');

        const dFlexElements = document.querySelectorAll('.image-parent');

        // Iterate over each element
        dFlexElements.forEach(element => {
            // Select all <br> tags that are children of the current element
            const brTags = element.querySelectorAll('br');

            // Iterate over each <br> tag and remove it
            brTags.forEach(br => br.remove());
        });
    }
}

// Run the function on initial load
applyDesktopOnlyScripts();

// Optionally, add an event listener for window resize to re-apply the scripts if needed
window.addEventListener('resize', () => {
    applyDesktopOnlyScripts();
});

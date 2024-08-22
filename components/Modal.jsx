'use client';
import { useEffect, useState } from 'react';

const Modal = ({ isOpen, onClose }) => {
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        const modal = document.getElementById('myModal');
        const closeButton = document.querySelector('.close');
        const copyButton = document.getElementById('copy-btn');
        const modalContentDiv = document.getElementById('modal-content');

        if (!isOpen) {
            if (modal) modal.style.display = 'none'; // Hide the modal if not open
            return;
        }

        const handleRepublishClick = () => {
            const container = document.getElementById('container');
            if (container) {
                const clonedContent = container.cloneNode(true);
                clonedContent.querySelector('#republish-btn')?.remove();
                clonedContent.querySelector('#myModal')?.remove();
                clonedContent.querySelector('.single-category-section')?.remove();
                clonedContent.querySelector('#language')?.remove();
                clonedContent.querySelector('.date-author')?.remove();
                setModalContent(clonedContent.innerHTML); // Set the modal content
            } else {
                console.error('Element with id "container" not found.');
            }

            if (modal) modal.style.display = 'flex'; // Show the modal
        };

        const handleCloseClick = () => {
            if (copyButton) copyButton.innerHTML = 'Copy HTML';
            if (modal) modal.style.display = 'none'; // Hide the modal
        };

        const handleOutsideClick = (event) => {
            if (modal && event.target === modal) {
                modal.style.display = 'none'; // Hide the modal if clicking outside
            }
        };
        const handleCopyClick = async () => {
            const modalContentDiv = document.getElementById('modal-content');
            if (modalContentDiv) {
                const htmlContent = modalContentDiv.innerHTML;
        
                try {
                    await navigator.clipboard.writeText(htmlContent);
                    if (copyButton) copyButton.innerHTML = 'Copied';
                } catch (err) {
                    alert('Unable to copy');
                }
            }
        };
        // const handleCopyClick = () => {
        //     if (modalContentDiv) {
        //         if (document.body.createTextRange) {
        //             // For older browsers
        //             const range = document.body.createTextRange();
        //             range.moveToElementText(modalContentDiv);
        //             range.select();
        //         } else if (window.getSelection) {
        //             // For modern browsers
        //             const range = document.createRange();
        //             range.selectNodeContents(modalContentDiv);
        //             const selection = window.getSelection();
        //             selection.removeAllRanges();
        //             selection.addRange(range);
        //         }

        //         try {
        //             document.execCommand('copy');
        //             if (copyButton) copyButton.innerHTML = 'Copied';
        //         } catch (err) {
        //             alert('Unable to copy');
        //         }

        //         window.getSelection().removeAllRanges(); // Deselect the content
        //     }
        // };

        document.getElementById('republish-btn')?.addEventListener('click', handleRepublishClick);
        if (closeButton) closeButton.addEventListener('click', handleCloseClick);
        if (window) window.addEventListener('click', handleOutsideClick);
        if (copyButton) copyButton.addEventListener('click', handleCopyClick);

        // Clean up event listeners on component unmount
        return () => {
            document.getElementById('republish-btn')?.removeEventListener('click', handleRepublishClick);
            if (closeButton) closeButton.removeEventListener('click', handleCloseClick);
            if (window) window.removeEventListener('click', handleOutsideClick);
            if (copyButton) copyButton.removeEventListener('click', handleCopyClick);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close">&times;</span>
                <div id="modal-content" dangerouslySetInnerHTML={{ __html: modalContent }}></div>
                <button id="copy-btn">Copy HTML</button>
            </div>
        </div>
    );
};

export default Modal;

function axilHover() {
    let elements = document.querySelectorAll(".content-block");
    elements.forEach(function (element) {
        // Remove 'is-active' class by default when mouse enters
        
        // Add hover effect listeners
        element.addEventListener("mouseenter", function () {
            let active = document.querySelector(".content-block.trend-post.post-order-list.is-active");

        // Check if the element exists
        if (active) {
            // Remove the "is-active" class
            active.classList.remove("is-active");
        }
            this.classList.remove("axil-control");
            this.classList.add("is-active");
        });

        element.addEventListener("mouseleave", function () {
            this.classList.add("axil-control");
            this.classList.remove("is-active");
        });
    });
}

// Call the function to initiate the hover effect
axilHover();

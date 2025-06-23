document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    console.log("tabButtons:", tabButtons); // Debug: Check selected buttons
    console.log("tabContents:", tabContents); // Debug: Check selected contents

    tabButtons.forEach(button => {
        console.log("Adding event listener to:", button); // Debug: Check listeners
        button.addEventListener('click', function() {
            console.log("Tab clicked:", this); // Debug: Check click
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                console.log("Removing active from button:", btn);
            });
            tabContents.forEach(content => {
                content.classList.remove('active');
                console.log("Removing active from content:", content);
            });

            // Add active class to clicked button
            this.classList.add('active');
            console.log("Adding active to button:", this);


            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            console.log("tabId:", tabId); // Debug: Check tabId
            const tabContentElement = document.getElementById(tabId);

            if (tabContentElement) {
                tabContentElement.classList.add('active');
                console.log("Adding active to content element:", tabContentElement);
                // Trigger animations for the newly active tab
                const animatedElements = tabContentElement.querySelectorAll('.animate-on-scroll');
                animatedElements.forEach(element => {
                    element.classList.remove('animated');
                    void element.offsetWidth; // Trigger reflow
                    element.classList.add('animated');
                });
            } else {
                console.error("Tab content element with id " + tabId + " not found!");
            }
        });
    });

    // Initialize first tab as active
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const projectCarousel = document.querySelector('.project-carousel-inner');
    const projectItems = document.querySelectorAll('.project-item');
    const projectItemWidth = projectItems[0].offsetWidth + 30; // Width of each item including margin
    const numVisibleProjects = 4; // Number of projects visible at a time
    let currentIndex = 0; // Track current position of projects

    // Variables for touch events
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let isDragging = false;
    let animationID;

    // Function to calculate total width of all project items
    function calculateTotalWidth() {
        const totalWidth = projectItems.length * projectItemWidth;
        return totalWidth;
    }

    // Function to calculate the maximum index to prevent showing empty space at the end
    function calculateMaxIndex() {
        const totalWidth = calculateTotalWidth();
        const containerWidth = projectCarousel.offsetWidth;
        const maxIndex = Math.max(0, Math.ceil((totalWidth - containerWidth) / projectItemWidth));
        return maxIndex;
    }

    // Function to show projects based on currentIndex with sliding animation
    function showProjects() {
        const maxIndex = calculateMaxIndex();
        currentIndex = Math.min(currentIndex, maxIndex);

        const slideValue = currentIndex * projectItemWidth;
        projectCarousel.style.transition = 'transform 0.5s ease-in-out'; // Adding smooth transition
        projectCarousel.style.transform = `translateX(-${slideValue}px)`;
    }

    // Show the initial set of projects
    showProjects();

    // Event listener for Next button
    document.querySelector('.next').addEventListener('click', function() {
        const maxIndex = calculateMaxIndex();
        if (currentIndex < maxIndex) {
            currentIndex++;
            showProjects();
        }
    });

    // Event listener for Previous button
    document.querySelector('.prev').addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            showProjects();
        }
    });

    // Functions to handle touch events
    function touchStart(index) {
        return function(event) {
            startX = event.touches[0].clientX;
            isDragging = true;
            animationID = requestAnimationFrame(animation);
        }
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = event.touches[0].clientX;
            currentTranslate = prevTranslate + currentPosition - startX;
        }
    }

    function touchEnd() {
        cancelAnimationFrame(animationID);
        isDragging = false;

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && currentIndex < calculateMaxIndex()) {
            currentIndex++;
        }

        if (movedBy > 100 && currentIndex > 0) {
            currentIndex--;
        }

        showProjects();
        prevTranslate = currentIndex * -projectItemWidth;
    }

    function animation() {
        projectCarousel.style.transform = `translateX(${currentTranslate}px)`;
        if (isDragging) requestAnimationFrame(animation);
    }

    // Add event listeners for touch events
    projectCarousel.addEventListener('touchstart', touchStart(currentIndex));
    projectCarousel.addEventListener('touchmove', touchMove);
    projectCarousel.addEventListener('touchend', touchEnd);
});

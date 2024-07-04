document.addEventListener('DOMContentLoaded', function() {
    const projectCarousel = document.querySelector('.project-carousel-inner');
    const projectItems = document.querySelectorAll('.project-item');
    const projectItemWidth = projectItems[0].offsetWidth + 30; // Width of each item including margin
    const numVisibleProjects = 4; // Number of projects visible at a time
    let currentIndex = 0; // Track current position of projects

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
});

let container = document.getElementById('project-container');

// Add clone of last element to the start and of first element to the end
let projects = container.querySelectorAll('.project');
let firstProject = projects[0];
let lastProject = projects[projects.length - 1]
let lastCloneFront = lastProject.cloneNode(true);
let firstCloneBack = firstProject.cloneNode(true);
container.prepend(lastCloneFront);
container.append(firstCloneBack);

// Scroll to actual first element
container.scrollTo(firstProject.offsetLeft, 0);

// Scroll loop
// teleMargin: how many pixels do we scroll to left of firstProject (left side of screen)
// or to the right of lastProject (counted from right side of screen) before we teleport?
let teleMargin = 0.9 * firstProject.offsetWidth;
let preventTeleport = false;
let preventTeleportTimeout = 50;

function overLeftBoundary() {
    // Did we scroll more left than the leftmost boundary?
    return container.scrollLeft < firstProject.offsetLeft - teleMargin;
}

function overRightBoundary() {
    // Did we scroll more right than the rightmost boundary?
    return (container.scrollLeft + container.offsetWidth > 
                lastProject.offsetLeft + lastProject.offsetWidth + teleMargin);
}

function preventSnap() {
    preventTeleport = false;  // also prevent another teleport
    container.classList.add("disable-snap");
}

function enableSnap() {
    preventTeleport = false;
    container.classList.remove("disable-snap");
    container.scrollTo({'left': container.scrollLeft, 'top': 0, 'behavior': 'smooth'});
}

function scrollIfNeeded() {
    if (preventTeleport) return;
    // Last project is over halfway out of screen (when scrolling to right) -> scroll to first
    if (overRightBoundary()) {
        preventSnap()
        let cloneOffset = firstCloneBack.offsetLeft - container.scrollLeft;
        // Preserve firstClone offset when teleporting to start
        // cloneOffset = firstProject.offsetLeft - container.new_scrollLeft
        container.scrollLeft = firstProject.offsetLeft - cloneOffset;
        setTimeout(enableSnap, preventTeleportTimeout)
    }
    // First project is getting out of screen (when scrolling to left) -> scroll to last
    if (overLeftBoundary()) {
        preventSnap()
        let firstProjectOffset = firstProject.offsetLeft - container.scrollLeft;
        // firstProjectOffset = firstCloneBack.offsetLeft - container.new_scrollLeft
        container.scrollLeft = firstCloneBack.offsetLeft - firstProjectOffset;
        setTimeout(enableSnap, preventTeleportTimeout)
    }
}

container.addEventListener('scroll', scrollIfNeeded);

// Arrows
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');

function scrollRight() {
    container.scrollTo({
        top: 0,
        left: container.scrollLeft + firstProject.offsetWidth,
        behavior: 'smooth'
    });
}

function scrollLeft() {
    container.scrollTo({
        top: 0,
        left: container.scrollLeft - firstProject.offsetWidth,
        behavior: 'smooth'
    });
}

arrowRight.addEventListener('click', scrollRight);
arrowLeft.addEventListener('click', scrollLeft);
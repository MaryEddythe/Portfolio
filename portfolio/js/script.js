document.addEventListener('DOMContentLoaded', function() {
    // Update current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Add active class to current nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Add "animate" class to project cards to trigger fade-in animation and make them visible
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.classList.add('animate');
    });

    // Navbar scroll background effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

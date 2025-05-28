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
});

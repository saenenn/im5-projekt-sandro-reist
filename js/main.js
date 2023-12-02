
// Smooth Scrolling für die Menus

document.addEventListener("DOMContentLoaded", function() {
    // Alle Links auswählen, die mit "#" beginnen
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Standardverhalten verhindern

            // Zielabschnitt ermitteln
            let target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Sanft zum Zielabschnitt scrollen
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});


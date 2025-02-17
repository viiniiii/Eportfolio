const year = new Date().getFullYear();
let copyright = document.querySelector('.footer .footer-text p');
copyright.innerHTML = `Copyright &copy; ${year} by Edvin Perfundi | All Rights Reserved`;

window.onload = () => {
    const typed = new Typed('.typed', {
        strings: ['Frontend Developer', 'Python Developer'],
        typeSpeed: 50,
        backSpeed: 30,
        startDelay: 1000,
        loop: true,
        showCursor: false,
        preserve: true,
    });
};

let menuIcon = document.querySelector('#menu-icon');
let navBar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navBar.classList.toggle('active');
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let circles = document.querySelectorAll('.circle .path')

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= -450 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 450 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

window.addEventListener('scroll', function () {
    const elements = document.querySelectorAll('.about-content, .about-img');
    elements.forEach((element) => {
        if (isInViewport(element)) {
            element.classList.add('appear');
        } else {
            element.classList.remove('appear');
        }
    });

    let ticking = false;

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }

    function handleScroll() {
        let top = window.scrollY;

        sections.forEach((sec) => {
            let offset = sec.offsetTop - 250;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                if (!sec.classList.contains('show-animate')) {
                    navLinks.forEach((link) => {
                        link.classList.remove('active');
                        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                    });
                    sec.classList.add('show-animate');

                    if (sec.classList.contains('skills')) {
                        circles.forEach((circle) => {
                            circle.classList.add('animate-path');
                            let list = [90, 80, 55, 60, 80, 50, 80, 65, 70, 90];
                            const objects = document.querySelectorAll('.percentage');
                            objects.forEach((obj, i) => {
                                animateValue(obj, 0, list[i], 2500);
                            });
                        });
                    } else {
                        circles.forEach((circle) => {
                            circle.classList.remove('animate-path');
                        });
                    }
                }
            } else {
                sec.classList.remove('show-animate');
            }
        });
    }

    window.addEventListener('scroll', onScroll);


    let header = document.querySelector("header");
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navBar.classList.remove('active');

    let footer = document.querySelector('.footer');
    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY + 10 >= document.scrollingElement.scrollHeight);
});

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = `${value}%`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

(function() {
    emailjs.init("EUqjlxFdr0vw9vblA"); // EmailJS public key
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const btn = document.querySelector('.btn');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const formData = new FormData(this);
    const formValues = Object.fromEntries(formData.entries()); 

    emailjs.send("service_7paalfm", "template_hseg3je", formValues) // EmailJS service & template IDs
        .then(() => {
            alert('Message sent successfully!');
            this.reset();
        })
        .catch((error) => {
            alert('Failed to send message. Please try again.');
            console.error("EmailJS Error:", error);
        })
        .finally(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        });
});

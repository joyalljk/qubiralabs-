// DOM ELEMENTS AND GENERAL INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    initScrollspy();
    initMobileNav();
    initTechTabs();
    initBookingFormConstraint();
    initSmoothScroll();
});

// NAVBAR SCROLL EFFECT
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// MOBILE NAVIGATION TOGGLE
function initMobileNav() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isActive = navMenu.classList.contains('active');
        if (isActive) {
            menuIcon.setAttribute('data-lucide', 'x');
        } else {
            menuIcon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuIcon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
}

// SCROLLSPY (Highlighting Active Navigation Link)
function initScrollspy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = 'home';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust offset to trigger selection slightly earlier/later
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}


// TECH STACK TABS
function initTechTabs() {
    const tabsContainer = document.getElementById('tech-tabs');
    if (!tabsContainer) return;

    const tabBtns = tabsContainer.querySelectorAll('.tech-tab-btn');
    const tabPanes = document.querySelectorAll('.tech-content-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle content visibility
            const tabId = btn.getAttribute('data-tab');
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.getAttribute('id') === `tab-${tabId}`) {
                    pane.classList.add('active');
                }
            });
        });
    });
}

// CAREER APPLY MODAL CONTROLS
const applyModal = document.getElementById('apply-modal');
const jobTitleText = document.getElementById('apply-job-title');
const jobTitleHidden = document.getElementById('job-title-hidden');
const applyForm = document.getElementById('apply-form');
const applySuccess = document.getElementById('apply-success-msg');

function openApplyModal(jobTitle) {
    if (!applyModal) return;
    
    // Set titles
    jobTitleText.textContent = jobTitle;
    jobTitleHidden.value = jobTitle;
    
    // Reset form and message
    applyForm.reset();
    applyForm.classList.remove('hidden');
    applySuccess.classList.add('hidden');
    
    // Open modal
    applyModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Disable page scrolling
}

function closeApplyModal() {
    if (!applyModal) return;
    applyModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable page scrolling
}

// Handle Careers Application Submit
function handleApplySubmit(e) {
    e.preventDefault();
    
    // Verify fields
    const name = document.getElementById('apply-name').value.trim();
    const email = document.getElementById('apply-email').value.trim();
    const phone = document.getElementById('apply-phone').value.trim();
    const exp = document.getElementById('apply-experience').value.trim();
    const resume = document.getElementById('apply-resume').value.trim();
    const portfolio = document.getElementById('apply-portfolio').value.trim();
    const cover = document.getElementById('apply-cover').value.trim();
    const jobTitle = document.getElementById('job-title-hidden').value;
    
    if (name === "" || email === "" || phone === "" || exp === "" || resume === "") {
        alert("Please fill in all required fields.");
        return;
    }
    
    // Construct Mailto Link
    const subject = encodeURIComponent(`Job Application: ${jobTitle} - ${name}`);
    const body = encodeURIComponent(
`Hi Qubira Labs Team,

I would like to apply for the position of "${jobTitle}". Here are my application details:

- Full Name: ${name}
- Email: ${email}
- Phone: ${phone}
- Experience: ${exp} years
- Resume/CV: ${resume}
- Portfolio/GitHub: ${portfolio || 'N/A'}

Cover Note:
${cover || 'No cover note provided.'}

Best regards,
${name}`
    );
    
    const mailtoUrl = `mailto:qubiralabs@gmail.com?subject=${subject}&body=${body}`;
    
    // Redirect to Gmail/Mail client
    window.location.href = mailtoUrl;
    
    // Show success feedback
    applyForm.classList.add('hidden');
    applySuccess.classList.remove('hidden');
    
    // Automatically close modal after 3 seconds
    setTimeout(() => {
        closeApplyModal();
    }, 3000);
}

// BOOKING MODAL CONTROLS
const bookingModal = document.getElementById('booking-modal');
const bookingForm = document.getElementById('booking-form');
const bookingSuccess = document.getElementById('booking-success-msg');

function openBookingModal(e) {
    if (e) e.preventDefault();
    if (!bookingModal) return;
    
    // Reset form and message
    bookingForm.reset();
    bookingForm.classList.remove('hidden');
    bookingSuccess.classList.add('hidden');
    
    // Open modal
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Disable page scrolling
}

function closeBookingModal() {
    if (!bookingModal) return;
    bookingModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable page scrolling
}

function initBookingFormConstraint() {
    // Restrict booking date input to today and onwards
    const dateInput = document.getElementById('book-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

// Handle Booking Form Submit
function handleBookingSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('book-name').value.trim();
    const email = document.getElementById('book-email').value.trim();
    const date = document.getElementById('book-date').value;
    const time = document.getElementById('book-time').value;
    const desc = document.getElementById('book-desc').value.trim();

    if (name === "" || email === "" || date === "" || time === "") {
        alert("Please fill in all required fields.");
        return;
    }

    // Construct WhatsApp Booking message
    const formattedBooking = `*New Consultation Booking (Qubira Labs)*

• *Client Name:* ${name}
• *Client Email:* ${email}
• *Date:* ${date}
• *Time Slot:* ${time}

*Project / Challenge Description:*
${desc || 'No description provided.'}`;

    const whatsappUrl = `https://wa.me/919037319640?text=${encodeURIComponent(formattedBooking)}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // Show success booking feedback locally
    bookingForm.classList.add('hidden');
    bookingSuccess.classList.remove('hidden');
    
    // Close modal after 3 seconds
    setTimeout(() => {
        closeBookingModal();
    }, 3000);
}

// CONTACT FORM SUBMISSION
function handleContactSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const service = document.getElementById('contact-service').value;
    const message = document.getElementById('contact-message').value.trim();
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('contact-success-msg');

    if (name === "" || email === "" || service === "" || message === "") {
        alert("Please fill in all required fields.");
        return;
    }

    // Construct WhatsApp message body
    const formattedMessage = `*New Inquiry for Qubira Labs*

• *Name:* ${name}
• *Email:* ${email}
• *Subject:* ${subject || 'General Inquiry'}
• *Service:* ${service}

*Message:*
${message}`;

    const whatsappUrl = `https://wa.me/919037319640?text=${encodeURIComponent(formattedMessage)}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // Show success feedback locally
    form.classList.add('hidden');
    successMsg.classList.remove('hidden');
    
    // Reset form and return to input state after 5 seconds
    setTimeout(() => {
        form.reset();
        form.classList.remove('hidden');
        successMsg.classList.add('hidden');
    }, 5000);
}

// CLOSE MODALS ON OUTSIDE CLICK
window.addEventListener('click', (e) => {
    if (e.target === applyModal) {
        closeApplyModal();
    }
    if (e.target === bookingModal) {
        closeBookingModal();
    }
});

// SELECT SERVICE AND SCROLL TO CONTACT
function selectServiceAndScroll(serviceName) {
    const serviceSelect = document.getElementById('contact-service');
    if (serviceSelect) {
        serviceSelect.value = serviceName;
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const header = document.getElementById('header');
        const headerOffset = header ? header.offsetHeight : 72;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// SMOOTH SCROLLING FOR ANCHOR LINKS WITH HEADER OFFSET
function initSmoothScroll() {
    const header = document.getElementById('header');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip empty links
            
            e.preventDefault();
            
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = header ? header.offsetHeight : 72;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

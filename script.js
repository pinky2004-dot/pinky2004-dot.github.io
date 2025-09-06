


// TYPEWRITER EFFECT
const typewriterText = document.getElementById('typewriter-text');
const phrases = [
	'Full-Stack Developer',
	'AI/ML Enthusiast',
	'Cloud Native Builder',
	'Pet Tech Innovator',
	'Open Source Contributor'
];
let twIndex = 0, charIndex = 0, isDeleting = false;
function typeWriter() {
	if (!typewriterText) return;
	const current = phrases[twIndex % phrases.length];
	if (isDeleting) {
		typewriterText.textContent = current.substring(0, charIndex--);
		if (charIndex < 0) {
			isDeleting = false;
			twIndex++;
			setTimeout(typeWriter, 600);
		} else {
			setTimeout(typeWriter, 40);
		}
	} else {
		typewriterText.textContent = current.substring(0, charIndex++);
		if (charIndex > current.length) {
			isDeleting = true;
			setTimeout(typeWriter, 1200);
		} else {
			setTimeout(typeWriter, 90);
		}
	}
}
typeWriter();

// INTERACTIVE PROJECT MODALS
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');
const moreLinks = document.querySelectorAll('.project-more');
const projectDetails = {
	pethealth: `<h3>Pet Health AI</h3><p>AI-powered web app for pet health triage. <br>Features:<ul><li>Real-time chat with Bedrock LLM</li><li>Emergency detection & vet locator</li><li>Skin condition image analysis (SageMaker)</li><li>Secure login (AWS Cognito)</li></ul></p>`,
	churn: `<h3>Spotify Recommendation System</h3><p>Analyzed the Top 10,000 Songs on Spotify (1960–Now) dataset.<ul><li>Clustered songs into emotional groups using machine learning.</li><li>Applied unsupervised and supervised learning for categorization.</li><li>Built and visualized models with Python, pandas, and scikit-learn.</li></ul></p>`
};
if (moreLinks && modal && modalBody && closeModal) {
	moreLinks.forEach(link => {
		link.addEventListener('click', e => {
			const key = link.getAttribute('data-project');
			modalBody.innerHTML = projectDetails[key] || '';
			modal.classList.add('active');
		});
	});
	closeModal.addEventListener('click', () => modal.classList.remove('active'));
	modal.addEventListener('click', e => {
		if (e.target === modal) modal.classList.remove('active');
	});
}

// ENHANCED SCROLL ANIMATIONS
function revealOnScroll() {
	const reveals = document.querySelectorAll('.section, .card, .blog-post, .stat');
	const windowHeight = window.innerHeight;
	
	reveals.forEach((element, index) => {
		const top = element.getBoundingClientRect().top;
		const isVisible = top < windowHeight - 100;
		
		if (isVisible && !element.classList.contains('revealed')) {
			element.classList.add('revealed');
			element.style.opacity = '1';
			element.style.transform = 'translateY(0)';
			
			// Stagger animation for cards and stats
			if (element.classList.contains('card') || element.classList.contains('stat')) {
				element.style.transitionDelay = `${index * 0.1}s`;
			}
		}
	});
}

// SMOOTH SCROLLING FOR NAVIGATION LINKS
function initSmoothScrolling() {
	const navLinks = document.querySelectorAll('a[href^="#"]');
	navLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const targetId = link.getAttribute('href');
			const targetElement = document.querySelector(targetId);
			
			if (targetElement) {
				const headerHeight = document.querySelector('.main-header').offsetHeight;
				const targetPosition = targetElement.offsetTop - headerHeight - 20;
				
				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth'
				});
			}
		});
	});
}

// LOADING ANIMATION
function showLoadingAnimation() {
	const loader = document.createElement('div');
	loader.className = 'page-loader';
	loader.innerHTML = `
		<div class="loader-content">
			<div class="loader-spinner"></div>
			<p>Loading amazing content...</p>
		</div>
	`;
	document.body.appendChild(loader);
	
	// Remove loader after page loads
	window.addEventListener('load', () => {
		setTimeout(() => {
			loader.style.opacity = '0';
			setTimeout(() => loader.remove(), 500);
		}, 800);
	});
}

// INTERACTIVE STATS COUNTER
function animateStats() {
	const stats = document.querySelectorAll('.stat span');
	stats.forEach(stat => {
		const target = parseInt(stat.textContent);
		if (!isNaN(target)) {
			let current = 0;
			const increment = target / 50;
			const timer = setInterval(() => {
				current += increment;
				if (current >= target) {
					stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
					clearInterval(timer);
				} else {
					stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
				}
			}, 30);
		}
	});
}

// PARALLAX EFFECT FOR HERO
function initParallax() {
	const hero = document.querySelector('.hero-unique');
	if (hero) {
		window.addEventListener('scroll', () => {
			const scrolled = window.pageYOffset;
			const rate = scrolled * -0.5;
			hero.style.transform = `translateY(${rate}px)`;
		});
	}
}

// ENHANCED MODAL FUNCTIONALITY
function enhanceModal() {
	const modal = document.getElementById('project-modal');
	if (modal) {
		// Add escape key support
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && modal.classList.contains('active')) {
				modal.classList.remove('active');
			}
		});
		
		// Add fade in/out animations
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
					if (modal.classList.contains('active')) {
						modal.style.opacity = '0';
						modal.style.display = 'flex';
						requestAnimationFrame(() => {
							modal.style.transition = 'opacity 0.3s ease';
							modal.style.opacity = '1';
						});
					} else {
						modal.style.opacity = '0';
						setTimeout(() => {
							modal.style.display = 'none';
						}, 300);
					}
				}
			});
		});
		observer.observe(modal, { attributes: true });
	}
}

// FLOATING ACTION BUTTON FUNCTIONALITY
function initFloatingActionButton() {
	const fabToggle = document.getElementById('fab-toggle');
	const fabMenu = document.getElementById('fab-menu');
	const fabItems = document.querySelectorAll('.fab-item');
	
	if (fabToggle && fabMenu) {
		fabToggle.addEventListener('click', () => {
			fabMenu.classList.toggle('active');
			fabToggle.style.transform = fabMenu.classList.contains('active') ? 'rotate(45deg)' : 'rotate(0deg)';
		});
		
		// Close menu when clicking outside
		document.addEventListener('click', (e) => {
			if (!fabToggle.contains(e.target) && !fabMenu.contains(e.target)) {
				fabMenu.classList.remove('active');
				fabToggle.style.transform = 'rotate(0deg)';
			}
		});
		
		// Add smooth scrolling to fab items
		fabItems.forEach(item => {
			item.addEventListener('click', (e) => {
				e.preventDefault();
				const targetId = item.getAttribute('href');
				const targetElement = document.querySelector(targetId);
				
				if (targetElement) {
					const headerHeight = document.querySelector('.main-header').offsetHeight;
					const targetPosition = targetElement.offsetTop - headerHeight - 20;
					
					window.scrollTo({
						top: targetPosition,
						behavior: 'smooth'
					});
					
					// Close menu after navigation
					fabMenu.classList.remove('active');
					fabToggle.style.transform = 'rotate(0deg)';
				}
			});
		});
	}
}

// BACK TO TOP BUTTON FUNCTIONALITY
function initBackToTop() {
	const backToTopBtn = document.getElementById('back-to-top');
	
	if (backToTopBtn) {
		// Show/hide button based on scroll position
		window.addEventListener('scroll', () => {
			if (window.pageYOffset > 300) {
				backToTopBtn.classList.add('visible');
			} else {
				backToTopBtn.classList.remove('visible');
			}
		});
		
		// Smooth scroll to top when clicked
		backToTopBtn.addEventListener('click', () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	}
}

// ENHANCED CURSOR EFFECTS
function initCursorEffects() {
	const cursor = document.createElement('div');
	cursor.className = 'custom-cursor';
	document.body.appendChild(cursor);
	
	document.addEventListener('mousemove', (e) => {
		cursor.style.left = e.clientX + 'px';
		cursor.style.top = e.clientY + 'px';
	});
	
	// Add hover effects for interactive elements
	const interactiveElements = document.querySelectorAll('a, button, .card, .fab-item');
	interactiveElements.forEach(el => {
		el.addEventListener('mouseenter', () => {
			cursor.classList.add('hover');
		});
		el.addEventListener('mouseleave', () => {
			cursor.classList.remove('hover');
		});
	});
}

// INITIALIZE ALL FEATURES
window.addEventListener('DOMContentLoaded', () => {
	// Initialize scroll animations
	document.querySelectorAll('.section, .card, .blog-post, .stat').forEach(s => {
		s.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
		s.style.opacity = '0';
		s.style.transform = 'translateY(30px)';
	});
	
	// Initialize features
	initSmoothScrolling();
	showLoadingAnimation();
	enhanceModal();
	initParallax();
	initFloatingActionButton();
	initBackToTop();
	initCursorEffects();
	
	// Initial reveal
	revealOnScroll();
	
	// Animate stats when about section is visible
	const aboutSection = document.querySelector('#about');
	if (aboutSection) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					animateStats();
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.5 });
		observer.observe(aboutSection);
	}
});

window.addEventListener('scroll', revealOnScroll);
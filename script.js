// script.js
class EventRegistration {
    constructor() {
        this.form = document.getElementById('registrationForm');
        this.submitBtn = document.querySelector('.submit-btn');
        this.successMessage = document.getElementById('successMessage');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        document.getElementById('name').addEventListener('blur', () => this.validateName());
        document.getElementById('email').addEventListener('blur', () => this.validateEmail());
        document.getElementById('event').addEventListener('change', () => this.validateEvent());
        
        // Clear errors on input
        document.getElementById('name').addEventListener('input', () => this.clearError('name'));
        document.getElementById('email').addEventListener('input', () => this.clearError('email'));
        document.getElementById('event').addEventListener('change', () => this.clearError('event'));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Clear previous errors
        this.clearAllErrors();
        
        // Validate all fields
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isEventValid = this.validateEvent();
        
        if (isNameValid && isEmailValid && isEventValid) {
            await this.submitForm();
        } else {
            this.showFormErrors();
        }
    }

    validateName() {
        const name = document.getElementById('name').value.trim();
        const nameInput = document.getElementById('name');
        const errorElement = document.getElementById('nameError');
        
        if (!name) {
            this.showError('name', 'Full name is required');
            return false;
        }
        
        if (name.length < 2) {
            this.showError('name', 'Name must be at least 2 characters long');
            return false;
        }
        
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            this.showError('name', 'Name can only contain letters and spaces');
            return false;
        }
        
        this.clearError('name');
        return true;
    }

    validateEmail() {
        const email = document.getElementById('email').value.trim();
        const emailInput = document.getElementById('email');
        const errorElement = document.getElementById('emailError');
        
        if (!email) {
            this.showError('email', 'Email address is required');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showError('email', 'Please enter a valid email address');
            return false;
        }
        
        this.clearError('email');
        return true;
    }

    validateEvent() {
        const event = document.getElementById('event').value;
        const eventSelect = document.getElementById('event');
        const errorElement = document.getElementById('eventError');
        
        if (!event) {
            this.showError('event', 'Please select an event');
            return false;
        }
        
        this.clearError('event');
        return true;
    }

    showError(fieldName, message) {
        const input = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');
        
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    clearError(fieldName) {
        const input = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');
        
        input.classList.remove('error');
        errorElement.classList.remove('show');
        errorElement.textContent = '';
    }

    clearAllErrors() {
        const fields = ['name', 'email', 'event'];
        fields.forEach(field => this.clearError(field));
    }

    showFormErrors() {
        // Add shake animation to invalid fields
        const errorInputs = document.querySelectorAll('.form-input.error, .form-select.error');
        errorInputs.forEach(input => {
            input.style.animation = 'none';
            input.offsetHeight; // Trigger reflow
            input.style.animation = 'shake 0.5s ease-in-out';
        });
    }

    async submitForm() {
        // Show loading state
        this.submitBtn.classList.add('loading');
        
        // Simulate API call
        await this.simulateSubmission();
        
        // Hide form and show success message
        this.form.style.display = 'none';
        this.successMessage.classList.add('show');
        
        // Remove loading state
        this.submitBtn.classList.remove('loading');
    }

    simulateSubmission() {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('Form Data:', {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    event: document.getElementById('event').value
                });
                resolve();
            }, 2000);
        });
    }
}

// Initialize the registration form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EventRegistration();
});

// Add some interactive enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add floating label effect
    const inputs = document.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Add form field animations on scroll
    const formGroups = document.querySelectorAll('.form-group');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(group);
    });
});

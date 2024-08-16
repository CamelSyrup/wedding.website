// Billboard FlipClock JavaScript
class BillboardFlipClock {
    constructor(element, endTime) {
        this.element = element;
        this.endTime = new Date(endTime).getTime();
        this.initClock();
        this.startCountdown();
    }

    initClock() {
        this.clockElement = document.createElement('div');
        this.clockElement.className = 'flipclock';
        this.element.appendChild(this.clockElement);

        this.createDigits();
    }

    createDigits() {
        this.daysElement = this.createDigitElement('Days');
        this.hoursElement = this.createDigitElement('Hours');
        this.minutesElement = this.createDigitElement('Minutes');
        this.secondsElement = this.createDigitElement('Seconds');
    }

    createDigitElement(label) {
        const digitContainer = document.createElement('div');
        digitContainer.className = 'flip-digit';

        const digitTop = document.createElement('div');
        digitTop.className = 'digit-top';
        digitContainer.appendChild(digitTop);

        const digitBottom = document.createElement('div');
        digitBottom.className = 'digit-bottom';
        digitContainer.appendChild(digitBottom);

        const digitLabel = document.createElement('div');
        digitLabel.className = 'digit-label';
        digitLabel.textContent = label;
        digitContainer.appendChild(digitLabel);

        this.clockElement.appendChild(digitContainer);

        return { top: digitTop, bottom: digitBottom };
    }

    startCountdown() {
        this.updateClock();
        setInterval(() => {
            this.updateClock();
        }, 1000);
    }

    updateClock() {
        const now = new Date().getTime();
        const timeRemaining = this.endTime - now;

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        this.setDigit(this.daysElement, days);
        this.setDigit(this.hoursElement, hours);
        this.setDigit(this.minutesElement, minutes);
        this.setDigit(this.secondsElement, seconds);
    }

    setDigit(digitElement, value) {
        const paddedValue = String(value).padStart(2, '0');

        digitElement.top.textContent = paddedValue;
        digitElement.bottom.textContent = paddedValue;
    }
}

// Initialize the FlipClock
document.addEventListener('DOMContentLoaded', function () {
    const clockElement = document.querySelector('.flipclock');
    const endTime = 'Aug 10, 2025 00:00:00';
    new BillboardFlipClock(clockElement, endTime);
});

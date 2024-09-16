const emailInputWrapper = document.querySelector('.email-input-wrapper');
const emailInput = document.querySelector('.email-input');
const emailLabel = document.querySelector('.email-label');
const emailError = document.querySelector('.email-error');

const countryInputWrapper = document.querySelector('.country-input-wrapper');
const countryInput = document.querySelector('.country-input');
const countryLabel = document.querySelector('.country-label');
const countryError = document.querySelector('.country-error');

const zipInputWrapper = document.querySelector('.zip-input-wrapper');
const zipInput = document.querySelector('.zip-input');
const zipLabel = document.querySelector('.zip-label');
const zipError = document.querySelector('.zip-error');

const passwordInputWrapper = document.querySelector('.password-input-wrapper');
const passwordInput = document.querySelector('.password-input');
const passwordLabel = document.querySelector('.password-label');
const passwordError = document.querySelector('.password-error');

const confirmPasswordInputWrapper = document.querySelector(
	'.confirm-password-input-wrapper'
);
const confirmPasswordInput = document.querySelector('.confirm-password-input');
const confirmPasswordLabel = document.querySelector('.confirm-password-label');
const confirmPasswordError = document.querySelector('.confirm-password-error');

const formElements = {
	email: {
		inputWrapper: emailInputWrapper,
		input: emailInput,
		label: emailLabel,
		error: emailError,
		constraint: /@+/,
	},
	country: {
		inputWrapper: countryInputWrapper,
		input: countryInput,
		label: countryLabel,
		error: countryError,
	},
	zip: {
		inputWrapper: zipInputWrapper,
		input: zipInput,
		label: zipLabel,
		error: zipError,
	},
	password: {
		inputWrapper: passwordInputWrapper,
		input: passwordInput,
		label: passwordLabel,
		error: passwordError,
		constraint: /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)[^\s]{8,}$/,
	},
	confirmPassword: {
		inputWrapper: confirmPasswordInputWrapper,
		input: confirmPasswordInput,
		label: confirmPasswordLabel,
		error: confirmPasswordError,
	},
};

(function shortenLongCountryNames() {
	const countryOptions = Array.from(formElements.country.input.children);
	countryOptions.forEach((country) => {
		const countryName = country.innerText.trim();
		if (countryName.length > 32) {
			country.innerText = `${countryName.slice(0, 32)}...`;
		}
	});
})();

class Form {
	constructor(form) {
		this.email = form.email;
		this.country = form.country;
		this.zip = form.zip;
		this.password = form.password;
		this.confirmPassword = form.confirmPassword;
	}

	isEmpty(input) {
		if (input.value === '') {
			return true;
		}
		return false;
	}

	createErrorDOM(message) {
		const iconSVG = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'svg'
		);
		const iconPath = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'path'
		);
		iconSVG.setAttribute('viewBox', '0 -960 960 960');
		iconPath.setAttribute(
			'd',
			'M479.99-280q15.01 0 25.18-10.15 10.16-10.16 10.16-25.17 0-15.01-10.15-25.18-10.16-10.17-25.17-10.17-15.01 0-25.18 10.16-10.16 10.15-10.16 25.17 0 15.01 10.15 25.17Q464.98-280 479.99-280Zm-31.32-155.33h66.66V-684h-66.66v248.67ZM480.18-80q-82.83 0-155.67-31.5-72.84-31.5-127.18-85.83Q143-251.67 111.5-324.56T80-480.33q0-82.88 31.5-155.78Q143-709 197.33-763q54.34-54 127.23-85.5T480.33-880q82.88 0 155.78 31.5Q709-817 763-763t85.5 127Q880-563 880-480.18q0 82.83-31.5 155.67Q817-251.67 763-197.46q-54 54.21-127 85.84Q563-80 480.18-80Zm.15-66.67q139 0 236-97.33t97-236.33q0-139-96.87-236-96.88-97-236.46-97-138.67 0-236 96.87-97.33 96.88-97.33 236.46 0 138.67 97.33 236 97.33 97.33 236.33 97.33ZM480-480Z'
		);
		iconSVG.appendChild(iconPath);

		const errorMessage = document.createElement('p');
		errorMessage.innerText = message;

		return { icon: iconSVG, message: errorMessage };
	}

	appendError(formElement, error) {
		const errorWrapper = formElement.error;
		console.log(errorWrapper);
		const errorElements = error;
		errorWrapper.appendChild(errorElements.icon);
		errorWrapper.appendChild(errorElements.message);
	}

	createError(formElement, message) {
		this.appendError(formElement, this.createErrorDOM(message));
		formElement.input.classList.add('error');
		formElement.label.classList.add('error');
	}

	clearError(formElement) {
		if (formElement.error.children) {
			formElement.error.innerHTML = '';
			formElement.input.classList.remove('error');
			formElement.label.classList.remove('error');
		}
	}

	inputEmailError() {
		if (this.email.input.value === '') {
			return '';
		}
		if (!this.email.constraint.test(this.email.input.value)) {
			return 'Email address must contain an @ symbol!';
		}
		return '';
	}

	submitEmailError() {
		if (this.email.input.value === '') {
			return 'This field is required!';
		}
		if (!this.email.constraint.test(this.email.input.value)) {
			return 'Email address must contain an @ symbol!';
		}
		return '';
	}

	submitCountryError() {
		if (this.country.input.value === '') {
			return 'This field is required!';
		}
		return '';
	}

	submitZipError() {
		if (this.zip.input.value === '') {
			return 'This field is required!';
		}
		return '';
	}

	inputPasswordError() {
		if (this.password.input.value === '') {
			return '';
		}
		if (!this.password.constraint.test(this.password.input.value)) {
			return 'Password must be at least 8 char. long, contain at least 1 special symbol (?=.*[!@#$%^&*(),.?":{}|<>]), at least 1 number and no spaces are allowed!';
		}
		return '';
	}

	submitPasswordError() {
		if (this.password.input.value === '') {
			return 'This field is required!';
		}
		if (!this.password.constraint.test(this.password.input.value)) {
			return 'Password must be at least 8 char. long, contain at least 1 special symbol (?=.*[!@#$%^&*(),.?":{}|<>]), at least 1 number and no spaces are allowed!';
		}
		return '';
	}

	inputConfirmPasswordError() {
		if (this.password.input.value === '') {
			return '';
		}
		if (this.confirmPassword.input.value === '') {
			return '';
		}
		if (this.confirmPassword.input.value !== this.password.input.value) {
			return 'Passwords do not match!';
		}
		return '';
	}

	submitConfirmPasswordError() {
		if (this.confirmPassword.input.value === '') {
			return 'This field is required!';
		}
		if (this.confirmPassword.input.value !== this.password.input.value) {
			return 'Passwords do not match!';
		}
		return '';
	}

	initializeInputs(...input) {
		input.forEach((item) => {
			item.input.addEventListener('change', () => {
				if (this.isEmpty(item.input)) {
					item.label.classList.remove('full');
				} else {
					item.label.classList.add('full');
				}
			});
			item.input.addEventListener('input', () => {
				this.clearError(item);
			});
		});
		this.email.input.addEventListener('change', () => {
			if (this.inputEmailError()) {
				this.createError(this.email, this.inputEmailError());
			}
		});
		this.password.input.addEventListener('change', () => {
			if (this.inputPasswordError()) {
				this.createError(this.password, this.inputPasswordError());
			}
			if (this.confirmPassword.input.value) {
				if (this.inputConfirmPasswordError()) {
					this.createError(
						this.confirmPassword,
						this.inputConfirmPasswordError()
					);
				}
			}
		});
		this.password.input.addEventListener('input', () => {
			this.clearError(this.confirmPassword);
		});
		this.confirmPassword.input.addEventListener('change', () => {
			if (this.inputConfirmPasswordError()) {
				this.createError(
					this.confirmPassword,
					this.inputConfirmPasswordError()
				);
			}
		});
	}

	initializeForm() {
		this.initializeInputs(
			{
				input: this.email.input,
				label: this.email.label,
				error: this.email.error,
			},
			{
				input: this.country.input,
				label: this.country.label,
				error: this.country.error,
			},
			{
				input: this.zip.input,
				label: this.zip.label,
				error: this.zip.error,
			},
			{
				input: this.password.input,
				label: this.password.label,
				error: this.password.error,
			},
			{
				input: this.confirmPassword.input,
				label: this.confirmPassword.label,
				error: this.confirmPassword.error,
			}
		);
		const formButton = document.querySelector('.create-account');
		formButton.addEventListener('click', (e) => {
			if (
				this.submitEmailError() ||
				this.submitCountryError() ||
				this.submitZipError() ||
				this.submitPasswordError() ||
				this.submitConfirmPasswordError()
			) {
				e.preventDefault();
			}
			if (this.submitEmailError()) {
				this.clearError(this.email);
				this.createError(this.email, this.submitEmailError());
			}
			if (this.submitCountryError()) {
				this.clearError(this.country);
				this.createError(this.country, this.submitCountryError());
			}
			if (this.submitZipError()) {
				this.clearError(this.zip);
				this.createError(this.zip, this.submitZipError());
			}
			if (this.submitPasswordError()) {
				this.clearError(this.password);
				this.createError(this.password, this.submitPasswordError());
			}
			if (this.submitConfirmPasswordError()) {
				this.clearError(this.confirmPassword);
				this.createError(
					this.confirmPassword,
					this.submitConfirmPasswordError()
				);
			}
		});
	}
}

const form = new Form(formElements);
form.initializeForm();

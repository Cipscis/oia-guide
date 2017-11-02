(function () {
	var selectors = {
		section: '.js-expander',
		trigger: '.js-expander-trigger',
		body: '.js-expander-body'
	};

	var classes = {
		section: 'js-expander',
		closed: 'is-closed'
	};

	var Expander = {
		init: function () {
			Expander._initEvents();

			// If no JS, expanders will be open and non-interactable
			Expander._closeByDefault();
			Expander._addTabIndex();
		},

		_initEvents: function () {
			var $triggers,
				i;

			$triggers = document.querySelectorAll(selectors.trigger);
			for (i = 0; i < $triggers.length; i++) {
				$triggers[i].addEventListener('click', Expander._triggerClickEvent);
			}

			document.addEventListener('keypress', Expander._triggerKeyPressEvent);
		},

		_triggerClickEvent: function (e) {
			e.preventDefault();

			var $section = e.target;

			while (Array.prototype.indexOf.call($section.classList, classes.section) === -1) {
				$section = $section.parentElement;
			}

			Expander._toggleSection($section);
		},

		_triggerKeyPressEvent: function (e) {
			var key = e.keyCode || e.which,
				target = e.target;

			if (key === 13) {
				// Enter pressed
				// Simulate click event
				Expander._triggerClickEvent(e);
			}
		},

		_toggleSection: function ($section) {
			var open = Array.prototype.indexOf.call($section.classList, classes.closed) === -1;

			$section.classList.toggle(classes.closed);
			if (open) {
				// Close the expander
				$section.setAttribute('aria-expanded', 'false');
			} else {
				// Open the expander
				$section.setAttribute('aria-expanded', 'true');
			}
		},

		_closeByDefault: function () {
			var $sections,
				i;

			$sections = document.querySelectorAll(selectors.section);
			for (i = 0; i < $sections.length; i++) {
				$sections[i].classList.add(classes.closed);
				$sections[i].setAttribute('aria-expanded', 'false');
			}
		},

		_addTabIndex: function () {
			var $triggers,
				i;

			$triggers = document.querySelectorAll(selectors.trigger);
			for (i = 0; i < $triggers.length; i++) {
				$triggers[i].setAttribute('tabindex', 0);
			}
		}
	};

	document.addEventListener('DOMContentLoaded', Expander.init);
})();
(function () {
	var selectors = {
		section: '.js-expander',
		trigger: '.js-expander-trigger',
		body: '.js-expander-body'
	};

	var classes = {
		section: 'js-expander'
	};

	var Expander = {
		init: function () {
			Expander._initEvents();

			// If no JS, expanders will be open and non-interactable
			Expander._closeByDefault();
			Expander._addTabIndex();

			window.onload = Expander._openByHash;
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

			while (Array.prototype.indexOf.call($section.classList || [], classes.section) === -1) {
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

		_toggleSection: function ($section, close) {
			if (typeof close === 'undefined') {
				close = $section.getAttribute('aria-expanded') === 'false';
			}

			if (close) {
				// Open the expander
				$section.setAttribute('aria-expanded', 'true');
			} else {
				// Close the expander
				$section.setAttribute('aria-expanded', 'false');
			}
		},

		_closeByDefault: function () {
			var $sections,
				i;

			$sections = document.querySelectorAll(selectors.section);
			for (i = 0; i < $sections.length; i++) {
				$sections[i].setAttribute('aria-expanded', 'false');
			}
		},

		_openByHash: function () {
			// If URL contains a hash to an element within a collapsed section,
			// expand that section then scroll to the element

			var hash = document.location.hash,
				$hash,
				$expander;

			if (hash.length) {
				$hash = document.querySelectorAll(hash);
				if ($hash.length) {

					// Expand the containing section
					$hash = $hash[0];
					$expander = $hash;

					while ($expander.parentElement && (Array.prototype.indexOf.call($expander.classList || [], classes.section) === -1)) {
						$expander = $expander.parentElement;
					}

					if (Array.prototype.indexOf.call($expander.classList || [], classes.section) !== -1) {
						Expander._toggleSection($expander, true);
					}

					// Scroll to the given element
					// Only works if asynchronous
					window.setTimeout(
						function () {
							$hash.scrollIntoView();
						},
						0
					);
				}
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
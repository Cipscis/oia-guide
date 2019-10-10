import activate from './activate.js';

const expander = (function (activate) {
	const selectors = {
		section: '.js-expander',
		trigger: '.js-expander-trigger',
		body: '.js-expander-body'
	};

	const classes = {
		section: 'js-expander'
	};

	const module = {
		init: function () {
			module._initEvents();

			// If no JS, expanders will be open and non-interactable
			module._closeByDefault();
			module._addTabIndex();

			window.addEventListener('load', module._openByHash);
		},

		_initEvents: function () {
			var $triggers;

			$triggers = document.querySelectorAll(selectors.trigger);
			activate($triggers, module._activateTrigger);

			window.addEventListener('hashchange', module._openByHash);
		},

		_activateTrigger: function (e) {
			var $section;

			e.preventDefault();

			$section = e.target;

			while ($section && ($section.classList.contains(classes.section) === false)) {
				$section = $section.parentElement;
			}

			module._toggleSection($section);
		},

		_toggleSection: function ($section, close) {
			var $triggers = $section.querySelectorAll(selectors.trigger);

			if (typeof close === 'undefined') {
				close = $section.getAttribute('aria-expanded') === 'false';
			}

			if (close) {
				// Open the expander
				$section.setAttribute('aria-expanded', 'true');
				$triggers.forEach(($trigger) => $trigger.setAttribute('aria-expander', 'true'));
			} else {
				// Close the expander
				$section.setAttribute('aria-expanded', 'false');
				$triggers.forEach(($trigger) => $trigger.setAttribute('aria-expander', 'false'));
			}
		},

		_closeByDefault: function () {
			var $sections;

			$sections = document.querySelectorAll(selectors.section);

			$sections.forEach(($section) => {
				$section.setAttribute('aria-expanded', 'false');

				let $triggers = $section.querySelectorAll(selectors.trigger);
				$triggers.forEach(($trigger) => $trigger.setAttribute('aria-expander', 'false'));
			});
		},

		_openByHash: function () {
			// If URL contains a hash to an element within a collapsed section,
			// expand that section then scroll to the element

			var hash = document.location.hash;
			var $hash;
			var $expander;

			if (hash.length) {
				$hash = document.querySelectorAll(hash);
				if ($hash.length) {

					// Expand the containing section
					$hash = $hash[0];
					$expander = $hash;

					while ($expander.parentElement && ($expander.classList.contains(classes.section) === false)) {
						$expander = $expander.parentElement;
					}

					if ($expander.classList.contains(classes.section)) {
						module._toggleSection($expander, true);
					}

					// Scroll to the given element
					// Only works if asynchronous
					window.setTimeout(() => $hash.scrollIntoView(), 0);
				}
			}
		},

		_addTabIndex: function () {
			var $triggers;

			$triggers = document.querySelectorAll(selectors.trigger);
			$triggers.forEach(($trigger) => $trigger.setAttribute('tabindex', '0'));
		}
	};

	return {
		init: module.init
	};
})(activate);

export default expander;

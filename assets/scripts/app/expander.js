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
			Expander._closeByDefault();
		},

		_initEvents: function () {
			var $triggers,
				i;

			$triggers = document.querySelectorAll(selectors.trigger);
			for (i = 0; i < $triggers.length; i++) {
				$triggers[i].addEventListener('click', Expander._triggerClickEvent);
			}
		},

		_triggerClickEvent: function (e) {
			e.preventDefault();

			var $section = e.target;

			while (Array.prototype.indexOf.call($section.classList, classes.section) === -1) {
				$section = $section.parentElement;
			}

			Expander._toggleSection($section);
		},

		_toggleSection: function ($section) {
			$section.classList.toggle(classes.closed);
		},

		_closeByDefault: function () {
			var $sections,
				i;

			$sections = document.querySelectorAll(selectors.section);
			for (i = 0; i < $sections.length; i++) {
				$sections[i].classList.add(classes.closed);
			}
		}
	};

	document.addEventListener('DOMContentLoaded', Expander.init);
})();
(function () {
	var selectors = {
		section: '.js-expander',
		trigger: '.js-expander-trigger',
		body: '.js-expander-body'
	};

	var classes = {
		closed: 'is-closed'
	};

	var Expander = {
		init: function () {
			Expander._initEvents();
			Expander._closeByDefault();
		},

		_initEvents: function () {
			$(document)
				.on('click', selectors.trigger, Expander._triggerClickEvent);
		},

		_triggerClickEvent: function (e) {
			e.preventDefault();

			var $trigger = $(this),
				$section = $trigger.closest(selectors.section);

			Expander._toggleSection($section);
		},

		_toggleSection: function ($section) {
			$section.toggleClass(classes.closed);
		},

		_closeByDefault: function () {
			$(selectors.section).addClass(classes.closed);
		}
	};

	$(document).ready(Expander.init);
})();
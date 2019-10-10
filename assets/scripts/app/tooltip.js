import keys from './keybinding.js';

const tooltip = (function () {
	const selectors = {
		tooltip: '.js-tooltip',
		body: '.js-tooltip__body'
	};

	const classes = {
		hidden: 'tooltip--hidden'
	};

	let initialised = false;

	const module = {
		init: function () {
			if (initialised === false) {
				module._initEvents();
				module._initKeybinding();
			}

			initialised = true;
		},

		_initEvents: function () {
			var $tooltips = document.querySelectorAll(selectors.tooltip);

			$tooltips.forEach($tooltip => {
				$tooltip.addEventListener('mouseleave', module._removeHiddenClassEvent($tooltip));
				$tooltip.addEventListener('focusout', module._processTooltipFocusOut);
			});
		},

		_initKeybinding: function () {
			keys.bind('escape', module._hideOpenTooltips);
		},

		_hideOpenTooltips: function () {
			let $tooltips = module._getOpenTooltips();

			$tooltips.forEach($tooltip => {
				$tooltip.classList.add(classes.hidden);
			});
		},

		_removeHiddenClassEvent: function ($tooltip) {
			return e => {
				if (document.activeElement !== $tooltip) {
					module._removeHiddenClass($tooltip);
				}
			};
		},

		_removeHiddenClass: function ($tooltip) {
			$tooltip.classList.remove(classes.hidden);
		},

		_processTooltipFocusOut: function (e) {
			// Make asynchronous so new activeElement can be detected
			window.setTimeout(() => {
				let $oldFocus = e.target;
				let $newFocus = document.activeElement;

				let $oldTooltip = module._getClosestTooltip($oldFocus);
				let $newTooltip = module._getClosestTooltip($newFocus);

				if ($oldTooltip !== $newTooltip) {
					module._removeHiddenClass($oldTooltip);
				}
			}, 0);
		},

		_getOpenTooltips: function () {
			let $openBodies = module._getOpenTooltipBodies();

			let $tooltips = [];
			$openBodies.forEach($el => {
				let $tooltip = module._getClosestTooltip($el);

				if ($tooltip) {
					$tooltips.push($tooltip);
				} else {
					console.error('Could not find tooltip of open body:', $el);
				}
			});

			return $tooltips;
		},

		_getOpenTooltipBodies: function () {
			let $bodies = document.querySelectorAll(selectors.body);
			let $openBodies = Array.from($bodies).filter($el => {
				return $el.offsetParent !== null;
			});

			return $openBodies;
		},

		_getClosestTooltip: function ($el) {
			let $tooltip = $el;
			while ($tooltip && $tooltip.matches(selectors.tooltip) === false) {
				$tooltip = $tooltip.parentElement;
			}

			return $tooltip;
		}
	};

	return {
		init: module.init
	};
})();

// Self-initialise
tooltip.init();

export default tooltip;

const tmplMode: HTMLTemplateElement = document.createElement('template');
tmplMode.innerHTML = `
<div id="mode-content" class="sc-mode__setting-grid gap-2">
	<app-font-family class="sc-mode__setting"></app-font-family>
	<app-text-size class="sc-mode__setting"></app-text-size>
	<app-reading-guide class="sc-mode__setting"></app-reading-guide>
	<app-margin-align class="sc-mode__setting"></app-margin-align>
	<app-loupe class="sc-mode__setting"></app-loupe>
	<app-read-aloud class="sc-mode__setting"></app-read-aloud>
	<app-text-spacing class="sc-mode__setting"></app-text-spacing>
	<app-focus-aspect class="sc-mode__setting"></app-focus-aspect>
	<app-click-facilite class="sc-mode__setting"></app-click-facilite>
	<app-cursor-aspect class="sc-mode__setting"></app-cursor-aspect>
	<app-color-contrast class="sc-mode__setting"></app-color-contrast>
	<app-link-style class="sc-mode__setting"></app-link-style>
	<app-stop-animations class="sc-mode__setting"></app-stop-animations>
	<app-scroll class="sc-mode__setting"></app-scroll>
</div>
`;

class ModeComponent extends HTMLElement {
	static observedAttributes = ['data-settings'];
	modeContent: HTMLElement | null = null;
	settingsDictionnary: SettingsDictionnary[] = [];

	constructor() {
		super();

		this.appendChild(tmplMode.content.cloneNode(true));

		this.querySelectorAll(".sc-mode__setting").forEach((element: Element) => {
			this.settingsDictionnary.push({ name: stringServiceInstance.normalizeSettingName(element.tagName), element: element.tagName });
		});
	}

	connectedCallback(): void {
		this.modeContent = this.querySelector('#mode-content');
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-settings' === name) {
			this.displaySettings(JSON.parse(newValue));
		}
	}

	displaySettings = (settings: any[]): void => {
		let elements = this.querySelectorAll(".sc-mode__setting");
		elements.forEach((element) => {
			element.classList.add('d-none');
		});

		settings.forEach((setting: any) => {
			let settingObj = this.settingsDictionnary.find((o: SettingsDictionnary) => o.name === stringServiceInstance.normalizeSettingName(Object.keys(setting)[0]));
			let settingElement: HTMLElement = this.querySelector(settingObj?.element);
			settingElement?.setAttribute('data-values', JSON.stringify(Object.entries(setting)[0][1]));
			if ((Object.entries(setting)[0][1] as SettingModel).isTool) {
				settingElement?.classList.remove('d-none');
			}
		});
	}
}

customElements.define('app-mode', ModeComponent);

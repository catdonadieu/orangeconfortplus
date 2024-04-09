const tmplMarginAlign: HTMLTemplateElement = document.createElement('template');
tmplMarginAlign.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>
</div>
`;

class MarginAlignComponent extends AbstractSetting {
	activesValues = {
		"values": "noModifications,alignLeft,margeList",
		"valueSelected": 0
	};

	constructor() {
		super();

		this.setCallback(marginAlignServiceInstance.setMargin.bind(this));

		this.appendChild(tmplMarginAlign.content.cloneNode(true));
	}
}

customElements.define('app-margin-align', MarginAlignComponent);

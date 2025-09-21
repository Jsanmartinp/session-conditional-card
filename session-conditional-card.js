class SessionConditionalCard extends HTMLElement {
  async setConfig(config) {
    if (!config || !config.content) {
      throw new Error("Debes definir el contenido de la tarjeta.");
    }

    this._config = config;
    this.innerHTML = ''; // Limpiar contenido previo

    const shouldShow = this._evaluateConditions(config.conditions || []);
    if (shouldShow) {
      const helpers = await window.loadCardHelpers();
      const cardConfig = config.content.card || config.content;

      const card = helpers.createCardElement(cardConfig);
      card.hass = this._hass;
      this.appendChild(card);
    }
  }

  _evaluateConditions(conditions) {
    return conditions.every(cond => {
      switch (cond.type) {
        case 'user':
          return window?.hass?.user?.id === cond.id;
        case 'localStorage':
          return window.localStorage.getItem(cond.key) === cond.value;
        case 'sessionStorage':
          return window.sessionStorage.getItem(cond.key) === cond.value;
        case 'expression':
          try {
            return eval(cond.value);
          } catch (e) {
            console.warn("Error evaluando expresión:", e);
            return false;
          }
        default:
          return false;
      }
    });
  }

  set hass(hass) {
    this._hass = hass;
    if (this.firstChild) {
      this.firstChild.hass = hass;
    }
  }

  getCardSize() {
    return 1;
  }
}

customElements.define('session-conditional-card', SessionConditionalCard);

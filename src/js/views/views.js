import icons from "url:../../img/icons.svg";

export default class View {
  _data;
  render(data) {
    if (!data) {
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
  _clear() {
    this._parentEl.innerHTML = "";
  }
  renderError(message = this._errorMessage) {
    const markup = `
    
     <div class="error">
            <div>
              <svg>
                <use href="${icons}.svg_icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> 
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}

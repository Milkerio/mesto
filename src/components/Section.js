class Section{
    constructor({renderer}, containerSelector){
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    renderItems(items, user){
        items.forEach(item => {
            this._renderer(item, user);
        })
    }
    addItem(item){
        this._container.append(item);
    }
    prependItem(item) {
        this._container.prepend(item);
      }
}
export {Section};
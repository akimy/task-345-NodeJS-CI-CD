module.exports = class ResponseMock {
  render(view, data) {
    this.setView(view);
    this.setData(data);
  }

  setView(view) {
    this.view = view;
  }

  setData(data) {
    this.data = data;
  }

  getView() {
    return this.view;
  }

  getData() {
    return this.data;
  }
};

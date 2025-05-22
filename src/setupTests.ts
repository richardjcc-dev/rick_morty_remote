import '@testing-library/jest-dom'

if (typeof window.HTMLElement.prototype.scrollIntoView === 'undefined') {
  // eslint-disable-next-line no-undef
  window.HTMLElement.prototype.scrollIntoView = jest.fn()
}

// pagination: {
//   el: '[data-pagination]',
//   type: 'custom',
//   renderCustom: renderFraction,
// },

export const renderFraction = (swiper, current, total) => `
  <span class="nav-count__current">${current.toString().length === 1 ? `0${current}` : current}</span>
  <span class="nav-count__del">&nbsp;/&nbsp;</span>
  <span class="nav-count__total">${total.toString().length === 1 ? `0${total}` : total}</span>
  `
;

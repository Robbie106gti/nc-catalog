declare var M: any;

export const Boxed = function boxed() {
  document.addEventListener('DOMContentLoaded', function() {
    const options = {};
    const elems = document.querySelectorAll('.materialboxed');
    const instances = M.Materialbox.init(elems, options);
  });
};

declare var M: any;

export const boxed = function Boxed() {
  document.addEventListener('DOMContentLoaded', function() {
    const options = {};
    const elems = document.querySelectorAll('.materialboxed');
    const instances = M.Materialbox.init(elems, options);
  });
};

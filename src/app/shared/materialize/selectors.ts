declare var M: any;

export const Tooltips = function tooltips() {
  document.addEventListener('DOMContentLoaded', function() {
    const options = {};
    const elems = document.querySelectorAll('.tooltipped');
    // console.log(elems);
    const instances = M.Tooltip.init(elems, options);
  });
};

export const Dropdowns = function dropdowns() {
  try {
    document.addEventListener('DOMContentLoaded', function() {
      const options = { hover: true };
      const elems = document.querySelectorAll('.dropdown-trigger');
      const instances = M.Dropdown.init(elems, options);
      return elems;
    });
  } catch (error) {
    console.log(error);
  }
};

export const Boxed = function boxed() {
  document.addEventListener('DOMContentLoaded', function() {
    const options = {};
    const elems = document.querySelectorAll('.materialboxed');
    const instances = M.Materialbox.init(elems, options);
  });
};
/* This works but now always... Recommended
@ViewChildren('materialboxed', { read: ElementRef })
elemsMaterialboxed: QueryList<ElementRef>;

constructor() { }

ngAfterViewInit(): void {
  const elems = this.elemsMaterialboxed;
  elems.forEach(el => {
    const instanceMaterialboxed = new M.Materialbox(el.nativeElement, {});
  });
} */

export const TextfieldsUpdate = function textfields() {
  document.addEventListener('DOMContentLoaded', function() {
    M.updateTextFields();
  });
};

export const TextareaResize = el =>
  function textarea() {
    document.addEventListener('DOMContentLoaded', function() {
      M.textareaAutoResize(el);
    });
  };

export const Slider = function slider() {
  document.addEventListener('DOMContentLoaded', function() {
    const options = { fullWidth: true, indicators: true };
    const elems = document.querySelectorAll('.slider');
    const instances = M.Slider.init(elems, options);
  });
};
/* @ViewChild('slider', { read: ElementRef })
slider: ElementRef;

constructor() { }
ngAfterViewInit(): void {
  M.Slider.init(this.slider.nativeElement, {});
} */

export const Carousel = function carousel() {
  document.addEventListener('DOMContentLoaded', function() {
    const options = { fullWidth: true, indicators: true };
    const elems = document.querySelectorAll('.carousel');
    console.log(elems);
    const instances = M.Carousel.init(elems, options);
  });
};

export const Modals = function modals() {
  document.addEventListener('DOMContentLoaded', function() {
    const options = {};
    const elems = document.querySelectorAll('.modal');
    const instances = M.Modal.init(elems, options);
  });
};

export const Tabs = function tabs() {
  document.addEventListener('DOMContentLoaded', function() {
    const options = {};
    const elems = document.querySelectorAll('.tabs');
    const instances = M.Tabs.init(elems, options);
  });
};

export const ActionMenu = function actionmenu() {
  document.addEventListener('DOMContentLoaded', function() {
    const options = { direction: 'left', hoverEnabled: true };
    const elems = document.querySelectorAll('.fixed-action-btn');
    console.log(elems);
    const instances = M.FloatingActionButton.init(elems, options);
  });
};

export const Collapsible = function collapsible() {
  document.addEventListener('DOMContentLoaded', function() {
    const options = {};
    const elems = document.querySelectorAll('.collapsible');
    const instances = M.Collapsible.init(elems, options);
  });
};
/* @ViewChildren('collapsible', { read: ElementRef })
elemsCollapsible: QueryList<ElementRef>;

ngAfterViewInit(): void {
  this.elemsCollapsible.forEach(el => new M.Collapsible(el.nativeElement, {}));
} */

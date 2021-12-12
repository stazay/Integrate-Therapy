const collapsibles = document.querySelectorAll(".collapsible");

collapsibles.forEach((item) =>
  item.querySelector('.collapsible__icon .icon').addEventListener("click", function (event) {
    console.log({event});
    item.classList.toggle("collapsible--expanded");
  })
);

const CheckWebp = {
  init() {
    this.check_webp_feature('alpha', (f, supported) => {
      if (supported) document.body.classList.add('webp');
    })
  },

  check_webp_feature(feature, callback) {
    // 
    var kTestImages = {
        lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
        lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
        alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
        animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    };
    var img = new Image();
    img.onload = function () {
        var result = (img.width > 0) && (img.height > 0);
        callback(feature, result);
    };
    img.onerror = function () {
        callback(feature, false);
    };
    img.src = "data:image/webp;base64," + kTestImages[feature];
  }
};

CheckWebp.init();

const Testimonials = {
  config: {
    // Time in seconds
    timerInterval: 15,
    timerClickDelay: 20,
    
    // CSS Selectors
    selectors: {
      testimonials: '.testimonial__text',
      radioButtons: '.testimonial-bullet',
      arrowRight: '.testimonials__button.icon--right',
      arrowLeft: '.testimonials__button.icon--left',
      activeClass: 'active'
    }
  },

  init () {
    this.initVariables();
    this.createBullets();
    this.timer();
    this.events();
  },

  createBullets() {
    const container = document.querySelector('.testimonials-bullets');
    
    const firstBullet = '<div class="testimonial-bullet active"></div>';
    const bullets = firstBullet + '<div class="testimonial-bullet"></div>'.repeat(this.testimonials.length - 1);
    
    container.innerHTML = bullets;
    this.buttons = document.querySelectorAll(this.config.selectors.radioButtons);
  },

  initVariables () {
    this.current = 1;
    this.testimonials = document.querySelectorAll(this.config.selectors.testimonials);
    this.active = this.testimonials[0];
    this.arrows = {
      right: document.querySelector(this.config.selectors.arrowRight),
      left: document.querySelector(this.config.selectors.arrowLeft)
    };
  },

  timer () {
    // console.log('timer called')
    this.interval = setInterval(() => {
      // console.log('timeout!')
      this.nextTestimonial();
    }, this.config.timerInterval * 1000);
  },
  
  events () {
    this.arrows.right.addEventListener('click', () => this.arrowClicked('right'));
    this.arrows.left.addEventListener('click', () => this.arrowClicked('left'));
  },

  arrowClicked(arrow) {
    clearInterval(this.interval);

    if (arrow === 'left') {
      this.prevTestimonial();
    } else {
      this.nextTestimonial();
    }
    // console.log('arrow clicked')
    
    clearTimeout(this.restartTimeout);
    this.restartTimeout = setTimeout(() => {
      // console.log('restarting timeout')
      this.timer();
    }, this.config.timerClickDelay * 1000);
  },

  nextTestimonial () {
    // Update current
    const isLastOne = this.current === this.testimonials.length;
    if (isLastOne) {
      this.current = 1;
    } else {
      this.current++;
    }

    this.render();
  },

  prevTestimonial () {
    // Update current
    const isFirstOne = this.current === 1;
    if (isFirstOne) {
      this.current = this.testimonials.length;
    } else {
      this.current--;
    }

    this.render();
  },
  
  render() {
    // Hide previous one
    this.active.classList.remove(this.config.selectors.activeClass);
    
    // Show new one
    this.active = this.testimonials[this.current - 1];
    this.active.classList.add(this.config.selectors.activeClass);

    // Check button
    // this.buttons[this.current - 1].checked = true;
    this.buttons.forEach(button => button.classList.remove('active'));
    this.buttons[this.current - 1].classList.add('active');
  }
};

Testimonials.init();

/*
// Fire only if target is nav...
collapsibles.forEach((item) =>
  item.addEventListener("click", function (event) {
    console.log({event});
    if (event.target === item) {
      item.classList.toggle("collapsible--expanded");
    }
  })
);*/

/*
// Stop propagation of click event
document.querySelectorAll('.nav__item').forEach(li => {
  li.addEventListener('click', (event) => {
    event.stopPropagation();
  })
})*/
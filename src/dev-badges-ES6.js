class DevBadges {
  constructor(hideOnMouseOver = false, position = 'bottom') {
    this.animation = hideOnMouseOver;

    if (position == 'bottom' || position == 'top') {
      this.position = position;
    } else {
      this.position = 'bottom';
    }
  }

  render() {
    var $body = document.querySelector('body');
    $body.innerHTML += `<ul class="dev-group" data-position="${this.position}"> <li class="badge_devgroup" name="dev-group_screen"> screen </li> <li class="badge_devgroup" name="dev-group_mouse">X: 0 - Y: 0</li> </ul>`;

    var $group = document.querySelectorAll('.dev-group')[0];

    var $mouse = document.getElementsByName('dev-group_mouse')[0];
    var $screen = document.getElementsByName('dev-group_screen')[0];
    var $badges = document.querySelectorAll('.badge_devgroup');

    for (var i=0; i < $badges.length; i++) {
      var $badge = $badges[i];
      $badge.style.cssText += "opacity: 1; text-align: center; background: rgb(27, 27, 27); padding: 7px 10px; display: table-cell; min-width: 140px;";

      if (this.animation == true) {
        $badge.addEventListener('mouseover', function() {
          var pos = $group.getAttribute('data-position');

          if (pos == 'bottom') {
            $group.style.bottom = 'inherit';
            $group.setAttribute('data-position', 'top');
          } else {
            $group.style.bottom = '10px';
            $group.setAttribute('data-position', 'bottom');
          }

        })
      } else {
        console.warn(this);
      }

    }

    $group.style.cssText += `opacity: 1; isplay: table; padding: 0px; margin: 0px; list-style: none; width: 220px; color: rgb(255, 255, 255); font-family: sans-serif; position: fixed; ${this.position}: 10px; left: 50%; transform: translateX(-50%); transition: all 0.3s cubic-bezier(0.42, 0, 0.57999, 1);`;
    $mouse.style.cssText += "border-left: 1px solid #fff";

    $screen.innerHTML = innerWidth + ' x ' + innerHeight;

    addEventListener('resize', function() {
      $screen.innerHTML = innerWidth + ' x ' + innerHeight;
    });

    document.addEventListener('mousemove', function(e) {
      var mouse = {
        x: e.clientX,
        y: e.clientY
      };

      $mouse.innerHTML = 'X: ' + mouse.x + ' - Y: ' + mouse.y;
    });
  }

  destroy() {
    var $group = document.querySelector('.dev-group');
    if ($group != undefined) {
      $group.parentNode.removeChild($group)
    }
  }
}

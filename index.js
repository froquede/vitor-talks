$(function () {
  var timer = 1000;
  var currentSelection = 0;
  var currentChar = 0;
  var chars = [5,9,9,9];
  
  var updateRow = function(r) {
    $('.characters #row li').removeClass('active');
    $('#'+r).parent('li').addClass('active');
  };
  
  var updateChar = function(r) {
    $('.second ul li').removeClass('active');
    var line = $('.second ul:nth-child('+currentSelection+') li:nth-child('+r+')').addClass('active');
  };
  
  
  var state = {
    timer: null,
    nextLine: function() {
      this.timer = setInterval(function() {
        if(currentSelection > 3) currentSelection = 0;
        console.log('current row: ', currentSelection);
        updateRow(currentSelection++);
      }, timer);
    },
    nextColumn: function() {
      clearInterval(this.timer);
      currentChar = 1;
      this.timer = setInterval(function() {
        if (currentChar > chars[currentSelection -1]) currentChar = 1;
        console.log('current row: ', currentSelection);
        console.log('current col: ', currentChar);
        console.log('current char: ', $('.second ul:nth-child('+currentSelection+') li:nth-child('+currentChar+') input').val());
        updateChar(currentChar++);
      }, timer);
    },
    next: function() {
      console.log(this.current);
      if (this.current == 'nextLine') {
        this.current = 'nextColumn';
        this.nextColumn();
      } else if (this.current == 'nextColumn') {
        this.current = 'selectChar';
        var text = $('#text');
        currentChar--;
        var selectedChar = $('.second ul:nth-child('+currentSelection+') li:nth-child('+currentChar+') input').val();
        text.val(text.val() + selectedChar);
        console.log(text.val());
        this.current = 'nextLine';
        clearInterval(this.timer);
        this.nextLine();
      }
    },
    selectChar: 3,
    current: 'nextLine' 
  };
  
  state.nextLine();
  
  document.addEventListener('keydown', function(event) {
    if(event.key == 'ArrowRight') {
      state.next();
    }
  });
});


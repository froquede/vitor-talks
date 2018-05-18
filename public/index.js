$(function() {
  var timer = 500;
  var timer_min = 500;
  var timer_max = 20000;
  var currentSelection = 0;
  var currentChar = 0;
  var chars = [5, 9, 9, 9];

  var updateRow = function(r) {
    $(".characters #row li").removeClass("active");
    $("#" + r)
      .parent("li")
      .addClass("active");
  };

  var updateChar = function(r) {
    $(".second ul li").removeClass("active");
    var line = $(
      ".second ul:nth-child(" + currentSelection + ") li:nth-child(" + r + ")"
    ).addClass("active");
  };

  var updateViewChar = function(char) {
    $(".js-display-char").text(char);
  };

  var highlightSelection = function() {
    $(".js-display-char").addClass("highlight");
    setTimeout(function() {
      $(".js-display-char").removeClass("highlight");
    }, timer);
  };

  var state = {
    timer: null,
    nextLine: function() {
      this.timer = setInterval(function() {
        var max = 3;
        if(window.suggestions_length > 0){
          max = 4;
        }
        
        if (currentSelection > max) currentSelection = 0;
        console.log("current row: ", currentSelection);
        updateViewChar(currentSelection);
        updateRow(currentSelection++);
      }, timer);
    },
    nextColumn: function() {
      clearInterval(this.timer);
      currentChar = 1;
      this.timer = setInterval(function() {
        if (currentChar > chars[currentSelection - 1]) currentChar = 1;
        console.log("current row: ", currentSelection);
        console.log("current col: ", currentChar);
        console.log(
          "current char: ",
          $(
            ".second ul:nth-child(" +
              currentSelection +
              ") li:nth-child(" +
              currentChar +
              ") input"
          ).val()
        );
        updateViewChar(
          $(
            ".second ul:nth-child(" +
              currentSelection +
              ") li:nth-child(" +
              currentChar +
              ") input"
          ).val()
        );
        updateChar(currentChar++);
      }, timer);
    },
    next: function() {
      console.log(this.current);
      if (this.current == "nextLine") {
        this.current = "nextColumn";
        this.nextColumn();
      } else if (this.current == "nextColumn") {
        this.current = "selectChar";
        var text = $("#text");
        currentChar--;
        var selectedChar = $(
          ".second ul:nth-child(" +
            currentSelection +
            ") li:nth-child(" +
            currentChar +
            ") input"
        ).val();
        text.val(text.val() + selectedChar);
        console.log(text.val());
        this.current = "nextLine";
        clearInterval(this.timer);
        this.nextLine();
        var actual_query = text.val();

        $.getJSON(
          "https://suggestqueries.google.com/complete/search?callback=?",
          {
            hl: "pt", // Language
            jsonp: "suggestCallBack", // jsonp callback function name
            q: actual_query, // query term
            client: "youtube" // force youtube style response, i.e. jsonp
          }
        );

        suggestCallBack = function(data) {
          var suggestions = [];
          data[1].length = 5;
          $(".js-suggestion-list").html("");
          var all_words = [];
          $.each(data[1], function(key, val) {
            var res = val[0];
            all_words = all_words.concat(res.split(" "));
          });

          all_words = all_words.filter(function(item, pos) {
            return all_words.indexOf(item) == pos;
          });
          all_words = all_words.filter(function(item, pos) {
            return (
              item.substring(0, actual_query.length).toUpperCase() ===
              actual_query.toUpperCase()
            );
          });

          all_words = all_words.concat(
            data[1].map(function(v) {
              return v[0];
            })
          );

          if (all_words.length > 5) {
            all_words.length = 5;
          }

          window.suggestions_length = all_words.length;

          $(".js-suggestion-list").append(
            all_words.map(function(word) {
              return "<li><input type='button' value='" + word + "' id='" + word + "'/></li>";
            })
          );
        };
      }
    },
    selectChar: 3,
    current: "nextLine"
  };

  state.nextLine();

  document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowRight") {
      state.next();
      highlightSelection();
    }
  });

  var socket = io("http://localhost:81");
  socket.on("connect", function() {
    alert("joystick socket conectado");
  });
  socket.on("release", function(data) {
    if (data.key) {
      if (data.key === "right") {
        state.next();
        highlightSelection();
      }
    }
  });
  socket.on("potentiometer", function(data) {
    timer = (data.value * 2);    
    $('.timer').text((timer / 1000).toFixed(2) + 's');
  });
});

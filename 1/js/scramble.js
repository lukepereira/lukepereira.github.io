var secondComing = "Plato describes a gathering of people who have lived chained inside a cave facing a wall their entire lives. The people watch shadows projected on the wall from objects passing before a fire behind them, and they give names to these shadows. The shadows are as close as the prisoners come to viewing reality. He then explains how the philosopher is like a prisoner who is freed from the cave and comes to understand that the shadows on the wall do not make up reality, for they can perceive the true form of reality and not the mere shadows seen by the prisoners."

// decay text

d3.select("pre.thirty-seconds")
  .datum(secondComing)
  .call(decayText().domain([new Date(), new Date(+new Date() + 30*1000)]));

d3.select("pre.ten-minutes")
  .datum(secondComing)
  .call(decayText().domain([new Date(), new Date(+new Date() + 10*60*1000)]));

d3.select("pre.one-week")
  .datum(secondComing)
  .call(decayText().domain([new Date("2015-11-03"), new Date("2015-11-10")]));

// decay images

d3.select("img.thirty-seconds")
  .call(decayImage().domain([new Date(), new Date(+new Date() + 10*1000)]));

// d3.select("img.ten-minutes")
//   .call(decayImage().domain([new Date(), new Date(+new Date() + 10*60*1000)]));

// d3.select("img.one-week")
//   .call(decayImage().domain([new Date("2015-11-03"), new Date("2015-11-10")]));

// functions and stuff yo

function decayText() {
  var domain = [new Date(), new Date(+new Date() + 60*1000)],
      mutations = 0,
      decayScale = d3.time.scale();

  function decayer(selection) {
    selection.each(function(text) {

      var sel = d3.select(this)
        .text(text);

      decayScale = decayScale
        .domain(domain)
        .range([0,text.length/2]);

      d3.timer(function(t) {

        var mutationsToPerform = Math.floor(decayScale(new Date())) - mutations;

        if(mutationsToPerform > 0) {
          for (i = 0; i < mutationsToPerform; i++) {
            text = mutateText(text);
          }
          mutations += mutationsToPerform;
          sel.text(text);
        }

      })
    
    });
  }

  function mutateText(text) {
    var position = Math.floor(Math.random() * text.length);
    var insertion = Math.random() > .9 ? " " : Math.random().toString(36).substring(2,3);
    return stringSplice(text, position, 1, insertion);
  }

  // http://stackoverflow.com/a/21350614/120290
  function stringSplice(str, index, count, add) {
    return str.slice(0, index) + (add || "") + str.slice(index + count);
  }

  decayer.domain = function(_) {
    if (!arguments.length) return domain;
    domain = _;
    return decayer;
  };

  return decayer;
}

function decayImage() {
  var domain = [new Date(), new Date(+new Date() + 60*1000)],
      decayScale = d3.time.scale();

  function decayer(selection) {
    selection.each(function() {

      var sel = d3.select(this);

      decayScale = decayScale
        .domain(domain)
        .range([0,this.offsetWidth/5]);

      d3.timer(function(t) {
        sel.style("filter", "blur(" + decayScale(new Date()) + "px)");
        sel.style("-webkit-filter", "blur(" + decayScale(new Date()) + "px)");
        return new Date() > decayScale.domain()[1];
      })
    
    });
  }

  decayer.domain = function(_) {
    if (!arguments.length) return domain;
    domain = _;
    return decayer;
  };

  return decayer;
}



 function getProgress (percent, id){var colors = {
    'lowPerf': '#ffa500',
	'bgLowPerf' : '#f9edd6',
    'midPerf': '#f0ff08',
	'bgMidPerf':'#f9fccc',
    'highPerf': '#87b709',
	'bgHighPerf' : '#eefcc9'
};
	 
var element = document.querySelector(id);

var radius = 85;
var border = 15;
var padding = 0;
var startPercent = 0;
var endPercent = percent;
var barColor;
var barBgColor;
if(endPercent < .30){
	barColor=colors.lowPerf;
	barBgColor = colors.bgLowPerf;
} else  if(endPercent < .70){
	barColor=colors.midPerf;
	barBgColor = colors.bgMidPerf;
} else {
	barColor=colors.highPerf;
	barBgColor = colors.bgHighPerf;
}

var twoPi = Math.PI * 2;
var formatPercent = d3.format('.0%');
var boxSize = (radius + padding) * 2;


var count = Math.abs((endPercent - startPercent) / 0.01);
var step = endPercent < startPercent ? -0.01 : 0.01;

var arc = d3.svg.arc()
    .startAngle(0)
    .innerRadius(radius)
    .outerRadius(radius - border)
    .cornerRadius(50);

var parent = d3.select(element);

var svg = parent.append('svg')
    .attr('width', boxSize)
    .attr('height', boxSize);

var gradient = svg.append("svg:defs")
    .append("svg:linearGradient")
    .attr("id", id+'gradient')
    .attr("x1", "0%")
    .attr("y1", "50%")
    .attr("x2", "50%")
    .attr("y2", "0%")
    .attr("spreadMethod", "pad");

gradient.append("svg:stop")
    .attr("offset", "0%")
    .attr("stop-color", barColor)
    .attr("stop-opacity", 1);

gradient.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", barColor)
    .attr("stop-opacity", 1);

var field = svg.append('g')
    .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

var meter = field.append('g')
    .attr('class', 'progress-meter');

meter.append('path')
    .attr('class', 'background')
    .attr('fill', barBgColor)
    .attr('fill-opacity', 1)
    .attr('d', arc.endAngle(twoPi));

var front = meter.append('path')
    .attr('class', 'foreground')
    .attr('fill', 'url(#'+id+'gradient)')
    .attr('fill-opacity', 1);

var numberText = meter.append('text')
    .attr('fill', barColor)
	.attr('font-size', '36px')
    .attr('text-anchor', 'middle')
    .attr('dy', '.278em')
    .attr('class', 'radial__text');

function updateProgress(progress) {
    
    front.attr('d', arc.endAngle(twoPi * progress));
    numberText.text(formatPercent(progress));
}

var progress = startPercent;

(function loops() {
    updateProgress(progress);

    if (count > 0) {
        count--;
        progress += step;
        setTimeout(loops, 10);
    }
})();
}

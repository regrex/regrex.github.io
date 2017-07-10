var Fontmin = require('fontmin');
var srcPath = './fonts/yuwei.ttf';
var destPath = './fonts';
var text = '芝兰生幽谷，不以无人而不芳';

var fontmin = new Fontmin()
	.src(srcPath)
	.use(Fontmin.glyph({
		text: text
	}))
	.use(Fontmin.ttf2eot())
	.use(Fontmin.ttf2woff())
	.use(Fontmin.ttf2svg())
	.use(Fontmin.css())
	.dest(destPath);

fontmin.run(function (err, files, stream) {
	if (err) {
		console.error(err);
	}

	console.log('done');
});

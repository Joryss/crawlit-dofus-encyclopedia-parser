var express = require('express');
var app = express();
var cheerio = require('cheerio');
var Horseman = require("node-horseman");
var horseman = new Horseman({
        injectJquery: true
    });
var fs = require('fs');

app.set('view engine', 'pug');
app.set('views', './views')
app.get('/', function(req, res, next) {
	var url = "http://www.dofus-touch.com/fr/mmorpg/encyclopedie/equipements";
	//var url = "https://www.sosnoob.com/";
	//https://github.com/johntitus/node-horseman/issues/256
	const pages = [3];
	items = [];
	pages.forEach((page) => {
		var response;
		//const horseman = new Horseman();
		horseman
			.open(url + '?page=' + page)
			//.open(url)
			.html('tbody')
			.evaluate(function () {
				var items = [];
				var links = [];
				//var test = $('tr:first').text();
				$('tr:not(:first-child)').each(function(i, tr){
					link = 'http://www.dofus-touch.com' + $(this).find( "td:eq( 0 )" ).find('a').attr('href');
					links.push(link);
					//fs.appendFileSync('links.txt', link + '\n');					
				});
				return links;
				 //$('input[name="btnK"]').click();
			})
			//.log()
			.then((htmlRes) => {
				response = htmlRes;
				console.log(response);
				fs.readFile('links.json', function (err, data) {
					var json = JSON.parse(data)
					json.push(response)

					fs.writeFile("links.json", JSON.stringify(json))
				})
				//fs.appendFileSync('links.json', JSON.stringify(response));
				//saveItem(response);
				/*var $ = cheerio.load(response, {
					normalizeWhitespace: true
				});
				
				$('tr').each(function(i, tr){
					console.log('Tr is working');
					//saveItem($(this).html());
				});
				console.log(items);*/
			})
			//.log()
			.close();
		
		//$ = cheerio.load(response, {
		//	normalizeWhitespace: true
		//});
		//console.log(`${htmlRes}`);
		//$('tr[class="ak-bg-odd"]').each(function(i, tr){
		//response = $(this).html();
		//console.log(element.html());
		//	console.log('Ca fonctionne');
		//});
		//response = `${htmlRes}`;
		//console.log(response);
		//$.html();		
	});
	
	res.render('index', { title: 'Success', message: 'Operation done !'});
});

app.listen(3000, function () {
  console.log('Crawlit listening on port 3000!')
})



function saveItem(item) {
	items.push(item);
}
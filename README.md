# hxVotingApp
##Mongo commands
### all years & songs with an interpret
 db.charts.find( { 'songs.interpret': { $eq: 'ABBA' } })

### only years with an interpret
 db.charts.find( { 'songs.interpret': { $eq: 'ABBA' } }, {'songs':0} )

###title & interpret
db.charts.createIndex( { "songs.title": "text", "songs.interpret": "text" } )
db.charts.find( { $text: { $search: "ABBA" } } , {songs:0})

###display year and song there interpret eqal ...
db.charts.aggregate([{$match: {'songs.interpret': 'ABBA'}},{$project: {songs: {$filter: {input: '$songs', as: 'shape', cond: {$eq: ['$$shape.interpret', 'ABBA']}}}, year: 1, _id: 0}}])



//http://ua.canna.to/canna/charts.php?chart=jc&date=1930

$(function() {
  // Handler for .ready() called.
  
  var all = {};
  
var i= 1956; 
  for (i = 1956; i < 2016; i++) { 
  
  var url = "http://ua.canna.to/canna/charts.php?chart=jc&date=" + i;
  console.log('Requesting:' + url);
  
  jQuery.ajax({
        url: url,
        async: false,
        success: function (result) {
          
            if (result.isOk == false){ console(result.message);}else{
              console.log('success');
              var year = [];
              var tbody = $(result).find('table > tbody')[1];
              var aTR = $(tbody).find('tr');
              
              var song;
              for (var j = 1; j < aTR.length; j++) {
                song = {"pos": j, "title":$($(aTR[j]).find('td')[2]).find('b')[0].textContent, "interpret": $($(aTR[j]).find('td')[1]).find('b')[0].textContent}
                year.push(song);
              }
              console.log(year);
              all[""+ i]=year;
            }
        },
    });
}
  
  console.log(JSON.stringify(all));
  
});


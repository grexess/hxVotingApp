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


var charts = {};
var year;
var i;

for (i = 1930; i < 1933; i++) { 
  console.log(i);
 
  $.get( "http://ua.canna.to/canna/charts.php?chart=jc&date="+ i, function( data ) {
    year = [];
    var aTr = $($(data).find('table > tbody')[1]).find('tr');
    for (j = 1; j < aTr.length; j++) {
      var song = {};
      song.interpret= $($(aTr[j]).find('td')[0]).find('b')[0].innerHTML;
      song.title = $($(aTr[j]).find('td')[1]).find('b')[0].innerHTML;
      year.push(song);
    }
    console.log('inner' + i);
    charts[i+''] = year; 
});
}
console.log(charts);
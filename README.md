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



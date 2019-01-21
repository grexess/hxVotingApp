// Import modules used by both client and server through a single index entry point
// e.g. useraccounts configuration file.
/* Images = new FS.Collection("images", {
    // stores: [new FS.Store.FileSystem("images", {path: "../../../../../covers"})]
    stores: [new FS.Store.FileSystem("images")]
  }); */
  

  /**
* Returns a random integer between min (inclusive) and max (inclusive).
* The value is no lower than min (or the next integer greater than min
* if min isn't an integer) and no greater than max (or the next integer
* lower than max if max isn't an integer).
* Using Math.round() will give you a non-uniform distribution!
*/



// Some function
getRandomInt = function(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var staticPicCounter = 0;

getStaticPicture = function(){
  epocheURLs = [
    { "coverurl": "/img/epoches/cov1.jpg", "interpret": "", "title": "30iger" },
    { "coverurl": "/img/epoches/cov2.jpg", "interpret": "", "title": "40iger" },
    { "coverurl": "/img/epoches/cov3.jpg", "interpret": "", "title": "Fithties" },
    { "coverurl": "/img/epoches/cov4.jpg", "interpret": "", "title": "Sixties" },
    { "coverurl": "/img/epoches/cov5.jpg", "interpret": "", "title": "Siebziger" },
    { "coverurl": "/img/epoches/cov6.jpg", "interpret": "", "title": "Eighties" },
    { "coverurl": "/img/epoches/cov7.jpg", "interpret": "", "title": "Nineties" },
    { "coverurl": "/img/epoches/cov8.jpg", "interpret": "", "title": "2000er" },
    { "coverurl": "/img/epoches/cov9.jpg", "interpret": "", "title": "aktuelle Hits" }
  ]
  let url = epocheURLs[staticPicCounter].coverurl;
  staticPicCounter++;
  if(staticPicCounter === epocheURLs.length){
    staticPicCounter = 0;
  }
  return url;
}

oneHitWonders = [
  {
      "2010": 0
  },
  {
      "2013": 2
  },
  {
      "2012": 4
  },
  {
      "2013": 69
  },
  {
      "2010": 26
  },
  {
      "2010": 4
  },
  {
      "1990": 19
  },
  {
      "2014": 14
  },
  {
      "1979": 18
  },
  {
      "1982": 26
  },
  {
      "1977": 16
  },
  {
      "2008": 18
  },
  {
      "1984": 10
  },
  {
      "1987": 29
  },
  {
      "1979": 24
  },
  {
      "1983": 17
  },
  {
      "1988": 8
  },
  {
      "1987": 35
  },
  {
      "1991": 19
  },
  {
      "1995": 33
  },
  {
      "2004": 8
  },
  {
      "2012": 17
  },
  {
      "2012": 21
  },
  {
      "1997": 30
  },
  {
      "1985": 7
  },
  {
      "1987": 0
  },
  {
      "1988": 23
  },
  {
      "1986": 19
  },
  {
      "1978": 14
  },
  {
      "1987": 23
  },
  {
      "1991": 10
  },
  {
      "1995": 7
  },
  {
      "1987": 18
  },
  {
      "1979": 30
  },
  {
      "1995": 23
  },
  {
      "1983": 21
  },
  {
      "1996": 15
  },
  {
      "1995": 20
  },
  {
      "1996": 27
  },
  {
      "1977": 5
  },
  {
      "1978": 26
  }
]
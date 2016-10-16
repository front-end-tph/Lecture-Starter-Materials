console.log('wired up!')

var forEach = function(arr, cb){
   for(var i = 0 ; i < arr.length; i+=1){
      cb(arr[i], i, arr)
   }
}


var loveCountEl = document.querySelector('.love-count')
var congressPersonsEl = document.querySelector('.congress-persons')

var showHomeScreen = function(stateInput){

   if(typeof stateInput === 'undefined'){
      var stateVal = 'TX'
   } else {
      var stateVal = stateInput
   }

   $.getJSON("http://capitolwords.org/api/1/phrases/state.json?phrase=love&apikey=7ba96d266cc84b168fab4d878d9aa141&callback=?&state=" + stateVal)
      .then(function(d){
         var loveCount = d.results[0].count,
             state = d.results[0].state

         forEach(d.results, function(r){
            console.log()
            loveCount += r.count
         })

         var leftColHTMLStr = '<h2 class="bg-danger">Love Count</h2>'
             leftColHTMLStr += '<h3 class="bg-warning">'+ state +'</h3>'
             leftColHTMLStr += '<h4>' + loveCount + '</h4>'

         loveCountEl.innerHTML = leftColHTMLStr

      })

   $.getJSON("https://congress.api.sunlightfoundation.com/legislators?apikey=7ba96d266cc84b168fab4d878d9aa141&state="+stateVal)
         .then(function(serverRes){
            var rightColHTMLStr = '<h2 class="bg-success">Legislators</h2>'

            forEach(serverRes.results, function(result){
               console.log(result)
               rightColHTMLStr +='<div class="media">'
               rightColHTMLStr +=   '<div class="media-left">'
               rightColHTMLStr +=      '<img class="media-object" src="http://graph.facebook.com/' + result.facebook_id + '/picture?type=normal" alt="...">'
               rightColHTMLStr +=   '</div>'
               rightColHTMLStr +=   '<div class="media-body">'
               rightColHTMLStr +=      '<h4 class="media-heading">' + result.first_name + " " + result.last_name + '</h3>'
               rightColHTMLStr +=      '<h5 class="bg-warning">' + result.state_name    + '</h5>'
               rightColHTMLStr +=   '</div>'
               rightColHTMLStr +='</div>'

            })

               congressPersonsEl.innerHTML = rightColHTMLStr
            })



}

showHomeScreen('SC')

console.log('wired up!')

var forEach = function(arr, cb){
   for(var i = 0 ; i < arr.length; i+=1){
      cb(arr[i], i, arr)
   }
}



var showHomeScreen = function(stateInput){

   if(typeof stateInput === 'null'){
      var theState = 'TX'
   } else {
      var theState = stateInput
   }

   fetchAndRenderStateLegs(theState)
   fetchAndRenderStateLoves(theState)
}

function fetchAndRenderStateLoves(stateVal){
   $.getJSON("http://capitolwords.org/api/1/dates.json?callback=?&phrase=love&percentages=true&granularity=year&apikey=7ba96d266cc84b168fab4d878d9aa141&state="+stateVal)
      .then(function(d){
         console.log(d)

         var leftColHTMLStr = '<h2 class="bg-danger">Annual <span class="text-danger">Love</span> Count in <u>' + stateVal + '</u></h2>'


         forEach(d.results, function(yrPeriod){
             leftColHTMLStr  += "<h4>" + yrPeriod.year + "---- <span class='text-danger'>" + yrPeriod.count +"</span></h4>"
             leftColHTMLStr  += "<p class='text-danger'>"
             for(var i = 0; i < yrPeriod.count; i++){
                leftColHTMLStr += "<i class='fa fa-2x fa-heart'></i> "
             }
             leftColHTMLStr  += "<br/><br/></p>"
         })



         loveCountEl.innerHTML = leftColHTMLStr

      })
}

function fetchAndRenderStateLegs(stateVal){
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

var loveCountEl = document.querySelector('.love-count')
var congressPersonsEl = document.querySelector('.congress-persons')


window.addEventListener('hashchange', function(){
   console.log('helllooooooo!!!')
})

showHomeScreen('SC')
window.addEventListener('hashchange', function(){
   var hashValue = window.location.hash.slice(1)
   showHomeScreen( hashValue.toUpperCase() )

})

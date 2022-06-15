
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
    
      file = elmnt.getAttribute("include-html");
      if (file) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Component not found.";}
    
            elmnt.removeAttribute("include-html");
            includeHTML();
          }
        }
        
        xhttp.open("GET", file, true);
        xhttp.send();
        return;
      }
      
    }
    var mainmenu = document.getElementById('mainmenu')
    var navigation = mainmenu.getElementsByTagName("li");
    Array.from(navigation).forEach(element => {
        if(element.firstChild.search===window.location.search){
            element.firstChild.classList.add('selected');
        }else{
            element.firstChild.classList.remove('selected');
        }
    })
    
    var spyNavigation = document.getElementById('component-content')
    var topics = spyNavigation.getElementsByTagName("h2");
    
    Array.from(topics).forEach((element, index) => {
      var a = document.createElement('a');
      var linkText = document.createTextNode(element.innerHTML);
      a.appendChild(linkText);
      a.title = element.innerHTML;
      var hash = element.innerHTML.replace(" ","-").toLowerCase()
      a.href = "#"+hash;
      
      if((index===0 && !window.location.hash) || window.location.hash.replace("#","")===hash){
       a.className = 'selected' 
      }
      a.addEventListener( 'click', function(){
        selectLink(event)
      } );
      
      document.getElementById('content__scroll-spy').appendChild(a);
    })

}

function selectLink(event) {
  var spyNavigation = document.getElementById('content__scroll-spy')
  var links = spyNavigation.getElementsByTagName("a");
  Array.from(links).forEach((element, index) => {
    element.classList.remove('selected');
  })
  event.target.classList.add('selected');
}



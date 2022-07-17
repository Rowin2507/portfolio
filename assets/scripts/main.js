// GLOBAL ----------------------------------------------------------------------------------------
// GLOBAL ----------------------------------------------------------------------------------------
// GLOBAL ----------------------------------------------------------------------------------------
var body = document.querySelector("body");
var header = document.querySelector("header");
var main = document.querySelector("main");
var footer = document.querySelector("footer");

var windowHeight = document.documentElement.clientHeight;
var windowWidth = document.documentElement.clientWidth;



// INITIAL LOADING (OVERLAY) --------------------------------
// INITIAL LOADING (OVERLAY) --------------------------------
window.addEventListener('load', (e) => {
    body.classList.add("loaded");

    setTimeout(() => {
        body.classList.add("loaded-fully");
    }, "500");
});



// FOOTER RANDOM PROJECT LINK --------------------------------
// FOOTER RANDOM PROJECT LINK --------------------------------
var proctLinkFooter = document.querySelector("footer > ul > li:last-of-type > a");
var projects = ["qatar-2022", "ruby"];
var randomProject = projects[Math.floor(Math.random() * projects.length)];
proctLinkFooter.href = "/project/" + randomProject + ".html";



// FOOTER SCROLL TO TOP --------------------------------
// FOOTER SCROLL TO TOP --------------------------------
// https://stackoverflow.com/questions/51229742/javascript-window-scroll-behavior-smooth-not-working-in-safari
function SmoothVerticalScrolling(e, time, where) {
  var  eTopTemp = e.getBoundingClientRect().top;
  var eTop = eTopTemp - 125;
  console.log(eTop);
  var eAmt = eTop / 100;
  var curTime = 0;
  while (curTime <= time) {
      window.setTimeout(SVS_B, curTime, eAmt, where);
      curTime += time / 100;
  }
}

function SVS_B(eAmt, where) {
  if(where == "center" || where == "")
      window.scrollBy(0, eAmt / 2);
  if (where == "top")
      window.scrollBy(0, eAmt);
}

var scrollFooterButton = document.querySelector("footer > ul > li > button");
scrollFooterButton.onclick = function(){
  SmoothVerticalScrolling(main, 450, "top");
};





// CONTENT PAGE ----------------------------------------------------------------------------------------
// CONTENT PAGE ----------------------------------------------------------------------------------------
// CONTENT PAGE ----------------------------------------------------------------------------------------
if (body.classList.contains("content-page")) {

  // HEADER BACK BUTTON --------------------------------
  // HEADER BACK BUTTON --------------------------------
  var headerCloseButton = document.querySelector("body.content-page header > button");
  headerCloseButton.addEventListener("click", (e) => {
    back();
  });
  
  // IF HISTORY IS NOT EMPTY, GO BACK - ELSE GO HOME
  // https://stackoverflow.com/questions/3588315/how-to-check-if-the-user-can-go-back-in-browser-history-or-not
  function back(url) {
    if (history.length > 2) {
        history.back();
    } else {
        window.location.href = "index.html";
    }
  }

  headerCloseButton.addEventListener("mouseenter", (e) => {
    main.classList.add("less-visible");
    footer.classList.add("less-visible");
  });

  headerCloseButton.addEventListener("mouseleave", (e) => {
    main.classList.remove("less-visible");
    footer.classList.remove("less-visible");
  });

} // CONTENT PAGE





// LANDING PAGE ----------------------------------------------------------------------------------------
// LANDING PAGE ----------------------------------------------------------------------------------------
// LANDING PAGE ----------------------------------------------------------------------------------------
if (body.classList.contains("landing-page")) {

  // NAV MARKER --------------------------------
  // NAV MARKER --------------------------------
  var navMarker = document.querySelector("header > nav div");
  var navItems = document.querySelectorAll("header > nav ul li");
  var navItemsButton1 = document.querySelector("header > nav ul li:nth-of-type(1) button");
  var navItemsButton2 = document.querySelector("header > nav ul li:nth-of-type(2) button");
  var navItemsButton3 = document.querySelector("header > nav ul li:nth-of-type(3) button");
  var navItemsButton4 = document.querySelector("header > nav ul li:nth-of-type(4) button");
  var dashboardGrid = document.querySelector("main section.dashboard > ul");

  function indicator(e) {
      navMarker.style.left = e.offsetLeft + "px";
      navMarker.style.width = e.offsetWidth + "px";
  }

  for (var i = 0; i < navItems.length; i++) {
      navItems[i].addEventListener("click", (e)=> {
          indicator(e.target);
          
          // REMOVE CLASS FROM ACTIVE ELEMENT AND ADD TO CURRENT ELEMENT
          document.querySelector(".active") ? document.querySelector(".active").classList.remove("active") : "";
          e.target.classList.add("active");

          // SHOW CORRECT CATEGORY ON CLICK
          if (navItemsButton1.classList.contains("active")) {
            dashboardGrid.classList.remove("grid-items-about", "grid-items-project", "grid-items-extra");
          } else if (navItemsButton2.classList.contains("active")) {
            dashboardGrid.classList.add("grid-items-about");
            dashboardGrid.classList.remove("grid-items-project", "grid-items-extra");
          } else if (navItemsButton3.classList.contains("active")) {
            dashboardGrid.classList.add("grid-items-project");
            dashboardGrid.classList.remove("grid-items-about", "grid-items-extra");
          } else if (navItemsButton4.classList.contains("active")) {
            dashboardGrid.classList.add("grid-items-extra");
            dashboardGrid.classList.remove("grid-items-about", "grid-items-project");
          }

      });
  }

  window.addEventListener('load', (e) => {
      navMarker.style.left = navItems[0].offsetLeft + "px";
      navMarker.style.width = navItems[0].offsetWidth + "px";
  });



  // LANDING RENDER CANVAS --------------------------------
  // LANDING RENDER CANVAS --------------------------------
  const html = document.documentElement;
  const canvasSection = document.querySelector("section.landing-render");
  const canvas = document.querySelector("section.landing-render canvas");
  const canvasText = document.querySelector("section.landing-render strong");
  const context = canvas.getContext("2d", { alpha: false });
  // context.render(context.offscreenContext);

  const frameCount = 126;
  const currentFrame = index => (
      `assets/images/animation/${index.toString().padStart(4, '0')}.jpg`
  )

  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };

  const img = new Image()
  img.src = currentFrame(1);
  canvas.width = 2560;
  canvas.height = 1080;

  img.onload=function(){
    context.drawImage(img, 0, 0);
  }

  const updateImage = index => {
    img.src = currentFrame(index);
    context.render(img, 0, 0);
    // context.drawImage(img, 0, 0);
  }

  window.addEventListener('scroll', () => {  
    const scrollTop = html.scrollTop;
    const maxScrollTop = 3500 - window.innerHeight;
    // const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
      frameCount - 1,
      Math.ceil(scrollFraction * frameCount)
    );
    
    requestAnimationFrame(() => updateImage(frameIndex + 1));
    
    // SCROLL HINTS
    if (frameIndex < 25) {
      canvasText.textContent = "Scrollen maar..";
    } 
    if (frameIndex > 25) {
      canvasText.textContent = "Ja, dit gaat goed";
    } 
    if (frameIndex > 75) {
      canvasText.textContent = "Nog een beetje meer";
    } 
    if (frameIndex > 115) {
      canvasText.textContent = "De laptop is bereikt!";
      // canvasText.textContent = "De interface is bereikt!";
      // canvasText.textContent = "Bijna daar..";
    } 

    // HIDE CANVAS IF SCROLLED TO LAST FRAME
    if (frameIndex == (frameCount - 1)) {
      canvasSection.classList.add("hidden");
    } else {
      canvasSection.classList.remove("hidden");
    }

    console.log(frameIndex);
  });

  preloadImages();



  // GOOGLE MAPS API --------------------------------
  // GOOGLE MAPS API --------------------------------
  google.maps.event.addDomListener(window, 'load', init);
        
  function init() {
      // Basic options for a simple Google Map
      // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
      var mapOptions = {
          // How zoomed in you want the map to start at (always required)
          zoom: 15,

          // The latitude and longitude to center the map (always required)
          center: new google.maps.LatLng(52.460631, 4.805527), // Koog aan de Zaan

          // How you would like to style the map. 
          // This is where you would paste any style found on Snazzy Maps.
          styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"weight":2},{"gamma":0.84}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"weight":0.6},{"color":"#1a3541"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2c5a71"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#1e1c21"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"color":"#ff0000"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#27242c"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#2c5a71"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#414241"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#29768a"},{"lightness":-37}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#1e1c21"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#406d80"}]},{"featureType":"transit","elementType":"geometry.fill","stylers":[{"color":"#382e46"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#193341"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#060606"}]}]
      };

      // Get the HTML DOM element that will contain your map 
      // We are using a div with id="map" seen below in the <body>
      var mapElement = document.querySelector("main section.dashboard > ul > li:nth-of-type(2) div");

      // Create the Google Map using our element and options defined above
      var map = new google.maps.Map(mapElement, mapOptions);

      // Let's also add a marker while we're at it
      // var marker = new google.maps.Marker({
      //     position: new google.maps.LatLng(40.6700, -73.9400),
      //     map: map,
      //     title: 'Snazzy!'
      // });
  }



  // GET DATE FROM CLIENT --------------------------------
  // GET DATE FROM CLIENT --------------------------------
  var dayElement = document.querySelector("main section.dashboard > ul > li:nth-of-type(8) > time");
  var dateElement = document.querySelector("main section.dashboard > ul > li:nth-of-type(8) > h3");

  var clientDate = new Date();
  var currentDay = new Array();
  currentDay[0] = "Zondag";
  currentDay[1] = "Maandag";
  currentDay[2] = "Dinsdag";
  currentDay[3] = "Woensdag";
  currentDay[4] = "Donderdag";
  currentDay[5] = "Vrijdag";
  currentDay[6] = "Zaterdag";

  dayElement.textContent = currentDay[clientDate.getDay()];
  dateElement.textContent = clientDate.getDate();



  // SPOTIFY API TEST 
  // var baseURL = 'https://api.spotify.com/v1/me/player/recently-played'; 
  // function showData() {

  //   // GET SCHEDULE INFO -----------------------------------
  //   var scheduleURL = baseURL + 'f1/' + season + '.json';
  //   var requestSchedule = new XMLHttpRequest();
  //   requestSchedule.open('GET', scheduleURL);
  //   requestSchedule.responseType = 'json';
  //   requestSchedule.send();

  //   console.log(scheduleURL + "HOI");

  //   // REQUEST DATA ON LOAD
  //   requestSchedule.onload = function() {
  //       const resultSchedule = requestSchedule.response; 

  //       console.log(requestSchedule);
  //   }
  // }

  // "https://api.spotify.com/v1/me/player/recently-played?limit=1" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQDH1zsxVZBReN_e4ZNdffZhgxxnUNii4VBe6fUEOOwSg9j-bHQHbOhFGxg5GUgaSx7ZmocLRmNFmoBrfcN6xmjl6-JM-MABLTs-dKlCuAjbJIgOkgkOqHEqTU54a6fEeYd7sPBM3sA2IbKu99Ue_NjpKB3AN6N_idWl_S5h_21xQV73FkA"
  // 'https://accounts.spotify.com/authorize?client_id=6d7685c80b9d4122b8fe532a78cca22f&response_type=code&redirect_uri=httplocalhost:3000%2Fcallback&scope=user-read-recently-played'
  // https://api.spotify.com/v1/me/player/recently-played?before=1610564232420&limit=1&r_auth=BQDH1zsxVZBReN_e4ZNdffZhgxxnUNii4VBe6fUEOOwSg9j-bHQHbOhFGxg5GUgaSx7ZmocLRmNFmoBrfcN6xmjl6-JM-MABLTs-dKlCuAjbJIgOkgkOqHEqTU54a6fEeYd7sPBM3sA2IbKu99Ue_NjpKB3AN6N_idWl_S5h_21xQV73FkA

  // // uri_redirect = 'http://localhost:8888/callback'
  // uri_redirect = 'http://127.0.0.1:5500/'
  // authorize_endpoint = 'https://accounts.spotify.com/authorize'
  // request_authorization_parameters = {'client_id': '6d7685c80b9d4122b8fe532a78cca22f',
  //                                                                    'response_type': 'code',
  //                                                                    'redirect_uri': uri_redirect,
  //                                                                     'scope': 'user-library-read playlist-read-private'}
  // r_auth = requests.get(authorize_endpoint, params=request_authorization_parameters)

  //  console.log(r_auth);



  // SPOTIFY API --------------------------------
  // SPOTIFY API --------------------------------
  var spotifyGridItem = document.querySelector("main section.dashboard > ul li:nth-of-type(4)");
  var spotifyGridItemBackground = document.querySelector("main section.dashboard > ul li:nth-of-type(4) div");
  var spotifyGridItemSongDetails = document.querySelector("main section.dashboard > ul li:nth-of-type(4) a");

  const spotifyURL = "https://api.spotify.com/v1/me/player/recently-played?limit=1";
  const options = {
    headers: {
      Authorization: "Bearer BQC_mcERN5IUSder8zSaA5dcBTV985Gp-MRe5sZCwfIEKbSLH3S-idvY6XAo2Us0zfzbLsEWOsa2YNL-XqbeilPfT_0s5G3FgdP39XL0rcSpzw_QMXdp8hTs1XKYqoXv_QTqG07aENOFxSanoVI2TOZxncSorZ8MdsWTqtfQU8RXwwA4WgU"
    }
  };

  fetch(spotifyURL, options)
  .then( res => res.json() )
  // .then( data => console.log(data) );
  .then((data) => {
    console.log(data.items[0])

    // HIDE PLACEHOLDER SONG DETAILS
    spotifyGridItem.classList.add("spotify-web-api-active");

    // ADD URL TO COVER ART
    spotifyGridItemSongDetails.href = data.items[0].track.external_urls.spotify;

    // GET LAST PLAYED COVER ART / CREATE ELEMENT
    var lastPlayedCover = data.items[0].track.album.images[0].url;
    var lastPlayedCoverElement = document.createElement('img');
    lastPlayedCoverElement.src = lastPlayedCover;
    spotifyGridItemBackground.style.backgroundImage = "url(' " + lastPlayedCover + "')";
    spotifyGridItemSongDetails.appendChild(lastPlayedCoverElement);

    // GET LAST PLAYED ALBUM / CREATE ELEMENT
    var lastPlayedAlbum = data.items[0].track.album.name;
    var lastPlayedAlbumElement = document.createElement('h4');
    lastPlayedAlbumElement.textContent = lastPlayedAlbum;
    spotifyGridItemSongDetails.appendChild(lastPlayedAlbumElement);

    // GET LAST PLAYED SONG / CREATE ELEMENT
    var lastPlayedSong = data.items[0].track.name;
    var lastPlayedSongElement = document.createElement('h3');
    lastPlayedSongElement.textContent = lastPlayedSong;
    spotifyGridItemSongDetails.appendChild(lastPlayedSongElement);
    
    console.log("Nummer: " + lastPlayedSong);
    console.log("Album: " + lastPlayedAlbum);
    console.log(data.items[0].track.album.artists.length);

    // GET LAST PLAYED ARTIST(S) / CREATE ELEMENT(S)
    for (var i = 0; i < data.items[0].track.album.artists.length; i++) {
      var lastPlayedArtist = data.items[0].track.album.artists[i].name;
      var lastPlayedArtistsElement = document.createElement('strong');
      lastPlayedArtistsElement.textContent = lastPlayedArtist;
      spotifyGridItemSongDetails.appendChild(lastPlayedArtistsElement);
      console.log("Artiest (" + (i + 1) + "): " + lastPlayedArtist);
    }

    // ADD ALT TEXT TO COVER ART
    lastPlayedCoverElement.alt = lastPlayedSong + " - " + lastPlayedArtist;
  });

} // LANDING PAGE

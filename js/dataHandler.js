var dataHandler = (function() {
  
  
  
  // will call the rest functions
  function updateCharsData(charsData) {
  
    if ( !playersNames[0] ) {
      getPlayersNames(charsData);
    }

    if ( !playersColors[0] ) {
      getPlayersColors(charsData);
    }

    changePlayerImages(charsData);

    getPlayerPhrases(charsData);
    
  }
  
  
  
  /************************************
  ********USING BY updateCharsData*****
  *************************************/
  function getPlayersNames(charsData) {
    playersNames = Object.keys(charsData);
  }
  
  function getPlayersColors(charsData) {
    var name;
    for ( var i = 0; i < playersNames.length; i++ ) {
      name = playersNames[i];
      playersColors.push(charsData[name].color);
    }
  }
  
  function changePlayerImages(charsData) {
    var imgBox = document.querySelector('.player-image');

    imgBox.textContent = '';

    charsData[playersNames[currentLevel - 1]].images.map(function(item, i) {

      var img = document.createElement('img');
      img.setAttribute('src', item.src);
      img.setAttribute('id', item.id);
      img.setAttribute('alt', item.alt);
      imgBox.appendChild(img);

    });

    return;
  }
  
  function getPlayerPhrases(charsData) {
    playerPhrases = {};

    charsData[playersNames[currentLevel - 1]].phrases.map(function(item, i) {
      playerPhrases[item.state] = item.phrase;
    });

    return;
  }
  /************************************
  ********USING BY updateCharsData*****
  *************************************/
  
  
  return {
    
    updateCharsData : updateCharsData
    
  }
  
  
}());
function makeApiCall() {
  var params = {
    // The ID of the spreadsheet to retrieve data from.
    spreadsheetId: '1tXi7pCJrgOadsq5DqmQa6abYy4f-IXTii-CfXGr2NU4',  // TODO: Update placeholder value.
    // The A1 notation of the values to retrieve.
    range: 'B4:O39',  // TODO: Update placeholder value.
    // How values should be represented in the output.
    // The default render option is ValueRenderOption.FORMATTED_VALUE.
    // valueRenderOption: '',  // TODO: Update placeholder value.
    // How dates, times, and durations should be represented in the output.
    // This is ignored if value_render_option is
    // FORMATTED_VALUE.
    // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
    // dateTimeRenderOption: '',  // TODO: Update placeholder value.
  };

  var request = gapi.client.sheets.spreadsheets.values.get(params);
  request.then(function(response) {
    // TODO: Change code below to process the `response` object:
    console.log(response.result);
    var picks = [].concat.apply([], response.result.values).map(pick => { return pick.toLowerCase();}).filter(pick => pick.length);

    var images = [].concat.apply([], document.querySelectorAll('img')),
      imageNames = images.map(img => {return img.alt.split('%20').join(' ').toLowerCase()}),
      picksCount = 0;

    for (var i = 0; i < picks.length; i++){
      var index = imageNames.indexOf(picks[i]);
      if(index !== -1){
        images[index].style.opacity = 0.4;
        picksCount += 1;
      } else {
        console.log('Missing pick: ' + picks[i])
      }
    }

    document.getElementById('picksShownCount').innerHTML = picksCount + (picksCount === 1 ? ' Pick Shown' : ' Picks Shown')
    document.getElementById('picksMadeCount').innerHTML = picks.length + (picks.length === 1 ? ' Pick Made' : ' Picks Made');
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });
}

function initClient() {
  var API_KEY = 'AIzaSyDEEVU1MUCII1XXTDYHbk0XLJUE0y7kJlM';  // TODO: Update placeholder with desired API key.
  var CLIENT_ID = '897548361607-ocb5fmh1j7akse6l064n9uuectjp12nt.apps.googleusercontent.com';  // TODO: Update placeholder with desired client ID.
  // TODO: Authorize using one of the following scopes:
  //   'https://www.googleapis.com/auth/drive'
  //   'https://www.googleapis.com/auth/drive.file'
  //   'https://www.googleapis.com/auth/drive.readonly'
  //   'https://www.googleapis.com/auth/spreadsheets'
  //   'https://www.googleapis.com/auth/spreadsheets.readonly'
  var SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';
  gapi.client.init({
    'apiKey': API_KEY,
    'clientId': CLIENT_ID,
    'scope': SCOPE,
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function() {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
    updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  }, function(reason){
    console.log(reason);
  });
}

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
    makeApiCall();
  }
}

function handleSignInClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}
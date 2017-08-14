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
    var picks = [].concat.apply([], response.result.values).map(pick => { return pick.toLowerCase();});
    var images = document.querySelectorAll('img');
    for (var i = 2; i < images.length; i++){
      if(picks.indexOf(images[i].alt.toLowerCase()) !== -1){
        images[i].style.opacity = 0.3;
      }
    }
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });
}

function initClient() {
  var API_KEY = 'AIzaSyDEEVU1MUCII1XXTDYHbk0XLJUE0y7kJlM';  // TODO: Update placeholder with desired API key.
  var CLIENT_ID = '897548361607-7jnhch2hfc9arpap26ftt3a7sn9f1er5.apps.googleusercontent.com';  // TODO: Update placeholder with desired client ID.
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
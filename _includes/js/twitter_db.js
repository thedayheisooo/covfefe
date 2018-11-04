{% include js/jquery.timeago.js %}


var SPREADSHEET_ID = '1KKNHQi4izaf41blzUU2GYmCBwZxi0UZSIys08QaaR-c'; // id of the spreadsheet (can be found in the URL)
var SHEET_NAME = 'twitter_db'; // name of the working sheet
var API = 'AIzaSyDvqmQH2AD_UIyPeppwZp16MJezQtuhDC0'; // the google issued API
var HEADER_OFFSET = 1; // how many inital rows should be skipped (titles, inital desc etc.)
var ITEMS_TO_LOAD = 2; // how many items should be loaded?
var LOAD_BTN = document.getElementById('ooo_load_btn');

var row_range;
var call = 0;
var call_max;

function get_max(){
  fetch('https://sheets.googleapis.com/v4/spreadsheets/' + SPREADSHEET_ID + '/?key=' + API)
    .then( function( response ) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        throw new TypeError("Unable to access API.");
        return;
      }
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.includes("application/json")) {
        return response.json();
      }
      throw new TypeError("Response did not provide any valid json.");
    }).then ( function( data ) {
      for ( var p = 0; p < data.sheets.length; p++ ) {
        if ( data.sheets[p].properties.title == SHEET_NAME ){

          // get the number of rows available on the spreadsheet
          row_range = data.sheets[p].properties.gridProperties.rowCount

          // if the numbers of rows to be called is bigger than the maximun numbers of rows that exist
          // the variable of rows to be called will be set to the numbers of existing rows
          if (ITEMS_TO_LOAD > row_range) {
            ITEMS_TO_LOAD = row_range;
          }

          // calculate number of maxium calls
          call_max = Math.ceil(row_range/ITEMS_TO_LOAD);

          // initial call of building function
          twitter_db();
        }
      }
    }).catch(function(error) {
      btn_status( 'error' );
      console.error(error);
    });
}
get_max();


function twitter_db() {

  var from_range = HEADER_OFFSET + 1 + (call * ITEMS_TO_LOAD);
  var to_range = HEADER_OFFSET + ((call + 1) * ITEMS_TO_LOAD);
  //var sheet_range = 'A2:H';
  var sheet_range = 'A' + from_range + ':K' + to_range;

  fetch('https://sheets.googleapis.com/v4/spreadsheets/' + SPREADSHEET_ID + '/values/' + SHEET_NAME + '!' + sheet_range + '/?key=' + API)
    .then( function( response ) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
        if (response.status == 400) {
          throw new TypeError('No more items to load');
        }
        return;
      }
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.includes("application/json")) {
        return response.json();
      }
      throw new TypeError("Response did not provide any valid json.");
    }).then ( function( data ) {
      var reading_item = [];
      var n = 0;
      for (var i = 0; i < data.values.length; i++) {
        if ( data.values[i].length > 0 && data.values[i][1] != undefined && data.values[i][6] != undefined ) {
          reading_item[n] = {};
          reading_item[n]['include'] = data.values[i][0];
          reading_item[n]['tweet'] = data.values[i][2];
          reading_item[n]['mediaurl'] = data.values[i][3];
          reading_item[n]['mediatype'] = data.values[i][4];
          reading_item[n]['timestamp'] = data.values[i][5];
          reading_item[n]['id'] = data.values[i][6];
          reading_item[n]['url'] = data.values[i][7];
          reading_item[n]['username'] = data.values[i][8];
          reading_item[n]['name'] = data.values[i][9];
          reading_item[n]['userimage'] = data.values[i][10];
          n++;
        }
      }
      reading_placement( reading_item );
    }).catch(function(error) {
      btn_status( 'error' );
      console.error(error);
    });
}

function validate_url(input) {
  var expression = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/gi;
  var regex = new RegExp(expression);
  if ( input && input.match(regex) ) {
    return input;
  } else {
    return ''
  }
}

function increase_image(input) {
  var expression = /_normal\.jpg/g;
  var regex = new RegExp(expression, "g");
  var output = input.replace(regex, "_400x400.jpg");
  return output;
}

function parse_tweet( tweet ) {
  // add solution to transform hashtag, mentions an links from plain text to actually usable values
}

function reading_placement( read ){
  var x = read.length;
  var n = 0;
  var element = document.getElementById('twitter_db');
  var html = '';
  while (n < x) {
    var readObject = read[n];
    var include = readObject.include;
    var tweet = readObject.tweet;
    var mediaurl= validate_url(readObject.mediaurl);
    var mediatype = readObject.mediatype;
    var timestamp = readObject.timestamp;
    var url = validate_url(readObject.url);
    var username = readObject.username;
    var name = readObject.name;
    var userimage_url = validate_url(readObject.userimage);
    var userimage = increase_image( userimage_url );
    console.log(userimage);
    if ( include == 'TRUE' ) {
      html += '<blockquote class="ooo_card ooo_twitter_' + call + '_' + n + ' ooo_tweet">'
        +'<p>' + tweet + '</p>'
        + '<cite>'
          + '<img src="' + (userimage ? userimage : '/assets/images/dev/placeholder.jpg') + '" alt="' + username + '">'
          + '<a href="' + url + '">'
            + name
            + '<small>'
              + '<i class="fab fa-twitter"></i>'
              + '@' + username
            + '</small>'
          + '</a>'
        + '</cite>'
      + '</blockquote>'
    }
    n++;
  }
  element.innerHTML += html;
  //$("time.timeago").timeago();
  btn_status();
};

function btn_status( input_status ){
  if (input_status == 'error') {
    LOAD_BTN.className = '';
    return;
  }
  call++;
  if ( call < call_max ) {
    LOAD_BTN.className = 'active';
  } else {
    LOAD_BTN.className = '';
  }
}

function load_twitter_db() {
  if ( LOAD_BTN.classList.contains('active') ) {
    twitter_db();
  }
}

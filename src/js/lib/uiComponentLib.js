const monthNames = [
    "Jan", 
    "Feb",
    "Mar", 
    "Apr", 
    "May", 
    "Jun",
    "Jul", 
    "Aug", 
    "Sep", 
    "Oct", 
    "Nov", 
    "Dec"
];

export function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}


export function calculateAvailableHeight(top = 0 ,bottom = 0,tag="system"){
   
    var cc_app  = document.getElementById("cometchat");
    
    var availableHeight = cc_app.offsetHeight;
    var totalAvailableHeightDiv = (availableHeight - (top + bottom));

    console.log(tag + " height calculated value : " + totalAvailableHeightDiv);

    return (totalAvailableHeightDiv);
  
}


/**function isEmpty  
 * 
 * Input : Any object
 * output : boolean
 */
export function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

/**function CheckEmpty  
 * 
 * Input : Any object
 * output : boolean
 */

export function CheckEmpty(obj){
    
    if(obj === undefined){
        return false;
    }else if(obj.length === 0) {
        return false;
    }else{
        return true;
    }
} 


export function convertStringToDate(strTime){
    var timestamp = Number(strTime)*1000;
    var date = new Date(timestamp);
    let timestr = formatAMPM(date);
    return (timestr.toString());
    
  
}

function formatAMPM(date) {

    var hours = date.getHours();
    var minutes = date.getMinutes();

    var ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;

    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

export function ascii_to_hexa(str){
  var arr1 = [];
  for (var n = 0, l = str.length; n < l; n ++) 
   {  
        var hex = "";
        let number = Number(str.charCodeAt(n));
        
        if(number%2 == 0){
         hex = (Number(str.charCodeAt(n))+50).toString(16);
        }else{
         hex = ((Number(str.charCodeAt(n))+250)%256).toString(16);
        }  
         
      arr1.push(hex);
   }
   console.log("hex code : " + arr1.join(''));
  return arr1.join('');
 }
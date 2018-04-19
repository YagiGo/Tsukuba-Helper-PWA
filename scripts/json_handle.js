function showMeJson() {
    for (var i = 0; i < data.length; i++)
    {
        console.log("Verify Id: ", data[i].id);
        console.log("Will Start Profiling");
        for(var j = 0; j < data[i].objs.length; j++)
        {
            console.log("Objects as follow:"),
            console.log(data[i].objs[j]);
        }
        console.log(data[i].objs);
        // console.log(data[i].obj);
        //console.log(parsedJSON[0]);   // Just to see if it works

    }
}
function readJSONFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open('GET', file, false);
    rawFile.onreadystatechange = function() {
        if(rawFile.readyState == 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                //convert to JSON object
                var JSONText = JSON.parse(allText);
            }
        }
    }
}
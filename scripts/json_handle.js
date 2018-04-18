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

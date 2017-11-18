function constantGenerator(name,value){
    Object.defineProperty(exports,name,{
       value : value,
       enumerable : true
    });
};

//********  define constants here ******************

constantGenerator("INVALID_USER","invalid User");
constantGenerator("AUTHORIZED","authorized");
constantGenerator("UNAUTHORIZED","unauthorized");
constantGenerator("INVALID_PASSWORD","invalid password");
constantGenerator("INVALID_USERNAME","invalid username");

constantGenerator("YEAR",365*24*60*60*1000);
constantGenerator("DAY",24*60*60*1000);
constantGenerator("WEEK",7*24*60*60*1000);
constantGenerator("HOUR",60*60*1000);
constantGenerator("MINS",60*1000);
constantGenerator("SECS",1000);


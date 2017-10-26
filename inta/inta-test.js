var cache = require('node-cache')
var m = new cache()

obj = { my: "Special", variable: 42 };
success = m.set( "myKey", obj, 2 );

setTimeout(function(){
value = m.get( "myKey" );
console.log(value)
if ( value == undefined ){
  // handle miss! 
  console.log('a')
}
},1000)
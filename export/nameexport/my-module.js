// module "my-module.js"
function cube(x) {
    return x * x * x;
  }
  
function hello(){
	console.log("Hello,module!");
}

  
  const foo = Math.PI + Math.SQRT2;
  
  var graph = {
      options: {
          color:'white',
          thickness:'2px'
      },
      draw: function() {
          console.log('From graph draw function');
      }
  }
  
  export {cube, foo, graph, hello };
  
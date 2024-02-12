var myExtObject = (function() {

  return {
    func1: function() {
      console.log('Got JS');
    },
    func2: function() {
      console.log("function 2 called");
    }
  }
})(myExtObject||{})

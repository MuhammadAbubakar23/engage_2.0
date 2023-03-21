// function toggleNavPanel(){
  
//     var element = document.getElementById("left-sidebar-expand");
//   element.classList.toggle("toggled");
// }

// function toggleRightNavPanel(){

//   var element = document.getElementById("tickets-rightbar-dashboard");
//   element.classList.toggle("toggled");
// }


// var toggleEmojis = function () {
  
//   $('.reply_open>span').next().next().toggle();
// }
// var isClicked = false;
// $(document).on("click", ".reply_open > div > span", function (event) {
//   if (!isClicked) {
//       isClicked = true;
//       var cursorPos = $(this).parent().prev().prop('selectionStart');
//       $(this).parent().prev();
//       var v = $(this).parent().prev().val();
//       var textBefore = v.substring(0, cursorPos);
//       var textAfter = v.substring(cursorPos, v.length);
//       $(this).parent().prev().val(textBefore + $(this).text() + textAfter);
//       setTimeout(function () {
//           isClicked = false;
//       }, 100);
//   }
// });
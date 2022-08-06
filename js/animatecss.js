/* -------------------------------------------------------
| This first part can be ignored, it is just getting
| all the different entrance and exit classes of the
| animate-config.json file from the github repo.
--------------------------------------------------------- */

// var animCssConfURL = 'https://api.github.com/repos/daneden/animate.css/contents/animate-config.json';
// var selectIn = $('#animation-in-types');
// var selectOut = $('#animation-out-types');
// var getAnimCSSConfig = function ( url ) { return $.ajax( { url: url, type: 'get', dataType: 'json' } ) };
// var decode = function ( data ) {
//   var bin = Uint8Array.from( atob( data['content'] ), function( char ) { return char.charCodeAt( 0 ) } );
//   var bin2Str = String.fromCharCode.apply( null, bin );
//   return JSON.parse( bin2Str )
// }
// var buildSelect = function ( which, name, animGrp ) {
//   var grp = $('<optgroup></optgroup>');
//   grp.attr('label', name);
//   $.each(animGrp, function ( idx, animType ) {
//     var opt = $('<option></option>')
//     opt.attr('value', idx)
//     opt.text(idx)
//     grp.append(opt);
//   })
//   which.append(grp)	
// }
// getAnimCSSConfig( animCssConfURL )
//   .done (function ( data ) {
//   var animCssConf = decode ( data );
//   $.each(animCssConf, function(name, animGrp) {
//     if ( /_entrances/.test(name) ) {
//       buildSelect(selectIn, name, animGrp);
//     }
//     if ( /_exits/.test(name) ) {
//       buildSelect(selectOut, name, animGrp);
//     }
//   })
// })


/* -------------------------------------------------------
| Here is were the fun begins.
--------------------------------------------------------- */

var modalBtn = $('button');
var modal = $('#projectModal');
var animInClass = "";
var animOutClass = "animate__bounceOut";

// modalBtn.on('click', function() {
//   animInClass = selectIn.find('option:selected').val();
//   animOutClass = selectOut.find('option:selected').val();
//   if ( animInClass == '' || animOutClass == '' ) {
//     alert("Please select an in and out animation type.");
//   } else {
//     modal.addClass(animInClass);
//     modal.modal({backdrop: false});
//   }
// })

modal.on('show.bs.modal', function () {
  var closeModalBtns = modal.find('button[data-custom-dismiss="modal"]');
  closeModalBtns.one('click', function() {
    modal.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function( evt ) {
      modal.modal('hide')
    });
    modal.addClass(animOutClass);
  })
})

modal.on('hidden.bs.modal', function ( evt ) {
  var closeModalBtns = modal.find('button[data-custom-dismiss="modal"]');
  modal.removeClass(animOutClass)
  modal.off('webkitAnimationEnd oanimationend msAnimationEnd animationend')
  closeModalBtns.off('click')
})
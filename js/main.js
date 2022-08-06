$(document).ready(()=>{    
    $(".year").html(new Date().getFullYear())
    AOS.init();
    var url=window.location.href;
    var hash=url.split("#");
    if(hash[1]=="portfolio"){
      window.location.replace("../portfolio");
    }


    if ($('.typed').length) {
        var typed_strings = $(".typed").data('typed-items');
        typed_strings = typed_strings.split(',')
        new Typed('.typed', {
          strings: typed_strings,
          loop: true,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000
        });
    }
    ClassicEditor
    .create( document.querySelector( 'textarea[name=message]' ),                      
    defaultConfig = {
      toolbar: {
        items: [
        'undo',
          'redo',
          '|',
          'bold',
          'italic',                                                    
          '|',                      
          'outdent', 'indent', 
          '|',
          'blockQuote',
          'link',
          '|',
          'bulletedList',
          'numberedList',
          //'|',
          //'link',
         // '|',
         // 'insertTable',                           
          '|',
          'heading'                            
        ]
      },
      language: 'en'
    }
    
    
    )
    .catch( error => {
        console.error( error );
    } );

    $("#contact-form").submit(async function(e){
        e.preventDefault();
        $(".loading").fadeIn(async function(){
          var name=$("#contact-form #name").val();
          var email=$("#contact-form #email").val();
          var phone=$("#contact-form #phone").val();
          var subject=$("#contact-form #subject").val();
          var message=$("textarea[name=message]").val();
          

          
          data= await sendEnquiry(email,name,phone,subject,message);
          $(data).ready(function(){
            $(".loading").fadeOut(function(){
              $(".sent-message").fadeIn(function(){
                setInterval(sent,3000);
              });
            });
            if(data.error==true){
                console.log(data.message)
            }
          });
        });
        
    });
});



function sent(){
    $(".sent-message").fadeOut();
  }
  
  function sendEnquiry(email,name,phone,subject,message){      
      var settings = {
          "url": "https://osegbuecharles.com/mail.php",
          "method": "POST",
          "timeout": 0,
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          "data": {
            "email": email,
            "phone": phone,
            "name":name,
            "subject":subject,
            "message":message
          }
        };
            return new Promise(resolve => {
          $.ajax(settings).done(function (response,status) {
              //console.log(status);
              resolve(response);
            });
      });
  }
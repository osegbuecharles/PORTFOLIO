//const  shareurl  = "http://127.0.0.1/idealhr/";
//const  shareurl  = "https://hrideal.com";
const preloader="https://media.giphy.com/media/3oeHLhzRkRX1bQQBPi/giphy.gif"
$(document).ready(async function(){
    AOS.init();
    
    $("#editBlogButton").click(function(){
        $("#createBlog").hide(function(){
            $("#deleteBlog").hide(function(){
                $("#editBlog").show();
            });
        });
   });

   $("#createBlogButton").click(function(){
       $("#editBlog").hide(function(){
           $("#deleteBlog").hide(function(){
            $("#createBlog").show();
           });
       });
   });
    
   $("#deleteBlogButton").click(function(){
        $("#editBlog").hide(function(){
            $("#createBlog").hide(function(){
                $("#deleteBlog").show();
            });
        }); 
    });

    //Checking if admin is logged in
    logged=sessionStorage.getItem("logged");
    

    if (logged!="true"){
        $("#login").fadeIn();
    }
    else{
        $("#main").show();
        
       
       
       
        loadImageList();
    }

    $("#logoutbtn").click(function(){
        sessionStorage.clear();
        window.location.replace("../admin");

    });

    //login form submitted
    $("#loginform").submit(async function(e){
        e.preventDefault();
        email= $("#loginemail").val();
        password=$("#loginpsw").val();
        document.getElementById("showModal").click();
        login(email,password)
    });


    $("#blogForm").submit(async function(e){
        e.preventDefault();

        $("#blogLoading").fadeIn();
        $("#blogError").fadeOut();
        $("#blogSent").fadeOut();
        
    

    author=$("#author").val();
    subject=$("#subject").val();
    image=$("#image").val();
    category=$("#category").val();
    tags=$("#tags").val();
    dateCreated=$("#dateCreated").val();
    meta=CKEDITOR.instances.meta.getData();
    content=CKEDITOR.instances.content.getData();

    if(meta==""){
        meta=" ";
    }
    
    

    datacon= await createBlogApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),author,subject,meta,image,dateCreated,category,tags,content);


    $(datacon).ready(function(){
        if(datacon.error==false){
            $("#blogLoading").fadeOut(function(){                   
                $("#blogSent").fadeIn();
            });
        }
        else{
            $("#blogLoading").fadeOut(function(){
                $("#blogError").html(datacon.message);
                $("#blogError").fadeIn();
            });
        }
    });

});


$("#editBlogId").submit(async function(e){
    e.preventDefault();

    id=$("#loadBlogId").val();
    
    blogData= await searchBlogInfoApi("id",id);

    $(blogData).ready(function(){

        if(blogData.data[0]!=undefined){
            sessionStorage.setItem("updateBlogId",id);
            re=blogData.data[0];
            $("#authorUpdate").val(re.author);
            $("#subjectUpdate").val(re.subject);
            $("#imageUpdate").val(re.image);
            CKEDITOR.instances.metaUpdate.setData(re.meta);
            $("#dateCreatedUpdate").val(re.dateCreated);
            $("#categoryUpdate").val(re.category);
            $("#tagsUpdate").val(re.tags);
            CKEDITOR.instances.contentUpdate.setData(re.content);
            document.getElementById("updateBlogButton").disabled=false;
        }
        else{
            document.getElementById("updateBlogButton").disabled=true;
            sessionStorage.removeItem("updateBlogId");
            alert("Invalid Blog ID");
        }
    });

    $("#blogFormUpdate").submit(async function(e){
        e.preventDefault();

        $("#blogLoadingUpdate").fadeIn();
        $("#blogErrorUpdate").fadeOut();
        $("#blogSentUpdate").fadeOut();
        
    

        blogId=sessionStorage.getItem("updateBlogId")
    authorUpdate=$("#authorUpdate").val();
    subjectUpdate=$("#subjectUpdate").val();
    imageUpdate=$("#imageUpdate").val();
    categoryUpdate=$("#categoryUpdate").val();
    tagsUpdate=$("#tagsUpdate").val();
    dateCreatedUpdate=$("#dateCreatedUpdate").val();
    metaUpdate=CKEDITOR.instances.metaUpdate.getData();
    contentUpdate=CKEDITOR.instances.contentUpdate.getData();

   
    if(metaUpdate==""){
        metaUpdate=" ";
    }
    

    dataconUpdate= await updateBlogApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),blogId,authorUpdate,subjectUpdate,metaUpdate,imageUpdate,dateCreatedUpdate,categoryUpdate,tagsUpdate,contentUpdate);


    $(dataconUpdate).ready(function(){
        if(dataconUpdate.error==false){
            $("#blogLoadingUpdate").fadeOut(function(){                   
                $("#blogSentUpdate").fadeIn();
            });
        }
        else{
            $("#blogLoadingUpdate").fadeOut(function(){
                $("#blogErrorUpdate").html(dataconUpdate.message);
                $("#blogErrorUpdate").fadeIn();
            });
        }
    });

});
});



$("#deleteBlogId").submit(async function(e){
    e.preventDefault();

    id=$("#loadBlogId1").val();
    
    blogData= await searchBlogInfoApi("id",id);

    $(blogData).ready(function(){

        if(blogData.data[0]!=undefined){
            sessionStorage.setItem("deleteBlogId",id);
            re=blogData.data[0];
            $("#authorDelete").val(re.author);
            $("#subjectDelete").val(re.subject);
            $("#imageDelete").val(re.image);
            CKEDITOR.instances.metaDelete.setData(re.meta);
            $("#dateCreatedDelete").val(re.dateCreated);
            $("#categoryDelete").val(re.category);
            $("#tagsDelete").val(re.tags);
            CKEDITOR.instances.contentDelete.setData(re.content);
            document.getElementById("deleteBlogButton1").disabled=false;
        }
        else{
            document.getElementById("deleteBlogButton1").disabled=true;
            sessionStorage.removeItem("deleteBlogId");
            alert("Invalid Blog ID");
        }
    });

    $("#blogFormDelete").submit(async function(e){
        e.preventDefault();

        $("#blogLoadingDelete").fadeIn();
        $("#blogErrorDelete").fadeOut();
        $("#blogSentDelete").fadeOut();
        
    

        blogId=sessionStorage.getItem("deleteBlogId")
  

   
    
    

    dataconDelete= await deleteBlogApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),blogId);


    $(dataconDelete).ready(function(){
        if(dataconDelete.error==false){
            $("#blogLoadingDelete").fadeOut(function(){                   
                $("#blogSentDelete").fadeIn();
            });
        }
        else{
            $("#blogLoadingDelete").fadeOut(function(){
                $("#blogErrorDelete").html(dataconDelete.message);
                $("#blogErrorDelete").fadeIn();
            });
        }
    });

});
});


    $("#uploadImg").click(function(){
        $(".modal-body").html(`
        <div>
            <div style="text-align: center;">
                <form action="`+apiurl+`uploadImage/index.php" method="post" enctype="multipart/form-data"> 
                <input type="text" name="email" placeholder="email" value="`+sessionStorage.getItem("email")+`" style="display:none">
                <input type="text" name="password" placeholder="password" value="`+sessionStorage.getItem("password")+`" style="display:none">
                    <h3>Select Image</h3>
                    <input class="form-control" name="image" type="file" accept="image/jpg, image/png, image/jpeg, image/gif" required/>
                
                    <button type="submit" class="btn btn-success mt-2" >Submit</button>
                </form>
            
            </div>
        </div>
    `);
    $(".modal-title").html(`<h1>Upload Image</h1>`);
    document.getElementById("showModal").click();
    });

    


});


async function loadImageList(){
    dataI= await getImageApi();
    $(dataI).ready(function(){
        if(dataI.data.length<1){
            $("#imageList").html(`
                <h3 style="text-align:center;" class="text-danger">You have not uploaded any images!</h3>
            `);
        }
        else{
            for(u=0;u<dataI.data.length;u++){
                $("#imageList").append(`
                <div class="container-fluid pt-0">
                <hr>
                <div class="card mt-0 ">
               
                    <div class="card-body">
                        <img class="imgThumbnail" src="`+dataI.data[u].name+`"/> <a class="text-primary" href="`+dataI.data[u].name+`"> `+dataI.data[u].name+`</a>
                    </div>  
                    
                    <div class="card-footer">
                        <button class="btn btn-danger" onclick="deleteImage('`+dataI.data[u].id+`')"><i class="fa fa-trash"></i></button>
                    </div>
              </div>
            </div>
                
                `);
            }
        }
    });
}

async function deleteImage(id){
    ds= await deleteImageApi(sessionStorage.getItem("email"),sessionStorage.getItem("password"),id);
    $(ds).ready(async function(){
        
    if(ds.error==false){
        
       await loadImageList();
        
    }
    else{
        alert("Couldnt Delete!");
    }
    });
}

async function login(email, password){
    
    $(".modal-body").html(`
        <div>
            <div style="text-align: center;"><img src="${preloader}" style="width:10%"></div>
        </div>
    `);
    $(".modal-header").html(`<h1>Login Status</h1>`);

    var data= await loginApi(email,password);
    //console.log(data);
    $(data).ready(function(){
        if(data.error==true){
            $(".modal-body").html(`
                <p class="force text-white">
                    `+data["message"]+`!
                </p>
                `);
                $(".modal-footer").html(`
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Try Again</button>
                `);        
        }
        else if(data.error==false){
            //Save all user basic information
            sessionStorage.setItem("logged",true);
            sessionStorage.setItem("email",email);
            sessionStorage.setItem("password",password);            
            
            //call up to modal to signify success to the user
            $(".modal-body").html(`
                <p class="force text-white">
                    You have successfully logged in!
                </p>
                `);
                $(".modal-footer").html(`
                    <button type="button" class="btn btn-success message_close" >Continue</button>
                `);
                $(".message_close").click(async function(){
                    window.location.replace("../admin");
                });

                setInterval(refresh,1000);
        }
    });
}


function refresh(){
    window.location.replace("../admin");
}


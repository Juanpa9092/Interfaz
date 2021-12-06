
function campoCategory(){
    $.ajax({
        url:"http://144.22.35.115:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let campo='<select class="select custom-select" id="Bcategory">';
            for(i=0;i<respuesta.length;i++){
                campo+='<option value="'+respuesta[i].id+'">'+respuesta[i].name+'</option>'
            }
            campo+='</select>'
            $("#campoCategory").html(campo)
        }
    });
}

function campoClientMessage(){
    $.ajax({
        url:"http://144.22.35.115:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let campo='<select class="select custom-select" id="Mclient">';
            for(i=0;i<respuesta.length;i++){
                campo+='<option value="'+respuesta[i].idClient+'">'+respuesta[i].name+'</option>'
            }
            campo+='</select>'
            $("#campoClientMessage").html(campo)
        }
    });
}

function campoBicicletasMessage(){
    $.ajax({
        url:"http://144.22.35.115:8080/api/Bike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let campo='<select class="select custom-select" id="Mbike">';
            for(i=0;i<respuesta.length;i++){
                campo+='<option value="'+respuesta[i].id+'">'+respuesta[i].name+'</option>'
            }
            campo+='</select>'
            $("#campoBicicletasMessage").html(campo)
        }
    });
}

function campoClientReservation(){
    $.ajax({
        url:"http://144.22.35.115:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let campo='<select class="select custom-select" id="Rclient">';
            for(i=0;i<respuesta.length;i++){
                campo+='<option value="'+respuesta[i].idClient+'">'+respuesta[i].name+'</option>'
            }
            campo+='</select>'
            $("#campoClientReservation").html(campo)
        }
    });
}

function campoBicicletasReservation(){
    $.ajax({
        url:"http://144.22.35.115:8080/api/Bike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let campo='<select class="select custom-select" id="Rbike">';
            for(i=0;i<respuesta.length;i++){
                campo+='<option value="'+respuesta[i].id+'">'+respuesta[i].name+'</option>'
            }
            campo+='</select>'
            $("#campoBicicletasReservation").html(campo)
        }
    });
}

//Funciones Bike
campoClientReservation();
campoBicicletasReservation();
campoClientMessage();
campoBicicletasMessage();
campoCategory();

function traerInformacionBikes(){
    $.ajax({
        url:"http://144.22.35.115:8080/api/Bike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaBikes(respuesta);
        }
    });
    
}
function pintarRespuestaBikes(respuesta){

    let myTable='<table class="table table-bordered table-hover">';
    myTable+="<tr><th>NAME</th><th>BRAND</th><th>YEAR</th><th>DESCRIPTION</th><th>CATEGORY</th></tr>"
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category.name+"</td>";
        myTable+='<td><button type="button" class="btn btn-success" onclick="traerBike('+respuesta[i].id+')">Actualizar</button></td>'
        myTable+='<td><button type="button" class="btn btn-danger" onclick="eliminarBike('+respuesta[i].id+')">Eliminar</button></td>';
        myTable+='</tr>';
    }
    myTable+="</table>";
    console.log(respuesta);
    $("#resultado").html(myTable);
}
function guardarInformacionBikes(){
    let var3 = {
        name:$("#BName").val(),
        brand:$("#Bbrand").val(),
        year:$("#BYear").val(),
        description:$("#BDescription").val(),
        category:{id:$("#Bcategory").val()}
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var3),
        
        url:"http://144.22.35.115:8080/api/Bike/save",
       
        
        success:function(response) {
            traerInformacionBikes();
            limpiarCBike();
            campoBicicletasMessage();
            campoBicicletasReservation();

        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
        }
        });

}
function limpiarCBike(){
    document.getElementById("Bbrand").value = "";
    document.getElementById("BName").value = "";
    document.getElementById("BYear").value = "";
    document.getElementById("BDescription").value = "";
}

function eliminarBike(id){
    $.ajax({
        url:"http://144.22.35.115:8080/api/Bike/"+id,
        type:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            alert("Se elimino correctamente");
            traerInformacionBikes();
            campoBicicletasMessage();
            campoBicicletasReservation();

        }
    });
}
function traerBike(id){
    $.ajax({
        url:"http://144.22.35.115:8080/api/Bike/"+id,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            editarBike(respuesta);
        }
    });
}
function editarBike(respuesta){
    document.getElementById("Bbrand").value = respuesta.brand;
    document.getElementById("BName").value = respuesta.name;
    document.getElementById("BYear").value = respuesta.year;
    document.getElementById("BDescription").value = respuesta.description;
    let botonActualizar='<button type="button" class="btn btn-danger" onclick="actualizarBike('+respuesta.id+')">Actualizar</button>'
    $("#botonActualizar").html(botonActualizar);
}

function actualizarBike(id){
    let var3 = {
        id:id,
        name:$("#BName").val(),
        brand:$("#Bbrand").val(),
        year:$("#BYear").val(),
        description:$("#BDescription").val(),
        };

        $.ajax({
            type:'PUT',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var3),
            
            url:"http://144.22.35.115:8080/api/Bike/update",
           
            
            success:function(response) {
                alert("Se actualizo correctamente");
                traerInformacionBikes();
                limpiarCBike();
                campoBicicletasMessage();
                campoBicicletasReservation();
                $("#botonActualizar").html("");
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                  window.location.reload()
                alert("No se actualizo correctamente");
            }
            });
            
}
//Funciones Category

function traerInformacionCategory(){
    $.ajax({
        url:"http://144.22.35.115:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaCategory(respuesta);
        }
    });
    
}

function pintarRespuestaCategory(respuesta){

    let myTable='<table class="table table-bordered table-hover">';
    myTable+="<tr><th>NAME</th><th>DESCRIPTION</th></tr>"
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+='<td><button type="button" class="btn btn-success" onclick="traerCategory('+respuesta[i].id+')">Actualizar</button></td>'
        myTable+='<td><button type="button" class="btn btn-danger" onclick="eliminarCategory('+respuesta[i].id+')">Eliminar</button></td>';
        myTable+='</tr>';
    }
    myTable+="</table>";
    console.log(respuesta);
    $("#resultado2").html(myTable);
}

function limpiarCCategory(){
    document.getElementById("Cname").value = "";
    document.getElementById("Cdescription").value = "";
}

function guardarInformacionCategory(){
    let var3 = {
        name:$("#Cname").val(),
        description:$("#Cdescription").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var3),
        
        url:"http://144.22.35.115:8080/api/Category/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            traerInformacionCategory();
            limpiarCCategory();
            campoCategory();

        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
        }
        });

}

function eliminarCategory(id){
    $.ajax({
        url:"http://144.22.35.115:8080/api/Category/"+id,
        type:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            alert("Se elimino correctamente");
            traerInformacionCategory();
            campoCategory();

        }
    });
}

function traerCategory(id){
    $.ajax({
        url:"http://144.22.35.115:8080/api/Category/"+id,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            editarCategory(respuesta);
        }
    });
}
function editarCategory(respuesta){
    document.getElementById("Cname").value = respuesta.name;
    document.getElementById("Cdescription").value = respuesta.description;
    
    let botonActualizar='<button type="button" class="btn btn-danger" onclick="actualizarCategory('+respuesta.id+')">Actualizar</button>'
    $("#botonActualizar2").html(botonActualizar);
}

function actualizarCategory(id){
    let var3 = {
        id:id,
        name:$("#Cname").val(),
        description:$("#Cdescription").val()
        };

        $.ajax({
            type:'PUT',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var3),
            
            url:"http://144.22.35.115:8080/api/Category/update",
           
            
            success:function(response) {
                alert("Se actualizo correctamente");
                traerInformacionCategory();
                limpiarCCategory();
                campoCategory();
                $("#botonActualizar2").html("");
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                alert("No se actualizo correctamente");
            }
            });
            
}

//Funciones Client

function traerInformacionClient(){
    $.ajax({
        url:"http://144.22.35.115:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClient(respuesta);
        }
    });
    
}

function pintarRespuestaClient(respuesta){

    let myTable='<table class="table table-bordered table-hover">';
    myTable+="<tr><th>NAME</th><th>EMAIL</th><th>AGE</th></tr>"
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+='<td><button type="button" class="btn btn-success" onclick="traerClient('+respuesta[i].idClient+')">Actualizar</button></td>'
        myTable+='<td><button type="button" class="btn btn-danger" onclick="eliminarClient('+respuesta[i].idClient+')">Eliminar</button></td>';
        myTable+='</tr>';
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);

}

function limpiarCClient(){
    document.getElementById("Clname").value = "";
    document.getElementById("Clemail").value = "";
    document.getElementById("Clage").value = "";
    document.getElementById("Clpassword").value = "";
}

function guardarInformacionClient(){
    let var3 = {
        name:$("#Clname").val(),
        email:$("#Clemail").val(),
        age:$("#Clage").val(),
        password:$("#Clpassword").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var3),
        
        url:"http://144.22.35.115:8080/api/Client/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            traerInformacionClient();
            limpiarCClient();
            campoClientMessage();
            campoClientReservation();

        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se guardo correctamente");
        }
        });

}

function eliminarClient(id){
    $.ajax({
        url:"http://144.22.35.115:8080/api/Client/"+id,
        type:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            alert("Se elimino correctamente");
            traerInformacionClient();
            campoClientMessage();
            campoClientReservation();

        }
    });
}

function traerClient(id){
    $.ajax({
        url:"http://144.22.35.115:8080/api/Client/"+id,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            editarClient(respuesta);
        }
    });
}
function editarClient(respuesta){
    document.getElementById("Clname").value = respuesta.name;
    document.getElementById("Clemail").value = respuesta.email;
    document.getElementById("Clage").value = respuesta.age;
    document.getElementById("Clpassword").value = respuesta.password;
    
    let botonActualizar='<button type="button" class="btn btn-danger" onclick="actualizarClient('+respuesta.idClient+')">Actualizar</button>'
    $("#botonActualizar3").html(botonActualizar);
}

function actualizarClient(id){
    let var3 = {
        idClient:id,
        name:$("#Clname").val(),
        email:$("#Clemail").val(),
        age:$("#Clage").val(),
        password:$("#Clpassword").val()
        };

        $.ajax({
            type:'PUT',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var3),
            
            url:"http://144.22.35.115:8080/api/Client/update",
           
            
            success:function(response) {
                alert("Se actualizo correctamente");
                traerInformacionClient();
                limpiarCClient();
                campoClientMessage();
                campoClientReservation();
                $("#botonActualizar3").html("");
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                alert("No se actualizo correctamente");
            }
            });
            
}

//Funciones Message

function traerInformacionMessage(){
    $.ajax({
        url:"http://144.22.35.115:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMessage(respuesta);
        }
    });
    
}
function pintarRespuestaMessage(respuesta){

    let myTable='<table class="table table-bordered table-hover">';
    myTable+="<tr><th>BIKE</th><th>CLIENT</th><th>MESSAGETEXT</th></tr>"
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].bike.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+='<td><button type="button" class="btn btn-success" onclick="traerMessage('+respuesta[i].idMessage+')">Actualizar</button></td>'
        myTable+='<td><button type="button" class="btn btn-danger" onclick="eliminarMessage('+respuesta[i].idMessage+')">Eliminar</button></td>';
        myTable+='</tr>';
    }
    myTable+="</table>";
    console.log(respuesta);
    $("#resultado4").html(myTable);
}

function limpiarCMessage(){
    document.getElementById("Mtext").value = "";
    
}

function guardarInformacionMessage(){
    let var3 = {
        messageText:$("#Mtext").val(),
        bike:{id:$("#Mbike").val()},
        client:{idClient:$("#Mclient").val()}
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var3),
        
        url:"http://144.22.35.115:8080/api/Message/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            limpiarCMessage();
            traerInformacionMessage();
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se guardo correctamente");
        }
        });

}

function eliminarMessage(id){
    $.ajax({
        url:"http://144.22.35.115:8080/api/Message/"+id,
        type:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            alert("Se elimino correctamente");
            traerInformacionMessage();
        }
    });
}

function traerMessage(id){
    $.ajax({
        url:"http://144.22.35.115:8080/api/Message/"+id,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            editarMessage(respuesta);
        }
    });
}
function editarMessage(respuesta){
    document.getElementById("Mtext").value = respuesta.messageText;
    
    
    let botonActualizar='<button type="button" class="btn btn-danger" onclick="actualizarMessage('+respuesta.idMessage+')">Actualizar</button>'
    $("#botonActualizar4").html(botonActualizar);
}

function actualizarMessage(id){
    let var3 = {
        idMessage:id,
        messageText:$("#Mtext").val(),
        };

        $.ajax({
            type:'PUT',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var3),
            
            url:"http://144.22.35.115:8080/api/Message/update",
           
            
            success:function(response) {
                alert("Se actualizo correctamente");
                traerInformacionMessage();
                limpiarCMessage();
                $("#botonActualizar4").html("");
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                alert("No se actualizo correctamente");
            }
            });
            
}

//Funciones Message

function traerInformacionReservation(){
    $.ajax({
        url:"http://144.22.35.115:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaReservation(respuesta);
        }
    });
    
}
function pintarRespuestaReservation(respuesta){

    let myTable='<table class="table table-bordered table-hover">';
    myTable+="<tr><th>BIKE</th><th>CLIENT</th><th>START DATE</th><th>DEVOLUTION DATE</th></tr>"
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].bike.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+='<td><button type="button" class="btn btn-success" onclick="traerReservation('+respuesta[i].idReservation+')">Actualizar</button></td>'
        myTable+='<td><button type="button" class="btn btn-danger" onclick="eliminarReservation('+respuesta[i].idReservation+')">Eliminar</button></td>';
        myTable+='</tr>';
    }
    myTable+="</table>";
    console.log(respuesta);
    $("#resultado5").html(myTable);
}

function limpiarCReservation(){
    document.getElementById("Sdate").value = "";
    document.getElementById("Ddate").value = "";
    
}

function guardarInformacionReservation(){
    let var3 = {
        startDate:$("#Sdate").val(),
        devolutionDate:$("#Ddate").val(),
        bike:{id:$("#Rbike").val()},
        client:{idClient:$("#Rclient").val()}
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var3),
        
        url:"http://144.22.35.115:8080/api/Reservation/save",
       
        
        success:function(response) {
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            limpiarCReservation();
            traerInformacionReservation();
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            alert("No se guardo correctamente");
        }
        });

}

function eliminarReservation(id){
    $.ajax({
        url:"http://144.22.35.115:8080/api/Reservation/"+id,
        type:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            alert("Se elimino correctamente");
            traerInformacionReservation();
        }
    });
}

function traerReservation(id){
    $.ajax({
        url:"http://144.22.35.115:8080/api/Reservation/"+id,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            editarReservation(respuesta);
        }
    });
}
function editarReservation(respuesta){
    document.getElementById("Sdate").value = respuesta.startDate;
    document.getElementById("Ddate").value = respuesta.devolutionDate;
    
    let botonActualizar='<button type="button" class="btn btn-danger" onclick="actualizarReservation('+respuesta.idReservation+')">Actualizar</button>'
    $("#botonActualizar5").html(botonActualizar);
}

function actualizarReservation(id){
    let var3 = {
        idReservation:id,
        startDate:$("#Sdate").val(),
        devolutionDate:$("#Ddate").val(),

        };

        $.ajax({
            type:'PUT',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var3),
            
            url:"http://144.22.35.115:8080/api/Reservation/update",
           
            
            success:function(response) {
                alert("Se actualizo correctamente");
                traerInformacionReservation();
                limpiarCReservation();
                $("#botonActualizar5").html("");
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                alert("No se actualizo correctamente");
            }
            });
            
}
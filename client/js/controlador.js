/*******************************************************************************************
************************Modulo De Angular. Contiene todos los controladores*****************
************************Que Actualizan la informacion de las vistas*************************
********************************************************************************************/
angular.module('app.controllers', [])


/*******************************************************************************************
********************    Cotrolador del inicio de sesión (login.html)<----templates  ********
************************    Actualizan la informacion de las vistas   **********************
********************************************************************************************/
.controller('loginCtrl',['$scope',function($scope) {
 
$scope.login= function (){
 $('#logB').attr('disabled', true);
// limpio las variables
 sessionStorage.removeItem('user');
 sessionStorage.removeItem('nom1');
 sessionStorage.removeItem('nom2');
 sessionStorage.removeItem('id');
 if($scope.nU !=null || $scope.pass !=null){
$.get('https://as400-daiman20.c9.io/api/users/authenticate',
  { 
   iduser:$scope.nU,
   password:$scope.pass
  },function( data ) {
   console.log(data);
   sessionStorage.setItem('id',data.idUser);
  //numCuenta(data.idUser);
   window.location="./index.html#/side-menu22/page4";
  //alert("Bienvenido");
   	$("#myModal").modal("show");
   	setTimeout(function(){
		$("#myModal").modal("hide");},2000);
		// sessionStorage.removeItem('id');
		$('#logB').attr('disabled', false);
  }).fail(function(err){
   console.log(err);
   //alert('Usuario y/o Pass erroneo');
   	setTimeout(function(){
	window.location.assign("./index.html");
	$("#myError").modal("show");
   		},2000);
 // $('#logB').attr('disabled', false);
  });
}else{//alert('No puede dejar espacios en blanco');
	$("#myErrorBlank").modal("show");
	$('#logB').attr('disabled', false);
}
}
///
}])/************************ Finalización del Controlador de Login **************************/
 
 
/*******************************************************************************************
********************    Controlador de Información Principal   ******************************
************************   (InformacioN.html)<----templates   ******************************
********************************************************************************************/  
.controller('informacioNCtrl', function($scope) {
//  //actualiza cada 4 segundos
 setTimeout(function () {
  $scope.$apply(function () {
            initInfo ($scope);
           //$scope.idUsuario='tttttttttt;
        });
    }, 4000);
 //esta es una variable bnecesaria en home  
 $.get('https://as400-daiman20.c9.io/api/users/dataclient',
  { 
   idusercon: sessionStorage.getItem('id'),
  },function( data ) {
   console.log(data);
    //agredo variables a session para mostrarlo en el de consultar cuenta
   sessionStorage.setItem('user',data.dsCli.username);
			sessionStorage.setItem('nom1',data.dsCli.firstname);
			sessionStorage.setItem('nom2',data.dsCli.secondname);
			//////////////////////////////////////////////////////////////////////
  	 $scope.idUsuario=data.idUserCon;
				$scope.user=data.dsCli.username;
				$scope.nom1=data.dsCli.firstname;
    $scope.nom2=data.dsCli.secondname;
    $scope.idcliente=data.dsCli.numberClientID;
    $scope.nac=data.dsCli.nationality;
    $scope.fecha=data.dsCli.birthdate;
    $scope.distrito=data.dsCli.districtName;
    $scope.direc=(data.dsCli.cantonName.toString()+' '+data.dsCli.provinceName.toString()+' '+data.dsCli.address.toString());
    $scope.idtipo=data.dsCli.nameTypeID;
    //esta parte es para mostrar la cuenta maestra
    var usr=data.idUserCon;
    $.get('https://as400-daiman20.c9.io/api/users/acountClient',
  { 
   iduseracount:usr
  },function( data ) {
   console.log(data);
var cuenta =data.cuentasString.split('*');
//$("#sel").html(cuenta[0]);
$scope.cuMaestra=cuenta[0];
//en esta parte consultamos el saldo
var datosUsuario =cuenta[0];
    $.get('https://as400-daiman20.c9.io/api/acounts/dataAcount',
  { 
   idacount: datosUsuario,
  },function( data ) {
   console.log(data);
   $scope.saldoInfo=data.dsAcount.balance;
 }).fail(function(err){
   console.log(err);
   //alert('Error [' + err.responseText + ']');
  });
//////////////////////////////////
  }).fail(function(err){
   console.log(err);
  
  });
  /////////////////////////////////
  }).fail(function(err){
   console.log(err);
   //este error es de carga de datos
   //alert('Error [' + err.responseText + ']');
  /// window.location="index.html";//limpia el url que queda
  });
 
	})/************************ Finalización del Controlador de Informacion ********************/
 
/*******************************************************************************************
********************    Controlador que consulta los servicios Publicos   *****************
************************                                     ******************************
********************************************************************************************/    
.controller('consultaServicioPubAYA', function($scope) {
 

})/************************ Finalización del Controlador de Informacion ********************/
   
.controller('consultasCtrl', function($scope) {
     
})
      
.controller('transferenciaCtrl', function($scope) {

})
.controller('transferenciasCtrl', function($scope) {

})
.controller('confirmarCtrl', function($scope) {

})
.controller('confirmar1Ctrl', function($scope) {

}) 
.controller('pagoServiciosCtrl', function($scope) {

})
.controller('PagosCtrl', function($scope) {
 setTimeout(function () {
  $scope.$apply(function () {
            $scope.num1=numServicioPub;
	           $scope.nombre1=nombreSrvPub;
	           $scope.fecha1=fechaPub;
	           $scope.monto1=montoPub;
   ///////////////////////////////////
            $scope.numTelK=numTelK;
           //$scope.idUsuario='tttttttttt;
        });
    }, 2000);
    var usr=sessionStorage.getItem('id');
 $.get('https://as400-daiman20.c9.io/api/users/acountClient',
  { 
   iduseracount:usr
  },function( data ) {
   console.log(data);
//estas variables son en las cuales se almacenan las cuantas de cada cleinte, una para cada combo del app  
   var sali3='';
  //eleimno el ultimo parentesis
 data.cuentasString=" *"+data.cuentasString.substring(0,data.cuentasString.lastIndexOf('*'));
 var cuenta =data.cuentasString.split('*');
 for (var i = 0; i< cuenta.length ; i++) {
 sali3=sali3+"<option  id='cuen3"+i+"'  name='cuen3"+i+"' value='"+cuenta[i]+"' >"+cuenta[i]+"</option>";
}
 $("#sel6").html(sali3);
 $("#sel5").html(sali3);
 ////////////////////////////////
  }).fail(function(err){
   console.log(err);
  
  });
 $scope.consultaPubAYA= function (){
   $('#ayaConsultaB').attr('disabled', true);
 if($scope.numeroC !=null ){
$.get('https://as400-daiman20.c9.io/api/services/dataService',
  { 
   numservicio:$scope.numeroC,
   tipo:'01'
  },function( data ) {
   console.log(data);
   
   if(data.existe != 2){
    $("#aaa").html(data.dsServ.SerNun);
   
   numServicioPub=data.dsServ.SerNun;
   nombreSrvPub=data.dsServ.nombre+' '+data.dsServ.P_Apellido+' '+data.dsServ.S_Apellido;
   fechaPub=data.dsServ.Fecha_Fact;
   montoPub=data.dsServ.monto;

	 $scope.num1=numServicioPub;
	 $scope.nombre1=nombreSrvPub;
	 $scope.fecha1=fechaPub;
	 $scope.monto1=montoPub;
  window.location.assign("./index.html#/side-menu22/page11");
	 $('#ayaConsultaB').attr('disabled', false);
   }else{
    $("#errorG").modal("show");
    $('#ayaConsultaB').attr('disabled', false);
     $scope.numeroC=null;
   }
   
  }).fail(function(err){
   console.log(err);

  });
}else{//alert('No puede dejar espacios en blanco');
	$("#myErrorBlank").modal("show");
 $('#ayaConsultaB').attr('disabled', false);
}
}

 $scope.consultaPubICE= function (){
$('#consultaPubICE').attr('disabled', true);
 if($scope.numeroC !=null ){
$.get('https://as400-daiman20.c9.io/api/services/dataService',
  { 
   numservicio:$scope.numeroC,
   tipo:'02'
  },function( data ) {
   console.log(data);
   
   if(data.existe != 2 ){
    numServicioPub=data.dsServ.SerNun;
    nombreSrvPub=data.dsServ.nombre+' '+data.dsServ.P_Apellido+' '+data.dsServ.S_Apellido;
    fechaPub=data.dsServ.Fecha_Fact;
    montoPub=data.dsServ.monto;

	   $scope.num1=numServicioPub;
	   $scope.nombre1=nombreSrvPub;
	   $scope.fecha1=fechaPub;
	   $scope.monto1=montoPub;
     window.location.assign("./index.html#/side-menu22/page11");
	    $('#consultaPubICE').attr('disabled', false);
    
   }else {
     $("#errorG").modal("show");
     $('#consultaPubICE').attr('disabled', false);
     $scope.numeroC=null;
   }
   
  }).fail(function(err){
   console.log(err);
   $("#errorG").modal("show");
   $('#consultaPubICE').attr('disabled', false);
  });
}else{//alert('No puede dejar espacios en blanco');
	  $("#myErrorBlank").modal("show");
	  $('#consultaPubICE').attr('disabled', false);
}
}

$scope.consultaPubCNFL= function (){
$('#consultaPubCNFL').attr('disabled', true);
 if($scope.numeroC !=null ){
$.get('https://as400-daiman20.c9.io/api/services/dataService',
  { 
   numservicio:$scope.numeroC,
   tipo:'03'
  },function( data ) {
   console.log(data);
   
  if(data.existe != 2){
    numServicioPub=data.dsServ.SerNun;
   nombreSrvPub=data.dsServ.nombre+' '+data.dsServ.P_Apellido+' '+data.dsServ.S_Apellido;
   fechaPub=data.dsServ.Fecha_Fact;
   montoPub=data.dsServ.monto;

	 $scope.num1=numServicioPub;
	 $scope.nombre1=nombreSrvPub;
	 $scope.fecha1=fechaPub;
	 $scope.monto1=montoPub;
  window.location.assign("./index.html#/side-menu22/page11");
	 $('#consultaPubCNFL').attr('disabled', false);
   
  }else{
   $("#errorG").modal("show");
   $('#consultaPubCNFL').attr('disabled', false);
   $scope.numeroC=null;
  }
  }).fail(function(err){
   console.log(err);
   
  $("#errorG").modal("show");
  $('#consultaPubCNFL').attr('disabled', false);
 });
}else{//alert('No puede dejar espacios en blanco');
	$("#myErrorBlank").modal("show");
	$('#consultaPubCNFL').attr('disabled', false);
}
}

$scope.consultaPubICETEL= function (){
 $('#consultaPubICETEL').attr('disabled', true);
 if($scope.numeroC !=null ){
$.get('https://as400-daiman20.c9.io/api/services/dataService',
  { 
   numservicio:$scope.numeroC,
   tipo:'04'
  },function( data ) {
   console.log(data);
   
   if(data.existe != 2){
    numServicioPub=data.dsServ.SerNun;
    nombreSrvPub=data.dsServ.nombre+' '+data.dsServ.P_Apellido+' '+data.dsServ.S_Apellido;
    fechaPub=data.dsServ.Fecha_Fact;
    montoPub=data.dsServ.monto;

	   $scope.num1=numServicioPub;
	   $scope.nombre1=nombreSrvPub;
	   $scope.fecha1=fechaPub;
	   $scope.monto1=montoPub;
    window.location.assign("./index.html#/side-menu22/page11");
	   $('#consultaPubICETEL').attr('disabled', false);
    
   }else{
    $("#errorG").modal("show");
    $('#consultaPubICETEL').attr('disabled', false);
    $scope.numeroC=null;
   }
  }).fail(function(err){
   console.log(err);
  $("#errorG").modal("show");
  $('#consultaPubICETEL').attr('disabled', false);
  });
}else{//alert('No puede dejar espacios en blanco');
	$("#myErrorBlank").modal("show");
	$('#consultaPubICETEL').attr('disabled', false);
}
}
$scope.consultaReKolbi= function (){
  $('#consultaReKolbi').attr('disabled', true);
 if($scope.numeCelk !=null ){
$.get('https://as400-daiman20.c9.io/api/services/ConsultaNumeroTel',
  { 
   numero:$scope.numeCelk,
   tipoem:'01',
  },function( data ) {
   console.log(data);
   numTelK=data.numCel;
   $scope.numTelK=numTelK;
   tipoempresaRecarga='01';
  window.location.assign("./index.html#/side-menu22/page13");
	 $('#consultaReKolbi').attr('disabled', false);
	  $scope.numeCelk='';
  }).fail(function(err){
   console.log(err);
  $("#errorG").modal("show");
   $('#consultaReKolbi').attr('disabled', false);
   $scope.numeCelk=null;
  });
}else{//alert('No puede dejar espacios en blanco');
	$("#myErrorBlank").modal("show");
	 $('#consultaReKolbi').attr('disabled', false);
}
}
//////////////////////////////////////////////////////////////////////////////
$scope.consultaReClaro= function (){
   $('#consultaReClaro').attr('disabled', true);
 if($scope.numeCelC !=null ){
$.get('https://as400-daiman20.c9.io/api/services/ConsultaNumeroTel',
  { 
   numero:$scope.numeCelC,
   tipoem:'02',
  },function( data ) {
   console.log(data);
   numTelK=data.numCel;
   $scope.numTelC=numTelK;
   tipoempresaRecarga='02';
  window.location.assign("./index.html#/side-menu22/page13");
	 $('#consultaReClaro').attr('disabled', false);
	 $scope.numeCelC='';
  }).fail(function(err){
   console.log(err);
  $("#errorG").modal("show");
  $('#consultaReClaro').attr('disabled', false);
  $scope.numeCelC=null;
  });
}else{//alert('No puede dejar espacios en blanco');
	$("#myErrorBlank").modal("show");
	$('#consultaReClaro').attr('disabled', false);
}
}
//////////////////////////////////////////////////////////////////////////////
$scope.consultaReMovi= function (){
  $('#consultaReMovi').attr('disabled', true);
 if($scope.numeCelM !=null ){
$.get('https://as400-daiman20.c9.io/api/services/ConsultaNumeroTel',
  { 
   numero:$scope.numeCelM,
   tipoem:'03',
  },function( data ) {
   console.log(data);
   numTelK=data.numCel;
   tipoempresaRecarga='03';
   $scope.numTelC=numTelK;
  window.location.assign("./index.html#/side-menu22/page13");
	 $('#consultaReMovi').attr('disabled', false);
	  $scope.numeCelM='';
  }).fail(function(err){
   console.log(err);
  $("#errorG").modal("show");
  $('#consultaReMovi').attr('disabled', false);
  $scope.numeCelM=null;
  });
}else{//alert('No puede dejar espacios en blanco');
	$("#myErrorBlank").modal("show");
	$('#consultaReMovi').attr('disabled', false);
}
}
//////////////////////////////////////////////////////////////////////////////
//actualiza y realiza las rebajas de los pagos de servicios
$scope.actualizaPago= function (){
 $('#pagoServicioB').attr('disabled', true);
 var cuent=$("#sel6").val();
// alert(cuent+"  "+$scope.monto1);
if(cuent.trim()!=""){
$.get('https://as400-daiman20.c9.io/api/services/PagoServicios',
  { 
    numcuenta:cuent,
    montopago:$scope.monto1
  },function( data ) {
   console.log(data);
   $("#TrancExito").modal("show");
  setTimeout(function(){
		$("#TrancExito").modal("hide");
	 window.location="./index.html#/side-menu22/page12";
  },2000);
  $('#pagoServicioB').attr('disabled', false);
  
  }).fail(function(err){
   console.log(err);
  $("#myErrorTran").modal("show");
  $('#pagoServicioB').attr('disabled', false);
  }); 
}else{
 $("#myErrorBlank").modal("show");
 $('#pagoServicioB').attr('disabled', false);
}

}
/////////////////////////////////////////////////////////////////////////////
/////////actualiza y realiza rebajas de pagos de recargas////////////////////
$scope.actualizaPago2= function (){
 $('#pagoRecargaB').attr('disabled', true);
 var cuent=$("#sel5").val();
// alert(cuent+"  "+$scope.montoC);
if(cuent.trim()!=""){
$.get('https://as400-daiman20.c9.io/api/services/PagoServicios',
  { 
    numcuenta:cuent,
    montopago:$scope.montoC
  },function( data ) {
   console.log(data);
   $("#TrancExito").modal("show");
  setTimeout(function(){
		$("#TrancExito").modal("hide");
	//	window.location.assign("./index.html#/side-menu22/page3");
	$('#idmonto').val('2000');
   $scope.montoC='';
   $scope.sel5='';
   numTelK='';
   if(tipoempresaRecarga=='01'){
    window.location="./index.html#/side-menu22/page21";
   }else if(tipoempresaRecarga=='02'){
    window.location="./index.html#/side-menu22/page19";
    }else{
     window.location="./index.html#/side-menu22/page20";
   }
		$('#pagoRecargaB').attr('disabled', false);
  },2000);
  
  }).fail(function(err){
   console.log(err);
  $("#myErrorTran").modal("show");
  $('#pagoRecargaB').attr('disabled', false);
  }); 
}else{
 $("#myErrorBlank").modal("show");
 $('#pagoRecargaB').attr('disabled', false);
}

}
/////////////////////////////////////////////////////////////////////////////
})    
   
.controller('transferenciaEntreTusCuentasCtrl', function($scope) {
 
}) 

/*******************************************************************************************
********************    Controlador de Logout del usuario    *******************************
************************   (TabsController.html)<----templates   ****************************
********************************************************************************************/ 
.controller('logoutCtrl', function($scope) {
$scope.logout= function (){
 
                window.location.assign("./index.html");
}
$scope.questlogout= function (){
 	$("#questLogout").modal("show");
}
})/************************ Finalización del Controlador de logout     ********************/

/*******************************************************************************************
********************    Controlador que gestiona la Transsacione    ************************
********(Transferencias.html TransferenciaEntreCuentas.html)<----templates *****************
********************************************************************************************/
.controller('Select1Ctrl', function($scope) {

 $scope.cuentaOri=cuenta1;
 $scope.cuentadestino=cuenta2;
 $scope.monto=monto1;
 
 var usr=sessionStorage.getItem('id');
 $.get('https://as400-daiman20.c9.io/api/users/acountClient',
  { 
   iduseracount:usr
  },function( data ) {
   console.log(data);
//estas variables son en las cuales se almacenan las cuantas de cada cleinte, una para cada combo del app  
   var sali='';
   var sali2='';
   var sali3='';
   var sali4='';//transaccion externa
   $("#propi").html(sessionStorage.getItem('user')+" "+sessionStorage.getItem('nom1')+" "+sessionStorage.getItem('nom2'));
   $("#propi1").html(sessionStorage.getItem('user')+" "+sessionStorage.getItem('nom1')+" "+sessionStorage.getItem('nom2'));
   $("#propi2").html(sessionStorage.getItem('user')+" "+sessionStorage.getItem('nom1')+" "+sessionStorage.getItem('nom2'));
 //eleimno el ultimo parentesis
 data.cuentasString=" *"+data.cuentasString.substring(0,data.cuentasString.lastIndexOf('*'));
 var cuenta =data.cuentasString.split('*');
 for (var i = 0; i< cuenta.length ; i++) {
 sali=sali+"<option  id='cuen"+i+"'  name='cuen"+i+"' value='"+cuenta[i]+"' data-ng-click='ccuenta();'>"+cuenta[i]+"</option>";
 sali2=sali2+"<option  id='cuen2"+i+"'  name='cuen2"+i+"' value='"+cuenta[i]+"' >"+cuenta[i]+"</option>";
 sali3=sali3+"<option  id='cuen3"+i+"'  name='cuen3"+i+"' value='"+cuenta[i]+"' >"+cuenta[i]+"</option>";
 sali4=sali4+"<option  id='cuen4"+i+"'  name='cuen3"+i+"' value='"+cuenta[i]+"' >"+cuenta[i]+"</option>";
 }
 $("#sel").html(sali);//carga el combobox de consulta
  $("#sel2").html(sali2);
 $("#sel3").html(sali3);
 $("#sel4").html(sali3);
 $("#sel5").html(sali3);
 $("#sel6").html(sali3);
 ////////////////////////////////
  }).fail(function(err){
   console.log(err);
  
  });
  $scope.ccuenta= function (){
   var ele= $("#sel").val();
             var datosUsuario = ele;
    $.get('https://as400-daiman20.c9.io/api/acounts/dataAcount',
  { 
   idacount: datosUsuario,
  },function( data ) {
   console.log(data);
 	 $("#nc").html("<strong># Cuenta:</strong>"+data.dsAcount.idAcounts);
    $("#cc").html("<strong># Cédula:</strong>"+data.dsAcount.clients_idC);
    $("#tc").html("<strong>Tipo Cuenta:</strong>"+data.dsAcount.acountType);
    $("#m").html("<strong>Estado:</strong>"+data.dsAcount.statusAcount);
    $("#s").html("<strong>Saldo: ₡</strong>"+data.dsAcount.balance);
 }).fail(function(err){
   console.log(err);
   //alert('Error [' + err.responseText + ']');
  });
}

/*********************************************************************************************
************************ Metodo que realiza consulta info de cliente ************************
************************ con num cuenta(transferenciaEntreTusCuentas) ***********************
*********************************************************************************************/
//metodo que consulta info de cliente con num cuenta
 $scope.dataClientAcount= function (){ 
  	$('#verificaB').attr('disabled', true);
	//limpio los datos
	   $("#idVer").html("");
    $("#nombVer").html("");
    $("#ape1Ver").html("");
    $("#ape2Ver").html("");
    /////////////
	var datosUsuario = $("#cuenta2").val();
if(datosUsuario.trim()!=""){
	//alert(datosUsuario);
		$("#idVer").html("<strong>Verificando numero de cuenta</strong>");
    $.get('https://as400-daiman20.c9.io/api/acounts/dataCliAcount',
  { 
   idacount: datosUsuario,
  },function( data ) {
   if (data.existe!=null){
   console.log("info de usu "+ datosUsuario);
 	$("#idVer").html("<strong># Cédula:</strong>"+data.dsAcount.clients_idC);
    $("#nombVer").html("<strong># nombre:</strong>"+data.dsAcount.nombre);
    $("#ape1Ver").html("<strong>Apellido 1:</strong>"+data.dsAcount.apellido1);
    $("#ape2Ver").html("<strong>Apellido 2:</strong>"+data.dsAcount.apellido2);
    $('#verificaB').attr('disabled', false);
   }else{alert('hay un error en la consilta')}
 }).fail(function(err){
   console.log(err);
   	$("#idVer").html("<strong>El número de Cuenta es invalido</strong>");
  // alert('Error [Tiempo de respuesta agotado]');
  $('#verificaB').attr('disabled', false);
  });
 }//fin del if
 else{$("#idVer").html("<strong>Número de cuenta en blanco</strong>");
  $('#verificaB').attr('disabled', false);
 }
}/******************** Finalizacion del metodo de consultas *********************************/
//para la pregunta de la trnasferencia
$scope.pregunta=function () {
        var c1=$('#sel2').val();
         //ahora actualizo///////////ahora actualizo
        $("#cO").html("<strong>Cuenta Origen:"+c1+"</strong>"+'');
        // $("#cD").html("<strong>Cuenta Destino:"+($('#sel3').val())+"</strong>"+'');
        // $("#mT").html("<strong>Monto a transferir: ₡"+$('#monto').val().toString()+"</strong>"+'');
        // $("#mD").html("<strong>Monto a debitar: ₡"+$('#monto').val().toString()+"</strong>"+'');
        window.location="./index.html#/side-menu22/page8";     
   
    }
/*********************************************************************************************
********* Metodo que realiza transacciones entre cuentas (transferencia) ********************
*********************************************************************************************/
$scope.transac=function () { 
	//  monto1 = $("#montoT").val().toString();
	// cuenta1 = $("#sel4").val();
	// cuenta2 = $("#cuenta2").val();
	$('#confirma1').attr('disabled', true);
	// alert(cuenta1+" "+(monto1)+" "+cuenta2);
if(monto1==null || cuenta1==null || cuenta2==null || monto1.trim()==""|| cuenta1.trim()==""|| cuenta2.trim()==""){
	$("#myErrorBlank").modal("show");
  setTimeout(function(){
		$("#myErrorBlank").modal("hide");
  },2000);
}else{
    $.get('https://as400-daiman20.c9.io/api/acounts/transac',
  { 
   idacount1: cuenta1,
   idacount2: cuenta2,
   monto1:monto1
  },function( data ) {
   console.log(data);
 	//aquí  
 $("#TrancExito").modal("show");
  setTimeout(function(){
		$("#TrancExito").modal("hide");
  },2000);
  	$('#confirma1').attr('disabled', false);
  $("#montoT").val('');
  $("#sel4").val('');
  $("#cuenta2").val('');
  	$("#idVer").html("<strong># Cédula:</strong>"+'');
    $("#nombVer").html("<strong># nombre:</strong>"+'');
    $("#ape1Ver").html("<strong>Apellido 1:</strong>"+'');
    $("#ape2Ver").html("<strong>Apellido 2:</strong>"+'');
  window.location="./index.html#/side-menu22/page7";
  /////////////////////
 }).fail(function(err){
   console.log(err);
   //esta validacion se hizo en la parte de abajo
   $("#myErrorTran").modal("show");
  	$('#confirma1').attr('disabled', false);
  });
 
}

}/***************** Finalizacion del metodo transferenciaEntreTusCuentas ********************/

/*********************************************************************************************
********* Metodo que realiza transacciones entre cuentas del mismo cliente   ****************
*********************************************************************************************/
$scope.transac2=function () { 
	//  monto1 = $("#monto").val().toString();
	// cuenta1 = $("#sel2").val();
	// cuenta2 = $("#sel3").val();
		$('#confirma').attr('disabled', true);
if(monto1==null || cuenta1==null || cuenta2==null || monto1.trim()==""|| cuenta1.trim()==""|| cuenta2.trim()==""){
	$("#myErrorBlank").modal("show");
  setTimeout(function(){
		$("#myErrorBlank").modal("hide");
  },2000);
}else{
    $.get('https://as400-daiman20.c9.io/api/acounts/transac',
  { 
   idacount1: cuenta1,
   idacount2: cuenta2,
   monto1:monto1
  },function( data ) {
   console.log(data);
 	//aquí  
 $("#TrancExito").modal("show");
  setTimeout(function(){
		$("#TrancExito").modal("hide");
  },2000); 
  	$('#confirma').attr('disabled', false);
  $("#monto").val('');
  $("#sel2").val('');
  $("#sel3").val('');
  window.location="./index.html#/side-menu22/page18";
 	  ////////
 }).fail(function(err){
   console.log(err);
   //alert('Error [Transaccion invalida]');
   $("#myErrorTran").modal("show");
  	$('#confirma').attr('disabled', false);
  });
   
}
}/*Finalizacion del metodo que realiza transsacciones entre cuentas del mismo cliente *******/

$scope.confirma= function (){
 monto1=$("#monto").val().toString();
 	cuenta1=$("#sel2").val();
 	cuenta2=$("#sel3").val();
 if(monto1==null || cuenta1==null || cuenta2==null || monto1.trim()==""|| cuenta1.trim()==""|| cuenta2.trim()==""){
  	$("#myErrorBlank").modal("show");
  setTimeout(function(){
		$("#myErrorBlank").modal("hide");
  },2000);
 }else{
  window.location="./index.html#/side-menu22/page8";
 	$scope.montoConfirmar=monto1;
 		$scope.cuentDebit=cuenta1;
 		$scope.cuentAcredit=cuenta2;
 }
}
$scope.confirma1= function (){
monto1=$("#montoT").val().toString();
 	cuenta1=$("#sel4").val();
 	cuenta2=$("#cuenta2").val();
 if(monto1==null || cuenta1==null || cuenta2==null || monto1.trim()==""|| cuenta1.trim()==""|| cuenta2.trim()==""){
 $("#myErrorBlank").modal("show");
  setTimeout(function(){
	$("#myErrorBlank").modal("hide");
  },2000);
 }else{
 window.location="./index.html#/side-menu22/page9";
 	
 	$scope.montoConfirmar=monto1;
 		$scope.cuentDebit=cuenta1;
 		$scope.cuentAcredit=cuenta2;
 }
 
}
})/************************ Finalización del Controlador de Transacciones    ************/

/******************Variables Globales para Confirmar************************************/
var monto1 = '';
var cuenta1 = '';
var cuenta2 = '';
/****************** Fin Variables Globales para Confirmar*******************************/	

/******************Variables Globales para realizar pagos de serviciosPubli*************/
	var numServicioPub='';
	var nombreSrvPub= '';
	var fechaPub= '';
	var montoPub= '';
	var numTelK='';// esta variable contendrá todos lodos los numeros de telefonos de todas las compañias a recargar
	var tipoempresaRecarga='';
	
/****************** Fin Variables Globales para Servicios Publicos**********************/


///////////////////////////////////////////////////////////////////
//de aqui en adelante van los metodos que necesitamos implementar//
///////////////////////////////////////////////////////////////////

///////////////////////metodos utilizados en el login///////////////////////////////////////
//metodo que consulta numeros de cuenta de un cliente
function numCuenta(id){
	
	  $.get('https://as400-daiman20.c9.io/api/users/numCuenta',
  { 
   idusercon: id,
  },function( data ) {
   console.log(data);
 	sessionStorage.setItem('numCuen',data.numC);
 //	alert(sessionStorage.getItem('numCuen'));
 }).fail(function(err){
   console.log(err);
   alert('Error [' + err.responseText + ']');
  });
}
//carga la info de home 
  ///////////////////////////////////////////////////////////
 function initInfo ($scope){
    $.get('https://as400-daiman20.c9.io/api/users/dataclient',
  { 
   idusercon: sessionStorage.getItem('id'),
  },function( data ) {
   console.log(data);
   //agredo variables a session para mostrarlo en el de consultar cuenta
   sessionStorage.setItem('user',data.dsCli.username);
			sessionStorage.setItem('nom1',data.dsCli.firstname);
			sessionStorage.setItem('nom2',data.dsCli.secondname);
			//////////////////////////////////////////////////
   $scope.idUsuario=data.idUserCon;
				$scope.user=data.dsCli.username;
				$scope.nom1=data.dsCli.firstname;
    $scope.nom2=data.dsCli.secondname;
    $scope.idcliente=data.dsCli.numberClientID;
    $scope.nac=data.dsCli.nationality;
    $scope.fecha=data.dsCli.birthdate;
    $scope.distrito=data.dsCli.districtName;
    $scope.direc=(data.dsCli.cantonName.toString()+' '+data.dsCli.provinceName.toString()+' '+data.dsCli.address.toString());
    $scope.idtipo=data.dsCli.nameTypeID;
    //esta parte es para mostrar la cuenta maestra
    var usr=data.idUserCon;
    $.get('https://as400-daiman20.c9.io/api/users/acountClient',
  { 
   iduseracount:usr
  },function( data ) {
   console.log(data);
var cuenta =data.cuentasString.split('*');

$scope.cuMaestra=cuenta[0];
//en esta parte consultamos el saldo
var datosUsuario =cuenta[0];
    $.get('https://as400-daiman20.c9.io/api/acounts/dataAcount',
  { 
   idacount: datosUsuario,
  },function( data ) {
   console.log(data);
   $scope.saldoInfo=data.dsAcount.balance;
 }).fail(function(err){
   console.log(err);
   //alert('Error [' + err.responseText + ']');
  });
//////////////////////////////////
  }).fail(function(err){
   console.log(err);
  
  });
  /////////////////////////////////
  }).fail(function(err){
   console.log(err);
   //este error es de carga de datos
   //alert('Error [' + err.responseText + ']');
  /// window.location="index.html";//limpia el url que queda
  });
}

  ///////////////////////// metodos usados en la pantalla principal//////////////////////////////////////
  // metodo que direcciona al index
  function sendAway() {
window.location="index.html";
 }
		
	




function numCuenta(){
	var datosUsuario = sessionStorage.getItem('id');
	  $.get('https://as400-daiman20.c9.io/api/users/numCuenta',
  { 
   idusercon: datosUsuario,
  },function( data ) {
   console.log(data);
 	sessionStorage.setItem('numCuen',data.numC);
 //	alert(sessionStorage.getItem('numCuen'));
 }).fail(function(err){
   console.log(err);
   //alert('Error [' + err.responseText + ']');
  });
  
}
	
	

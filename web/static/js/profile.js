export var App = {
  run: function(id){
   	 var jQuery = require('jquery');
   	 var location = "http://192.168.226.62/404notfound-server/GetProfile?Unique_ID=" + id;
   	 console.log("HELLO");

   	 jQuery.get( location, function( data, status ) {
   	 		console.log(data);
		  //alert( "Data Loaded: " + data + "   " + data.Status)
		  jQuery("#Status").text(data.Status);
		  jQuery("#Category").text(data.Category);
		  jQuery("#Output_Area").text(data.Output_Area);
		  jQuery("#Accomodation_Type").text(data.Accomodation_Type);
		  jQuery("#Gender").text(data.Gender);
		  jQuery("#Birth_Year").text(data.Birth_Year);
		  jQuery("#Status_Prior_To_Dormant").text(data.Status_Prior_To_Dormant);
		  jQuery("#Output_Area_CenX_EPSG27700").text(data.Output_Area_CenX_EPSG27700);
		  jQuery("#Output_Area_CenY_EPSG27700").text(data.Output_Area_CenX_EPSG27700);
		  jQuery("#Date_Status_Changed_To_Unconfi").text(data.Date_Status_Changed_To_Unconfi);
		  jQuery("#Date_Went_Missing").text(data.Date_Went_Missing);
		  jQuery("#long").text(data.long);
		  jQuery("#Date_Record_Updated").text(data.Date_Record_Updated);
		  jQuery("#Date_Record_Created").text(data.Date_Record_Created);
		  jQuery("#Borough").text(data.Borough);
		  jQuery("#Status").text(data.Status);
		  jQuery("#Forenames").text(data.Forenames);
		  jQuery("#Surname").text(data.Surname);
		  jQuery("Date_Last_Seen").text(data.Date_Last_Seen);
		  jQuery("lat").text(data.lat);



	 });
  }
}

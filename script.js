$(document).ready(function() {
    // construct the table data with the HTML String
     function constructUserTableData (userData) {
                    let userRow ='';
                    let sNo = 1;
                    if(userData.length){
                        // for each for iteration of  the array
                        userData.forEach(user => {
                            userRow += "<tr>" +
                                "<td>"+sNo+"</td>"+
                                "<td>"+user.firstName+"</td>"+
                                "<td>"+user.lastName+"</td>"+
                                "<td>"+user.mobile+"</td>"+
                                "<td>"+user.email+"</td>"+
                                "<td>"+user.city+"</td>"+
                                "<td><a href='#' id='edit-"+user.id+"' class='edit'><span class='glyphicon glyphicon-edit'></span></a>"+
                                "<td><a href='#'' id='delete-"+user.id+"' class='delete'><span class='glyphicon glyphicon-trash'></span></a>"
                                "</tr>";
                            sNo++;
                        });
                    }else{
                    userRow = '<td colspan="8">No Data to Display</td>' ; // if no data is available
                    }
                    $('#userData').html(userRow); // printing the data in the tbody using jQuery
                };
            constructUserTableData(jsonObject.data);
            //for alert msg to show login and disappear 
            $("#contact").click(function() {
                $("#alertMsg").show();
                $("#alertMsg").fadeOut(5000);
            });
            
            var userName = "john123";
            var password = "john@123";
            
            //login authentication
            
            $("#login").click(function() {
                    let isLogined = false;
                    jsonObject.data.forEach(user => {
                        if(user.loginName === userName && user.password === password) { 
                            isLogined = true;
                        };
                    });
                    if(isLogined) {
                        alert("Logged in Successfully");
                    } else {
                        alert("Authentication Failed");
                    }
                });
            
                // filter  search function
            $("#searchUser").click(function() {
                let keyword = $('#searchKeyword').val();
                let filteredValue = jsonObject.data.filter(function (user) {
                    return (user.firstName === keyword || user.lastName === keyword || user.mobile === keyword || user.email === keyword || user.city === keyword);
                    });
                constructUserTableData(filteredValue);
            });
            // checking if the user is Admin
            function checkUserIsAdmin(id) {            
                return jsonObject.data.filter(function(user){
                    return user.id === id && user.role === 'admin';
                });
            }
            //Edit function for admin role
            $(".edit").on("click", function() {
                let id = $(this).attr('id').replace('edit-','');
                if(checkUserIsAdmin(id).length) {
                    //editable..
                } else {
                    alert("Not authorized to edit contacts!")
                }
            });
            //delete function for admin role
            $(".delete").on("click", function() {
                let id = $(this).attr('id').replace('delete-','');
                if(checkUserIsAdmin(id).length) {
                    if(confirm('Are you sure to delete?')) {                
                        let filteredValue = jsonObject.data.filter(function(user){
                            return user.id !== id;
                        });
                        constructUserTableData(filteredValue);
                    }
                } else {
                    alert("Not authorized to delete contacts!")
                }
            });
        });

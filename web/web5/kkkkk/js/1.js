var qqq = 0;            //添加or编辑
var editrow = 1;        //修改行
var node;

                                                               //添加行
function appendRow(index) 
{
    var myTable = document.getElementById("myTable");
    var row = myTable.insertRow(index);
    var otherCheck = row.insertCell(0);
    var movieImg = row.insertCell(1);
    var movieName = row.insertCell(2);
    var movieKind = row.insertCell(3);
    var actorName = row.insertCell(4);
    var movieScore = row.insertCell(5);
    var movieDate = row.insertCell(6);
    var movieCheck = row.insertCell(7);
    var otherEdit = row.insertCell(8);
    otherCheck.innerHTML = "<input type='checkbox' name='checkItem' value=''/>";
    movieImg.innerHTML = node;
    movieName.innerHTML = document.getElementById("mname").value;
    movieKind.innerHTML = document.getElementById("komovie").value;
    actorName.innerHTML = document.getElementById("aname").value;
    movieScore.innerHTML = document.getElementById("mscore").value;
    movieDate.innerHTML = document.getElementById("mdate").value;
    movieCheck.innerHTML = document.getElementById("mcheck").value;
    otherEdit.innerHTML = "<a onclick='edit(this)' class='tablelink'>编辑</a><a onclick='deleteRow(this)' class='tablelink'>删除</a>"
}

                                                                    //删除行
function deleteRow(btnDelete) 
{
    var deleteJudge = window.confirm("Are you sure?");
    if (deleteJudge == true) 
	{
        var currentIndex = btnDelete.parentNode.parentNode.rowIndex;
        var myTable = document.getElementById("myTable");
        myTable.deleteRow(currentIndex);
    } 
	else 
	{
        alert("撤回啦撤回啦~");
    }

}

                                                           //添加按钮
function add() 
{
    var formid = "movieform";
    ClearForm(formid);
    alert("去右边编辑保存啦");
    document.form.elements[1].focus();
    qqq = 1;
}

                                                 //编辑前
function edit(btnEdit) 
{
    qqq = 0;
    document.form.elements[1].focus();
    var currentIndex = btnEdit.parentNode.parentNode.rowIndex; 
    editrow = currentIndex;
    var x = document.getElementById("myTable").rows[currentIndex].cells;
    document.getElementById("mname").value = x[2].innerHTML;
    document.getElementById("komovie").value = x[3].innerHTML;
    document.getElementById("aname").value = x[4].innerHTML;
    document.getElementById("mscore").value = x[5].innerHTML;
    document.getElementById("mdate").value = x[6].innerHTML;
}

                                                 //编辑后
function editRow(index)
{
    var x = document.getElementById("myTable").rows[editrow].cells;
    x[1].innerHTML = node;
    x[2].innerHTML = document.getElementById("mname").value;
    x[3].innerHTML = document.getElementById("komovie").value;
    x[4].innerHTML = document.getElementById("aname").value;
    x[5].innerHTML = document.getElementById("mscore").value;
    x[6].innerHTML = document.getElementById("mdate").value;
    x[7].innerHTML = document.getElementById("mcheck").value;
}

                                                   //保存
function save() 
{
    if (qqq == 1) 
	{
        var flag = dataCheck();
        if (flag) 
		{
			var index = myTable.rows.length;
			appendRow(index);
            alert("添加是添加！成功啦~");
        }
        qqq=0;
    } 
	else 
	{
        var flag1 = dataCheck();
        if (flag1) 
		{
			var index = editrow;
			editRow(index);
            alert("修改是修改！成功啦~");
        }
    }
}

                                                           //清空表单
function ClearForm(id) 
{
    var objId = document.getElementById(id);
    if (objId == undefined) 
	{
        return;
    }
    for (var i = 0; i < objId.elements.length; i++) 
	{
        if (objId.elements[i].type == "text") 
		{
            objId.elements[i].value = "";
        }
        else if (objId.elements[i].type == "password") 
		{
            objId.elements[i].value = "";
        }
        else if (objId.elements[i].type == "radio") 
		{
            objId.elements[i].checked = false;
        }
        else if (objId.elements[i].type == "checkbox") 
		{
            objId.elements[i].checked = false;
        }
        else if (objId.elements[i].type == "select-one") 
		{
            objId.elements[i].options[0].selected = true;
        }
        else if (objId.elements[i].type == "select-multiple") 
		{
            for (var j = 0; j < objId.elements[i].options.length; j++) 
			{
                objId.elements[i].options[j].selected = false;
            }
        }
        else if (objId.elements[i].type == "textarea") 
		{
           objId.elements[i].value = "";
        }
        else if (objId.elements[i].type == "file") 
		{
            var file = objId.elements[i];
            if (file.outerHTML) 
			{
                file.outerHTML = file.outerHTML;
            } 
		    else 
			{
                file.value = ""; // FF(包括3.5)
            }
        }
    }
}

                                                                        //数据完整性
function dataCheck() 
{
    for (var i = 1; i < document.form.elements.length - 1; i++) 
	{
        if (document.form.elements[i].value == "") 
		{
            alert("请将信息输入完整");
            document.form.elements[i].focus();
            return false;
        }
    }
    return true;
}

                                                                      //海报
function showPic(obj) 
{
    if (fileUrl != null) 
	{
        document.getElementById("preview").src = fileUrl;
        document.getElementById("preview").style = "opacity:1";
    }
}


function changeimg()
{
    var getImage = document.getElementById("uploadimg");
    getImage.oninput = function()
	{
        var file = this.files;
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = function()
		{
            var image = document.createElement("img");
            image.width = "75";
            image.height = "100";
            image.src = reader.result;
            node = "<img width='75' height='100' src='"+reader.result+"'>";
        }
    }
    return node;
    console.log("node is:"+node);
}
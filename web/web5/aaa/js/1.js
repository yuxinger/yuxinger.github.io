var AddorEdit = 0;//判断添加操作or编辑操作
var editrow = 1;//修改的是第几行
var FILE_URL = "image/电影.png" ;
var node;

//添加一行
function appendRow(index) {
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
    otherEdit.innerHTML = "<a onclick='edit(this)' class='tablelink'>编辑</a> <a onclick='deleteRow(this)' class='tablelink'>删除</a>"
}

//删除一行
function deleteRow(btnDelete) {
    var deleteJudge = window.confirm("确认删除？");
    if (deleteJudge == true) {
        //获得被单击链接所在行的索引
        var currentIndex = btnDelete.parentNode.parentNode.rowIndex;
        var myTable = document.getElementById("myTable");
        myTable.deleteRow(currentIndex);
    } else {
        alert("您已取消删除操作");
    }

}


//尾部新增一行
function insertEnd() {
    var index = myTable.rows.length;
    appendRow(index);
}

//点击添加按钮触发事件
function add() {
    var formid = "movieform";
    ClearForm(formid);
    alert("请于右侧记录编辑中输入待添加内容并保存~");
    document.form.elements[1].focus();
    AddorEdit = 1;
}

//编辑--表格数据给表单
function edit(btnEdit) {
    AddorEdit = 0;
    document.form.elements[1].focus();
    var currentIndex = btnEdit.parentNode.parentNode.rowIndex; //获得被单击链接所在行的索引
    editrow = currentIndex;
    var x = document.getElementById("myTable").rows[currentIndex].cells;//获得该行所有单元格数组
    //表格数据赋值给表单作为默认数据
    
    document.getElementById("mname").value = x[2].innerHTML;
    document.getElementById("komovie").value = x[3].innerHTML;
    document.getElementById("aname").value = x[4].innerHTML;
    document.getElementById("mscore").value = x[5].innerHTML;
    document.getElementById("mdate").value = x[6].innerHTML;
}

//编辑--表单数据传回表格
function editRow(index){
    var x = document.getElementById("myTable").rows[editrow].cells;//获得该行所有单元格数组
    x[1].innerHTML = node;
    x[2].innerHTML = document.getElementById("mname").value;
    x[3].innerHTML = document.getElementById("komovie").value;
    x[4].innerHTML = document.getElementById("aname").value;
    x[5].innerHTML = document.getElementById("mscore").value;
    x[6].innerHTML = document.getElementById("mdate").value;
    x[7].innerHTML = document.getElementById("mcheck").value;
}

function editShow(){
    var index = editrow;
    editRow(index);
}
//保存按钮触发事件
function save() {
   
    if (AddorEdit == 1) {
        var flag = dataCheck();
        if (flag) {
            insertEnd();
            alert("添加成功！");
        }
        AddorEdit=0;
    } else {
        var flag1 = dataCheck();
        if (flag1) {
            editShow();
            alert("修改成功！");
        }

    }


}

//清空表单
function ClearForm(id) {
    var objId = document.getElementById(id);
    if (objId == undefined) {
        return;
    }
    for (var i = 0; i < objId.elements.length; i++) {
        if (objId.elements[i].type == "text") {
            objId.elements[i].value = "";
        }
        else if (objId.elements[i].type == "password") {
            objId.elements[i].value = "";
        }
        else if (objId.elements[i].type == "radio") {
            objId.elements[i].checked = false;
        }
        else if (objId.elements[i].type == "checkbox") {
            objId.elements[i].checked = false;
        }
        else if (objId.elements[i].type == "select-one") {
            objId.elements[i].options[0].selected = true;
        }
        else if (objId.elements[i].type == "select-multiple") {
            for (var j = 0; j < objId.elements[i].options.length; j++) {
                objId.elements[i].options[j].selected = false;
            }
        }
        else if (objId.elements[i].type == "textarea") {
            objId.elements[i].value = "";
        }
        else if (objId.elements[i].type == "file") {
            var file = objId.elements[i];
            if (file.outerHTML) {
                file.outerHTML = file.outerHTML;
            } else {
                file.value = ""; // FF(包括3.5)
            }
        }
    }
}

//数据合规性检验
function dataCheck() {
    for (var i = 1; i < document.form.elements.length - 1; i++) {
        if (document.form.elements[i].value == "") {
            alert("请将信息输入完整");
            document.form.elements[i].focus();
            return false;
        }
    }
    return true;
}

//预览图
function showPic(obj) {
    var fileUrl = getObjectURL(obj.files[0]);
    if (fileUrl != null) {
        document.getElementById("preview").src = fileUrl;      // 图片预览
        document.getElementById("preview").style = "opacity:1";
    }
}
//建立一个可存取到该file的url
function getObjectURL(file) {
    var url = null;
    return url;
}

function changeimg(){
    var getImage = document.getElementById("uploadimg");
    getImage.oninput = function(){
        var file = this.files;
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = function(){
            var image = document.createElement("img");
            image.width = "79";
            image.height = "109";
            image.src = reader.result;
            node = "<img width='79' height='109' src='"+reader.result+"'>";
        }
    }
    return node;
    console.log("node is:"+node);
}
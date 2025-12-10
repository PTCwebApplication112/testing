var GlobalKey = GetUserSession('Key');
var GlobalAppAccessId = GetUserSession('AppAccessID');

var AppAccessTypeId;
var GlobalAppAccessId;
var GlobalBrId;
var GlobalSchoolId;


$(document).ready(function () {

    GlobalBrId = GetUserSession('BRId');

    GlobalSchoolId = GetUserSession('SchoolId');

    GlobalAppAccessId = GetUserSession('AppAccessID');

    AppAccessTypeId = GetUserSession('AppAccessTypeID');

    CheckValidUserRequest(GlobalAppAccessId);


    $('select').select2();

    ResetControl();

    $("#ddlBranchStudentList").off('select2-opening');
    $("#ddlBranchStudentList").select2().on("select2-opening", function () {

        if (AppAccessTypeId == 101) {
            BindBranchDropDown('ddlBranchStudentList', 0, 'GETBRANCH', GlobalBrId, 0);
        }
        else if (AppAccessTypeId == 102) {
            BindBranchDropDown('ddlBranchStudentList', 0, 'GETBRANCH', 0, GlobalBrId);
        } else {
            BindBranchListLocal('ddlBranchStudentList', 0);
        }

        $("#ddlBranchStudentList").unbind('change');
        $("#ddlBranchStudentList").change(function () {

            $('#validationAddStudent').hide();
            $('#validationAddStudent span').html('');
            $("#ddlBranchStudentList").removeClass('error_focus');

            $('#ddlClassStudentList').select2('val', 0);
            $('#ddlClassStudentList').find('option').not(':first').remove();

            $('#ddlSection').select2('val', 0);
            $('#ddlSection').find('option').not(':first').remove();

            $('#ddlExaminationName').select2('val', 0);
            $('#ddlExaminationName').find('option').not(':first').remove();

            if ($("#ddlBranchStudentList").val() > 0) {
                $("#ddlClassStudentList").off('select2-opening');
                $("#ddlClassStudentList").select2().on("select2-opening", function () {

                    BindClass('ddlClassStudentList', 0, $("#ddlBranchStudentList").val(), 0, 'GET');

                    $("#ddlClassStudentList").unbind('change')
                    $("#ddlClassStudentList").change(function () {



                        $('#validationAddStudent').hide();
                        $('#validationAddStudent span').html('');
                        $("#ddlClassStudentList").removeClass('error_focus');

                        $('#ddlSection').select2('val', 0);
                        $('#ddlSection').find('option').not(':first').remove();

                        $('#ddlExaminationName').select2('val', 0);
                        $('#ddlExaminationName').find('option').not(':first').remove();


                        if ($("#ddlClassStudentList").val() > 0) {

                            $("#ddlSection").off('select2-opening');
                            $("#ddlSection").select2().on("select2-opening", function () {
                                debugger

                                BindSection('ddlSection', 0, $("#ddlClassStudentList").val(), $("#ddlBranchStudentList").val());

                                $("#ddlSection").unbind('change')
                                $("#ddlSection").change(function () {

                                    $('#ddlExaminationName').select2('val', 0);
                                    $('#ddlExaminationName').find('option').not(':first').remove();

                                    BindExamListDropDown('ddlExaminationName');

                                    $('#validationAddStudent').hide();
                                    $('#validationAddStudent span').html('');
                                    $("#ddlSection").removeClass('error_focus');

                                });
                            });
                        }
                        else {
                            $("#ddlSection").off('select2-opening');
                            $("#ddlExaminationName").off('select2-opening');

                        }

                    });
                });

            }
            else {
                $("#ddlClassStudentList").off('select2-opening');
                $("#ddlSection").off('select2-opening');
                $("#ddlExaminationName").off('select2-opening');


            }
        });
    });

    $("#ddlSection").off('select2-opening');
    $("#ddlSection").select2().on("select2-opening", function () {
        debugger

        BindSection('ddlSection', 0, $("#ddlClassStudentList").val(), $("#ddlBranchStudentList").val());

        $("#ddlSection").unbind('change')
        $("#ddlSection").change(function () {

            $('#ddlExaminationName').select2('val', 0);
            $('#ddlExaminationName').find('option').not(':first').remove();

            BindExamListDropDown('ddlExaminationName');

            $('#validationAddStudent').hide();
            $('#validationAddStudent span').html('');
            $("#ddlSection").removeClass('error_focus');

        });
    });

    $('#btnGetStudent').unbind('click');
    $('#btnGetStudent').click(function () {
        debugger

        if (GlobalSchoolId == 1122) {
            GetManageDatesheetDetails_NewAdarsh()
        }
        else { 

        //$('#divAddGameMaster').slideDown();
            GetManageDatesheetDetails();

        }
        //reset();

    });

    $('#btnPrint').unbind('click');
    $('#btnPrint').click(function () {

        PrintRegFeeSlip3();

    });
});

function ResetControl() {

    $('#validationAddStudent').hide();
    $('#validationAddStudent span').html('');
    $(".error_focus").removeClass('error_focus');

    $('#ddlBranchStudentList').select2('val', 0);

    $('#ddlClassStudentList').select2('val', 0);
    $('#ddlClassStudentList').find('option').not(':first').remove();

    $('#ddlSection').select2('val', 0);
    $('#ddlSection').find('option').not(':first').remove();

    $('#ddlExaminationName').select2('val', 0);
    $('#ddlExaminationName').find('option').not(':first').remove();

}

function BindClass(ControlId, SelectedValue, BranchId, SchoolId, Action) {
    debugger


    var BO = {
        "objClassMaster":
        {
            "Key": GlobalKey,
            "ClassId": 0,
            "Action": Action,
            "BranchId": BranchId,
            "SchoolId": SchoolId,
            "InsertedUserID": GlobalBrId
        }
    };
    $('#' + ControlId).unbind("select2-opening");
    $('#' + ControlId).find('option').not(':first').remove();
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetDeleteClassMasterList",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            ShowHideSelectBoxLoading(1, ControlId);
        },
        success: function (response) {
            ;
            if (response.responseCode == "1") {
                if (response.responseObject != null) {
                    $.each(response.responseObject, function (i, d) {
                        $("#" + ControlId).append($("<option></option>").val(d.ClassId).html(d.ClassName));
                    });
                }
            } else {
                MessageBoxError(response.responseMessage);
            }
        },
        complete: function () {
            $("#" + ControlId).select2();
            $('#' + ControlId).select2("open");
            ShowHideSelectBoxLoading(0, ControlId)
        },
        error: function (data) {
            alert(JSON.stringify(data));
            ShowHideSelectBoxLoading(0, ControlId)
        }
    });
}

function BindSection(ControlId, SelectedValue, ClassId, BranchId) {
    debugger
    var BO = {
        "objSection":
        {
            "Key": GlobalKey,
            "ClassId": ClassId,
            "Action": 'ACTIVE',
            "BranchId": BranchId
        }
    };
    $('#' + ControlId).unbind("select2-opening");
    $('#' + ControlId).find('option').not(':first').remove();
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetClasswiseActiveSectionList",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            ShowHideSelectBoxLoading(1, ControlId);
        },
        success: function (response) {

            if (response.responseCode == "1") {
                if (response.responseObject != null) {
                    $.each(response.responseObject, function (i, d) {
                        $("#" + ControlId).append($("<option></option>").val(d.SectionMasterId).html(d.SectionName));
                    });
                }
            } else {
                MessageBoxError(response.responseMessage);
            }
            $('#' + ControlId).select2('val', SelectedValue);
        },
        complete: function () {
            $("#" + ControlId).select2();
            $('#' + ControlId).select2("open");
            ShowHideSelectBoxLoading(0, ControlId)
        },
        error: function (data) {
            alert(JSON.stringify(data));
            ShowHideSelectBoxLoading(0, ControlId)
        }
    });
}

function GetManageDatesheetDetails() {
    debugger

    var BranchId = $("#ddlBranchStudentList").val();
    var ClassId = $("#ddlClassStudentList").val();
    var SectionId = $("#ddlSection").val();
    var ExamId = $("#ddlExaminationName").val();
    debugger
    var BO =
    {
        "objPrintAdmitBO": {

            "BranchId": BranchId,
            "ClassId": ClassId,
            "SectionId": SectionId,
            "ExamId": ExamId

        }

    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetPrintAdmitCardNew",
        dataType: "json",
        data: JSON.stringify(BO),
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (response) {
            if (response.responseCode == "1") {
                if (response.responseObject != null) {
                    debugger
                    $('#printdiv').empty();
                    var MultiIcardContainer = '';
                    var count = 1;
                    $.each(response.responseObject, function (p, d) {
                        debugger
                        var subject = '';
                        var date = '';
                        var date2 = '';
                        //var i = 0;

                        var countlength = d.SubjectDateList.length;

                        $.each(d.SubjectDateList, function (a, b) {
                            debugger
                            date += "<tr><td>" + (a + 1) + "</td><td>" + b.date + "</td><td>" + b.Subject + "</td></tr>";
                            //if (a < 5) {
                            //    date += "<tr><td>" + (a + 1) + "</td><td>" + b.date + "</td><td>" + b.Subject + "</td></tr>";
                            //}
                            //else {
                            //    date2 += "<tr><td>" + (a + 1) + "</td><td>" + b.date + "</td><td>" + b.Subject + "</td></tr>";
                            //}

                        })

                        //if (countlength < 10) {
                        //    for (var i = (countlength + 1); i <= 10; i++) {
                        //        if (i <= 5) {
                        //            date += "<tr><td>" + i + "</td><td></td><td></td></tr>";
                        //        }
                        //        else {
                        //            date2 += "<tr><td>" + i + "</td><td></td><td></td></tr>";

                        //        }
                        //    }

                        //}
                        $.each(d.StudentDetailsList, function (e, f) {
                            debugger
                            var BranchName = '';
                            var ClassName = '';
                            //if (f.BranchId == 1442) {
                            //    BranchName = "Sanskar Vidya Peeth Sr. Sec. School";
                            //}
                           /* else {*/
                                BranchName = f.BranchName;

                            //}
                            if ((f.ClassMasterName).includes("XI")) {
                                ClassName = f.ClassMasterName;
                                if (Number(GlobalSchoolId) == 74) {
                                    let fieldName = f.ClassMasterName.split(" ")[1]
                                    let Classes = f.ClassMasterName.split(" ")[0]
                                    ClassName = Classes + "-" + fieldName.slice(0, 1).toUpperCase() + fieldName.slice(1).toLowerCase();
                                }

                            }
                            else {
                                //ClassName = f.ClassMasterName + "-" + f.SectionName;
                                ClassName = f.ClassMasterName + "-" + f.SectionName.slice(0, 1) + f.SectionName.slice(1).toLowerCase();
                            }

							if (f.BranchId == '1353') {
                                debugger
                                if (count == 4) {
                                    MultiIcardContainer += "<div style='margin-bottom: 2px' class='mycontainer'><div class='schoolheader'><div class='logopic'><img class='School-logo' src='" + f.BranchLogo + "' id='logo' /></div><div class='schoolnamediv'><span>" + f.BranchName + "</span></div></div><div class='schoolheader1'>Admit Card</div><div class='schoolheader2'>" + f.ExaminationName + " ("+ f.Session+")</div><div class='info'><table class='examTable'><tbody><tr><td>Name</td><td>" + f.StudentName + "</td></tr><tr><td>Father Name</td><td>" + f.FatherName + "</td></tr><tr><td>Mother Name</td><td>" + f.MotherName + "</td></tr><tr><td>D.O.B</td><td>" + f.DOB + "</td></tr><tr><td>Exam Center</td><td>" + f.ExaminationCenter + "</td></tr></tbody></table></div><div class='subjectlist'><table id='tbl1' class='examTable'><thead><tr><th>SN</th><th>Exam Date</th><th>Subject</th></tr></thead><tbody>" + date + "</tbody></table></div><div class='ExamInfo'><div><table class='examTable'><tbody><tr><td>Class</td><td>" + f.ClassMasterName + "</td></tr><tr><td>Roll No</td><td>" + f.RollNo + "</td></tr></tbody></table></div><div class='examtimediv'><table class='examTable'><thead><tr><th>Exam Time</th></tr></thead><tbody><tr class='center'><td>" + f.ExamTime + "</td></tr></tbody></table></div><div><table class='examTable'><tbody><tr><td class='tsign'><img src='" + f.TeacherSignaturePath + "' id='studentsign' /></td></tr><tr class='center'><td>Principal Sign</td></tr></tbody></table></div></div ><div class='picbox'><table class='examTable'><tbody><tr><td class='stupic'><img src='" + f.ImagePath + "' id='studentpic' /></td></tr><tr><td>Student Sign</td></tr></tbody></table></div></div ></div><div style='page-break-after:always'></div>"

                                    count = 0;
                                }
                                else {
                                    MultiIcardContainer += "<div style='margin-bottom: 2px' class='mycontainer'><div class='schoolheader'><div class='logopic'><img class='School-logo' src='" + f.BranchLogo + "' id='logo' /></div><div class='schoolnamediv'><span>" + f.BranchName + "</span></div></div><div class='schoolheader1'>Admit Card</div><div class='schoolheader2'>" + f.ExaminationName + " ("+ f.Session+")</div><div class='info'><table class='examTable'><tbody><tr><td>Name</td><td>" + f.StudentName + "</td></tr><tr><td>Father Name</td><td>" + f.FatherName + "</td></tr><tr><td>Mother Name</td><td>" + f.MotherName + "</td></tr><tr><td>D.O.B</td><td>" + f.DOB + "</td></tr><tr><td>Exam Center</td><td>" + f.ExaminationCenter + "</td></tr></tbody></table></div><div class='subjectlist'><table id='tbl1' class='examTable'><thead><tr><th>SN</th><th>Exam Date</th><th>Subject</th></tr></thead><tbody>" + date + "</tbody></table></div><div class='ExamInfo'><div><table class='examTable'><tbody><tr><td>Class</td><td>" + f.ClassMasterName + "</td></tr><tr><td>Roll No</td><td>" + f.RollNo + "</td></tr></tbody></table></div><div class='examtimediv'><table class='examTable'><thead><tr><th>Exam Time</th></tr></thead><tbody><tr class='center'><td>" + f.ExamTime + "</td></tr></tbody></table></div><div><table class='examTable'><tbody><tr><td class='tsign'><img src='" + f.TeacherSignaturePath + "' id='studentsign' /></td></tr><tr class='center'><td>Principal Sign</td></tr></tbody></table></div></div ><div class='picbox'><table class='examTable'><tbody><tr><td class='stupic'><img src='" + f.ImagePath + "' id='studentpic' /></td></tr><tr><td>Student Sign</td></tr></tbody></table></div></div ></div>"

                                }
                                count++;
                            }

                            else if (f.BranchId == '1450') {
                                debugger
                                var TempRollNo = "";
                                if (f.RollNo == 0) {
                                    TempRollNo = "";
                                } else {
                                    TempRollNo = f.RollNo;
                                }


                                if (count == 3) {
                                    MultiIcardContainer += "<div style='margin-bottom: 20px' class='mycontainer'><div class='schoolheader'><div class='logopic'><img class='School-logo' src='" + f.BranchLogo + "' id='logo' /></div><div class='schoolnamediv'><span>" + f.BranchName + "</span></div></div><div class='schoolheader1'>Admit Card</div><div class='schoolheader2'>" + f.ExaminationName + " (" + f.Session + ")</div><div class='info'><table class='examTable'><tbody><tr><td>Name</td><td>" + f.StudentName + "</td></tr><tr><td>Father Name</td><td>" + f.FatherName + "</td></tr><tr><td>Mother Name</td><td>" + f.MotherName + "</td></tr><tr><td>D.O.B</td><td>" + f.DOB + "</td></tr><tr><td>Exam Center</td><td>" + f.ExaminationCenter + "</td></tr></tbody></table></div><div class='subjectlist'><table id='tbl1' class='examTable'><thead><tr><th>SN</th><th>Exam Date</th><th>Subject</th></tr></thead><tbody>" + date + "</tbody></table></div><div class='ExamInfo'><div><table class='examTable'><tbody><tr><td>Class</td><td>" + f.ClassMasterName + "</td></tr><tr><td>Roll No</td><td>" + TempRollNo + "</td></tr></tbody></table></div><div class='examtimediv'><table class='examTable'><thead><tr><th>Exam Time</th></tr></thead><tbody><tr class='center'><td>" + f.ExamTime + "</td></tr></tbody></table></div><div><table class='examTable'><tbody><tr><td class='tsign'><img src='" + f.TeacherSignaturePath + "' id='studentsign' /></td></tr><tr class='center'><td>Principal Sign</td></tr></tbody></table></div></div ><div class='picbox'><table class='examTable'><tbody><tr><td class='stupic'><img src='" + f.ImagePath + "' id='studentpic' /></td></tr><tr><td>Student Sign</td></tr></tbody></table></div></div ></div><div style='page-break-after:always'></div>"
                                    count = 0;
                                }
                                else {
                                    MultiIcardContainer += "<div style='margin-bottom: 20px' class='mycontainer'><div class='schoolheader'><div class='logopic'><img class='School-logo' src='" + f.BranchLogo + "' id='logo' /></div><div class='schoolnamediv'><span>" + f.BranchName + "</span></div></div><div class='schoolheader1'>Admit Card</div><div class='schoolheader2'>" + f.ExaminationName + " (" + f.Session + ")</div><div class='info'><table class='examTable'><tbody><tr><td>Name</td><td>" + f.StudentName + "</td></tr><tr><td>Father Name</td><td>" + f.FatherName + "</td></tr><tr><td>Mother Name</td><td>" + f.MotherName + "</td></tr><tr><td>D.O.B</td><td>" + f.DOB + "</td></tr><tr><td>Exam Center</td><td>" + f.ExaminationCenter + "</td></tr></tbody></table></div><div class='subjectlist'><table id='tbl1' class='examTable'><thead><tr><th>SN</th><th>Exam Date</th><th>Subject</th></tr></thead><tbody>" + date + "</tbody></table></div><div class='ExamInfo'><div><table class='examTable'><tbody><tr><td>Class</td><td>" + f.ClassMasterName + "</td></tr><tr><td>Roll No</td><td>" + TempRollNo + "</td></tr></tbody></table></div><div class='examtimediv'><table class='examTable'><thead><tr><th>Exam Time</th></tr></thead><tbody><tr class='center'><td>" + f.ExamTime + "</td></tr></tbody></table></div><div><table class='examTable'><tbody><tr><td class='tsign'><img src='" + f.TeacherSignaturePath + "' id='studentsign' /></td></tr><tr class='center'><td>Principal Sign</td></tr></tbody></table></div></div ><div class='picbox'><table class='examTable'><tbody><tr><td class='stupic'><img src='" + f.ImagePath + "' id='studentpic' /></td></tr><tr><td>Student Sign</td></tr></tbody></table></div></div ></div>"
                                    
                                }
                                count++;
                            }
                            else if (f.BranchId == '1582' || GlobalSchoolId == '1239') {
                                if (count == 3) {
                                    MultiIcardContainer += "<div style='margin-bottom: 8px' class='mycontainer'><div class='schoolheader'><div class='logopic' style='height:20mm!important; width:25mm!important; border:0px!important;'><img class='School-logo' src='" + f.BranchLogo + "' id='logo' /></div><div class='schoolnamediv' style='font-family:serif!important; flex-flow:column!important; line-height:1.2!important; border:0px!important;'><span style='font-size:32px!important; font-weight:600!important;'>" + BranchName + "</span><span style='font-size:13px!important;'>" + f.AddressLine1 + "</span><span style='font-size:13px!important;'>Tel : +91-"+ f.MobileNo1 +", Email : "+ f.EmailId +" </span><span style='font-size:13px!important; margin-bottom:2px!important;'>Website : "+ f.WebsiteUrl +"</span></div></div><div class='schoolheader1'>Admit Card</div><div class='schoolheader2'>" + f.ExaminationName + "</div><div class='info'><table class='examTable'><tbody><tr><td>Name</td><td>" + f.StudentName + "</td></tr><tr><td>Father's Name</td><td>" + f.FatherName + "</td></tr><tr><td>Mother's Name</td><td>" + f.MotherName + "</td></tr></tbody></table></div><div class='subjectlist'><table id='tbl1' class='examTable'><thead><tr><th>SN</th><th>Exam Date</th><th>Subject</th></tr></thead><tbody>" + date + "</tbody></table></div><div class='ExamInfo'><div><table class='examTable'><tbody><tr><td>Class</td><td>" + ClassName + "</td></tr><tr><td>Roll No</td><td>" + f.RollNo + "</td></tr></tbody></table></div><div><table class='examTable'><thead><tr><th>Exam Time</th></tr></thead><tbody><tr class='center'><td>" + f.ExamTime + "</td></tr></tbody></table></div><div><table class='examTable'><tbody><tr><td class='tsign'><img src='" + f.TeacherSignaturePath + "' id='studentsign' /></td></tr><tr class='center'><td>Principal Sign</td></tr></tbody></table></div></div ><div class='picbox'><table class='examTable'><tbody><tr><td class='stupic'><img src='" + f.ImagePath + "' id='studentpic' /></td></tr><tr><td>Fee Counter</td></tr></tbody></table></div></div ></div><div style='page-break-after:always'></div>";

                                    count = 0;
                                }
                                else {
                                    MultiIcardContainer += "<div style='margin-bottom: 8px' class='mycontainer'><div class='schoolheader'><div class='logopic' style='height:20mm!important; width:25mm!important; border:0px!important;'><img class='School-logo' src='" + f.BranchLogo + "' id='logo' /></div><div class='schoolnamediv' style='font-family:serif!important; flex-flow:column!important; line-height:1.2!important;  border:0px!important;'><span style='font-size:32px!important; font-weight:600!important;'>" + BranchName + "</span><span style='font-size:13px!important;'>" + f.AddressLine1 + "</span><span style='font-size:13px!important;'>Tel : +91-"+ f.MobileNo1 +", Email : "+ f.EmailId +" </span><span style='font-size:13px!important; margin-bottom:2px!important;'>Website : "+ f.WebsiteUrl +"</span></div></div><div class='schoolheader1'>Admit Card</div><div class='schoolheader2'>" + f.ExaminationName + "</div><div class='info'><table class='examTable'><tbody><tr><td>Name</td><td>" + f.StudentName + "</td></tr><tr><td>Father's Name</td><td>" + f.FatherName + "</td></tr><tr><td>Mother's Name</td><td>" + f.MotherName + "</td></tr></tbody></table></div><div class='subjectlist'><table id='tbl1' class='examTable'><thead><tr><th>SN</th><th>Exam Date</th><th>Subject</th></tr></thead><tbody>" + date + "</tbody></table></div><div class='ExamInfo'><div><table class='examTable'><tbody><tr><td>Class</td><td>" + ClassName + "</td></tr><tr><td>Roll No</td><td>" + f.RollNo + "</td></tr></tbody></table></div><div><table class='examTable'><thead><tr><th>Exam Time</th></tr></thead><tbody><tr class='center'><td>" + f.ExamTime + "</td></tr></tbody></table></div><div><table class='examTable'><tbody><tr><td class='tsign'><img src='" + f.TeacherSignaturePath + "' id='studentsign' /></td></tr><tr class='center'><td>Principal Sign</td></tr></tbody></table></div></div ><div class='picbox'><table class='examTable'><tbody><tr><td class='stupic'><img src='" + f.ImagePath + "' id='studentpic' /></td></tr><tr><td>Fee Counter</td></tr></tbody></table></div></div ></div>";

                                }
                                count++;
                            }
                            else {
                                if (count == 4) {
                                    MultiIcardContainer += "<div style='margin-bottom: 8px' class='mycontainer'><div class='schoolheader'><div class='logopic'><img class='School-logo' src='" + f.BranchLogo + "' id='logo' /></div><div class='schoolnamediv'><span>" + BranchName + "</span></div></div><div class='schoolheader1'>Admit Card</div><div class='schoolheader2'>" + f.ExaminationName + "</div><div class='info'><table class='examTable'><tbody><tr><td>Name</td><td>" + f.StudentName + "</td></tr><tr><td>Father's Name</td><td>" + f.FatherName + "</td></tr><tr><td>Mother's Name</td><td>" + f.MotherName + "</td></tr></tbody></table></div><div class='subjectlist'><table id='tbl1' class='examTable'><thead><tr><th>SN</th><th>Exam Date</th><th>Subject</th></tr></thead><tbody>" + date + "</tbody></table></div><div class='ExamInfo'><div><table class='examTable'><tbody><tr><td>Class</td><td>" + ClassName + "</td></tr><tr><td>Roll No</td><td>" + f.RollNo + "</td></tr></tbody></table></div><div><table class='examTable'><thead><tr><th>Exam Time</th></tr></thead><tbody><tr class='center'><td>" + f.ExamTime + "</td></tr></tbody></table></div><div><table class='examTable'><tbody><tr><td class='tsign'><img src='" + f.TeacherSignaturePath + "' id='studentsign' /></td></tr><tr class='center'><td>Principal Sign</td></tr></tbody></table></div></div ><div class='picbox'><table class='examTable'><tbody><tr><td class='stupic'><img src='" + f.ImagePath + "' id='studentpic' /></td></tr><tr><td>Student Sign</td></tr></tbody></table></div></div ></div><div style='page-break-after:always'></div>";

                                count = 0;
                            }
                                else {
                                    MultiIcardContainer += "<div style='margin-bottom: 8px' class='mycontainer'><div class='schoolheader'><div class='logopic'><img class='School-logo' src='" + f.BranchLogo + "' id='logo' /></div><div class='schoolnamediv'><span>" + BranchName + "</span></div></div><div class='schoolheader1'>Admit Card</div><div class='schoolheader2'>" + f.ExaminationName + "</div><div class='info'><table class='examTable'><tbody><tr><td>Name</td><td>" + f.StudentName + "</td></tr><tr><td>Father's Name</td><td>" + f.FatherName + "</td></tr><tr><td>Mother's Name</td><td>" + f.MotherName + "</td></tr></tbody></table></div><div class='subjectlist'><table id='tbl1' class='examTable'><thead><tr><th>SN</th><th>Exam Date</th><th>Subject</th></tr></thead><tbody>" + date + "</tbody></table></div><div class='ExamInfo'><div><table class='examTable'><tbody><tr><td>Class</td><td>" + ClassName + "</td></tr><tr><td>Roll No</td><td>" + f.RollNo + "</td></tr></tbody></table></div><div><table class='examTable'><thead><tr><th>Exam Time</th></tr></thead><tbody><tr class='center'><td>" + f.ExamTime + "</td></tr></tbody></table></div><div><table class='examTable'><tbody><tr><td class='tsign'><img src='" + f.TeacherSignaturePath + "' id='studentsign' /></td></tr><tr class='center'><td>Principal Sign</td></tr></tbody></table></div></div ><div class='picbox'><table class='examTable'><tbody><tr><td class='stupic'><img src='" + f.ImagePath + "' id='studentpic' /></td></tr><tr><td>Student Sign</td></tr></tbody></table></div></div ></div>";

                            }
                            count++;
                            }
                        });


                    });
                    //$('#printdiv tbody').remove();
                    $('#printdiv').append(MultiIcardContainer);
                    if (Number(GlobalSchoolId) === 74) {
                        document.querySelectorAll(".schoolnamediv").forEach(el => {

                            el.textContent = el.textContent
                                .toLowerCase()
                                .replace(/\b\w/g, char => char.toUpperCase());
                        });

                    }

                    $('select').select2();
                }
            }
        },
        complete: function () {
            debugger
            setTimeout(function () { $("#loader_home").fadeOut("slow"); }, 1);
            //PrintRegFeeSlip3();
        },
        error: function (data) {
            MessageBoxError(JSON.stringify(data));
            setTimeout(function () { $("#loader_home").fadeOut("slow"); }, 1);
        }

    });

}

function GetManageDatesheetDetails_NewAdarsh() {
    debugger

    var BranchId = $("#ddlBranchStudentList").val();
    var ClassId = $("#ddlClassStudentList").val();
    var SectionId = $("#ddlSection").val();
    var ExamId = $("#ddlExaminationName").val();
    debugger
    var BO =
    {
        "objPrintAdmitBO": {

            "BranchId": BranchId,
            "ClassId": ClassId,
            "SectionId": SectionId,
            "ExamId": ExamId

        }

    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetPrintAdmitCardNew",
        dataType: "json",
        data: JSON.stringify(BO),
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (response) {
            if (response.responseCode == "1") {
                if (response.responseObject != null) {
                    debugger
                    $('#printdiv').empty();
                    var MultiIcardContainer = '';
                    var count = 1;
                    $.each(response.responseObject, function (p, d) {
                        debugger

                        console.log()
                        var subject = '';
                        var date = '';
                        var date2 = '';
                        //var i = 0;

                        var countlength = d.SubjectDateList.length;

                        $.each(d.SubjectDateList, function (a, b) {
                            debugger
                            date += "<tr><td>" + (a + 1) + "</td><td>" + b.date + "</td><td>" + b.Subject + "</td></tr>";
                            //if (a < 5) {
                            //    date += "<tr><td>" + (a + 1) + "</td><td>" + b.date + "</td><td>" + b.Subject + "</td></tr>";
                            //}
                            //else {
                            //    date2 += "<tr><td>" + (a + 1) + "</td><td>" + b.date + "</td><td>" + b.Subject + "</td></tr>";
                            //}

                        })

                        //if (countlength < 10) {
                        //    for (var i = (countlength + 1); i <= 10; i++) {
                        //        if (i <= 5) {
                        //            date += "<tr><td>" + i + "</td><td></td><td></td></tr>";
                        //        }
                        //        else {
                        //            date2 += "<tr><td>" + i + "</td><td></td><td></td></tr>";

                        //        }
                        //    }

                        //}
                        $.each(d.StudentDetailsList, function (e, f) {
                            debugger
                            var BranchName = '';
                            var ClassName = '';
                            if (f.BranchId == 1442) {
                                BranchName = "Sanskar Vidya Peeth Sr. Sec. School";
                            }
                            else {
                                BranchName = f.BranchName;

                            }
                            if ((f.ClassMasterName).includes("XI")) {
                                ClassName = f.ClassMasterName;
                            }
                            else {
                                ClassName = f.ClassMasterName + " " + f.SectionName;
                            }

                            if (f.BranchId == '1353') {
                                debugger
                                if (count == 4) {
                                    MultiIcardContainer += "<div style='margin-bottom: 2px' class='mycontainer'><div class='schoolheader'><div class='logopic'><img class='School-logo' src='" + f.BranchLogo + "' id='logo' /></div><div class='schoolnamediv'><span>" + f.BranchName + "</span></div></div><div class='schoolheader1'>Admit Card</div><div class='schoolheader2'>" + f.ExaminationName + " ("+ f.Session+")</div><div class='info'><table class='examTable'><tbody><tr><td>Name</td><td>" + f.StudentName + "</td></tr><tr><td>Father Name</td><td>" + f.FatherName + "</td></tr><tr><td>Mother Name</td><td>" + f.MotherName + "</td></tr><tr><td>D.O.B</td><td>" + f.DOB + "</td></tr><tr><td>Exam Center</td><td>" + f.ExaminationCenter + "</td></tr></tbody></table></div><div class='subjectlist'><table id='tbl1' class='examTable'><thead><tr><th>SN</th><th>Exam Date</th><th>Subject</th></tr></thead><tbody>" + date + "</tbody></table></div><div class='ExamInfo'><div><table class='examTable'><tbody><tr><td>Class</td><td>" + f.ClassMasterName + "</td></tr><tr><td>Roll No</td><td>" + f.RollNo + "</td></tr></tbody></table></div><div class='examtimediv'><table class='examTable'><thead><tr><th>Exam Time</th></tr></thead><tbody><tr class='center'><td>" + f.ExamTime + "</td></tr></tbody></table></div><div><table class='examTable'><tbody><tr><td class='tsign'><img src='" + f.TeacherSignaturePath + "' id='studentsign' /></td></tr><tr class='center'><td>Principal Sign</td></tr></tbody></table></div></div ><div class='picbox'><table class='examTable'><tbody><tr><td class='stupic'><img src='" + f.ImagePath + "' id='studentpic' /></td></tr><tr><td>Student Sign</td></tr></tbody></table></div></div ></div><div style='page-break-after:always'></div>"

                                    count = 0;
                                }
                                else {
                                    MultiIcardContainer += "<div style='margin-bottom: 2px' class='mycontainer'><div class='schoolheader'><div class='logopic'><img class='School-logo' src='" + f.BranchLogo + "' id='logo' /></div><div class='schoolnamediv'><span>" + f.BranchName + "</span></div></div><div class='schoolheader1'>Admit Card</div><div class='schoolheader2'>" + f.ExaminationName + " ("+ f.Session+")</div><div class='info'><table class='examTable'><tbody><tr><td>Name</td><td>" + f.StudentName + "</td></tr><tr><td>Father Name</td><td>" + f.FatherName + "</td></tr><tr><td>Mother Name</td><td>" + f.MotherName + "</td></tr><tr><td>D.O.B</td><td>" + f.DOB + "</td></tr><tr><td>Exam Center</td><td>" + f.ExaminationCenter + "</td></tr></tbody></table></div><div class='subjectlist'><table id='tbl1' class='examTable'><thead><tr><th>SN</th><th>Exam Date</th><th>Subject</th></tr></thead><tbody>" + date + "</tbody></table></div><div class='ExamInfo'><div><table class='examTable'><tbody><tr><td>Class</td><td>" + f.ClassMasterName + "</td></tr><tr><td>Roll No</td><td>" + f.RollNo + "</td></tr></tbody></table></div><div class='examtimediv'><table class='examTable'><thead><tr><th>Exam Time</th></tr></thead><tbody><tr class='center'><td>" + f.ExamTime + "</td></tr></tbody></table></div><div><table class='examTable'><tbody><tr><td class='tsign'><img src='" + f.TeacherSignaturePath + "' id='studentsign' /></td></tr><tr class='center'><td>Principal Sign</td></tr></tbody></table></div></div ><div class='picbox'><table class='examTable'><tbody><tr><td class='stupic'><img src='" + f.ImagePath + "' id='studentpic' /></td></tr><tr><td>Student Sign</td></tr></tbody></table></div></div ></div>"

                                }
                                count++;
                            }

                            else if (SchoolId == 1122) {


                                MultiIcardContainer += "<div style='border:1px black solid;margin-bottom:2%'> <div style='margin-bottom: 1px' class='mycontainer'> <div class='schoolheader'> <div class='logopic'><img class='School-logo' src='" + f.BranchLogo + "' id='logo' /></div> <div class='schoolnamediv'><span>" + f.BranchName + "</span></div> </div> <div class='schoolheader1'>Admit Card</div> <div class='schoolheader2'>" + f.ExaminationName + " (" + f.Session + ")</div> <div class='info'> <table class='examTable'> <tbody> <tr> <td>Name</td> <td>" + f.StudentName + "</td> </tr> <tr> <td>Father Name</td> <td>" + f.FatherName + "</td> </tr> <tr> <td>Mother Name</td> <td>" + f.MotherName + "</td> </tr> <tr> <td>D.O.B</td> <td>" + f.DOB + "</td> </tr> <tr> <td>Exam Center</td> <td>" + f.ExaminationCenter + "</td> </tr> </tbody> </table> </div> <div class='subjectlist'> <table id='tbl1' class='examTable'> <thead> <tr> <th>SN</th> <th>Exam Date</th> <th>Subject</th> </tr> </thead> <tbody>" + date + "</tbody> </table> </div> <div class='ExamInfo'> <div> <table class='examTable'> <tbody> <tr> <td>Class</td> <td>" + f.ClassMasterName + "</td> </tr> <tr> <td>Roll No</td> <td>" + f.RollNo + "</td> </tr> </tbody> </table> </div> <div class='examtimediv'> <table class='examTable'> <thead> <tr> <th>Exam Time</th> </tr> </thead> <tbody> <tr class='center'> <td>" + f.ExamTime + "</td> </tr> </tbody> </table> </div> <div> <table class='examTable'> <tbody> <tr> <td class='tsign'><img src='" + f.TeacherSignaturePath + "' id='studentsign' /></td> </tr> <tr class='center'> <td>Principal Sign</td> </tr> </tbody> </table> </div> </div> <div class='picbox'> <table class='examTable'> <tbody> <tr> <td class='stupic'><img src='" + f.ImagePath + "' id='studentpic' /></td> </tr> <tr> <td>Student Sign</td> </tr> </tbody> </table> </div> </div> <div class='row' style='margin:0;padding-left:1%'> <P class='Note'>  </P> </div> <div style='padding-left:10px;'><div ><b>Instruction for Parents/Students during December Exam:- </b></div><div>1. Computer Exam of Classes 6th and 7th will be held on 12th December 2025.</div><div>2. Parents- Teachers Meeting will be held on 31st December 2025.</div></div></div>";
                                if (count == 3) {
                                    MultiIcardContainer += "<div style='page-break-after:always'></div>";

                                    count = 0;




                                }
                                count++;
                            }
                            else {
                              
                            
                                    MultiIcardContainer += "<div style='border:1px black solid;margin-bottom:2%'> <div style='margin-bottom: 1px' class='mycontainer'> <div class='schoolheader'> <div class='logopic'><img class='School-logo' src='" + f.BranchLogo + "' id='logo' /></div> <div class='schoolnamediv'><span>" + f.BranchName + "</span></div> </div> <div class='schoolheader1'>Admit Card</div> <div class='schoolheader2'>" + f.ExaminationName + " (" + f.Session +")</div> <div class='info'> <table class='examTable'> <tbody> <tr> <td>Name</td> <td>" + f.StudentName + "</td> </tr> <tr> <td>Father Name</td> <td>" + f.FatherName + "</td> </tr> <tr> <td>Mother Name</td> <td>" + f.MotherName + "</td> </tr> <tr> <td>D.O.B</td> <td>" + f.DOB + "</td> </tr> <tr> <td>Exam Center</td> <td>" + f.ExaminationCenter + "</td> </tr> </tbody> </table> </div> <div class='subjectlist'> <table id='tbl1' class='examTable'> <thead> <tr> <th>SN</th> <th>Exam Date</th> <th>Subject</th> </tr> </thead> <tbody>" + date + "</tbody> </table> </div> <div class='ExamInfo'> <div> <table class='examTable'> <tbody> <tr> <td>Class</td> <td>" + f.ClassMasterName + "</td> </tr> <tr> <td>Roll No</td> <td>" + f.RollNo + "</td> </tr> </tbody> </table> </div> <div class='examtimediv'> <table class='examTable'> <thead> <tr> <th>Exam Time</th> </tr> </thead> <tbody> <tr class='center'> <td>" + f.ExamTime + "</td> </tr> </tbody> </table> </div> <div> <table class='examTable'> <tbody> <tr> <td class='tsign'><img src='" + f.TeacherSignaturePath + "' id='studentsign' /></td> </tr> <tr class='center'> <td>Principal Sign</td> </tr> </tbody> </table> </div> </div> <div class='picbox'> <table class='examTable'> <tbody> <tr> <td class='stupic'><img src='" + f.ImagePath + "' id='studentpic' /></td> </tr> <tr> <td>Student Sign</td> </tr> </tbody> </table> </div> </div> <div class='row' style='margin:0;padding-left:1%'> <P class='Note'>  </P> </div> </div>";
                                if (count == 3) {
                                    MultiIcardContainer += "<div style='page-break-after:always'></div>";

                                    count = 0;

                                }
                                count++;
                            }
                        });


                    });
                    //$('#printdiv tbody').remove();
                    $('#printdiv').append(MultiIcardContainer);

                    $('select').select2();
                }
            }
        },
        complete: function () {
            debugger
            setTimeout(function () { $("#loader_home").fadeOut("slow"); }, 1);
            //PrintRegFeeSlip3();
        },
        error: function (data) {
            MessageBoxError(JSON.stringify(data));
            setTimeout(function () { $("#loader_home").fadeOut("slow"); }, 1);
        }

    });

}

function BindExamListDropDown(ControlId) {

    debugger
    var BranchId = $('#ddlBranchStudentList').val();

    var BO = {
        "objAdmitCardExamMasterBO":
        {
            "Action": "get",
            "BranchId": BranchId

        }
    };

    $('#' + ControlId).unbind("select2-opening");
    $('#' + ControlId).find('option').not(':first').remove();

    $.ajax({
        type: "POST",
        url: "https://apiexaminsider.ptccircle.in/Examinsider/EIService.svc/GetAdmitCardExamMaster",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            ShowHideSelectBoxLoading(1, ControlId);
        },
        success: function (response) {
            debugger
            if (response.responseCode == "1") {
                if (response.responseObject != null) {
                    $.each(response.responseObject, function (i, d) {
                        debugger
                        $.each(d.admitCardExamMaster, function (l, m) {
                            $("#" + ControlId).append($("<option></option>").val(m.ExamId).html(m.ExamName));
                        });
                    });
                }
            } else {
                MessageBoxError(response.responseMessage);
            }
            //$('#' + ControlId).select2('val', SelectedValue);
        },
        complete: function () {
            $("#" + ControlId).select2();
            $('#' + ControlId).select2("open");
            ShowHideSelectBoxLoading(0, ControlId)
        },
        error: function (data) {
            alert(JSON.stringify(data));
            ShowHideSelectBoxLoading(0, ControlId)
        }
    });
}



function PrintRegFeeSlip3() {
    debugger
    var divContents = document.getElementById('printdiv').innerHTML;
    var a = window.open('', '');
    a.document.write('<html><head><link href=../Content/css/NewBootstrapForm.css rel=stylesheet /><link href=../Content/ReportCard/PrintAdmitCardNew.css rel=stylesheet /></head><body onload=window.print();>');
    a.document.write('');
    a.document.write('');
    a.document.write('');
    a.document.write('');
    a.document.write('');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
}
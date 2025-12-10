var AppAccessTypeId;
var GlobalAppAccessId;
var StaffId;
var SchoolId;
var IsDefaultBranch = 1;
var DisplayBranchName = '';
var Session = '';
var AddressLine2 = '';
var AddressLine1 = '';
var Branchlogo = '';
var GlobalBranchlogo = '';
var AffiliationNo = '';

var SchoolName = GetUserSession('SchoolName');
var DisplayName = GetUserSession('DisplayName');
$(document).ready(function () {

    GlobalBrId = GetUserSession('BRId');
    SchoolId = GetUserSession('SchoolId');
    GlobalAppAccessId = GetUserSession('AppAccessID');
    AppAccessTypeId = GetUserSession('AppAccessTypeID');
    CheckValidUserRequest(GlobalAppAccessId);

    $('select').select2();

    if (SchoolId == 1217) {
        $('#ReceiptWise').show()
    }
    else {
        $('#ReceiptWise').hide()
    }
    if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {


        BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);



    }
    else {

        BindBranchDropDownAutoselect('ddlBranch', 0);



        //$("#ddlBranch").unbind('change')
        //$("#ddlBranch").change(function () {
        //    ChangeBranch();
        //});
    }


    GetAllBranchDetails();


    //  if ([1203, 1210].includes(+SchoolId)) {
    //    $('#btnDayWise').hide();

    //    }


    $("#txtFromDate").datepicker({
        changeMonth: true,
        changeYear: true,
        // maxDate: 0,
        dateFormat: "dd-mm-yy",

        onSelect: function (selected, evnt) {
            if ($(this).val().length > 0) {
                $('#validationAddStudent1').hide();
                $('#validationAddStudent1 span').html('');
                $("#txtFromDate").removeClass('error_focus');
            }
        },
        //}).datepicker("setDate", (new Date(),-15));
    }).datepicker("setDate", new Date());



    $("#txtToDate").datepicker({
        changeMonth: true,
        changeYear: true,
        // maxDate: 0,
        dateFormat: "dd-mm-yy",

        onSelect: function (selected, evnt) {
            if ($(this).val().length > 0) {
                $('#validationAddStudent1').hide();
                $('#validationAddStudent1 span').html('');
                $("#txtToDate").removeClass('error_focus');
            }
        },
    }).datepicker("setDate", new Date());


    $("#ddlClass").off('select2-opening');
    $("#ddlClass").select2().on("select2-opening", function () {

        BindClassDropDown('ddlClass', 0, $("#ddlBranch").val());
    });


    $("#ddlSec").off('select2-opening');
    $("#ddlSec").select2().on("select2-opening", function () {

        BindSectionListDropDownSection('ddlSec', 0, $("#ddlClass").val(), $("#ddlBranch").val());
    });
    $('#btnSearchStudent').unbind('click');
    $('#btnSearchStudent').click(function () {
        debugger
        GetAllBranchDetails();
        console.log(GlobalBranchlogo)
        if ([1203, 1210].includes(+SchoolId)) {
            debugger
            BindStudentListHolyChild();
        }
        else if ($("#ddlBranch").val() == 1444 || $("#ddlBranch").val() == 1479 || $("#ddlBranch").val() == 1480 || $("#ddlBranch").val() == 1488) {
            debugger
            BindStudentListHolyChild();
        }
        else {
            debugger
            BindStudentList();
        }
    });


    $('#btnSearchStudentReceiptNo').unbind('click');
    $('#btnSearchStudentReceiptNo').click(function () {
        debugger
        GetAllBranchDetails();

        BindStudentListWithReceiptNo();

    });

    $('#btnDayWise').unbind('click');
    $('#btnDayWise').click(function () {
        debugger
        GetAllBranchDetails();


        BindTotalListDayWise();
    });


    attachRowHighlight("#Div1StudentTotalList")
    attachRowHighlight("#Div1StudentList")
});


function BindStudentListHolyChild() {
    debugger
    var Branchid = $('#ddlBranch').val();
    var Branch = $('#txtBranch').text();
    var BranchName = $('#txtBranchName').text();
    var Branchlogo = $('#txtBranchLogo').text();



    var BranchId = $("#ddlBranch").val();
    var FromDate = $("#txtFromDate").val();
    var ToDate = $("#txtToDate").val();

    var BO = {
        "objCashSummaryBO": {
            "BranchId": BranchId,
            "SchoolId": SchoolId,
            "FromDate": FromDate,
            "ToDate": ToDate
        }
    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetCashSummaryHolyChild",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {

            console.log(data)
            $("#Div1StudentTotalListtb").hide();
            $("#Div1StudentTotalList tbody").remove();
            $("#Div1StudentListtb").show();
            $("#Div1StudentList tbody").remove();

            if (data.RecordCount > 0) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {



                        $.each(data.responseObject, function (i, j) {
                            $.each(j.cashSummaryList, function (c, d) {




                                $("#Div1StudentList").append($("<tr id=TRSchool_" + d.AdmissionNumber + "><td>" + parseInt(c + 1) + "</td><td> " + d.ReceiptDate + " </td><td> " + d.Receiptno + " </td><td>" + d.AdmissionNumber + "</td><td>" + d.StudentName + "</td><td>" + d.FatherName + "</td><td>" + d.Class + "</td><td> " + d.Section + " </td><td>" + d.UserName + "</td><td>" + d.Months + "</td><td>" + d.Cash + "</td><td>" + d.Cheque + "</td><td>" + d.BankTransfer + "</td><td>" + d.Online + "</td><td>" + d.Card + "</td><td>" + d.Swipe + "</td><td>" + d.UPI + "</td><td>" + d.Gateway + "</td><td>" + d.Paid + "</td></tr>"));

                            });
                        });


                        debugger

                        $('#txtStudentSearch').unbind('keyup');
                        $('#txtStudentSearch').keyup(function () {

                            SearchDatainList(data.responseObject);
                        });

                        var columnSet = [{ "title": "S.No" }, { "title": "ReceiptDate" }, { "title": "Receipt No." }, { "title": "Adm No." }, { "title": "Student Name" }, { "title": "Father Name" }, { "title": "Class" }, { "title": "Section" }, { "title": "User Name" }, { "title": "Month" }, { "title": "Cash" }, { "title": "Cheque" }, { "title": "Bank Transfer" }, { "title": "Online" }, { "title": "Card" }, { "title": "Swipe" }, { "title": "UPI" }, { "title": "Gateway" }, { "title": "Paid" }]


                        debugger


                        var header = '<table><tr><td><div><img src="' + Branchlogo + '"></img></div></td><td style="text-align:center;vertical-align: middle;"><div style="font-size:23px;margin-bottom:15px;"><b>' + DisplayBranchName + '(' + Session + ')<br>' + AddressLine1 + '<br>' + AffiliationNo + '<br>Fee Collection Summary</b></div></td></tr><tr><td style="width:400px;"></td><td style="text-align:center"><div style="font-size:23px;">From Date ' + FromDate + ' To Date ' + ToDate + '</div></td></tr></table>'

                        $("#Div1StudentList").DataTable({
                            scrollX: true,
                            scroller: true,
                            destroy: true, scrollY: '45vh',
                            pageLength: 100,
                            columns: StaticColumnHeadSet(columnSet),
                            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                return nRow;
                            }, language: {
                                "emptyTable": dataTableNoRecordFoundMsg
                            },

                            dom: 'lBfrtip',
                            buttons: [
                                'colvis',
                                {
                                    extend: 'excel',
                                    title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                    exportOptions: {
                                        // columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,23,24]
                                        columns: ':visible'
                                    }
                                },
                                {
                                    extend: 'pdf',
                                    title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                    exportOptions: {

                                        columns: ':visible'
                                    },
                                    header: true,
                                    orientation: 'landscape',
                                    customize: function (doc) {
                                        doc.defaultStyle.alignment = 'center'
                                        doc.pageMargins = [10, 10, 10, 10];
                                        doc.styles.tableHeader.fontSize = 7;
                                        doc.defaultStyle.fontSize = 7; //<-- set fontsize to 16 instead of 10
                                    }
                                    //customize: function (win) {
                                    //    $(win.document.body)
                                    //        .css('font-size', '10pt').prepend(header);

                                    //    $(win.document.body).find('table')
                                    //        .addClass('compact')
                                    //        .css('font-size', 'inherit');
                                    //}
                                },
                                {
                                    extend: 'print',
                                    // title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                    exportOptions: {

                                        columns: ':visible'
                                    },
                                    customize: function (win) {
                                        $(win.document.body)
                                            .css('font-size', '10pt').prepend(header);

                                        $(win.document.body).find('table')
                                            .addClass('compact')
                                            .css('font-size', 'inherit');
                                    }

                                },
                            ],
                        });



                        $('select').select2();
                    }
                    else {
                        MessageBoxError("There is no Data Available for Such Criteria.");
                    }
                }
                else {
                    MessageBoxError("There is no Data Available for Such Criteria.");
                }
            }
            else {
                MessageBoxError("There is no Data Available for Such Criteria.");
            }


        },
        complete: function () {

            setTimeout(function () { $("#loader_home").fadeOut("slow"); }, 1);
        },
        error: function (data) {
            MessageBoxError(JSON.stringify(data));
            setTimeout(function () { $("#loader_home").fadeOut("slow"); }, 1);
        }
    });
}


function BindStudentList() {
    debugger
    var Branchid = $('#ddlBranch').val();
    var Branch = $('#txtBranch').text();
    var BranchName = $('#txtBranchName').text();
    //var Branchlogo = $('#txtBranchLogo').text();

    ////Branchlogo = Branchlogo || GlobalBranchlogo.trim()
    //if (!Branchlogo.trim()) {
       
    //    Branchlogo = GlobalBranchlogo
    //}

    //console.log(Branchlogo, GlobalBranchlogo)


    var BranchId = $("#ddlBranch").val();
    var FromDate = $("#txtFromDate").val();
    var ToDate = $("#txtToDate").val();

    var BO = {
        "objCashSummaryBO": {
            "BranchId": BranchId,
            "SchoolId": SchoolId,
            "FromDate": FromDate,
            "ToDate": ToDate
        }
    };
    console.log(BO)
    debugger
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetCashSummary",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {
            debugger
            console.log(data)
            $("#Div1StudentTotalListtb").hide();
            $("#Div1StudentTotalList tbody").remove();
            $("#Div1StudentListtb").show();
            $("#Div1StudentList tbody").remove();
            debugger
            if (data.RecordCount > 0) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {

                        debugger
                        //var Sr = 0
                        //for partap singh memorial school
                        debugger
                        // if ($("#ddlBranch").val() == 1241 || $("#ddlBranch").val() == 1255) {
                        if ([1203, 1210].includes(+SchoolId)) {
                            $.each(data.responseObject, function (i, j) {
                                $.each(j.cashSummaryList, function (c, d) {



                                    $("#Div1StudentList").append($("<tr id=TRSchool_" + d.AdmissionNumber + "><td>" + parseInt(c + 1) + "</td><td> " + ((d.Receiptno == "" || d.Receiptno == null) ? "" : d.Receiptno) + " </td><td> " + ((d.Months == "") ? "Total" : d.Months) + " </td><td>" + ((d.StudentId == "" || d.StudentId == null) ? "" : d.StudentId) + "</td><td>" + d.StudentName + "</td><td>" + d.HostelNo + "</td><td>" + d.FatherName + "</td><td> " + d.AdmissionNumber + " </td><td>" + d.ClassMasterName + "</td><td>" + d.SectionName + "</td><td>" + d.PaymentMode + "</td><td>" + d.ChequeDDCardNo + "</td><td>" + d.BankName + "</td><td>" + d.GrossPayable + "</td><td>" + d.BothDiscount + "</td><td>" + d.Paid + "</td><td>" + d.Balance + "</td><td>" + d.PaidDate + "</td><td>" + d.Cash + "</td><td>" + d.Cheque + "</td><td>" + d.Online + "</td><td>" + d.Card + "</td><td>" + d.BankTransfer + "</td><td>" + d.Gateway + "</td><td>" + d.Remarks + "</td><td>" + d.UserName + "</td></tr>"));

                                });
                            });
                        }
                        else if ([1444, 1479, 1480, 166].includes(+Branchid)) {
                            $.each(data.responseObject, function (i, j) {
                                $.each(j.cashSummaryList, function (c, d) {



                                    $("#Div1StudentList").append($("<tr id=TRSchool_" + d.AdmissionNumber + "><td>" + parseInt(c + 1) + "</td><td> " + ((d.Receiptno == "" || d.Receiptno == null) ? "" : d.Receiptno) + " </td><td> " + d.AdmissionNumber + " </td><td>" + d.StudentName + "</td><td>" + d.FatherName + "</td><td>" + d.ClassMasterName + "-" + d.SectionName + "</td><td> " + ((d.Months == "") ? "Total" : d.Months) + " </td ><td>" + d.PaymentMode + "</td><td>" + d.ChequeDDCardNo + "</td><td>" + d.BankName + "</td><td>" + d.Paid + "</td></tr> "));

                                });
                            });
                        }
                        //For ZAD Global School
                        else if ([1195].includes(+SchoolId)) {
                            debugger
                            $.each(data.responseObject, function (i, j) {
                                $.each(j.cashSummaryList, function (c, d) {
                                    debugger
                                    // if ([1415, 1420, 1421, 1422].includes(+d.BranchId)) {
                                    $("#Div1StudentList").append($("<tr id=TRSchool_" + d.AdmissionNumber + "><td>" + parseInt(c + 1) + "</td><td>" + d.BranchName + "</td><td> " + ((d.Receiptno == "" || d.Receiptno == null) ? "" : d.Receiptno) + " </td><td> " + ((d.Months == "") ? "Total" : d.Months) + " </td><td>" + ((d.StudentId == "" || d.StudentId == null) ? "" : d.StudentId) + "</td><td>" + d.AdmissionStatus + "</td><td>" + d.StudentName + "</td><td>" + d.FatherName + "</td><td>" + d.MotherName + "</td><td> " + d.AdmissionNumber + " </td><td> " + d.ConcessionName + " </td><td>" + d.ClassMasterName + "</td><td>" + d.SectionName + "</td><td>" + d.PaymentMode + "</td><td>" + d.ChequeDDCardNo + "</td><td>" + d.BankName + "</td><td>" + d.GrossPayable + "</td><td>" + d.BothDiscount + "</td><td>" + d.Paid + "</td><td>" + d.Balance + "</td><td>" + d.PaidDate + "</td><td>" + d.Cash + "</td><td>" + d.Cheque + "</td><td>" + d.Online + "</td><td>" + d.Card + "</td><td>" + d.BankTransfer + "</td><td>" + d.Gateway + "</td><td>" + d.Remarks + "</td><td>" + d.UserName + "</td></tr>"));
                                    // }
                                    // else {
                                    // $("#Div1StudentList").append($("<tr id=TRSchool_" + d.AdmissionNumber + "><td>" + parseInt(c + 1) + "</td><td>" + d.BranchName + "</td><td> " + ((d.Receiptno == "" || d.Receiptno == null) ? "" : d.Receiptno) + " </td><td> " + ((d.Months == "") ? "Total" : d.Months) + " </td><td>" + ((d.StudentId == "" || d.StudentId == null) ? "" : d.StudentId) + "</td><td>" + d.StudentName + "</td><td>" + d.FatherName + "</td><td>" + d.MotherName + "</td><td> " + d.AdmissionNumber + " </td><td>" + d.ClassMasterName + "</td><td>" + d.SectionName + "</td><td>" + d.PaymentMode + "</td><td>" + d.ChequeDDCardNo + "</td><td>" + d.BankName + "</td><td>" + d.GrossPayable + "</td><td>" + d.BothDiscount + "</td><td>" + d.Paid + "</td><td>" + d.Balance + "</td><td>" + d.PaidDate + "</td><td>" + d.Cash + "</td><td>" + d.Cheque + "</td><td>" + d.Online + "</td><td>" + d.Card + "</td><td>" + d.BankTransfer + "</td><td>" + d.Gateway + "</td><td>" + d.Remarks + "</td><td>" + d.UserName + "</td></tr>"));
                                    // }
                                });
                            });
                        }

                        else if (SchoolId == 23) {
                            $.each(data.responseObject, function (i, j) {
                                $.each(j.cashSummaryList, function (c, d) {




                                    $("#Div1StudentList").append($("<tr id=TRSchool_" + d.AdmissionNumber + "><td>" + parseInt(c + 1) + "</td><td> " + ((d.Receiptno == "" || d.Receiptno == null) ? "" : d.Receiptno) + " </td><td> " + ((d.Months == "") ? "Total" : d.Months) + " </td><td>" + ((d.StudentId == "" || d.StudentId == null) ? "" : d.StudentId) + "</td><td>" + d.StudentName + "</td><td>" + d.HostelNo + "</td><td>" + d.FatherName + "</td><td>" + d.MotherName + "</td><td> " + d.AdmissionNumber + " </td><td>" + d.ClassMasterName + "</td><td>" + d.SectionName + "</td><td>" + d.PaymentMode + "</td><td>" + d.ChequeDDCardNo + "</td><td>" + d.BankName + "</td><td>" + d.GrossPayable + "</td><td>" + d.BothDiscount + "</td><td>" + d.Paid + "</td><td>" + d.Balance + "</td><td>" + d.PaidDate + "</td><td>" + d.Cash + "</td><td>" + d.Cheque + "</td><td>" + d.Online + "</td><td>" + d.Card + "</td><td>" + d.BankTransfer + "</td><td>" + d.Gateway + "</td><td>" + d.Remarks + "</td><td>" + d.UserName + "</td></tr>"));




                                });
                            });
                        }

                        else if (SchoolId == 1217) {
                            $.each(data.responseObject, function (i, j) {
                                $.each(j.cashSummaryList, function (c, d) {

                                    $("#Div1StudentList").append($("<tr id=TRSchool_" + d.AdmissionNumber + "><td>" + parseInt(c + 1) + "</td><td>" + d.PaidStatus + "</td><td> " + ((d.Receiptno == "" || d.Receiptno == null) ? "" : d.Receiptno) + " </td><td> " + ((d.Months == "") ? "Total" : d.Months) + " </td><td>" + ((d.StudentId == "" || d.StudentId == null) ? "" : d.StudentId) + "</td><td>" + d.StudentName + "</td><td>" + d.FatherName + "</td><td>" + d.MotherName + "</td><td> " + d.AdmissionNumber + " </td><td>" + d.ClassMasterName + "</td><td>" + d.SectionName + "</td><td>" + d.PaymentMode + "</td><td>" + d.ChequeDDCardNo + "</td><td>" + d.BankName + "</td><td>" + d.GrossPayable + "</td><td>" + d.BothDiscount + "</td><td>" + d.Paid + "</td><td>" + d.Balance + "</td><td>" + d.PaidDate + "</td><td>" + d.Cash + "</td><td>" + d.Cheque + "</td><td>" + d.Online + "</td><td>" + d.Card + "</td><td>" + d.BankTransfer + "</td><td>" + d.Gateway + "</td><td>" + d.Remarks + "</td><td>" + d.UserName + "</td></tr>"));



                                    /*  $("#Div1StudentList").append($("<tr id=TRSchool_" + d.AdmissionNumber + "><td>" + parseInt(c + 1) + "</td><td> " + d.Receiptno + " </td><td> " + d.Createdon + " </td><td> " + d.AdmissionNumber + " </td><td>" + d.StudentName + "</td><td>" + d.Paid + "</td><td>" + d.PaymentMode + "</td><td>" + d.BankName + "</td><td>" + d.PaidDate + "</td><td>" + d.Remarks + "</td></tr>"));*/

                                });
                            });


                        }
                        else if (SchoolId == 1123) {

                            $.each(data.responseObject, function (i, j) {
                                $.each(j.cashSummaryList, function (c, d) {

                                    debugger


                                    $("#Div1StudentList").append($("<tr id=TRSchool_" + d.AdmissionNumber + "><td>" + parseInt(c + 1) + "</td><td> " + ((d.Receiptno == "" || d.Receiptno == null) ? "" : d.Receiptno) + " </td><td>" + d.PaidDate + "</td><td> " + ((d.Months == "") ? "Total" : d.Months) + " </td><td>" + ((d.StudentId == "" || d.StudentId == null) ? "" : d.StudentId) + "</td><td>" + d.StudentName + "</td><td>" + d.FatherName + "</td><td>" + d.MotherName + "</td><td> " + d.AdmissionNumber + " </td><td>" + d.ClassMasterName + "</td><td>" + d.SectionName + "</td><td>" + d.AdmissionStatus + "</td><td>" + d.PaymentMode + "</td><td>" + d.ChequeDDCardNo + "</td><td>" + d.BankName + "</td><td>" + d.GrossPayable + "</td><td>" + d.BothDiscount + "</td><td>" + d.Paid + "</td><td>" + d.Balance + "</td><td>" + d.Cash + "</td><td>" + d.Cheque + "</td><td>" + d.Online + "</td><td>" + d.Card + "</td><td>" + d.UPI + "</td><td>" + d.BankTransfer + "</td><td>" + d.Gateway + "</td><td>" + d.Remarks + "</td><td>" + d.UserName + "</td></tr>"));

                                });
                            });
                        }
                        else {

                            $.each(data.responseObject, function (i, j) {
                                $.each(j.cashSummaryList, function (c, d) {




                                    $("#Div1StudentList").append($("<tr id=TRSchool_" + d.AdmissionNumber + "><td>" + parseInt(c + 1) + "</td><td> " + ((d.Receiptno == "" || d.Receiptno == null) ? "" : d.Receiptno) + " </td><td>" + d.PaidDate + "</td><td> " + ((d.Months == "") ? "Total" : d.Months) + " </td><td>" + ((d.StudentId == "" || d.StudentId == null) ? "" : d.StudentId) + "</td><td>" + d.StudentName + "</td><td>" + d.FatherName + "</td><td>" + d.MotherName + "</td><td> " + d.AdmissionNumber + " </td><td>" + d.ClassMasterName + "</td><td>" + d.SectionName + "</td><td>" + d.AdmissionStatus + "</td><td>" + d.PaymentMode + "</td><td>" + d.ChequeDDCardNo + "</td><td>" + d.BankName + "</td><td>" + d.GrossPayable + "</td><td>" + d.BothDiscount + "</td><td>" + d.Paid + "</td><td>" + d.Balance + "</td><td>" + d.Cash + "</td><td>" + d.Cheque + "</td><td>" + d.Online + "</td><td>" + d.Card + "</td><td>" + d.BankTransfer + "</td><td>" + d.Gateway + "</td><td>" + (d?.Other|| 0) + "</td><td>" + d.Remarks + "</td><td>" + d.UserName + "</td></tr>"));

                                });
                            });
                        }

                        debugger
                        //For Partap singh memorial school
                        if (SchoolId == 23) {
                            $('#txtStudentSearch').unbind('keyup');
                            $('#txtStudentSearch').keyup(function () {

                                SearchDatainList(data.responseObject);
                            });
                            var columnSet = [{ "title": "S.No" }, { "title": "Receipt No." }, { "title": "Month" }, { "title": "SID" }, { "title": "Student" }, { "title": "Hostel No." }, { "title": "Father" }, { "title": "Mother" }, { "title": "ADM No." }, { "title": "Class" }, { "title": "Section" }, { "title": "Mode" }, { "title": "Cheque No" }, { "title": "Bank Name" }, { "title": "Gross Payable" }, { "title": "Discount" }, { "title": "Paid" }, { "title": "Balance" }, { "title": "Paid Date" }, { "title": "Cash" }, { "title": "Cheque" }, { "title": "Online" }, { "title": "Card" }, { "title": "Bank Transfer" }, { "title": "Online Gateway" }, { "title": "Remarks Transfer" }, { "title": "Created By" }]


                            /* var columnSet = [{ "title": "S.No" }, { "title": "Receipt No." }, { "title": "Month" }, { "title": "SID" }, { "title": "Student" }, { "title": "Hostel No." }, { "title": "Father" }, { "title": "ADM No." }, { "title": "Class" }, { "title": "Section" }, { "title": "Mode" }, { "title": "Cheque No" }, { "title": "Bank Name" }, { "title": "Gross Payable" }, { "title": "Discount" }, { "title": "Paid" }, { "title": "Balance" }, { "title": "Paid Date" }, { "title": "Cash" }, { "title": "Cheque" }, { "title": "Online" }, { "title": "Card" }, { "title": "Bank Transfer" }, { "title": "Online Gateway" }, { "title": "Remarks Transfer" }, { "title": "Created By" }]*/
                        }
                        //.....................................................................................................
                        else if ([1444, 1479, 1480, 166].includes(+Branchid)) {
                            $('#txtStudentSearch').unbind('keyup');
                            $('#txtStudentSearch').keyup(function () {

                                SearchDatainList(data.responseObject);
                            });

                            var columnSet = [{ "title": "S.No" }, { "title": "Receipt No." }, { "title": "Adm No." }, { "title": "Name" }, { "title": "Father" }, { "title": "Class-Sec" }, { "title": "Months" }, { "title": "Payment Mode" }, { "title": "Instrument No." }, { "title": "Bank Name" }, { "title": "Paid" }]
                        }
                        //.....................................................................................................

                        //For ZAD Global School
                        else if ([1195].includes(+SchoolId)) {
                            $('#txtStudentSearch').unbind('keyup');
                            $('#txtStudentSearch').keyup(function () {

                                SearchDatainList(data.responseObject);
                            });

                            var columnSet = [{ "title": "S.No" }, { "title": "Branch Name" }, { "title": "Receipt No." }, { "title": "Month" }, { "title": "SID" }, { "title": "Admission Status" }, { "title": "Student" }, { "title": "Father" }, { "title": "Mother" }, { "title": "ADM No." }, { "title": "ConcessionName" }, { "title": "Class" }, { "title": "Section" }, { "title": "Mode" }, { "title": "Cheque No" }, { "title": "Bank Name" }, { "title": "Gross Payable" }, { "title": "Discount" }, { "title": "Paid" }, { "title": "Balance" }, { "title": "Paid Date" }, { "title": "Cash" }, { "title": "Cheque" }, { "title": "Online" }, { "title": "Card" }, { "title": "Bank Transfer" }, { "title": "Online Gateway" }, { "title": "Remarks Transfer" }, { "title": "Created By" }]
                        }

                        else if (SchoolId == 1217) {

                            debugger

                            $('#txtStudentSearch').unbind('keyup');
                            $('#txtStudentSearch').keyup(function () {

                                SearchDatainList(data.responseObject);
                            });

                            /*   var columnSet = [{ "title": "S.No" }, { "title": "Receipt No." }, { "title": "Date of Receipt" }, { "title": "HNO" }, { "title": "Student" }, { "title": "Amount" }, { "title": "Payment Mode" }, { "title": "Bank Name" }, { "title": "Date of Payment" }, { "title": "Remarks" }];*/


                            var columnSet = [{ "title": "S.No" }, { "title": "Status" }, { "title": "Receipt No." }, { "title": "Month" }, { "title": "SID" }, { "title": "Student" }, { "title": "Father" }, { "title": "Mother" }, { "title": "Hostel No." }, { "title": "Class" }, { "title": "Section" }, { "title": "Mode" }, { "title": "Cheque No" }, { "title": "Bank Name" }, { "title": "Gross Payable" }, { "title": "Discount" }, { "title": "Paid" }, { "title": "Balance" }, { "title": "Paid Date" }, { "title": "Cash" }, { "title": "Cheque" }, { "title": "Online" }, { "title": "Card" }, { "title": "Bank Transfer" }, { "title": "Online Gateway" }, { "title": "Remarks Transfer" }, { "title": "User Name" }]
                        }
                        else if (SchoolId == 1123) {
                            $('#txtStudentSearch').unbind('keyup');
                            $('#txtStudentSearch').keyup(function () {

                                SearchDatainList(data.responseObject);
                            });

                            var columnSet = [{ "title": "S.No" }, { "title": "Receipt No." }, { "title": "Paid Date" }, { "title": "Month" }, { "title": "SID" }, { "title": "Student" }, { "title": "Father" }, { "title": "Mother" }, { "title": "ADM No." }, { "title": "Class" }, { "title": "Section" }, { "title": "Admission Status" }, { "title": "Mode" }, { "title": "Cheque No" }, { "title": "Bank Name" }, { "title": "Gross Payable" }, { "title": "Discount" }, { "title": "Paid" }, { "title": "Balance" }, { "title": "Cash" }, { "title": "Cheque" }, { "title": "Online" }, { "title": "Card" }, { "title": "UPI" }, { "title": "Bank Transfer" }, { "title": "Online Gateway" }, { "title": "Remarks Transfer" }, { "title": "Created By" }]

                        }
                        else {
                            $('#txtStudentSearch').unbind('keyup');
                            $('#txtStudentSearch').keyup(function () {

                                SearchDatainList(data.responseObject);
                            });

                            var columnSet = [{ "title": "S.No" }, { "title": "Receipt No." }, { "title": "Paid Date" }, { "title": "Month" }, { "title": "SID" }, { "title": "Student" }, { "title": "Father" }, { "title": "Mother" }, { "title": "ADM No." }, { "title": "Class" }, { "title": "Section" }, { "title": "Admission Status" }, { "title": "Mode" }, { "title": "Cheque No" }, { "title": "Bank Name" }, { "title": "Gross Payable" }, { "title": "Discount" }, { "title": "Paid" }, { "title": "Balance" }, { "title": "Cash" }, { "title": "Cheque" }, { "title": "Online" }, { "title": "Card" }, { "title": "Bank Transfer" }, { "title": "Online Gateway" }, { "title": "Other" },{ "title": "Remarks Transfer" }, { "title": "Created By" }]

                        }
                        debugger
                        if ([1259, 1260, 1267, 1269, 1419, 1276, 1319, 1350, 1354, 1368, 1389, 1564, 1419, 1454, 1455, 1497].includes(Number($("#ddlBranch").val()))) {


                            //for header in printpage......dynamic session
                            var header = '<table><tr><td><div><img src="' + Branchlogo + '"></img></div></td><td style="text-align:center;vertical-align: middle;"><div style="font-size:23px;margin-bottom:15px;"><b>' + DisplayBranchName + '(' + Session + ')<br>' + AddressLine1 + '<br>' + AffiliationNo + '<br>Fee Collection Summary</b></div></td></tr><tr><td style="width:400px;"></td><td style="text-align:center"><div style="font-size:23px;">From Date ' + FromDate + ' To Date ' + ToDate + '</div></td></tr></table>'
                            $("#Div1StudentList").DataTable({


                                scrollX: true,
                                scroller: true,
                                destroy: true, scrollY: '45vh',
                                pageLength: 100,
                                columns: StaticColumnHeadSet(columnSet),
                                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                    return nRow;
                                }, language: {
                                    "emptyTable": dataTableNoRecordFoundMsg
                                },

                                dom: 'lBfrtip',
                                buttons: [
                                    {
                                        extend: 'excel',
                                        title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                        exportOptions: {
                                            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
                                        }
                                    },
                                    {
                                        extend: 'pdf',
                                        title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                        exportOptions: {
                                            columns: [0, 1, 4, 5, 6, 8, 11, 15, 17, 18, 19, 20, 24]
                                        },
                                        header: true,
                                        orientation: 'landscape',
                                        customize: function (doc) {
                                            doc.defaultStyle.alignment = 'center'
                                            doc.pageMargins = [15, 15, 15, 15];
                                            doc.styles.tableHeader.fontSize = 16;
                                            doc.defaultStyle.fontSize = 16; //<-- set fontsize to 16 instead of 10 



                                        }
                                    },


                                    {


                                        extend: 'print',
                                        title: '',
                                        exportOptions: {
                                            columns: [0, 1, 4, 5, 6, 8, 11, 15, 17, 18, 19, 20, 24]


                                        },

                                        customize: function (win) {
                                            $(win.document.body)
                                                .css('font-size', '1px')
                                                .prepend(header);

                                            $(win.document.body).find('table')
                                                .addClass('compact')
                                                .css('font-size', 'inherit');
                                        }

                                    },

                                ],
                            });
                        }
                        //----------------------------- SDS School------------------------
                        else if ($("#ddlBranch").val() == 1432) {
                            debugger


                            //for header in printpage......dynamic session
                            var header = '<table id="sdsHeader"><tr><td><div><img style="height:150px;width:150px" src="../Content/SuperAdminImg/0rtg2gt1ayp.jpg"></img></div></td><td style="text-align:center;vertical-align: middle;"><div style="font-size:25px;margin-bottom:15px;"><b>' + DisplayBranchName + '(' + Session + ')<br>' + AddressLine1 + '<br>' + AffiliationNo + '<br>Fee Collection Summary</b></div></td></tr><tr><td style="width:500px;"></td><td style="text-align:center"><div style="font-size:25px;">From Date ' + FromDate + ' To Date ' + ToDate + '</div></td></tr></table>'


                            $("#Div1StudentList").DataTable({
                                scrollX: true,
                                scroller: true,
                                destroy: true, scrollY: '45vh',
                                pageLength: 100,
                                columns: StaticColumnHeadSet(columnSet),
                                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                    return nRow;
                                }, language: {
                                    "emptyTable": dataTableNoRecordFoundMsg
                                },

                                dom: 'lBfrtip',
                                buttons: [
                                    {
                                        extend: 'colvis',
                                        text: 'Columns',
                                        init: function (api, node, config) {
                                            $(node).on('click', function () {
                                                // Small delay to wait for menu render
                                                setTimeout(() => {
                                                    if (!$('#colvis-custom').length) {
                                                        let buttons = `
                                    <div id="colvis-custom" style='display: flex;font-size: 12px;justify-content: space-around;margin: 10px 0px;'>
                                      <button class="showAll">Show All</button>
                                      <button class="hideAll">Hide All</button>
                                    </div>`;
                                                        $('.dt-button-collection').prepend(buttons);

                                                        // Add actions
                                                        $('.showAll').on('click', function () {
                                                            api.columns().visible(true);
                                                        });
                                                        $('.hideAll').on('click', function () {
                                                            api.columns().visible(false);
                                                        });
                                                    }
                                                }, 10);
                                            });
                                        }
                                    },
                                    {
                                        extend: 'excel',
                                        title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                        exportOptions: {
                                            // columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,23,24]
                                            columns: ':visible'
                                        }
                                    },
                                    {
                                        extend: 'pdf',
                                        title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                        exportOptions: {
                                            // columns: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
                                            columns: ':visible'
                                        },
                                        header: true,
                                        orientation: 'landscape',
                                        customize: function (doc) {
                                            doc.defaultStyle.alignment = 'center'
                                            doc.pageMargins = [10, 10, 10, 10];
                                            doc.styles.tableHeader.fontSize = 7;
                                            doc.defaultStyle.fontSize = 7; //<-- set fontsize to 16 instead of 10
                                            //const headerText = $('#sdsHeader').html();
                                            //doc.content.splice(0, 0, {
                                            //    text: headerText,
                                            //    fontSize: 16,
                                            //    margin: [0, 0, 0, 10],
                                            //    alignment: 'center'
                                            //});

                                        }
                                    },
                                    {
                                        extend: 'print',
                                        //title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                        exportOptions: {
                                            // columns: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
                                            columns: ':visible'
                                        },
                                        customize: function (win) {
                                            $(win.document.body)
                                                .css('font-size', '1px').prepend(header);
                                            //.prepend(
                                            //    '<img src="http://datatables.net/media/images/logo-fade.png" style="position:absolute; top:0; left:0;" />'
                                            //);
                                            /*.css('font-size', '1px')*/

                                            $(win.document.body).find('table')
                                                .addClass('compact')
                                                .css('font-size', 'inherit');
                                        }

                                    },
                                ],
                            });
                        }






                        //------For South Point----------------------------
                        else if ([1329, 1294, 1326, 1325, 1324, 1323, 1330, 1332, 1333, 1331, 1334, 1337, 1339, 1340, 1341, 1342, 1343, 1344, 1345, 1474, 1473]
                            .includes(Number($("#ddlBranch").val()))) {
                            $("#Div1StudentList").DataTable({
                                scrollX: '100%',
                                scroller: true,
                                destroy: true, scrollY: '45vh',
                                pageLength: 100,
                                columns: StaticColumnHeadSet(columnSet),
                                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                    return nRow;
                                }, language: {
                                    "emptyTable": dataTableNoRecordFoundMsg
                                },

                                dom: 'lBfrtip',
                                buttons: [
                                    {
                                        extend: 'excel',
                                        title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                        exportOptions: {
                                            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

                                        }
                                    },
                                    {
                                        extend: 'pdf',
                                        title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                        pageSize: 'LEGAL',
                                        orientation: 'landscape',

                                        exportOptions: {
                                            columns: [0, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 24]
                                        },


                                        customize: function (doc) {
                                            doc.defaultStyle.alignment = 'center'
                                            doc.pageMargins = [5, 5, 5, 5];
                                            doc.styles.tableHeader.fontSize = 9;
                                            doc.defaultStyle.fontSize = 9; //<-- set fontsize to 16 instead of 10 
                                        }
                                    },
                                    {
                                        extend: 'print',
                                        title: '',
                                        orientation: 'landscape',
                                        pageSize: 'LEGAL',
                                        exportOptions: {
                                            columns: [0, 1, 2, 4, 5, 6, 7, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]

                                        },

                                        customize: function (win) {
                                            $(win.document.body)
                                                .css('font-size', '5pt')
                                                .prepend(
                                                    '<table><tr><td><div><img src="' + Branchlogo + '"></img></div></td><td style="text-align:center;padding-left:64mm; vertical-align: middle;"><div style="font-size:23px;margin-bottom:22px"><b>' + BranchName + '<br>' + AddressLine2 + '<br>' + AffiliationNo + '<br>Fee Collection Summary</b></div></td></tr></table>'

                                                );

                                            $(win.document.body).find('table')
                                                .addClass('compact')
                                                .css('font-size', 'inherit');




                                        }

                                    },
                                ],
                            });
                        }

                        //------For Partap singh Memorial ----------------------------
                        else if ((SchoolId == 23)) {
                            $("#Div1StudentList").DataTable({
                                scrollX: true,
                                scroller: true,
                                destroy: true, scrollY: '45vh',
                                pageLength: 100,
                                columns: StaticColumnHeadSet(columnSet),
                                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                    return nRow;
                                }, language: {
                                    "emptyTable": dataTableNoRecordFoundMsg
                                },

                                dom: 'lBfrtip',
                                buttons: [
                                    {
                                        extend: 'excel',
                                        title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                        exportOptions: {
                                            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]

                                        }
                                    },
                                    {
                                        extend: 'pdf',
                                        title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                        exportOptions: {
                                            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
                                        },
                                        header: true,
                                        orientation: 'landscape',
                                        customize: function (doc) {
                                            doc.defaultStyle.alignment = 'center'
                                            doc.pageMargins = [10, 10, 10, 10];
                                            doc.styles.tableHeader.fontSize = 7;
                                            doc.defaultStyle.fontSize = 7; //<-- set fontsize to 16 instead of 10 
                                        }
                                    },
                                    {
                                        //extend: 'print',
                                        //exportOptions: {

                                        //    columns: ':visible'
                                        //},
                                        //title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                        //customize: function (win) {
                                        //    $(win.document.body)
                                        //        .css('font-size', '10pt')
                                        //    //.prepend(
                                        //    //    '<img src="http://datatables.net/media/images/logo-fade.png" style="position:absolute; top:0; left:0;" />'
                                        //    //);

                                        //    $(win.document.body).find('table')
                                        //        .addClass('compact')
                                        //        .css('font-size', 'inherit');
                                        //}
                                        extend: 'print',
                                        title: '',
                                        orientation: 'landscape',
                                        exportOptions: {
                                            // columns: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
                                            columns: ':visible'
                                        },
                                        customize: function (win) {

                                            CommonPrintCustomize(win, header)
                                        }

                                    },
                                ],
                            });
                        }

                        //------For Holy Chiild ----------------------------

                        else if ([1444, 1479, 1480, 166].includes(+Branchid)) {
                            $("#Div1StudentList").DataTable({
                                scrollX: true,
                                scroller: true,
                                destroy: true, scrollY: '45vh',
                                pageLength: 100,
                                columns: StaticColumnHeadSet(columnSet),
                                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                    return nRow;
                                }, language: {
                                    "emptyTable": dataTableNoRecordFoundMsg
                                },

                                dom: 'lBfrtip',
                                buttons: [
                                    {
                                        extend: 'excel',
                                        title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                        exportOptions: {
                                            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

                                        }
                                    },
                                    {
                                        extend: 'pdf',
                                        title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                        exportOptions: {
                                            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                                        },
                                        //header: true,
                                        //orientation: 'landscape',
                                        //customize: function (doc) {
                                        //   doc.defaultStyle.alignment = 'center'
                                        //   doc.pageMargins = [10, 10, 10, 10];
                                        //   doc.styles.tableHeader.fontSize = 7;
                                        //   doc.defaultStyle.fontSize = 7; //<-- set fontsize to 16 instead of 10 
                                        //}
                                    },
                                    {
                                        extend: 'print',
                                        title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                        //customize: function (win) {
                                        //   $(win.document.body)
                                        //      .css('font-size', '10pt')
                                        //   //.prepend(
                                        //   //    '<img src="http://datatables.net/media/images/logo-fade.png" style="position:absolute; top:0; left:0;" />'
                                        //   //);

                                        //   $(win.document.body).find('table')
                                        //      .addClass('compact')
                                        //      .css('font-size', 'inherit');
                                        //}

                                    },
                                ],
                            });
                        }

                        //------For Vaish Engg. Institute ----------------------------
                        else if ($("#ddlBranch").val() == 117) {
                            $("#Div1StudentList").DataTable({
                                scrollX: true,
                                scroller: true,
                                destroy: true, scrollY: '45vh',
                                pageLength: 100,
                                columns: StaticColumnHeadSet(columnSet),
                                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                    return nRow;
                                }, language: {
                                    "emptyTable": dataTableNoRecordFoundMsg
                                },

                                dom: 'lBfrtip',
                                buttons: [
                                    {
                                        extend: 'colvis',
                                        text: 'Columns',
                                        init: function (api, node, config) {
                                            $(node).on('click', function () {
                                                // Small delay to wait for menu render
                                                setTimeout(() => {
                                                    if (!$('#colvis-custom').length) {
                                                        let buttons = `
                                    <div id="colvis-custom" style='display: flex;font-size: 12px;justify-content: space-around;margin: 10px 0px;'>
                                      <button class="showAll">Show All</button>
                                      <button class="hideAll">Hide All</button>
                                    </div>`;
                                                        $('.dt-button-collection').prepend(buttons);

                                                        // Add actions
                                                        $('.showAll').on('click', function () {
                                                            api.columns().visible(true);
                                                        });
                                                        $('.hideAll').on('click', function () {
                                                            api.columns().visible(false);
                                                        });
                                                    }
                                                }, 10);
                                            });
                                        }
                                    },
                                    {
                                        extend: 'excel',
                                        title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                        exportOptions: {
                                            columns: ':visible'

                                        }
                                    },
                                    {
                                        extend: 'pdf',
                                        title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                        exportOptions: {
                                            columns: ':visible'
                                        },
                                        header: true,
                                        orientation: 'landscape',
                                        customize: function (doc) {
                                            doc.defaultStyle.alignment = 'center'
                                            doc.pageMargins = [10, 10, 10, 10];
                                            doc.styles.tableHeader.fontSize = 7;
                                            doc.defaultStyle.fontSize = 7; //<-- set fontsize to 16 instead of 10 
                                        }
                                    },
                                    {
                                        //extend: 'print',
                                        //title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                        //exportOptions: {
                                        //    columns: ':visible'
                                        //},
                                        //customize: function (win) {
                                        //    $(win.document.body)
                                        //        .css('font-size', '10pt')
                                        //    //.prepend(
                                        //    //    '<img src="http://datatables.net/media/images/logo-fade.png" style="position:absolute; top:0; left:0;" />'
                                        //    //);

                                        //    $(win.document.body).find('table')
                                        //        .addClass('compact')
                                        //        .css('font-size', 'inherit');
                                        //}
                                        extend: 'print',
                                        title: '',
                                        orientation: 'landscape',
                                        exportOptions: {
                                            // columns: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
                                            columns: ':visible'
                                        },
                                        customize: function (win) {

                                            CommonPrintCustomize(win, header)
                                        }


                                    },
                                ],
                            });
                        }

                        else if (SchoolId == 1217) {

                            var header = '<table><tr><td><div><img src="' + Branchlogo + '"></img></div></td><td style="text-align:center;vertical-align: middle;"><div style="font-size:23px;margin-bottom:15px;"><b>' + DisplayBranchName + '(' + Session + ')<br>' + AddressLine1 + '<br>' + AffiliationNo + '<br>Fee Collection Summary</b></div></td></tr><tr><td style="width:400px;"></td><td style="text-align:center"><div style="font-size:23px;">From Date ' + FromDate + ' To Date ' + ToDate + '</div></td></tr></table>'
                            debugger

                            $("#Div1StudentList").DataTable({


                                scrollX: true,
                                scroller: true,
                                destroy: true,
                                scrollY: '45vh',
                                pageLength: 100,
                                columns: StaticColumnHeadSet(columnSet),
                                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                    return nRow;
                                }, language: {
                                    "emptyTable": dataTableNoRecordFoundMsg
                                },

                                dom: 'lBfrtip',
                                buttons: [
                                    {
                                        extend: 'excel',
                                        title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),

                                    },
                                    {
                                        extend: 'pdf',
                                        title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),

                                        header: true,
                                        orientation: 'landscape',
                                        customize: function (doc) {
                                            doc.defaultStyle.alignment = 'center'
                                            doc.pageMargins = [15, 15, 15, 15];
                                            doc.styles.tableHeader.fontSize = 16;
                                            doc.defaultStyle.fontSize = 16; //<-- set fontsize to 16 instead of 10 



                                        }
                                    },


                                    {


                                        //extend: 'print',
                                        //title: '',
                                        //orientation: 'landscape',
                                        //exportOptions: {
                                        //    // columns: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
                                        //    columns: ':visible'
                                        //},
                                        //customize: function (win) {
                                        //    $(win.document.body)
                                        //        .css('font-size', '1px')
                                        //        .prepend(header);

                                        //    $(win.document.body).find('table')
                                        //        .addClass('compact')
                                        //        .css('font-size', 'inherit');
                                        //}
                                        extend: 'print',
                                        title: '',
                                        orientation: 'landscape',
                                        exportOptions: {
                                            
                                            columns: ':visible'
                                        },
                                        customize: function (win) {

                                            CommonPrintCustomize(win, header)
                                        }


                                    },

                                ],
                            });

                        }


                        else if (SchoolId == 1163 || SchoolId == 1168) {

                            console.log(Branchlogo)
                            //var header = '<table><tr><td><div><img src="' + Branchlogo + '"></img></div></td><td style="text-align:center;vertical-align: middle;"><div style="font-size:23px;margin-bottom:15px;"><b>' + DisplayBranchName + '(' + Session + ')<br>' + AddressLine1 + '<br>' + AffiliationNo + '<br>Fee Collection Summary</b></div></td></tr><tr><td style="width:400px;"></td><td style="text-align:center"><div style="font-size:23px;">From Date ' + FromDate + ' To Date ' +  + '</div></td></tr></table>'

                            var header = '<div style="display: flex;gap: 10px;line-height: 30px;margin-bottom:10px;"><div class="SchoolLogo"><img style="width: 70px;" src="' + Branchlogo + '" alt=""></div><div><div class="SchoolName" style="font-size: xx-large;font-weight: bold;">' + SchoolName + '</div><div class="FileDetails" style="font-size: x-large;">Student Fee Collection Summary for the period of ( ' + FromDate + ' to ' + ToDate + ' ) | Branch-' + $('#ddlBranch option:selected').text() +'</div></div></div>'
                           /* var header = '<div style="height: fit-content; margin-top: 5px;margin-bottom: 5px;width: 100%; background: white; display: grid; font-size: 13px; "> <div style="display: flex; align-items: center; justify-content: start; gap: 20px; "> <div style="width: 75px; padding-left: 8px; "> <img style="width: 85%; " src="' + Branchlogo + '" /> </div> <div style="display: flex; flex-direction: column; font-size: 20px; font-weight: 600; gap:7px;"> <div style="font-size:30px;">' + SchoolName + '</div> <div>Student Fee Collection Summary for the period of ( ' + FromDate + ' to ' + ToDate + ' ) | Branch-' + $('#ddlBranch option:selected').text() +'</div></div> </div> <div style="font-weight: 600; "></div></div>'*/
                            $("#Div1StudentList").DataTable({
                                scrollX: true,
                                scroller: true,
                                destroy: true, scrollY: '45vh',
                                pageLength: 100,
                                columns: StaticColumnHeadSet(columnSet),
                                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                    return nRow;
                                }, language: {
                                    "emptyTable": dataTableNoRecordFoundMsg
                                },

                                dom: 'lBfrtip',
                                buttons: [
                                    {
                                        extend: 'colvis',
                                        text: 'Columns',
                                        init: function (api, node, config) {
                                            $(node).on('click', function () {
                                                // Small delay to wait for menu render
                                                setTimeout(() => {
                                                    if (!$('#colvis-custom').length) {
                                                        let buttons = `
                                              <div id="colvis-custom" style='display: flex;font-size: 12px;justify-content: space-around;margin: 10px 0px;'>
                                                <button class="showAll">Show All</button>
                                                <button class="hideAll">Hide All</button>
                                              </div>`;
                                                        $('.dt-button-collection').prepend(buttons);

                                                        // Add actions
                                                        $('.showAll').on('click', function () {
                                                            api.columns().visible(true);
                                                        });
                                                        $('.hideAll').on('click', function () {
                                                            api.columns().visible(false);
                                                        });
                                                    }
                                                }, 10);
                                            });
                                        }
                                    },
                                    {
                                        extend: 'excel',
                                        title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                        exportOptions: {
                                            // columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,23,24]
                                            columns: ':visible'
                                        }
                                    },
                                    {
                                        //extend: 'pdf',
                                        extend: 'pdfHtml5',

                                        //title: '',

                                        title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                        exportOptions: {
                                            columns: [
                                                0, 1, 2, 4, 5, 6,
                                                8, 9, 10, 12, 13, 14, 15,
                                                16, 17, 18, 19, 20, 21,
                                                23, 26,  27
                                            ]
                                        },
                                        header: true,
                                        pageSize: 'A4',
                                        orientation: 'landscape',
                                        customize: function (doc) {

                                            CommonPdfCustomize(doc, header)
                                            return doc; // VERY IMPORTANT
                                        }
                                    },
                                    {
                                        extend: 'print',
                                        title: '',
                                        orientation: 'landscape',
                                        exportOptions: {
                                            // columns: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
                                            columns: ':visible'
                                        },
                                        customize: function (win) {

                                            CommonPrintCustomize(win, header)
                                        }


                                    },
                                ],
                            });
                        }

                        else {

                            console.log(Branchlogo)
                            //var header = '<table><tr><td><div><img src="' + Branchlogo + '"></img></div></td><td style="text-align:center;vertical-align: middle;"><div style="font-size:23px;margin-bottom:15px;"><b>' + DisplayBranchName + '(' + Session + ')<br>' + AddressLine1 + '<br>' + AffiliationNo + '<br>Fee Collection Summary</b></div></td></tr><tr><td style="width:400px;"></td><td style="text-align:center"><div style="font-size:23px;">From Date ' + FromDate + ' To Date ' +  + '</div></td></tr></table>'
                            var header = '<div style="display: flex;gap: 10px;line-height: 30px;margin-bottom:10px;"><div class="SchoolLogo"><img style="width: 70px;" src="' + Branchlogo + '" alt=""></div><div><div class="SchoolName" style="font-size: xx-large;font-weight: bold;">' + SchoolName + '</div><div class="FileDetails" style="font-size: x-large;">Student Fee Collection Summary for the period of ( ' + FromDate + ' to ' + ToDate + ' ) | Branch-' + $('#ddlBranch option:selected').text() + '</div></div></div>'
                            /*var header = '<div style="height: fit-content; margin-top: 5px;margin-bottom: 5px;width: 100%; background: white; display: grid; font-size: 13px; "> <div style="display: flex; align-items: center; justify-content: start; gap: 20px; "> <div style="width: 75px; padding-left: 8px; "> <img style="width: 85%; " src="' + Branchlogo + '" /> </div> <div style="display: flex; flex-direction: column; font-size: 20px; font-weight: 600; gap:7px;"> <div style="font-size:30px;">' + SchoolName + '</div> <div>Student Fee Collection Summary for the period of ( ' + FromDate + ' to ' + ToDate + ' )</div> </div> </div> <div style="font-weight: 600; "></div></div>'*/
                            $("#Div1StudentList").DataTable({
                                scrollX: true,
                                scroller: true,
                                destroy: true, scrollY: '45vh',
                                pageLength: 100,
                                columns: StaticColumnHeadSet(columnSet),
                                "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                    return nRow;
                                }, language: {
                                    "emptyTable": dataTableNoRecordFoundMsg
                                },

                                dom: 'lBfrtip',
                                buttons: [
                                    {
                                        extend: 'colvis',
                                        text: 'Columns',
                                        init: function (api, node, config) {
                                            $(node).on('click', function () {
                                                // Small delay to wait for menu render
                                                setTimeout(() => {
                                                    if (!$('#colvis-custom').length) {
                                                        let buttons = `
                                                                      <div id="colvis-custom" style='display: flex;font-size: 12px;justify-content: space-around;margin: 10px 0px;'>
                                                                        <button class="showAll">Show All</button>
                                                                        <button class="hideAll">Hide All</button>
                                                                      </div>`;
                                                        $('.dt-button-collection').prepend(buttons);

                                                        // Add actions
                                                        $('.showAll').on('click', function () {
                                                            api.columns().visible(true);
                                                        });
                                                        $('.hideAll').on('click', function () {
                                                            api.columns().visible(false);
                                                        });
                                                    }
                                                }, 10);
                                            });
                                        }
                                    },
                                    {
                                        extend: 'excel',
                                        title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                        exportOptions: {
                                            // columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,23,24]
                                            columns: ':visible'
                                        }
                                    },
                                    {
                                        //extend: 'pdf',
                                        extend: 'pdfHtml5',

                                        //title: '',

                                        title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                        exportOptions: {
                                            // columns: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
                                            columns: ':visible'
                                        },
                                        header: true,
                                        pageSize: 'A4',
                                        orientation: 'landscape',
                                        customize: function (doc) {

                                            CommonPdfCustomize(doc, header)
                                            return doc; // VERY IMPORTANT
                                        }
                                    },
                                    {
                                        extend: 'print',
                                        title: '',
                                        orientation: 'landscape',
                                        exportOptions: {
                                            // columns: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
                                            columns: ':visible'
                                        },
                                        customize: function (win) {

                                            CommonPrintCustomize(win, header)
                                        }


                                    },
                                ],
                            });
                        }
                        // $("#Div1StudentList").DataTable().row(':first').nodes().to$().find('td').css('background-color', 'rgb(247 160 160)')

                        $('select').select2();
                    }
                    else {
                        MessageBoxError("There is no Data Available for Such Criteria.");
                    }
                }
                else {
                    MessageBoxError("There is no Data Available for Such Criteria.");
                }
            }
            else {
                MessageBoxError("There is no Data Available for Such Criteria.");
            }


        },
        complete: function () {

            setTimeout(function () { $("#loader_home").fadeOut("slow"); }, 1);
        },
        error: function (data) {
            MessageBoxError(JSON.stringify(data));
            setTimeout(function () { $("#loader_home").fadeOut("slow"); }, 1);
        }
    });
}



function BindTotalListDayWise() {
    debugger

    var ToDate = $("#txtToDate").val();
    var FromDate = $("#txtFromDate").val();
    var BranchId = $("#ddlBranch").val();

    debugger
    if (BranchId == "0") {
        MessageBoxError("Please Select Branch!");
        $('#ddlBranch').focus();
        $('#ddlBranch').addClass('error_focus');
        $('#ddlBranch').unbind('change');
        $('#ddlBranch').change(function () {
            $('#validationAddStudent').hide();
            $('#validationAddStudent span').html('');
            $("#ddlBranch").removeClass('error_focus');
        });
        return false;
    }

    var BO = {
        "objCashSummaryBO": {
            "BranchId": BranchId,
            "SchoolId": SchoolId,
            "FromDate": FromDate,
            "ToDate": ToDate
        }
    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetDayWiseCashSummary",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {

            $("#Div1StudentListtb").hide();
            $("#Div1StudentList tbody").remove();
            $("#Div1StudentTotalListtb").show();
            $("#Div1StudentTotalList tbody").remove();
            if (data.RecordCount > 0) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        // MessageBox(data.responseMessage);
                        //var Sr=0
                        $.each(data.responseObject, function (i, j) {
                            $.each(j.cashSummaryList, function (c, d) {


                                $("#Div1StudentTotalList").append($("<tr id=TRSchool_" + d.AdmissionNumber + "><td>" + parseInt(c + 1) + "</td><td>" + d.PaidDate + "</td><td>" + d.Receipts + "</td><td>" + d.GrossPayable + "</td><td>" + d.BothDiscount + "</td><td>" + d.Cash + "</td><td>" + d.Cheque + "</td><td>" + d.Online + "</td><td>" + d.Card + "</td><td>" + d.BankTransfer + "</td><td>" + d.Swipe + "</td><td>" + d.Paid + "</td><td>" + d.Balance + "</td></tr>"));

                            });
                        });
                        $('#txtStudentSearch').unbind('keyup');
                        $('#txtStudentSearch').keyup(function () {

                            SearchDatainList(data.responseObject);
                        });

                        var columnSet = [{ "title": "S.No" }, { "title": "Paid Date" }, { "title": "Receipts" }, { "title": "GrossPayable" }, { "title": "Discount" }, { "title": "Cash" }, { "title": "Cheque" }, { "title": "Online" }, { "title": "Card" }, { "title": "Bank Transfer" }, { "title": "RTGS/NEFT" }, { "title": "Paid" }, { "title": "Balance" }]

                        debugger
                        if (BranchId == 1439 || BranchId == 166) {
                            var header = '<table><tr><td style="width:15%"><div><img src="https://www.ptcschoolerp.com/Content/SuperAdminImg/hcci5pra5ix.png" style="width:100px;height:100px"></img></div></td><td style="text-align:center;vertical-align: middle;width:65%"><div style="font-size:23px;margin-bottom:15px;"><b>' + DisplayBranchName + '(' + Session + ')<br>' + AddressLine2 + '<br>' + AffiliationNo + '</br><br>Fee Collection Summary</b></div></td><td style="width:15%"><div><img src="https://www.ptcschoolerp.com/Images/Gurukul.png" style="width:100px;height:100px"></img></div></td></tr><tr><td style="width:400px;"></td><td style="text-align:center"><div style="font-size:23px;">From Date ' + FromDate + ' To Date ' + ToDate + '</div></td></tr></table>'
                        }

                        else {

                            //var header = '<table><tr><td style="width:15%"><div><img src="' + Branchlogo + '" style="width:100px;height:100px"></img></div></td><td style="text-align:center;vertical-align: middle;width:65%"><div style="font-size:23px;margin-bottom:15px;"><b>' + DisplayBranchName + '(' + Session + ')<br>' + AddressLine1 + '<br>' + AffiliationNo + '<br>Fee Collection Summary</b></div></td><td style="width:15%"></tr><tr><td style="width:400px;"></td><td style="text-align:center"><div style="font-size:23px;">From Date ' + FromDate + ' To Date ' + ToDate + '</div></td></tr></table>'
                            var header = '<div style="height: fit-content; margin-top: 5px;margin-bottom: 5px;width: 100%; background: white; display: grid; font-size: 13px; "> <div style="display: flex; align-items: center; justify-content: start; gap: 20px; "> <div style="width: 75px; padding-left: 8px; "> <img style="width: 85%; " src="' + Branchlogo + '" /> </div> <div style="display: flex; flex-direction: column; font-size: 20px; font-weight: 600; gap:7px;"> <div style="font-size:30px;">' + SchoolName + '</div> <div>Student Fee Collection Summary for the period of ( ' + FromDate + ' to ' + ToDate + ' )</div> </div> </div> <div style="font-weight: 600; "></div></div>'
                        }
                        debugger
                        
                        $("#Div1StudentTotalList").DataTable({
                            scrollX: true,
                            scroller: true,
                            destroy: true, scrollY: '45vh',
                            pageLength: 100,
                            columns: StaticColumnHeadSet(columnSet),
                            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                return nRow;
                            }, language: {
                                "emptyTable": dataTableNoRecordFoundMsg
                            },

                            dom: 'lBfrtip',
                            buttons: [{
                                extend: 'colvis',
                                text: 'Columns',
                                init: function (api, node, config) {
                                    $(node).on('click', function () {
                                        // Small delay to wait for menu render
                                        setTimeout(() => {
                                            if (!$('#colvis-custom').length) {
                                                let buttons = `
                                                                      <div id="colvis-custom" style='display: flex;font-size: 12px;justify-content: space-around;margin: 10px 0px;'>
                                                                        <button class="showAll">Show All</button>
                                                                        <button class="hideAll">Hide All</button>
                                                                      </div>`;
                                                $('.dt-button-collection').prepend(buttons);

                                                // Add actions
                                                $('.showAll').on('click', function () {
                                                    api.columns().visible(true);
                                                });
                                                $('.hideAll').on('click', function () {
                                                    api.columns().visible(false);
                                                });
                                            }
                                        }, 10);
                                    });
                                }
                            },
                                {
                                    extend: 'excel',
                                    title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),

                                },
                                {
                                    extend: 'pdf',
                                    //title: '',

                                    title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
                                    exportOptions: {
                                        // columns: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
                                        columns: ':visible'
                                    },
                                    header: true,
                                    orientation: 'landscape',
                                    pageSize: 'A4',
                                    customize: function (doc) {

                                        CommonPdfCustomize(doc, header)

                                    }
                                },
                                {
                                    extend: 'print',
                                    title: '',
                                    orientation: 'landscape',

                                    customize: function (win) {

                                        CommonPrintCustomize(win, header)
                                    }


                                },


                            ],
                        });
                        //$("#Div1StudentTotalList").DataTable().row(':first').nodes().to$().find('td').css('background-color', 'rgb(247 160 160)')
                        $('select').select2();
                    }
                    else {
                        MessageBoxError("There is no Data Available for Such Criteria.");
                    }
                }
                else {
                    MessageBoxError("There is no Data Available for Such Criteria.");
                }
            }
            else {
                MessageBoxError("There is no Data Available for Such Criteria.");
            }


        },
        complete: function () {

            setTimeout(function () { $("#loader_home").fadeOut("slow"); }, 1);
        },
        error: function (data) {
            MessageBoxError(JSON.stringify(data));
            setTimeout(function () { $("#loader_home").fadeOut("slow"); }, 1);
        }
    });
}


function ResetControl() {
    $('#txtStudentName').val('');
    $('#txtEnrollmentNo').val('');
    $('#txtFatherName').val('');
    $('#txtMotherName').val('');
    $('#ddlCountry').select2('val', 0);
    $('#ddlState').select2('val', 0);
    $('#ddlState').find('option').not(':first').remove();
    $('#ddlCity').select2('val', 0);
    $('#ddlCity').find('option').not(':first').remove();
    $('#ddlBranch').select2('val', 0);
    $('#ddlBranch').find('option').not(':first').remove();
    $('#txtMobileNo1').val('');
    $('#txtMobileNo2').val('');
    $('#txtLandlineNo').val('');
    $('#txtPincode').val('');
    $('#txtRollno').val('');
    $('#txtAddressLine1').val('');
    $('#txtAddressLine2').val('');
    $('#btnSaveStudent').val('Save');
    $('#DivSubjectList').empty();
    $('#ddlClass').select2('val', 0);
    $('#ddlClass').find('option').not(':first').remove();
    $('#validationAddStudent').hide();
    $('#validationAddStudent span').html('');
    $('#ddlSection').select2('val', 0);
    $('#ddlSection').find('option').not(':first').remove();
    $(".error_focus").removeClass('error_focus');
    $("#txtDOB").datepicker({
        changeMonth: true,
        changeYear: true,
        maxDate: 0,
        dateFormat: "dd-mm-yy",
        onSelect: function (selected, evnt) {
            if ($(this).val().length > 0) {
                $('#validationAddExam').hide();
                $('#validationAddExam span').html('');
                $("#txtExamName").removeClass('error_focus');
            }
        },
    }).datepicker("setDate", new Date());


    $('#txtAdmissionNo').val('');
    $('#ddlCategory').select2('val', 0);
    $('#txtAadharNumber').val('');
    $('#txtBankAccountNo').val('');
    $('#ddlRoute').select2('val', 0);
    $('#ddlRoute').find('option').not(':first').remove();
    $('#ddlTerminal').select2('val', 0);
    $('#ddlTerminal').find('option').not(':first').remove();
    $('#ddlFatherOccupation').select2('val', 0);
    $('#ddlFatherQualification').select2('val', 0);
    $('#ddlMotherOccupation').select2('val', 0);
    $('#ddlMotherQualification').select2('val', 0);

    $("#txtAnniversaryDate").datepicker({
        changeMonth: true,
        changeYear: true,
        maxDate: 0,
        dateFormat: "dd-mm-yy",
        onSelect: function (selected, evnt) {
            if ($(this).val().length > 0) {
                $('#validationAddExam').hide();
                $('#validationAddExam span').html('');
                $("#txtExamName").removeClass('error_focus');
            }
        },
    }).datepicker("setDate", new Date());

    $("#txtAdmissionDate").datepicker({
        changeMonth: true,
        changeYear: true,
        maxDate: 0,
        dateFormat: "dd-mm-yy",
        onSelect: function (selected, evnt) {
            if ($(this).val().length > 0) {
                $('#validationAddExam').hide();
                $('#validationAddExam span').html('');
                $("#txtExamName").removeClass('error_focus');
            }
        },
    }).datepicker("setDate", new Date());

}

function ProcessExcel(data, StudentID) {
    var workbook = XLSX.read(data, {
        type: 'binary'
    });
    var firstSheet = workbook.SheetNames[0];
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    var excelHeaderRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], { header: 1 });
    //------------------------- Testing Purpose Excel Import Code Starts
    var columnsList = 'StudentName,EnrollmentNo,Gender,Class,City,MobileNo1,MobileNo2,LandlineNo,Pincode,AddressLine1,AddressLine2,FatherName,MotherName,BatchNo,DOB,Branch,RollNo,Section';
    var columncount = 18;
    var columnsinExcel = '';
    var columnscountinExcel = 0;
    if (excelHeaderRows != null) {
        var columnsIn = excelHeaderRows[0];
        $.each(columnsIn, function (k, v) {
            columnsinExcel += v + ',';
            if (columnsList.indexOf(v) == -1) {
                alert("Invalid Column - " + v + "\r\nColumn Name should be " + columnsList);
                return;
            }
            columnscountinExcel++;
        });
        columnsinExcel = columnsinExcel.slice(0, -1);
        if (columncount != columnscountinExcel) {
            //MessageBoxError('No of columns do not match \r\nColumns in Excel are ' + columnsinExcel + ' and \r\nexact columns that need to be in excel are ' + columnsList)
            alert('No of columns do not match \r\nColumns in Excel are ' + columnsinExcel + ' and \r\nexact columns that need to be in excel are ' + columnsList);
            return;
        }
    }
    //------------------------------------Testing Purpose Excel Import Code Ends
    var BO = {
        "objStudent":
        {
            "StudentId": StudentID,
            "lstExcel": excelRows,
            "Key": GlobalKey,
            "SchoolId": GlobalSchoolId
        }
    };
    var ConfirmationMessage = '';
    ConfirmationMessage = "Do you want to Import Student List ?";
    lnv.confirm({
        title: 'Confirmation',
        confirmBtnText: 'Confirm',
        content: ConfirmationMessage,
        confirmHandler: function () {
            $.ajax({
                type: "POST",
                url: ServiceUrl + "/ImportStudent",
                dataType: "json",
                data: JSON.stringify(BO),
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loader_home').show();
                },
                success: function (response) {

                    if (response.responseCode == "1") {
                        if (response.responseObject != null) {
                            if (response.responseObject.length > 0) {
                                MessageBox(response.responseMessage);
                                //BindStudentList();
                                $('#divImportStudents').slideUp();
                            }
                            else {
                                MessageBoxError(response.responseMessage);
                            }
                        } else {
                            MessageBoxError(response.responseMessage);
                        }
                    } else {
                        MessageBoxError(response.responseMessage);
                    }
                    setTimeout(function () { $('#loader_home').fadeOut("slow"); }, 1);
                },
                error: function (data) {
                    MessageBoxError(JSON.stringify(data));
                    setTimeout(function () { $('#loader_home').fadeOut("slow"); }, 1);
                }
            });
        },
        cancelHandler: function () {
            return false;
        }
    });
}


function GetAllBranchDetails() {
    debugger
    var BranchMasterId;

    var Branchid = $('#ddlBranch').val();

    var BO = {
        "objGetBranchDetailsBO": {
            "BranchId": Branchid
        }
    }

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetAllBranchDetails",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {

        },
        success: function (data) {

            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {

                        //$.each(data.responseObject, function (i, d) {

                            //$.each(d.getBranchDetailsList, function (l, m) {

                            let m = data.responseObject[0].getBranchDetailsList[0];

                                console.log(data)


                                DisplayBranchName = m.DisplayBranchName;
                                var BranchMasterId = m.BranchMasterId;
                                var BranchName = m.BranchName;
                                AffiliationNo = m.AffiliationNo;
                                AddressLine2 = m.AddressLine2;
                                AddressLine1 = m.AddressLine1;
                                Session = m.Session;
                                console.log(DisplayBranchName)
                                Branchlogo = m.BranchLogo
                                GlobalBranchlogo = m.BranchLogo
                                console.log(Branchlogo)



                                $("#txtDisplayBranchName").html(DisplayBranchName);
                                $("#txtBranch").html(BranchMasterId);
                                $("#txtBranchName").html(BranchName);
                                $("#txtBranchLogo").html(m.BranchLogo);
                                $("#txtAffiliationNo").html(AffiliationNo);
                                $("#txtAddressLine1").html(AddressLine2);
                                $("#txtAddressLine2").html(AddressLine1);
                                $("#txtSession").html(Session);

                            //});



                        //});


                    }



                }
            } else {
                MessageBoxError(response.responseMessage);
            }

        },
        complete: function () {


        },
        error: function (data) {
            alert(JSON.stringify(data));

        }
    });

}

function ChangeBranch() {

    if ($("#ddlBranch").val() > 0) {

        GetAllBranchDetails();
        console.log(GlobalBranchlogo)
        if ([1203, 1210].includes(+SchoolId)) {
            debugger
            BindStudentListHolyChild();
        }
        else if ($("#ddlBranch").val() == 1444 || $("#ddlBranch").val() == 1479 || $("#ddlBranch").val() == 1480 || $("#ddlBranch").val() == 1488) {
            debugger
            BindStudentListHolyChild();
        }
        else {
            debugger
            BindStudentList();
        }
    }
}


function BindBranchDropDown(ControlId, SelectedValue, Action, SchoolId, BranchId) {

    var BO = {
        "objBranchMaster":
        {
            "Key": GlobalKey,
            "SchoolId": SchoolId,
            "Action": Action,
            "BranchId": BranchId
        }
    };
    $('#' + ControlId).find('option').not(':first').remove();;

    var SelectedBranchId = 0;
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetDeleteBranchMasterList",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            //BranchName,BranchId
            if (response.responseCode == "1") {
                if (response.responseObject != null) {
                    $.each(response.responseObject, function (i, d) {
                        $("#" + ControlId).append($("<option></option>").val(d.BranchId).html(d.BranchName));

                    });
                }
            } else {
                MessageBoxError("Branch not found !");
            }
            $('#' + ControlId).val(SelectedBranchId);

            $('select').select2();
        },
        complete: function () {
            debugger
            ChangeBranch();

        },

    });
}



function BindStudentListWithReceiptNo() {

    var Branchid = $('#ddlBranch').val();
    var Branch = $('#txtBranch').text();
    var BranchName = $('#txtBranchName').text();
    var Branchlogo = $('#txtBranchLogo').text();
    var FromReceipt = $("#txtFromReceiptNo").val();
    var ToReceipt = $("#txtToReceiptNo").val();
    var BranchId = $("#ddlBranch").val();

    debugger
    var BO = {
        "objCashSummaryBO": {
            "BranchId": BranchId,
            "SchoolId": SchoolId,
            "FromReceipt": FromReceipt,
            "ToReceipt": ToReceipt
        }
    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetCashSummaryWithReceiptNo",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {

            console.log(data)
            $("#Div1StudentTotalListtb").hide();
            $("#Div1StudentTotalList tbody").remove();
            $("#Div1StudentListtb").show();
            $("#Div1StudentList tbody").remove();

            if (data.RecordCount > 0) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        debugger
                        $.each(data.responseObject, function (i, j) {
                            $.each(j.cashSummaryList, function (c, d) {


                                $("#Div1StudentList").append($("<tr id=TRSchool_" + d.AdmissionNumber + "><td>" + parseInt(c + 1) + "</td><td>" + d.PaidStatus + "</td><td> " + ((d.Receiptno == "" || d.Receiptno == null) ? "" : d.Receiptno) + " </td><td> " + ((d.Months == "") ? "Total" : d.Months) + " </td><td>" + ((d.StudentId == "" || d.StudentId == null) ? "" : d.StudentId) + "</td><td>" + d.StudentName + "</td><td>" + d.FatherName + "</td><td>" + d.MotherName + "</td><td> " + d.AdmissionNumber + " </td><td>" + d.ClassMasterName + "</td><td>" + d.SectionName + "</td><td>" + d.PaymentMode + "</td><td>" + d.ChequeDDCardNo + "</td><td>" + d.BankName + "</td><td>" + d.GrossPayable + "</td><td>" + d.BothDiscount + "</td><td>" + d.Paid + "</td><td>" + d.Balance + "</td><td>" + d.PaidDate + "</td><td>" + d.Cash + "</td><td>" + d.Cheque + "</td><td>" + d.Online + "</td><td>" + d.Card + "</td><td>" + d.BankTransfer + "</td><td>" + d.Gateway + "</td><td>" + d.Remarks + "</td><td>" + d.UserName + "</td></tr>"));


                                /*$("#Div1StudentList").append($("<tr id=TRSchool_" + d.AdmissionNumber + "><td>" + parseInt(c + 1) + "</td><td> " + d.Receiptno + " </td><td> " + d.Createdon + " </td><td> " + d.AdmissionNumber + " </td><td>" + d.StudentName + "</td><td>" + d.Paid + "</td><td>" + d.PaymentMode + "</td><td>" + d.BankName + "</td><td>" + d.PaidDate + "</td><td>" + d.Remarks + "</td></tr>"));*/

                            });
                        });


                        debugger

                        $('#txtStudentSearch').unbind('keyup');
                        $('#txtStudentSearch').keyup(function () {

                            SearchDatainList(data.responseObject);
                        });
                        var columnSet = [{ "title": "S.No" }, { "title": "Status" }, { "title": "Receipt No." }, { "title": "Month" }, { "title": "SID" }, { "title": "Student" }, { "title": "Father" }, { "title": "Mother" }, { "title": "Hostel No." }, { "title": "Class" }, { "title": "Section" }, { "title": "Mode" }, { "title": "Cheque No" }, { "title": "Bank Name" }, { "title": "Gross Payable" }, { "title": "Discount" }, { "title": "Paid" }, { "title": "Balance" }, { "title": "Paid Date" }, { "title": "Cash" }, { "title": "Cheque" }, { "title": "Online" }, { "title": "Card" }, { "title": "Bank Transfer" }, { "title": "Online Gateway" }, { "title": "Remarks Transfer" }, { "title": "User Name" }]
                        /*       var columnSet = [{ "title": "S.No" }, { "title": "Receipt No." }, { "title": "Date of Receipt" }, { "title": "HNO" }, { "title": "Student" }, { "title": "Amount" }, { "title": "Payment Mode" }, { "title": "Bank Name" }, { "title": "Date of Payment" }, { "title": "Remarks" }];*/


                        debugger
                        var header = '<table><tr><td><div><img src="' + Branchlogo + '"></img></div></td><td style="text-align:center;vertical-align: middle;"><div style="font-size:23px;margin-bottom:15px;"><b>' + DisplayBranchName + '(' + Session + ')<br>' + AddressLine1 + '<br>' + AffiliationNo + '<br>Fee Collection Summary</b></div></td></tr><tr><td style="width:400px;"></td><td style="text-align:center"><div style="font-size:23px;">From ReceiptNo ' + FromReceipt + ' To ReceiptNo ' + ToReceipt + '</div></td></tr></table>'
                        debugger

                        $("#Div1StudentList").DataTable({


                            scrollX: true,
                            scroller: true,
                            destroy: true,
                            scrollY: '45vh',
                            pageLength: 100,
                            columns: StaticColumnHeadSet(columnSet),
                            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                return nRow;
                            }, language: {
                                "emptyTable": dataTableNoRecordFoundMsg
                            },

                            dom: 'lBfrtip',
                            buttons: [
                                {
                                    extend: 'excel',
                                    title: 'Fee Collection Summary' + '_(From ReceiptNo ' + FromReceipt + ' To ReceiptNo ' + ToReceipt + ')_' + $("#ddlBranch :selected").text().trim(),

                                },
                                {
                                    extend: 'pdf',
                                    title: 'Fee Collection Summary' + '_(From ReceiptNo ' + FromReceipt + ' To ReceiptNo ' + ToReceipt + ')_ ' + $("#ddlBranch :selected").text().trim(),

                                    header: true,
                                    orientation: 'landscape',
                                    customize: function (doc) {
                                        doc.defaultStyle.alignment = 'center'
                                        doc.pageMargins = [15, 15, 15, 15];
                                        doc.styles.tableHeader.fontSize = 16;
                                        doc.defaultStyle.fontSize = 16; //<-- set fontsize to 16 instead of 10 



                                    }
                                },


                                {


                                    extend: 'print',
                                    title: '',
                                    orientation: 'landscape',

                                    customize: function (win) {
                                        $(win.document.body)
                                            .css('font-size', '1px')
                                            .prepend(header);

                                        $(win.document.body).find('table')
                                            .addClass('compact')
                                            .css('font-size', 'inherit');
                                    }

                                },

                            ],
                        });


                        $('select').select2();
                    }
                    else {
                        MessageBoxError("There is no Data Available for Such Criteria.");
                    }
                }
                else {
                    MessageBoxError("There is no Data Available for Such Criteria.");
                }
            }
            else {
                MessageBoxError("There is no Data Available for Such Criteria.");
            }


        },
        complete: function () {

            setTimeout(function () { $("#loader_home").fadeOut("slow"); }, 1);
        },
        error: function (data) {
            MessageBoxError(JSON.stringify(data));
            setTimeout(function () { $("#loader_home").fadeOut("slow"); }, 1);
        }
    });
}


function BindBranchAutoSelect(ControlId, SelectedValue, Action, SchoolId, BranchId) {

    var BO = {
        "objBranchMaster":
        {
            "Key": GlobalKey,
            "SchoolId": SchoolId,
            "Action": Action,
            "BranchId": BranchId
        }
    };
    $('#' + ControlId).unbind("select2-opening");
    $('#' + ControlId).find('option').not(':first').remove();

    var SelectedBranchId = 0;

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetDeleteBranchMasterList",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            //BranchName,BranchId
            if (response.responseCode == "1") {
                if (response.responseObject != null) {

                    $.each(response.responseObject, function (i, d) {
                        // $('#' + ControlId).unbind("select2-opening");

                        $("#" + ControlId).append($("<option></option>").val(d.BranchId).html(d.BranchName));
                        SelectedBranchId = d.BranchId;
                    });

                }
            } else {
                MessageBoxError("Branch not found !");
            }

            $('#' + ControlId).select2('val', SelectedBranchId);


            ChangeBranch();
            // BindBookList(0, SchoolId, $("#ddlBranch").val());

        }

    });


}

function BindBranchDropDownAutoselect1(ControlId, SelectedValue) {
    debugger
    var GlobalAppAccessId = GetUserSession('AppAccessID');

    CheckValidUserRequest(GlobalAppAccessId);
    var BranchIdList = GetUserSession('BranchIdList');
    BranchIdList = JSON.parse(BranchIdList);

    $('#' + ControlId).unbind("select2-opening");
    $('#' + ControlId).find('option').not(':first').remove();


    if (BranchIdList != null) {
        if (BranchIdList.length > 0) {
            var SelectedBranchId = 0;

            debugger
            $.each(BranchIdList, function (i, d) {
                //$('#' + ControlId).unbind("select2-opening");
                //$('#' + ControlId).find('option').remove();
                $("#" + ControlId).append($("<option></option>").val(d.BranchId).html(d.BranchName));
                SelectedBranchId = d.BranchId;
            });


            $('#' + ControlId).select2('val', SelectedBranchId);

        }
        else {
            MessageBoxError("Branch not found !");
        }
    } else {
        MessageBoxError("Branch not found !");
    }
    if (SelectedValue != 0) {
        $('#' + ControlId).select2('val', SelectedValue);
    }


    //   BindBookList(0, SchoolId, $("#ddlBranch").val());
}


function StaticColumnHeadSet(ColumnSet) {
    let array = []
    ColumnSet.forEach((Value, index) => {
        array.push({ data: Value.title, title: toProperLabel(Value.title, { "S.no": "Sr._No.","Rtgs/neft":"RTGS/NEFT" }) })
    })

    return array
}


function toProperLabel(Data, Labels, ShortWorkdPar) {
    let str = Data.toString()
    const specialLabels = {
        grossPayable: "Gross_Revenue",
        netPayable: "Net_Revenue",
        receiptNo: "Receipt_No.",
        receiptno: "Receipt_No.",
        netamount: "Net_Amount", "s.": "Sr.",
        srno: "Sr._No.", ...Labels
    };

    const shortWords = {
        adm: "Adm.",
        reg: "Reg.",
        sec: "Sec.",
        std: "Std.",
        sr: "Sr.",
        no: "No.",
        id: "ID",
        dob: "DOB", inst: "Inst.", ...ShortWorkdPar
    };

    if (!str) return "";

    const key = str.toString().toLowerCase();

    // 1️⃣ Special keyword check
    const found = Object.keys(specialLabels)
        .find(k => k.toLowerCase() === key);

    if (found) return specialLabels[found];

    // 2️⃣ Normalize text (underscore + camelcase → separate words)
    let result = str
        .replace(/_+/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();

    // 3️⃣ Auto-capitalize & short-word conversion (case-insensitive)
    result = result
        .split(" ")
        .map(word => {
            const lower = word.toLowerCase();
            return shortWords[lower]
                ? shortWords[lower]          // short word (Adm.)
                : word.charAt(0).toUpperCase() + word.slice(1); // Normal capitalize
        })
        .join("_");

    return result;
}


function PageBottomTitle(pageCountforpdf) {


    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    var currentDate = now.getDate().toString().padStart(2, '0') + '/'
        + (now.getMonth() + 1).toString().padStart(2, '0') + '/'
        + now.getFullYear();

    var currentTime = hours + ':' + minutes + ' ' + ampm;

    let PageCount = '| Page " counter(page) " of " counter(pages)"'
    if (pageCountforpdf) {
        PageCount = ''
    }
    // Plain text footer line
    var footerText = `${SchoolName} | Student Fee Collection Summary | Branch- ${$('#ddlBranch option:selected').text()} | Printed by ${DisplayName} | ${currentDate} ${currentTime} | Powered by PTC Circle IT Services Pvt. Ltd. ${PageCount}`;
    return footerText

}

function CommonPrintCustomize(win, header) {
    $(win.document.body)
        .css('font-size', '10pt')
        .prepend(header);

    $(win.document.head).append(`
              <style>
                  /* Footer style */
                  @page{
                      @bottom-left{
                          content: "${PageBottomTitle()}";margin-bottom:30px;
                          font-size:10px;
                  }
                  }
              </style>
          `);

    $(win.document.body).find('table')
        .addClass('compact')
        .css('font-size', 'inherit');
}
//function CommonPdfCustomize(doc, headerHtml) {

//    doc.footer = function (page, pages) {

//        var footerText = PageBottomTitle("pdf") + `| Page ${page} of ${pages}`;

//        return {
//            columns: [
//                {
//                    text: footerText,
//                    alignment: 'left',
//                    margin: [10, 5]
//                }
//            ]
//        };
//    };
//}

//function CommonPdfCustomize(doc, headerHtml) {
//    debugger
//    // -----------------------------
//    // OLD SETTINGS (RESTORED)
//    // -----------------------------
//    doc.defaultStyle.alignment = 'center';
//    doc.pageMargins = [10, 10, 10, 10];
//    doc.styles.tableHeader.fontSize = 7;
//    doc.defaultStyle.fontSize = 7;

//    // -----------------------------
//    // FOOTER (NEW CODE)
//    // -----------------------------
//    doc.footer = function (page, pages) {

//        var footerText = PageBottomTitle("pdf") + ` | Page ${page} of ${pages}`;

//        return {
//            columns: [
//                {
//                    text: footerText,
//                    alignment: 'center',
//                    margin: [10, 5]
//                }
//            ]
//        };
//    };
//}


function CommonPdfCustomize(doc, headerHtml) {
    debugger
    // -----------------------------
    // OLD SETTINGS (RESTORED)
    // -----------------------------

    //doc.pageMargins = [5, 5, 5, 5];
    doc.defaultStyle.alignment = 'center';
    //doc.pageMargins = [10, 10, 10, 10];
    doc.pageMargins = [0, 0, 0, 0];
    doc.styles.tableHeader.fontSize = 7;
    doc.defaultStyle.fontSize = 7;

    doc.content[0].layout = {
        paddingLeft: function (i, node) { return 0; },
        paddingRight: function (i, node) { return 0; },

    };

    // -----------------------------
    // FOOTER (NEW CODE)
    // -----------------------------
    doc.footer = function (page, pages) {

        var footerText = PageBottomTitle("pdf") + ` | Page ${page} of ${pages}`;

        return {
            columns: [
                {
                    text: footerText,
                    alignment: 'center',
                    margin: [5, 2]
                }
            ]
        };
    };
}
function attachRowHighlight(tableId) {

    // Add CSS only once
    if ($("#rowHighlightStyle").length === 0) {
        $('head').append(`
            <style id="rowHighlightStyle">
                .selected-row td{
                    background-color: #ffeeba !important;
                }
            </style>
        `);
    }

    // Attach click event for dynamic rows
    $(document).on('click', `${tableId} tbody tr`, function () {
        $(`${tableId} tbody tr`).removeClass('selected-row');
        $(this).addClass('selected-row');
    });
}


//{
//    extend: 'pdf',
//        title: 'Fee Collection Summary' + '_(From ' + FromDate + ' To ' + ToDate + ')_' + $("#ddlBranch :selected").text().trim(),
//            exportOptions: {
//        // columns: [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
//        columns: ':visible'
//    },
//    header: true,
//        orientation: 'landscape',
//            customize: function (doc) {
//                doc.defaultStyle.alignment = 'center'
//                doc.pageMargins = [10, 10, 10, 10];
//                doc.styles.tableHeader.fontSize = 7;
//                doc.defaultStyle.fontSize = 7; //<-- set fontsize to 16 instead of 10 
//            }
//},
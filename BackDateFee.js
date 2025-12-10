var AppAccessTypeId;
var GlobalAppAccessId;
var StaffId;
var SchoolId;
var AutocompleteObject = [];
var SenderId = "";
$(document).ready(function () {

    GlobalBrId = GetUserSession('BRId');
    SchoolId = GetUserSession('SchoolId');
    GlobalAppAccessId = GetUserSession('AppAccessID');
    AppAccessTypeId = GetUserSession('AppAccessTypeID');
    CheckValidUserRequest(GlobalAppAccessId);


    $('#StaffNameHide2').hide();
    $('#StaffNameHide').hide();

    $('select').select2();
    $('#btnAddFeeNew').show();
    //--------for Fee Priority---------

    $('#txtTotalPaid').on('keyup', function () {
        debugger
        CalculateFeeOnPriotiry();
    });
    //--------for Fee Priority---------

    $('#chkbox').click(function () {
        ///////
        debugger
        var checked_status = this.checked;
        $('#ddlRMonth input[type=checkbox]').not("[disabled]").each(function () {

            this.checked = checked_status


        })

    })
    //--------for Discount Priority---------
    $('#txtTotalDiscount').on('keyup', function () {
        debugger
        CalculateDiscountOnPriotiry();
    });
    //--------for Discount Priority---------
    //$("#txtFeeDate").on('keyup', function () {

    //    debugger

    //    const dateInput = document.getElementById('txtFeeDate');

    //    if (dateInput.value.length == 2) {
    //        document.getElementById('txtFeeDate').value = dateInput.value + '-'
    //    }

    //    if (dateInput.value.length == 5) {
    //        document.getElementById('txtFeeDate').value = dateInput.value + '-'
    //    }


    //});

    document.getElementById("txtAdmno").addEventListener("keydown", function (event) {
        // Check if the key pressed is Enter (key code 13)
        if (event.keyCode === 13) {


            var Admno = $('#Admno').val();


            if (Admno == "") {
                $('#txtAdmno').focus();
                $('#validationStudentFee').show();
                $('#validationStudentFee span').html('Please Enter Admission No.!');
                $('#txtAdmno').addClass('error_focus');
                $('#txtAdmno').unbind('keyup');
                $('#txtAdmno').keyup(function () {
                    $('#validationStudentFee').hide();
                    $('#validationStudentFee span').html('');
                    $("#txtAdmno").removeClass('error_focus');
                });
                return false;
            }
            BindStudentRecordAdmno('Save', $("#txtAdmno").val());
        }
    });

    //$('#txtMobileNo').hide();

    debugger
    if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

        BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

        $("#ddlBranch").unbind('change')
        $("#ddlBranch").change(function () {
            ChangeBranch();
        });

    } else {

        BindBranchDropDownAutoselect('ddlBranch', 0);

        ChangeBranch();

        $("#ddlBranch").unbind('change')
        $("#ddlBranch").change(function () {
            ChangeBranch();
        });
    }





    //$("button").click(function(){
    //    $(".autocomplete-suggestions").empty();
    //});


    var OtherFee = $('#txtOtherFee').val();
    var SId = $("#txtSid").val();
    $("#ddlBranch").off('select2-opening');

    $("#ddlBranch").select2().on("select2-opening", function () {
        if (AppAccessTypeId == 101) {
            BindBranchDropDown('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);
        }
        else if (AppAccessTypeId == 102) {
            BindBranchDropDown('ddlBranch', 0, 'GETBRANCH', 0, GlobalBrId);
        }
        else {
            BindBranchListLocal('ddlBranch', 0);
        }

        $("#ddlBranch").unbind('change');
        $("#ddlBranch").change(function () {
            debugger
            $('#validationStudentFee').hide();
            $('#validationStudentFee span').html('');
            $("#ddlBranch").removeClass('error_focus');

            $("#DivStudentFee").show();
            $("#tblfees tbody").empty();

            BranchResetControl();

            if ($("#ddlBranch").val() > 0) {

                $("#ddlClass").off('select2-opening');
                $("#ddlClass").select2().on("select2-opening", function () {

                    BindClass('ddlClass', 0, $("#ddlBranch").val());

                    $("#ddlClass").unbind('change');
                    $("#ddlClass").change(function () {

                        $('#validationStudentFee').hide();
                        $('#validationStudentFee span').html('');
                        $("#ddlClass").removeClass('error_focus');

                        $("#DivStudentFee").show();
                        $("#tblfees tbody").empty();

                        ClassResetControl();

                        if ($("#ddlClass").val() > 0) {

                            $("#ddlSec").off('select2-opening');
                            $("#ddlSec").select2().on("select2-opening", function () {

                                BindSection('ddlSec', 0, $("#ddlClass").val(), $("#ddlBranch").val());

                                $("#ddlSec").unbind('change');
                                $("#ddlSec").change(function () {

                                    $('#validationStudentFee').hide();
                                    $('#validationStudentFee span').html('');
                                    $("#ddlSec").removeClass('error_focus');

                                    $("#DivStudentFee").show();
                                    $("#tblfees tbody").empty();

                                    SectionResetControl();

                                    if ($("#ddlSec").val() > 0) {

                                        //BindStudentList('ddlstudent', 0);
                                        $("#ddlstudent").off('select2-opening');
                                        $("#ddlstudent").select2().on("select2-opening", function () {
                                            BindStudentList('ddlstudent', 0);

                                            $("#ddlstudent").unbind('change');
                                            $("#ddlstudent").change(function () {

                                                $('#validationStudentFee').hide();
                                                $('#validationStudentFee span').html('');
                                                $("#ddlstudent").removeClass('error_focus');

                                                StudentResetControl();

                                                if ($("#ddlstudent").val() > 0) {

                                                    $("#DivStudentFee").show();
                                                    $("#tblfees tbody").empty();

                                                    BindStudentRecordSid('Save', $("#ddlstudent").val());

                                                } else {
                                                    StudentResetControl();
                                                }
                                            });

                                        });
                                    }
                                    else {
                                        SectionResetControl();
                                    }
                                });
                            });
                        }
                        else {
                            ClassResetControl();
                        }
                    });

                });

                $("#ddlRoute").off('select2-opening');
                $("#ddlRoute").select2().on("select2-opening", function () {
                    BindRoute('ddlRoute', 0, $("#ddlBranch").val());
                });

                $("#ddlFeeGroup").off('select2-opening');
                $("#ddlFeeGroup").select2().on("select2-opening", function () {
                    BindFeeType('ddlFeeGroup', 0, $("#ddlBranch").val());
                });

                $("#ddlConcession").off('select2-opening');
                $("#ddlConcession").select2().on("select2-opening", function () {

                    BindConcessionDropDown('ddlConcession', 0, $("#ddlBranch").val());

                });

                $("#txtSid").unbind('click');
                $("#txtSid").click(function () {

                    var BranchId = $('#ddlBranch').val();
                    var StudentId = $('#txtSid').val();
                    //if (BranchId == "0") {
                    //    $('#ddlBranch').focus();
                    //    $('#validationStudentFee').show();
                    //    $('#validationStudentFee span').html('Please Select Branch!');
                    //    $('#ddlBranch').addClass('error_focus');
                    //    $('#ddlBranch').unbind('keyup');
                    //    $('#ddlBranch').keyup(function () {
                    //        $('#validationStudentFee').hide();
                    //        $('#validationStudentFee span').html('');
                    //        $("#ddlBranch").removeClass('error_focus');
                    //    });
                    //    return false;
                    //}

                    if (StudentId == "") {
                        $('#txtSid').focus();
                        $('#validationStudentFee').show();
                        $('#validationStudentFee span').html('Please Enter StudentId!');
                        $('#txtSid').addClass('error_focus');
                        $('#txtSid').unbind('keyup');
                        $('#txtSid').keyup(function () {
                            $('#validationStudentFee').hide();
                            $('#validationStudentFee span').html('');
                            $("#txtSid").removeClass('error_focus');
                        });
                        return false;
                    }
                    BindStudentRecordSid('Save', $("#txtSid").val());
                });












            }
            else {
                BranchResetControl();
            }
        });
    });

    $('#NotMonth').unbind('click');
    $('#NotMonth').click(function () {
        $('#divAddNotMonth').slideDown();
        var BranchId = $("#ddlBranch").val();
        var StudentId = $("#txtSid").val();
        $("#ddlRMonth tbody").empty();
        BindPaidMonthsDropDown('ddlRMonth', 0, BranchId, StudentId)



    })



    $('#btnViewFee').unbind('click');
    $('#btnViewFee').click(function () {
        debugger

        var sid = $("#txtSid").val();
        var BranchId = $("#ddlBranch").val();
        var StudentId = $("#txtSid").val();
        var RMonth = $("#ddlMonth").val();


        if (BranchId == "0") {
            alert("Please Select Branch !");
            return false;
        }

        if (StudentId == "" || StudentId == null) {
            alert("Please Select Student !");
            return false;
        }

        if (RMonth == "0") {
            alert("Please Select Month !");
            return false;
        }

        studentFeeListbyMonthTest2(sid, BranchId, ddlMonth)

    });


    $('#btnReviseTransport').unbind('click');
    $('#btnReviseTransport').click(function () {
        debugger


        var BranchId = $("#ddlBranch").val();
        var StudentId = $("#txtSid").val();
        var RMonth = $("#ddlRMonth").val();



        var MonthIdList = [];
        var MonthId = "";
        $('#ddlRMonth input[name=MonthList]:checked').each(function (a, b) {

            debugger
            MonthId = b.id
            MonthIdList.push(MonthId);
        });

        console.log(MonthIdList)
        if (BranchId == "0") {
            alert("Please Select Branch !");
            return false;
        }

        if (StudentId == "" || StudentId == null) {
            alert("Please Select Student !");
            return false;
        }

        if (MonthIdList.Length == "0") {
            alert("Please Select Month !");
            return false;
        }

        RevisedTransport(BranchId, StudentId, MonthIdList);

    });

    $('#OtherFee').unbind('click');
    $('#OtherFee').click(function () {

        debugger
        if ($("#ddlStudentIdnew").val() == "") {
            $("#SearchStudentField").show();
        } else {
            $("#SearchStudentField").hide();
        }

        $("#ddlMonth1").select2('val', 0);
        $("#OtherFeeName").select2('val', 0);
        $("#OtherFeeAmt").val('');
        $("#OtherFeeRemarks").val('');


        debugger
        $('#divAddCommonMaster').slideDown();
        GetUpdateOtherFeeList();

        $("#ddlMonth1").off('select2-opening');
        $("#ddlMonth1").select2().on("select2-opening", function () {
            GetMonths('ddlMonth1');
        });



        //start bind fee name dropdown
        $("#OtherFeeName").off('select2-opening');
        $("#OtherFeeName").select2().on("select2-opening", function () {
            debugger
            BindFeeNameDropDown('OtherFeeName', 0, $("#ddlBranch").val());
        });



        $('#btnSaveOtherFee').unbind('click');
        $('#btnSaveOtherFee').click(function () {



            debugger


            var Feename = $("#OtherFeeName").val();

            debugger

            if (Feename == 0) {
                $('#OtherFeeName').focus();
                $('#OtherFeeName').addClass('error_focus');
                MessageBoxError("Please Select Fee Name...!");
                $('#OtherFeeName').unbind('change');
                $('#OtherFeeName').change(function () {
                    $("#OtherFeeName").removeClass('error_focus');
                });
                return false;
            }

            SaveOtherFee($('#ddlMonth').select2('val', 0));




        });

    });





    $('#btnResetOter').unbind('click');
    $('#btnResetOter').click(function () {

        $('#ddlStudentId').select2('val', 0);
        $('#ddlMonth1').select2('val', 0);

        $('#OtherFeeName').select2('val', 0);
        $('#OtherFeeName').find('option').not(':first').remove();

        $("#OtherFeeAmt").val('');
        $("#OtherFeeRemarks").val('');
    });







    //rohit

    //$("#txtSearchAdmno").unbind('click');
    //$("#txtSearchAdmno").click(function () {
    //    debugger
    //    var BranchId = $('#ddlBranch').val();
    //    var Admno = $('#txtSearchAdmno').val();
    //    //if (BranchId == "0") {
    //    //    $('#ddlBranch').focus();
    //    //    $('#validationStudentFee').show();
    //    //    $('#validationStudentFee span').html('Please Select Branch!');
    //    //    $('#ddlBranch').addClass('error_focus');
    //    //    $('#ddlBranch').unbind('keyup');
    //    //    $('#ddlBranch').keyup(function () {
    //    //        $('#validationStudentFee').hide();
    //    //        $('#validationStudentFee span').html('');
    //    //        $("#ddlBranch").removeClass('error_focus');
    //    //    });
    //    //    return false;
    //    //}

    //    if (Admno == "") {
    //        $('#txtSearchAdmno').focus();
    //        $('#validationStudentFee').show();
    //        $('#validationStudentFee span').html('Please Enter Correct Admno !');
    //        $('#txtSearchAdmno').addClass('error_focus');
    //        $('#txtSearchAdmno').unbind('keyup');
    //        $('#txtSearchAdmno').keyup(function () {
    //            $('#validationStudentFee').hide();
    //            $('#validationStudentFee span').html('');
    //            $("#txtSearchAdmno").removeClass('error_focus');
    //        });
    //        return false;
    //    }
    //    BindStudentRecordSid('Save', $("#txtSearchAdmno").val());
    //});


    //rohit


    $('#btnTranport').unbind('click');
    $('#btnTranport').click(function () {

        ResetControlBalanceFee();

        var BranchId = $("#ddlBranch").val();
        var StudentId = $("#txtSid").val();
        var RouteId = $("#ddlRoute").val();
        var ddlStudentId = $("#ddlstudent").val();

        if (BranchId == "0") {
            $('#ddlBranch').focus();
            $('#validationStudentFee').show();
            $('#validationStudentFee span').html('Please Select Branch !');
            return false;
        }

        if (ddlStudentId == "0") {
            $('#ddlstudent').focus();
            $('#validationStudentFee').show();
            $('#validationStudentFee span').html('Please Select Student !');
            return false;
        }

        if (StudentId == "0") {
            $('#txtSid').focus();
            $('#validationStudentFee').show();
            $('#validationStudentFee span').html('Student Id Not Found !');
            return false;
        }

        AssignTransportRoute();

    });

    $('#btnconcession').unbind('click');
    $('#btnconcession').click(function () {

        ResetControlBalanceFee();

        var BranchId = $("#ddlBranch").val();
        var StudentId = $("#txtSid").val();
        var ConcessionId = $("#ddlConcession").val();
        var ddlStudentId = $("#ddlstudent").val();

        if (BranchId == "0") {
            $('#ddlBranch').focus();
            $('#validationStudentFee').show();
            $('#validationStudentFee span').html('Please Select Branch !');
            return false;
        }

        if (ddlStudentId == "0") {
            $('#ddlstudent').focus();
            $('#validationStudentFee').show();
            $('#validationStudentFee span').html('Please Select Student !');
            return false;
        }

        if (StudentId == "0") {
            $('#txtSid').focus();
            $('#validationStudentFee').show();
            $('#validationStudentFee span').html('Student Id Not Found !');
            return false;
        }
        AssignConcession();

    });

    $('#btnCremarks').unbind('click');
    $('#btnCremarks').click(function () {

        var BranchId = $("#ddlBranch").val();
        var StudentId = $("#txtSid").val();

        var ddlStudentId = $("#ddlstudent").val();

        if (BranchId == "0") {
            $('#ddlBranch').focus();
            $('#validationStudentFee').show();
            $('#validationStudentFee span').html('Please Select Branch !');
            return false;
        }

        if (ddlStudentId == "0") {
            $('#ddlstudent').focus();
            $('#validationStudentFee').show();
            $('#validationStudentFee span').html('Please Select Student !');
            return false;
        }

        if (StudentId == "0") {
            $('#txtSid').focus();
            $('#validationStudentFee').show();
            $('#validationStudentFee span').html('Student Id Not Found !');
            return false;
        }
        SaveRemarks();

    });

    $('#btnFeeGroup').unbind('click');
    $('#btnFeeGroup').click(function () {

        var BranchId = $("#ddlBranch").val();
        var StudentId = $("#txtSid").val();
        var FeeGroupId = $("#ddlFeeGroup").val();
        var ddlStudentId = $("#ddlstudent").val();

        if (BranchId == "0") {
            $('#ddlBranch').focus();
            $('#validationStudentFee').show();
            $('#validationStudentFee span').html('Please Select Branch !');
            return false;
        }

        if (ddlStudentId == "0") {
            $('#ddlstudent').focus();
            $('#validationStudentFee').show();
            $('#validationStudentFee span').html('Please Select Student !');
            return false;
        }

        if (StudentId == "0") {
            $('#txtSid').focus();
            $('#validationStudentFee').show();
            $('#validationStudentFee span').html('Student Id Not Found !');
            return false;
        }
        updateFeeGroup();

    });

    $('#btnReset').unbind('click');
    $('#btnReset').click(function () {
        ResetControl();
    });

    $("#txtSearchStudent").unbind('keyup');
    $("#txtSearchStudent").keyup(function () {

        var value = $("#txtSearchStudent").val();

        if (AppAccessTypeId == 101) {
            var BranchId = 0;
        }
        else if (AppAccessTypeId == 102) {
            var BranchId = GlobalBrId;
        } else {
            var BranchId = $("#ddlBranch").val();
        }
        var ClassId = $('#ddlClass').val();
        var l = value.length;

        if (value.length == 1) {
            getStudentNameAndId(value, BranchId, SchoolId, ClassId);
        }

    });


    // if ($('#txtSearchStudent').length) {
    //   var $parent = $('#txtSearchStudent').parent();
    // $parent.empty(); // Empty the div contents which holds the search div
    /// $parent.append('<input type="text" id="txtSearchStudent" />')
    //}


    //$('#txtSearchStudent').autocomplete().clearCache();

    //$("div.autocomplete-suggestions").empty();
    //$("div.autocomplete-suggestions").html('');

    $('#txtSearchStudent').autocomplete('clearCache');
    $('#txtSearchStudent').autocomplete('dispose');

    $('#txtSearchStudent').autocomplete({


        lookup: AutocompleteObject,
        onSelect: function (suggestion) {
            debugger

            $("#txtSearchStudentId").val(suggestion.data);
            //LoadTab('../SchoolAdmin/StudentProfile', this);

            var STID = $("#txtSearchStudentId").val();

            var BRID = $("#ddlBranch").val();

            //if (BRID != "0") {
            BindStudentRecordSid('Save', STID);

            //GetFeeDetail(STID, BRID);
            //GetFeeDetailNew(STID, BRID);
            //} else {
            //    alert("Please Select Branch...!");
            //    return false;
            //}

        }
    });

    $("#txtSearchStudent").keyup(function (event) {
        if (event.which == 13) {

            var STID = $("#txtSearchStudentId").val();

            var BRID = $("#ddlBranch").val();

            //if (BRID != "0") {

            BindStudentRecordSid('Save', STID);

            //GetFeeDetail(STID, BRID);
            //GetFeeDetailNew(STID, BRID);

            //} else {
            //    alert("Please Select Branch...!");
            //    return false;
            //}

        }
    });

    $('#MyHideProcess2').unbind();
    $('#MyHideProcess2').click(function () {
        $('#divPrintSingleSlip').slideUp();
        $('#tblfees tbody').empty();
        //ResetControlhoney()
        if ($("#ddlstudent").val() > 0) {
            $("#tblfees tbody").empty();
            //$("#DivStudentFee").show();
            //BindStudentRecordSid('Save', $("#ddlstudent").val());
        } else {
            StudentResetControl();
        }
    });


    $('#MyHideProcess3').unbind();
    $('#MyHideProcess3').click(function () {
        debugger
        $('#divPrintRegFeeSlip').slideUp();


        //--------Reset-----------------------------      

        $('#txtSplRemarks').val('');
        $('#txtImpRemarks').val('');
        $('#txtadmstatus').val('');
        $('#txtFeeDate').val('');
        $('#txtCheqDate').val('');

        $('#ddlMonth').select2('val', 0);
        $('#ddlMonth').find('option').not(':first').remove();

        $('#ddlRoute').select2('val', 0);
        $('#ddlRoute').find('option').not(':first').remove();

        $('#ddlFeeGroup').select2('val', 0);
        $('#ddlFeeGroup').find('option').not(':first').remove();

        $('#ddlConcession').select2('val', 0);
        $('#ddlConcession').find('option').not(':first').remove();

        $('#ddlPayMode').select2('val', 'Cash');
        $('#txtBankName').val('');
        $('#txtchequeddno').val('');
        $('#txtGrossPayable').val('0');
        $('#txtDiscount').val('0');
        $('#txtTotalDiscount').val('0');
        $('#txtnetPayable').val('0');
        $('#txtTotalPaid').val('0');
        $('#txtTotalBlance').val('0');
        $('#txtSearchStudent').val('');
        $('#txtSearchStudentId').val('');

        $("#DivStudentFee").hide();
        $("#tblfees tbody").empty();

        $("#siblinggrid").hide();
        $("#siblinglist tbody").remove();

        $("#Detailgrid1").hide();
        $("#FeeDetailList1 tbody").remove();

        //--------Reset-----------------------------

    });

});

function RevisedTransport(BranchId, StudentId, MonthIdList) {
    debugger
    var BO = {
        "objRevisedTransportAmtBO": {
            "BranchId": BranchId,
            "StudentId": StudentId,
            "MonthIdList": MonthIdList.join(',')
        }
    };
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/RevisedTransportAmtsMulti",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            debugger
            $('#loader_home').show();
        },
        success: function (data) {

            if (data.responseCode == 1) {
                MessageBox(data.responseMessage);
            }
            else {
                MessageBoxError(data.responseMessage);
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




function studentFeeListbyMonthTest2(sid, BranchId) {
    debugger
    var ddlMonth = $("#ddlMonth").val()

    var BO = {
        "objStudentFeeBO": {
            "Action": "Get Student Fee",
            "BranchId": BranchId,
            "SchoolId": SchoolId,
            "StudentId": sid,
            "MonthOrderTo": ddlMonth
        }
    };
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/AddUpdateGetStudentFee",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {
            var array = []
            debugger
            $("#DivStudentFee").show();

            //$("#tblfees tbody").clear();

            var table = $('#tblfees').DataTable();

            //clear datatable
            table.clear().draw();

            //destroy datatable
            table.destroy();
            debugger
            $("#FeeDetailList tbody").remove();
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $.each(data.responseObject, function (a, b) {
                            debugger
                            $.each(b.studentFeeList, function (c, d) {

                                array.push({ "AssignFeeId": d.AssignFeeId, "FeeMonth": d.Months, "FeeName": d.FeeName, "FeeAmount": d.NetPayable });

                            });
                        });

                        debugger
                        BindFees(array);
                        debugger



                        var feeDetailList = [];
                        var feess = [];
                        //get cell values, instead of the header text.
                        $.each(data.responseObject, function (w, x) {
                            $.each(x.studentFeeList, function (y, z) {
                                var StudentId = $("#txtSid").val();
                                $("#tblfees tr:not(:first)").each(function (a, b) {

                                    var feeid = $(b).attr("data-feeid");
                                    if (z.AssignFeeId == feeid) {
                                        var StudentId = $("#txtSid").val();
                                        var tdlist = $(this).closest('tr').children('td');
                                        discount = $(this).closest('tr').children('td').find('.discount').val();
                                        paid = $(this).closest('tr').children('td').find('.paid').val();
                                        balance = $(this).closest('tr').children('td').find('.balance').val();

                                        var Item = {

                                            a: $(tdlist[0]).html(),
                                            b: $(tdlist[1]).html(),
                                            c: $(tdlist[2]).html(),
                                            d: discount,
                                            e: paid,
                                            f: balance
                                        };

                                        feess.push(Item);



                                    }
                                })
                            })
                        });
                        debugger
                        ViewReciept(feess);
                        debugger


                    }
                    else {
                        $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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


function ViewReciept(feess) {
    debugger
    // console.log(feess)
    var std = $('#ddlstudent').html()
    console.log(std)
    var FeeCategory = [];

    $("#divViewFee").slideDown();
    var total = 0;
    var len = feess.length;
    $("#DivFeeDetailCSch").empty()
    debugger

    var flags = [], UniqueStudentListArray = [], l = feess.length, i;

    for (i = 0; i < l; i++) {
        if (flags[feess[i].b]) continue;
        flags[feess[i].b] = true;
        UniqueStudentListArray.push(feess[i].b);

    }
    console.log(UniqueStudentListArray)

    $.each(UniqueStudentListArray, function (c, d) {
        debugger
        var ParticularFee = feess.filter(function (obj) {
            return obj.b === d
        })

        //console.log(ParticularFee)
        var PerviousRow = '';
        var TotalAmount = 0;
        $.each(ParticularFee, function (c, d) {
            debugger
            var text = d.b;
            var text = text.replace("/", "");
            var id = text.split(" ").join("");
            if (PerviousRow != d.b || PerviousRow === '') {



                $("#DivFeeDetailCSch").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;margin-left:30%' id='DivFeeNameCSch" + d.FeeId + "'>" + d.b + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivBalanceCSch" + id + "'>" + d.e + "</div></li></ul>"));

                PerviousRow = d.b;
            }
            TotalAmount += +d.e;
            $('#DivBalanceCSch' + id).html(TotalAmount)

            debugger
            total += +d.e


        });


    })

    $("#DivFeeDetailCSch").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;Font-weight:700;margin-left:30%'>Total</div><div  class='FeeHeadValue' style='width: 18%;'>" + total + "</div></li></ul>"));

    debugger


}


function BindStudentRecordAdmno(Action, Admno) {
    ResetControlSpecificColumns();
    debugger

    var BranchId = $("#ddlBranch").val();
    var BO = {
        "objStudentFeeBO": {
            "Action": "Get Student Record",
            "BranchId": BranchId,
            "Admno": Admno,
            "SchoolId": SchoolId
        }
    };
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetParticularStudentRecordWithAdmission",
        datatype: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (response) {

            //$("#DivStudentFee").show();
            debugger
            if (response.responseCode == "1") {
                if (response.responseObject != null) {
                    if (response.responseObject.length > 0) {
                        $.each(response.responseObject, function (a, b) {

                            $.each(b.particularStudentRecordList, function (c, d) {
                                debugger
                                if (d.ImagePath == "" || d.ImagePath == null) {
                                    $('#StudentImagePreview').attr('src', '../Content/Images/Avatar.png');

                                }
                                else {

                                    $('#StudentImagePreview').attr('src', d.ImagePath);
                                }


                                $('#ddlBranch').select2('val', 0);
                                $("#ddlBranch").append($("<option></option>").val(d.BranchId).html(d.BranchName));
                                $('#ddlBranch').select2('val', d.BranchId);
                                $("#ddlBranch").off('select2-opening');
                                $("#ddlBranch").off('select2-opening');
                                $("#ddlBranch").select2().on("select2-opening", function () {
                                    if (AppAccessTypeId == 101) {
                                        BindBranchDropDown('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);
                                    }
                                    else if (AppAccessTypeId == 102) {
                                        BindBranchDropDown('ddlBranch', 0, 'GETBRANCH', 0, GlobalBrId);
                                    }
                                    else {
                                        BindBranchDropDown('ddlBranch', 0, 'GETBRANCH', 0, GlobalBrId);
                                        //BindBranchListLocal('ddlBranch', 0);
                                    }
                                });


                                $('#txtSid').val(d.StudentId);
                                $('#txtAddress').val(d.AddressLine1);
                                $('#txtFName').val(d.FatherName);
                                $('#txtMName').val(d.MotherName);
                                $('#txtImpRemarks').val(d.EnrollmentNo);
                                $('#txtAddress').val(d.AddressLine1);
                                $('#txtadmstatus').val(d.AdmissionStatus);
                                $('#txtMobileNo').val(d.MobileNo1);
                                $('#ddlStudentIdnew').val(d.StudentId);
                                $('#ddlStudentIdName').val(d.StudentName);

                                $("#txtFeeDate").datepicker({
                                    changeMonth: true,
                                    changeYear: true,
                                    maxDate: 0,
                                    dateFormat: "dd-mm-yy",
                                    onSelect: function (selected, evnt) {
                                        if ($(this).val().length > 0) {
                                            $('#validationStudentFee').hide();
                                            $('#validationStudentFee span').html('');
                                            $("#txtFeeDate").removeClass('error_focus');
                                        }
                                    },
                                }).datepicker("setDate", new Date());


                                //var date = new Date()
                                //let day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
                                //let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
                                //let year = date.getFullYear().toString(); // Get the last two digits of the year
                                //var Formatteddate = `${day}-${month}-${year}`

                                //$('#txtFeeDate').val(Formatteddate);
                                //$("#txtFeeDate").datepicker({
                                //    changeMonth: true,
                                //    changeYear: true,
                                //    maxDate: 0,
                                //    dateFormat: "dd-mm-yy",
                                //    onSelect: function (selected, evnt) {
                                //        if ($(this).val().length > 0) {
                                //            $('#validationStudentFee').hide();
                                //            $('#validationStudentFee span').html('');
                                //            $("#txtFeeDate").removeClass('error_focus');
                                //        }
                                //    },
                                //}).datepicker("setDate", new Date());

                                $("#txtCheqDate").datepicker({
                                    changeMonth: true,
                                    changeYear: true,
                                    //maxDate: 0,
                                    dateFormat: "dd-mm-yy",
                                    onSelect: function (selected, evnt) {
                                        if ($(this).val().length > 0) {
                                            $('#validationStudentFee').hide();
                                            $('#validationStudentFee span').html('');
                                            $("#txtCheqDate").removeClass('error_focus');
                                        }
                                    },
                                });

                                $('#ddlRoute').select2('val', 0);
                                $("#ddlRoute").append($("<option></option>").val(d.RouteId).html(d.RouteName));
                                $('#ddlRoute').select2('val', d.RouteId);
                                $("#ddlRoute").off('select2-opening');
                                $("#ddlRoute").select2().on("select2-opening", function () {
                                    BindRoute('ddlRoute', 0, $("#ddlBranch").val());
                                });


                                $('#ddlConcession').select2('val', 0);
                                $('#ddlConcession').find('option').not(':first').remove();
                                $("#ddlConcession").append($("<option></option>").val(d.ConcessionId).html(d.ConcessionName));
                                $('#ddlConcession').select2('val', d.ConcessionId);
                                $("#ddlConcession").off('select2-opening');
                                $("#ddlConcession").select2().on("select2-opening", function () {
                                    BindConcessionDropDown('ddlConcession', 0, $("#ddlBranch").val());
                                });

                                $('#ddlFeeGroup').select2('val', 0);
                                $('#ddlFeeGroup').find('option').not(':first').remove();
                                $("#ddlFeeGroup").append($("<option></option>").val(d.FeeGroupId).html(d.FeeGroup));
                                $('#ddlFeeGroup').select2('val', d.FeeGroupId);
                                $("#ddlFeeGroup").off('select2-opening');
                                $("#ddlFeeGroup").select2().on("select2-opening", function () {
                                    BindFeeType('ddlFeeGroup', 0, $("#ddlBranch").val());
                                });
                                $('#txtFeeGroup').val(d.FeeGroup);


                                $('#ddlClass').select2('val', 0);
                                $('#ddlClass').find('option').not(':first').remove();
                                $("#ddlClass").append($("<option></option>").val(d.ClassId).html(d.ClassName));

                                $('#ddlClass').select2('val', d.ClassId);
                                $("#ddlClass").off('select2-opening');
                                $("#ddlClass").off('select2-opening');
                                $("#ddlClass").select2().on("select2-opening", function () {

                                    BindClass('ddlClass', 0, $("#ddlBranch").val());

                                    $("#ddlClass").unbind('change');
                                    $("#ddlClass").change(function () {

                                        $('#validationStudentFee').hide();
                                        $('#validationStudentFee span').html('');
                                        $("#ddlClass").removeClass('error_focus');

                                        $("#DivStudentFee").show();
                                        $("#tblfees tbody").empty();

                                        ClassResetControl();

                                        if ($("#ddlClass").val() > 0) {

                                            $("#ddlSec").off('select2-opening');
                                            $("#ddlSec").select2().on("select2-opening", function () {

                                                BindSection('ddlSec', 0, $("#ddlClass").val(), $("#ddlBranch").val());

                                                $("#ddlSec").unbind('change');
                                                $("#ddlSec").change(function () {

                                                    $('#validationStudentFee').hide();
                                                    $('#validationStudentFee span').html('');
                                                    $("#ddlSec").removeClass('error_focus');

                                                    $("#DivStudentFee").show();
                                                    $("#tblfees tbody").empty();

                                                    SectionResetControl();

                                                    if ($("#ddlSec").val() > 0) {

                                                        //BindStudentList('ddlstudent', 0);
                                                        $("#ddlstudent").off('select2-opening');
                                                        $("#ddlstudent").select2().on("select2-opening", function () {
                                                            BindStudentList('ddlstudent', 0);

                                                            $("#ddlstudent").unbind('change');
                                                            $("#ddlstudent").change(function () {

                                                                $('#validationStudentFee').hide();
                                                                $('#validationStudentFee span').html('');
                                                                $("#ddlstudent").removeClass('error_focus');

                                                                StudentResetControl();

                                                                if ($("#ddlstudent").val() > 0) {

                                                                    $("#DivStudentFee").show();
                                                                    $("#tblfees tbody").empty();

                                                                    BindStudentRecordSid('Save', $("#ddlstudent").val());

                                                                } else {
                                                                    StudentResetControl();
                                                                }
                                                            });

                                                        });
                                                    }
                                                    else {
                                                        SectionResetControl();
                                                    }
                                                });
                                            });
                                        }
                                        else {
                                            ClassResetControl();
                                        }
                                    });

                                });

                                $('#ddlSec').select2('val', 0);
                                $('#ddlSec').find('option').not(':first').remove();
                                $("#ddlSec").append($("<option></option>").val(d.SectionId).html(d.SectionName));
                                $('#ddlSec').select2('val', d.SectionId);
                                $("#ddlSec").off('select2-opening');
                                $("#ddlSec").off('select2-opening');
                                $("#ddlSec").select2().on("select2-opening", function () {

                                    BindSection('ddlSec', 0, $("#ddlClass").val(), $("#ddlBranch").val());
                                });

                                $('#ddlstudent').select2('val', 0);
                                $('#ddlstudent').find('option').not(':first').remove();
                                //start
                                $("#ddlstudent").append($("<option></option>").val(d.StudentId).html(d.StudentName));
                                //end
                                $('#ddlstudent').select2('val', d.StudentId);
                                $('#ddlStudentId').val(d.StudentName);
                                $('#ddlStudentIdnew').val(d.StudentId);
                                $("#ddlstudent").off('select2-opening');
                                $("#ddlstudent").off('select2-opening');
                                $("#ddlstudent").select2().on("select2-opening", function () {
                                    BindStudentList('ddlstudent', 0);
                                });


                            });

                            $.each(b.payableList, function (e, f) {
                                //debugger
                                $('#txtGrossPayable').val(f.GrossPayable);
                                $('#txtDiscount').val(f.Concession);
                                $('#txtnetPayable').val(f.NetPayable);
                                $('#txtTotalPaid').val(f.NetPayable);
                                $('#Multipaid').val(f.NetPayable);
                                $('#txtMDiscount').val('0');
                                $('#txtBalanceFee').val('0');

                                $('#ddlMonth').select2('val', f.FirstMonthOrder);
                                $('#ddlMonth').find('option').not(':first').remove();

                                $("#ddlMonth").append($("<option></option>").val(f.FirstMonthOrder).html(f.FirstMonthName));


                                $('#ddlMonth').select2('val', f.FirstMonthOrder);





                                $("#ddlMonth").off('select2-opening');
                                $("#ddlMonth").select2().on("select2-opening", function () {

                                    BindMonthsDropDown('ddlMonth', 0, $("#ddlBranch").val(), $("#txtSid").val());

                                    $("#ddlMonth").unbind('change');
                                    $("#ddlMonth").change(function () {
                                        var StId = $("#txtSid").val();
                                        if (StId != '' || StId != null) {
                                            debugger
                                            studentFeeListbyMonthTest($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                                            studentFeeListbyMonthTestNew($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                                            BindPayableFeebyName();
                                        }

                                        // console.log('asghfuysegfhgr')


                                    });



                                });

                                //------------------------Only Previous Balance Paid---------------------
                                //debugger
                                $("#PreviousFee").change(function () {
                                    if (this.checked) {

                                        $('#ddlMonth').select2('val', 0);

                                        var StId = $("#txtSid").val();
                                        if (StId != '' || StId != null) {
                                            //debugger
                                            studentFeeListbyMonthTest($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                                            studentFeeListbyMonthTestNew($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                                            BindPayableFeebyName();
                                        }

                                    }

                                    else {
                                        $('#txtGrossPayable').val(f.GrossPayable);
                                        $('#txtDiscount').val(f.Concession);
                                        $('#txtnetPayable').val(f.NetPayable);
                                        $('#txtTotalPaid').val(f.NetPayable);
                                        $('#txtMDiscount').val('0');
                                        $('#txtBalanceFee').val('0');
                                        //debugger
                                        $('#ddlMonth').select2('val', f.FirstMonthOrder);
                                        $('#ddlMonth').find('option').not(':first').remove();
                                        $("#ddlMonth").append($("<option></option>").val(f.FirstMonthOrder).html(f.FirstMonthName));
                                        $('#ddlMonth').select2('val', f.FirstMonthOrder);

                                        var StId = $("#txtSid").val();
                                        if (StId != '' || StId != null) {
                                            //debugger
                                            studentFeeListbyMonthTest($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                                            studentFeeListbyMonthTestNew($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                                            BindPayableFeebyName();
                                        }

                                    }

                                });

                                //------------------------Only Previous Balance Paid---------------------


                            });

                        });

                        var SId = $("#txtSid").val();

                        if (SId != '' || SId != null) {
                            Sibling();
                        }



                        var BranchId = $("#ddlBranch").val();
                        var ddlstudent = $("#ddlstudent").val();

                        if (BranchId != "0" && ddlstudent != "0") {
                            PreviousReciept();
                        }

                        studentFeeListbyMonthTest($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                        studentFeeListbyMonthTestNew($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());

                        BindStudentDiscountHouseName(BranchId, sid);

                    } else {
                        MessageBoxError(response.responseMessage);
                        ResetControl();
                    }
                } else {
                    MessageBoxError(response.responseMessage);
                    ResetControl();
                }
            } else {
                MessageBoxError(response.responseMessage);
                ResetControl();
            }
        },
        complete: function () {

            setTimeout(function () { $("#loader_home").fadeOut("slow"); }, 1);
        },
        error: function (data) {
            MessageBoxError("eee8" + JSON.stringify(data));
            setTimeout(function () { $("#loader_home").fadeOut("slow"); }, 1);
        }
    });

}


function BindFeeNameDropDown(ControlId, SelectedValue, BranchId) {
    debugger
    var BO = {
        "objFeeStructureBO": {
            "Action": "get",
            "feeStructureList":
                [{

                    "BranchId": BranchId
                }]

        }
    };
    $('#' + ControlId).unbind("select2-opening");
    $('#' + ControlId).find('option').not(':first').remove();
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/SaveUpdateGetFeeStructure",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            ShowHideSelectBoxLoading(1, BranchId);
        },
        success: function (response) {
            debugger


            if (response.responseCode == "1") {
                if (response.responseObject != null) {
                    $.each(response.responseObject, function (i, a) {
                        $.each(a.feeStructureList, function (i, d) {
                            $("#" + ControlId).append($("<option></option>").val(d.FeeId).html(d.FeeName));
                        });
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
function SaveOtherFee() {

    debugger

    var BranchId = $("#ddlBranch").val();
    var StudentId = $("#ddlStudentIdnew").val();
    //var Month = $("#ddlMonth1").val();
    var FeeName = $("#OtherFeeName").val();
    var Amount = $("#OtherFeeAmt").val();
    var Remarks = $("#OtherFeeRemarks").val();

    debugger;

    ////var MonthNew = $("#ddlMonth1").val();

    ////if (MonthNew == "0") {
    ////    MonthNew = "100"
    ////}
    //else {
    //    MonthNew = $("#ddlMonth1").val();
    //}

    //start
    var MonthNew = $("#ddlMonth1").val();
    //var MonthOld = $("ddlMonth").val();
    if (MonthNew == "0") {
        MonthNew = "100"
    }

    //else {
    //    MonthNew = $("#ddlMonth1").val();
    //}
    //end


    var BO = {
        "objOtherFeeSaveBO":
        {

            "Action": "save",
            //"CreatedBy": GlobalAppAccessId,
            "BranchId": BranchId,
            "StudentId": StudentId,
            "Month": MonthNew,
            "OtherFeeId": FeeName,
            "Amount": Amount,
            "Remarks": Remarks

        }
    };



    var ConfirmationMessage = '';
    ConfirmationMessage = "Do You Want To Save?";
    lnv.confirm({
        title: 'Confirmation',
        confirmBtnText: 'Confirm',
        content: ConfirmationMessage,
        confirmHandler: function () {
            debugger
            $.ajax({
                type: "POST",
                url: ServiceUrl + "/OtherFeeSave",
                dataType: "json",
                data: JSON.stringify(BO),
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loader_home').show();
                },
                success: function (response) {
                    debugger
                    if (response.responseCode == "1") {
                        $('#divAddCommonMaster').slideUp();







                        //////////////////////////////stsrt//////////////////////////////////
                        debugger
                        var StId = $("#txtSid").val();
                        if (StId != '' || StId != null) {
                            debugger
                            studentFeeListbyMonthTest($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                            BindStudentRecordSid('Save', StId);

                        }

                        //////////////////////////////end/////////////////////////////////////




                        MessageBox(response.responseMessage);


                    } else {
                        MessageBoxError(response.responseMessage);
                    }
                    setTimeout(function () { $('#loader_home').fadeOut("slow"); }, 1);
                },
                error: function (data) {
                    MessageBoxError("eee30" + JSON.stringify(data));
                    setTimeout(function () { $('#loader_home').fadeOut("slow"); }, 1);
                }
            });
        },
        cancelHandler: function () {
            return false;
        }
    });
}
function UpdateOtherFeeAmt(BranchId, Id) {
    debugger

    var BranchId = $("#ddlBranch").val();
    //var ddlStudentIdnew = $("#ddlStudentIdnew").val();
    //var OtherFeeName1 = $("#OtherFeeName1").val();
    var OtherFeeAmt1 = $("#OtherFeeAmt1").val();

    var BO = {
        "objOtherFeeSaveBO": {
            "Action": "update",
            "BranchId": BranchId,
            "Id": Id,
            "StudentId": "",
            "Month": "",
            "FeeName": "",
            "Amount": OtherFeeAmt1,
            "Remarks": "",
            "OtherFeeId": ""
        }
    };

    var ConfirmationMessage = '';
    ConfirmationMessage = "Do You Want To update ?";
    lnv.confirm({
        title: 'Confirmation',
        confirmBtnText: 'Confirm',
        content: ConfirmationMessage,
        confirmHandler: function () {
            $.ajax({
                type: "POST",
                url: ServiceUrl + "/OtherFeeSave",
                dataType: "json",
                data: JSON.stringify(BO),
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loader_home').show();
                },
                success: function (response) {
                    debugger
                    if (response.responseCode == "1") {
                        debugger
                        $('#divAddItemMaster').slideUp();

                        MessageBox(response.responseMessage);

                        if ($("#ddlBranch").val() > 0) {
                            GetUpdateOtherFeeList();


                        }
                        else {
                            $('#ItemMasterTable').hide();
                            $('#DivIncomeExpenseList tbody').remove();
                        }

                        var StId = $("#txtSid").val();
                        if (StId != '' || StId != null) {
                            debugger
                            BindStudentRecordSid('Save', StId);

                        }



                    } else {
                        MessageBoxError("eee1" + response.responseMessage);
                    }
                    setTimeout(function () { $('#loader_home').fadeOut("slow"); }, 1);
                },
                error: function (data) {
                    MessageBoxError("eee2" + JSON.stringify(data));
                    setTimeout(function () { $('#loader_home').fadeOut("slow"); }, 1);
                }
            });
        },
        cancelHandler: function () {
            return false;
        }
    });

}

function GetUpdateOtherFeeList() {
    debugger
    var BranchId = $("#ddlBranch").val();

    var StudentId = $("#ddlStudentIdnew").val();
    //var Month1 = $("#ddlMonth1").val();
    //var OtherFeeName = $("#OtherFeeName").val();
    //var OtherFeeAmt = $("#OtherFeeAmt").val();
    //var OtherFeeRemarks = $("#OtherFeeRemarks").val();

    var BO = {
        "objOtherFeeSaveBO": {
            "Action": "get",
            "BranchId": BranchId,
            "Id": "0",
            "StudentId": StudentId,
            "Month": "",
            "FeeName": "",
            "Amount": "",
            "Remarks": "",
            "OtherFeeId": ""
        }
    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/OtherFeeSave",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {
            debugger
            $('#ItemMasterTable').show();
            $('#DivItemMasterist tbody').remove();

            //if (data.responseCode == "1") {

            //if (data.responseObject != null && data.responseObject.length > 0) {
            if (data.responseObject != null) {
                if (data.responseObject.length > 0) {



                    $.each(data.responseObject, function (i, d) {

                        $.each(d.OtherFeeList, function (j, E) {
                            debugger

                            //        debugger

                            var BtnCancel = "<i class='fa fa-times' title='Cancel' aria-hidden='true' id='btnDlt_" + E.Id + "'></i>";

                            var BtnEdit = "<i class='fa fa-pencil-square-o edit' title='Update Other Fee' aria-hidden='true' id='btnEdit_" + E.Id + "'></i>";

                            $("#DivItemMasterist").append($("<tr><td>" + E.Id + "</td><td>" + E.StudentName + "</td><td>" + E.Month + "</td><td>" + E.FeeName + "</td><td>" + E.Amount + "</td><td>" + BtnCancel + BtnEdit + "</td></tr>"));

                            $('#btnEdit_' + E.Id).unbind('click');
                            $('#btnEdit_' + E.Id).click(function () {

                                //            debugger


                                $('#divAddItemMaster').slideDown();
                                //            $('#lblItemMaster').text('Edit Firm');
                                //            $('#btnUpdateOtherFee').val('Update');

                                $('#OtherFeeName1').val(E.FeeName);
                                $('#OtherFeeAmt1').val(E.Amount);
                                //            debugger
                                $('#btnUpdateOtherFee').unbind('click');
                                $('#btnUpdateOtherFee').click(function () {

                                    //                debugger
                                    UpdateOtherFeeAmt(E.BranchId, E.Id);//Update category

                                    //                //$('#divAddItemMaster').slideUp();

                                });

                            });



                            $('#btnDlt_' + E.Id).unbind('click');
                            $('#btnDlt_' + E.Id).click(function () {

                                debugger
                                //CancelReciept(E.BranchId, E.Id, "Cancel");
                                //Cancel(E.BranchId, E.Id, "Cancel");
                                CancelReciept(E.BranchId, E.Id);//Update category
                                //AddUpdateAssetType(E.BranchId, E.Id, "'Cancel'");
                            });

                        });


                    });

                    var mediaQuery = window.matchMedia('(max-width: 1366px)')
                    if (mediaQuery.matches) {
                        var DtHeight = '42vh';
                    } else {
                        var DtHeight = '49vh';
                    }


                    var columnSet = [{ "title": "Id" }, { "title": "Student Name" }, { "title": "Month" }, { "title": "Fee Name" }, { "title": "Amount" }, { "title": "Action" }];
                    $("#DivItemMasterist").DataTable({
                        scrollX: true,
                        scroller: true,
                        destroy: true,
                        scrollY: DtHeight,
                        pageLength: 100,
                        columns: columnSet,
                        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                            return nRow;
                        }, language: {
                            "emptyTable": dataTableNoRecordFoundMsg
                        },
                        dom: 'lBfrtip',
                        buttons: [
                            {
                                extend: 'excel',
                                title: 'Item List',
                                exportOptions: {
                                    columns: [0, 1, 2]

                                }
                            }

                        ],
                    });
                    $('select').select2();


                }
                else {
                    //NoRecordFound();
                    $("#DivItemMasterist").append($("<tr><td colspan='10' class='norecord-msz'>No record found</div>"));
                }
            }
            else {
                //NoRecordFound();
                $("#DivItemMasterist").append($("<tr><td colspan='10' class='norecord-msz'>No record found</div>"));
            }


        },
        complete: function () {

            setTimeout(function () { $("#loader_home").fadeOut("slow"); }, 1);
        },
        error: function (data) {
            MessageBoxError("eee31" + JSON.stringify(data));
            setTimeout(function () { $("#loader_home").fadeOut("slow"); }, 1);
        }
    });


}
function GetMonths(ControlId) {
    var ddlBranch = $("#ddlBranch").val();
    debugger
    var BO = {
        "objFeeMonthMasterBO": {
            "Action": "Get",
            "feeMonthMasterList":
                [{
                    "BranchId": ddlBranch
                }]

        }
    };
    $('#' + ControlId).unbind("select2-opening");
    $('#' + ControlId).find('option').not(':first').remove();
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/SaveUpdateGetFeeMonthMaster",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            // ShowHideSelectBoxLoading(1, BranchId);
        },
        success: function (response) {
            debugger


            if (response.responseCode == "1") {
                if (response.responseObject != null) {
                    $.each(response.responseObject, function (i, a) {
                        $.each(a.feeMonthMasterList, function (i, d) {
                            $("#" + ControlId).append($("<option></option>").val(d.MonthValue).html(d.Months));
                        });
                    });
                }
            } else {
                MessageBoxError(response.responseMessage);
            }
            //   $('#' + ControlId).select2('val', SelectedValue);
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

function CancelReciept(BranchId, Id) {
    debugger
    var BranchId = $("#ddlBranch").val();


    var BO = {

        "objOtherFeeSaveBO": {
            "Action": "orderstatus",
            "BranchId": BranchId,
            "Id": Id,

            "StudentId": "",
            "Month": "",
            "OtherFeeId": "",
            "Amount": "",
            "Remarks": ""
        }
    };
    $.ajax({
        type: "POST",
        dataType: "json", //RESPONSE TYPE
        contentType: "application/json",
        url: ServiceUrl + "/OtherFeeSave",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (response) {

            debugger

            if (response.responseCode == "1") {

                MessageBox(response.responseMessage);

                if ($("#ddlBranch").val() > 0) {
                    GetUpdateOtherFeeList();


                }
                else {
                    $('#ItemMasterTable').hide();
                    $('#DivIncomeExpenseList tbody').remove();
                }

                var StId = $("#txtSid").val();
                if (StId != '' || StId != null) {
                    debugger
                    BindStudentRecordSid('Save', StId);

                }


            } else {
                MessageBoxError(response.responseMessage);
            }
            setTimeout(function () { $('#loader_home').fadeOut("slow"); }, 1);
        },
        error: function (data) {
            MessageBoxError("eee32" + JSON.stringify(data));
            setTimeout(function () { $('#loader_home').fadeOut("slow"); }, 1);
        }
    });
}

function SentFeeNotificationMsg(SenderId) {

    CheckValidUserRequest(GlobalAppAccessId);



    var StudentList = [];
    var SectionList = [];

    var BranchId = $('#ddlBranch').val();
    var Class = $('#ddlClass').val();
    var Section = $('#ddlSec').text();
    var SectionId = $('#ddlSec').val();
    var StudentId = $('#txtSid').val();
    var Paid = $('#txtTotalPaid').val();
    var MobileNo = $('#txtMobileNo').val();



    var SentMessageTemplate = 'Dear Parents' + " " + '\n' + " " + 'Thank you for depositing fee of your ward. ' + '\n' + 'Regards  ' + '\n' + SenderId;


    var Message = 'Dear Parents' + " " + '\n' + " " + 'Thank you for depositing fee of your ward. ' + '\n' + 'Regards' + '\n' + SenderId;



    var Title = 'FeePaid';
    var sent = 1;


    SectionList.push({ "SectionId": SectionId });




    StudentList.push({ "BranchId": BranchId, "MobileNo1": MobileNo, "Message": Message, "SentMessageTemplate": SentMessageTemplate, "SentSMS": sent, "StudentId": StudentId, "Amount": Paid, "Title": Title });


    console.log(SectionList);
    console.log(StudentList);



    var BO =

    {
        "objAttendanceBo": {
            "Action": 'save',
            "BranchId": BranchId,
            "ClassId": Class,
            "CreatedBy": GlobalAppAccessId,
            "ComposeSMSOption": 'Primary',
            "PageName": 'Fee Details',
            "SentType": 'APP',
            "SectionList": SectionList,
            "StudentAttendanceList": StudentList
        }
    };


    $.ajax({
        type: "POST",
        url: ServiceUrl + "/SendFeePaidSms",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (response) {

            debugger

            if (response.responseCode == "1") {




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
}


function SentMsg(SenderId) {

    debugger

    CheckValidUserRequest(GlobalAppAccessId);

    var StudentList = [];
    var SectionList = [];

    var BranchId = $('#ddlBranch').val();
    var Class = $('#ddlClass').val();
    var Section = $('#ddlSec').text();
    var SectionId = $('#ddlSec').val();
    var StudentId = $('#txtSid').val();
    var Paid = $('#txtTotalPaid').val();
    var MobileNo = $('#txtMobileNo').val();


    //GetnEWSenderId($("#ddlBranch").val());



    //var SentMessageTemplate = 'D/P,' + " " + '\n' + " " + 'Please Submit Your ward ' + z.StudentName + ' School Fees ' + z.BalanceAmts + '. ' + 'Kindly Ignore this message if already paid' + '\n' + SenderId;


    //var Message = 'D/P,' + " " + '\n' + " " + 'Please Submit Your ward ' + z.StudentName + ' School Fees ' + z.BalanceAmts + '. ' + 'Kindly Ignore this message if already paid' + '\n' + SenderId;


    var SentMessageTemplate = 'Dear Parents' + " " + '\n' + " " + 'Thank you for depositing fee of your ward. ' + '\n' + 'Regards  ' + '\n' + SenderId;


    var Message = 'Dear Parents' + " " + '\n' + " " + 'Thank you for depositing fee of your ward. ' + '\n' + 'Regards' + '\n' + SenderId;



    var Title = 'FeePaid';
    var sent = 1;


    SectionList.push({ "SectionId": SectionId });

    // StudentList.push({ "BranchId": BranchId, "MobileNo1": z.MobileNo, "Message": z.Message, "SentMessageTemplate": z.SentMessageTemplate, "SMSResponse": z.SMSResponse, "SentNotification": sentnt, "SentSMS": sent, "StudentId": z.StudentId, "Amount": z.BalanceAmts, "Title": z.Title });

    StudentList.push({ "BranchId": BranchId, "MobileNo1": MobileNo, "Message": Message, "SentMessageTemplate": SentMessageTemplate, "StudentId": StudentId, "Amount": Paid, "Title": Title });


    console.log(SectionList);
    console.log(StudentList);

    var BO =

    {
        "objAttendanceBo": {
            "Action": 'save',

            "BranchId": BranchId,
            "ClassId": 0,
            "CreatedBy": GlobalAppAccessId,
            "ComposeSMSOption": 'Primary',
            "PageName": 'Fee Details',
            "SentType": 'SMS',
            "SectionList": SectionList,
            "StudentAttendanceList": StudentList
        }
    };

    debugger
    //var ConfirmationMessage = '';
    //ConfirmationMessage = "Do you want to send Attendance SMS ?";
    //lnv.confirm({
    //    title: 'Confirmation',
    //    confirmBtnText: 'Confirm',
    //    content: ConfirmationMessage,

    //confirmHandler: function () {
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/SendFeePaidSms",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (response) {

            debugger


            setTimeout(function () { $('#loader_home').fadeOut("slow"); }, 1);
        },
        error: function (data) {
            MessageBoxError(JSON.stringify(data));
            setTimeout(function () { $('#loader_home').fadeOut("slow"); }, 1);
        }
    });
    //},
    //    cancelHandler: function () {
    //        return false;
    //    }
    //});
}

function GetnEWSenderId(BranchId) {

    CheckValidUserRequest(GlobalAppAccessId);

    var BO =

    {
        "objSmsSenderBO":
        {
            //"SchoolId": SchoolId,
            "BranchId": BranchId

        }
    };

    debugger
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetSmsSender",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            if (response.responseCode == "1") {

                $.each(response.responseObject, function (i, d) {
                    // alert(d.SenderId);
                    debugger
                    SenderId = d.SenderId;


                });
                debugger

                SentFeeNotificationMsg(SenderId)

                if (BranchId == 1310) {
                    SentMsg(SenderId);
                }



            } else {
                MessageBoxError(response.responseMessage);
            }
        },
        error: function (data) {
            MessageBoxError(JSON.stringify(data));
        }
    });
}

function BindBranchAutoSelect(ControlId, SelectedValue, Action, SchoolId, BranchId) {
debugger
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
			debugger
            //BranchName,BranchId
            if (response.responseCode == "1") {
                if (response.responseObject != null) {
debugger
                    $.each(response.responseObject, function (i, d) {
                        $("#" + ControlId).append($("<option></option>").val(d.BranchId).html(d.BranchName));
                        SelectedBranchId = d.BranchId;
                        debugger

                        $('#btnAddFeeNew').show();



                    });

                }
            } else {
                MessageBoxError("Branch not found !");
            }

            $('#' + ControlId).select2('val', SelectedBranchId);

            ChangeBranch();

        }

    });


}

function ChangeBranch() {

    $('#validationStudentFee').hide();
    $('#validationStudentFee span').html('');
    $("#ddlBranch").removeClass('error_focus');

    $('#ddlClass').select2('val', 0);
    $('#ddlClass').find('option').not(':first').remove();

    $("#DivStudentFee").show();
    $("#tblfees tbody").empty();

    BranchResetControl();

    if ($("#ddlBranch").val() > 0) {

        $("#ddlClass").off('select2-opening');
        $("#ddlClass").select2().on("select2-opening", function () {

            BindClass('ddlClass', 0, $("#ddlBranch").val());

            $("#ddlClass").unbind('change');
            $("#ddlClass").change(function () {

                $('#validationStudentFee').hide();
                $('#validationStudentFee span').html('');
                $("#ddlClass").removeClass('error_focus');

                $("#DivStudentFee").show();
                $("#tblfees tbody").empty();

                ClassResetControl();

                if ($("#ddlClass").val() > 0) {

                    $("#ddlSec").off('select2-opening');
                    $("#ddlSec").select2().on("select2-opening", function () {

                        BindSection('ddlSec', 0, $("#ddlClass").val(), $("#ddlBranch").val());

                        $("#ddlSec").unbind('change');
                        $("#ddlSec").change(function () {

                            $('#validationStudentFee').hide();
                            $('#validationStudentFee span').html('');
                            $("#ddlSec").removeClass('error_focus');

                            $("#DivStudentFee").show();
                            $("#tblfees tbody").empty();

                            SectionResetControl();

                            if ($("#ddlSec").val() > 0) {

                                //BindStudentList('ddlstudent', 0);
                                $("#ddlstudent").off('select2-opening');
                                $("#ddlstudent").select2().on("select2-opening", function () {
                                    BindStudentList('ddlstudent', 0);

                                    $("#ddlstudent").unbind('change');
                                    $("#ddlstudent").change(function () {

                                        $('#validationStudentFee').hide();
                                        $('#validationStudentFee span').html('');
                                        $("#ddlstudent").removeClass('error_focus');

                                        StudentResetControl();

                                        if ($("#ddlstudent").val() > 0) {

                                            $("#DivStudentFee").show();
                                            $("#tblfees tbody").empty();

                                            BindStudentRecordSid('Save', $("#ddlstudent").val());

                                        } else {
                                            StudentResetControl();
                                        }
                                    });

                                });
                            }
                            else {
                                SectionResetControl();
                            }
                        });
                    });
                }
                else {
                    ClassResetControl();
                }
            });

        });

        $("#ddlRoute").off('select2-opening');
        $("#ddlRoute").select2().on("select2-opening", function () {
            BindRoute('ddlRoute', 0, $("#ddlBranch").val());
        });

        $("#ddlFeeGroup").off('select2-opening');
        $("#ddlFeeGroup").select2().on("select2-opening", function () {
            BindFeeType('ddlFeeGroup', 0, $("#ddlBranch").val());
        });

        $("#ddlConcession").off('select2-opening');
        $("#ddlConcession").select2().on("select2-opening", function () {

            BindConcessionDropDown('ddlConcession', 0, $("#ddlBranch").val());

        });

        $("#txtSid").unbind('click');
        $("#txtSid").click(function () {

            var BranchId = $('#ddlBranch').val();
            var StudentId = $('#txtSid').val();
            //if (BranchId == "0") {
            //    $('#ddlBranch').focus();
            //    $('#validationStudentFee').show();
            //    $('#validationStudentFee span').html('Please Select Branch!');
            //    $('#ddlBranch').addClass('error_focus');
            //    $('#ddlBranch').unbind('keyup');
            //    $('#ddlBranch').keyup(function () {
            //        $('#validationStudentFee').hide();
            //        $('#validationStudentFee span').html('');
            //        $("#ddlBranch").removeClass('error_focus');
            //    });
            //    return false;
            //}

            if (StudentId == "") {
                $('#txtSid').focus();
                $('#validationStudentFee').show();
                $('#validationStudentFee span').html('Please Enter StudentId!');
                $('#txtSid').addClass('error_focus');
                $('#txtSid').unbind('keyup');
                $('#txtSid').keyup(function () {
                    $('#validationStudentFee').hide();
                    $('#validationStudentFee span').html('');
                    $("#txtSid").removeClass('error_focus');
                });
                return false;
            }
            BindStudentRecordSid('Save', $("#txtSid").val());
        });
    }
    else {
        BranchResetControl();
    }


}

function ResetControlSpecificColumns() {
    $('#PreviousFee').prop('checked', false);
    $('#txtGrossPayable').val('0');
    $('#txtDiscount').val('0');
    $('#txtTotalDiscount').val('0');
    $('#txtOtherFee').val('0');
    $('#txtnetPayable').val('0');
    $('#txtTotalPaid').val('0');
    $('#txtTotalBlance').val('0');


}

function ResetControl() {
    $('#txtOtherFee').val('0');
    $('#validationStudentFee').hide();
    $('#validationStudentFee span').html('');
    $(".error_focus").removeClass('error_focus');

    //$('#ddlBranch').select2('val', 0);

    $('#ddlClass').select2('val', 0);
    $('#ddlClass').find('option').not(':first').remove();

    $('#ddlSec').select2('val', 0);
    $('#ddlSec').find('option').not(':first').remove();

    $('#ddlstudent').select2('val', 0);
    $('#ddlstudent').find('option').not(':first').remove();

    $('#txtSid').val('');
    $('#txtFName').val('');
    $('#txtMName').val('');
    $('#txtMobileNo').val('');
    $('#txtAddress').val('');
    $('#txtSplRemarks').val('');
    $('#txtImpRemarks').val('');
    $('#txtadmstatus').val('');
    $('#txtFeeDate').val('');
    $('#txtCheqDate').val('');

    $('#ddlMonth').select2('val', 0);
    $('#ddlMonth').find('option').not(':first').remove();

    $('#ddlRoute').select2('val', 0);
    $('#ddlRoute').find('option').not(':first').remove();

    $('#ddlFeeGroup').select2('val', 0);
    $('#ddlFeeGroup').find('option').not(':first').remove();

    $('#ddlConcession').select2('val', 0);
    $('#ddlConcession').find('option').not(':first').remove();

    $('#ddlPayMode').select2('val', 'Cash');
    $('#txtBankName').val('');
    $('#txtchequeddno').val('');
    $('#txtGrossPayable').val('0');
    $('#txtDiscount').val('0');
    $('#txtTotalDiscount').val('0');
    $('#txtnetPayable').val('0');
    $('#txtTotalPaid').val('0');
    $('#txtTotalBlance').val('0');
    $('#txtSearchStudent').val('');
    $('#txtSearchStudentId').val('');

    $('#txtManualReceiptNo').val('');

    $("#DivStudentFee").hide();
    $("#tblfees tbody").empty();

    $("#siblinggrid").hide();
    $("#siblinglist tbody").remove();

    $("#Detailgrid1").hide();
    $("#FeeDetailList1 tbody").remove();
}

function BranchResetControl() {
    $('#txtOtherFee').val('0');
    $('#validationStudentFee').hide();
    $('#validationStudentFee span').html('');
    $(".error_focus").removeClass('error_focus');

    $('#ddlClass').select2('val', 0);
    $('#ddlClass').find('option').not(':first').remove();

    $('#ddlSec').select2('val', 0);
    $('#ddlSec').find('option').not(':first').remove();

    $('#ddlstudent').select2('val', 0);
    $('#ddlstudent').find('option').not(':first').remove();

    $('#txtSid').val('');
    $('#txtFName').val('');
    $('#txtMName').val('');
    $('#txtMobileNo').val('');
    $('#txtAddress').val('');
    $('#txtSplRemarks').val('');
    $('#txtadmstatus').val('');
    $('#txtFeeDate').val('');
    $('#txtCheqDate').val('');
    $('#ddlMonth').select2('val', 0);
    $('#ddlMonth').find('option').not(':first').remove();

    $('#ddlRoute').select2('val', 0);
    $('#ddlRoute').find('option').not(':first').remove();

    $('#ddlFeeGroup').select2('val', 0);
    $('#ddlFeeGroup').find('option').not(':first').remove();

    $('#ddlConcession').select2('val', 0);
    $('#ddlConcession').find('option').not(':first').remove();

    $('#ddlPayMode').select2('val', 'Cash');
    $('#txtBankName').val('');
    $('#txtchequeddno').val('');
    $('#txtGrossPayable').val('0');
    $('#txtDiscount').val('0');
    $('#txtTotalDiscount').val('0');
    $('#txtnetPayable').val('0');
    $('#txtTotalPaid').val('0');
    $('#txtTotalBlance').val('0');
    $('#txtSearchStudent').val('');
    $('#txtSearchStudentId').val('');

    //$("#DivStudentFee").hide();
    //$("#tblfees tbody").remove();

    $("#siblinggrid").hide();
    $("#siblinglist tbody").remove();

    $("#Detailgrid1").hide();
    $("#FeeDetailList1 tbody").remove();
}

function ClassResetControl() {
    $('#txtOtherFee').val('0');
    $('#validationStudentFee').hide();
    $('#validationStudentFee span').html('');
    $(".error_focus").removeClass('error_focus');

    $('#ddlSec').select2('val', 0);
    $('#ddlSec').find('option').not(':first').remove();

    $('#ddlstudent').select2('val', 0);
    $('#ddlstudent').find('option').not(':first').remove();

    $('#txtSid').val('');
    $('#txtFName').val('');
    $('#txtMName').val('');
    $('#txtMobileNo').val('');
    $('#txtAddress').val('');
    $('#txtSplRemarks').val('');
    $('#txtadmstatus').val('');
    $('#txtFeeDate').val('');
    $('#txtCheqDate').val('');

    $('#ddlMonth').select2('val', 0);
    $('#ddlMonth').find('option').not(':first').remove();

    $('#ddlRoute').select2('val', 0);
    $('#ddlRoute').find('option').not(':first').remove();

    $('#ddlFeeGroup').select2('val', 0);
    $('#ddlFeeGroup').find('option').not(':first').remove();

    $('#ddlConcession').select2('val', 0);
    $('#ddlConcession').find('option').not(':first').remove();

    $('#ddlPayMode').select2('val', 'Cash');
    $('#txtBankName').val('');
    $('#txtchequeddno').val('');
    $('#txtGrossPayable').val('0');
    $('#txtDiscount').val('0');
    $('#txtTotalDiscount').val('0');
    $('#txtnetPayable').val('0');
    $('#txtTotalPaid').val('0');
    $('#txtTotalBlance').val('0');
    $('#txtSearchStudent').val('');
    $('#txtSearchStudentId').val('');

    //$("#DivStudentFee").hide();
    //$("#tblfees tbody").remove();

    $("#siblinggrid").hide();
    $("#siblinglist tbody").remove();

    $("#Detailgrid1").hide();
    $("#FeeDetailList1 tbody").remove();
}

function SectionResetControl() {
    $('#txtOtherFee').val('0');
    $('#validationStudentFee').hide();
    $('#validationStudentFee span').html('');
    $(".error_focus").removeClass('error_focus');

    $('#ddlstudent').select2('val', 0);
    $('#ddlstudent').find('option').not(':first').remove();

    $('#txtSid').val('');
    $('#txtFName').val('');
    $('#txtMName').val('');
    $('#txtMobileNo').val('');
    $('#txtAddress').val('');
    $('#txtSplRemarks').val('');
    $('#txtadmstatus').val('');
    $('#txtFeeDate').val('');
    $('#txtCheqDate').val('');

    $('#ddlMonth').select2('val', 0);
    $('#ddlMonth').find('option').not(':first').remove();

    $('#ddlRoute').select2('val', 0);
    $('#ddlRoute').find('option').not(':first').remove();

    $('#ddlFeeGroup').select2('val', 0);
    $('#ddlFeeGroup').find('option').not(':first').remove();

    $('#ddlConcession').select2('val', 0);
    $('#ddlConcession').find('option').not(':first').remove();

    $('#ddlPayMode').select2('val', 'Cash');
    $('#txtBankName').val('');
    $('#txtchequeddno').val('');
    $('#txtGrossPayable').val('0');
    $('#txtDiscount').val('0');
    $('#txtTotalDiscount').val('0');
    $('#txtnetPayable').val('0');
    $('#txtTotalPaid').val('0');
    $('#txtTotalBlance').val('0');
    $('#txtSearchStudent').val('');
    $('#txtSearchStudentId').val('');

    //$("#DivStudentFee").hide();
    //$("#tblfees tbody").remove();

    $("#siblinggrid").hide();
    $("#siblinglist tbody").remove();

    $("#Detailgrid1").hide();
    $("#FeeDetailList1 tbody").remove();
}

function StudentResetControl() {
    $('#txtOtherFee').val('0');
    $('#validationStudentFee').hide();
    $('#validationStudentFee span').html('');
    $(".error_focus").removeClass('error_focus');

    $('#txtSid').val('');
    $('#txtFName').val('');
    $('#txtMName').val('');
    $('#txtMobileNo').val('');
    $('#txtAddress').val('');
    $('#txtSplRemarks').val('');
    $('#txtadmstatus').val('');
    $('#txtFeeDate').val('');
    $('#txtCheqDate').val('');

    $('#ddlMonth').select2('val', 0);
    $('#ddlMonth').find('option').not(':first').remove();

    $('#ddlRoute').select2('val', 0);
    $('#ddlRoute').find('option').not(':first').remove();

    $('#ddlFeeGroup').select2('val', 0);
    $('#ddlFeeGroup').find('option').not(':first').remove();

    $('#ddlConcession').select2('val', 0);
    $('#ddlConcession').find('option').not(':first').remove();

    $('#ddlPayMode').select2('val', 'Cash');
    $('#txtBankName').val('');
    $('#txtchequeddno').val('');
    $('#txtGrossPayable').val('0');
    $('#txtDiscount').val('0');
    $('#txtTotalDiscount').val('0');
    $('#txtnetPayable').val('0');
    $('#txtTotalPaid').val('0');
    $('#txtTotalBlance').val('0');
    $('#txtSearchStudent').val('');
    $('#txtSearchStudentId').val('');

    //$("#DivStudentFee").hide();
    //$("#tblfees tbody").remove();

    $("#siblinggrid").hide();
    $("#siblinglist tbody").remove();

    $("#Detailgrid1").hide();
    $("#FeeDetailList1 tbody").remove();
}

function BindClass(ControlId, SelectedValue, BranchId, SchoolId) {

    if (BranchId == 0) {
        $('#ddlBranch').focus();
        $('#validationAddStudent').show();
        $('#validationAddStudent span').html('Please Select Branch !');
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
        "objClassMaster":
        {
            "Key": GlobalKey,
            "ClassId": 0,
            "Action": 'GET',
            "BranchId": BranchId,
            "SchoolId": SchoolId
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

function BindStudentList(ControlId, SelectedValue) {

    var BranchId = $("#ddlBranch").val();
    var ClassId = $("#ddlClass").val();
    var SectionId = $("#ddlSec").val();

    var BO = {
        "objStudent":
        {

            "Action": "GET",
            "Key": GlobalKey,
            "StudentId": "0",
            "ClassId": ClassId,
            "SectionId": SectionId,
            "BranchId": BranchId

        }
    };
    $('#' + ControlId).unbind("select2-opening");
    $('#' + ControlId).find('option').not(':first').remove();
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetStudentListWithFilter",
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
                        $("#" + ControlId).append($("<option></option>").val(d.StudentId).html(d.StudentName));
                    });
                }
            } else {
                MessageBoxError(response.responseMessage);
            }
            $('#' + ControlId).select2('val', SelectedValue);
        },

        complete: function () {
            debugger
            $("#" + ControlId).select2();
            $('#' + ControlId).select2("open");
            ShowHideSelectBoxLoading(0, ControlId)
        },
        error: function (data) {
            debugger
            alert(JSON.stringify(data));
            ShowHideSelectBoxLoading(0, ControlId)
        }
    });
}

function BindStudentRecordSid(Action, sid) {
    ResetControlSpecificColumns();
    debugger
    //---------for KVM Classwise Fee Name----------
    BranchIdTemp = $("#ddlBranch").val();
    //---------for KVM Classwise Fee Name----------

    var BranchId = $("#ddlBranch").val();
    var BO = {
        "objStudentFeeBO": {
            "Action": "Get Student Record",
            "BranchId": BranchId,
            "StudentId": sid,
            "SchoolId": SchoolId
        }
    };
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetParticularStudentRecord",
        datatype: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (response) {

            //$("#DivStudentFee").show();

            if (response.responseCode == "1") {
                if (response.responseObject != null) {
                    if (response.responseObject.length > 0) {
                        $.each(response.responseObject, function (a, b) {

                            $.each(b.particularStudentRecordList, function (c, d) {
                                if (d.BranchId == 140) {
                                    $('#btnAddFee').hide();

                                }
                                else {
                                    $('#btnAddFee').show();
                                }



                                //$('#ddlBranch').val(d.BranchId);
                                //$('#ddlClass').val(d.ClassId);
                                //$('#txtSname').val(d.StudentName);

                                $('#ddlBranch').select2('val', 0);
                                $("#ddlBranch").append($("<option></option>").val(d.BranchId).html(d.BranchName));
                                $('#ddlBranch').select2('val', d.BranchId);
                                $("#ddlBranch").off('select2-opening');
                                $("#ddlBranch").off('select2-opening');
                                $("#ddlBranch").select2().on("select2-opening", function () {
                                    if (AppAccessTypeId == 101) {
                                        BindBranchDropDown('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);
                                    }
                                    else if (AppAccessTypeId == 102) {
                                        BindBranchDropDown('ddlBranch', 0, 'GETBRANCH', 0, GlobalBrId);
                                    }
                                    else {
                                        BindBranchListLocal('ddlBranch', 0);
                                    }
                                });

                                $('#txtAdmno').val(d.AdmissionNumber);
                                $('#txtSid').val(d.StudentId);
                                $('#txtAddress').val(d.AddressLine1);
                                $('#txtFName').val(d.FatherName);
                                $('#txtMName').val(d.MotherName);
                                $('#txtImpRemarks').val(d.EnrollmentNo);
                                $('#txtAddress').val(d.AddressLine1);
                                $('#txtadmstatus').val(d.AdmissionStatus);
                                $('#txtMobileNo').val(d.MobileNo1);
                                $('#ddlStudentIdnew').val(d.StudentId);
                                $('#ddlStudentIdName').val(d.StudentName);
                                //var date = new Date()
                                //let day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
                                //let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
                                //let year = date.getFullYear().toString(); // Get the last two digits of the year
                                //var Formatteddate = `${day}-${month}-${year}`

                                //$('#txtFeeDate').val(Formatteddate);


                                $("#txtFeeDate").datepicker({
                                    changeMonth: true,
                                    changeYear: true,
                                    maxDate: 0,
                                    dateFormat: "dd-mm-yy",
                                    onSelect: function (selected, evnt) {
                                        if ($(this).val().length > 0) {
                                            $('#validationStudentFee').hide();
                                            $('#validationStudentFee span').html('');
                                            $("#txtFeeDate").removeClass('error_focus');
                                        }
                                    },
                                }).datepicker("setDate", new Date());

                                $("#txtCheqDate").datepicker({
                                    changeMonth: true,
                                    changeYear: true,
                                    //maxDate: 0,
                                    dateFormat: "dd-mm-yy",
                                    onSelect: function (selected, evnt) {
                                        if ($(this).val().length > 0) {
                                            $('#validationStudentFee').hide();
                                            $('#validationStudentFee span').html('');
                                            $("#txtCheqDate").removeClass('error_focus');
                                        }
                                    },
                                });

                                $('#ddlRoute').select2('val', 0);
                                $("#ddlRoute").append($("<option></option>").val(d.RouteId).html(d.RouteName));
                                $('#ddlRoute').select2('val', d.RouteId);
                                $("#ddlRoute").off('select2-opening');
                                $("#ddlRoute").select2().on("select2-opening", function () {
                                    BindRoute('ddlRoute', 0, $("#ddlBranch").val());
                                });


                                $('#ddlConcession').select2('val', 0);
                                $('#ddlConcession').find('option').not(':first').remove();
                                $("#ddlConcession").append($("<option></option>").val(d.ConcessionId).html(d.ConcessionName));
                                $('#ddlConcession').select2('val', d.ConcessionId);
                                $("#ddlConcession").off('select2-opening');
                                $("#ddlConcession").select2().on("select2-opening", function () {
                                    BindConcessionDropDown('ddlConcession', 0, $("#ddlBranch").val());
                                });

                                $('#ddlFeeGroup').select2('val', 0);
                                $('#ddlFeeGroup').find('option').not(':first').remove();
                                $("#ddlFeeGroup").append($("<option></option>").val(d.FeeGroupId).html(d.FeeGroup));
                                $('#ddlFeeGroup').select2('val', d.FeeGroupId);
                                $("#ddlFeeGroup").off('select2-opening');
                                $("#ddlFeeGroup").select2().on("select2-opening", function () {
                                    BindFeeType('ddlFeeGroup', 0, $("#ddlBranch").val());
                                });
                                $('#txtFeeGroup').val(d.FeeGroup);


                                $('#ddlClass').select2('val', 0);
                                $('#ddlClass').find('option').not(':first').remove();
                                $("#ddlClass").append($("<option></option>").val(d.ClassId).html(d.ClassName));
                                $('#ddlClass').select2('val', d.ClassId);
                                $("#ddlClass").off('select2-opening');
                                $("#ddlClass").off('select2-opening');
                                $("#ddlClass").select2().on("select2-opening", function () {

                                    BindClass('ddlClass', 0, $("#ddlBranch").val());

                                    $("#ddlClass").unbind('change');
                                    $("#ddlClass").change(function () {

                                        $('#validationStudentFee').hide();
                                        $('#validationStudentFee span').html('');
                                        $("#ddlClass").removeClass('error_focus');

                                        $("#DivStudentFee").show();
                                        $("#tblfees tbody").empty();

                                        ClassResetControl();

                                        if ($("#ddlClass").val() > 0) {

                                            $("#ddlSec").off('select2-opening');
                                            $("#ddlSec").select2().on("select2-opening", function () {

                                                BindSection('ddlSec', 0, $("#ddlClass").val(), $("#ddlBranch").val());

                                                $("#ddlSec").unbind('change');
                                                $("#ddlSec").change(function () {

                                                    $('#validationStudentFee').hide();
                                                    $('#validationStudentFee span').html('');
                                                    $("#ddlSec").removeClass('error_focus');

                                                    $("#DivStudentFee").show();
                                                    $("#tblfees tbody").empty();

                                                    SectionResetControl();

                                                    if ($("#ddlSec").val() > 0) {

                                                        //BindStudentList('ddlstudent', 0);
                                                        $("#ddlstudent").off('select2-opening');
                                                        $("#ddlstudent").select2().on("select2-opening", function () {
                                                            BindStudentList('ddlstudent', 0);

                                                            $("#ddlstudent").unbind('change');
                                                            $("#ddlstudent").change(function () {

                                                                $('#validationStudentFee').hide();
                                                                $('#validationStudentFee span').html('');
                                                                $("#ddlstudent").removeClass('error_focus');

                                                                StudentResetControl();

                                                                if ($("#ddlstudent").val() > 0) {

                                                                    $("#DivStudentFee").show();
                                                                    $("#tblfees tbody").empty();

                                                                    BindStudentRecordSid('Save', $("#ddlstudent").val());

                                                                } else {
                                                                    StudentResetControl();
                                                                }
                                                            });

                                                        });
                                                    }
                                                    else {
                                                        SectionResetControl();
                                                    }
                                                });
                                            });
                                        }
                                        else {
                                            ClassResetControl();
                                        }
                                    });

                                });

                                $('#ddlSec').select2('val', 0);
                                $('#ddlSec').find('option').not(':first').remove();
                                $("#ddlSec").append($("<option></option>").val(d.SectionId).html(d.SectionName));
                                $('#ddlSec').select2('val', d.SectionId);
                                $("#ddlSec").off('select2-opening');
                                $("#ddlSec").off('select2-opening');
                                $("#ddlSec").select2().on("select2-opening", function () {

                                    BindSection('ddlSec', 0, $("#ddlClass").val(), $("#ddlBranch").val());
                                });

                                $('#ddlstudent').select2('val', 0);
                                $('#ddlstudent').find('option').not(':first').remove();
                                $("#ddlstudent").append($("<option></option>").val(d.StudentId).html(d.StudentName));
                                $('#ddlstudent').select2('val', d.StudentId);
                                $("#ddlstudent").off('select2-opening');
                                $("#ddlstudent").off('select2-opening');
                                $("#ddlstudent").select2().on("select2-opening", function () {
                                    BindStudentList('ddlstudent', 0);
                                });


                            });

                            $.each(b.payableList, function (e, f) {

                                $('#txtGrossPayable').val(f.GrossPayable);
                                $('#txtDiscount').val(f.Concession);
                                $('#txtnetPayable').val(f.NetPayable);
                                $('#txtTotalPaid').val(f.NetPayable);
                                $('#txtMDiscount').val('0');
                                $('#txtBalanceFee').val('0');

                                $('#ddlMonth').select2('val', f.FirstMonthOrder);
                                $('#ddlMonth').find('option').not(':first').remove();
                                $("#ddlMonth").append($("<option></option>").val(f.FirstMonthOrder).html(f.FirstMonthName));
                                $('#ddlMonth').select2('val', f.FirstMonthOrder);

                                //studentFeeListbyMonthTest($("#txtSid").val(), $("#ddlBranch").val(), f.FirstMonthOrder);

                                $("#ddlMonth").off('select2-opening');
                                $("#ddlMonth").select2().on("select2-opening", function () {

                                    BindMonthsDropDown('ddlMonth', 0, $("#ddlBranch").val(), $("#txtSid").val());

                                    $("#ddlMonth").unbind('change');
                                    $("#ddlMonth").change(function () {

                                        ResetControlBalanceFee();

                                        var StId = $("#txtSid").val();
                                        if (StId != '' || StId != null) {

                                            studentFeeListbyMonthTest($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                                            studentFeeListbyMonthTestNew($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                                            BindPayableFeebyName();
                                        }

                                    });
                                });


                                //------------------------Only Previous Balance Paid---------------------
                                debugger
                                $("#PreviousFee").change(function () {
                                    ResetControlBalanceFee();
                                    if (this.checked) {

                                        $('#ddlMonth').select2('val', 0);

                                        var StId = $("#txtSid").val();
                                        if (StId != '' || StId != null) {
                                            debugger
                                            studentFeeListbyMonthTest($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                                            studentFeeListbyMonthTestNew($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                                            BindPayableFeebyName();
                                        }

                                    }

                                    else {
                                        $('#txtGrossPayable').val(f.GrossPayable);
                                        $('#txtDiscount').val(f.Concession);
                                        $('#txtnetPayable').val(f.NetPayable);
                                        $('#txtTotalPaid').val(f.NetPayable);
                                        $('#txtMDiscount').val('0');
                                        $('#txtBalanceFee').val('0');
                                        debugger
                                        $('#ddlMonth').select2('val', f.FirstMonthOrder);
                                        $('#ddlMonth').find('option').not(':first').remove();
                                        $("#ddlMonth").append($("<option></option>").val(f.FirstMonthOrder).html(f.FirstMonthName));
                                        $('#ddlMonth').select2('val', f.FirstMonthOrder);

                                        var StId = $("#txtSid").val();
                                        if (StId != '' || StId != null) {
                                            debugger
                                            studentFeeListbyMonthTest($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                                            studentFeeListbyMonthTestNew($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                                            BindPayableFeebyName();
                                        }

                                    }

                                });

                                //------------------------Only Previous Balance Paid---------------------


                            });

                        });

                        var SId = $("#txtSid").val();

                        if (SId != '' || SId != null) {
                            Sibling();
                        }



                        var BranchId = $("#ddlBranch").val();
                        var ddlstudent = $("#ddlstudent").val();

                        if (BranchId != "0" && ddlstudent != "0") {
                            PreviousReciept();
                        }

                        studentFeeListbyMonthTest($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                        studentFeeListbyMonthTestNew($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                        BindStudentDiscountHouseName(BranchIdTemp, sid);

                    } else {
                        MessageBoxError(response.responseMessage);
                        ResetControl();
                    }
                } else {
                    MessageBoxError(response.responseMessage);
                    ResetControl();
                }
            } else {
                MessageBoxError(response.responseMessage);
                ResetControl();
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


function BindStudentDiscountHouseName(BranchId, sid) {
    debugger

    var BO = {
        "objStudentFeeBO": {
            "BranchId": BranchId,
            "StudentId": sid
        }
    };
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetParticularStudentDetail",
        datatype: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (response) {
            debugger


            if (response.responseCode == "1") {
                if (response.responseObject != null) {
                    if (response.responseObject.length > 0) {
                        $.each(response.responseObject, function (a, b) {
                            debugger
                            $.each(b.particularStudentLedgerList, function (c, d) {
                                debugger
                                if (BranchId == 117 && d.DirectDiscount > 0) {
                                    $('#DivDirectDiscount').show();
                                    $('#lblDirectDiscount').text(d.DirectDiscount);

                                }
                                else {
                                    $('#DivDirectDiscount').hide();
                                }

                                /* if ((BranchId == 1294 || BranchId == 1323 || BranchId == 1330 || BranchId == 1337 || BranchId == 1342 || BranchId == 1334 || BranchId == 1345 || BranchId == 1344 || BranchId == 1343 || BranchId == 1341 || BranchId == 1340 || BranchId == 1339 || BranchId == 1333 || BranchId == 1332 || BranchId == 1331 || BranchId == 1326 || BranchId == 1325 || BranchId == 1324 || BranchId == 1313 || BranchId == 1314 || BranchId == 1316 || BranchId == 1315 || BranchId == 1280 || BranchId == 1293 || BranchId == 1328 || BranchId == 1307 || BranchId == 1306 || BranchId == 1305 || BranchId == 1329 ) && d.HouseName!="") {*/
                                if (SchoolId == 1163 || SchoolId == 1166 || SchoolId == 1167 || SchoolId == 1170 || SchoolId == 1171) {
                                    $('#DivUniversityRollNo').show();
                                    $('#lblUniversityRollNo').text(d.HouseName);

                                }
                                else {
                                    $('#DivUniversityRollNo').hide();
                                }






                            });

                        });

                    } else {
                        MessageBoxError(response.responseMessage);
                        ResetControl();
                    }
                } else {
                    MessageBoxError(response.responseMessage);
                    ResetControl();
                }
            } else {
                MessageBoxError(response.responseMessage);
                ResetControl();
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

function BindStudentRecordSid2(obj) {
    debugger
    var Action = obj.Action;
    var sid = obj.sid;
    var BranchId = $("#ddlBranch").val();
    var BO = {
        "objStudentFeeBO": {
            "Action": "Get Student Record",
            "BranchId": BranchId,
            "StudentId": sid,
            "SchoolId": SchoolId
        }
    };
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetParticularStudentRecord",
        datatype: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (response) {

            //$("#DivStudentFee").show();

            if (response.responseCode == "1") {
                if (response.responseObject != null) {
                    if (response.responseObject.length > 0) {
                        $.each(response.responseObject, function (a, b) {

                            $.each(b.particularStudentRecordList, function (c, d) {

                                //$('#ddlBranch').val(d.BranchId);
                                //$('#ddlClass').val(d.ClassId);
                                //$('#txtSname').val(d.StudentName);

                                $('#ddlBranch').select2('val', 0);
                                $("#ddlBranch").append($("<option></option>").val(d.BranchId).html(d.BranchName));
                                $('#ddlBranch').select2('val', d.BranchId);
                                $("#ddlBranch").off('select2-opening');
                                $("#ddlBranch").off('select2-opening');
                                $("#ddlBranch").select2().on("select2-opening", function () {
                                    if (AppAccessTypeId == 101) {
                                        BindBranchDropDown('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);
                                    }
                                    else if (AppAccessTypeId == 102) {
                                        BindBranchDropDown('ddlBranch', 0, 'GETBRANCH', 0, GlobalBrId);
                                    }
                                    else {
                                        BindBranchListLocal('ddlBranch', 0);
                                    }
                                });


                                $('#txtSid').val(d.StudentId);
                                $('#txtAddress').val(d.AddressLine1);
                                $('#txtFName').val(d.FatherName);
                                $('#txtMName').val(d.MotherName);
                                $('#txtImpRemarks').val(d.EnrollmentNo);
                                $('#txtAddress').val(d.AddressLine1);
                                $('#txtadmstatus').val(d.AdmissionStatus);
                                $('#txtMobileNo').val(d.MobileNo1);
                                //var date = new Date()
                                //let day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
                                //let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
                                //let year = date.getFullYear().toString(); // Get the last two digits of the year
                                //var Formatteddate = `${day}-${month}-${year}`

                                //$('#txtFeeDate').val(Formatteddate);


                                $("#txtFeeDate").datepicker({
                                    changeMonth: true,
                                    changeYear: true,
                                    maxDate: 0,
                                    dateFormat: "dd-mm-yy",
                                    onSelect: function (selected, evnt) {
                                        if ($(this).val().length > 0) {
                                            $('#validationStudentFee').hide();
                                            $('#validationStudentFee span').html('');
                                            $("#txtFeeDate").removeClass('error_focus');
                                        }
                                    },
                                }).datepicker("setDate", new Date());

                                $("#txtCheqDate").datepicker({
                                    changeMonth: true,
                                    changeYear: true,
                                    //maxDate: 0,
                                    dateFormat: "dd-mm-yy",
                                    onSelect: function (selected, evnt) {
                                        if ($(this).val().length > 0) {
                                            $('#validationStudentFee').hide();
                                            $('#validationStudentFee span').html('');
                                            $("#txtCheqDate").removeClass('error_focus');
                                        }
                                    },
                                });

                                $('#ddlRoute').select2('val', 0);
                                $("#ddlRoute").append($("<option></option>").val(d.RouteId).html(d.RouteName));
                                $('#ddlRoute').select2('val', d.RouteId);
                                $("#ddlRoute").off('select2-opening');
                                $("#ddlRoute").select2().on("select2-opening", function () {
                                    BindRoute('ddlRoute', 0, $("#ddlBranch").val());
                                });


                                $('#ddlConcession').select2('val', 0);
                                $('#ddlConcession').find('option').not(':first').remove();
                                $("#ddlConcession").append($("<option></option>").val(d.ConcessionId).html(d.ConcessionName));
                                $('#ddlConcession').select2('val', d.ConcessionId);
                                $("#ddlConcession").off('select2-opening');
                                $("#ddlConcession").select2().on("select2-opening", function () {
                                    BindConcessionDropDown('ddlConcession', 0, $("#ddlBranch").val());
                                });

                                $('#ddlFeeGroup').select2('val', 0);
                                $('#ddlFeeGroup').find('option').not(':first').remove();
                                $("#ddlFeeGroup").append($("<option></option>").val(d.FeeGroupId).html(d.FeeGroup));
                                $('#ddlFeeGroup').select2('val', d.FeeGroupId);
                                $("#ddlFeeGroup").off('select2-opening');
                                $("#ddlFeeGroup").select2().on("select2-opening", function () {
                                    BindFeeType('ddlFeeGroup', 0, $("#ddlBranch").val());
                                });
                                $('#txtFeeGroup').val(d.FeeGroup);


                                $('#ddlClass').select2('val', 0);
                                $('#ddlClass').find('option').not(':first').remove();
                                $("#ddlClass").append($("<option></option>").val(d.ClassId).html(d.ClassName));
                                $('#ddlClass').select2('val', d.ClassId);
                                $("#ddlClass").off('select2-opening');
                                $("#ddlClass").off('select2-opening');
                                $("#ddlClass").select2().on("select2-opening", function () {

                                    BindClass('ddlClass', 0, $("#ddlBranch").val());

                                    $("#ddlClass").unbind('change');
                                    $("#ddlClass").change(function () {

                                        $('#validationStudentFee').hide();
                                        $('#validationStudentFee span').html('');
                                        $("#ddlClass").removeClass('error_focus');

                                        $("#DivStudentFee").show();
                                        $("#tblfees tbody").empty();

                                        ClassResetControl();

                                        if ($("#ddlClass").val() > 0) {

                                            $("#ddlSec").off('select2-opening');
                                            $("#ddlSec").select2().on("select2-opening", function () {

                                                BindSection('ddlSec', 0, $("#ddlClass").val(), $("#ddlBranch").val());

                                                $("#ddlSec").unbind('change');
                                                $("#ddlSec").change(function () {

                                                    $('#validationStudentFee').hide();
                                                    $('#validationStudentFee span').html('');
                                                    $("#ddlSec").removeClass('error_focus');

                                                    $("#DivStudentFee").show();
                                                    $("#tblfees tbody").empty();

                                                    SectionResetControl();

                                                    if ($("#ddlSec").val() > 0) {

                                                        //BindStudentList('ddlstudent', 0);
                                                        $("#ddlstudent").off('select2-opening');
                                                        $("#ddlstudent").select2().on("select2-opening", function () {
                                                            BindStudentList('ddlstudent', 0);

                                                            $("#ddlstudent").unbind('change');
                                                            $("#ddlstudent").change(function () {

                                                                $('#validationStudentFee').hide();
                                                                $('#validationStudentFee span').html('');
                                                                $("#ddlstudent").removeClass('error_focus');

                                                                StudentResetControl();

                                                                if ($("#ddlstudent").val() > 0) {

                                                                    $("#DivStudentFee").show();
                                                                    $("#tblfees tbody").empty();

                                                                    BindStudentRecordSid('Save', $("#ddlstudent").val());

                                                                } else {
                                                                    StudentResetControl();
                                                                }
                                                            });

                                                        });
                                                    }
                                                    else {
                                                        SectionResetControl();
                                                    }
                                                });
                                            });
                                        }
                                        else {
                                            ClassResetControl();
                                        }
                                    });

                                });

                                $('#ddlSec').select2('val', 0);
                                $('#ddlSec').find('option').not(':first').remove();
                                $("#ddlSec").append($("<option></option>").val(d.SectionId).html(d.SectionName));
                                $('#ddlSec').select2('val', d.SectionId);
                                $("#ddlSec").off('select2-opening');
                                $("#ddlSec").off('select2-opening');
                                $("#ddlSec").select2().on("select2-opening", function () {

                                    BindSection('ddlSec', 0, $("#ddlClass").val(), $("#ddlBranch").val());
                                });

                                $('#ddlstudent').select2('val', 0);
                                $('#ddlstudent').find('option').not(':first').remove();
                                $("#ddlstudent").append($("<option></option>").val(d.StudentId).html(d.StudentName));
                                $('#ddlstudent').select2('val', d.StudentId);
                                $("#ddlstudent").off('select2-opening');
                                $("#ddlstudent").off('select2-opening');
                                $("#ddlstudent").select2().on("select2-opening", function () {
                                    BindStudentList('ddlstudent', 0);
                                });


                            });

                            $.each(b.payableList, function (e, f) {

                                $('#txtGrossPayable').val(f.GrossPayable);
                                $('#txtDiscount').val(f.Concession);
                                $('#txtnetPayable').val(f.NetPayable);
                                $('#txtTotalPaid').val(f.NetPayable);
                                $('#txtMDiscount').val('0');
                                $('#txtBalanceFee').val('0');

                                $('#ddlMonth').select2('val', f.FirstMonthOrder);
                                $('#ddlMonth').find('option').not(':first').remove();
                                $("#ddlMonth").append($("<option></option>").val(f.FirstMonthOrder).html(f.FirstMonthName));
                                $('#ddlMonth').select2('val', f.FirstMonthOrder);

                                //studentFeeListbyMonthTest($("#txtSid").val(), $("#ddlBranch").val(), f.FirstMonthOrder);

                                $("#ddlMonth").off('select2-opening');
                                $("#ddlMonth").select2().on("select2-opening", function () {

                                    BindMonthsDropDown('ddlMonth', 0, $("#ddlBranch").val(), $("#txtSid").val());

                                    $("#ddlMonth").unbind('change');
                                    $("#ddlMonth").change(function () {
                                        var StId = $("#txtSid").val();
                                        if (StId != '' || StId != null) {

                                            studentFeeListbyMonthTest($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                                            studentFeeListbyMonthTestNew($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());

                                            BindPayableFeebyName();
                                        }

                                    });
                                });


                            });

                        });

                        var SId = $("#txtSid").val();

                        if (SId != '' || SId != null) {
                            Sibling();
                        }



                        var BranchId = $("#ddlBranch").val();
                        var ddlstudent = $("#ddlstudent").val();

                        if (BranchId != "0" && ddlstudent != "0") {
                            PreviousReciept();
                        }

                        studentFeeListbyMonthTest($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                        studentFeeListbyMonthTestNew($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());

                    } else {
                        MessageBoxError(response.responseMessage);
                        ResetControl();
                    }
                } else {
                    MessageBoxError(response.responseMessage);
                    ResetControl();
                }
            } else {
                MessageBoxError(response.responseMessage);
                ResetControl();
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

function studentFeeListbyMonthTest(sid, BranchId, ddlMonth) {
    debugger
    var BO = {
        "objStudentFeeBO": {
            "Action": "Get Student Fee",
            "BranchId": BranchId,
            "SchoolId": SchoolId,
            "StudentId": sid,
            "MonthOrderTo": ddlMonth
        }
    };
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/AddUpdateGetStudentFee",
        dataType: "json",
        async: false,
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {
            var array = []

            $("#DivStudentFee").show();

            //$("#tblfees tbody").clear();

            var table = $('#tblfees').DataTable();

            //clear datatable
            table.clear().draw();

            //destroy datatable
            table.destroy();

            $("#FeeDetailList tbody").remove();
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $.each(data.responseObject, function (a, b) {

                            $.each(b.studentFeeList, function (c, d) {
                                //if (d.FeeName == "Other Fee"){

                                //    array.push({ "AssignFeeId": d.AssignFeeId, "FeeMonth": d.Months, "FeeName": d.FeeName, "FeeAmount": BindOtherFee });

                                //}
                                //else{
                                array.push({ "AssignFeeId": d.AssignFeeId, "FeeMonth": d.Months, "FeeName": d.FeeName, "FeeAmount": d.NetPayable });
                                //}
                            });

                        });


                        BindFees(array);

                        $("#btnAddFee").unbind('click');
                        $("#btnAddFee").click(function () {

                            var feeDetailList = [];
                            var feess = [];
                            //get cell values, instead of the header text.
                            $.each(data.responseObject, function (w, x) {
                                $.each(x.studentFeeList, function (y, z) {
                                    var StudentId = $("#txtSid").val();
                                    $("#tblfees tr:not(:first)").each(function (a, b) {

                                        var feeid = $(b).attr("data-feeid");
                                        if (z.AssignFeeId == feeid) {
                                            var StudentId = $("#txtSid").val();
                                            var tdlist = $(this).closest('tr').children('td');

                                            discount = $(this).closest('tr').children('td').find('.discount').val();
                                            paid = $(this).closest('tr').children('td').find('.paid').val();
                                            balance = $(this).closest('tr').children('td').find('.balance').val();
                                            debugger
                                            var Item;

                                            if ($.trim(($(tdlist[1]).html())) == 'Other Fee') {
                                                Item = {

                                                    a: $(tdlist[0]).html(),
                                                    b: $(tdlist[1]).html(),
                                                    c: $(tdlist[2]).find('input').val(),
                                                    //c: $(tdlist[3]).html(),

                                                    d: discount,
                                                    e: paid,
                                                    f: balance
                                                };
                                            }
                                            else {

                                                Item = {

                                                    a: $(tdlist[0]).html(),
                                                    b: $(tdlist[1]).html(),
                                                    c: $(tdlist[2]).html(),
                                                    //c: $(tdlist[3]).html(),

                                                    d: discount,
                                                    e: paid,
                                                    f: balance
                                                };

                                            }
                                            feess.push(Item);
                                            if ($.trim(($(tdlist[1]).html())) == 'Other Fee') {
                                                feeDetailList.push({ "BranchId": z.BranchId, "StudentId": StudentId, "MonthId": z.MonthValue, "FeeId": z.FeeId, "GrossPayable": Item.c, "Concession": z.Concession, "DirectDiscount": Item.d, "NetPayable": Item.c, "Paid": Item.e, "Balance": Item.f });
                                            }

                                            else {

                                                feeDetailList.push({ "BranchId": z.BranchId, "StudentId": StudentId, "MonthId": z.MonthValue, "FeeId": z.FeeId, "GrossPayable": z.GrossPayable, "Concession": z.Concession, "DirectDiscount": Item.d, "NetPayable": Item.c, "Paid": Item.e, "Balance": Item.f });
                                            }

                                            //feeDetailList.push({ "BranchId": z.BranchId, "StudentId": StudentId, "MonthId": z.MonthValue, "FeeId": z.FeeId, "GrossPayable": z.GrossPayable, "Concession": z.Concession, "DirectDiscount": Item.d, "NetPayable": Item.c, "Paid": Item.e, "Balance": Item.f });

                                        }
                                    })
                                })
                                if (BranchId == 1197) {
                                    feeDetailList.push({ "BranchId": BranchId, "StudentId": $("#txtSid").val(), "MonthId": 100, "FeeId": 2033, "GrossPayable": $("#txtOtherFee").val(), "Concession": 0, "DirectDiscount": 0, "NetPayable": $("#txtOtherFee").val(), "Paid": $("#txtOtherFee").val(), "Balance": 0 });
                                }
                            });




                            if ($("#txtTotalPaid").val() == "NaN") {

                                alert("Please enter paid fee in table...!");
                                return false;
                            }
                            else {

                                if (feeDetailList != "" && feeDetailList != null) {
                                    debugger
                                    fee(feeDetailList, data.responseMessage);
                                }
                                else {
                                    alert("feeDetailList empty...!");
                                }
                            }

                        });

                    }
                    else {
                        $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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


function studentFeeListbyMonthTestNew(sid, BranchId, ddlMonth) {
    debugger
    var BO = {
        "objStudentFeeBO": {
            "Action": "Get Student Fee",
            "BranchId": BranchId,
            "SchoolId": SchoolId,
            "StudentId": sid,
            "MonthOrderTo": ddlMonth
        }
    };
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/AddUpdateGetStudentFee",
        dataType: "json",
        async: false,
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {
            var array = []

            $("#DivStudentFee").show();

            //$("#tblfees tbody").clear();

            var table = $('#tblfees').DataTable();

            //clear datatable
            table.clear().draw();

            //destroy datatable
            table.destroy();

            $("#FeeDetailList tbody").remove();
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $.each(data.responseObject, function (a, b) {

                            $.each(b.studentFeeList, function (c, d) {
                                //if (d.FeeName == "Other Fee"){

                                //    array.push({ "AssignFeeId": d.AssignFeeId, "FeeMonth": d.Months, "FeeName": d.FeeName, "FeeAmount": BindOtherFee });

                                //}
                                //else{
                                array.push({ "AssignFeeId": d.AssignFeeId, "FeeMonth": d.Months, "FeeName": d.FeeName, "FeeAmount": d.NetPayable });
                                //}
                            });

                        });


                        BindFees(array);

                        $("#btnAddFeeNew").unbind('click');
                        $("#btnAddFeeNew").click(function () {

                            var feeDetailList = [];
                            var feess = [];
                            //get cell values, instead of the header text.
                            $.each(data.responseObject, function (w, x) {
                                $.each(x.studentFeeList, function (y, z) {
                                    var StudentId = $("#txtSid").val();
                                    $("#tblfees tr:not(:first)").each(function (a, b) {

                                        var feeid = $(b).attr("data-feeid");
                                        if (z.AssignFeeId == feeid) {
                                            var StudentId = $("#txtSid").val();
                                            var tdlist = $(this).closest('tr').children('td');

                                            discount = $(this).closest('tr').children('td').find('.discount').val();
                                            paid = $(this).closest('tr').children('td').find('.paid').val();
                                            balance = $(this).closest('tr').children('td').find('.balance').val();
                                            debugger
                                            var Item;

                                            if ($.trim(($(tdlist[1]).html())) == 'Other Fee') {
                                                Item = {

                                                    a: $(tdlist[0]).html(),
                                                    b: $(tdlist[1]).html(),
                                                    c: $(tdlist[2]).find('input').val(),
                                                    //c: $(tdlist[3]).html(),

                                                    d: discount,
                                                    e: paid,
                                                    f: balance
                                                };
                                            }
                                            else {

                                                Item = {

                                                    a: $(tdlist[0]).html(),
                                                    b: $(tdlist[1]).html(),
                                                    c: $(tdlist[2]).html(),
                                                    //c: $(tdlist[3]).html(),

                                                    d: discount,
                                                    e: paid,
                                                    f: balance
                                                };

                                            }
                                            feess.push(Item);
                                            if ($.trim(($(tdlist[1]).html())) == 'Other Fee') {
                                                feeDetailList.push({ "BranchId": z.BranchId, "StudentId": StudentId, "MonthId": z.MonthValue, "FeeId": z.FeeId, "GrossPayable": Item.c, "Concession": z.Concession, "DirectDiscount": Item.d, "NetPayable": Item.c, "Paid": Item.e, "Balance": Item.f });
                                            }

                                            else {

                                                feeDetailList.push({ "BranchId": z.BranchId, "StudentId": StudentId, "MonthId": z.MonthValue, "FeeId": z.FeeId, "GrossPayable": z.GrossPayable, "Concession": z.Concession, "DirectDiscount": Item.d, "NetPayable": Item.c, "Paid": Item.e, "Balance": Item.f });
                                            }

                                            //feeDetailList.push({ "BranchId": z.BranchId, "StudentId": StudentId, "MonthId": z.MonthValue, "FeeId": z.FeeId, "GrossPayable": z.GrossPayable, "Concession": z.Concession, "DirectDiscount": Item.d, "NetPayable": Item.c, "Paid": Item.e, "Balance": Item.f });

                                        }
                                    })
                                })
                                if (BranchId == 1197) {
                                    feeDetailList.push({ "BranchId": BranchId, "StudentId": $("#txtSid").val(), "MonthId": 100, "FeeId": 2033, "GrossPayable": $("#txtOtherFee").val(), "Concession": 0, "DirectDiscount": 0, "NetPayable": $("#txtOtherFee").val(), "Paid": $("#txtOtherFee").val(), "Balance": 0 });
                                }
                            });




                            if ($("#txtTotalPaid").val() == "NaN") {

                                alert("Please enter paid fee in table...!");
                                return false;
                            }
                            else {

                                if (feeDetailList != "" && feeDetailList != null) {
                                    debugger
                                    feeNew(feeDetailList, data.responseMessage);
                                }
                                else {
                                    alert("feeDetailList empty...!");
                                }
                            }

                        });

                    }
                    else {
                        $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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

function Sibling() {
    debugger
    var SId = $("#txtSid").val();
    var BO = {
        "objAcidWiseSibblingBO": {

            "SchoolId": SchoolId,
            "StudentId": SId,
            "Action": "acidWiseSibblingList"

        }
    };
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetAcidWiseSibbling",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            debugger
            $('#loader_home').show();
        },
        success: function (data) {

            $("#siblinggrid").show();
            $("#siblinglist tbody").remove();

            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $.each(data.responseObject, function (a, b) {
                            $.each(b.acidWiseSibblingList, function (c, d) {
                                debugger
                                var StudentId = d.StudentId;

                                var obj = { Action: "Save", sid: d.StudentId };

                                var myJSON = JSON.stringify(obj);


                                $("#siblinglist").append($("<tr id=TRSchool_" + d.Admissionnumber + "><td><input type='button' id='Get' onclick='BindStudentRecordSid2(" + myJSON + ")' value='Details'></td><td> " + d.Admissionnumber + " </td><td>" + d.StudentId + "</td><td>" + d.StudentName + "</td><td>" + d.ClassMasterName + "</td><td>" + d.SectionName + "</td><td>" + d.FatherName + "</td><td>" + d.MotherName + "</td><td>" + d.BranchCode + "</td></tr>"));
                            });
                        });
                        var columnSet = [{ "title": "Details" }, { "title": "Admno" }, { "title": "Sid" }, { "title": "Name" }, { "title": "Class" }, { "title": "Sec" }, { "title": "F.Name" }, { "title": "M.Name" }, { "title": "Branch" }];
                        $("#siblinglist").DataTable({
                            scrollX: true,
                            scroller: true,
                            destroy: true,
                            scrollY: '40vh',
                            pageLength: 50,
                            columns: columnSet,

                            dom: 'lBfrtip',
                            buttons: [
                                {
                                    extend: 'excel',
                                    title: 'Student Sibling Detail',

                                },
                                {
                                    extend: 'pdf',
                                    title: 'Student Sibling Detail',

                                },
                                {
                                    extend: 'print',
                                    title: 'Student Sibling Detail',

                                },
                            ],

                            initComplete: function () {
                                var btns = $('.dt-button');
                                btns.addClass('btn btn-primary');
                                btns.removeClass('dt-button');

                            },

                            "bLengthChange": false,
                            "searching": false,

                            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                return nRow;
                            },
                            language: {
                                "emptyTable": dataTableNoRecordFoundMsg
                            }
                        });

                        $('select').select2();
                    }
                    else {
                        $("#siblinglist").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#siblinglist").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#siblinglist").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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

function PreviousReciept() {
    debugger
    var BranchId = $("#ddlBranch").val();
    var ddlstudent = $("#ddlstudent").val();
    var BO = {
        "objStudentFeeBO": {
            "Action": "Get Student Record",
            "BranchId": BranchId,
            "StudentId": ddlstudent
        }
    };
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetParticularStudentRecord",
        datatype: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (response) {

            $("#Detailgrid1").show();
            $("#FeeDetailList1 tbody").remove();

            if (response.responseCode == "1") {
                if (response.responseObject != null) {
                    if (response.responseObject.length > 0) {
                        $.each(response.responseObject, function (a, b) {
                            $.each(b.particularStudentLedgerList, function (c, d) {

                                var showFee = "<i class='fa fa-eye' id='btnshow_" + d.Receiptno + "' aria-hidden='true'></i>";


                                $("#FeeDetailList1").append($("<tr id=TRSchool_" + d.Receiptno + "><td>" + parseInt(c + 1) + "</td><td> " + d.StudentId + " </td><td>" + d.PaidDate + "</td><td>" + d.NetPayable + "</td><td>" + d.Receiptno + "</td><td>" + d.Paid + "</td><td>" + showFee + "</td></tr>"));

                                $('#btnshow_' + d.Receiptno).unbind('click');
                                $('#btnshow_' + d.Receiptno).click(function () {
                                    debugger



                                    var BranchId = d.BranchId;
                                    var FeeGroup = $("#txtGroupName").val();

                                    //
                                    if (response.responseMessage == "Bothhorizontal") {


                                        $("#2btnCancelPrinReceipt").hide();
                                        $("#2btnCancelPrinReceipt1").show();

                                        if (d.Receiptno == 0) {
                                            getFeeSlipZero(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        } else {
                                            getFeeSlipLandscapeBoth(d.Receiptno, BranchId, d.StudentId, response.responseMessage)
                                        }
                                    }

                                    else if (response.responseMessage == "BothVertical") {

                                        $("#btnCancelPrinReceipt").hide();
                                        $("#btnCancelPrinReceipt1").show();

                                        $("#DivSchoolCopy").show();
                                        $("#DivStudentCopy").show();


                                        if (d.Receiptno == 0) {
                                            getFeeSlipZero(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        } else {

                                            if (SchoolId == 104) {
                                                //SARVODYA SCHOOL OF SCIENCE, IMLOTA

                                                getFeeSlip_WithOutDiscount(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                            } else {
                                                if (SchoolId == 1222 || BranchId == 1241) {
                                                    getFeeSlipNewSISR(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                                } else {
                                                    getFeeSlip(d.Receiptno, BranchId, d.StudentId, response.responseMessage);

                                                }
                                            }
                                        }
                                    }


                                    else if (response.responseMessage == "BothWithoutDiscount") {
                                        debugger
                                        $("#btnCancelPrinReceiptWD").hide();
                                        $("#btnCancelPrinReceipt1WD").show();

                                        $("#ClosePrintSlipPopUpWD").hide();
                                        $("#ClosePrintSlipPopUp1WD").show();

                                        $("#DivSchoolCopyWD").show();
                                        $("#DivStudentCopyWD").show();

                                        if (d.Receiptno == 0) {
                                            getFeeSlipZero(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        } else {
                                            getFeeSlipWithoutDiscount(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        }
                                    }

                                    else if (response.responseMessage == "BothVerticalGst") {
                                        debugger
                                        $("#btnCancelPrinReceiptGST").hide();
                                        $("#btnCancelPrinReceipt1GST").show();

                                        $("#ClosePrintSlipPopUpGST").hide();
                                        $("#ClosePrintSlipPopUp1GST").show();

                                        $("#DivSchoolCopyGST").show();
                                        $("#DivStudentCopyGST").show();

                                        getFeeSlipGST(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                    }

                                    else if (response.responseMessage == "BothVerticalSDS") {
                                        debugger
                                        $("#btnCancelPrinReceiptSDS").hide();
                                        $("#btnCancelPrinReceipt1SDS").show();

                                        $("#ClosePrintSlipPopUpSDS").hide();
                                        $("#ClosePrintSlipPopUp1SDS").show();

                                        $("#DivSchoolCopySDS").show();
                                        $("#DivStudentCopySDS").show();

                                        if (d.Receiptno == 0) {
                                            getFeeSlipZero(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        } else {
                                            getFeeSlipSDS(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        }
                                    }


                                    else if (response.responseMessage == "TripleHorizontal") {

                                        $("#2btnCancelPrinReceipt_3").hide();
                                        $("#2btnCancelPrinReceipt1_3").show();

                                        if (d.Receiptno == 0) {
                                            getFeeSlipZero(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        } else {
                                            getFeeSlipLandscapeBoth_3(d.Receiptno, BranchId, d.StudentId, response.responseMessage)
                                        }
                                    }
                                    else if (response.responseMessage == "SingleSlip") {

                                        $("#2btnCancelPrinReceipt_30").hide();
                                        $("#2btnCancelPrinReceipt1_30").show();

                                        if (d.Receiptno == 0) {
                                            getFeeSlipZero(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        } else {

                                            getFeeSingleSlip(d.Receiptno, BranchId, d.StudentId, response.responseMessage)
                                        }
                                    }

                                    else if (response.responseMessage == "SingleSmall") {

                                        $("#2btnCancelPrinReceipt_30").hide();
                                        $("#2btnCancelPrinReceipt1_30").show();

                                        $("#DivSchoolCopy").hide();
                                        $("#DivStudentCopy").show();

                                        if (d.Receiptno == 0) {
                                            getFeeSlipZero(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        } else {
                                            getFeeSlip(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        }
                                        //getFeeSingleSlip(d.Receiptno, BranchId, d.StudentId, response.responseMessage)
                                    }


                                    //--Slip for Single Small Center--
                                    else if (response.responseMessage == "SingleSmallCenter") {

                                        $("#btnCancelPrinReceiptSSC").hide();
                                        $("#btnCancelPrinReceipt1SSC").show();

                                        $("#ClosePrintSlipPopUpSSC").hide();
                                        $("#ClosePrintSlipPopUp1SSC").show();


                                        if (d.Receiptno == 0) {
                                            getFeeSlipZero(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        } else {
                                            getFeeSlipSingleSmallCenter(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        }

                                    }

                                    //--Slip for Single Small Center-- 

                                    else if (response.responseMessage == "SingleSmall2") {
                                        debugger
                                        $("#2btnCancelPrinReceipt_30").hide();
                                        $("#2btnCancelPrinReceipt1_30").show();

                                        $("#DivSchoolCopy2").hide();
                                        $("#DivStudentCopy2").show();

                                        if (d.Receiptno == 0) {
                                            getFeeSlipZero(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        } else {
                                            getSingleSmall2(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        }

                                        //getFeeSingleSlip(d.Receiptno, BranchId, d.StudentId, response.responseMessage)
                                    }
                                    

                                    //--------------Slip for Ozone School--------------- 
                                    else if (response.responseMessage == "SingleSmallOzone") {

                                        $("#btnCancelPrinReceiptOzone").hide();
                                        $("#btnCancelPrinReceipt1Ozone").show();

                                        $("#DivSchoolCopyOzone").hide();
                                        $("#DivStudentCopyOzone").show();


                                        if (d.Receiptno == 0) {
                                            getFeeSlipZero(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        } else {
                                            getFeeSlipOzone(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        }
                                    }
                                    //--------------Slip for Ozone School--------------- 

                                });
                            });
                        });

                        var columnSet = [{ "title": "RC.No" }, { "title": "SId" }, { "title": "PaidDate" }, { "title": "NetPayable" }, { "title": "Recieptno" }, { "title": "Amount" }, { "title": "View" }];
                        $("#FeeDetailList1").DataTable({

                            scrollX: true,
                            scroller: true,
                            destroy: true,
                            scrollY: '40vh',
                            pageLength: 50,
                            columns: columnSet,


                            dom: 'lBfrtip',
                            buttons: [
                                {
                                    extend: 'excel',
                                    title: 'Student Previous Fee Receipt',

                                },
                                {
                                    extend: 'pdf',
                                    title: 'Student Previous Fee Receipt',

                                },
                                {
                                    extend: 'print',
                                    title: 'Student Previous Fee Receipt',

                                },
                            ],

                            initComplete: function () {
                                var btns = $('.dt-button');
                                btns.addClass('btn btn-primary');
                                btns.removeClass('dt-button');

                            },


                            "bLengthChange": false,
                            "searching": false,

                            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                return nRow;
                            },
                            language: {
                                "emptyTable": dataTableNoRecordFoundMsg
                            }
                        });

                        $('select').select2();

                    } else {
                        $("#FeeDetailList1").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                } else {
                    $("#FeeDetailList1").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            } else {
                $("#FeeDetailList1").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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


function PreviousRecieptNew() {
    debugger
    var BranchId = $("#ddlBranch").val();
    var ddlstudent = $("#ddlstudent").val();
    var BO = {
        "objStudentFeeBO": {
            "Action": "Get Student Record",
            "BranchId": BranchId,
            "StudentId": ddlstudent
        }
    };
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetParticularStudentRecord",
        datatype: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (response) {

            $("#Detailgrid1").show();
            $("#FeeDetailList1 tbody").remove();

            if (response.responseCode == "1") {
                if (response.responseObject != null) {
                    if (response.responseObject.length > 0) {
                        $.each(response.responseObject, function (a, b) {
                            $.each(b.particularStudentLedgerList, function (c, d) {

                                var showFee = "<i class='fa fa-eye' id='btnshow_" + d.Receiptno + "' aria-hidden='true'></i>";


                                $("#FeeDetailList1").append($("<tr id=TRSchool_" + d.Receiptno + "><td>" + parseInt(c + 1) + "</td><td> " + d.StudentId + " </td><td>" + d.PaidDate + "</td><td>" + d.NetPayable + "</td><td>" + d.Receiptno + "</td><td>" + d.Paid + "</td><td>" + showFee + "</td></tr>"));

                                $('#btnshow_' + d.Receiptno).unbind('click');
                                $('#btnshow_' + d.Receiptno).click(function () {
                                    debugger



                                    var BranchId = d.BranchId;
                                    var FeeGroup = $("#txtGroupName").val();

                                    //
                                    if (response.responseMessage == "Bothhorizontal") {


                                        $("#2btnCancelPrinReceipt").hide();
                                        $("#2btnCancelPrinReceipt1").show();

                                        if (d.Receiptno == 0) {
                                            getFeeSlipZero(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        } else {
                                            getFeeSlipLandscapeBoth(d.Receiptno, BranchId, d.StudentId, response.responseMessage)
                                        }
                                    }

                                    else if (response.responseMessage == "BothVertical") {

                                        $("#btnCancelPrinReceipt").hide();
                                        $("#btnCancelPrinReceipt1").show();

                                        $("#DivSchoolCopy").show();
                                        $("#DivStudentCopy").show();

                                        if (d.Receiptno == 0) {
                                            getFeeSlipZero(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        } else {

                                            if (SchoolId == 104) {
                                                //SARVODYA SCHOOL OF SCIENCE, IMLOTA

                                                getFeeSlip_WithOutDiscount(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                            } else {
                                                if (SchoolId == 1222 || BranchId == 1241) {

                                                    debugger
                                                    getFeeSlipNewSISR(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                                }
                                                else { getFeeSlipNew(d.Receiptno, BranchId, d.StudentId, response.responseMessage); }


                                            }
                                        }
                                    }
                                    else if (response.responseMessage == "TripleHorizontal") {

                                        $("#2btnCancelPrinReceipt_3").hide();
                                        $("#2btnCancelPrinReceipt1_3").show();

                                        if (d.Receiptno == 0) {
                                            getFeeSlipZero(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        } else {
                                            getFeeSlipLandscapeBoth_3(d.Receiptno, BranchId, d.StudentId, response.responseMessage)
                                        }
                                    }
                                    else if (response.responseMessage == "SingleSlip") {

                                        $("#2btnCancelPrinReceipt_30").hide();
                                        $("#2btnCancelPrinReceipt1_30").show();

                                        if (d.Receiptno == 0) {
                                            getFeeSlipZero(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        } else {

                                            getFeeSingleSlip(d.Receiptno, BranchId, d.StudentId, response.responseMessage)
                                        }
                                    }

                                    else if (response.responseMessage == "SingleSmall") {

                                        $("#2btnCancelPrinReceipt_30").hide();
                                        $("#2btnCancelPrinReceipt1_30").show();

                                        $("#DivSchoolCopy").hide();
                                        $("#DivStudentCopy").show();

                                        if (d.Receiptno == 0) {
                                            getFeeSlipZero(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        } else {

                                            getFeeSlipNew(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        }
                                        //getFeeSingleSlip(d.Receiptno, BranchId, d.StudentId, response.responseMessage)
                                    }

                                    
                                    else if (response.responseMessage == "SingleSmall2") {

                                        $("#2btnCancelPrinReceipt_30").hide();
                                        $("#2btnCancelPrinReceipt1_30").show();

                                        $("#DivSchoolCopy2").hide();
                                        $("#DivStudentCopy2").show();

                                        if (d.Receiptno == 0) {
                                            getFeeSlipZero(d.Receiptno, BranchId, d.StudentId, response.responseMessage);
                                        } else {
                                            getNewSingleSmall2(d.Receiptno, BranchId, d.StudentId, response.responseMessage);

                                        }
                                        //getFeeSingleSlip(d.Receiptno, BranchId, d.StudentId, response.responseMessage)
                                    }

                                });
                            });
                        });

                        var columnSet = [{ "title": "RC.No" }, { "title": "SId" }, { "title": "PaidDate" }, { "title": "NetPayable" }, { "title": "Recieptno" }, { "title": "Amount" }, { "title": "View" }];
                        $("#FeeDetailList1").DataTable({

                            scrollX: true,
                            scroller: true,
                            destroy: true,
                            scrollY: '40vh',
                            pageLength: 50,
                            columns: columnSet,


                            dom: 'lBfrtip',
                            buttons: [
                                {
                                    extend: 'excel',
                                    title: 'Student Previous Fee Receipt',

                                },
                                {
                                    extend: 'pdf',
                                    title: 'Student Previous Fee Receipt',

                                },
                                {
                                    extend: 'print',
                                    title: 'Student Previous Fee Receipt',

                                },
                            ],

                            initComplete: function () {
                                var btns = $('.dt-button');
                                btns.addClass('btn btn-primary');
                                btns.removeClass('dt-button');

                            },


                            "bLengthChange": false,
                            "searching": false,

                            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                return nRow;
                            },
                            language: {
                                "emptyTable": dataTableNoRecordFoundMsg
                            }
                        });

                        $('select').select2();

                    } else {
                        $("#FeeDetailList1").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                } else {
                    $("#FeeDetailList1").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            } else {
                $("#FeeDetailList1").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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

function BindFees(array) {

    $.each(array, function (i, d) {

        var tr = '';
        // var id = 'trfees' + i
        var id = d.AssignFeeId
        var idm = d.FeeMonth
        var idf = d.FeeName
        var idn = d.FeeAmount

        tr += '<tr id=' + id + ' data-feeid=' + d.AssignFeeId + ' >';
        //  tr += '<tr id=' + d.AssignFeeId + ' data-feeid=' + d.AssignFeeId + '>'
        tr += '<td>' + d.FeeMonth + ' </td>';
        tr += '<td >' + d.FeeName + ' </td>';

        if (d.FeeName == 'Other Fee') {
            tr += '<td id=' + id + ' class="FeeAmount"><input  id=FeeAmount' + id + 'onkeypress="return isNumber(event)" style="width: 60px;" type="text" value=' + d.FeeAmount + ' /></td>';
            //$("input:text").val(d.FeeAmount);
        }
        else {


            tr += '<td class="FeeAmount" >' + d.FeeAmount + ' </td>';
        }
        tr += '<td id=' + id + '><input  class="discount" id=discount' + id + ' style="width: 60px;" type="text" value="0" /></td>'
        tr += '<td id=' + id + '><input  class="paid" id=paid' + id + '  style="width: 60px;" type="text" value=' + array[i].FeeAmount + '  /></td>';
        tr += '<td id=' + id + '><input disabled id=balance' + id + '  class="balance" style="width: 60px;" type="text" value="0" /></td>'
        tr += '</tr>';

        $('#tblfees tbody').append(tr);

        var discountSelector = $('#' + id).find('.discount');

        $(discountSelector).on('keyup', function () {
            debugger

            //var Paidtxt = $(this).closest('tr').find('.paid');
            var paidtxt = $(this).closest('tr').find('.paid');
            var balancetxt = $(this).closest('tr').find('.balance');

            var discount = $(this).val()

            if (d.FeeName == 'Other Fee') {

                var FeeAmount = $(this).closest('tr').children('.FeeAmount').find('input').val();
            }
            else {
                var FeeAmount = d.FeeAmount;
            }

            var PaidAmount = FeeAmount - discount;
            var Balance = FeeAmount - PaidAmount;

            $(paidtxt).val(PaidAmount)
            $(balancetxt).val('0')
            var itemlist = [];

            //get cell values, instead of the header text.
            $("#tblfees tr:not(:first)").each(function (a, b) {

                var tdlist = $(this).closest('tr').children('td');
                discount = $(this).closest('tr').children('td').find('.discount').val();
                paid = $(this).closest('tr').children('td').find('.paid').val();
                balance = $(this).closest('tr').children('td').find('.balance').val();
                var Item = {

                    a: $(tdlist[0]).html(),
                    b: $(tdlist[1]).html(),
                    c: $(tdlist[2]).html(),
                    d: discount,
                    e: paid,
                    f: balance
                };

                itemlist.push(Item);

                // Bind(itemlist);
            });
            CalculateTotal();

        });

        var paidSelector = $('#' + id).find('.paid')

        $(paidSelector).on('keyup', function () {

            debugger
            var balancetxt = $(this).closest('tr').find('.balance');
            var discount = $(this).closest('tr').find('.discount').val();
            var PaidAmount = $(this).val();
            if (d.FeeName == 'Other Fee') {

                var FeeAmount = $(this).closest('tr').children('.FeeAmount').find('input').val();
            }
            else {
                var FeeAmount = d.FeeAmount;
            }
            var Balance = FeeAmount - discount - PaidAmount;

            $(balancetxt).val(Balance);
            var itemlist = [];

            //get cell values, instead of the header text.
            $("#tblfees tr:not(:first)").each(function (a, b) {

                var tdlist = $(this).closest('tr').children('td');
                discount = $(this).closest('tr').children('td').find('.discount').val();
                paid = $(this).closest('tr').children('td').find('.paid').val();
                balance = $(this).closest('tr').children('td').find('.balance').val();
                var Item = {

                    a: $(tdlist[0]).html(),
                    b: $(tdlist[1]).html(),
                    c: $(tdlist[2]).html(),
                    d: discount,
                    e: paid,
                    f: balance

                };

                itemlist.push(Item);

                // Bind(itemlist);
            });

            //var OtherFeeVal = $("#txtOtherFee").val();

            //if (OtherFeeVal == '' || OtherFeeVal == null) {
            //    OtherFeeVal = 0;
            //} else {
            //    OtherFeeVal = parseInt($("#txtOtherFee").val());
            //}

            CalculateTotal();
        });


        var feeAmountSelector = $('#' + id).find('.FeeAmount');
        $(feeAmountSelector).on({
            //'keydown': function (e) {
            //    debugger
            //    if (e.keyCode == 9) {
            //        //e.preventDefault();
            //    }


            //},

            'keyup': function () {


                debugger
                if (d.FeeName == 'Other Fee') {
                    var Paid = 0;
                    var Paidtxt = $(this).closest('tr').find('.paid');
                    var discount = $(this).closest('tr').find('.discount').val();
                    var balancetxt = $(this).closest('tr').find('.balance');
                    var FeeAmount = ($(this).closest('tr').children('.FeeAmount').find('input').val() == '' || $(this).closest('tr').children('.FeeAmount').find('input').val() == null) ? 0 : $(this).closest('tr').children('.FeeAmount').find('input').val();
                    //Paid = array[i].FeeAmount;


                    var PaidAmount = FeeAmount - discount;
                    var Balance = FeeAmount - PaidAmount;
                    $(Paidtxt).val(PaidAmount);
                    $(balancetxt).val(Balance);
                    Paid = parseFloat(PaidAmount);

                }
                CalculateTotal();
            }


        });

    });
}

function CalculateTotal() {
    debugger
    var Discount = 0;
    var Paid = 0;
    var otherfee = 0;
    Balance = 0;

    $("#tblfees > tbody > tr").each(function () {
        debugger
        Discount += parseInt($(this).find('.discount').val());

        Paid += parseInt($(this).find('.paid').val());

        Balance += parseInt($(this).find('.balance').val());
        otherfee += parseInt($(this).find('input').val());
    });

    Paid = parseInt(Paid);

    debugger
    //---------Solution for other Fee -----
    if (Discount > 0) {
        var TempOtherFee = otherfee - Discount;
        $('#txtOtherFee').val(TempOtherFee);
    }
    else {
        $('#txtOtherFee').val(otherfee);
    }
    //---------Solution for other Fee -----

    $('#txtTotalDiscount').val(Discount);
    $('#txtTotalPaid').val(Paid);
    $('#txtTotalBlance').val(Balance);
    console.log(Discount, Paid, Balance);
}


//--------for Priority----------- 
function ResetControlBalanceFee() {
    $('#txtTotalDiscount').val('0');
    $('#txtTotalBlance').val('0');
}

//--------for Fee Priority----------- 
function CalculateFeeOnPriotiry() {
    debugger
    var TempAmount = 0;
    var TempDiscount = 0;
    var TempBal = 0;
    var TempTotalBal = 0;

    var TotalNetPayble = parseInt($('#txtnetPayable').val());
    var TotalPaid = parseInt($('#txtTotalPaid').val());
    var TotalDiscount = parseInt($('#txtTotalDiscount').val());
    var TotalBalance = 0;
    if (TotalPaid > TotalNetPayble - TotalDiscount) {
        debugger
        TotalBalance = (TotalNetPayble - TotalDiscount) - TotalPaid;
        $('#txtTotalBlance').val(TotalBalance);

        $("#tblfees tr:not(:first)").each(function () {

            debugger

            TempAmount = parseInt($(this).find('td:eq(2)').text());
            TempDiscount = parseInt($(this).closest('tr').children('td').find('.discount').val());

            TempAmount = TempAmount - TempDiscount;

            $(this).closest('tr').children('td').find('.paid').val(TempAmount);
            $(this).closest('tr').children('td').find('.balance').val(TempBal);

        });



        //--------------when paid more than netpayble--------------
        if (TotalBalance < 0) {
            var TempAmountTesting = parseInt($("#tblfees tr:last").find('td:eq(2)').text());
            $("#tblfees tr:last").children('td').find('.paid').val(TempAmountTesting - TotalBalance);
            $("#tblfees tr:last").children('td').find('.balance').val(TotalBalance);
        }
        //--------------when paid more than netpayble--------------
    }
    else {
        TotalBalance = TotalNetPayble - TotalPaid - TotalDiscount;

        $('#txtTotalBlance').val(TotalBalance);




        if (TotalPaid >= 0) {
            $("#tblfees tr:not(:first)").each(function () {

                debugger

                TempAmount = parseInt($(this).find('td:eq(2)').text());
                TempDiscount = parseInt($(this).closest('tr').children('td').find('.discount').val());



                if (TotalPaid <= (TempAmount - TempDiscount)) {
                    TempBal = TempAmount - TempDiscount - TotalPaid;
                    TempAmount = TotalPaid;
                    TotalPaid = TotalPaid - TotalPaid;
                }
                else {
                    if (TempAmount == TempDiscount) {
                        TempAmount = 0;
                        TempBal = 0
                    }
                    //else if (TotalPaid <= (TempAmount - TempDiscount)) {

                    //}
                    else {
                        TotalPaid = TotalPaid - (TempAmount - TempDiscount);
                        TempAmount = TempAmount - TempDiscount;
                        TempBal = 0;

                    }
                }

                $(this).closest('tr').children('td').find('.paid').val(TempAmount);
                $(this).closest('tr').children('td').find('.balance').val(TempBal);

            });

        }
        else {
            $("#tblfees tr:not(:first)").each(function () {

                debugger

                TempAmount = parseInt($(this).find('td:eq(2)').text());
                TempDiscount = parseInt($(this).closest('tr').children('td').find('.discount').val());

                TotalPaid = 0;
                if (TotalPaid <= TempAmount) {
                    TempBal = TempAmount - TotalPaid - TempDiscount;
                    TempAmount = TotalPaid;

                }

                $(this).closest('tr').children('td').find('.paid').val(TempAmount);
                $(this).closest('tr').children('td').find('.balance').val(TempBal);



                TempTotalBal += parseInt($(this).closest('tr').children('td').find('.balance').val());
                $('#txtTotalBlance').val(TempTotalBal);

            });
        }
    }

}
//--------for Fee Priority----------- 

//--------for Discount Priority----------- 
function CalculateDiscountOnPriotiry() {
    debugger

    var TotalNetPayble = parseInt($('#txtnetPayable').val());
    var TotalDiscount = parseInt($('#txtTotalDiscount').val());


    if (TotalDiscount > TotalNetPayble) {
        alert("Discount is not greater than Paid Amount.");
        return false;
    }
    else {
        $('#txtTotalPaid').val(TotalNetPayble - TotalDiscount);
        var TotalPaidBy = parseInt($('#txtTotalPaid').val());
        var TotalBalance = TotalNetPayble - TotalPaidBy - TotalDiscount;
        $('#txtTotalBlance').val(TotalBalance);


        var TempDiscount = 0;
        var TempAmount = 0;
        var TempBal = 0;

        $("#tblfees tr:not(:first)").each(function () {
            debugger
            TempAmount = parseInt($(this).find('td:eq(2)').text());
            TempDiscount = parseInt($(this).closest('tr').children('td').find('.discount').val());

            if (TotalDiscount <= TempAmount) {
                TempAmount = TempAmount - TotalDiscount;
                TempDiscount = TotalDiscount;
                TotalDiscount = TotalDiscount - TotalDiscount;

            }
            else {
                if (TotalDiscount > TempAmount) {
                    TempDiscount = TempAmount;
                    TotalDiscount = TotalDiscount - TempAmount;
                    TempAmount = 0;
                }
                else {
                    TempAmount = TotalDiscount - TempAmount;
                    TempDiscount = TempAmount;
                    TotalDiscount = TotalDiscount - TempAmount;
                }
            }


            $(this).closest('tr').children('td').find('.discount').val(TempDiscount);
            $(this).closest('tr').children('td').find('.paid').val(TempAmount);
            $(this).closest('tr').children('td').find('.balance').val(TempBal);


        });


    }

}
//--------for Discount Priority----------- 


//--------for Priority----------- 


function isNumberAndupdatePaidAmount(evt) {

    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}



function isNumber(evt) {

    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function AssignTransportRoute() {

    CheckValidUserRequest(GlobalAppAccessId);

    var BranchId = $("#ddlBranch").val();
    var StudentId = $("#txtSid").val();
    var RouteId = $("#ddlRoute").val();
var CreatedBy = GlobalAppAccessId;

    var BO = {
        "objAssignRouteToStudentBO": {
            "BranchId": BranchId,
            "StudentId": StudentId,
            "RouteId": RouteId,
            "Action": "GET",
			"CreatedBy": CreatedBy,
        }
    };
    var ConfirmationMessage = '';
    ConfirmationMessage = "Do you want to update Transport Route?";
    lnv.confirm({
        title: 'Confirmation',
        confirmBtnText: 'Confirm',
        content: ConfirmationMessage,
        confirmHandler: function () {
            $.ajax({
                type: "POST",
                url: ServiceUrl + "/UpdateAssignRoute",
                dataType: "json",
                data: JSON.stringify(BO),
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loader_home').show();
                },
                success: function (response) {
                    debugger
                    if (response.responseCode != "") {

                        studentFeeListbyMonthTest($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                        studentFeeListbyMonthTestNew($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                        BindPayableFeebyName();

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

function BindPayableFeebyName() {

    var BranchId = $("#ddlBranch").val();
    var ddlstudent = $("#ddlstudent").val();
    var ddlMonth = $("#ddlMonth").val();
    var BO = {
        "objStudentFeeBO": {
            "Action": "Get Student Fee",
            "BranchId": BranchId,
            "StudentId": ddlstudent,
            "MonthOrderTo": ddlMonth
        }
    };
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/AddUpdateGetStudentFee",
        datatype: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (response) {

            if (response.responseCode == "1") {
                if (response.responseObject != null) {
                    if (response.responseObject.length > 0) {
                        $.each(response.responseObject, function (a, b) {
                            $.each(b.payableList, function (c, d) {

                                $('#txtGrossPayable').val(d.GrossPayable);
                                $('#txtDiscount').val(d.Concession);
                                $('#txtnetPayable').val(d.NetPayable);
                                $('#txtTotalPaid').val(d.NetPayable);


                            });
                        });

                    } else {
                        MessageBoxError(response.responseMessage);
                    }
                } else {
                    MessageBoxError(response.responseMessage);
                }
            } else {
                MessageBoxError(response.responseMessage);
            }
        }
    });
}

function AssignConcession() {
    debugger
    CheckValidUserRequest(GlobalAppAccessId);
    var BranchId = $("#ddlBranch").val();
    var StudentId = $("#txtSid").val();
    var ConcessionId = $("#ddlConcession").val();
    var BO = {
        "objAssignConcessionToStudentBO": {
            "BranchId": BranchId,
            "StudentId": StudentId,
            "ConcessionId": ConcessionId,
            "CreatedBy": GlobalAppAccessId
        }
    };

    var ConfirmationMessage = '';
    ConfirmationMessage = "Do you want to update Concession?";
    lnv.confirm({
        title: 'Confirmation',
        confirmBtnText: 'Confirm',
        content: ConfirmationMessage,
        confirmHandler: function () {
            $.ajax({
                type: "POST",
                url: ServiceUrl + "/UpdateAssignConcession",
                dataType: "json",
                data: JSON.stringify(BO),
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loader_home').show();
                },
                success: function (response) {
                    debugger
                    if (response.responseCode != "") {
                        studentFeeListbyMonthTest($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                        studentFeeListbyMonthTestNew($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                        BindPayableFeebyName();

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

function updateFeeGroup() {
    ResetControlSpecificColumns();
    debugger
    CheckValidUserRequest(GlobalAppAccessId);
    var BranchId = $("#ddlBranch").val();
    var StudentId = $("#txtSid").val();
    var FeeGroupId = $("#ddlFeeGroup").val();
	var CreatedBy = GlobalAppAccessId;
	
    var BO = {
        "objAssignFeeGroupToStudentBO": {
            "BranchId": BranchId,
            "StudentId": StudentId,
            "FeeGroupId": FeeGroupId,
            "Action": "GET",
			"CreatedBy": CreatedBy,
        }
    };
    var ConfirmationMessage = '';
    ConfirmationMessage = "Do you want to update FeeGroup?";
    lnv.confirm({
        title: 'Confirmation',
        confirmBtnText: 'Confirm',
        content: ConfirmationMessage,
        confirmHandler: function () {
            $.ajax({
                type: "POST",
                url: ServiceUrl + "/UpdateAssignFeeGroup",
                dataType: "json",
                data: JSON.stringify(BO),
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loader_home').show();
                },
                success: function (response) {
                    debugger
                    if (response.responseCode != "") {

                        studentFeeListbyMonthTest($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());

                        studentFeeListbyMonthTestNew($("#txtSid").val(), $("#ddlBranch").val(), $("#ddlMonth").val());
                        BindPayableFeebyName();

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

function BindRoute(ControlId, SelectedValue, BranchId) {

    debugger

    var BO = {
        "objRouteMasterBO":
        {
            "Action": "getactiveroute",

            "routeMasterList": [{
                "Branchid": BranchId,
                "IsActive": 1
            }]
        }

    };

    $('#' + ControlId).unbind("select2-opening");
    $('#' + ControlId).find('option').not(':first').remove();
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/SaveUpdateGetRouteMaster",
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
                        $.each(d.routeMasterList, function (e, f) {
                            debugger
                            $("#" + ControlId).append($("<option></option>").val(f.Id).html(f.RouteName))

                        });
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

function BindFeeType(ControlId, SelectedValue, BranchId) {

    debugger
    var BO = {
        "objFeeGroupBO":
        {
            "Action": "Get",
            "feeGroupList":
                [{
                    "BranchId": BranchId
                }]
        }
    };
    $('#' + ControlId).unbind("select2-opening");
    $('#' + ControlId).find('option').not(':first').remove();
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/SaveUpdateGetFeeGroup",
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
                        $.each(d.feeGroupList, function (e, f) {

                            $("#" + ControlId).append($("<option></option>").val(f.FeeGroupId).html(f.FeeGroup))

                        });
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

function BindConcessionDropDown(ControlId, SelectedValue, BranchId) {
    debugger

    var BO = {
        "objConcessionMasterBO": {

            "BranchId": BranchId,
            "Action": "getconcessiondetail"
        }
    };
    $('#' + ControlId).unbind("select2-opening");
    $('#' + ControlId).find('option').not(':first').remove();
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/AddUpdateGetConcession",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json;charset=utf-8",
        beforeSend: function () {
            ShowHideSelectBoxLoading(1, BranchId);
        },
        success: function (response) {
            debugger
            if (response.responseCode == "1") {
                if (response.responseObject != null) {
                    $.each(response.responseObject, function (a, b) {
                        $.each(b.concessionMasterList, function (i, d) {
                            $("#" + ControlId).append($("<option></option>").val(d.Cid).html(d.ConcessionName));
                        });
                    });
                }

            } else {
                MessageBoxError(response.responseMessage);
            }
        },
        complete: function () {
            debugger
            $("#" + ControlId).select2();
            $('#' + ControlId).select2("open");
            ShowHideSelectBoxLoading(0, ControlId)
        },
        error: function (data) {
            debugger
            alert(JSON.stringify(data));
            ShowHideSelectBoxLoading(0, ControlId)
        }
    });
}

function fee(FeeList, feeslipformat) {

    debugger

    CheckValidUserRequest(GlobalAppAccessId);
    var BranchId = $("#ddlBranch").val();
    var StudentId = $("#txtSid").val();
    var ManualReceiptNo = $("#txtManualReceiptNo").val();
    //var PaidDate = "10/10/2020";
    var PaidDate = $("#txtFeeDate").val().trim();
    var CheqDate = $("#txtCheqDate").val().trim();
    var GrossPayable = $("#txtGrossPayable").val();
    var DirectDiscount = $("#txtTotalDiscount").val();
    var NetPayable = $("#txtnetPayable").val();
    var CreatedBy = GlobalAppAccessId;
    var Paid = $("#txtTotalPaid").val();
    var CurrentBalance = $("#txtTotalBlance").val();
    var Remarks = $("#txtSplRemarks").val();
    var PaymentMode = $("#ddlPayMode").val();
    var BankName = $("#txtBankName").val();
    var ChequeDDCardNo = $("#txtchequeddno").val();
    var Concession = $("#ddlConcession").val();
    var ConcessionAmt = $("#txtDiscount").val();
    var BO = {
        "objFeeSaveMasterBO": {
            "BranchId": BranchId,
            "StudentId": StudentId,
            "PaidDate": PaidDate,
            "CheqDate": CheqDate,
            "PreviousBalance": 0,
            "GrossPayable": GrossPayable,
            "Concession": ConcessionAmt,
            "DirectDiscount": DirectDiscount,
            "NetPayable": NetPayable,
            "Paid": Paid,
            "CurrentBalance": CurrentBalance,
            "PaidStatus": "Paid",
            "Remarks": Remarks,
            "CancelRemarks": "",
            "CancelDate": "10/10/2020",
            "PaymentMode": PaymentMode,
            "BankName": BankName,
            "ChequeDDCardNo": ChequeDDCardNo,
            "CreatedBy": GlobalAppAccessId,
            "IpAddress": "",
            "Action": "save",
            
        "ManualReceiptNo": ManualReceiptNo,
            "feeSaveDetailsList": FeeList
        }
    };
    var ConfirmationMessage = '';
    ConfirmationMessage = "Do You Want To submit fee ?";
    lnv.confirm({
        title: 'Confirmation',
        confirmBtnText: 'Confirm',
        content: ConfirmationMessage,
        confirmHandler: function () {
            $.ajax({
                type: "POST",
                url: ServiceUrl + "/FeeSaveBackDate",
                dataType: "json",
                data: JSON.stringify(BO),
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loader_home').show();
                },
                success: function (response) {
                    debugger
                    if (response.responseCode != "") {


                        //-------------------FeeSubmitted SMS Send------------------

                        var BranchId = $('#ddlBranch').val();

                        if (SchoolId != 35) {
                            GetnEWSenderId($('#ddlBranch').val());
                        }

                        






                        debugger
                        //getFeeSlip(response.responseCode, BranchId, StudentId, response.responseMessage);
                        if (feeslipformat == "Bothhorizontal") {

                            $("#2btnCancelPrinReceipt").show();
                            $("#2btnCancelPrinReceipt1").hide();

                            if (response.responseCode == 0) {
                                getFeeSlipZero(response.responseCode, BranchId, StudentId, response.responseMessage);
                            } else {
                                getFeeSlipLandscapeBoth(response.responseCode, BranchId, StudentId, response.responseMessage)
                            }
                        }
                        else if (feeslipformat == "BothVertical") {

                            $("#btnCancelPrinReceipt").show();
                            $("#btnCancelPrinReceipt1").hide();

                            $("#DivSchoolCopy").show();
                            $("#DivStudentCopy").show();

                            if (response.responseCode == 0) {
                                getFeeSlipZero(response.responseCode, BranchId, StudentId, response.responseMessage);
                            } else {

                                if (SchoolId == 104) {
                                    //SARVODYA SCHOOL OF SCIENCE, IMLOTA

                                    alert('SARVODYA SCHOOL OF SCIENCE, IMLOTA');

                                    getFeeSlip_WithOutDiscount(response.responseCode, BranchId, StudentId, response.responseMessage);
                                } else {

                                    if (SchoolId == 1222 || BranchId == 1241) {

                                        debugger
                                        getFeeSlipNewSISR(response.responseCode, BranchId, StudentId, response.responseMessage);
                                    }
                                    else { getFeeSlip(response.responseCode, BranchId, StudentId, response.responseMessage) }

                                }
                            }
                        }



                        else if (feeslipformat == "BothWithoutDiscount") {
                            debugger
                            $("#btnCancelPrinReceiptWD").show();
                            $("#btnCancelPrinReceipt1WD").hide();

                            $("#ClosePrintSlipPopUpWD").show();
                            $("#ClosePrintSlipPopUp1WD").hide();

                            $("#DivSchoolCopyWD").show();
                            $("#DivStudentCopyWD").show();

                            if (response.responseCode == 0) {
                                getFeeSlipZero(response.responseCode, BranchId, StudentId, response.responseMessage);
                            } else {
                                getFeeSlipWithoutDiscount(response.responseCode, BranchId, StudentId, response.responseMessage);
                            }
                        }


                        else if (feeslipformat == "BothVerticalGst") {
                            debugger
                            $("#btnCancelPrinReceiptGST").show();
                            $("#btnCancelPrinReceipt1GST").hide();

                            $("#ClosePrintSlipPopUpGST").show();
                            $("#ClosePrintSlipPopUp1GST").hide();

                            $("#DivSchoolCopyGST").show();
                            $("#DivStudentCopyGST").show();

                            getFeeSlipGST(response.responseCode, BranchId, StudentId, response.responseMessage);
                        }

                        else if (feeslipformat == "BothVerticalSDS") {
                            debugger
                            $("#btnCancelPrinReceiptSDS").show();
                            $("#btnCancelPrinReceipt1SDS").hide();

                            $("#ClosePrintSlipPopUpSDS").show();
                            $("#ClosePrintSlipPopUp1SDS").hide();

                            $("#DivSchoolCopySDS").show();
                            $("#DivStudentCopySDS").show();

                            if (response.responseCode == 0) {
                                getFeeSlipZero(response.responseCode, BranchId, StudentId, response.responseMessage);
                            } else {
                                getFeeSlipSDS(response.responseCode, BranchId, StudentId, response.responseMessage);
                            }
                        }



                        else if (feeslipformat == "TripleHorizontal") {

                            $("#2btnCancelPrinReceipt_3").hide();
                            $("#2btnCancelPrinReceipt1_3").show();
                            getFeeSlipLandscapeBoth_3(response.responseCode, BranchId, StudentId, response.responseMessage);
                        }
                        else if (feeslipformat == "SingleSlip") {

                            $("#2btnCancelPrinReceipt_30").hide();
                            $("#2btnCancelPrinReceipt1_30").show();

                            if (response.responseCode == 0) {
                                getFeeSlipZero(response.responseCode, BranchId, StudentId, response.responseMessage);
                            } else {
                                getFeeSingleSlip(response.responseCode, BranchId, StudentId, response.responseMessage);
                            }
                        }

                        else if (feeslipformat == "SingleSmall") {

                            $("#2btnCancelPrinReceipt_30").hide();
                            $("#2btnCancelPrinReceipt1_30").show();

                            $("#DivSchoolCopy").hide();
                            $("#DivStudentCopy").show();

                            if (response.responseCode == 0) {
                                getFeeSlipZero(response.responseCode, BranchId, StudentId, response.responseMessage);
                            } else {
                                getFeeSlip(response.responseCode, BranchId, StudentId, response.responseMessage);
                            }
                            //getFeeSingleSlip(d.Receiptno, BranchId, d.StudentId, response.responseMessage)
                        }


                        //--Slip for Single Small Center--
                        else if (feeslipformat == "SingleSmallCenter") {

                            $("#btnCancelPrinReceiptSSC").show();
                            $("#btnCancelPrinReceipt1SSC").hide();

                            $("#ClosePrintSlipPopUpSSC").show();
                            $("#ClosePrintSlipPopUp1SSC").hide();

                            if (response.responseCode == 0) {
                                getFeeSlipZero(response.responseCode, BranchId, StudentId, response.responseMessage);
                            } else {
                                getFeeSlipSingleSmallCenter(response.responseCode, BranchId, StudentId, response.responseMessage);
                            }
                        }
                        //--Slip for Single Small Center--
                        else if (feeslipformat == "SingleSmall2") {

                            $("#2btnCancelPrinReceipt_30").hide();
                            $("#2btnCancelPrinReceipt1_30").show();

                            $("#DivSchoolCopy2").hide();
                            $("#DivStudentCopy2").show();

                            if (response.responseCode == 0) {
                                getFeeSlipZero(response.responseCode, BranchId, StudentId, response.responseMessage);
                            } else {
                                getSingleSmall2(response.responseCode, BranchId, StudentId, response.responseMessage);
                            }
                            //getFeeSingleSlip(d.Receiptno, BranchId, d.StudentId, response.responseMessage)
                        }


                        //--------------Slip for Ozone School--------------- 
                        else if (feeslipformat == "SingleSmallOzone") {

                            $("#btnCancelPrinReceiptOzone").show();
                            $("#btnCancelPrinReceipt1Ozone").hide();

                            $("#DivSchoolCopyOzone").hide();
                            $("#DivStudentCopyOzone").show();

                            if (response.responseCode == 0) {
                                getFeeSlipZero(response.responseCode, BranchId, StudentId, response.responseMessage);
                            } else {
                                getFeeSlipOzone(response.responseCode, BranchId, StudentId, response.responseMessage);
                            }
                        }
                        //--------------Slip for Ozone School--------------- 


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

function feeNew(FeeList, feeslipformat) {

    debugger

    CheckValidUserRequest(GlobalAppAccessId);
    var BranchId = $("#ddlBranch").val();
    var StudentId = $("#txtSid").val();
    //var PaidDate = "10/10/2020";
    var PaidDate = $("#txtFeeDate").val().trim();
    var CheqDate = $("#txtCheqDate").val().trim();
    var GrossPayable = $("#txtGrossPayable").val();
    var DirectDiscount = $("#txtTotalDiscount").val();
    var NetPayable = $("#txtnetPayable").val();
    var CreatedBy = GlobalAppAccessId;
    var Paid = $("#txtTotalPaid").val();
    var CurrentBalance = $("#txtTotalBlance").val();
    var Remarks = $("#txtSplRemarks").val();
    var PaymentMode = $("#ddlPayMode").val();
    var BankName = $("#txtBankName").val();
    var ChequeDDCardNo = $("#txtchequeddno").val();
    var Concession = $("#ddlConcession").val();
    var ConcessionAmt = $("#txtDiscount").val();
    var BO = {
        "objFeeSaveMasterBO": {
            "BranchId": BranchId,
            "StudentId": StudentId,
            "PaidDate": PaidDate,
            "CheqDate": CheqDate,
            "PreviousBalance": 0,
            "GrossPayable": GrossPayable,
            "Concession": ConcessionAmt,
            "DirectDiscount": DirectDiscount,
            "NetPayable": NetPayable,
            "Paid": Paid,
            "CurrentBalance": CurrentBalance,
            "PaidStatus": "Paid",
            "Remarks": Remarks,
            "CancelRemarks": "",
            "CancelDate": "10/10/2020",
            "PaymentMode": PaymentMode,
            "BankName": BankName,
            "ChequeDDCardNo": ChequeDDCardNo,
            "CreatedBy": CreatedBy,
            "IpAddress": "",
            "Action": "save",
            "feeSaveDetailsList": FeeList
        }
    };
    var ConfirmationMessage = '';
    ConfirmationMessage = "Do You Want To submit fee ?";
    lnv.confirm({
        title: 'Confirmation',
        confirmBtnText: 'Confirm',
        content: ConfirmationMessage,
        confirmHandler: function () {
            $.ajax({
                type: "POST",
                url: ServiceUrl + "/FeeSaveBackDate",
                dataType: "json",
                data: JSON.stringify(BO),
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loader_home').show();
                },
                success: function (response) {
                    debugger
                    if (response.responseCode != "") {


                        //-------------------FeeSubmitted SMS Send------------------

                        var BranchId = $('#ddlBranch').val();

                        if (SchoolId != 35) {
                            GetnEWSenderId($('#ddlBranch').val());
                        }

                        






                        debugger
                        //getFeeSlip(response.responseCode, BranchId, StudentId, response.responseMessage);
                        if (feeslipformat == "Bothhorizontal") {

                            $("#2btnCancelPrinReceipt").show();
                            $("#2btnCancelPrinReceipt1").hide();

                            if (response.responseCode == 0) {
                                getFeeSlipZero(response.responseCode, BranchId, StudentId, response.responseMessage);
                            } else {
                                getFeeSlipLandscapeBoth(response.responseCode, BranchId, StudentId, response.responseMessage)
                            }
                        }
                        else if (feeslipformat == "BothVertical") {

                            $("#btnCancelPrinReceipt").show();
                            $("#btnCancelPrinReceipt1").hide();

                            $("#DivSchoolCopy").show();
                            $("#DivStudentCopy").show();


                            if (response.responseCode == 0) {
                                getFeeSlipZero(response.responseCode, BranchId, StudentId, response.responseMessage);
                            } else {

                                if (SchoolId == 104) {
                                    //SARVODYA SCHOOL OF SCIENCE, IMLOTA

                                    alert('SARVODYA SCHOOL OF SCIENCE, IMLOTA');

                                    getFeeSlip_WithOutDiscount(response.responseCode, BranchId, StudentId, response.responseMessage);
                                } else {

                                    if (SchoolId == 1222 || BranchId == 1241) {

                                        debugger
                                        getFeeSlipNewSISR(response.responseCode, BranchId, StudentId, response.responseMessage);
                                    }
                                    else { getFeeSlip(response.responseCode, BranchId, StudentId, response.responseMessage) }

                                }
                            }

                        }
                        else if (feeslipformat == "TripleHorizontal") {

                            $("#2btnCancelPrinReceipt_3").hide();
                            $("#2btnCancelPrinReceipt1_3").show();

                            if (response.responseCode == 0) {
                                getFeeSlipZero(response.responseCode, BranchId, StudentId, response.responseMessage);
                            } else {
                                getFeeSlipLandscapeBoth_3(response.responseCode, BranchId, StudentId, response.responseMessage);
                            }
                        }
                        else if (feeslipformat == "SingleSlip") {

                            $("#2btnCancelPrinReceipt_30").hide();
                            $("#2btnCancelPrinReceipt1_30").show();

                            if (response.responseCode == 0) {
                                getFeeSlipZero(response.responseCode, BranchId, StudentId, response.responseMessage);
                            } else {
                                getFeeSingleSlip(response.responseCode, BranchId, StudentId, response.responseMessage);
                            }
                        }

                        else if (feeslipformat == "SingleSmall") {

                            $("#2btnCancelPrinReceipt_30").hide();
                            $("#2btnCancelPrinReceipt1_30").show();

                            $("#DivSchoolCopy").hide();
                            $("#DivStudentCopy").show();


                            if (response.responseCode == 0) {
                                getFeeSlipZero(response.responseCode, BranchId, StudentId, response.responseMessage);
                            } else {
                                getFeeSlipNew(response.responseCode, BranchId, StudentId, response.responseMessage);
                            }
                            //getFeeSingleSlip(d.Receiptno, BranchId, d.StudentId, response.responseMessage)
                        }

                       
                        else if (feeslipformat == "SingleSmall2") {

                            $("#2btnCancelPrinReceipt_30").hide();
                            $("#2btnCancelPrinReceipt1_30").show();

                            $("#DivSchoolCopy2").hide();
                            $("#DivStudentCopy2").show();

                            if (response.responseCode == 0) {
                                getFeeSlipZero(response.responseCode, BranchId, StudentId, response.responseMessage);
                            } else {
                                getNewSingleSmall2(response.responseCode, BranchId, StudentId, response.responseMessage);
                            }
                            //getFeeSingleSlip(d.Receiptno, BranchId, d.StudentId, response.responseMessage)
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

function SaveRemarks() {

    debugger

    CheckValidUserRequest(GlobalAppAccessId);
    var BranchId = $("#ddlBranch").val();
    var StudentId = $("#txtSid").val();


    var Remarks = $("#txtImpRemarks").val();

    var action = "save";
    var BO = {
        "objArrearSaveMasterBO": {
            "BranchId": BranchId,
            "StudentId": StudentId,
            "ImportantRemarks": Remarks,
            "Action": action

        }
    };
    var ConfirmationMessage = '';
    ConfirmationMessage = "Do You Want To submit Remarks ?";
    lnv.confirm({
        title: 'Confirmation',
        confirmBtnText: 'Confirm',
        content: ConfirmationMessage,
        confirmHandler: function () {
            $.ajax({
                type: "POST",
                url: ServiceUrl + "/GetUpdateRemarks",
                dataType: "json",
                data: JSON.stringify(BO),
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loader_home').show();
                },
                success: function (response) {
                    debugger
                    if (response.responseCode != "") {



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





function getFeeSlip(RecNo, BranchId, Stid, RMon) {
    debugger

    var BO = {
        "objFeeSlipBO": {
            "Action": "getfeeslip",
            "BranchId": BranchId,
            "Receiptno": RecNo,
            "StudentId": Stid
        }
    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetFeeSlip",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {
            debugger
            $("#divPrintRegFeeSlip").slideDown();

            debugger
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $("#DivFeeDetail").empty();
                        $("#DivFeeDetailC").empty();


                        if (BranchId == 1259 || BranchId == 1260 || BranchId == 1276) {
                            $('#SchoolCopy').hide();
                        }
                        else if (BranchId == 117) {
                            $('#SchoolCopy').hide();
                            $('#CollegeCopy').text('Institute Copy');
                        }
                        else if (BranchId == 1534) {
                            $('#SchoolCopy').hide();
                            $('#CollegeCopy').text('College Copy');
                        }
                        else {
                            $('#CollegeCopy').hide();
                        }


                        $.each(data.responseObject, function (a, b) {
                            debugger
                            $.each(b.feeDetailsList, function (c, d) {
                                debugger

                                $('#DivPaidFee').html(d.Paid);
                                $('#lblRegNo').text(d.StudentId);

                                debugger

                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }

                                if (SchoolId == 1219 || SchoolId == 57 || SchoolId == 1218 || SchoolId == 1224) {
                                    var Gpwc = d.GrossPayable - Concession
                                    debugger
                                    $("#DivFeeDetailC").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeNameC" + d.FeeId + "'>" + d.FeeName + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivGrossPayableC" + d.FeeId + "'>" + Gpwc + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivConcessionC" + d.FeeId + "'>0 </div><div  class='FeeHeadValue' style='width: 18%;' id='DivPaidC" + d.FeeId + "'>" + d.Paid + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivBalanceC" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));

                                }


                                else {
                                    $("#DivFeeDetailC").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeNameC" + d.FeeId + "'>" + d.FeeName + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivGrossPayableC" + d.FeeId + "'>" + d.GrossPayable + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivConcessionC" + d.FeeId + "'>" + Concession + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivPaidC" + d.FeeId + "'>" + d.Paid + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivBalanceC" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));
                                }


                                $("#DivFeeDetail").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeName" + d.FeeId + "'>" + d.FeeName + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivGrossPayable" + d.FeeId + "'>" + d.GrossPayable + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivConcession" + d.FeeId + "'>" + Concession + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivPaid" + d.FeeId + "'>" + d.Paid + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivBalance" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));
                            });

                            debugger
                            $.each(b.feeTotalList, function (c, d) {
                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }

                                $('#DivGrossPayablet').html(d.GrossPayable);
                                $('#DivConcessiont').html(Concession);
                                $('#DivPaidt').html(d.Paid);
                                $('#DivBalancet').html(d.Balance);

                                if (SchoolId == 1219 || SchoolId == 57 || SchoolId == 1218 || SchoolId == 1224) {
                                    $('#DivGrossPayabletC').html(d.GrossPayable - Concession);
                                    $('#DivConcessiontC').html('0');
                                    $('#DivPaidtC').html(d.Paid);
                                    $('#DivBalancetC').html(d.Balance);
                                }

                                else {
                                    $('#DivGrossPayabletC').html(d.GrossPayable);
                                    $('#DivConcessiontC').html(Concession);
                                    $('#DivPaidtC').html(d.Paid);
                                    $('#DivBalancetC').html(d.Balance);

                                }

                            });

                            $.each(b.feeSlipList, function (g, h) {
                                debugger
                                //$('#DivBatchNo').html(h.Session);
                                if (BranchId == 55 || BranchId == 141 || BranchId == 1172 || BranchId == 129) {
                                    $('#DivBatchNo').text('2022-2023');

                                }
                                else {
                                    $('#DivBatchNo').text(h.Session);
                                    $('#DivBatchN').text(h.Session);
                                }
                                $('#DivAffilationNo').text(h.AffilationIdBy);
                                //-----for Sanskaram College Name and Logo Classwise------------
                                debugger
                                var TempClassIdSanskaram = "";
                                TempClassIdSanskaram = $("#ddlClass").val();

                                if (TempClassIdSanskaram == 6768 || TempClassIdSanskaram == 6769 || TempClassIdSanskaram == 6770 || TempClassIdSanskaram == 6771) {
                                    $('#DivSchoolName').html("Sanskaram Degree College");
                                    $('#DivSchoolNameC').html("Sanskaram Degree College");
                                    $('#DivSchoolLogo img').hide();
                                    $('#DivSchoolLogo2 img').hide();
                                }
                                else if (TempClassIdSanskaram == 6772 || TempClassIdSanskaram == 6773 || TempClassIdSanskaram == 6774 || TempClassIdSanskaram == 6775) {

                                    $('#DivSchoolName').html("Sanskaram Law College");
                                    $('#DivSchoolNameC').html("Sanskaram Law College");
                                    $('#DivSchoolLogo img').hide();
                                    $('#DivSchoolLogo2 img').hide();
                                }
                                else {

                                    $('#DivSchoolName').html(h.BranchName);
                                    $('#DivSchoolNameC').html(h.BranchName);

                                    $('#DivSchoolLogo img').show();
                                    $('#DivSchoolLogo2 img').show();

                                    $('#DivSchoolLogo img').attr('src', h.BranchLogo);
                                    $('#DivSchoolLogo2 img').attr('src', h.BranchLogo);


                                }
                                //-----for Sanskaram College Name and Logo Classwise------------
                                $('#DivSchoolAddress').html(h.BranchAddressLine1);
                                if (SchoolId == 1231) {
                                    $('#DivFeeReceipt').text("Rec. No: " + h.BranchAddressLine4);

                                } else {
                                    $('#DivFeeReceipt').text("Rec. No: " + RecNo);
                                }
                                $('#DivFeeClass').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#DivFeeSection').text(h.SectionName);
                                $('#DivFeeDate').text(h.PaidDate);
                                $('#lblRegNo').text(h.StudentId);

                                if (BranchId == 1311) {
                                    $("#2divadmno_3").hide();

                                }
                                else {
                                    $('#2lblAdmNo_3').text(h.AdmissionNumber);

                                }

                           

                                if (BranchId == 1311) {
                                    $("#2divAdmnoC_3").hide();

                                }
                                else {
                                    $('#2lblAdmNoC_3').text(h.AdmissionNumber);
                                }


                                $('#lblStudentName').text(h.StudentName);

                                if (h.FatherName == "") {
                                    $('#lblfmdetail').text("Mother :");
                                    $('#lblFatherName').text(h.MotherName);

                                }
                                else if (h.MotherName == "") {
                                    $('#lblfmdetail').text("Father :");
                                    $('#lblFatherName').text(h.FatherName);

                                }
                                else {
                                    $('#lblfmdetail').text("Father/Mother :");
                                    $('#lblFatherName').text(h.FatherName + "/" + h.MotherName);

                                }



                                $('#lblMobileNo').text(h.MobileNo1);
                                //$('#lblAddress').text(h.AddressLine1 + "," + h.MobileNo1);
                                $('#lblMonths').text(h.Months);
                                $('#DivPaidtype').html(h.PaymentMode);
                                $('#lblRsWord').text(data.responseMessage);
                                if (h.DOB == "") {
                                    $("#divDob").hide();
                                }
                                else if (BranchId == 135 || BranchId == 130 || BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1276 || BranchId == 1311 || BranchId == 1289) {
                                    $("#divDob").hide();


                                }
                                else {
                                    $("#divDob").show();
                                    $("#lblDob").text(h.DOB);

                                }
                                debugger
                                //honey
                                if (h.RouteName == "") {
                                    $("#divRoute").hide();
                                    $('#divAddress').show();
                                    $('#lblAddress').text(h.AddressLine1);
                                }
                                else if (BranchId == 1239) {
                                    $("#divRoute").hide();
                                    $('#divAddress').hide();


                                }
                                else {
                                    $("#divRoute").show();
                                    $('#divAddress').hide();
                                    $('#lblRoute').text(h.RouteName);

                                }

                                //$('#DivBatchNoC').html(h.Session);
                                if (BranchId == 55 || BranchId == 141 || BranchId == 1172 || BranchId == 129) {
                                    $('#DivBatchNoC').text('2022-2023');

                                }
                                else {
                                    $('#DivBatchNoC').text(h.Session);
                                    $('#DivBatchNoC').text(h.Session);
                                }
                                $('#DivAffilationNoC').text(h.AffilationIdBy);

                                $('#DivSchoolAddressC').html(h.BranchAddressLine1);
                                if (SchoolId == 1231) {
                                    $('#DivFeeReceiptC').text("Rec. No: " + h.BranchAddressLine4);

                                } else {
                                    $('#DivFeeReceiptC').text("Rec. No: " + RecNo);
                                }
                                $('#DivFeeClassC').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#DivFeeSectionC').text(h.SectionName);
                                $('#DivFeeDateC').text(h.PaidDate);
                                $('#lblRegNoC').text(h.StudentId);
                                $('#lblStudentNameC').text(h.StudentName);

                                if (h.FatherName == "") {
                                    $('#lblfmdetailC').text("Mother :");
                                    $('#lblFatherNameC').text(h.MotherName);

                                }
                                else if (h.MotherName == "") {
                                    $('#lblfmdetailC').text("Father :");
                                    $('#lblFatherNameC').text(h.FatherName);

                                }
                                else {
                                    $('#lblfmdetailC').text("Father/Mother :");
                                    $('#lblFatherNameC').text(h.FatherName + "/" + h.MotherName);

                                }

                                $('#lblMobileNoC').text(h.MobileNo1);
                                //$('#lblAddressC').text(h.AddressLine1 + "," + h.MobileNo1);
                                $('#lblMonthsC').text(h.Months);
                                $('#DivPaidtypeC').html(h.PaymentMode);

                                if (h.ConcessionName == "") {
                                    $("#divConcesion").hide();
                                    $("#divConcesionC").hide();
                                }

                                if (BranchId == 117 || BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1546 || BranchId == 1276 || BranchId == 1534 || BranchId == 1533) {
                                    $("#divConcesion").hide();
                                    $("#divConcesionC").hide();

                                }
                                else {
                                    $('#lblConcessionName').text(h.ConcessionName);
                                    $('#lblConcessionNameC').text(h.ConcessionName);
                                }

                                if (BranchId == 1723 ) {
                                    
                                    $("#divConcesionC").hide();

                                }
                               



                                $('#lblRsWordC').text(data.responseMessage);

                                $('#lblPaymentModeSchool').text(h.PaymentMode);
                                $('#lblPaymentModeStudent').text(h.PaymentMode);

                                if (h.DOB == "") {
                                    $("#divDobC").hide();
                                }
                                else if (BranchId == 135 || BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1276 || BranchId == 1311) {
                                    $("#divDobC").hide();


                                }
                                else {
                                    $("#divDobC").show();
                                    $("#lblDobC").text(h.DOB);

                                }
                                //honey
                                debugger
                                if (h.RouteName == "") {
                                    $("#divRouteC").hide();
                                    $('#divAddressC').show();
                                    $('#lblAddressC').text(h.AddressLine1);
                                }
                                else if (BranchId == 1239) {
                                    $("#divRouteC").hide();
                                    $('#divAddressC').hide();


                                }
                                else {
                                    $("#divRouteC").show();
                                    $('#divAddressC').hide();
                                    $('#lblRouteC').text(h.RouteName);

                                }

                                //This is Done By Honey
                                if (h.Remarks == "") {
                                    $("#DivRemarks").hide();

                                }
                                else if (BranchId == 117) {
                                    $("#DivRemarks").hide();

                                }
                                else {
                                    $("#DivRemarks").show();
                                    $('#lblRemarkSchool').text(h.Remarks);
                                }
                                $("#DivRemarksC").hide();


                                if (Number(SchoolId) == 1224) {
                                    $("#2divadmno_3").hide();
                                    $("#2divAdmnoC_3").hide();
                                    $("#divDob").hide();
                                    $("#divDobC").hide();
                                    //$("#lblRsWord").par
                                    document.getElementById("lblRsWordC").parentElement.style.display = 'none'
                                    document.getElementById("lblRsWord").parentElement.style.display = 'none'

                                }





                                if (h.ChequeDDCardNo == "") {
                                    $("#DivChequeNo").hide();
                                    $("#DivChequeNoStudent").hide();

                                } else {
                                    $("#DivChequeNo").show();
                                    $("#DivChequeNoStudent").show();
                                    $('#lblChequeNo').text(h.ChequeDDCardNo);
                                    $('#lblChequeNoStudent').text(h.ChequeDDCardNo);

                                }


                                if (h.BankName == "") {
                                    $("#DivBankName").hide();
                                    $("#DivBankNameStudent").hide();

                                } else {
                                    $("#DivBankName").show();
                                    $("#DivBankNameStudent").show();
                                    $('#lblBankName').text(h.BankName);
                                    $('#lblBankNameStudent').text(h.BankName);

                                }

                                if (h.ChequeDate == "") {
                                    $("#DivChequeDate").hide();
                                    $("#DivChequeDateStudent").hide();

                                } else {
                                    $("#DivChequeDate").show();
                                    $("#DivChequeDateStudent").show();
                                    $('#lblChequeDate').text(h.ChequeDate);
                                    $('#lblChequeDateStudent').text(h.ChequeDate);

                                }



                            });

                            $('#btnPrintReceipt').unbind('click');
                            $('#btnPrintReceipt').click(function () {

                                PrintRegFeeSlip();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }


                            });

                            $('#btnCancelPrinReceipt').unbind('click');
                            $('#btnCancelPrinReceipt').click(function () {
                                $("#divPrintRegFeeSlip").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                            $('#btnCancelPrinReceipt1').unbind('click');
                            $('#btnCancelPrinReceipt1').click(function () {
                                $("#divPrintRegFeeSlip").slideUp();
                            });

                            $('#ClosePrintSlipPopUp').unbind('click');
                            $('#ClosePrintSlipPopUp').click(function () {
                                $("#divPrintRegFeeSlip").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                        });

                    }
                    else {
                        $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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

function getFeeSlipSingleSmallCenter(RecNo, BranchId, Stid, RMon) {
    debugger

    var BO = {
        "objFeeSlipBO": {
            "Action": "getfeeslip",
            "BranchId": BranchId,
            "Receiptno": RecNo,
            "StudentId": Stid
        }
    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetFeeSlip",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {
            debugger
            $("#divPrintRegFeeSlipSSC").slideDown();

            debugger
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $("#DivFeeDetailSSC").empty();
                        $("#DivFeeTotalSSC").empty();




                        $.each(data.responseObject, function (a, b) {
                            debugger
                            $.each(b.feeDetailsList, function (c, d) {
                                debugger

                                //$('#DivPaidFeeSSC').html(d.Paid);
                                //$('#lblRegNoSSC').text(d.StudentId);

                                debugger

                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }


                                $("#DivFeeDetailSSC").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeNameSSC" + d.FeeId + "'>" + d.FeeName + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivGrossPayableSSC" + d.FeeId + "'>" + d.GrossPayable + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivConcessionSSC" + d.FeeId + "'>" + Concession + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivPaidSSC" + d.FeeId + "'>" + d.Paid + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivBalanceSSC" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));


                            });

                            debugger
                            $.each(b.feeTotalList, function (c, d) {
                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }

                                $('#DivGrossPayableTSSC').html(d.GrossPayable);
                                $('#DivConcessionTSSC').html(Concession);
                                $('#DivPaidTSSC').html(d.Paid);
                                $('#DivBalanceTSSC').html(d.Balance);
                            });

                            $.each(b.feeSlipList, function (g, h) {
                                debugger


                                $('#DivBatchNoSSC').text(h.Session);
                                $('#DivAffilationNoSSC').text(h.AffilationIdBy);
                                $('#DivSchoolNameSSC').html(h.BranchName);


                                $('#DivSchoolLogo2SSC img').attr('src', h.BranchLogo);
                                $('#DivSchoolAddressSSC').html(h.BranchAddressLine1);
                                $('#DivFeeReceiptSSC').text("Rec. No: " + RecNo);
                                $('#DivFeeClassSSC').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#DivFeeDateSSC').text(h.PaidDate);

                                $('#lblRegNoSSC').text(h.StudentId);
                                $('#lblAdmNoSSC').text(h.AdmissionNumber);
                                $('#lblStudentNameSSC').text(h.StudentName);

                                if (h.FatherName == "") {
                                    $('#lblFMdetailSSC').text("Mother :");
                                    $('#lblFatherNameSSC').text(h.MotherName);

                                }
                                else if (h.MotherName == "") {
                                    $('#lblFMdetailSSC').text("Father :");
                                    $('#lblFatherNameSSC').text(h.FatherName);

                                }
                                else {
                                    $('#lblFMdetailSSC').text("Father/Mother :");
                                    $('#lblFatherNameSSC').text(h.FatherName + "/" + h.MotherName);

                                }

                                $('#lblMobileNoSSC').text(h.MobileNo1);

                                if (h.RouteName == "") {
                                    $("#divRouteSSC").hide();
                                    $('#divAddressSSC').show();
                                    $('#lblAddressSSC').text(h.AddressLine1);
                                }
                                else {
                                    $("#divRouteSSC").show();
                                    $('#divAddressSSC').hide();
                                    $('#lblRouteSSC').text(h.RouteName);

                                }
                                if (h.DOB == "") {
                                    $("#divDobSSC").hide();
                                }
                                else {
                                    $("#divDobSSC").show();
                                    $("#lblDobSSC").text(h.DOB);
                                }
                                $('#lblMonthsSSC').text(h.Months);

                                if (BranchId == 12) {
                                    $('#lblConcessionNameSSC').text(h.ConcessionName);

                                }
                                else {

                                    $("#divConcesionNameSSC").hide();
                                }

                                $('#lblRsWordSSC').text(data.responseMessage);
                                $('#lblPaymentModeSSC').html(h.PaymentMode);

                                if (h.Remarks == "") {
                                    $("#DivRemarksSSC").hide();

                                } else {
                                    $("#DivRemarksSSC").show();
                                    $('#lblRemarskSSC').text(h.Remarks);
                                }

                                if (h.ChequeDDCardNo == "") {
                                    $("#DivChequeNoSSC").hide();

                                } else {
                                    $("#DivChequeNoSSC").show();
                                    $('#lblChequeNoSSC').text(h.ChequeDDCardNo);

                                }

                                if (h.BankName == "") {
                                    $("#DivBankNameSSC").hide();

                                } else {
                                    $("#DivBankNameSSC").show();
                                    $('#lblBankNameSSC').text(h.BankName);

                                }

                                if (h.ChequeDate == "") {
                                    $("#DivChequeDateSSC").hide();

                                } else {
                                    $("#DivChequeDateSSC").show();
                                    $('#lblChequeDateSSC').text(h.ChequeDate);

                                }
                            });

                            $('#btnPrintReceiptSSC').unbind('click');
                            $('#btnPrintReceiptSSC').click(function () {

                                PrintRegFeeSlipSingleSmallCenter();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }


                            });

                            $('#btnCancelPrinReceiptSSC').unbind('click');
                            $('#btnCancelPrinReceiptSSC').click(function () {
                                $("#divPrintRegFeeSlipSSC").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                            $('#btnCancelPrinReceipt1SSC').unbind('click');
                            $('#btnCancelPrinReceipt1SSC').click(function () {
                                $("#divPrintRegFeeSlipSSC").slideUp();
                            });

                            $('#ClosePrintSlipPopUpSSC').unbind('click');
                            $('#ClosePrintSlipPopUpSSC').click(function () {
                                $("#divPrintRegFeeSlipSSC").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });



                            $('#ClosePrintSlipPopUp1SSC').unbind('click');
                            $('#ClosePrintSlipPopUp1SSC').click(function () {
                                debugger
                                $("#divPrintRegFeeSlipSSC").slideUp();
                            });

                        });

                    }
                    else {
                        $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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

function getFeeSlipZero(RecNo, BranchId, Stid, RMon) {
    debugger

    var BO = {
        "objFeeSlipBO": {
            "Action": "getzeroslip",
            "BranchId": BranchId,
            "Receiptno": RecNo,
            "StudentId": Stid
        }
    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetFeeSlipZero",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {
            debugger
            $("#divPrintRegFeeSlipZero").slideDown();

            debugger
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {

                        $("#DivFeeDetailZero").empty();

                        $.each(data.responseObject, function (a, b) {
                            debugger

                            $.each(b.feeDetailsList, function (c, d) {
                                // check if this is total row
                                var isTotal = (d.PaidDate && d.PaidDate.toLowerCase() === "total paid");

                                // build row
                                var $row = $("<ul class='line-group'><li class='line-item'>" +
                                    "<div class='FeeHeadValue' style='width: 20%;' id='DivPaidDateZero" + d.FeeId + "'>" + d.PaidDate + "</div>" +
                                    "<div class='FeeHeadValue' style='width: 20%;' id='DivReceiptnoZero" + d.FeeId + "'>" + d.Receiptno + "</div>" +
                                    "<div class='FeeHeadValue' style='width: 20%;' id='DivNetPayableZero" + d.FeeId + "'>" + d.NetPayable + "</div>" +
                                    "<div class='FeeHeadValue' style='width: 20%;' id='DivPaidZero" + d.FeeId + "'>" + d.Paid + "</div>" +
                                    "<div class='FeeHeadValue' style='width: 20%;' id='DivPaymentModeZero" + d.FeeId + "'>" + d.PaymentMode + "</div>" +
                                    "</li></ul>");

                                // apply bold style if it's the total row
                                if (isTotal) {
                                    $row.find("li").css("font-weight", "bold");
                                }

                                $("#DivFeeDetailZero").append($row);
                            });


                            $.each(b.feeSlipList, function (g, h) {
                                debugger
                                $('#DivBatchNoZero').text(h.Session);

                                $('#DivAffilationNoZero').text(h.AffilationIdBy);

                                $('#DivSchoolNameZero').html(h.BranchName);

                                $('#DivSchoolLogoZero img').show();

                                $('#DivSchoolLogoZero img').attr('src', h.BranchLogo);

                                $('#DivSchoolAddressZero').html(h.BranchAddressLine1);
                                $('#DivFeeClassZero').text("Class: " + h.ClassMasterName + "-" + h.SectionName);

                                $('#DivFeeDateZero').text(h.Time);
                                $('#lblRegNoZero').text(h.StudentId);

                                $('#2lblAdmNoZero_3').text(h.AdmissionNumber);

                                $('#lblStudentNameZero').text(h.StudentName);

                                if (h.FatherName == "") {
                                    $('#lblfmdetailZero').text("Mother :");
                                    $('#lblFatherNameZero').text(h.MotherName);

                                }
                                else if (h.MotherName == "") {
                                    $('#lblfmdetailZero').text("Father :");
                                    $('#lblFatherNameZero').text(h.FatherName);

                                }
                                else {
                                    $('#lblfmdetailZero').text("Father/Mother :");
                                    $('#lblFatherNameZero').text(h.FatherName + "/" + h.MotherName);

                                }

                                $('#lblMobileNoZero').text(h.MobileNo1);
                                $('#lblAddressZero').text(h.AddressLine1);
                                $('#lblMonthsZero').text(h.Months);


                            });

                            $('#btnPrintReceiptZero').unbind('click');
                            $('#btnPrintReceiptZero').click(function () {
                                PrintRegFeeSlipZero();
                            });

                            $('#btnCancelPrinReceiptZero').unbind('click');
                            $('#btnCancelPrinReceiptZero').click(function () {
                                $("#divPrintRegFeeSlipZero").slideUp();
                            });

                            //$('#btnCancelPrinReceipt1Zero').unbind('click');
                            //$('#btnCancelPrinReceipt1Zero').click(function () {
                            //    $("#divPrintRegFeeSlipZero").slideUp();
                            //});

                            //$('#ClosePrintSlipPopUpZero').unbind('click');
                            //$('#ClosePrintSlipPopUpZero').click(function () {
                            //    $("#divPrintRegFeeSlipZero").slideUp();                                
                            //});

                        });

                    }
                    else {
                        $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
            }


        },
        complete: function () {

            setTimeout(function () { $("#loader_home").fadeOut("slow"); }, 1);
        },
        error: function (data) {
            MessageBoxError("eee20" + JSON.stringify(data));
            setTimeout(function () { $("#loader_home").fadeOut("slow"); }, 1);
        }
    });
}

function getFeeSlipOzone(RecNo, BranchId, Stid, RMon) {
    debugger

    var BO = {
        "objFeeSlipBO": {
            "Action": "getfeeslip",
            "BranchId": BranchId,
            "Receiptno": RecNo,
            "StudentId": Stid
        }
    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetFeeSlip",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {
            debugger
            $("#divPrintRegFeeSlipOzone").slideDown();

            debugger
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $("#DivFeeDetailOzone").empty();
                        $("#DivFeeDetailCOzone").empty();


                        if (BranchId == 1259 || BranchId == 1260 || BranchId == 1276 || BranchId == 1319 || BranchId == 1368 || BranchId == 1389 || BranchId == 135) {
                            $('#SchoolCopyOzone').hide();
                        }
                        else {
                            $('#CollegeCopyOzone').hide();
                        }


                        $.each(data.responseObject, function (a, b) {
                            debugger
                            $.each(b.feeDetailsList, function (c, d) {
                                debugger

                                $('#DivPaidFeeOzone').html(d.Paid);
                                $('#lblRegNoOzone').text(d.StudentId);

                                debugger

                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }


                                $("#DivFeeDetailCOzone").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeNameCOzone" + d.FeeId + "'>" + d.FeeName + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivGrossPayableCOzone" + d.FeeId + "'>" + d.GrossPayable + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivConcessionCOzone" + d.FeeId + "'>" + Concession + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivPaidCOzone" + d.FeeId + "'>" + d.Paid + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivBalanceCOzone" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));

                                $("#DivFeeDetailOzone").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeNameOzone" + d.FeeId + "'>" + d.FeeName + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivGrossPayableOzone" + d.FeeId + "'>" + d.GrossPayable + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivConcessionOzone" + d.FeeId + "'>" + Concession + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivPaidOzone" + d.FeeId + "'>" + d.Paid + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivBalanceOzone" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));
                            });

                            debugger
                            $.each(b.feeTotalList, function (c, d) {
                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }

                                $('#DivGrossPayabletOzone').html(d.GrossPayable);
                                $('#DivConcessiontOzone').html(Concession);
                                $('#DivPaidtOzone').html(d.Paid);
                                $('#DivBalancetOzone').html(d.Balance);

                                $('#DivGrossPayabletCOzone').html(d.GrossPayable);
                                $('#DivConcessiontCOzone').html(Concession);
                                $('#DivPaidtCOzone').html(d.Paid);
                                $('#DivBalancetCOzone').html(d.Balance);
                            });

                            $.each(b.feeSlipList, function (g, h) {
                                debugger
                                //$('#DivBatchNo').html(h.Session);
                                if (BranchId == 55 || BranchId == 141 || BranchId == 1172 || BranchId == 129) {
                                    $('#DivBatchNoOzone').text('2022-2023');

                                }
                                else {
                                    $('#DivBatchNoOzone').text(h.Session);
                                    $('#DivBatchNOzone').text(h.Session);
                                }
                                $('#DivAffilationNoOzone').text(h.AffilationIdBy);
                                $('#DivSchoolNameOzone').html(h.BranchName);

                                $('#DivSchoolLogoOzone img').attr('src', h.BranchLogo);
                                $('#DivSchoolLogo2Ozone img').attr('src', h.BranchLogo);
                                $('#DivSchoolAddressOzone').html(h.BranchAddressLine1);
                                $('#DivFeeReceiptOzone').text("Rec. No: " + RecNo);
                                $('#DivFeeClassOzone').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#DivFeeSectionOzone').text(h.SectionName);
                                $('#DivFeeDateOzone').text(h.PaidDate);
                                $('#lblRegNoOzone').text(h.StudentId);

                                if (BranchId == 1311) {
                                    $("#2divadmno_3Ozone").hide();

                                }
                                else {
                                    $('#2lblAdmNo_3Ozone').text(h.AdmissionNumber);

                                }

                                if (BranchId == 1311) {
                                    $("#2divAdmnoC_3Ozone").hide();

                                }
                                else {
                                    $('#2lblAdmNoC_3Ozone').text(h.AdmissionNumber);
                                }


                                $('#lblStudentNameOzone').text(h.StudentName);

                                if (h.FatherName == "") {
                                    $('#lblfmdetailOzone').text("Mother :");
                                    $('#lblFatherNameOzone').text(h.MotherName);

                                }
                                else if (h.MotherName == "") {
                                    $('#lblfmdetailOzone').text("Father :");
                                    $('#lblFatherNameOzone').text(h.FatherName);

                                }
                                else {
                                    $('#lblfmdetailOzone').text("Father/Mother :");
                                    $('#lblFatherNameOzone').text(h.FatherName + "/" + h.MotherName);

                                }



                                $('#lblMobileNoOzone').text(h.MobileNo1);
                                //$('#lblAddress').text(h.AddressLine1 + "," + h.MobileNo1);
                                $('#lblMonthsOzone').text(h.Months);
                                $('#DivPaidtypeOzone').html(h.PaymentMode);
                                $('#lblRsWordOzone').text(data.responseMessage);
                                if (h.DOB == "") {
                                    $("#divDobOzone").hide();
                                }
                                else if (BranchId == 130 || BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1276 || BranchId == 1311 || BranchId == 1289) {
                                    $("#divDobOzone").hide();


                                }
                                else {
                                    $("#divDobOzone").show();
                                    $("#lblDobOzone").text(h.DOB);

                                }
                                debugger
                                //honey
                                if (h.RouteName == "") {
                                    $("#divRouteOzone").hide();
                                    $('#divAddressOzone').show();
                                    $('#lblAddressOzone').text(h.AddressLine1);
                                }
                                else if (BranchId == 1239) {
                                    $("#divRouteOzone").hide();
                                    $('#divAddressOzone').hide();


                                }
                                else {
                                    $("#divRouteOzone").show();
                                    $('#divAddressOzone').hide();
                                    $('#lblRouteOzone').text(h.RouteName);

                                }

                                //$('#DivBatchNoC').html(h.Session);
                                if (BranchId == 55 || BranchId == 141 || BranchId == 1172 || BranchId == 129) {
                                    $('#DivBatchNoCOzone').text('2022-2023');

                                }
                                else {
                                    $('#DivBatchNoCOzone').text(h.Session);
                                    $('#DivBatchNoCOzone').text(h.Session);
                                }
                                $('#DivAffilationNoCOzone').text(h.AffilationIdBy);
                                $('#DivSchoolNameCOzone').html(h.BranchName);
                                $('#DivSchoolAddressCOzone').html(h.BranchAddressLine1);
                                $('#DivFeeReceiptCOzone').text("Rec. No: " + RecNo);
                                $('#DivFeeClassCOzone').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#DivFeeSectionCOzone').text(h.SectionName);
                                $('#DivFeeDateCOzone').text(h.PaidDate);
                                $('#lblRegNoCOzone').text(h.StudentId);
                                $('#lblStudentNameCOzone').text(h.StudentName);

                                if (h.FatherName == "") {
                                    $('#lblfmdetailCOzone').text("Mother :");
                                    $('#lblFatherNameCOzone').text(h.MotherName);

                                }
                                else if (h.MotherName == "") {
                                    $('#lblfmdetailCOzone').text("Father :");
                                    $('#lblFatherNameCOzone').text(h.FatherName);

                                }
                                else {
                                    $('#lblfmdetailCOzone').text("Father/Mother :");
                                    $('#lblFatherNameCOzone').text(h.FatherName + "/" + h.MotherName);

                                }

                                $('#lblMobileNoCOzone').text(h.MobileNo1);
                                //$('#lblAddressC').text(h.AddressLine1 + "," + h.MobileNo1);
                                $('#lblMonthsCOzone').text(h.Months);
                                $('#DivPaidtypeCOzone').html(h.PaymentMode);
                                $('#lblConcessionNameOzone').text(h.ConcessionName);
                                if (BranchId == 12) {
                                    $('#lblConcessionNameCOzone').text(h.ConcessionName);

                                }
                                else {

                                    $("#divConcesionCOzone").hide();
                                }





                                $('#lblRsWordCOzone').text(data.responseMessage);

                                $('#lblPaymentModeSchoolOzone').text(h.PaymentMode);
                                $('#lblPaymentModeStudentOzone').text(h.PaymentMode);

                                if (h.DOB == "") {
                                    $("#divDobCOzone").hide();
                                }
                                else if (BranchId == 130 || BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1276 || BranchId == 1311) {
                                    $("#divDobCOzone").hide();


                                }
                                else {
                                    $("#divDobCOzone").show();
                                    $("#lblDobCOzone").text(h.DOB);

                                }
                                //honey
                                debugger
                                if (h.RouteName == "") {
                                    $("#divRouteCOzone").hide();
                                    $('#divAddressCOzone').show();
                                    $('#lblAddressCOzone').text(h.AddressLine1);
                                }
                                else if (BranchId == 1239) {
                                    $("#divRouteCOzone").hide();
                                    $('#divAddressCOzone').hide();


                                }
                                else {
                                    $("#divRouteCOzone").show();
                                    $('#divAddressCOzone').hide();
                                    $('#lblRouteCOzone').text(h.RouteName);

                                }

                                //This is Done By Honey
                                if (h.Remarks == "") {
                                    $("#DivRemarksOzone").hide();

                                } else {
                                    $("#DivRemarksOzone").show();
                                    $('#lblRemarkSchoolOzone').text(h.Remarks);
                                }
                                $("#DivRemarksCOzone").hide();








                                if (h.ChequeDDCardNo == "") {
                                    $("#DivChequeNoOzone").hide();
                                    $("#DivChequeNoStudentOzone").hide();

                                } else {
                                    $("#DivChequeNoOzone").show();
                                    $("#DivChequeNoStudentOzone").show();
                                    $('#lblChequeNoOzone').text(h.ChequeDDCardNo);
                                    $('#lblChequeNoStudentOzone').text(h.ChequeDDCardNo);

                                }


                                if (h.BankName == "") {
                                    $("#DivBankNameOzone").hide();
                                    $("#DivBankNameStudentOzone").hide();

                                } else {
                                    $("#DivBankNameOzone").show();
                                    $("#DivBankNameStudentOzone").show();
                                    $('#lblBankNameOzone').text(h.BankName);
                                    $('#lblBankNameStudentOzone').text(h.BankName);

                                }

                                if (h.ChequeDate == "") {
                                    $("#DivChequeDateOzone").hide();
                                    $("#DivChequeDateStudentOzone").hide();

                                } else {
                                    $("#DivChequeDateOzone").show();
                                    $("#DivChequeDateStudentOzone").show();
                                    $('#lblChequeDateOzone').text(h.ChequeDate);
                                    $('#lblChequeDateStudentOzone').text(h.ChequeDate);

                                }



                            });

                            $('#btnPrintReceiptOzone').unbind('click');
                            $('#btnPrintReceiptOzone').click(function () {

                                PrintRegFeeSlipOzone();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }


                            });

                            $('#btnCancelPrinReceiptOzone').unbind('click');
                            $('#btnCancelPrinReceiptOzone').click(function () {
                                $("#divPrintRegFeeSlipOzone").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                            $('#btnCancelPrinReceipt1Ozone').unbind('click');
                            $('#btnCancelPrinReceipt1Ozone').click(function () {
                                $("#divPrintRegFeeSlipOzone").slideUp();
                            });

                            $('#ClosePrintSlipPopUpOzone').unbind('click');
                            $('#ClosePrintSlipPopUpOzone').click(function () {
                                $("#divPrintRegFeeSlipOzone").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                        });

                    }
                    else {
                        $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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
function getFeeSlipWithoutDiscount(RecNo, BranchId, Stid, RMon) {
    debugger

    var BO = {
        "objFeeSlipBO": {
            "Action": "getfeeslip",
            "BranchId": BranchId,
            "Receiptno": RecNo,
            "StudentId": Stid
        }
    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetFeeSlip",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {
            debugger
            $("#divPrintRegFeeSlipWD").slideDown();

            debugger
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $("#DivFeeDetailWD").empty();
                        $("#DivFeeDetailCWD").empty();


                        if (BranchId == 1259 || BranchId == 1260 || BranchId == 1276) {
                            $('#SchoolCopyWD').hide();
                        }
                        else {
                            $('#CollegeCopyWD').hide();
                        }


                        $.each(data.responseObject, function (a, b) {
                            debugger
                            $.each(b.feeDetailsList, function (c, d) {

                                debugger

                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }

                                $("#DivFeeDetailWD").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 40%;' id='DivFeeNameWD" + d.FeeId + "'>" + d.FeeName + "</div><div class='FeeHeadValue' style='width: 30%;' id='DivGrossPayableWD" + d.FeeId + "'>" + d.Paid + "</div><div class='FeeHeadValue' style='width: 30%;' id='DivPaidWD" + d.FeeId + "'>" + d.Paid + "</div></li></ul>"));


                                $("#DivFeeDetailCWD").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 40%;' id='DivFeeNameCWD" + d.FeeId + "'>" + d.FeeName + "</div><div class='FeeHeadValue' style='width: 30%;' id='DivGrossPayableCWD" + d.FeeId + "'>" + d.Paid + "</div><div class='FeeHeadValue' style='width: 30%;' id='DivPaidCWD" + d.FeeId + "'>" + d.Paid + "</div></li></ul>"));


                            });

                            debugger
                            $.each(b.feeTotalList, function (c, d) {
                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }

                                $('#DivGrossPayableTWD').html(d.Paid);
                                $('#DivPaidTWD').html(d.Paid);

                                $('#DivGrossPayableTCWD').html(d.Paid);
                                $('#DivPaidTCWD').html(d.Paid);
                            });

                            $.each(b.feeSlipList, function (g, h) {
                                debugger

                                if (BranchId == 55 || BranchId == 141 || BranchId == 1172 || BranchId == 129) {
                                    $('#DivBatchNoWD').text('2022-2023');
                                    $('#DivBatchNoCWD').text('2022-2023');
                                }
                                else {
                                    $('#DivBatchNoWD').text(h.Session);
                                    $('#DivBatchNoCWD').text(h.Session);
                                }
                                $('#DivAffilationNoWD').text(h.AffilationIdBy);
                                $('#DivAffilationNoCWD').text(h.AffilationIdBy);

                                $('#DivSchoolNameWD').html(h.BranchName);
                                $('#DivSchoolNameCWD').html(h.BranchName);

                                $('#DivSchoolLogoWD img').attr('src', h.BranchLogo);
                                $('#DivSchoolLogoCWD img').attr('src', h.BranchLogo);

                                $('#DivSchoolAddressWD').html(h.BranchAddressLine1);
                                $('#DivSchoolAddressCWD').html(h.BranchAddressLine1);

                                $('#DivFeeReceiptWD').text("Rec. No: " + RecNo);
                                $('#DivFeeReceiptCWD').text("Rec. No: " + RecNo);

                                $('#DivFeeClassWD').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#DivFeeClassCWD').text("Class: " + h.ClassMasterName + "-" + h.SectionName);

                                $('#DivFeeDateWD').text(h.PaidDate);
                                $('#DivFeeDateCWD').text(h.PaidDate);

                                $('#lblRegNoWD').text(h.StudentId);
                                $('#lblRegNoCWD').text(h.StudentId);

                                if (BranchId == 1311) {
                                    $("#DivAdmNoWD").hide();

                                    $("#DivAdmNoCWD").hide();
                                }
                                else {
                                    $('#lblAdmNoWD').text(h.AdmissionNumber);
                                    $('#lblAdmNoCWD').text(h.AdmissionNumber);
                                }

                                $('#lblStudentNameWD').text(h.StudentName);
                                $('#lblStudentNameCWD').text(h.StudentName);

                                if (h.FatherName == "") {
                                    $('#lblfmdetailWD').text("Mother :");
                                    $('#lblFatherNameWD').text(h.MotherName);

                                    $('#lblfmdetailCWD').text("Mother :");
                                    $('#lblFatherNameCWD').text(h.MotherName);

                                }
                                else if (h.MotherName == "") {
                                    $('#lblfmdetailWD').text("Father :");
                                    $('#lblFatherNameWD').text(h.FatherName);

                                    $('#lblfmdetailCWD').text("Father :");
                                    $('#lblFatherNameCWD').text(h.FatherName);

                                }
                                else {
                                    $('#lblfmdetailWD').text("Father/Mother :");
                                    $('#lblFatherNameWD').text(h.FatherName + "/" + h.MotherName);

                                    $('#lblfmdetailCWD').text("Father/Mother :");
                                    $('#lblFatherNameCWD').text(h.FatherName + "/" + h.MotherName);

                                }

                                $('#lblMobileNoWD').text(h.MobileNo1);
                                $('#lblMobileNoCWD').text(h.MobileNo1);

                                if (h.RouteName == "") {
                                    $("#divRouteWD").hide();
                                    $("#divRouteCWD").hide();

                                    $('#divAddressWD').show();
                                    $('#lblAddressWD').text(h.AddressLine1);

                                    $('#divAddressCWD').show();
                                    $('#lblAddressCWD').text(h.AddressLine1);
                                }
                                else if (BranchId == 1239) {
                                    $("#divRouteWD").hide();
                                    $("#divRouteCWD").hide();

                                    $('#divAddressWD').hide();
                                    $('#divAddressCWD').hide();
                                }
                                else {
                                    $("#divRouteWD").show();
                                    $('#lblRouteWD').text(h.RouteName);

                                    $("#divRouteCWD").show();
                                    $('#lblRouteCWD').text(h.RouteName);

                                    $('#divAddressWD').hide();
                                    $('#divAddressCWD').hide();
                                }



                                if (h.DOB == "") {
                                    $("#divDobWD").hide();
                                    $("#divDobCWD").hide();
                                }
                                else if (BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1276 || BranchId == 1311 || BranchId == 1289) {
                                    $("#divDobWD").hide();
                                    $("#divDobCWD").hide();
                                }
                                else {
                                    $("#divDobWD").show();
                                    $("#lblDobWD").text(h.DOB);

                                    $("#divDobCWD").show();
                                    $("#lblDobCWD").text(h.DOB);
                                }




                                if (BranchId == 166 || BranchId == 130) {
                                    $("#divMonthsWD").hide();
                                    $("#divMonthsCWD").hide();

                                }
                                else {
                                    $("#divMonthsWD").show();
                                    $('#lblMonthsWD').text(h.ConcessionName);

                                    $("#divMonthsCWD").show();
                                    $('#lblMonthsCWD').text(h.ConcessionName);
                                }


                                if (BranchId == 166 || BranchId == 130 || BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1276) {
                                    $("#divConcesionWD").hide();
                                    $("#divConcesionCWD").hide();

                                }
                                else {
                                    $("#divConcesionWD").show();
                                    $('#lblConcessionNameWD').text(h.ConcessionName);

                                    $("#divConcesionCWD").show();
                                    $('#lblConcessionNameCWD').text(h.ConcessionName);
                                }

                                $('#lblRsWordWD').text(data.responseMessage);
                                $('#lblRsWordCWD').text(data.responseMessage);

                                $('#lblPaymentModeWD').text(h.PaymentMode);
                                $('#lblPaymentModeCWD').text(h.PaymentMode);

                                if (h.Remarks == "") {
                                    $("#DivRemarksWD").hide();
                                    $("#DivRemarksCWD").hide();

                                } else {
                                    $("#DivRemarksWD").show();
                                    $('#lblRemarksWD').text(h.Remarks);

                                    $("#DivRemarksCWD").show();
                                    $('#lblRemarksCWD').text(h.Remarks);
                                }


                                if (h.ChequeDDCardNo == "") {
                                    $("#DivChequeNoWD").hide();
                                    $("#DivChequeNoCWD").hide();

                                } else {
                                    $("#DivChequeNoWD").show();
                                    $('#lblChequeNoWD').text(h.ChequeDDCardNo);

                                    $("#DivChequeNoCWD").show();
                                    $('#lblChequeNoCWD').text(h.ChequeDDCardNo);
                                }


                                if (h.BankName == "") {
                                    $("#DivBankNameWD").hide();
                                    $("#DivBankNameCWD").hide();

                                } else {
                                    $("#DivBankNameWD").show();
                                    $('#lblBankNameWD').text(h.BankName);

                                    $("#DivBankNameCWD").show();
                                    $('#lblBankNameCWD').text(h.BankName);
                                }

                                if (h.ChequeDate == "") {
                                    $("#DivChequeDateWD").hide();
                                    $("#DivChequeDateCWD").hide();

                                } else {
                                    $("#DivChequeDateWD").show();
                                    $('#lblChequeDateWD').text(h.ChequeDate);

                                    $("#DivChequeDateCWD").show();
                                    $('#lblChequeDateCWD').text(h.ChequeDate);
                                }
                            });

                            $('#btnPrintReceiptWD').unbind('click');
                            $('#btnPrintReceiptWD').click(function () {
                                debugger
                                PrintRegFeeSlipWithoutDiscount();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }


                            });

                            $('#btnCancelPrinReceiptWD').unbind('click');
                            $('#btnCancelPrinReceiptWD').click(function () {
                                debugger
                                $("#divPrintRegFeeSlipWD").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                            $('#btnCancelPrinReceipt1WD').unbind('click');
                            $('#btnCancelPrinReceipt1WD').click(function () {
                                debugger
                                $("#divPrintRegFeeSlipWD").slideUp();
                            });

                            $('#ClosePrintSlipPopUpWD').unbind('click');
                            $('#ClosePrintSlipPopUpWD').click(function () {
                                $("#divPrintRegFeeSlipWD").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                            $('#ClosePrintSlipPopUp1WD').unbind('click');
                            $('#ClosePrintSlipPopUp1WD').click(function () {
                                debugger
                                $("#divPrintRegFeeSlipWD").slideUp();
                            });

                        });

                    }
                    else {
                        $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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

function getFeeSlipGST(RecNo, BranchId, Stid, RMon) {
    debugger

    var BO = {
        "objFeeSlipBO": {
            "Action": "getfeeslip",
            "BranchId": BranchId,
            "Receiptno": RecNo,
            "StudentId": Stid
        }
    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetFeeSlip",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {
            debugger
            $("#divPrintRegFeeSlipGST").slideDown();

            debugger
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $("#DivFeeDetailGST").empty();
                        $("#DivFeeDetailCGST").empty();


                        if (BranchId == 1259 || BranchId == 1260 || BranchId == 1276) {
                            $('#SchoolCopyGST').hide();
                        }
                        else {
                            $('#CollegeCopyGST').hide();
                        }


                        $.each(data.responseObject, function (a, b) {
                            debugger
                            $.each(b.feeDetailsList, function (c, d) {

                                debugger

                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }

                                //-------for GST Calculate-----------
                                var PayableAmount = (d.Paid * 100) / 118
                                var TotalGSTAmount = (d.Paid * 18) / 118
                                var SGSTAmount = TotalGSTAmount / 2
                                var CGSTAmount = TotalGSTAmount / 2
                                //-------for GST Calculate-----------

                                //--------for Office Copy-----------

                                $("#DivFeeDetailGST").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 32%;' id='DivFeeNameGST" + d.FeeId + "'>" + d.FeeName + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivGrossPayableGST" + d.FeeId + "'>" + PayableAmount.toFixed(2) + "</div><div class='FeeHeadValue' style='width: 32%;' id='DivConcessionGST" + d.FeeId + "'>" + 'Total GST @18% ' + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivPaidGST" + d.FeeId + "'>" + TotalGSTAmount.toFixed(2) + "</div></li></ul>"));

                                $("#DivFeeDetailGST").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 32%;min-height: 20px;' id='DivFeeNameGST" + d.FeeId + "'>" + ' ' + "</div><div class='FeeHeadValue' style='width: 18%;min-height: 20px;' id='DivGrossPayableGST" + d.FeeId + "'>" + ' ' + "</div><div class='FeeHeadValue' style='width: 32%;' id='DivConcessionGST" + d.FeeId + "'>" + 'SGST @9% ' + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivPaidGST" + d.FeeId + "'>" + SGSTAmount.toFixed(2) + "</div></li></ul>"));

                                $("#DivFeeDetailGST").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 32%;min-height: 20px;' id='DivFeeNameGST" + d.FeeId + "'>" + ' ' + "</div><div class='FeeHeadValue' style='width: 18%;min-height: 20px;' id='DivGrossPayableGST" + d.FeeId + "'>" + ' ' + "</div><div class='FeeHeadValue' style='width: 32%;' id='DivConcessionGST" + d.FeeId + "'>" + 'CGST @9% ' + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivPaidGST" + d.FeeId + "'>" + CGSTAmount.toFixed(2) + "</div></li></ul>"));



                                //--------for Parents Copy-----------
                                $("#DivFeeDetailCGST").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 32%;' id='DivFeeNameCGST" + d.FeeId + "'>" + d.FeeName + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivGrossPayableCGST" + d.FeeId + "'>" + PayableAmount.toFixed(2) + "</div><div class='FeeHeadValue' style='width: 32%;' id='DivConcessionCGST" + d.FeeId + "'>" + 'Total GST @18% ' + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivPaidCGST" + d.FeeId + "'>" + TotalGSTAmount.toFixed(2) + "</div></li></ul>"));

                                $("#DivFeeDetailCGST").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 32%;min-height: 20px;' id='DivFeeNameCGST" + d.FeeId + "'>" + ' ' + "</div><div class='FeeHeadValue' style='width: 18%;min-height: 20px;' id='DivGrossPayableCGST" + d.FeeId + "'>" + ' ' + "</div><div class='FeeHeadValue' style='width: 32%;' id='DivConcessionCGST" + d.FeeId + "'>" + 'SGST @9% ' + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivPaidCGST" + d.FeeId + "'>" + SGSTAmount.toFixed(2) + "</div></li></ul>"));

                                $("#DivFeeDetailCGST").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 32%;min-height: 20px;' id='DivFeeNameCGST" + d.FeeId + "'>" + ' ' + "</div><div class='FeeHeadValue' style='width: 18%;min-height: 20px;' id='DivGrossPayableCGST" + d.FeeId + "'>" + ' ' + "</div><div class='FeeHeadValue' style='width: 32%;' id='DivConcessionCGST" + d.FeeId + "'>" + 'CGST @9% ' + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivPaidCGST" + d.FeeId + "'>" + CGSTAmount.toFixed(2) + "</div></li></ul>"));


                            });

                            debugger
                            $.each(b.feeTotalList, function (c, d) {
                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }


                                $('#DivPaidTGST').html(d.Paid);

                                $('#DivPaidTCGST').html(d.Paid);
                            });

                            $.each(b.feeSlipList, function (g, h) {
                                debugger

                                if (BranchId == 55 || BranchId == 141 || BranchId == 1172 || BranchId == 129) {
                                    $('#DivBatchNoGST').text('2022-2023');
                                    $('#DivBatchNoCGST').text('2022-2023');
                                }
                                else {
                                    $('#DivBatchNoGST').text(h.Session);
                                    $('#DivBatchNoCGST').text(h.Session);
                                }
                                $('#DivAffilationNoGST').text(h.AffilationIdBy);
                                $('#DivAffilationNoCGST').text(h.AffilationIdBy);

                                $('#DivSchoolNameGST').html(h.BranchName);
                                $('#DivSchoolNameCGST').html(h.BranchName);

                                $('#DivSchoolLogoGST img').attr('src', h.BranchLogo);
                                $('#DivSchoolLogoCGST img').attr('src', h.BranchLogo);

                                $('#DivSchoolAddressGST').html(h.BranchAddressLine1);
                                $('#DivSchoolAddressCGST').html(h.BranchAddressLine1);

                                $('#DivFeeReceiptGST').text("Rec. No: " + RecNo);
                                $('#DivFeeReceiptCGST').text("Rec. No: " + RecNo);

                                $('#DivFeeClassGST').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#DivFeeClassCGST').text("Class: " + h.ClassMasterName + "-" + h.SectionName);

                                $('#DivFeeDateGST').text(h.PaidDate);
                                $('#DivFeeDateCGST').text(h.PaidDate);

                                $('#lblRegNoGST').text(h.StudentId);
                                $('#lblRegNoCGST').text(h.StudentId);

                                if (BranchId == 1311) {
                                    $("#DivAdmNoGST").hide();

                                    $("#DivAdmNoCGST").hide();
                                }
                                else {
                                    $('#lblAdmNoGST').text(h.AdmissionNumber);
                                    $('#lblAdmNoCGST').text(h.AdmissionNumber);
                                }

                                $('#lblStudentNameGST').text(h.StudentName);
                                $('#lblStudentNameCGST').text(h.StudentName);

                                if (h.FatherName == "") {
                                    $('#lblfmdetailGST').text("Mother :");
                                    $('#lblFatherNameGST').text(h.MotherName);

                                    $('#lblfmdetailCGST').text("Mother :");
                                    $('#lblFatherNameCGST').text(h.MotherName);

                                }
                                else if (h.MotherName == "") {
                                    $('#lblfmdetailGST').text("Father :");
                                    $('#lblFatherNameGST').text(h.FatherName);

                                    $('#lblfmdetailCGST').text("Father :");
                                    $('#lblFatherNameCGST').text(h.FatherName);

                                }
                                else {
                                    $('#lblfmdetailGST').text("Father/Mother :");
                                    $('#lblFatherNameGST').text(h.FatherName + "/" + h.MotherName);

                                    $('#lblfmdetailCGST').text("Father/Mother :");
                                    $('#lblFatherNameCGST').text(h.FatherName + "/" + h.MotherName);

                                }

                                //$('#lblMobileNoGST').text(h.MobileNo1);
                                //$('#lblMobileNoCGST').text(h.MobileNo1);

                                //if (h.RouteName == "") {
                                //    $("#divRouteGST").hide();
                                //    $("#divRouteCGST").hide();

                                //    $('#divAddressGST').show();
                                //    $('#lblAddressGST').text(h.AddressLine1);

                                //    $('#divAddressCGST').show();
                                //    $('#lblAddressCGST').text(h.AddressLine1);
                                //}
                                //else if (BranchId == 1239) {
                                //    $("#divRouteGST").hide();
                                //    $("#divRouteCGST").hide();

                                //    $('#divAddressWD').hide();
                                //    $('#divAddressCWD').hide();
                                //}
                                //else {
                                //    $("#divRouteGST").show();
                                //    $('#lblRouteGST').text(h.RouteName);

                                //    $("#divRouteCGST").show();
                                //    $('#lblRouteCGST').text(h.RouteName);

                                //    $('#divAddressGST').hide();
                                //    $('#divAddressCGST').hide();
                                //}



                                //if (h.DOB == "") {
                                //    $("#divDobGST").hide();
                                //    $("#divDobCGST").hide();
                                //}
                                //else if (BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1276 || BranchId == 1311 || BranchId == 1289) {
                                //    $("#divDobGST").hide();
                                //    $("#divDobCGST").hide();
                                //}
                                //else {
                                //    $("#divDobGST").show();
                                //    $("#lblDobGST").text(h.DOB);

                                //    $("#divDobCGST").show();
                                //    $("#lblDobCGST").text(h.DOB);
                                //}




                                if (BranchId == 166 || BranchId == 130) {
                                    $("#divMonthsGST").hide();
                                    $("#divMonthsCGST").hide();

                                }
                                else {
                                    $("#divMonthsGST").show();
                                    $('#lblMonthsGST').text(h.ConcessionName);

                                    $("#divMonthsCGST").show();
                                    $('#lblMonthsCGST').text(h.ConcessionName);
                                }


                                //if (BranchId == 166 || BranchId == 130 || BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1276) {
                                //    $("#divConcesionGST").hide();
                                //    $("#divConcesionCGST").hide();

                                //}
                                //else {
                                //    $("#divConcesionGST").show();
                                //    $('#lblConcessionNameGST').text(h.ConcessionName);

                                //    $("#divConcesionCGST").show();
                                //    $('#lblConcessionNameCGST').text(h.ConcessionName);
                                //}

                                $('#lblRsWordGST').text(data.responseMessage);
                                $('#lblRsWordCGST').text(data.responseMessage);

                                $('#lblPaymentModeGST').text(h.PaymentMode);
                                $('#lblPaymentModeCGST').text(h.PaymentMode);

                                //if (h.Remarks == "") {
                                //    $("#DivRemarksGST").hide();
                                //    $("#DivRemarksCGST").hide();

                                //} else {
                                //    $("#DivRemarksGST").show();
                                //    $('#lblRemarksGST').text(h.Remarks);

                                //    $("#DivRemarksCGST").show();
                                //    $('#lblRemarksCGST').text(h.Remarks);
                                //}


                                //if (h.ChequeDDCardNo == "") {
                                //    $("#DivChequeNoGST").hide();
                                //    $("#DivChequeNoCGST").hide();

                                //} else {
                                //    $("#DivChequeNoGST").show();
                                //    $('#lblChequeNoGST').text(h.ChequeDDCardNo);

                                //    $("#DivChequeNoCGST").show();
                                //    $('#lblChequeNoCGST').text(h.ChequeDDCardNo);
                                //}


                                //if (h.BankName == "") {
                                //    $("#DivBankNameGST").hide();
                                //    $("#DivBankNameCGST").hide();

                                //} else {
                                //    $("#DivBankNameGST").show();
                                //    $('#lblBankNameGST').text(h.BankName);

                                //    $("#DivBankNameCGST").show();
                                //    $('#lblBankNameCGST').text(h.BankName);
                                //}

                                //if (h.ChequeDate == "") {
                                //    $("#DivChequeDateGST").hide();
                                //    $("#DivChequeDateCGST").hide();

                                //} else {
                                //    $("#DivChequeDateGST").show();
                                //    $('#lblChequeDateGST').text(h.ChequeDate);

                                //    $("#DivChequeDateCGST").show();
                                //    $('#lblChequeDateCGST').text(h.ChequeDate);
                                //}
                            });

                            $('#btnPrintReceiptGST').unbind('click');
                            $('#btnPrintReceiptGST').click(function () {
                                debugger
                                PrintRegFeeSlipGST();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }


                            });

                            $('#btnCancelPrinReceiptGST').unbind('click');
                            $('#btnCancelPrinReceiptGST').click(function () {
                                debugger
                                $("#divPrintRegFeeSlipGST").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                            $('#btnCancelPrinReceipt1GST').unbind('click');
                            $('#btnCancelPrinReceipt1GST').click(function () {
                                debugger
                                $("#divPrintRegFeeSlipGST").slideUp();
                            });

                            $('#ClosePrintSlipPopUpGST').unbind('click');
                            $('#ClosePrintSlipPopUpGST').click(function () {
                                $("#divPrintRegFeeSlipGST").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                            $('#ClosePrintSlipPopUp1GST').unbind('click');
                            $('#ClosePrintSlipPopUp1GST').click(function () {
                                debugger
                                $("#divPrintRegFeeSlipGST").slideUp();
                            });

                        });

                    }
                    else {
                        $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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

function getFeeSlipSDS(RecNo, BranchId, Stid, RMon) {
    debugger

    var BO = {
        "objFeeSlipBO": {
            "Action": "getfeeslip",
            "BranchId": BranchId,
            "Receiptno": RecNo,
            "StudentId": Stid
        }
    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetFeeSlip",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {
            debugger
            $("#divPrintRegFeeSlipSDS").slideDown();

            debugger
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $("#DivFeeDetailSDS").empty();
                        $("#DivFeeDetailCSDS").empty();

                        if (BranchId == 166 || BranchId == 1432) {
                            $('#SchoolCopySDS').hide();
                        }
                        else {
                            $('#CollegeCopySDS').hide();
                        }


                        $.each(data.responseObject, function (a, b) {
                            debugger
                            $.each(b.feeDetailsList, function (c, d) {

                                debugger

                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }

                                $("#DivFeeDetailSDS").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeNameSDS" + d.FeeId + "'>" + d.FeeName + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivGrossPayableSDS" + d.FeeId + "'>" + d.GrossPayable + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivConcessionSDS" + d.FeeId + "'>" + Concession + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivPaidSDS" + d.FeeId + "'>" + d.Paid + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivBalanceSDS" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));

                                $("#DivFeeDetailCSDS").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeNameCSDS" + d.FeeId + "'>" + d.FeeName + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivGrossPayableCSDS" + d.FeeId + "'>" + d.GrossPayable + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivConcessionCSDS" + d.FeeId + "'>" + Concession + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivPaidCSDS" + d.FeeId + "'>" + d.Paid + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivBalanceCSDS" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));



                            });

                            debugger
                            $.each(b.feeTotalList, function (c, d) {
                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }


                                $('#DivGrossPayableTSDS').html(d.GrossPayable);
                                $('#DivConcessionTSDS').html(Concession);
                                $('#DivPaidTSDS').html(d.Paid);
                                $('#DivBalanceTSDS').html(d.Balance);

                                $('#DivGrossPayableCTSDS').html(d.GrossPayable);
                                $('#DivConcessionCTSDS').html(Concession);
                                $('#DivPaidCTSDS').html(d.Paid);
                                $('#DivBalanceCTSDS').html(d.Balance);
                            });

                            $.each(b.feeSlipList, function (g, h) {
                                debugger


                                $('#DivBatchNoSDS').text(h.Session);
                                $('#DivBatchNoCSDS').text(h.Session);

                                $('#DivAffilationNoSDS').text(h.AffilationIdBy);
                                $('#DivAffilationNoCSDS').text(h.AffilationIdBy);

                                $('#DivSchoolNameSDS').html(h.BranchName);
                                $('#DivSchoolNameCSDS').html(h.BranchName);

                                $('#DivSchoolLogoSDS img').attr('src', h.BranchLogo);
                                $('#DivSchoolLogoCSDS img').attr('src', h.BranchLogo);

                                $('#DivSchoolAddressSDS').html(h.BranchAddressLine1);
                                $('#DivSchoolAddressCSDS').html(h.BranchAddressLine1);

                                $('#DivFeeReceiptSDS').text("Fee Receipt No.: " + RecNo);
                                $('#DivFeeReceiptCSDS').text("Fee Receipt No.: " + RecNo);

                                $('#lblClassSDS').text(h.ClassMasterName + "-" + h.SectionName);
                                $('#lblClassCSDS').text(h.ClassMasterName + "-" + h.SectionName);

                                $('#lblRollNoSDS').text(h.RollNo);
                                $('#lblRollNoCSDS').text(h.RollNo);

                                $('#DivFeeDateSDS').text(h.PaidDate);
                                $('#DivFeeDateCSDS').text(h.PaidDate);

                                $('#lblRegNoSDS').text(h.StudentId);
                                $('#lblRegNoCSDS').text(h.StudentId);

                                $('#lblAdmNoSDS').text(h.AdmissionNumber);
                                $('#lblAdmNoCSDS').text(h.AdmissionNumber);


                                $('#lblStudentNameSDS').text(h.StudentName);
                                $('#lblStudentNameCSDS').text(h.StudentName);



                                $('#lblFatherNameSDS').text(h.FatherName);
                                $('#lblFatherNameCSDS').text(h.FatherName);

                                $('#lblMobileNoSDS').text(h.MobileNo1);
                                $('#lblMobileNoCSDS').text(h.MobileNo1);

                                $('#lblMonthsSDS').text(h.Months);
                                $('#lblMonthsCSDS').text(h.Months);

                                $('#lblRsWordSDS').text(data.responseMessage);
                                $('#lblRsWordCSDS').text(data.responseMessage);

                                $('#lblPaymentModeSDS').text(h.PaymentMode);
                                $('#lblPaymentModeCSDS').text(h.PaymentMode);

                                if (h.Remarks == "") {
                                    $("#DivRemarksSDS").hide();
                                    $("#DivRemarksCSDS").hide();

                                } else {
                                    $("#DivRemarksSDS").show();
                                    $('#lblRemarksSDS').text(h.Remarks);

                                    $("#DivRemarksCSDS").show();
                                    $('#lblRemarksCSDS').text(h.Remarks);
                                }


                                if (h.ChequeDDCardNo == "") {
                                    $("#DivChequeNoSDS").hide();
                                    $("#DivChequeNoCSDS").hide();

                                } else {
                                    $("#DivChequeNoSDS").show();
                                    $('#lblChequeNoSDS').text(h.ChequeDDCardNo);

                                    $("#DivChequeNoCSDS").show();
                                    $('#lblChequeNoCSDS').text(h.ChequeDDCardNo);
                                }


                                if (h.BankName == "") {
                                    $("#DivBankNameSDS").hide();
                                    $("#DivBankNameCSDS").hide();

                                } else {
                                    $("#DivBankNameSDS").show();
                                    $('#lblBankNameSDS').text(h.BankName);

                                    $("#DivBankNameCSDS").show();
                                    $('#lblBankNameCSDS').text(h.BankName);
                                }

                                if (h.ChequeDate == "") {
                                    $("#DivChequeDateSDS").hide();
                                    $("#DivChequeDateCSDS").hide();

                                } else {
                                    $("#DivChequeDateSDS").show();
                                    $('#lblChequeDateSDS').text(h.ChequeDate);

                                    $("#DivChequeDateCSDS").show();
                                    $('#lblChequeDateCSDS').text(h.ChequeDate);
                                }

                            });

                            $('#btnPrintReceiptSDS').unbind('click');
                            $('#btnPrintReceiptSDS').click(function () {
                                debugger
                                PrintRegFeeSlipSDS();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }


                            });

                            $('#btnCancelPrinReceiptSDS').unbind('click');
                            $('#btnCancelPrinReceiptSDS').click(function () {
                                debugger
                                $("#divPrintRegFeeSlipSDS").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                            $('#btnCancelPrinReceipt1SDS').unbind('click');
                            $('#btnCancelPrinReceipt1SDS').click(function () {
                                debugger
                                $("#divPrintRegFeeSlipSDS").slideUp();
                            });

                            $('#ClosePrintSlipPopUpSDS').unbind('click');
                            $('#ClosePrintSlipPopUpSDS').click(function () {
                                $("#divPrintRegFeeSlipSDS").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                            $('#ClosePrintSlipPopUp1SDS').unbind('click');
                            $('#ClosePrintSlipPopUp1SDS').click(function () {
                                debugger
                                $("#divPrintRegFeeSlipSDS").slideUp();
                            });

                        });

                    }
                    else {
                        $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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


//................himanshu.............................

function getSingleSmall2(RecNo, BranchId, Stid, RMon) {
    debugger

    var BO = {
        "objFeeSlipBO": {
            "Action": "getfeeslip",
            "BranchId": BranchId,
            "Receiptno": RecNo,
            "StudentId": Stid
        }
    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetFeeSlip",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {
            debugger
            $("#divPrintSingleSmall2").slideDown();

            debugger
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $("#DivFeeDetailSingleSmall").empty();
                        $("#DivFeeDetailCSingleSmall").empty();


                        if (BranchId == 1259 || BranchId == 1260 || BranchId == 1276) {
                            $('#SchoolCopySingleSmall').hide();
                        }
                        else {
                            $('#CollegeCopySingleSmall').hide();
                        }


                        $.each(data.responseObject, function (a, b) {
                            debugger
                            $.each(b.feeDetailsList, function (c, d) {
                                debugger

                                $('#DivPaidFeeSingleSmall').html(d.Paid);
                                $('#lblRegNoSingleSmall').text(d.StudentId);

                                debugger

                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }


                                $("#DivFeeDetailCSingleSmall").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeNameC" + d.FeeId + "'>" + d.FeeName + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivGrossPayableC" + d.FeeId + "'>" + d.GrossPayable + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivConcessionC" + d.FeeId + "'>" + Concession + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivPaidC" + d.FeeId + "'>" + d.Paid + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivBalanceC" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));

                                $("#DivFeeDetailSingleSmall").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeName" + d.FeeId + "'>" + d.FeeName + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivGrossPayable" + d.FeeId + "'>" + d.GrossPayable + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivConcession" + d.FeeId + "'>" + Concession + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivPaid" + d.FeeId + "'>" + d.Paid + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivBalance" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));
                            });

                            debugger
                            $.each(b.feeTotalList, function (c, d) {
                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }

                                $('#DivGrossPayabletSingleSmall').html(d.GrossPayable);
                                $('#DivConcessiontSingleSmall').html(Concession);
                                $('#DivPaidtSingleSmall').html(d.Paid);
                                $('#DivBalancetSingleSmall').html(d.Balance);

                                $('#DivGrossPayabletCSingleSmall').html(d.GrossPayable);
                                $('#DivConcessiontCSingleSmall').html(Concession);
                                $('#DivPaidtCSingleSmall').html(d.Paid);
                                $('#DivBalancetCSingleSmall').html(d.Balance);
                            });

                            $.each(b.feeSlipList, function (g, h) {
                                debugger

                                //console.log(feeSlipList)
                                //$('#DivBatchNo').html(h.Session);
                                if (BranchId == 55 || BranchId == 141 || BranchId == 1172 || BranchId == 129) {
                                    $('#DivBatchNoSingleSmall').text('2022-2023');

                                }
                                else {
                                    $('#DivBatchNoSingleSmall').text(h.Session);
                                    $('#DivBatchNSingleSmall').text(h.Session);
                                }
                                $('#DivAffilationNoSingleSmall').text(h.AffilationIdBy);
                                $('#DivSchoolNameSingleSmall').html(h.BranchName);

                                $('#DivSchoolLogoSingleSmall img').attr('src', h.BranchLogo);
                                $('#DivSchoolLogo2SingleSmall img').attr('src', h.BranchLogo);
                                $('#DivSchoolAddressSingleSmall').html(h.BranchAddressLine1);
                                $('#DivFeeReceiptSingleSmall').text("Rec. No: " + RecNo);
                                $('#DivFeeClassSingleSmall').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#DivFeeSectionSingleSmall').text(h.SectionName);
                                $('#DivFeeDateSingleSmall').text(h.PaidDate);
                                $('#lblRegNoSingleSmall').text(h.StudentId);




                                if (BranchId == 1311) {
                                    $("#2divadmno_3SingleSmall").hide();

                                }
                                else {
                                    $('#2lblAdmNo_3SingleSmall').text(h.AdmissionNumber);

                                }

                                if (BranchId == 1311) {
                                    $("#2divAdmnoC_3SingleSmall").hide();

                                }
                                else {
                                    $('#2lblAdmNoC_3SingleSmall').text(h.AdmissionNumber);
                                }
                                debugger
                                if (h.AdmissionNumber == "") {
                                    $("#2divadmno_3SingleSmall").hide();

                                }
                                $('#lblStudentNameSingleSmall').text(h.StudentName);

                                if (h.FatherName == "") {
                                    $('#lblfmdetailSingleSmall').text("Mother :");
                                    $('#lblFatherNameSingleSmall').text(h.MotherName);

                                }
                                else if (h.MotherName == "") {
                                    $('#lblfmdetailSingleSmall').text("Father :");
                                    $('#lblFatherNameSingleSmall').text(h.FatherName);

                                }
                                else {
                                    $('#lblfmdetailSingleSmall').text("Father/Mother :");
                                    $('#lblFatherNameSingleSmall').text(h.FatherName + "/" + h.MotherName);

                                }



                                $('#lblMobileNoSingleSmall').text(h.MobileNo1);
                                //$('#lblAddress').text(h.AddressLine1 + "," + h.MobileNo1);
                                $('#lblMonthsSingleSmall').text(h.Months);
                                $('#DivPaidtypeSingleSmall').html(h.PaymentMode);
                                $('#lblRsWordSingleSmall').text(data.responseMessage);
                                if (h.DOB == "") {
                                    $("#divDobSingleSmall").hide();
                                }
                                else if (BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1276 || BranchId == 1311 || BranchId == 1289) {
                                    $("#divDobSingleSmall").hide();


                                }
                                else {
                                    $("#divDobSingleSmall").show();
                                    $("#lblDobSingleSmall").text(h.DOB);

                                }

                                //honey
                                if (h.RouteName == "") {
                                    $("#divRouteSingleSmall").hide();
                                    $('#divAddressSingleSmall').show();
                                    $('#lblAddressSingleSmall').text(h.AddressLine1);

                                }
                                else if (BranchId == 1239) {
                                    $("#divRouteSingleSmall").hide();
                                    $('#divAddressSingleSmall').hide();


                                }
                                else {
                                    $("#divRouteSingleSmall").show();
                                    $('#divAddressSingleSmall').hide();
                                    $('#lblRouteSingleSmall').text(h.RouteName);

                                }

                                //$('#DivBatchNoC').html(h.Session);
                                if (BranchId == 55 || BranchId == 141 || BranchId == 1172 || BranchId == 129) {
                                    $('#DivBatchNoCSingleSmall').text('2022-2023');

                                }
                                else {
                                    $('#DivBatchNoCSingleSmall').text(h.Session);
                                    $('#DivBatchNoCSingleSmall').text(h.Session);
                                }
                                $('#DivAffilationNoCSingleSmall').text(h.AffilationIdBy);
                                $('#DivSchoolNameCSingleSmall').html(h.BranchName);
                                $('#DivSchoolAddressCSingleSmall').html(h.BranchAddressLine1);
                                $('#lblAddressLine2SingleSmall').text(h.BranchAddressLine2);
                                $('#lblAddressLine3SingleSmall').text(h.BranchAddressLine3);
                                $('#DivFeeReceiptCSingleSmall').text("Rec. No: " + RecNo);
                                $('#DivFeeClassCSingleSmall').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#DivFeeSectionCSingleSmall').text(h.SectionName);
                                $('#DivFeeDateCSingleSmall').text(h.PaidDate);
                                $('#lblRegNoCSingleSmall').text(h.StudentId);
                                $('#lblStudentNameCSingleSmall').text(h.StudentName);





                                if (h.FatherName == "") {
                                    $('#lblfmdetailCSingleSmall').text("Mother :");
                                    $('#lblFatherNameCSingleSmall').text(h.MotherName);

                                }
                                else if (h.MotherName == "") {
                                    $('#lblfmdetailCSingleSmall').text("Father :");
                                    $('#lblFatherNameCSingleSmall').text(h.FatherName);

                                }
                                else {
                                    $('#lblfmdetailCSingleSmall').text("Father/Mother :");
                                    $('#lblFatherNameCSingleSmall').text(h.FatherName + "/" + h.MotherName);

                                }

                                $('#lblMobileNoCSingleSmall').text(h.MobileNo1);
                                //$('#lblAddressC').text(h.AddressLine1 + "," + h.MobileNo1);
                                $('#lblMonthsCSingleSmall').text(h.Months);
                                $('#DivPaidtypeCSingleSmall').html(h.PaymentMode);
                                $('#lblConcessionNameSingleSmall').text(h.ConcessionName);
                                if (BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1276) {
                                    $("#divConcesionCSingleSmall").hide();

                                }
                                else {
                                    $('#lblConcessionNameCSingleSmall').text(h.ConcessionName);
                                }





                                $('#lblRsWordCSingleSmall').text(data.responseMessage);

                                $('#lblPaymentModeSchoolSingleSmall').text(h.PaymentMode);
                                $('#lblPaymentModeStudentSingleSmall').text(h.PaymentMode);

                                if (h.DOB == "") {
                                    $("#divDobCSingleSmall").hide();
                                }
                                else if (BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1276 || BranchId == 1311) {
                                    $("#divDobCSingleSmall").hide();


                                }
                                else {
                                    $("#divDobCSingleSmall").show();
                                    $("#lblDobCSingleSmall").text(h.DOB);

                                }
                                //honey
                                //debugger
                                if (h.RouteName == "") {
                                    $("#divRouteCSingleSmall").hide();
                                    $('#divAddressCSingleSmall').show();
                                    $('#lblAddressCSingleSmall').text(h.AddressLine1);
                                }
                                else if (BranchId == 1239) {
                                    $("#divRouteCSingleSmall").hide();
                                    $('#divAddressCSingleSmall').hide();


                                }
                                else {
                                    $("#divRouteCSingleSmall").show();
                                    $('#divAddressCSingleSmall').hide();
                                    $('#lblRouteCSingleSmall').text(h.RouteName);

                                }

                                //This is Done By Honey
                                if (h.Remarks == "") {
                                    $("#DivRemarksSingleSmall").hide();

                                } else {
                                    $("#DivRemarksSingleSmall").show();
                                    $('#lblRemarkSchoolSingleSmall').text(h.Remarks);
                                }
                                $("#DivRemarksCSingleSmall").hide();

                                if (h.ChequeDDCardNo == "") {
                                    $("#DivChequeNoSingleSmall").hide();
                                    $("#DivChequeNoStudentSingleSmall").hide();

                                } else {
                                    $("#DivChequeNoSingleSmall").show();
                                    $("#DivChequeNoStudentSingleSmall").show();
                                    $('#lblChequeNoSingleSmall').text(h.ChequeDDCardNo);
                                    $('#lblChequeNoStudentSingleSmall').text(h.ChequeDDCardNo);

                                }


                                if (h.BankName == "") {
                                    $("#DivBankNameSingleSmall").hide();
                                    $("#DivBankNameStudentSingleSmall").hide();

                                } else {
                                    $("#DivBankNameSingleSmall").show();
                                    $("#DivBankNameStudentSingleSmall").show();
                                    $('#lblBankNameSingleSmall').text(h.BankName);
                                    $('#lblBankNameStudentSingleSmall').text(h.BankName);

                                }

                                if (h.ChequeDate == "") {
                                    $("#DivChequeDateSingleSmall").hide();
                                    $("#DivChequeDateStudentSingleSmall").hide();

                                } else {
                                    $("#DivChequeDateSingleSmall").show();
                                    $("#DivChequeDateStudentSingleSmall").show();
                                    $('#lblChequeDateSingleSmall').text(h.ChequeDate);
                                    $('#lblChequeDateStudentSingleSmall').text(h.ChequeDate);

                                }
                            });

                            $('#btnPrintReceiptSingleSmall').unbind('click');
                            $('#btnPrintReceiptSingleSmall').click(function () {
                                debugger
                                PrintRegFeeSlipSingleSmall();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }


                            });

                            $('#btnCancelPrinReceiptSingleSmall').unbind('click');
                            $('#btnCancelPrinReceiptSingleSmall').click(function () {
                                debugger
                                $("#divPrintSingleSmall2").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                            $('#btnCancelPrinReceipt1SingleSmall').unbind('click');
                            $('#btnCancelPrinReceipt1SingleSmall').click(function () {
                                $("#divPrintSingleSmall2").slideUp();
                            });

                            $('#ClosePrintSlipPopUp').unbind('click');
                            $('#ClosePrintSlipPopUp').click(function () {
                                $("#divPrintSingleSmall2").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                        });

                    }
                    else {
                        $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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

function getNewSingleSmall2(RecNo, BranchId, Stid, RMon) {
    debugger

    var BO = {
        "objFeeSlipBO": {
            "Action": "getfeeslip",
            "BranchId": BranchId,
            "Receiptno": RecNo,
            "StudentId": Stid
        }
    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetFeeSlip",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {
            debugger
            $("#divPrintSingleSmall2").slideDown();

            debugger
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $("#DivFeeDetailSingleSmall").empty();
                        $("#DivFeeDetailCSingleSmall").empty();


                        if (BranchId == 1259 || BranchId == 1260 || BranchId == 1276) {
                            $('#SchoolCopySingleSmall').hide();
                        }
                        else {
                            $('#CollegeCopySingleSmall').hide();
                        }


                        $.each(data.responseObject, function (a, b) {
                            debugger
                            $.each(b.feeDetailsList, function (c, d) {
                                debugger

                                $('#DivPaidFeeSingleSmall').html(d.Paid);
                                $('#lblRegNoSingleSmall').text(d.StudentId);

                                debugger

                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }


                                $("#DivFeeDetailCSingleSmall").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeNameC" + d.FeeId + "'>" + d.FeeName + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivGrossPayableC" + d.FeeId + "'>" + d.GrossPayable + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivConcessionC" + d.FeeId + "'>" + Concession + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivPaidC" + d.FeeId + "'>" + d.Paid + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivBalanceC" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));

                                $("#DivFeeDetailSingleSmall").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeName" + d.FeeId + "'>" + d.FeeName + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivGrossPayable" + d.FeeId + "'>" + d.GrossPayable + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivConcession" + d.FeeId + "'>" + Concession + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivPaid" + d.FeeId + "'>" + d.Paid + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivBalance" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));
                            });

                            debugger
                            $.each(b.feeTotalList, function (c, d) {
                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }

                                $('#DivGrossPayabletSingleSmall').html(d.GrossPayable);
                                $('#DivConcessiontSingleSmall').html(Concession);
                                $('#DivPaidtSingleSmall').html(d.Paid);
                                $('#DivBalancetSingleSmall').html(d.Balance);

                                $('#DivGrossPayabletCSingleSmall').html(d.GrossPayable);
                                $('#DivConcessiontCSingleSmall').html(Concession);
                                $('#DivPaidtCSingleSmall').html(d.Paid);
                                $('#DivBalancetCSingleSmall').html(d.Balance);
                            });

                            $.each(b.feeSlipList, function (g, h) {
                                debugger
                                //$('#DivBatchNo').html(h.Session);
                                if (BranchId == 55 || BranchId == 141 || BranchId == 1172 || BranchId == 129) {
                                    $('#DivBatchNoSingleSmall').text('2022-2023');

                                }
                                else {
                                    $('#DivBatchNoSingleSmall').text(h.Session);
                                    $('#DivBatchNSingleSmall').text(h.Session);
                                }
                                $('#DivAffilationNoSingleSmall').text(h.AffilationIdBy);
                                $('#DivSchoolNameSingleSmall').html(h.BranchName);

                                $('#DivSchoolLogoSingleSmall img').attr('src', h.BranchLogo);
                                $('#DivSchoolLogo2SingleSmall img').attr('src', h.BranchLogo);
                                $('#DivSchoolAddressSingleSmall').html(h.BranchAddressLine1);
                                $('#DivFeeReceiptSingleSmall').text("Rec. No: " + RecNo);
                                $('#DivFeeClassSingleSmall').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#DivFeeSectionSingleSmall').text(h.SectionName);
                                $('#DivFeeDateSingleSmall').text(h.PaidDate);
                                $('#lblRegNoSingleSmall').text(h.StudentId);

                                $('#2lblAdmNo_3SingleSmall').text(h.AdmissionNumber);
                                $('#2lblAdmNoC_3SingleSmall').text(h.AdmissionNumber);

                                $('#lblStudentNameSingleSmall').text(h.StudentName);


                                if (h.FatherName == "") {
                                    $('#lblfmdetailSingleSmall').text("Mother :");
                                    $('#lblFatherNameSingleSmall').text(h.MotherName);

                                }
                                else if (h.MotherName == "") {
                                    $('#lblfmdetailSingleSmall').text("Father :");
                                    $('#lblFatherNameSingleSmall').text(h.FatherName);

                                }
                                else {
                                    $('#lblfmdetailSingleSmall').text("Father/Mother :");
                                    $('#lblFatherNameSingleSmall').text(h.FatherName + "/" + h.MotherName);

                                }



                                $('#lblMobileNoSingleSmall').text(h.MobileNo1);
                                //$('#lblAddress').text(h.AddressLine1 + "," + h.MobileNo1);
                                $('#lblMonthsSingleSmall').text(h.Months);
                                $('#DivPaidtypeSingleSmall').html(h.PaymentMode);
                                $('#lblRsWordSingleSmall').text(data.responseMessage);
                                if (h.DOB == "") {
                                    $("#divDobSingleSmall").hide();
                                }
                                else if (BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1276) {
                                    $("#divDobSingleSmall").hide();


                                }
                                else {
                                    $("#divDobSingleSmall").show();
                                    $("#lblDobSingleSmall").text(h.DOB);

                                }
                                //debugger
                                //honey
                                if (h.RouteName == "") {
                                    $("#divRouteSingleSmall").hide();
                                    $('#divAddressSingleSmall').show();
                                    $('#lblAddressSingleSmall').text(h.AddressLine1);
                                }
                                else if (BranchId == 1239) {
                                    $("#divRouteSingleSmall").hide();
                                    $('#divAddressSingleSmall').hide();


                                }
                                else {
                                    $("#divRouteSingleSmall").show();
                                    $('#divAddressSingleSmall').hide();
                                    $('#lblRouteSingleSmall').text(h.RouteName);

                                }

                                //$('#DivBatchNoC').html(h.Session);
                                if (BranchId == 55 || BranchId == 141 || BranchId == 1172 || BranchId == 129) {
                                    $('#DivBatchNoCSingleSmall').text('2022-2023');

                                }
                                else {
                                    $('#DivBatchNoCSingleSmall').text(h.Session);
                                    $('#DivBatchNoCSingleSmall').text(h.Session);
                                }
                                $('#DivAffilationNoCSingleSmall').text(h.AffilationIdBy);
                                $('#DivSchoolNameCSingleSmall').html(h.BranchName);
                                $('#DivSchoolAddressCSingleSmall').html(h.BranchAddressLine1);
                                $('#DivFeeReceiptCSingleSmall').text("Rec. No: " + RecNo);
                                $('#DivFeeClassCSingleSmall').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#DivFeeSectionCSingleSmall').text(h.SectionName);
                                $('#DivFeeDateCSingleSmall').text(h.PaidDate);
                                $('#lblRegNoCSingleSmall').text(h.StudentId);
                                $('#lblStudentNameCSingleSmall').text(h.StudentName);

                                if (h.FatherName == "") {
                                    $('#lblfmdetailCSingleSmall').text("Mother :");
                                    $('#lblFatherNameCSingleSmall').text(h.MotherName);

                                }
                                else if (h.MotherName == "") {
                                    $('#lblfmdetailCSingleSmall').text("Father :");
                                    $('#lblFatherNameCSingleSmall').text(h.FatherName);

                                }
                                else {
                                    $('#lblfmdetailCSingleSmall').text("Father/Mother :");
                                    $('#lblFatherNameCSingleSmall').text(h.FatherName + "/" + h.MotherName);

                                }

                                $('#lblMobileNoCSingleSmall').text(h.MobileNo1);
                                //$('#lblAddressC').text(h.AddressLine1 + "," + h.MobileNo1);
                                $('#lblMonthsCSingleSmall').text(h.Months);
                                $('#DivPaidtypeCSingleSmall').html(h.PaymentMode);
                                $('#lblConcessionNameSingleSmall').text(h.ConcessionName);
                                if (BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1276) {
                                    $("#divConcesionCSingleSmall").hide();

                                }
                                else {
                                    $('#lblConcessionNameCSingleSmall').text(h.ConcessionName);
                                }


                                debugger
                                if (h.AdmissionNumber == "") {
                                    $("#2divadmno_3SingleSmall").hide();
                                    //#2lblAdmNo_3SingleSmall
                                    $("#2lblAdmNo_3SingleSmall").hide();
                                }

                                $('#lblRsWordCSingleSmall').text(data.responseMessage);

                                $('#lblPaymentModeSchoolSingleSmall').text(h.PaymentMode);
                                $('#lblPaymentModeStudentSingleSmall').text(h.PaymentMode);

                                if (h.DOB == "") {
                                    $("#divDobCSingleSmall").hide();
                                }
                                else if (BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1276) {
                                    $("#divDobCSingleSmall").hide();


                                }
                                else {
                                    $("#divDobCSingleSmall").show();
                                    $("#lblDobCSingleSmall").text(h.DOB);

                                }
                                //honey
                                //debugger
                                if (h.RouteName == "") {
                                    $("#divRouteCSingleSmall").hide();
                                    $('#divAddressCSingleSmall').show();
                                    $('#lblAddressCSingleSmall').text(h.AddressLine1);
                                }
                                else if (BranchId == 1239) {
                                    $("#divRouteCSingleSmall").hide();
                                    $('#divAddressCSingleSmall').hide();


                                }
                                else {
                                    $("#divRouteCSingleSmall").show();
                                    $('#divAddressCSingleSmall').hide();
                                    $('#lblRouteCSingleSmall').text(h.RouteName);

                                }


                                if (h.Remarks == "") {
                                    $("#DivRemarksSingleSmall").hide();

                                } else {
                                    $("#DivRemarksSingleSmall").show();
                                    $('#lblRemarkSchoolSingleSmall').text(h.Remarks);
                                }

                                if (h.Remarks == "") {
                                    $("#DivRemarksCSingleSmall").hide();

                                } else {
                                    $("#DivRemarksCSingleSmall").show();
                                    $('#lblRemarkSchoolCSingleSmall').text(h.Remarks);
                                }




                                if (h.ChequeDDCardNo == "") {
                                    $("#DivChequeNoSingleSmall").hide();
                                    $("#DivChequeNoStudentSingleSmall").hide();

                                } else {
                                    $("#DivChequeNoSingleSmall").show();
                                    $("#DivChequeNoStudentSingleSmall").show();
                                    $('#lblChequeNoSingleSmall').text(h.ChequeDDCardNo);
                                    $('#lblChequeNoStudentSingleSmall').text(h.ChequeDDCardNo);

                                }


                                if (h.BankName == "") {
                                    $("#DivBankNameSingleSmall").hide();
                                    $("#DivBankNameStudentSingleSmall").hide();

                                } else {
                                    $("#DivBankNameSingleSmall").show();
                                    $("#DivBankNameStudentSingleSmall").show();
                                    $('#lblBankNameSingleSmall').text(h.BankName);
                                    $('#lblBankNameStudentSingleSmall').text(h.BankName);

                                }

                                if (h.ChequeDate == "") {
                                    $("#DivChequeDateSingleSmall").hide();
                                    $("#DivChequeDateStudentSingleSmall").hide();

                                } else {
                                    $("#DivChequeDateSingleSmall").show();
                                    $("#DivChequeDateStudentSingleSmall").show();
                                    $('#lblChequeDateSingleSmall').text(h.ChequeDate);
                                    $('#lblChequeDateStudentSingleSmall').text(h.ChequeDate);

                                }



                            });

                            $('#btnPrintReceiptSingleSmall').unbind('click');
                            $('#btnPrintReceiptSingleSmall').click(function () {

                                PrintRegFeeSlip();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }


                            });

                            $('#btnCancelPrinReceiptSingleSmall').unbind('click');
                            $('#btnCancelPrinReceiptSingleSmall').click(function () {
                                $("#divPrintSingleSmall2").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                            $('#btnCancelPrinReceipt1SingleSmall').unbind('click');
                            $('#btnCancelPrinReceipt1SingleSmall').click(function () {
                                $("#divPrintSingleSmall2").slideUp();
                            });

                            $('#ClosePrintSlipPopUp').unbind('click');
                            $('#ClosePrintSlipPopUp').click(function () {
                                $("#divPrintSingleSmall2").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                        });

                    }
                    else {
                        $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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

//.................himanshu..........................




function getFeeSlipNew(RecNo, BranchId, Stid, RMon) {
    debugger

    var BO = {
        "objFeeSlipBO": {
            "Action": "getfeeslip",
            "BranchId": BranchId,
            "Receiptno": RecNo,
            "StudentId": Stid
        }
    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetFeeSlip",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {
            debugger
            $("#divPrintRegFeeSlip").slideDown();

            debugger
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $("#DivFeeDetail").empty();
                        $("#DivFeeDetailC").empty();


                        if (BranchId == 1259 || BranchId == 1260 || BranchId == 1276) {
                            $('#SchoolCopy').hide();
                        }
                        else {
                            $('#CollegeCopy').hide();
                        }


                        $.each(data.responseObject, function (a, b) {
                            debugger
                            $.each(b.feeDetailsList, function (c, d) {
                                debugger

                                $('#DivPaidFee').html(d.Paid);
                                $('#lblRegNo').text(d.StudentId);

                                debugger

                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }

                                if (SchoolId == 1219 || SchoolId == 57 || SchoolId == 1218 || SchoolId == 1224) {
                                    var Gpwc = d.GrossPayable - Concession
                                    debugger
                                    $("#DivFeeDetailC").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeNameC" + d.FeeId + "'>" + d.FeeName + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivGrossPayableC" + d.FeeId + "'>" + Gpwc + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivConcessionC" + d.FeeId + "'>0 </div><div  class='FeeHeadValue' style='width: 18%;' id='DivPaidC" + d.FeeId + "'>" + d.Paid + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivBalanceC" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));

                                }

                                else {
                                    $("#DivFeeDetailC").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeNameC" + d.FeeId + "'>" + d.FeeName + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivGrossPayableC" + d.FeeId + "'>" + d.GrossPayable + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivConcessionC" + d.FeeId + "'>" + Concession + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivPaidC" + d.FeeId + "'>" + d.Paid + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivBalanceC" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));
                                }
                                $("#DivFeeDetail").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeName" + d.FeeId + "'>" + d.FeeName + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivGrossPayable" + d.FeeId + "'>" + d.GrossPayable + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivConcession" + d.FeeId + "'>" + Concession + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivPaid" + d.FeeId + "'>" + d.Paid + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivBalance" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));
                            });

                            debugger
                            $.each(b.feeTotalList, function (c, d) {
                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }

                                $('#DivGrossPayablet').html(d.GrossPayable);
                                $('#DivConcessiont').html(Concession);
                                $('#DivPaidt').html(d.Paid);
                                $('#DivBalancet').html(d.Balance);


                                if (SchoolId == 1219 || SchoolId == 57 || SchoolId == 1218 || SchoolId == 1224) {
                                    $('#DivGrossPayabletC').html(d.GrossPayable - Concession);
                                    $('#DivConcessiontC').html('0');
                                    $('#DivPaidtC').html(d.Paid);
                                    $('#DivBalancetC').html(d.Balance);
                                }

                                else {
                                    $('#DivGrossPayabletC').html(d.GrossPayable);
                                    $('#DivConcessiontC').html(Concession);
                                    $('#DivPaidtC').html(d.Paid);
                                    $('#DivBalancetC').html(d.Balance);

                                }
                            });

                            $.each(b.feeSlipList, function (g, h) {
                                debugger
                                //$('#DivBatchNo').html(h.Session);
                                if (BranchId == 55 || BranchId == 141 || BranchId == 1172 || BranchId == 129) {
                                    $('#DivBatchNo').text('2022-2023');

                                }
                                else {
                                    $('#DivBatchNo').text(h.Session);
                                    $('#DivBatchN').text(h.Session);
                                }
                                $('#DivAffilationNo').text(h.AffilationIdBy);
                                $('#DivSchoolName').html(h.BranchName);

                                $('#DivSchoolLogo img').attr('src', h.BranchLogo);
                                $('#DivSchoolLogo2 img').attr('src', h.BranchLogo);
                                $('#DivSchoolAddress').html(h.BranchAddressLine1);
                                $('#DivFeeReceipt').text("Rec. No: " + RecNo);
                                $('#DivFeeClass').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#DivFeeSection').text(h.SectionName);
                                $('#DivFeeDate').text(h.PaidDate);
                                $('#lblRegNo').text(h.StudentId);

                                $('#2lblAdmNo_3').text(h.AdmissionNumber);
                                $('#2lblAdmNoC_3').text(h.AdmissionNumber);

                                $('#lblStudentName').text(h.StudentName);

                                if (h.FatherName == "") {
                                    $('#lblfmdetail').text("Mother :");
                                    $('#lblFatherName').text(h.MotherName);

                                }
                                else if (h.MotherName == "") {
                                    $('#lblfmdetail').text("Father :");
                                    $('#lblFatherName').text(h.FatherName);

                                }
                                else {
                                    $('#lblfmdetail').text("Father/Mother :");
                                    $('#lblFatherName').text(h.FatherName + "/" + h.MotherName);

                                }



                                $('#lblMobileNo').text(h.MobileNo1);
                                //$('#lblAddress').text(h.AddressLine1 + "," + h.MobileNo1);
                                $('#lblMonths').text(h.Months);
                                $('#DivPaidtype').html(h.PaymentMode);
                                $('#lblRsWord').text(data.responseMessage);
                                if (h.DOB == "") {
                                    $("#divDob").hide();
                                }
                                else if (BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1276) {
                                    $("#divDob").hide();


                                }
                                else {
                                    $("#divDob").show();
                                    $("#lblDob").text(h.DOB);

                                }
                                debugger
                                //honey
                                if (h.RouteName == "") {
                                    $("#divRoute").hide();
                                    $('#divAddress').show();
                                    $('#lblAddress').text(h.AddressLine1);
                                }
                                else if (BranchId == 1239) {
                                    $("#divRoute").hide();
                                    $('#divAddress').hide();


                                }
                                else {
                                    $("#divRoute").show();
                                    $('#divAddress').hide();
                                    $('#lblRoute').text(h.RouteName);

                                }

                                //$('#DivBatchNoC').html(h.Session);
                                if (BranchId == 55 || BranchId == 141 || BranchId == 1172 || BranchId == 129) {
                                    $('#DivBatchNoC').text('2022-2023');

                                }
                                else {
                                    $('#DivBatchNoC').text(h.Session);
                                    $('#DivBatchNoC').text(h.Session);
                                }
                                $('#DivAffilationNoC').text(h.AffilationIdBy);
                                $('#DivSchoolNameC').html(h.BranchName);
                                $('#DivSchoolAddressC').html(h.BranchAddressLine1);
                                $('#DivFeeReceiptC').text("Rec. No: " + RecNo);
                                $('#DivFeeClassC').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#DivFeeSectionC').text(h.SectionName);
                                $('#DivFeeDateC').text(h.PaidDate);
                                $('#lblRegNoC').text(h.StudentId);
                                $('#lblStudentNameC').text(h.StudentName);

                                if (h.FatherName == "") {
                                    $('#lblfmdetailC').text("Mother :");
                                    $('#lblFatherNameC').text(h.MotherName);

                                }
                                else if (h.MotherName == "") {
                                    $('#lblfmdetailC').text("Father :");
                                    $('#lblFatherNameC').text(h.FatherName);

                                }
                                else {
                                    $('#lblfmdetailC').text("Father/Mother :");
                                    $('#lblFatherNameC').text(h.FatherName + "/" + h.MotherName);

                                }

                                $('#lblMobileNoC').text(h.MobileNo1);
                                //$('#lblAddressC').text(h.AddressLine1 + "," + h.MobileNo1);
                                $('#lblMonthsC').text(h.Months);
                                $('#DivPaidtypeC').html(h.PaymentMode);
                                $('#lblConcessionName').text(h.ConcessionName);
                                if (BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1276 || BranchId == 1546 || BranchId == 1534 || BranchId == 1533) {
                                    $("#divConcesionC").hide();

                                }
                                else {
                                    $('#lblConcessionNameC').text(h.ConcessionName);
                                }





                                $('#lblRsWordC').text(data.responseMessage);

                                $('#lblPaymentModeSchool').text(h.PaymentMode);
                                $('#lblPaymentModeStudent').text(h.PaymentMode);

                                if (h.DOB == "") {
                                    $("#divDobC").hide();
                                }
                                else if (BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1276) {
                                    $("#divDobC").hide();


                                }
                                else {
                                    $("#divDobC").show();
                                    $("#lblDobC").text(h.DOB);

                                }
                                //honey
                                debugger
                                if (h.RouteName == "") {
                                    $("#divRouteC").hide();
                                    $('#divAddressC').show();
                                    $('#lblAddressC').text(h.AddressLine1);
                                }
                                else if (BranchId == 1239) {
                                    $("#divRouteC").hide();
                                    $('#divAddressC').hide();


                                }
                                else {
                                    $("#divRouteC").show();
                                    $('#divAddressC').hide();
                                    $('#lblRouteC').text(h.RouteName);

                                }


                                if (h.Remarks == "") {
                                    $("#DivRemarks").hide();

                                } else {
                                    $("#DivRemarks").show();
                                    $('#lblRemarkSchool').text(h.Remarks);
                                }

                                if (h.Remarks == "") {
                                    $("#DivRemarksC").hide();

                                } else {
                                    $("#DivRemarksC").show();
                                    $('#lblRemarkSchoolC').text(h.Remarks);
                                }




                                if (h.ChequeDDCardNo == "") {
                                    $("#DivChequeNo").hide();
                                    $("#DivChequeNoStudent").hide();

                                } else {
                                    $("#DivChequeNo").show();
                                    $("#DivChequeNoStudent").show();
                                    $('#lblChequeNo').text(h.ChequeDDCardNo);
                                    $('#lblChequeNoStudent').text(h.ChequeDDCardNo);

                                }


                                if (h.BankName == "") {
                                    $("#DivBankName").hide();
                                    $("#DivBankNameStudent").hide();

                                } else {
                                    $("#DivBankName").show();
                                    $("#DivBankNameStudent").show();
                                    $('#lblBankName').text(h.BankName);
                                    $('#lblBankNameStudent').text(h.BankName);

                                }

                                if (h.ChequeDate == "") {
                                    $("#DivChequeDate").hide();
                                    $("#DivChequeDateStudent").hide();

                                } else {
                                    $("#DivChequeDate").show();
                                    $("#DivChequeDateStudent").show();
                                    $('#lblChequeDate').text(h.ChequeDate);
                                    $('#lblChequeDateStudent').text(h.ChequeDate);

                                }



                            });

                            $('#btnPrintReceipt').unbind('click');
                            $('#btnPrintReceipt').click(function () {

                                PrintRegFeeSlip();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }


                            });

                            $('#btnCancelPrinReceipt').unbind('click');
                            $('#btnCancelPrinReceipt').click(function () {
                                $("#divPrintRegFeeSlip").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                            $('#btnCancelPrinReceipt1').unbind('click');
                            $('#btnCancelPrinReceipt1').click(function () {
                                $("#divPrintRegFeeSlip").slideUp();
                            });

                            $('#ClosePrintSlipPopUp').unbind('click');
                            $('#ClosePrintSlipPopUp').click(function () {
                                $("#divPrintRegFeeSlip").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                        });

                    }
                    else {
                        $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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



function getFeeSlipNewSISR(RecNo, BranchId, Stid, RMon) {
    debugger

    var BO = {
        "objFeeSlipBO": {
            "Action": "getfeeslip",
            "BranchId": BranchId,
            "Receiptno": RecNo,
            "StudentId": Stid
        }
    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetFeeSlip",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {
            debugger
            $("#divPrintRegFeeSlip").slideDown();

            debugger
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        debugger
                        $("#DivFeeDetail").empty();
                        $("#DivFeeDetailC").empty();

                        $('.ConHide').hide();

                        $('#StaffNameHide2').show();
                        $('#StaffNameHide').show();
                        if (BranchId == 1259 || BranchId == 1260 || BranchId == 1276) {
                            $('#SchoolCopy').hide();
                        }
                        else {
                            $('#CollegeCopy').hide();
                        }


                        $.each(data.responseObject, function (a, b) {
                            debugger
                            $.each(b.feeDetailsList, function (c, d) {
                                debugger

                                $('#DivPaidFee').html(d.Paid);
                                $('#lblRegNo').text(d.StudentId);

                                debugger

                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }

                                if (SchoolId == 1219 || SchoolId == 57 || SchoolId == 1218 || SchoolId == 1224) {
                                    var Gpwc = d.GrossPayable - Concession
                                    debugger
                                    $("#DivFeeDetailC").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeNameC" + d.FeeId + "'>" + d.FeeName + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivGrossPayableC" + d.FeeId + "'>" + Gpwc + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivConcessionC" + d.FeeId + "'>0 </div><div  class='FeeHeadValue' style='width: 18%;' id='DivPaidC" + d.FeeId + "'>" + d.Paid + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivBalanceC" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));

                                }

                                else {
                                    $("#DivFeeDetailC").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeNameC" + d.FeeId + "'>" + d.FeeName + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivGrossPayableC" + d.FeeId + "'>" + d.GrossPayable + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivConcessionC" + d.FeeId + "'>" + Concession + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivPaidC" + d.FeeId + "'>" + d.Paid + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivBalanceC" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));
                                }
                                $("#DivFeeDetail").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeName" + d.FeeId + "'>" + d.FeeName + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivGrossPayable" + d.FeeId + "'>" + d.GrossPayable + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivConcession" + d.FeeId + "'>" + Concession + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivPaid" + d.FeeId + "'>" + d.Paid + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivBalance" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));
                            });

                            debugger
                            $.each(b.feeTotalList, function (c, d) {
                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }

                                $('#DivGrossPayablet').html(d.GrossPayable);
                                $('#DivConcessiont').html(Concession);
                                $('#DivPaidt').html(d.Paid);
                                $('#DivBalancet').html(d.Balance);


                                if (SchoolId == 1219 || SchoolId == 57 || SchoolId == 1218 || SchoolId == 1224) {
                                    $('#DivGrossPayabletC').html(d.GrossPayable - Concession);
                                    $('#DivConcessiontC').html('0');
                                    $('#DivPaidtC').html(d.Paid);
                                    $('#DivBalancetC').html(d.Balance);
                                }

                                else {
                                    $('#DivGrossPayabletC').html(d.GrossPayable);
                                    $('#DivConcessiontC').html(Concession);
                                    $('#DivPaidtC').html(d.Paid);
                                    $('#DivBalancetC').html(d.Balance);

                                }
                            });

                            $.each(b.feeSlipList, function (g, h) {
                                debugger
                                //$('#DivBatchNo').html(h.Session);
                                if (BranchId == 55 || BranchId == 141 || BranchId == 1172 || BranchId == 129) {
                                    $('#DivBatchNo').text('2022-2023');

                                }
                                else {
                                    $('#DivBatchNo').text(h.Session);
                                    $('#DivBatchN').text(h.Session);
                                }
                                $('#DivAffilationNo').text(h.AffilationIdBy);
                                $('#DivSchoolName').html(h.BranchName);
                                $('#DivStaffNameSISR2').html(h.StaffName);
                                console.log(h.StaffName)
                                $('#DivStaffNameSISR').html(h.StaffName);
                                $('#DivSchoolLogo img').attr('src', h.BranchLogo);
                                $('#DivSchoolLogo2 img').attr('src', h.BranchLogo);
                                $('#DivSchoolAddress').html(h.BranchAddressLine1);
                                $('#DivFeeReceipt').text("Rec. No: " + RecNo);
                                $('#DivFeeClass').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#DivFeeSection').text(h.SectionName);
                                $('#DivFeeDate').text(h.PaidDate);
                                $('#lblRegNo').text(h.StudentId);

                                $('#2lblAdmNo_3').text(h.AdmissionNumber);
                                $('#2lblAdmNoC_3').text(h.AdmissionNumber);

                                $('#lblStudentName').text(h.StudentName);

                                if (h.FatherName == "") {
                                    $('#lblfmdetail').text("Mother :");
                                    $('#lblFatherName').text(h.MotherName);

                                }
                                else if (h.MotherName == "") {
                                    $('#lblfmdetail').text("Father :");
                                    $('#lblFatherName').text(h.FatherName);

                                }
                                else {
                                    $('#lblfmdetail').text("Father/Mother :");
                                    $('#lblFatherName').text(h.FatherName + "/" + h.MotherName);

                                }



                                $('#lblMobileNo').text(h.MobileNo1);
                                //$('#lblAddress').text(h.AddressLine1 + "," + h.MobileNo1);
                                $('#lblMonths').text(h.Months);
                                $('#DivPaidtype').html(h.PaymentMode);
                                $('#lblRsWord').text(data.responseMessage);
                                if (h.DOB == "") {
                                    $("#divDob").hide();
                                }
                                else if (BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1276) {
                                    $("#divDob").hide();


                                }
                                else {
                                    $("#divDob").show();
                                    $("#lblDob").text(h.DOB);

                                }
                                debugger
                                //honey
                                if (h.RouteName == "") {
                                    $("#divRoute").hide();
                                    $('#divAddress').show();
                                    $('#lblAddress').text(h.AddressLine1);
                                }
                                else if (BranchId == 1239) {
                                    $("#divRoute").hide();
                                    $('#divAddress').hide();


                                }

                                else {
                                    $('#lblAddress').text(h.AddressLine1);
                                    $('.hideroute').hide()

                                }

                                //$('#DivBatchNoC').html(h.Session);
                                if (BranchId == 55 || BranchId == 141 || BranchId == 1172 || BranchId == 129) {
                                    $('#DivBatchNoC').text('2022-2023');

                                }
                                else {
                                    $('#DivBatchNoC').text(h.Session);
                                    $('#DivBatchNoC').text(h.Session);
                                }
                                $('#DivAffilationNoC').text(h.AffilationIdBy);
                                $('#DivSchoolNameC').html(h.BranchName);
                                $('#DivSchoolAddressC').html(h.BranchAddressLine1);
                                $('#DivFeeReceiptC').text("Rec. No: " + RecNo);
                                $('#DivFeeClassC').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#DivFeeSectionC').text(h.SectionName);
                                $('#DivFeeDateC').text(h.PaidDate);
                                $('#lblRegNoC').text(h.StudentId);
                                $('#lblStudentNameC').text(h.StudentName);

                                if (h.FatherName == "") {
                                    $('#lblfmdetailC').text("Mother :");
                                    $('#lblFatherNameC').text(h.MotherName);

                                }
                                else if (h.MotherName == "") {
                                    $('#lblfmdetailC').text("Father :");
                                    $('#lblFatherNameC').text(h.FatherName);

                                }
                                else {
                                    $('#lblfmdetailC').text("Father/Mother :");
                                    $('#lblFatherNameC').text(h.FatherName + "/" + h.MotherName);

                                }

                                $('#lblMobileNoC').text(h.MobileNo1);
                                //$('#lblAddressC').text(h.AddressLine1 + "," + h.MobileNo1);
                                $('#lblMonthsC').text(h.Months);
                                $('#DivPaidtypeC').html(h.PaymentMode);
                                $('#lblConcessionName').text(h.ConcessionName);
                                if (BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1276) {
                                    $("#divConcesionC").hide();

                                }
                                else {
                                    $('#lblConcessionNameC').text(h.ConcessionName);
                                }





                                $('#lblRsWordC').text(data.responseMessage);

                                $('#lblPaymentModeSchool').text(h.PaymentMode);
                                $('#lblPaymentModeStudent').text(h.PaymentMode);

                                if (h.DOB == "") {
                                    $("#divDobC").hide();
                                }
                                else if (BranchId == 1239 || BranchId == 1259 || BranchId == 1260 || BranchId == 1267 || BranchId == 1269 || BranchId == 1276) {
                                    $("#divDobC").hide();


                                }
                                else {
                                    $("#divDobC").show();
                                    $("#lblDobC").text(h.DOB);

                                }
                                //honey
                                debugger
                                if (h.RouteName == "") {
                                    $("#divRouteC").hide();
                                    $('#divAddressC').show();
                                    $('#lblAddressC').text(h.AddressLine1);
                                }
                                else if (BranchId == 1239) {
                                    $("#divRouteC").hide();
                                    $('#divAddressC').hide();


                                }
                                else {
                                    $('.hideroute').hide()
                                    $('#lblAddressC').text(h.AddressLine1);
                                }


                                if (h.Remarks == "") {
                                    $("#DivRemarks").hide();

                                } else {
                                    $("#DivRemarks").show();
                                    $('#lblRemarkSchool').text(h.Remarks);
                                }

                                if (h.Remarks == "") {
                                    $("#DivRemarksC").hide();

                                } else {
                                    //$("#DivRemarksC").show();
                                    //$('#lblRemarkSchoolC').text(h.Remarks);
                                    $('.DivRemarksHide').hide();
                                }




                                if (h.ChequeDDCardNo == "") {
                                    $("#DivChequeNo").hide();
                                    $("#DivChequeNoStudent").hide();

                                } else {
                                    $("#DivChequeNo").show();
                                    $("#DivChequeNoStudent").show();
                                    $('#lblChequeNo').text(h.ChequeDDCardNo);
                                    $('#lblChequeNoStudent').text(h.ChequeDDCardNo);

                                }


                                if (h.BankName == "") {
                                    $("#DivBankName").hide();
                                    $("#DivBankNameStudent").hide();

                                } else {
                                    $("#DivBankName").show();
                                    $("#DivBankNameStudent").show();
                                    $('#lblBankName').text(h.BankName);
                                    $('#lblBankNameStudent').text(h.BankName);

                                }

                                if (h.ChequeDate == "") {
                                    $("#DivChequeDate").hide();
                                    $("#DivChequeDateStudent").hide();

                                } else {
                                    $("#DivChequeDate").show();
                                    $("#DivChequeDateStudent").show();
                                    $('#lblChequeDate').text(h.ChequeDate);
                                    $('#lblChequeDateStudent').text(h.ChequeDate);

                                }



                            });

                            $('#btnPrintReceipt').unbind('click');
                            $('#btnPrintReceipt').click(function () {

                                PrintRegFeeSlip();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }


                            });

                            $('#btnCancelPrinReceipt').unbind('click');
                            $('#btnCancelPrinReceipt').click(function () {
                                $("#divPrintRegFeeSlip").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                            $('#btnCancelPrinReceipt1').unbind('click');
                            $('#btnCancelPrinReceipt1').click(function () {
                                $("#divPrintRegFeeSlip").slideUp();
                            });

                            $('#ClosePrintSlipPopUp').unbind('click');
                            $('#ClosePrintSlipPopUp').click(function () {
                                $("#divPrintRegFeeSlip").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                        });

                    }
                    else {
                        $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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


function getFeeSlip_WithOutDiscount(RecNo, BranchId, Stid, RMon) {

    debugger


    var BO = {
        "objFeeSlipBO": {
            "Action": "getfeeslip",
            "BranchId": BranchId,
            "Receiptno": RecNo,
            "StudentId": Stid
        }
    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetFeeSlip",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {

            debugger

            $('#invoice').empty();
            $('#invoice_2').empty();

            var divFeeDetail = "";
            //var dt = "";
            //var count = 1;

            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {


                        $.each(data.responseObject, function (a, b) {
                            $.each(b.feeDetailsList, function (c, d) {

                                $('#DivPaidFee').html(d.Paid);
                                $('#lblRegNo').text(d.StudentId);

                                divFeeDetail += '<tr><td>' + d.FeeName + '</td><td class="right">' + d.NetPayable + '</td><td class="right">' + d.Paid + '</td><td class="right">' + d.Balance + '</td></tr>';


                            });


                            var NetPayable = "";
                            var Paid = "";
                            var Balance = "";
                            var PaidInWord = "";
                            var PaidDate = "";
                            var PaymentMode = "";

                            var Session = "";
                            var AffilationBy = "";
                            var BranchAddress = "";
                            var ReceiptNo = "";
                            var AdmissionNo = "";
                            var StudentName = "";
                            var FatherName = "";
                            var MobileNo = "";
                            var Address = "";
                            var MonthNames = "";
                            var Class = "";
                            var Section = "";
                            var BranchLogo = "";

                            var BankName = "";
                            var ChequeDDCardNo = "";

                            $.each(b.feeTotalList, function (c, d) {

                                NetPayable = d.NetPayable;
                                Paid = d.Paid;
                                Balance = d.Balance;

                            });

                            $.each(b.feeSlipList, function (g, h) {

                                PaidDate = h.PaidDate;
                                PaymentMode = h.PaymentMode;


                                if (BranchId == 55 || BranchId > 141) {
                                    Session = '2022-2023';
                                }
                                else {
                                    Session = h.Session;
                                }

                                AffilationBy = h.AffiliationNo;
                                BranchName = h.BranchName;
                                BranchAddress = h.BranchAddressLine1;
                                ReceiptNo = RecNo;

                                AdmissionNo = h.AdmissionNumber;
                                StudentName = h.StudentName;
                                FatherName = h.FatherName;
                                MobileNo = h.MobileNo1;
                                Address = h.AddressLine1;
                                MonthNames = h.Months;
                                Class = h.ClassMasterName;
                                Section = h.SectionName;

                                BranchLogo = h.BranchLogo;

                                BankName = h.BankName;
                                ChequeDDCardNo = h.ChequeDDCardNo;

                            });

                            PaidInWord = converttoword(parseInt(Paid));

                            var BranchLogoTag = '<img src=' + BranchLogo + ' style="width:10%;float:left" id="ImgLogo">';

                            $("#invoice").append($('<table class="table table-bordered MyTable"><tr class="BGGray"><th class="width50 left bdrnon" colspan="2"><b>Parents Copy</b></th><th class="width50 right bdrnon" colspan="2" ><b>' + Session + '</b></th></tr><tr><th colspan="4">' + BranchLogoTag + '<h1 class="center CRed"><b>' + BranchName + '</b></h1><h1 class="center CBlue"><b>' + BranchAddress + '</b></h1><h1 class="center CBlue"><b>Affiliation No. - </b>&nbsp<b>' + AffilationBy + '</b></h1></th></tr><tr><th colspan="4" class="center"><b>Fee Receipt</b></th></tr><tr><td>Receipt No.</td> <td><b>' + ReceiptNo + '</b></td><td>Deposit Date</td><td><b>' + PaidDate + '</b></td></tr><tr><td colspan="2" >Name</td><td  colspan="2"><b>' + StudentName + '</b></td></tr><tr><td  colspan="2">Class/Section</td><td  colspan="2"><b>' + Class + '-' + Section + '</b></td></tr><tr><td  colspan="2">Father`s Name </td><td  colspan="2"><b>' + FatherName + '</b></td><tr><td  colspan="2">Admission No.</td><td  colspan="2"><b>' + AdmissionNo + '</b></td></tr><tr><td  colspan="2">Mobile No.</td><td  colspan="2"><b>' + MobileNo + '</b></td></tr><tr><td  colspan="2">Fee for the month of</td><td  colspan="2"><b>' + MonthNames + '</b></td></tr><tr class="BGGray"><th><b>FeeName</b></th><th><b>Fee Amt.</b></th><th><b>Paid</b></th><th><b>Bal.</b></th></tr>' +

                                divFeeDetail

                                + '<tr class="BGGray"><td><b>Total Amount</b></td><td class="right"><b>' + NetPayable + '</b></td><td class="right"><b>' + Paid + '</b></td><td class="right"><b>' + Balance + '</b></td></tr><tr><td colspan="2"><b>In Words</b> :&nbsp' + PaidInWord + '&nbspOnly</td><td colspan="2"><b>Payment Mode</b> :&nbsp' + PaymentMode + '</td><tr><td colspan="2"><b>Bank Name</b> :&nbsp' + BankName + '</td><td colspan="2"><b>Cheque/UTIR No.</b> :&nbsp' + ChequeDDCardNo + '</td></tr><tr><td colspan="4" class="right"><br /><br /> <b>Authorised Signature</b></td></tr></table>'));

                            $("#invoice_2").append($('<table class="table table-bordered MyTable"><tr class="BGGray"><th class="width50 left bdrnon" colspan="2"><b>School Copy</b></th><th class="width50 right bdrnon" colspan="2" ><b>' + Session + '</b></th></tr><tr><th colspan="4">' + BranchLogoTag + '<h1 class="center CRed"><b>' + BranchName + '</b></h1><h1 class="center CBlue"><b>' + BranchAddress + '</b></h1><h1 class="center CBlue"><b>Affiliation No. - </b>&nbsp<b>' + AffilationBy + '</b></h1></th></tr><tr><th colspan="4" class="center"><b>Fee Receipt</b></th></tr><tr><td>Receipt No.</td> <td><b>' + ReceiptNo + '</b></td><td>Deposit Date</td><td><b>' + PaidDate + '</b></td></tr><tr><td colspan="2" >Name</td><td  colspan="2"><b>' + StudentName + '</b></td></tr><tr><td  colspan="2">Class/Section</td><td  colspan="2"><b>' + Class + '-' + Section + '</b></td></tr><tr><td  colspan="2">Father`s Name </td><td  colspan="2"><b>' + FatherName + '</b></td><tr><td  colspan="2">Admission No.</td><td  colspan="2"><b>' + AdmissionNo + '</b></td></tr><tr><td  colspan="2">Mobile No.</td><td  colspan="2"><b>' + MobileNo + '</b></td></tr><tr><td  colspan="2">Fee for the month of</td><td  colspan="2"><b>' + MonthNames + '</b></td></tr><tr class="BGGray"><th><b>FeeName</b></th><th><b>Fee Amt.</b></th><th><b>Paid</b></th><th><b>Bal.</b></th></tr>' +

                                divFeeDetail

                                + '<tr class="BGGray"><td><b>Total Amount</b></td><td class="right"><b>' + NetPayable + '</b></td><td class="right"><b>' + Paid + '</b></td><td class="right"><b>' + Balance + '</b></td></tr><tr><td colspan="2"><b>In Words</b> :&nbsp' + PaidInWord + '&nbspOnly</td><td colspan="2"><b>Payment Mode</b> :&nbsp' + PaymentMode + '</td><tr><td colspan="2"><b>Bank Name</b> :&nbsp' + BankName + '</td><td colspan="2"><b>Cheque/UTIR No.</b> :&nbsp' + ChequeDDCardNo + '</td></tr><tr><td colspan="4" class="right"><br /><br /> <b>Authorised Signature</b></td></tr></table>'));


                        });





                        $('#btnPrintFeeSlip').unbind('click');
                        $('#btnPrintFeeSlip').click(function () {

                            var divContents = document.getElementById('PrintInvoice').innerHTML;
                            var a = window.open('', '');
                            a.document.write('<html>');
                            a.document.write('<head>');
                            a.document.write('<title>Fee Receipt</title>');
                            a.document.write('<link href="../Content/Styles/main.css" rel="stylesheet" />');
                            a.document.write('<link href="../Content/Fee/FeeSlip.css" rel="stylesheet" />');

                            a.document.write('</head><body onload="window.print();window.close()">');
                            a.document.write('</body>');
                            a.document.write(divContents);
                            a.document.write('</body></html>');
                            a.document.close();

                        });

                        $("#DivSalarySlip").slideDown();
                    }
                    else {
                        $("#invoice").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#invoice").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#invoice").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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

function getFeeSlipLandscapeBoth(RecNo, BranchId, Stid, RMon) {
    debugger
    var BO = {
        "objFeeSlipBO": {
            "Action": "getfeeslip",
            "BranchId": BranchId,
            "Receiptno": RecNo,
            "StudentId": Stid
        }
    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetFeeSlip",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {
            debugger
            $("#divPrintRegFeeSlipLandscapeBoth").slideDown();

            debugger
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $("#2DivFeeDetail").empty();
                        $("#2DivFeeDetailC").empty();

                        $.each(data.responseObject, function (a, b) {
                            debugger
                            $.each(b.feeDetailsList, function (c, d) {
                                debugger

                                $('#2DivPaidFee').html(d.Paid);
                                $('#2lblRegNo').text(d.StudentId);


                                $("#2DivFeeDetailC").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeNameC" + d.FeeId + "'>" + d.FeeName + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivGrossPayableC" + d.FeeId + "'>" + d.GrossPayable + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivConcessionC" + d.FeeId + "'>" + d.Concession + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivPaidC" + d.FeeId + "'>" + d.Paid + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivBalanceC" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));

                                $("#2DivFeeDetail").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeName" + d.FeeId + "'>" + d.FeeName + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivGrossPayable" + d.FeeId + "'>" + d.GrossPayable + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivConcession" + d.FeeId + "'>" + d.Concession + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivPaid" + d.FeeId + "'>" + d.Paid + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivBalance" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));
                            });
                            $.each(b.feeTotalList, function (c, d) {
                                $('#2DivGrossPayablet').html(d.GrossPayable);
                                $('#2DivConcessiont').html(d.Concession);
                                $('#2DivPaidt').html(d.Paid);
                                $('#2DivBalancet').html(d.Balance);

                                $('#2DivGrossPayabletC').html(d.GrossPayable);
                                $('#2DivConcessiontC').html(d.Concession);
                                $('#2DivPaidtC').html(d.Paid);
                                $('#2DivBalancetC').html(d.Balance);
                            });

                            $.each(b.feeSlipList, function (g, h) {
                                debugger
                                //$('#DivBatchNo').html(h.Session);
                                $('#2DivBatchNo').text(h.Session);
                                $('#2DivAffilationNo').text(h.AffiliationNo);
                                $('#2DivSchoolName').html(h.BranchName);
                                $('#2DivMobileNo').html(h.MobileNo1);
                                $('#2DivMobileNo2').html(h.MobileNo1);
                                $('#2DivSchoolAddress2').html(h.BranchAddressLine2);
                                $('#2DivSchoolAddressC2').html(h.BranchAddressLine2);

                                $('#2DivSchoolLogo img').attr('src', h.BranchLogo);
                                $('#2DivSchoolLogo2 img').attr('src', h.BranchLogo);
                                $('#2DivSchoolAddress').html(h.BranchAddressLine1);
                                $('#2DivFeeReceipt').text("Receiptno: " + RecNo);
                                $('#2DivFeeClass').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#2DivFeeSection').text(h.SectionName);
                                $('#2DivFeeDate').text(h.PaidDate);
                                $('#2lblRegNo').text(h.StudentId);
                                $('#2lblStudentName').text(h.StudentName);
                                $('#2lblFatherName').text(h.FatherName);
                                $('#2lblMobileNo').text(h.MobileNo1);
                                $('#2lblAddress').text(h.AddressLine1);
                                $('#2lblMonths').text(h.Months);
                                $('#2DivPaidtype').html(h.PaymentMode);
                                $('#2lblRsWord').text(data.responseMessage);

                                //$('#DivBatchNoC').html(h.Session);
                                $('#2DivBatchNoC').text(h.Session);
                                $('#2DivAffilationNoC').text(h.AffiliationNo);
                                $('#2DivSchoolNameC').html(h.BranchName);
                                $('#2DivSchoolAddressC').html(h.BranchAddressLine1);
                                $('#2DivFeeReceiptC').text("Receiptno: " + RecNo);
                                $('#2DivFeeClassC').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#2DivFeeSectionC').text(h.SectionName);
                                $('#2DivFeeDateC').text(h.PaidDate);
                                $('#2lblRegNoC').text(h.StudentId);
                                $('#2lblStudentNameC').text(h.StudentName);
                                $('#2lblFatherNameC').text(h.FatherName);
                                $('#2lblMobileNoC').text(h.MobileNo1);
                                $('#2lblAddressC').text(h.AddressLine1);
                                $('#2lblMonthsC').text(h.Months);
                                $('#2DivPaidtypeC').html(h.PaymentMode);
                                $('#2lblRsWordC').text(data.responseMessage);

                                $('#2lblPaymentModeSchool').text(h.PaymentMode);
                                $('#2lblPaymentModeStudent').text(h.PaymentMode);


                                if (h.ChequeDDCardNo == "") {
                                    $("#2DivChequeNo").hide();
                                    $("#2DivChequeNoStudent").hide();

                                } else {
                                    $("#2DivChequeNo").show();
                                    $("#2DivChequeNoStudent").show();
                                    $('#2lblChequeNo').text(h.ChequeDDCardNo);
                                    $('#2lblChequeNoStudent').text(h.ChequeDDCardNo);

                                }


                                if (h.BankName == "") {
                                    $("#2DivBankName").hide();
                                    $("#2DivBankNameStudent").hide();

                                } else {
                                    $("#2DivBankName").show();
                                    $("#2DivBankNameStudent").show();
                                    $('#2lblBankName').text(h.BankName);
                                    $('#2lblBankNameStudent').text(h.BankName);

                                }

                            });

                            $('#2btnPrintReceipt').unbind('click');
                            $('#2btnPrintReceipt').click(function () {

                                PrintRegFeeSlip2();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }


                            });

                            $('#2btnCancelPrinReceipt').unbind('click');
                            $('#2btnCancelPrinReceipt').click(function () {
                                $("#divPrintRegFeeSlipLandscapeBoth").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                            $('#2btnCancelPrinReceipt1').unbind('click');
                            $('#2btnCancelPrinReceipt1').click(function () {
                                $("#divPrintRegFeeSlipLandscapeBoth").slideUp();
                            });

                            $('#2ClosePrintSlipPopUp').unbind('click');
                            $('#2ClosePrintSlipPopUp').click(function () {
                                $("#divPrintRegFeeSlipLandscapeBoth").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                        });

                    }
                    else {
                        $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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

function getFeeSlipLandscapeBoth_3(RecNo, BranchId, Stid, RMon) {
    debugger
    var BO = {
        "objFeeSlipBO": {
            "Action": "getfeeslip",
            "BranchId": BranchId,
            "Receiptno": RecNo,
            "StudentId": Stid
        }
    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetFeeSlip",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {
            debugger
            $("#divPrintRegFeeSlipLandscapeBoth_3").slideDown();

            debugger
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $("#2DivFeeDetail_3").empty();
                        $("#2DivFeeDetailC_3").empty();
                        $("#2DivFeeDetailC_31").empty();
                        $.each(data.responseObject, function (a, b) {
                            debugger
                            $.each(b.feeDetailsList, function (c, d) {
                                debugger

                                $('#2DivPaidFee_3').html(d.Paid);
                                $('#2lblRegNo_3').text(d.StudentId);


                                $("#2DivFeeDetailC_3").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeNameC_3" + d.FeeId + "'>" + d.FeeName + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivGrossPayableC_3" + d.FeeId + "'>" + d.GrossPayable + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivConcessionC_3" + d.FeeId + "'>" + d.Concession + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivPaidC_3" + d.FeeId + "'>" + d.Paid + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivBalanceC_3" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));

                                $("#2DivFeeDetail_3").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeName_3" + d.FeeId + "'>" + d.FeeName + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivGrossPayable_3" + d.FeeId + "'>" + d.GrossPayable + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivConcession_3" + d.FeeId + "'>" + d.Concession + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivPaid_3" + d.FeeId + "'>" + d.Paid + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivBalance_3" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));

                                $("#2DivFeeDetailC_31").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='2DivFeeNameC_31" + d.FeeId + "'>" + d.FeeName + "</div><div class='FeeHeadValue' style='width: 18%;' id='2DivGrossPayableC_31" + d.FeeId + "'>" + d.GrossPayable + "</div><div class='FeeHeadValue' style='width: 18%;' id='2DivConcessionC_31" + d.FeeId + "'>" + d.Concession + "</div><div class='FeeHeadValue' style='width: 18%;' id='2DivPaidC_31" + d.FeeId + "'>" + d.Paid + "</div><div class='FeeHeadValue' style='width: 18%;' id='2DivBalanceC_31" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));
                            });
                            $.each(b.feeTotalList, function (c, d) {
                                $('#2DivGrossPayablet_3').html(d.GrossPayable);
                                $('#2DivConcessiont_3').html(d.Concession);
                                $('#2DivPaidt_3').html(d.Paid);
                                $('#2DivBalancet_3').html(d.Balance);

                                $('#2DivGrossPayabletC_3').html(d.GrossPayable);
                                $('#2DivConcessiontC_3').html(d.Concession);
                                $('#2DivPaidtC_3').html(d.Paid);
                                $('#2DivBalancetC_3').html(d.Balance);

                                $('#2DivGrossPayablet_31').html(d.GrossPayable);
                                $('#2DivConcessiont_31').html(d.Concession);
                                $('#2DivPaidt_31').html(d.Paid);
                                $('#2DivBalancet_31').html(d.Balance);

                                $('#2DivGrossPayabletC_31').html(d.GrossPayable);
                                $('#2DivConcessiontC_31').html(d.Concession);
                                $('#2DivPaidtC_31').html(d.Paid);
                                $('#2DivBalancetC_31').html(d.Balance);
                            });

                            $.each(b.feeSlipList, function (g, h) {
                                debugger
                                //$('#DivBatchNo').html(h.Session);
                                $('#2DivBatchNo_3').text(h.Session);
                                $('#2DivAffilationNo_3').text(h.AffiliationNo);
                                $('#2DivSchoolName_3').html(h.BranchName);
                                $('#2DivMobileNo_3').html(h.MobileNo1);
                                $('#2DivMobileNo2_3').html(h.MobileNo1);
                                $('#2DivMobileNo2_3_1').html(h.MobileNo1);
                                $('#2DivSchoolAddress2_3').html(h.BranchAddressLine2);
                                $('#2DivSchoolAddressC2_3').html(h.BranchAddressLine2);
                                $('#2DivSchoolAddressC2_31').html(h.BranchAddressLine2);
                                $('#2DivSchoolLogo_3 img').attr('src', h.BranchLogo);
                                $('#2DivSchoolLogo2_3 img').attr('src', h.BranchLogo);
                                $('#2DivSchoolLogo2_3_1 img').attr('src', h.BranchLogo);
                                $('#2DivSchoolAddress_3').html(h.BranchAddressLine1);
                                $('#2DivFeeReceipt_3').text("Rpt: " + RecNo);
                                $('#2DivFeeClass_3').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#2DivFeeSection_3').text(h.SectionName);
                                $('#2DivFeeDate_3').text(h.PaidDate);
                                $('#2lblRegNo_3').text(h.StudentId);
                                $('#2lblStudentName_3').text(h.StudentName);
                                $('#2lblFatherName_3').text(h.FatherName);
                                $('#2lblAdmissionNo_3').text(h.AdmissionNumber);
                                $('#2lblMobileNo_3').text(h.MobileNo1);
                                $('#2lblAddress_3').text(h.AddressLine1);
                                $('#2lblMonths_3').text(h.Months);
                                $('#2DivPaidtype_3').html(h.PaymentMode);
                                $('#2lblRsWord_3').text(data.responseMessage);

                                //$('#DivBatchNoC').html(h.Session);
                                $('#2DivBatchNoC_3').text(h.Session);
                                $('#2DivAffilationNoC_3').text(h.AffiliationNo);
                                $('#2DivAffilationNoC_3_1').text(h.AffiliationNo);
                                $('#2DivSchoolNameC_3').html(h.BranchName);
                                $('#2DivSchoolNameC_31').html(h.BranchName);
                                $('#2DivSchoolAddressC_3').html(h.BranchAddressLine1);
                                $('#2DivSchoolAddressC_31').html(h.BranchAddressLine1);




                                $('#2DivFeeReceiptC_3').text("Rpt: " + RecNo);
                                $('#2DivFeeClassC_3').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#2DivFeeSectionC_3').text(h.SectionName);
                                $('#2DivFeeDateC_3').text(h.PaidDate);
                                $('#2lblRegNoC_3').text(h.StudentId);
                                $('#2lblStudentNameC_3').text(h.StudentName);
                                $('#2lblFatherNameC_3').text(h.FatherName);
                                $('#2lblAdmissionNoC_3').text(h.AdmissionNumber);
                                $('#2lblMobileNoC_3').text(h.MobileNo1);
                                $('#2lblAddressC_3').text(h.AddressLine1);
                                $('#2lblMonthsC_3').text(h.Months);
                                $('#2DivPaidtypeC_3').html(h.PaymentMode);
                                $('#2lblRsWordC_3').text(data.responseMessage);

                                $('#2lblPaymentModeSchool_3').text(h.PaymentMode);
                                $('#2lblPaymentModeStudent_3').text(h.PaymentMode);


                                $('#2DivFeeReceiptC_31').text("Rpt: " + RecNo);
                                $('#2DivFeeClassC_31').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#2DivFeeSectionC_31').text(h.SectionName);
                                $('#2DivFeeDateC_31').text(h.PaidDate);
                                $('#2lblRegNoC_31').text(h.StudentId);
                                $('#2lblStudentNameC_31').text(h.StudentName);
                                $('#2lblFatherNameC_31').text(h.FatherName);
                                $('#2lblAdmissionNoC_31').text(h.AdmissionNumber);
                                $('#2lblMobileNoC_31').text(h.MobileNo1);
                                $('#2lblAddressC_31').text(h.AddressLine1);
                                $('#2lblMonthsC_31').text(h.Months);
                                $('#2DivPaidtypeC_31').html(h.PaymentMode);
                                $('#2lblRsWordC_31').text(data.responseMessage);
                                $('#2DivSchoolAddress_31').html(h.BranchAddressLine1);
                                $('#2DivFeeReceipt_31').text("Rpt: " + RecNo);
                                $('#2DivFeeClass_31').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#2DivFeeSection_31').text(h.SectionName);
                                $('#2DivFeeDate_31').text(h.PaidDate);
                                $('#2lblRegNo_31').text(h.StudentId);
                                $('#2lblStudentName_31').text(h.StudentName);
                                $('#2lblFatherName_31').text(h.FatherName);
                                $('#2lblMobileNo_31').text(h.MobileNo1);
                                $('#2lblAddress_31').text(h.AddressLine1);
                                $('#2lblMonths_31').text(h.Months);
                                $('#2DivPaidtype_31').html(h.PaymentMode);
                                $('#2lblRsWord_31').text(data.responseMessage);
                                $('#2lblPaymentModeSchool_31').text(h.PaymentMode);
                                $('#2lblPaymentModeStudent_31').text(h.PaymentMode);

                                if (h.ChequeDDCardNo == "") {
                                    $("#2DivChequeNo_3").hide();
                                    $("#2DivChequeNoStudent_3").hide();
                                    $("#2DivChequeNoStudent_31").hide();


                                } else {
                                    $("#2DivChequeNoStudent_31").show();

                                    $("#2DivChequeNo_3").show();
                                    $("#2DivChequeNoStudent_3").show();
                                    $('#2lblChequeNo_3').text(h.ChequeDDCardNo);
                                    $('#2lblChequeNoStudent_3').text(h.ChequeDDCardNo);
                                    $('#2lblChequeNoStudent_31').text(h.ChequeDDCardNo);


                                }


                                if (h.BankName == "") {
                                    $("#2DivBankName_3").hide();
                                    $("#2DivBankNameStudent_3").hide();
                                    $("#2DivBankNameStudent_31").hide();

                                } else {
                                    $("#2DivBankNameStudent_31").show();
                                    $("#2DivBankName_3").show();
                                    $("#2DivBankNameStudent_3").show();
                                    $('#2lblBankName_3').text(h.BankName);
                                    $('#2lblBankNameStudent_3').text(h.BankName);
                                    $('#2lblBankNameStudent_31').text(h.BankName);

                                }

                            });

                            $('#2btnPrintReceipt_3').unbind('click');
                            $('#2btnPrintReceipt_3').click(function () {

                                PrintRegFeeSlip1();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }


                            });

                            $('#2btnCancelPrinReceipt_3').unbind('click');
                            $('#2btnCancelPrinReceipt_3').click(function () {
                                $("#divPrintRegFeeSlipLandscapeBoth_3").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                            $('#2btnCancelPrinReceipt1_3').unbind('click');
                            $('#2btnCancelPrinReceipt1_3').click(function () {
                                $("#divPrintRegFeeSlipLandscapeBoth_3").slideUp();
                            });

                            $('#2ClosePrintSlipPopUp_3').unbind('click');
                            $('#2ClosePrintSlipPopUp_3').click(function () {
                                $("#divPrintRegFeeSlipLandscapeBoth_3").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                        });

                    }
                    else {
                        $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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

function getFeeSingleSlip(RecNo, BranchId, Stid, RMon) {
    debugger
    var BO = {
        "objFeeSlipBO": {
            "Action": "getfeeslip",
            "BranchId": BranchId,
            "Receiptno": RecNo,
            "StudentId": Stid
        }
    };

    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetFeeSlip",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {
            debugger
            $("#divPrintSingleSlip").slideDown();

            debugger
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $("#2DivFeeDetail_30").empty();
                        $("#2DivFeeDetailC_30").empty();
                        $("#2DivFeeDetailC_301").empty();
                        $.each(data.responseObject, function (a, b) {
                            debugger
                            $.each(b.feeDetailsList, function (c, d) {
                                debugger
                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }



                                $('#2DivPaidFee_30').html(d.Paid);
                                $('#2lblRegNo_30').text(d.StudentId);


                                $("#2DivFeeDetailC_30").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeNameC_30" + d.FeeId + "'>" + d.FeeName + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivGrossPayableC_30" + d.FeeId + "'>" + d.GrossPayable + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivConcessionC_30" + d.FeeId + "'>" + Concession + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivPaidC_30" + d.FeeId + "'>" + d.Paid + "</div><div  class='FeeHeadValue' style='width: 18%;' id='DivBalanceC_30" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));

                                $("#2DivFeeDetail_30").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='DivFeeName_30" + d.FeeId + "'>" + d.FeeName + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivGrossPayable_30" + d.FeeId + "'>" + d.GrossPayable + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivConcession_30" + d.FeeId + "'>" + Concession + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivPaid_30" + d.FeeId + "'>" + d.Paid + "</div><div class='FeeHeadValue' style='width: 18%;' id='DivBalance_30" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));

                                $("#2DivFeeDetailC_301").append($("<ul class='line-group'><li class='line-item'><div class='FeeHeadValue' style='width: 28%;' id='2DivFeeNameC_301" + d.FeeId + "'>" + d.FeeName + "</div><div class='FeeHeadValue' style='width: 18%;' id='2DivGrossPayableC_301" + d.FeeId + "'>" + d.GrossPayable + "</div><div class='FeeHeadValue' style='width: 18%;' id='2DivConcessionC_301" + d.FeeId + "'>" + Concession + "</div><div class='FeeHeadValue' style='width: 18%;' id='2DivPaidC_301" + d.FeeId + "'>" + d.Paid + "</div><div class='FeeHeadValue' style='width: 18%;' id='2DivBalanceC_301" + d.FeeId + "'>" + d.Balance + "</div></li></ul>"));
                            });
                            $.each(b.feeTotalList, function (c, d) {
                                debugger
                                if (BranchId == 1) {
                                    var Concession = '-';
                                }
                                else {
                                    var Concession = d.Concession;
                                }

                                $('#2DivGrossPayablet_30').html(d.GrossPayable);
                                $('#2DivConcessiont_30').html(Concession);
                                $('#2DivPaidt_30').html(d.Paid);
                                $('#2DivBalancet_30').html(d.Balance);

                                $('#2DivGrossPayabletC_30').html(d.GrossPayable);
                                $('#2DivConcessiontC_30').html(Concession);
                                $('#2DivPaidtC_30').html(d.Paid);
                                $('#2DivBalancetC_30').html(d.Balance);

                                $('#2DivGrossPayablet_301').html(d.GrossPayable);
                                $('#2DivConcessiont_301').html(Concession);
                                $('#2DivPaidt_301').html(d.Paid);
                                $('#2DivBalancet_301').html(d.Balance);

                                $('#2DivGrossPayabletC_301').html(d.GrossPayable);
                                $('#2DivConcessiontC_301').html(Concession);
                                $('#2DivPaidtC_301').html(d.Paid);
                                $('#2DivBalancetC_301').html(d.Balance);
                            });

                            $.each(b.feeSlipList, function (g, h) {
                                debugger

                                if (BranchId == 1262) {
                                    $('#2DivBatchNo_30').text('2023-2024');

                                }
                                else {
                                    $('#2DivBatchNo_30').text(h.Session);
                                }


                                //$('#DivBatchNo').html(h.Session);

                                $('#2DivAffilationNo_30').text(h.AffiliationNo);
                                $('#2DivSchoolName_30').html(h.BranchName);
                                $('#2DivMobileNo_30').html(h.MobileNo1);
                                $('#2DivMobileNo2_30').html(h.MobileNo1);
                                $('#2DivMobileNo2_30_1').html(h.MobileNo1);
                                //$('#2DivSchoolAddress2_30').html(h.BranchAddressLine2);
                                //$('#2DivSchoolAddressC2_30').html(h.BranchAddressLine2);
                                //$('#2DivSchoolAddressC2_301').html(h.BranchAddressLine2);
                                $('#2DivSchoolLogo_30 img').attr('src', h.BranchLogo);
                                $('#2DivSchoolLogo2_30 img').attr('src', h.BranchLogo);
                                $('#2DivSchoolLogo2_30_1 img').attr('src', h.BranchLogo);
                                $('#2DivSchoolAddress_30').html(h.BranchAddressLine1);
                                $('#2DivFeeReceipt_30').text("Rpt: " + RecNo);
                                $('#2DivFeeClass_30').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#2DivFeeSection_30').text(h.SectionName);
                                $('#2DivFeeDate_30').text(h.PaidDate);
                                $('#2lblRegNo_30').text(h.StudentId);
                                $('#2lblStudentName_30').text(h.StudentName);
                                $('#2lblFatherName_30').text(h.FatherName);
                                $('#MotherName').text(h.MotherName);
                                $('#AdmNo').text(h.AdmissionNumber);
                                $('#2lblMobileNo_30').text(h.MobileNo1);
                                $('#2lblAddress_30').text(h.AddressLine1);
                                $('#2lblMonths_30').text(h.Months);
                                $('#2DivPaidtype_30').html(h.PaymentMode);
                                $('#2lblRsWord_30').text(data.responseMessage);

                                //$('#DivBatchNoC').html(h.Session);
                                $('#2DivBatchNoC_30').text(h.Session);
                                $('#2DivAffilationNoC_30').text(h.AffiliationNo);
                                $('#2DivAffilationNoC_30_1').text(h.AffiliationNo);
                                $('#2DivSchoolNameC_30').html(h.BranchName);
                                $('#2DivSchoolNameC_301').html(h.BranchName);
                                $('#2DivSchoolAddressC_30').html(h.BranchAddressLine1);
                                $('#2DivSchoolAddressC2_30').html(h.BranchAddressLine1);




                                $('#2DivFeeReceiptC_30').text("RECEIPT NO : " + RecNo);
                                $('#2DivFeeClassC_30').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#2DivFeeSectionC_30').text(h.SectionName);
                                $('#2DivFeeDateC_30').text(h.PaidDate);
                                $('#2lblRegNoC_30').text(h.StudentId);
                                $('#2lblStudentNameC_30').text(h.StudentName);
                                $('#2lblFatherNameC_30').text(h.FatherName);
                                $('#2lblMobileNoC_30').text(h.MobileNo1);
                                $('#2lblAddressC_30').text(h.AddressLine1);
                                $('#2lblMonthsC_30').text(h.Months);
                                $('#2DivPaidtypeC_30').html(h.PaymentMode);
                                $('#2lblRsWordC_30').text(data.responseMessage);

                                $('#lblConcessionNameSingleSlip').text(h.ConcessionName);
                                $('#2lblPaymentModeSchool_30').text(h.PaymentMode);
                                $('#2lblPaymentModeStudent_30').text(h.PaymentMode);


                                $('#2DivFeeReceiptC_301').text("Rpt: " + RecNo);
                                $('#2DivFeeClassC_301').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#2DivFeeSectionC_301').text(h.SectionName);
                                $('#2DivFeeDateC_301').text(h.PaidDate);
                                $('#2lblRegNoC_301').text(h.StudentId);
                                $('#2lblStudentNameC_301').text(h.StudentName);
                                $('#2lblFatherNameC_301').text(h.FatherName);
                                $('#2lblMobileNoC_301').text(h.MobileNo1);
                                $('#2lblAddressC_301').text(h.AddressLine1);
                                $('#2lblMonthsC_301').text(h.Months);
                                $('#2DivPaidtypeC_301').html(h.PaymentMode);
                                $('#2lblRsWordC_301').text(data.responseMessage);
                                $('#2DivSchoolAddress_301').html(h.BranchAddressLine1);
                                $('#2DivFeeReceipt_301').text("Rpt: " + RecNo);
                                $('#2DivFeeClass_301').text("Class: " + h.ClassMasterName + "-" + h.SectionName);
                                $('#2DivFeeSection_301').text(h.SectionName);
                                $('#2DivFeeDate_301').text(h.PaidDate);
                                $('#2lblRegNo_301').text(h.StudentId);
                                $('#2lblStudentName_301').text(h.StudentName);
                                $('#2lblFatherName_301').text(h.FatherName);
                                $('#2lblMobileNo_301').text(h.MobileNo1);
                                $('#2lblAddress_301').text(h.AddressLine1);
                                $('#2lblMonths_301').text(h.Months);
                                $('#2DivPaidtype_301').html(h.PaymentMode);
                                $('#2lblRsWord_301').text(data.responseMessage);
                                $('#2lblPaymentModeSchool_301').text(h.PaymentMode);
                                $('#2lblPaymentModeStudent_301').text(h.PaymentMode);

                                $('#AdmNo').text(h.AdmissionNumber);

                                if (h.ChequeDDCardNo == "") {
                                    $("#2DivChequeNo_30").hide();
                                    $("#2DivChequeNoStudent_30").hide();
                                    $("#2DivChequeNoStudent_301").hide();


                                } else {
                                    $("#2DivChequeNoStudent_301").show();

                                    $("#2DivChequeNo_30").show();
                                    $("#2DivChequeNoStudent_30").show();
                                    $('#2lblChequeNo_30').text(h.ChequeDDCardNo);
                                    $('#2lblChequeNoStudent_30').text(h.ChequeDDCardNo);
                                    $('#2lblChequeNoStudent_301').text(h.ChequeDDCardNo);


                                }

                                if (h.ChequeDate == "") {
                                    $("#2DivChdate30").hide();


                                } else {
                                    $("#2DivChdate30").show();

                                    $('#2lblChdate30').text(h.ChequeDate);


                                }

                                if (h.Remarks == "") {
                                    $("#2DivChRemarks_30").hide();

                                }
                                else {
                                    $("#2DivChRemarks_30").show();
                                    $('#2lblChRemarks_30').text(h.Remarks);
                                }


                                if (h.BankName == "") {
                                    $("#2DivBankName_30").hide();
                                    $("#2DivBankNameStudent_30").hide();
                                    $("#2DivBankNameStudent_301").hide();

                                } else {
                                    $("#2DivBankNameStudent_301").show();
                                    $("#2DivBankName_30").show();
                                    $("#2DivBankNameStudent_30").show();
                                    $('#2lblBankName_30').text(h.BankName);
                                    $('#2lblBankNameStudent_30').text(h.BankName);
                                    $('#2lblBankNameStudent_301').text(h.BankName);

                                }

                            });

                            $('#2btnPrintReceipt_30').unbind('click');
                            $('#2btnPrintReceipt_30').click(function () {

                                PrintRegFeeSingleSlip();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }


                            });

                            $('#2btnCancelPrinReceipt1_30').unbind('click');
                            $('#2btnCancelPrinReceipt1_30').click(function () {
                                debugger
                                $("#divPrintSingleSlip").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                            $('#2btnCancelPrinReceipt1_30').unbind('click');
                            $('#2btnCancelPrinReceipt1_30').click(function () {
                                $("#divPrintSingleSlip").slideUp();
                                ResetControl();
                            });

                            $('#2ClosePrintSlipPopUp_30').unbind('click');
                            $('#2ClosePrintSlipPopUp_30').click(function () {
                                $("#divPrintSingleSlip").slideUp();
                                ResetControl();
                                if (AppAccessTypeId == 101 || AppAccessTypeId == 102) {

                                    BindBranchAutoSelect('ddlBranch', 0, 'GETBRANCH', GlobalBrId, 0);

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });

                                } else {
                                    BindBranchDropDownAutoselect('ddlBranch', 0);

                                    ChangeBranch();

                                    $("#ddlBranch").unbind('change')
                                    $("#ddlBranch").change(function () {
                                        ChangeBranch();
                                    });
                                }
                            });

                        });

                    }
                    else {
                        $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeGroupList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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

function PrintRegFeeSlip() {

    var divContents = document.getElementById('DivFeeSlip').innerHTML;
    var a = window.open('', '');
    a.document.write('<html>');
    a.document.write('<head>');
    a.document.write('<link href="../Content/Styles/main.css" rel="stylesheet" />');
    a.document.write('<link href="../Content/Styles/FeeReciept.css" rel="stylesheet" />');
    a.document.write('</head><body onload="window.print();window.close()">');
    a.document.write('</head><body onload="window.print();">');
    a.document.write('</body>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
}

function PrintRegFeeSlipZero() {

    var divContents = document.getElementById('DivFeeSlipZero').innerHTML;
    var a = window.open('', '');
    a.document.write('<html>');
    a.document.write('<head>');
    a.document.write('<link href="../Content/Styles/main.css" rel="stylesheet" />');
    a.document.write('<link href="../Content/Styles/FeeReciept.css" rel="stylesheet" />');
    a.document.write('</head><body onload="window.print();window.close()">');
    a.document.write('</body>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
}
function PrintRegFeeSlipSingleSmallCenter() {

    var divContents = document.getElementById('DivFeeSlipSSC').innerHTML;
    var a = window.open('', '');
    a.document.write('<html>');
    a.document.write('<head>');
    a.document.write('<link href="../Content/Styles/main.css" rel="stylesheet" />');
    a.document.write('<link href="../Content/Styles/FeeRecieptSingleSmallCenter.css" rel="stylesheet" />');
    a.document.write('</head><body onload="window.print();window.close()">');
    a.document.write('</body>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
}


function PrintRegFeeSlipOzone() {

    var divContents = document.getElementById('DivFeeSlipOzone').innerHTML;
    var a = window.open('', '');
    a.document.write('<html>');
    a.document.write('<head>');
    a.document.write('<link href="../Content/Styles/main.css" rel="stylesheet" />');
    a.document.write('<link href="../Content/Styles/FeeReciept.css" rel="stylesheet" />');
    a.document.write('</head><body onload="window.print();window.close()">');
    a.document.write('</body>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
}
function PrintRegFeeSlipWithoutDiscount() {

    var divContents = document.getElementById('DivFeeSlipWD').innerHTML;
    var a = window.open('', '');
    a.document.write('<html>');
    a.document.write('<head>');
    a.document.write('<link href="../Content/Styles/main.css" rel="stylesheet" />');
    a.document.write('<link href="../Content/Styles/FeeReciept.css" rel="stylesheet" />');
    a.document.write('</head><body onload="window.print();window.close()">');
    a.document.write('</body>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
}

function PrintRegFeeSlipGST() {
    debugger
    var divContents = document.getElementById("DivFeeSlipGST").innerHTML;
    var a = window.open('', '');
    a.document.write('<html>');
    a.document.write('<head>');
    a.document.write('<link href="../Content/Styles/main.css" rel="stylesheet" />');
    a.document.write('<link href="../Content/Styles/FeeReciept.css" rel="stylesheet" />');
    a.document.write('</head><body onload="window.print();window.close()">');
    a.document.write('</body>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
}

function PrintRegFeeSlipSDS() {

    var divContents = document.getElementById('DivFeeSlipSDS').innerHTML;
    var a = window.open('', '');
    a.document.write('<html>');
    a.document.write('<head>');
    a.document.write('<link href="../Content/Styles/main.css" rel="stylesheet" />');
    a.document.write('<link href="../Content/Styles/FeeReciept.css" rel="stylesheet" />');
    a.document.write('</head><body onload="window.print();window.close()">');
    a.document.write('</body>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
}

function PrintRegFeeSlipSingleSmall() {

    var divContents = document.getElementById('DivFeeSlipSingleSmall').innerHTML;
    var a = window.open('', '');
    a.document.write('<html>');
    a.document.write('<head>');
    a.document.write('<link href="../Content/Styles/main.css" rel="stylesheet" />');
    a.document.write('<link href="../Content/Styles/FeeReciept.css" rel="stylesheet" />');
    a.document.write('</head><body onload="window.print();window.close()">');
    a.document.write('</body>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
}

function PrintRegFeeSingleSlip() {

    var divContents = document.getElementById('2DivFeeSlip_30').innerHTML;
    var a = window.open('', '');
    a.document.write('<html>');
    a.document.write('<head>');
    a.document.write('<link href="../Content/Styles/main.css" rel="stylesheet" />');
    a.document.write('<link href="../Content/Styles/PrintSingleSlip.css" rel="stylesheet" />');
    a.document.write('</head><body onload="window.print();window.close()">');
    a.document.write('</body>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
}

function PrintRegFeeSlip1() {

    var divContents = document.getElementById('2DivFeeSlip_3').innerHTML;
    var a = window.open('', '');
    a.document.write('<html>');
    a.document.write('<head>');
    a.document.write('<link href="../Content/Styles/main.css" rel="stylesheet" />');
    a.document.write('<link href="../Content/Styles/FeeReciept.css" rel="stylesheet" />');
    a.document.write('</head><body onload="window.print();window.close()">');
    a.document.write('</body>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
}

function PrintRegFeeSlip2() {

    var divContents = document.getElementById('2DivFeeSlip').innerHTML;
    var a = window.open('', '');
    a.document.write('<html>');
    a.document.write('<head>');
    a.document.write('<link href="../Content/Styles/main.css" rel="stylesheet" />');
    a.document.write('<link href="../Content/Styles/FeeReciept2.css" rel="stylesheet" />');
    a.document.write('</head><body onload="window.print();window.close()">');
    a.document.write('</body>');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
}

function getStudentNameAndId(StudentName, BrId, SchlId, ClassId) {


    AutocompleteObject.length = 0;
    debugger
    var branchid = $('#ddlBranch').val();
    var BO = {
        "objStudentProfileBO":
        {
            "StudentName": StudentName,
            "BranchId": branchid,
            "SchoolId": SchlId,
            "ClassId": ClassId
        }
    };

    $.ajax({

        type: "POST",
        url: ServiceUrl + "/GetAutoCompleteStudentNameAndId",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {



            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $.each(data.responseObject, function (i, d) {
                            $.each(d.StudentNameandId, function (j, k) {

                                AutocompleteObject.push({ 'value': k.StudentName, 'data': k.StudentId, });

                            });


                        });

                    }
                    else {
                        MessageBoxError(data.responseMessage);

                    }

                }
                else {
                    MessageBoxError(data.responseMessage);

                }
            }
            else {
                MessageBoxError(data.responseMessage);

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

function BindMonthsDropDown(ControlId, SelectedValue, BranchId, Sid) {
    debugger
    var BO = {
        "objStudentFeeBO": {
            "Action": "Get Student Record",
            "BranchId": BranchId,
            "StudentId": Sid
        }
    };
    $('#' + ControlId).unbind("select2-opening");
    $('#' + ControlId).find('option').not(':first').remove();
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetParticularStudentRecord",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            ShowHideSelectBoxLoading(1, BranchId);
        },
        success: function (response) {
            debugger
            if (response.responseCode == "1") {
                if (response.responseObject != null) {
                    $.each(response.responseObject, function (i, a) {
                        $.each(a.particularStudentFeeMonthsList, function (i, d) {
                            debugger
                            //$("#" + ControlId).append($("<option></option>").val(d.MonthOrder).html(d.Months));

                            //----------------for Jiet School-------------------------
                            if (BranchId == 1450) {
                                if (d.Months == 'Jun') {
                                    $("#" + ControlId).append($("<option></option>").val(d.MonthOrder).html('Quarter 1'));
                                }
                                else if (d.Months == 'Sep') {
                                    $("#" + ControlId).append($("<option></option>").val(d.MonthOrder).html('Quarter 2'));
                                }
                                else if (d.Months == 'Dec') {
                                    $("#" + ControlId).append($("<option></option>").val(d.MonthOrder).html('Quarter 3'));
                                }
                                else if (d.Months == 'Mar') {
                                    $("#" + ControlId).append($("<option></option>").val(d.MonthOrder).html('Quarter 4'));
                                }
                            }
                            else {
                                $("#" + ControlId).append($("<option></option>").val(d.MonthOrder).html(d.Months));
                            }
                            //----------------for Jiet School-------------------------

                        });
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



function BindPaidMonthsDropDown(ControlId, SelectedValue, BranchId, StudentId) {
    debugger
    var BO = {
        "objStudentFeeBO": {

            "BranchId": BranchId,
            "StudentId": StudentId
        }
    };
    //$('#' + ControlId).unbind("select2-opening");
    //$('#' + ControlId).find('option').not(':first').remove();
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetPaidMonthStudentwise",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            ShowHideSelectBoxLoading(1, BranchId);
        },
        success: function (response) {
            debugger
            if (response.responseCode == "1") {
                if (response.responseObject != null) {
                    $.each(response.responseObject, function (i, a) {

                        debugger
                        var obj = JSON.parse(a.dtasstring);
                        var row$ = ''
                        for (var i = 0; i < obj.length; i++) {
                            GlobalMonthId = obj[i].MonthId
                            var MonthName = obj[i].Months

                            row$ += '<td style="width:100%;"><div style="display:flex;gap: 27px;padding: 0 0 0 20px;"><div><input id=' + obj[i].MonthId + ' type="checkbox"  name="MonthList" value="' + MonthName + '" /></div><div>' + obj[i].Months + '</div></div></td>'
                        }
                        $("#" + ControlId + " tbody").append('<tr style="display:flex;width:100%;"> ' + row$ + '</tr>');

                    });
                }
            } else {
                MessageBoxError(response.responseMessage);
            }
            // $('#' + ControlId).select2('val', SelectedValue);
        },
        complete: function () {
            // $("#" + ControlId).select2();
            // $('#' + ControlId).select2("open");
            ShowHideSelectBoxLoading(0, ControlId)
        },
        error: function (data) {
            alert(JSON.stringify(data));
            ShowHideSelectBoxLoading(0, ControlId)
        }
    });
}

function GetFeeDetail(sid, BranchId) {
    debugger

    var BO = {
        "objStudentFeeBO": {
            "Action": "Get Student Fee",
            "BranchId": BranchId,
            "StudentId": sid,
            "SchoolId": SchoolId
        }
    };
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/AddUpdateGetStudentFee",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {

            debugger
            $("#FeeDetailList tbody").remove();
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $.each(data.responseObject, function (a, b) {
                            $.each(b.studentFeeList, function (c, d) {
                                debugger
                                $("#FeeDetailList").append($("<tr id=TRSchool_" + d.AssignFeeId + "><td><input type='checkbox' name='FeeDetail' data-assignfeeid=" + d.AssignFeeId + "  id='chkFeeDetail" + d.AssignFeeId + "' /></td><td> " + d.Months + " </td><td>" + d.FeeName + "</td><td>" + d.GrossPayable + "</td><td>" + d.Concession + "</td><td>" + d.FixAmount + "</td><td>" + d.Percentage + "</td><td>" + d.NetPayable + "</td><td>" + d.Balance + "</td></tr>"));
                            });
                        });
                        var columnSet = [{ "title": "<input type='checkbox'  name='FeeDetail' id='ChkAllFeeDetail' />" }, { "title": "Months" }, { "title": "FeeName" }, { "title": "PayableFee" }, { "title": "Concession" }, { "title": "FixAmount" }, { "title": "Percentage" }, { "title": "NetFees" }, { "title": "Balance" }];
                        $("#FeeDetailList").DataTable({
                            destroy: true,
                            scrollY: '50vh',
                            pageLength: 50,
                            columns: columnSet,
                            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                return nRow;
                            },
                            language: {
                                "emptyTable": dataTableNoRecordFoundMsg
                            }
                        });

                        $('Input[name="FeeDetail"]').prop('checked', true);

                        $('#ChkAllFeeDetail').click(function () {
                            $('Input[name="FeeDetail"]').not(this).prop('checked', this.checked);
                        });


                        $("#btnAddFee").unbind('click');
                        $("#btnAddFee").click(function () {
                            debugger


                            var feeDetailList = [];
                            var feess = [];
                            //get cell values, instead of the header text.
                            $.each(data.responseObject, function (w, x) {
                                $.each(x.studentFeeList, function (y, z) {
                                    var StudentId = $("#txtSid").val();
                                    $("#tblfees tr:not(:first)").each(function (a, b) {
                                        debugger
                                        var feeid = $(b).attr("data-feeid");
                                        if (z.AssignFeeId == feeid) {
                                            var StudentId = $("#txtSid").val();
                                            var tdlist = $(this).closest('tr').children('td');
                                            discount = $(this).closest('tr').children('td').find('.discount').val();
                                            paid = $(this).closest('tr').children('td').find('.paid').val();
                                            balance = $(this).closest('tr').children('td').find('.balance').val();
                                            var Item;
                                            if ($.trim(($(tdlist[1]).html())) == 'Other Fee') {
                                                Item = {

                                                    a: $(tdlist[0]).html(),
                                                    b: $(tdlist[1]).html(),
                                                    c: $(tdlist[2]).find('input').val(),
                                                    //c: $(tdlist[3]).html(),

                                                    d: discount,
                                                    e: paid,
                                                    f: balance
                                                };
                                            }
                                            else {

                                                Item = {

                                                    a: $(tdlist[0]).html(),
                                                    b: $(tdlist[1]).html(),
                                                    c: $(tdlist[2]).html(),
                                                    //c: $(tdlist[3]).html(),

                                                    d: discount,
                                                    e: paid,
                                                    f: balance
                                                };

                                            }

                                            feess.push(Item);
                                            debugger

                                            if ($.trim(($(tdlist[1]).html())) == 'Other Fee') {
                                                feeDetailList.push({ "BranchId": z.BranchId, "StudentId": StudentId, "MonthId": z.MonthValue, "FeeId": z.FeeId, "GrossPayable": Item.c, "Concession": z.Concession, "DirectDiscount": Item.d, "NetPayable": Item.c, "Paid": Item.e, "Balance": Item.f });
                                            }

                                            else {

                                                feeDetailList.push({ "BranchId": z.BranchId, "StudentId": StudentId, "MonthId": z.MonthValue, "FeeId": z.FeeId, "GrossPayable": z.GrossPayable, "Concession": z.Concession, "DirectDiscount": Item.d, "NetPayable": Item.c, "Paid": Item.e, "Balance": Item.f });
                                            }
                                            debugger
                                        }
                                    })
                                })
                            });

                            if (feeDetailList != "" && feeDetailList != null) {
                                fee(feeDetailList, data.responseMessage);
                                getFeeSlipLandscapeBoth_3(RecNo, BranchId, Stid, RMon);
                            }
                            //else if (BranchId == 78 || BranchId == 33){
                            ////fee(feeDetailList, data.responseMessage);
                            //getFeeSingleSlip(RecNo, BranchId, Stid, RMon);
                            //}

                            else {
                                alert("feeDetailList empty...!");
                            }

                        });

                    }
                    else {
                        $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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

function GetFeeDetailNew(sid, BranchId) {
    debugger

    var BO = {
        "objStudentFeeBO": {
            "Action": "Get Student Fee",
            "BranchId": BranchId,
            "StudentId": sid,
            "SchoolId": SchoolId
        }
    };
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/AddUpdateGetStudentFee",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {

            debugger
            $("#FeeDetailList tbody").remove();
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $.each(data.responseObject, function (a, b) {
                            $.each(b.studentFeeList, function (c, d) {
                                debugger
                                $("#FeeDetailList").append($("<tr id=TRSchool_" + d.AssignFeeId + "><td><input type='checkbox' name='FeeDetail' data-assignfeeid=" + d.AssignFeeId + "  id='chkFeeDetail" + d.AssignFeeId + "' /></td><td> " + d.Months + " </td><td>" + d.FeeName + "</td><td>" + d.GrossPayable + "</td><td>" + d.Concession + "</td><td>" + d.FixAmount + "</td><td>" + d.Percentage + "</td><td>" + d.NetPayable + "</td><td>" + d.Balance + "</td></tr>"));
                            });
                        });
                        var columnSet = [{ "title": "<input type='checkbox'  name='FeeDetail' id='ChkAllFeeDetail' />" }, { "title": "Months" }, { "title": "FeeName" }, { "title": "PayableFee" }, { "title": "Concession" }, { "title": "FixAmount" }, { "title": "Percentage" }, { "title": "NetFees" }, { "title": "Balance" }];
                        $("#FeeDetailList").DataTable({
                            destroy: true,
                            scrollY: '50vh',
                            pageLength: 50,
                            columns: columnSet,
                            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                return nRow;
                            },
                            language: {
                                "emptyTable": dataTableNoRecordFoundMsg
                            }
                        });

                        $('Input[name="FeeDetail"]').prop('checked', true);

                        $('#ChkAllFeeDetail').click(function () {
                            $('Input[name="FeeDetail"]').not(this).prop('checked', this.checked);
                        });


                        $("#btnAddFeeNew").unbind('click');
                        $("#btnAddFeeNew").click(function () {
                            debugger


                            var feeDetailList = [];
                            var feess = [];
                            //get cell values, instead of the header text.
                            $.each(data.responseObject, function (w, x) {
                                $.each(x.studentFeeList, function (y, z) {
                                    var StudentId = $("#txtSid").val();
                                    $("#tblfees tr:not(:first)").each(function (a, b) {
                                        debugger
                                        var feeid = $(b).attr("data-feeid");
                                        if (z.AssignFeeId == feeid) {
                                            var StudentId = $("#txtSid").val();
                                            var tdlist = $(this).closest('tr').children('td');
                                            discount = $(this).closest('tr').children('td').find('.discount').val();
                                            paid = $(this).closest('tr').children('td').find('.paid').val();
                                            balance = $(this).closest('tr').children('td').find('.balance').val();
                                            var Item;
                                            if ($.trim(($(tdlist[1]).html())) == 'Other Fee') {
                                                Item = {

                                                    a: $(tdlist[0]).html(),
                                                    b: $(tdlist[1]).html(),
                                                    c: $(tdlist[2]).find('input').val(),
                                                    //c: $(tdlist[3]).html(),

                                                    d: discount,
                                                    e: paid,
                                                    f: balance
                                                };
                                            }
                                            else {

                                                Item = {

                                                    a: $(tdlist[0]).html(),
                                                    b: $(tdlist[1]).html(),
                                                    c: $(tdlist[2]).html(),
                                                    //c: $(tdlist[3]).html(),

                                                    d: discount,
                                                    e: paid,
                                                    f: balance
                                                };

                                            }

                                            feess.push(Item);
                                            debugger

                                            if ($.trim(($(tdlist[1]).html())) == 'Other Fee') {
                                                feeDetailList.push({ "BranchId": z.BranchId, "StudentId": StudentId, "MonthId": z.MonthValue, "FeeId": z.FeeId, "GrossPayable": Item.c, "Concession": z.Concession, "DirectDiscount": Item.d, "NetPayable": Item.c, "Paid": Item.e, "Balance": Item.f });
                                            }

                                            else {

                                                feeDetailList.push({ "BranchId": z.BranchId, "StudentId": StudentId, "MonthId": z.MonthValue, "FeeId": z.FeeId, "GrossPayable": z.GrossPayable, "Concession": z.Concession, "DirectDiscount": Item.d, "NetPayable": Item.c, "Paid": Item.e, "Balance": Item.f });
                                            }
                                            debugger
                                        }
                                    })
                                })
                            });

                            if (feeDetailList != "" && feeDetailList != null) {
                                feeNew(feeDetailList, data.responseMessage);
                                getFeeSlipLandscapeBoth_3(RecNo, BranchId, Stid, RMon);
                            }
                            //else if (BranchId == 78 || BranchId == 33){
                            ////fee(feeDetailList, data.responseMessage);
                            //getFeeSingleSlip(RecNo, BranchId, Stid, RMon);
                            //}

                            else {
                                alert("feeDetailList empty...!");
                            }

                        });

                    }
                    else {
                        $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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

$('#btnPrint').click(function () {
    $('#DivClass').show();

    $('#DivSubjectList').show();
    ResetControl();
    $('#divPrintRegFeeSlip').slideDown();
    $('#lblStudent').text('Add Student');
    debugger
    getFeeSlip();
});
//$('#2btnPrintReceipt_30').click(function () {
//    //$('#DivClass').show();

//    $('#2DivFeeSlip_30').show();
//    ResetControl();
//    $('#2DivFeeSlip_30').slideDown();
//    //$('#lblStudent').text('Add Student');
//    debugger
//    PrintRegFeeSingleSlip();
//});

function BindStudentRecordName(Action) {
    var BranchId = $("#ddlBranch").val();
    var ddlstudent = $("#ddlstudent").val();
    var BO = {
        "objStudentFeeBO": {
            "Action": "Get Student Record",
            "BranchId": BranchId,
            "StudentId": ddlstudent
        }
    };
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/GetParticularStudentRecord",
        datatype: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (response) {
            debugger
            if (response.responseCode == "1") {
                if (response.responseObject != null) {
                    if (response.responseObject.length > 0) {
                        $.each(response.responseObject, function (a, b) {
                            $.each(b.particularStudentRecordList, function (c, d) {
                                debugger
                                $('#ddlBranch').val(d.BranchId);
                                $('#ddlClass').val(d.ClassId);
                                $('#txtSname').val(d.StudentName);
                                $('#txtSid').val(d.StudentId);
                                $('#txtAddress').val(d.AddressLine1);
                                $('#txtFName').val(d.FatherName);
                                $('#txtMName').val(d.MotherName);
                                $('#txtadmstatus').val(d.AdmissionStatus);
                                $('#txtFeeGroup').val(d.FeeGroup);

                                $('#ddlRoute').select2('val', d.RouteId);
                                //  $('#ddlRoute').find('option').not(':first').remove();
                                $("#ddlRoute").append($("<option></option>").val(d.RouteId).html(d.RouteName));
                                $('#ddlRoute').select2('val', d.RouteId);

                                $('#ddlConcession').select2('val', 0);
                                $('#ddlConcession').find('option').not(':first').remove();
                                $("#ddlConcession").append($("<option></option>").val(d.ConcessionId).html(d.ConcessionName));
                                $('#ddlConcession').select2('val', d.ConcessionId);


                                //  $('#ddlConcession').val(d.ConcessionName);
                                $('#ddlClass').select2('val', 0);
                                $('#ddlClass').find('option').not(':first').remove();
                                $("#ddlClass").append($("<option></option>").val(d.ClassId).html(d.ClassName));
                                $('#ddlClass').select2('val', d.ClassId);
                                $('#ddlSec').select2('val', 0);
                                $('#ddlSec').find('option').not(':first').remove();
                                $("#ddlSec").append($("<option></option>").val(d.SectionId).html(d.SectionName));
                                $('#ddlSec').select2('val', d.SectionId);

                                $("#txtFeeDate").datepicker({
                                    changeMonth: true,
                                    changeYear: true,
                                    maxDate: 0,
                                    dateFormat: "dd-mm-yy",
                                    onSelect: function (selected, evnt) {
                                        if ($(this).val().length > 0) {
                                            $('#validationStudentFee').hide();
                                            $('#validationStudentFee span').html('');
                                            $("#txtFeeDate").removeClass('error_focus');
                                        }
                                    },
                                }).datepicker("setDate", new Date());
                                //var date = new Date()
                                //let day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
                                //let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
                                //let year = date.getFullYear().toString(); // Get the last two digits of the year
                                //var Formatteddate = `${day}-${month}-${year}`

                                //$('#txtFeeDate').val(Formatteddate);

                                $("#txtCheqDate").datepicker({
                                    changeMonth: true,
                                    changeYear: true,
                                    //maxDate: 0,
                                    dateFormat: "dd-mm-yy",
                                    onSelect: function (selected, evnt) {
                                        if ($(this).val().length > 0) {
                                            $('#validationStudentFee').hide();
                                            $('#validationStudentFee span').html('');
                                            $("#txtCheqDate").removeClass('error_focus');
                                        }
                                    },
                                });
                            });
                            $.each(b.payableList, function (e, f) {
                                debugger
                                $('#txtGrossPayable').val(f.GrossPayable);
                                $('#txtDiscount').val(f.Concession);
                                $('#txtnetPayable').val(f.NetPayable);
                                $('#txtTotalPaid').val(f.NetPayable);
                                $('#txtMDiscount').val('0');
                                $('#txtBalanceFee').val('0');
                                $('#ddlMonth').select2('val', f.FirstMonthOrder);
                                $('#ddlMonth').find('option').not(':first').remove();
                                $("#ddlMonth").append($("<option></option>").val(f.FirstMonthOrder).html(f.FirstMonthName));
                                $('#ddlMonth').select2('val', f.FirstMonthOrder);

                            });
                        });

                    } else {
                        MessageBoxError(response.responseMessage);
                    }
                } else {
                    MessageBoxError(response.responseMessage);
                }
            } else {
                MessageBoxError(response.responseMessage);
            }
        }
    });
}

function BindPayableFeebySid() {
    debugger
    var BranchId = $("#ddlBranch").val();
    var Sid = $("#txtSid").val();
    var ddlMonth = $("#ddlMonth").val();
    var BO = {
        "objStudentFeeBO": {
            "Action": "Get Student Fee",
            "BranchId": BranchId,
            "StudentId": Sid,
            "MonthOrderTo": ddlMonth
        }
    };
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/AddUpdateGetStudentFee",
        datatype: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (response) {

            debugger
            if (response.responseCode == "1") {
                if (response.responseObject != null) {
                    if (response.responseObject.length > 0) {
                        $.each(response.responseObject, function (a, b) {
                            $.each(b.payableList, function (c, d) {
                                debugger
                                $('#txtGrossPayable').val(d.GrossPayable);
                                $('#txtDiscount').val(d.Concession);
                                $('#txtnetPayable').val(d.NetPayable);
                                $('#txtTotalPaid').val(d.NetPayable);
                                debugger
                                $('#ddlMonth').select2('val', 0);
                                $('#ddlMonth').find('option').not(':first').remove();
                                $("#ddlMonth").append($("<option></option>").val(d.FirstMonthOrder).html(d.Months));
                                $('#ddlMonth').select2('val', 0);

                            });
                        });

                    } else {
                        MessageBoxError(response.responseMessage);
                    }
                } else {
                    MessageBoxError(response.responseMessage);
                }
            } else {
                MessageBoxError(response.responseMessage);
            }
        }
    });

}

function GetFeeDetailByName(sid, BranchId) {
    debugger
    var BO = {
        "objStudentFeeBO": {
            "Action": "Get Student Fee",
            "BranchId": BranchId,
            "StudentId": sid
        }
    };
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/AddUpdateGetStudentFee",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {

            $("#FeeDetailList tbody").remove();
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $.each(data.responseObject, function (a, b) {
                            $.each(b.studentFeeList, function (c, d) {
                                $("#FeeDetailList").append($("<tr id=TRSchool_" + d.AssignFeeId + "><td><input type='checkbox' name='FeeDetail' data-assignfeeid=" + d.AssignFeeId + "  id='chkFeeDetail" + d.AssignFeeId + "' /></td><td> " + d.Months + " </td><td>" + d.FeeName + "</td><td>" + d.GrossPayable + "</td><td>" + d.Concession + "</td><td>" + d.FixAmount + "</td><td>" + d.Percentage + "</td><td>" + d.NetPayable + "</td><td>" + d.Balance + "</td></tr>"));


                            });
                        });


                        var columnSet = [{ "title": "<input type='checkbox'  name='FeeDetail' id='ChkAllFeeDetail' />" }, { "title": "Months" }, { "title": "FeeName" }, { "title": "PayableFee" }, { "title": "Concession" }, { "title": "FixAmount" }, { "title": "Percentage" }, { "title": "NetFees" }, { "title": "Balance" }];
                        $("#FeeDetailList").DataTable({
                            destroy: true,
                            scrollY: '50vh',
                            pageLength: 50,
                            columns: columnSet,
                            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                return nRow;
                            },
                            language: {
                                "emptyTable": dataTableNoRecordFoundMsg
                            }
                        });



                        $('Input[name="FeeDetail"]').prop('checked', true);

                        $('#ChkAllFeeDetail').click(function () {
                            $('Input[name="FeeDetail"]').not(this).prop('checked', this.checked);
                        });


                        $("#btnAddFee").unbind('click');
                        $("#btnAddFee").click(function () {
                            debugger
                            //var feeDetailList = [];

                            //$("input[name='FeeDetail']:checked").each(function (a, b) {
                            //    var assignfeeid = $(b).data('assignfeeid');

                            //    $.each(data.responseObject, function (w, x) {
                            //        $.each(x.studentFeeList, function (y, z) {


                            //            if (z.AssignFeeId == assignfeeid) {


                            //                var StudentId = $("#txtSid").val();

                            //                feeDetailList.push({ "BranchId": z.BranchId, "StudentId": StudentId, "MonthId": z.MonthValue, "FeeId": z.FeeId, "GrossPayable": z.GrossPayable, "Concession": z.Concession, "DirectDiscount": 0, "NetPayable": z.NetPayable, "Paid": z.NetPayable, "Balance": 0 });
                            //            }


                            //        });

                            //    });

                            //});

                            //debugger


                            var feeDetailList = [];
                            var feess = [];
                            //get cell values, instead of the header text.
                            $.each(data.responseObject, function (w, x) {
                                $.each(x.studentFeeList, function (y, z) {
                                    var StudentId = $("#txtSid").val();
                                    $("#tblfees tr:not(:first)").each(function (a, b) {
                                        debugger
                                        var feeid = $(b).attr("data-feeid");
                                        if (z.AssignFeeId == feeid) {
                                            var StudentId = $("#txtSid").val();
                                            var tdlist = $(this).closest('tr').children('td');

                                            discount = $(this).closest('tr').children('td').find('.discount').val();
                                            paid = $(this).closest('tr').children('td').find('.paid').val();
                                            balance = $(this).closest('tr').children('td').find('.balance').val();
                                            var Item;
                                            if ($.trim(($(tdlist[1]).html())) == 'Other Fee') {
                                                Item = {

                                                    a: $(tdlist[0]).html(),
                                                    b: $(tdlist[1]).html(),
                                                    c: $(tdlist[2]).find('input').val(),
                                                    //c: $(tdlist[3]).html(),

                                                    d: discount,
                                                    e: paid,
                                                    f: balance
                                                };
                                            }
                                            else {

                                                Item = {

                                                    a: $(tdlist[0]).html(),
                                                    b: $(tdlist[1]).html(),
                                                    c: $(tdlist[2]).html(),
                                                    //c: $(tdlist[3]).html(),

                                                    d: discount,
                                                    e: paid,
                                                    f: balance
                                                };

                                            }

                                            feess.push(Item);
                                            debugger

                                            if ($.trim(($(tdlist[1]).html())) == 'Other Fee') {
                                                feeDetailList.push({ "BranchId": z.BranchId, "StudentId": StudentId, "MonthId": z.MonthValue, "FeeId": z.FeeId, "GrossPayable": Item.c, "Concession": z.Concession, "DirectDiscount": Item.d, "NetPayable": Item.c, "Paid": Item.e, "Balance": Item.f });
                                            }

                                            else {

                                                feeDetailList.push({ "BranchId": z.BranchId, "StudentId": StudentId, "MonthId": z.MonthValue, "FeeId": z.FeeId, "GrossPayable": z.GrossPayable, "Concession": z.Concession, "DirectDiscount": Item.d, "NetPayable": Item.c, "Paid": Item.e, "Balance": Item.f });
                                            }
                                            debugger
                                        }
                                    })
                                })
                            });
                            if (feeDetailList != "" && feeDetailList != null) {
                                fee(feeDetailList, data.responseMessage);
                            }
                            else {
                                alert("feeDetailList empty...!");
                            }
                        });

                    }
                    else {
                        $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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

function studentFeeListbyMonth(sid, BranchId, ddlMonth) {
    debugger
    var sid = $("#ddlstudent").val();
    var ddlMonth = $("#ddlMonth").val();
    var BO = {
        "objStudentFeeBO": {
            "Action": "Get Student Fee",
            "BranchId": BranchId,
            "StudentId": sid,
            "MonthOrderTo": ddlMonth
        }
    };
    $.ajax({
        type: "POST",
        url: ServiceUrl + "/AddUpdateGetStudentFee",
        dataType: "json",
        data: JSON.stringify(BO),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loader_home').show();
        },
        success: function (data) {

            debugger
            var array = []
            $("#FeeDetailList tbody").remove();
            if (data != null) {
                if (data.responseObject != null) {
                    if (data.responseObject.length > 0) {
                        $.each(data.responseObject, function (a, b) {

                            $.each(b.studentFeeList, function (c, d) {
                                debugger

                                array.push({ "FeeMonth": d.Months, "FeeName": d.FeeName, "FeeAmount": d.NetPayable });
                                debugger
                                $("#FeeDetailList").append($("<tr id=TRSchool_" + d.AssignFeeId + "><td><input type='checkbox' name='FeeDetail' data-assignfeeid=" + d.AssignFeeId + "  id='chkFeeDetail" + d.AssignFeeId + "' /></td><td> " + d.Months + " </td><td>" + d.FeeName + "</td><td>" + d.GrossPayable + "</td><td>" + d.Concession + "</td><td contenteditable='true'>0</td><td>" + d.Percentage + "</td><td contenteditable='true'>" + d.NetPayable + "</td><td contenteditable='true'>0</td></tr>"));
                            });
                        });

                        var columnSet = [{ "title": "<input type='checkbox'  name='FeeDetail' id='ChkAllFeeDetail' />" }, { "title": "Months" }, { "title": "FeeName" }, { "title": "PayableFee" }, { "title": "Concession" }, { "title": "Discount" }, { "title": "Percentage" }, { "title": "NetFees" }, { "title": "Balance" }];
                        $("#FeeDetailList").DataTable({
                            destroy: true,
                            scrollY: '50vh',
                            pageLength: 50,
                            columns: columnSet,
                            "fnRowCallback": function (nRow, aData, iDisplayIndex) {
                                return nRow;
                            },
                            language: {
                                "emptyTable": dataTableNoRecordFoundMsg
                            }
                        });

                        $('Input[name="FeeDetail"]').prop('checked', true);

                        $('#ChkAllFeeDetail').click(function () {
                            $('Input[name="FeeDetail"]').not(this).prop('checked', this.checked);
                        });


                        $("#btnAddFee").unbind('click');
                        $("#btnAddFee").click(function () {

                            debugger

                            //var feeDetailList = [];

                            //$("input[name='FeeDetail']:checked").each(function (a, b) {
                            //    var assignfeeid = $(b).data('assignfeeid');

                            //    $.each(data.responseObject, function (w, x) {
                            //        $.each(x.studentFeeList, function (y, z) {


                            //            if (z.AssignFeeId == assignfeeid) {


                            //                var StudentId = $("#txtSid").val();

                            //                feeDetailList.push({ "BranchId": z.BranchId, "StudentId": StudentId, "MonthId": z.MonthValue, "FeeId": z.FeeId, "GrossPayable": z.GrossPayable, "Concession": z.Concession, "DirectDiscount": 0, "NetPayable": z.NetPayable, "Paid": z.NetPayable, "Balance": 0 });
                            //            }


                            //        });

                            //    });

                            //});
                            var feeDetailList = [];
                            var fee = [];
                            //get cell values, instead of the header text.
                            $("#tblfees tr:not(:first)").each(function (a, b) {
                                debugger
                                $.each(data.responseObject, function (w, x) {
                                    $.each(x.studentFeeList, function (y, z) {
                                        if (z.AssignFeeId == assignfeeid) {
                                            var StudentId = $("#txtSid").val();
                                            var tdlist = $(this).closest('tr').children('td');
                                            // var afterConcess = $(this).closest('tr').children('td').find('.FeeAmount input').val();
                                            discount = $(this).closest('tr').children('td').find('.discount').val();
                                            paid = $(this).closest('tr').children('td').find('.paid').val();
                                            balance = $(this).closest('tr').children('td').find('.balance').val();
                                            var Item;
                                            if ($.trim(($(tdlist[1]).html())) == 'Other Fee') {
                                                Item = {

                                                    a: $(tdlist[0]).html(),
                                                    b: $(tdlist[1]).html(),
                                                    c: $(tdlist[2]).find('input').val(),
                                                    //c: $(tdlist[3]).html(),

                                                    d: discount,
                                                    e: paid,
                                                    f: balance
                                                };
                                            }
                                            else {

                                                Item = {

                                                    a: $(tdlist[0]).html(),
                                                    b: $(tdlist[1]).html(),
                                                    c: $(tdlist[2]).html(),
                                                    //c: $(tdlist[3]).html(),

                                                    d: discount,
                                                    e: paid,
                                                    f: balance
                                                };

                                            }
                                            debugger
                                            feeDetailList.push(Item);
                                            debugger

                                            //fee.push({ "BranchId": z.BranchId, "StudentId": StudentId, "MonthId": Item.b, "FeeId": Item.c, "GrossPayable": z.GrossPayable, "Concession": z.Concession, "DirectDiscount": Item.d, "NetPayable": Item.c, "Paid": Item.e, "Balance": Item.f });
                                            //debugger



                                            if ($.trim(($(tdlist[1]).html())) == 'Other Fee') {
                                                fee.push({ "BranchId": z.BranchId, "StudentId": StudentId, "MonthId": z.MonthValue, "FeeId": z.FeeId, "GrossPayable": Item.c, "Concession": z.Concession, "DirectDiscount": Item.d, "NetPayable": Item.c, "Paid": Item.e, "Balance": Item.f });
                                            }

                                            else {

                                                fee.push({ "BranchId": z.BranchId, "StudentId": StudentId, "MonthId": z.MonthValue, "FeeId": z.FeeId, "GrossPayable": z.GrossPayable, "Concession": z.Concession, "DirectDiscount": Item.d, "NetPayable": Item.c, "Paid": Item.e, "Balance": Item.f });
                                            }
                                        }
                                        // Bind(itemlist);
                                    })
                                })
                            });

                            debugger

                            if (feeDetailList != "" && feeDetailList != null) {
                                fee(feeDetailList);
                            }
                            else {
                                alert("feeDetailList empty...!");
                            }

                        });

                    }
                    else {
                        $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                    }
                }
                else {
                    $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
                }
            }
            else {
                $("#FeeDetailList").append($("<tr><td colspan='10' class='norecord-msz'>No record found</td></tr>"));
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


function ResetOtherStudent() {
    debugger

    $('#txtSearchStudentFeeOther').val('');
    $('#ddlStudentIdnew').val('');
    $('#ddlStudentId').val('');

    $('#OtherFeeName').select2('val', 0);
    $('#OtherFeeName').find('option').not(':first').remove();


    $('#OtherFeeAmt').val('');
    $('#OtherFeeRemarks').val('');


    $('#ddlMonth1').select2('val', 0);
    $('#ddlMonth1').find('option').not(':first').remove();

}
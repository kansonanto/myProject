'use strict'

angular.module('myproject1App')
    .controller('reportController', ['$state', '$scope', '$q', 'userAPI', 'reportEntity', function ($state, reportscope, $q, userAPI, reportEntity) {
        var vm = this;
        vm.order = {};
        vm.order.printBookName = 'SPBA 202 M.B.A 2nd  Year(3rd Semester) E/M';        
        vm.order.printOrderNumber = '1211';
        vm.order.printReleaseNumber = '1211';
        vm.order.printOrderDate = new Date();
        vm.order.printReleaseDate = new Date();
        vm.order.bookNoOfCopies = '438000';
        vm.order.paymentType = '';
        vm.order.bookType = 'Free copies';
        vm.order.noOfBRV = '3';                
        reportscope.printBillingDate = new Date();

        vm.order.bookPrintingType = 'Multi Colour';


        vm.order.invoiceNo = '68';
        vm.order.printing1000PreRate = '2000';
        vm.order.printingRate = '45000';
        vm.order.plateMakingRate = '2000';
        vm.order.kraftRate = '5000';
        vm.order.transportRate = '1000';

       


        // paper board statement 
        vm.order.paperPBIVNo = '1211';
        vm.order.boardPBIVNo = '1212';
        vm.order.paperPBIVDate = new Date();
        vm.order.boardPBIVDate = new Date();
        vm.order.paperPBIVSize = 'Paper 84CM Reel 19.5Kg 80Gsm Hi-tech Map litho';
        vm.order.boardPBIVSize = '61x90cm 25.3Kg 230GSM Multi -layer Coated (Aura pearl)';
        vm.order.paperPBIVConsumptionSize = '1211.12';
        vm.order.boardPBIVReams = '200';
        vm.order.boardPBIVSheets = '100';
        vm.order.boardPBIVConsumptionSize = '12.11';


        reportscope.printOrderName = 'test report name dfdf d1';
        var base64Img = null;

        var margins = {
            top: 70,
            bottom: 40,
            left: 30,
            width: 550
        };

        reportscope.htmlContent = ""; // "<span style='font-weight: bold;'>This is initial text</span>"

        initController();

        function initController() {
            loadReportDetails();
           

            
            console.log('reportEntity.getReportEntity.reportName ' + reportEntity.getReportEntity().reportName)
            reportscope.reportName = reportEntity.getReportEntity().reportName;


        }

        function convertNumberToWords(amount) {
            var words = new Array();
            words[0] = '';
            words[1] = 'One';
            words[2] = 'Two';
            words[3] = 'Three';
            words[4] = 'Four';
            words[5] = 'Five';
            words[6] = 'Six';
            words[7] = 'Seven';
            words[8] = 'Eight';
            words[9] = 'Nine';
            words[10] = 'Ten';
            words[11] = 'Eleven';
            words[12] = 'Twelve';
            words[13] = 'Thirteen';
            words[14] = 'Fourteen';
            words[15] = 'Fifteen';
            words[16] = 'Sixteen';
            words[17] = 'Seventeen';
            words[18] = 'Eighteen';
            words[19] = 'Nineteen';
            words[20] = 'Twenty';
            words[30] = 'Thirty';
            words[40] = 'Forty';
            words[50] = 'Fifty';
            words[60] = 'Sixty';
            words[70] = 'Seventy';
            words[80] = 'Eighty';
            words[90] = 'Ninety';
            amount = amount.toString();
            var atemp = amount.split(".");
            var number = atemp[0].split(",").join("");
            var n_length = number.length;
            var words_string = "";
            if (n_length <= 9) {
                var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
                var received_n_array = new Array();
                for (var i = 0; i < n_length; i++) {
                    received_n_array[i] = number.substr(i, 1);
                }
                for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
                    n_array[i] = received_n_array[j];
                }
                for (var i = 0, j = 1; i < 9; i++, j++) {
                    if (i == 0 || i == 2 || i == 4 || i == 7) {
                        if (n_array[i] == 1) {
                            n_array[j] = 10 + parseInt(n_array[j]);
                            n_array[i] = 0;
                        }
                    }
                }
               var value = "";
                for (var i = 0; i < 9; i++) {
                    if (i == 0 || i == 2 || i == 4 || i == 7) {
                        value = n_array[i] * 10;
                    } else {
                        value = n_array[i];
                    }
                    if (value != 0) {
                        words_string += words[value] + " ";
                    }
                    if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                        words_string += "Crores ";
                    }
                    if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                        words_string += "Lakhs ";
                    }
                    if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                        words_string += "Thousand ";
                    }
                    if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                        words_string += "Hundred and ";
                    } else if (i == 6 && value != 0) {
                        words_string += "Hundred ";
                    }
                }
                words_string = words_string.split("  ").join(" ");
            }
            return words_string;
        }

        vm.order.showItem = function () {

            vm.order.totalBillAmount = Number(vm.order.printingRate) + Number(vm.order.plateMakingRate) + Number(vm.order.kraftRate) + Number(vm.order.transportRate);

            vm.order.totalAmountWord =   convertNumberToWords(Number(vm.order.totalBillAmount));
            
            //  alert(vm.order.paymentType);
            if (vm.order.paymentType == 0) {
                reportscope.myTabShow = true;
                reportscope.mycoverTab = 'report/views/directFinalCover.html';
            } else if (vm.order.paymentType == 1) {
                reportscope.myTabShow = true;
                reportscope.mycoverTab = 'report/views/partPaymentCover.html';
            }
            else if (vm.order.paymentType == 2) {
                reportscope.myTabShow = true;
                reportscope.mycoverTab = 'report/views/finalPaymentCover.html';
            } else {
                reportscope.myTabShow = false;
                reportscope.mycoverTab = '';
            }

        }

        function loadDrp() {
            reportscope.industrytypes = [{ "shortName": "test" }];


        }

        function loadReportDetails() {
            vm.availableBookTypes = ['Sale copies', 'Free copies'];

            vm.availableBookPrintingTypes = ['Multi Colour', 'Single Colour'];

            var reportData = {
                reportName: "First report 1",
                reportType: "paper board statement"
            }

            reportEntity.setReportEntity(reportData);
        }

        function loadAllUsers() {

            // userAPI.GetByUsername()
            //   .then(function(users){

            //   });

            userAPI.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                    console.log('test')
                });


            // userAPI.GetById(3310)    
            // .then(function (users) {
            //     vm.allUsers = users;
            // });



        }



        vm.printDocument = function () {
            console.log('print funtion');
            var pdf = new jsPDF('p', 'pt', 'letter');

            // source can be HTML-formatted string, or a reference
            // to an actual DOM element from which the text will be scraped.

            var source = reportscope.htmlContent;

            // we support special element handlers. Register them with jQuery-style 
            // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
            // There is no support for any other type of selectors 
            // (class, of compound) at this time.

            var specialElementHandlers = {
                // element with id of "bypass" - jQuery style selector
                '#bypassme': function (element, renderer) {
                    // true = "handled elsewhere, bypass text extraction"
                    return true;
                }
            };

            var margins = {
                top: 80,
                bottom: 60,
                left: 40,
                width: 522
            };



            console.log("Building  HTML" + source);
            // all coords and widths are in jsPDF instance's declared units
            // 'inches' in this case
            pdf.fromHTML(
                source // HTML string or DOM elem ref.
                , margins.left // x coord
                , margins.top // y coord
                , {
                    'width': margins.width // max width of content on PDF
                    ,
                    'elementHandlers': specialElementHandlers
                },
                function (dispose) {
                    // dispose: object with X, Y of the last line add to the PDF 
                    //          this allow the insertion of new lines after html
                    headerFooterFormatting(pdf)

                    //Didn't work
                    //   console.log("Saving HTMLclick");
                    // pdf.save('Test.pdf');
                },
                margins
            );

            //  reportscope.imagedata = '';

            //  loadImage(reportscope.imgDataURL).then((data) => {
            //     reportscope.imagedata = data;
            //  });



            // pdf.addImage(reportscope.dfd , 'JPEG', 100, 200, 280, 210);

            console.log("after from HTML.");
            pdf.save('Test.pdf');
        }



        function headerFooterFormatting(doc) {
            var totalPages = doc.internal.getNumberOfPages();

            for (var i = totalPages; i >= 1; i--) { //make this page, the current page we are currently working on.
                doc.setPage(i);

                header(doc);

                // footer(doc, i, totalPages);

            }
        };


        function header(doc) {
            doc.setFontSize(30);
            doc.setTextColor(40);
            doc.setFontStyle('normal');


            // var niceimage = new Image();
            // niceimage.src = '/images/test1.jpeg';
            // doc.addImage(niceimage, 'jpeg', margins.left, 10, 40,40);      

            // alert(base64Img)
            if (base64Img) {
                doc.addImage(base64Img, 'JPEG', margins.left, 10, 40, 40);
            }

            doc.text("Report Header Template", margins.left + 50, 40);

            doc.line(3, 70, margins.width + 43, 70); // horizontal line
        };

        imgToBase64('images/test1.jpeg', function (base64) {
            base64Img = base64;
        });

        function imgToBase64(url, callback, imgVariable) {

            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    imgVariable = reader.result.replace('text/xml', 'image/jpeg');
                    callback(imgVariable);
                };
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.send();
        };

        // function loadImage(imagePath) {
        //     var defer = this.q.defer();
        //     var img = new Image();
        //     img.src = imagePath;
        //     img.addEventListener('load', function () {
        //         defer.resolve(img);
        //     });
        //     return defer.promise;
        // };


        function loadImage(imagePath) {
            var defer = $q.defer();
            var img = new Image();
            img.src = imagePath;
            img.addEventListener('load', () => {
                var canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                var context = canvas.getContext('2d');
                context.drawImage(img, 0, 0);

                var dataURL = canvas.toDataURL('image/jpeg');

                defer.resolve(dataURL);
            });

            return defer.promise;
        }

    }]);


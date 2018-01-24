'use strict'

angular.module('myproject1App')
    .controller('reportController', ['$state', '$scope', '$q', 'userAPI', 'reportEntity', function ($state, reportscope, $q, userAPI, reportEntity) {
        var vm = this;
        reportscope.reportName = 'test report name dfdf d1';
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

            console.log('reportEntity.getReportEntity.reportName '+ reportEntity.getReportEntity().reportName)
            reportscope.reportName = reportEntity.getReportEntity().reportName;

            loadAllUsers();
        }

        function loadReportDetails() {

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

